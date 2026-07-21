namespace Portfolio.API.Models;

public class PortfolioData
{
    public Profile Profile { get; set; } = new();
    public List<string> RotatingTitles { get; set; } = new();
    public SocialLinks Social { get; set; } = new();
    public ResumeInfo Resume { get; set; } = new();
    public AboutSection About { get; set; } = new();
    public List<Statistic> Statistics { get; set; } = new();
    public SeoMeta Seo { get; set; } = new();
}

public class Profile
{
    public string FullName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string WhatsApp { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string HeroImage { get; set; } = string.Empty;
    public int YearsExperience { get; set; }
    public string Availability { get; set; } = "Available for hire";
}

public class SocialLinks
{
    public string LinkedIn { get; set; } = string.Empty;
    public string GitHub { get; set; } = string.Empty;
    public string Twitter { get; set; } = string.Empty;
    public string YouTube { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
}

public class ResumeInfo
{
    public string Url { get; set; } = string.Empty;
    public string FileName { get; set; } = "Muhammad_Babar_Ali_Resume.pdf";
    public DateTime? UpdatedAt { get; set; }
}

public class AboutSection
{
    public string Headline { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public List<string> FocusAreas { get; set; } = new();
    public List<string> Industries { get; set; } = new();
    public List<string> Highlights { get; set; } = new();
    public AiExperience? AiExperience { get; set; }
}

public class AiExperience
{
    public string Headline { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public List<string> Tools { get; set; } = new();
    public List<string> Capabilities { get; set; } = new();
}

public class Statistic
{
    public string Id { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public int Value { get; set; }
    public string Suffix { get; set; } = "+";
    public string Icon { get; set; } = string.Empty;
}

public class SeoMeta
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Keywords { get; set; } = string.Empty;
    public string OgImage { get; set; } = string.Empty;
    public string SiteUrl { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
}

public class Project
{
    public string Id { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string ClientRegion { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public List<string> Categories { get; set; } = new();
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string BusinessProblem { get; set; } = string.Empty;
    public string Solution { get; set; } = string.Empty;
    public List<string> Responsibilities { get; set; } = new();
    public List<string> TechnicalHighlights { get; set; } = new();
    public string Database { get; set; } = string.Empty;
    public string DeploymentEnvironment { get; set; } = string.Empty;
    public string Results { get; set; } = string.Empty;
    public string CoverImage { get; set; } = string.Empty;
    public List<string> Gallery { get; set; } = new();
    public string? VideoUrl { get; set; }
    public string? GitHubUrl { get; set; }
    public string? LiveDemoUrl { get; set; }
    public List<string> Technologies { get; set; } = new();
    public string Architecture { get; set; } = string.Empty;
    public List<string> Modules { get; set; } = new();
    public List<string> Features { get; set; } = new();
    public CaseStudy? CaseStudy { get; set; }
    public bool Featured { get; set; }
    public int Order { get; set; }
    public DateTime? CompletedAt { get; set; }
}

public class CaseStudy
{
    public string Problem { get; set; } = string.Empty;
    public List<string> Challenges { get; set; } = new();
    public string Architecture { get; set; } = string.Empty;
    public string Database { get; set; } = string.Empty;
    public string Api { get; set; } = string.Empty;
    public string Performance { get; set; } = string.Empty;
    public string BusinessValue { get; set; } = string.Empty;
    public List<string> LessonsLearned { get; set; } = new();
    public List<string> FlowDiagrams { get; set; } = new();
    public List<string> Images { get; set; } = new();
}

public class SkillCategory
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public List<Skill> Skills { get; set; } = new();
}

public class Skill
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Level { get; set; }
    public string Icon { get; set; } = string.Empty;
    public string Color { get; set; } = "#3b82f6";
}

public class Experience
{
    public string Id { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string StartDate { get; set; } = string.Empty;
    public string? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public string Description { get; set; } = string.Empty;
    public List<string> Achievements { get; set; } = new();
    public List<string> Technologies { get; set; } = new();
    public string? Logo { get; set; }
    public int Order { get; set; }
}

public class Certificate
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string IssueDate { get; set; } = string.Empty;
    public string? ExpiryDate { get; set; }
    public string? CredentialId { get; set; }
    public string? CredentialUrl { get; set; }
    public string Image { get; set; } = string.Empty;
    public string? DownloadUrl { get; set; }
}

public class BlogPost
{
    public string Id { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string CoverImage { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new();
    public string Author { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    public bool Published { get; set; }
    public int ReadTimeMinutes { get; set; }
}

public class Testimonial
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public string Type { get; set; } = "Client";
    public int Order { get; set; }
}

public class Service
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public List<string> Features { get; set; } = new();
    public int Order { get; set; }
}

public class GalleryItem
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string? ProjectId { get; set; }
    public string Category { get; set; } = string.Empty;
    public int Order { get; set; }
}

public class SiteSettings
{
    public string SiteName { get; set; } = string.Empty;
    public string DefaultTheme { get; set; } = "dark";
    public bool EnableAnimations { get; set; } = true;
    public bool EnableCursor { get; set; } = true;
    public bool EnableParticles { get; set; } = true;
    public string PrimaryColor { get; set; } = "#0ea5e9";
    public string AccentColor { get; set; } = "#06b6d4";
    public ContactSettings Contact { get; set; } = new();
    public MapSettings Map { get; set; } = new();
    public AdminSettings Admin { get; set; } = new();
}

public class ContactSettings
{
    public string Email { get; set; } = string.Empty;
    public string FormEndpoint { get; set; } = "/api/contact";
    public bool EnableForm { get; set; } = true;
}

public class MapSettings
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string EmbedUrl { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
}

public class AdminSettings
{
    public string Username { get; set; } = "admin";
    public string PasswordHash { get; set; } = string.Empty;
}

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public string Username { get; set; } = string.Empty;
}

public class ContactMessage
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
