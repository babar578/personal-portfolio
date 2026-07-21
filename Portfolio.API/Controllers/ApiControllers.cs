using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth) => _auth = auth;

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _auth.LoginAsync(request);
        if (result is null) return Unauthorized(new { message = "Invalid credentials" });
        return Ok(result);
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult Me() => Ok(new { username = User.Identity?.Name, role = "Admin" });
}

[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly IJsonDataService _json;
    public PortfolioController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<PortfolioData>> Get() =>
        Ok(await _json.ReadAsync<PortfolioData>("portfolio.json"));

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] PortfolioData data)
    {
        await _json.WriteAsync("portfolio.json", data);
        return Ok(data);
    }
}

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IJsonDataService _json;
    public ProjectsController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetAll([FromQuery] string? category = null)
    {
        var projects = await _json.ReadAsync<List<Project>>("projects.json");
        if (!string.IsNullOrWhiteSpace(category) && category != "all")
            projects = projects.Where(p =>
                p.Categories.Any(c => c.Equals(category, StringComparison.OrdinalIgnoreCase)) ||
                p.Industry.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();
        return Ok(projects.OrderBy(p => p.Order).ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetById(string id)
    {
        var projects = await _json.ReadAsync<List<Project>>("projects.json");
        var project = projects.FirstOrDefault(p =>
            p.Id.Equals(id, StringComparison.OrdinalIgnoreCase) ||
            p.Slug.Equals(id, StringComparison.OrdinalIgnoreCase));
        return project is null ? NotFound() : Ok(project);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Project>> Create([FromBody] Project project)
    {
        var projects = await _json.ReadAsync<List<Project>>("projects.json");
        project.Id = string.IsNullOrEmpty(project.Id) ? Guid.NewGuid().ToString("N")[..12] : project.Id;
        if (string.IsNullOrEmpty(project.Slug))
            project.Slug = project.Title.ToLowerInvariant().Replace(" ", "-");
        projects.Add(project);
        await _json.WriteAsync("projects.json", projects);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(string id, [FromBody] Project project)
    {
        var projects = await _json.ReadAsync<List<Project>>("projects.json");
        var index = projects.FindIndex(p => p.Id == id);
        if (index < 0) return NotFound();
        project.Id = id;
        projects[index] = project;
        await _json.WriteAsync("projects.json", projects);
        return Ok(project);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        var projects = await _json.ReadAsync<List<Project>>("projects.json");
        var removed = projects.RemoveAll(p => p.Id == id);
        if (removed == 0) return NotFound();
        await _json.WriteAsync("projects.json", projects);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
    private readonly IJsonDataService _json;
    public SkillsController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<List<SkillCategory>>> Get() =>
        Ok(await _json.ReadAsync<List<SkillCategory>>("skills.json"));

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] List<SkillCategory> data)
    {
        await _json.WriteAsync("skills.json", data);
        return Ok(data);
    }
}

[ApiController]
[Route("api/[controller]")]
public class ExperienceController : ControllerBase
{
    private readonly IJsonDataService _json;
    public ExperienceController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<List<Experience>>> Get() =>
        Ok((await _json.ReadAsync<List<Experience>>("experience.json")).OrderBy(e => e.Order).ToList());

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Experience>> Create([FromBody] Experience item)
    {
        var list = await _json.ReadAsync<List<Experience>>("experience.json");
        item.Id = string.IsNullOrEmpty(item.Id) ? Guid.NewGuid().ToString("N")[..12] : item.Id;
        list.Add(item);
        await _json.WriteAsync("experience.json", list);
        return Ok(item);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(string id, [FromBody] Experience item)
    {
        var list = await _json.ReadAsync<List<Experience>>("experience.json");
        var index = list.FindIndex(e => e.Id == id);
        if (index < 0) return NotFound();
        item.Id = id;
        list[index] = item;
        await _json.WriteAsync("experience.json", list);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        var list = await _json.ReadAsync<List<Experience>>("experience.json");
        if (list.RemoveAll(e => e.Id == id) == 0) return NotFound();
        await _json.WriteAsync("experience.json", list);
        return NoContent();
    }

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> ReplaceAll([FromBody] List<Experience> data)
    {
        await _json.WriteAsync("experience.json", data);
        return Ok(data);
    }
}

[ApiController]
[Route("api/[controller]")]
public class CertificatesController : ControllerBase
{
    private readonly IJsonDataService _json;
    public CertificatesController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<List<Certificate>>> Get() =>
        Ok(await _json.ReadAsync<List<Certificate>>("certificates.json"));

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Certificate>> Create([FromBody] Certificate item)
    {
        var list = await _json.ReadAsync<List<Certificate>>("certificates.json");
        item.Id = string.IsNullOrEmpty(item.Id) ? Guid.NewGuid().ToString("N")[..12] : item.Id;
        list.Add(item);
        await _json.WriteAsync("certificates.json", list);
        return Ok(item);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(string id, [FromBody] Certificate item)
    {
        var list = await _json.ReadAsync<List<Certificate>>("certificates.json");
        var index = list.FindIndex(c => c.Id == id);
        if (index < 0) return NotFound();
        item.Id = id;
        list[index] = item;
        await _json.WriteAsync("certificates.json", list);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        var list = await _json.ReadAsync<List<Certificate>>("certificates.json");
        if (list.RemoveAll(c => c.Id == id) == 0) return NotFound();
        await _json.WriteAsync("certificates.json", list);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly IJsonDataService _json;
    public BlogsController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<List<BlogPost>>> GetAll([FromQuery] string? search = null, [FromQuery] string? category = null, [FromQuery] string? tag = null)
    {
        var blogs = await _json.ReadAsync<List<BlogPost>>("blogs.json");
        blogs = blogs.Where(b => b.Published).ToList();
        if (!string.IsNullOrWhiteSpace(search))
            blogs = blogs.Where(b =>
                b.Title.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                b.Excerpt.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                b.Tags.Any(t => t.Contains(search, StringComparison.OrdinalIgnoreCase))).ToList();
        if (!string.IsNullOrWhiteSpace(category))
            blogs = blogs.Where(b => b.Category.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();
        if (!string.IsNullOrWhiteSpace(tag))
            blogs = blogs.Where(b => b.Tags.Any(t => t.Equals(tag, StringComparison.OrdinalIgnoreCase))).ToList();
        return Ok(blogs.OrderByDescending(b => b.PublishedAt).ToList());
    }

    [HttpGet("all")]
    [Authorize]
    public async Task<ActionResult<List<BlogPost>>> GetAllAdmin() =>
        Ok(await _json.ReadAsync<List<BlogPost>>("blogs.json"));

    [HttpGet("{slug}")]
    public async Task<ActionResult<BlogPost>> GetBySlug(string slug)
    {
        var blogs = await _json.ReadAsync<List<BlogPost>>("blogs.json");
        var blog = blogs.FirstOrDefault(b => b.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase) || b.Id == slug);
        return blog is null ? NotFound() : Ok(blog);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BlogPost>> Create([FromBody] BlogPost item)
    {
        var list = await _json.ReadAsync<List<BlogPost>>("blogs.json");
        item.Id = string.IsNullOrEmpty(item.Id) ? Guid.NewGuid().ToString("N")[..12] : item.Id;
        if (string.IsNullOrEmpty(item.Slug))
            item.Slug = item.Title.ToLowerInvariant().Replace(" ", "-");
        list.Add(item);
        await _json.WriteAsync("blogs.json", list);
        return Ok(item);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(string id, [FromBody] BlogPost item)
    {
        var list = await _json.ReadAsync<List<BlogPost>>("blogs.json");
        var index = list.FindIndex(b => b.Id == id);
        if (index < 0) return NotFound();
        item.Id = id;
        list[index] = item;
        await _json.WriteAsync("blogs.json", list);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        var list = await _json.ReadAsync<List<BlogPost>>("blogs.json");
        if (list.RemoveAll(b => b.Id == id) == 0) return NotFound();
        await _json.WriteAsync("blogs.json", list);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly IJsonDataService _json;
    public TestimonialsController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<List<Testimonial>>> Get() =>
        Ok((await _json.ReadAsync<List<Testimonial>>("testimonials.json")).OrderBy(t => t.Order).ToList());

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Testimonial>> Create([FromBody] Testimonial item)
    {
        var list = await _json.ReadAsync<List<Testimonial>>("testimonials.json");
        item.Id = string.IsNullOrEmpty(item.Id) ? Guid.NewGuid().ToString("N")[..12] : item.Id;
        list.Add(item);
        await _json.WriteAsync("testimonials.json", list);
        return Ok(item);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(string id, [FromBody] Testimonial item)
    {
        var list = await _json.ReadAsync<List<Testimonial>>("testimonials.json");
        var index = list.FindIndex(t => t.Id == id);
        if (index < 0) return NotFound();
        item.Id = id;
        list[index] = item;
        await _json.WriteAsync("testimonials.json", list);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        var list = await _json.ReadAsync<List<Testimonial>>("testimonials.json");
        if (list.RemoveAll(t => t.Id == id) == 0) return NotFound();
        await _json.WriteAsync("testimonials.json", list);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IJsonDataService _json;
    public ServicesController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<List<Service>>> Get() =>
        Ok((await _json.ReadAsync<List<Service>>("services.json")).OrderBy(s => s.Order).ToList());

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] List<Service> data)
    {
        await _json.WriteAsync("services.json", data);
        return Ok(data);
    }
}

[ApiController]
[Route("api/[controller]")]
public class GalleryController : ControllerBase
{
    private readonly IJsonDataService _json;
    public GalleryController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<ActionResult<List<GalleryItem>>> Get() =>
        Ok((await _json.ReadAsync<List<GalleryItem>>("gallery.json")).OrderBy(g => g.Order).ToList());

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<GalleryItem>> Create([FromBody] GalleryItem item)
    {
        var list = await _json.ReadAsync<List<GalleryItem>>("gallery.json");
        item.Id = string.IsNullOrEmpty(item.Id) ? Guid.NewGuid().ToString("N")[..12] : item.Id;
        list.Add(item);
        await _json.WriteAsync("gallery.json", list);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        var list = await _json.ReadAsync<List<GalleryItem>>("gallery.json");
        if (list.RemoveAll(g => g.Id == id) == 0) return NotFound();
        await _json.WriteAsync("gallery.json", list);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly IJsonDataService _json;
    public SettingsController(IJsonDataService json) => _json = json;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var settings = await _json.ReadAsync<SiteSettings>("settings.json");
        // Never expose password hash publicly
        var publicSettings = new
        {
            settings.SiteName,
            settings.DefaultTheme,
            settings.EnableAnimations,
            settings.EnableCursor,
            settings.EnableParticles,
            settings.PrimaryColor,
            settings.AccentColor,
            settings.Contact,
            settings.Map
        };
        return Ok(publicSettings);
    }

    [HttpGet("admin")]
    [Authorize]
    public async Task<ActionResult<SiteSettings>> GetAdmin() =>
        Ok(await _json.ReadAsync<SiteSettings>("settings.json"));

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] SiteSettings data)
    {
        var existing = await _json.ReadAsync<SiteSettings>("settings.json");
        if (string.IsNullOrEmpty(data.Admin.PasswordHash))
            data.Admin.PasswordHash = existing.Admin.PasswordHash;
        await _json.WriteAsync("settings.json", data);
        return Ok(new { message = "Settings updated" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IJsonDataService _json;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IJsonDataService json, ILogger<ContactController> logger)
    {
        _json = json;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactMessage message)
    {
        if (string.IsNullOrWhiteSpace(message.Name) || string.IsNullOrWhiteSpace(message.Email) || string.IsNullOrWhiteSpace(message.Message))
            return BadRequest(new { message = "Name, email, and message are required." });

        var messages = await _json.ReadAsync<List<object>>("messages.json");
        messages.Add(new
        {
            id = Guid.NewGuid().ToString("N")[..12],
            message.Name,
            message.Email,
            message.Subject,
            message.Message,
            receivedAt = DateTime.UtcNow
        });
        await _json.WriteAsync("messages.json", messages);
        _logger.LogInformation("Contact message from {Email}", message.Email);
        return Ok(new { message = "Thank you. Your message has been received." });
    }
}

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public UploadController(IWebHostEnvironment env) => _env = env;

    [HttpPost]
    [Authorize]
    [RequestSizeLimit(20_000_000)]
    public async Task<IActionResult> Upload(IFormFile file, [FromQuery] string folder = "general")
    {
        if (file is null || file.Length == 0) return BadRequest(new { message = "No file provided" });

        var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf", ".svg" };
        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowed.Contains(ext)) return BadRequest(new { message = "File type not allowed" });

        var uploadDir = Path.Combine(_env.ContentRootPath, "Data", "uploads", folder);
        Directory.CreateDirectory(uploadDir);
        var fileName = $"{Guid.NewGuid():N}{ext}";
        var path = Path.Combine(uploadDir, fileName);
        await using var stream = System.IO.File.Create(path);
        await file.CopyToAsync(stream);

        var url = $"/uploads/{folder}/{fileName}";
        return Ok(new { url, fileName });
    }
}

[ApiController]
[Route("api/[controller]")]
public class SeoController : ControllerBase
{
    private readonly IJsonDataService _json;
    public SeoController(IJsonDataService json) => _json = json;

    [HttpGet("sitemap")]
    public async Task<IActionResult> Sitemap()
    {
        var portfolio = await _json.ReadAsync<PortfolioData>("portfolio.json");
        var projects = await _json.ReadAsync<List<Project>>("projects.json");
        var blogs = await _json.ReadAsync<List<BlogPost>>("blogs.json");
        var baseUrl = portfolio.Seo.SiteUrl.TrimEnd('/');

        var urls = new List<string>
        {
            $"{baseUrl}/",
            $"{baseUrl}/about",
            $"{baseUrl}/projects",
            $"{baseUrl}/experience",
            $"{baseUrl}/skills",
            $"{baseUrl}/services",
            $"{baseUrl}/certificates",
            $"{baseUrl}/blog",
            $"{baseUrl}/contact"
        };
        urls.AddRange(projects.Select(p => $"{baseUrl}/projects/{p.Slug}"));
        urls.AddRange(blogs.Where(b => b.Published).Select(b => $"{baseUrl}/blog/{b.Slug}"));

        var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                  "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" +
                  string.Join("\n", urls.Select(u => $"  <url><loc>{u}</loc></url>")) +
                  "\n</urlset>";
        return Content(xml, "application/xml");
    }

    [HttpGet("robots")]
    public async Task<IActionResult> Robots()
    {
        var portfolio = await _json.ReadAsync<PortfolioData>("portfolio.json");
        var content = $"User-agent: *\nAllow: /\nSitemap: {portfolio.Seo.SiteUrl.TrimEnd('/')}/api/seo/sitemap\n";
        return Content(content, "text/plain");
    }
}
