using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.IdentityModel.Tokens;
using Portfolio.API.Models;
using System.IdentityModel.Tokens.Jwt;

namespace Portfolio.API.Services;

public interface IJsonDataService
{
    Task<T> ReadAsync<T>(string fileName) where T : new();
    Task WriteAsync<T>(string fileName, T data);
    string GetDataPath(string fileName);
}

public class JsonDataService : IJsonDataService
{
    private readonly string _dataPath;
    private readonly ILogger<JsonDataService> _logger;
    private readonly SemaphoreSlim _lock = new(1, 1);

    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        PropertyNameCaseInsensitive = true
    };

    public JsonDataService(IWebHostEnvironment env, ILogger<JsonDataService> logger)
    {
        _dataPath = Path.Combine(env.ContentRootPath, "Data");
        _logger = logger;
        Directory.CreateDirectory(_dataPath);
        Directory.CreateDirectory(Path.Combine(_dataPath, "uploads"));
    }

    public string GetDataPath(string fileName) => Path.Combine(_dataPath, fileName);

    public async Task<T> ReadAsync<T>(string fileName) where T : new()
    {
        var path = GetDataPath(fileName);
        if (!File.Exists(path))
        {
            _logger.LogWarning("JSON file not found: {File}. Returning default.", fileName);
            return new T();
        }

        await _lock.WaitAsync();
        try
        {
            await using var stream = File.OpenRead(path);
            var data = await JsonSerializer.DeserializeAsync<T>(stream, Options);
            return data ?? new T();
        }
        finally
        {
            _lock.Release();
        }
    }

    public async Task WriteAsync<T>(string fileName, T data)
    {
        var path = GetDataPath(fileName);
        await _lock.WaitAsync();
        try
        {
            var tempPath = path + ".tmp";
            await using (var stream = File.Create(tempPath))
            {
                await JsonSerializer.SerializeAsync(stream, data, Options);
            }
            File.Move(tempPath, path, overwrite: true);
        }
        finally
        {
            _lock.Release();
        }
    }
}

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    string HashPassword(string password);
}

public class AuthService : IAuthService
{
    private readonly IJsonDataService _json;
    private readonly IConfiguration _config;

    public AuthService(IJsonDataService json, IConfiguration config)
    {
        _json = json;
        _config = config;
    }

    public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var settings = await _json.ReadAsync<SiteSettings>("settings.json");
        var admin = settings.Admin;

        if (string.IsNullOrEmpty(admin.PasswordHash))
        {
            admin.Username = "admin";
            admin.PasswordHash = HashPassword("Admin@123!");
            settings.Admin = admin;
            await _json.WriteAsync("settings.json", settings);
        }

        if (!string.Equals(request.Username, admin.Username, StringComparison.OrdinalIgnoreCase))
            return null;

        if (!BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash))
            return null;

        var key = _config["Jwt:Key"] ?? "PortfolioSuperSecretKey_ChangeInProduction_2024_MBA_Enterprise!";
        var issuer = _config["Jwt:Issuer"] ?? "Portfolio.API";
        var audience = _config["Jwt:Audience"] ?? "Portfolio.Admin";
        var expires = DateTime.UtcNow.AddHours(12);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, admin.Username),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(issuer, audience, claims, expires: expires, signingCredentials: credentials);

        return new LoginResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expires,
            Username = admin.Username
        };
    }
}
