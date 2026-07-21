# Muhammad Babar Ali — Premium Portfolio

Enterprise-grade personal portfolio: React 19 frontend + ASP.NET Core JSON API.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, GSAP, Lenis |
| Backend | ASP.NET Core (net9), JWT Auth, Swagger |
| Data | JSON files (no SQL) |

## Quick start

### 1. API

```bash
cd Portfolio.API
dotnet run
```

- API: http://localhost:5088  
- Swagger: http://localhost:5088/swagger  

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

- Site: http://localhost:5173  
- Admin: http://localhost:5173/admin/login  

Set the admin password locally via Admin Settings (or seed `Data/settings.json`) before first login. Do not commit production credentials.

## Deployed site

After push to `main`, GitHub Actions publishes the frontend to GitHub Pages:

**https://babar578.github.io/personal-portfolio/**

The public site uses built-in content defaults when the API is not hosted. Run `Portfolio.API` separately if you need live admin/API features.

```
persnal protfolilo/
├── Portfolio.API/
│   ├── Controllers/       # REST endpoints
│   ├── Services/          # JSON + JWT auth
│   ├── Models/            # Domain models
│   └── Data/              # *.json content + uploads/
└── frontend/
    └── src/
        ├── components/    # UI, layout, sections
        ├── pages/         # Public + admin
        ├── context/       # Theme, auth, portfolio
        ├── hooks/
        ├── services/      # API client
        └── types/
```

## JSON content (editable)

| File | Purpose |
|------|---------|
| `portfolio.json` | Profile, about, stats, SEO |
| `projects.json` | Projects + case studies |
| `skills.json` | Skill categories |
| `experience.json` | Timeline |
| `blogs.json` | Markdown blog posts |
| `testimonials.json` | Client/colleague feedback |
| `certificates.json` | Certificates |
| `services.json` | Services offered |
| `gallery.json` | Gallery items |
| `settings.json` | Theme, map, admin |

Admin CRUD updates these files automatically via the API.

## Features

- Full-screen animated hero with rotating titles, mouse glow, particles
- Dark / light themes, Lenis smooth scroll, custom cursor
- Projects with filters, detail pages, case studies
- Experience timeline, skills, services, certificates, blog, testimonials, contact
- Secure admin dashboard (JWT) for all content
- SEO helpers, dynamic sitemap: `/api/seo/sitemap`

## Notes

- Update contact email, LinkedIn, GitHub, and resume path in `Data/portfolio.json` / Admin Settings.
- Place resume PDF under `Portfolio.API/Data/uploads/general/`.
- Change JWT secret in `appsettings.json` before production.
