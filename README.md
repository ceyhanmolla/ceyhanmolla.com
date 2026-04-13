# Ceyhan Molla Portfolio

**Web Infrastructure & IT Process Specialist with 20+ years of experience**

A modern, high-performance portfolio website built with pure HTML, CSS, and JavaScript. Showcases expertise in web infrastructure, IT processes, automation, and security.

![Portfolio Preview](./images/og-image.jpg)

## ✨ Features

- **Glassmorphism UI**: Modern frosted glass navigation with backdrop blur
- **Fully Responsive**: Mobile-first design with fluid typography and adaptive layouts
- **Parallax Scrolling**: Immsersive scroll experience with dynamic parallax effects on statistics
- **Animated Statistics**: Counter animations triggered by intersection observer
- **Interactive Skills Section**: Accordion UI with smooth expand/collapse animations
- **Progressive Web App (PWA)**: Web App Manifest, multiple favicon sizes, offline-capable
- **Accessibility Compliant**: ARIA labels, keyboard navigation, skip links, focus management
- **Performance Optimized**: Preloaded critical assets, lazy loading, minimal render-blocking
- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Custom Domain Ready**: Configured for `www.ceyhanmolla.com` via CNAME
- **Dynamic Copyright**: Automatically updates year using JavaScript
- **Enhanced UX**: Logo link opens in same tab for better navigation flow

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Custom properties (CSS variables), flexbox, grid, animations, backdrop-filter
- **Vanilla JavaScript**: No frameworks, pure ES6+ with modular architecture
- **Canvas API**: Dynamic particle connections in the stats section
- **PWA Standards**: Web App Manifest, responsive icons

## 🎨 Design Highlights

- **Color Scheme**: Brand red (#E62020) on deep black (#0A0A0A)
- **Typography**: Lexend font family for excellent readability
- **Micro-interactions**: Hover states, focus rings, smooth transitions
- **Scroll Progress Bar**: Visual indicator at the top of the page
- **Grain Overlay**: Subtle texture for tactile feel
- **Dark Mode**: Optimized for dark theme by default

## 📂 Project Structure

```
├── index.html              # HTML structure and markup
├── style.css               # All styles and animations
├── main.js                 # JavaScript modules and interactions
├── manifest.json           # PWA manifest for installability
├── CNAME                  # Custom domain configuration
├── .gitignore             # Git ignore rules
├── README.md              # This file
└── images/                # Optimized assets
    ├── hero.webp          # Hero background (WebP format, preloaded)
    ├── 01.webp            # Skill section backgrounds
    ├── 02.webp
    ├── 03.webp
    ├── logo.svg           # Vector logo (scales perfectly)
    ├── favicon.ico        # Legacy browser favicon
    ├── favicon-16x16.png  # Standard favicon sizes
    ├── favicon-32x32.png
    ├── apple-touch-icon.png    # iOS/Apple devices (180x180)
    ├── android-chrome-192x192.png  # Android Chrome (192x192)
    └── android-chrome-512x512.png  # Android Chrome (512x512)
```

## 🚀 Deployment

### GitHub Pages (Default)

No build step required! This is a pure static site.

```bash
# Clone the repository
git clone https://github.com/ceyhanmolla/ceyhanmolla.com.git
cd ceyhanmolla.com

# Make changes and push
git add .
git commit -m "Update content"
git push origin main
```

GitHub Pages will automatically deploy from the `main` branch root.  
**Live URL**: `https://ceyhanmolla.github.io/ceyhanmolla.com`

### Custom Domain (www.ceyhanmolla.com)

1. **Enable GitHub Pages**: Settings → Pages → Source: `main` branch / root folder
2. **Configure DNS** at your domain registrar:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | ceyhanmolla.github.io |

3. **Add custom domain** in GitHub Pages settings: `www.ceyhanmolla.com`
4. **Enforce HTTPS** (GitHub provides free SSL via Let's Encrypt)

DNS propagation can take 5-30 minutes (up to 48 hours). After propagation, the site will be available at `https://www.ceyhanmolla.com`

## ♿ Accessibility Features

- ✅ **Skip to main content** link for keyboard users
- ✅ **Semantic HTML**: proper heading hierarchy (h1, h2, h3, etc.)
- ✅ **ARIA labels** and roles for interactive components
- ✅ **Keyboard navigation** support for all interactive elements
- ✅ **Focus management** for modal navigation
- ✅ **Reduced motion** support (`prefers-reduced-motion`)
- ✅ **Color contrast** meets WCAG guidelines
- ✅ **Touch-friendly** target sizes (44px minimum)

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Uses modern CSS features with graceful degradation:
- `backdrop-filter` (Chrome 76+, Safari 9+, Firefox 103+)
- CSS Grid and Flexbox
- CSS Custom Properties
- IntersectionObserver API
- WebP image format (with fallbacks if needed)

## 🔒 Security & Performance

- **Content Security Policy** headers defined
- **Strict referrer policy** for privacy
- **Preload hints** for critical resources (hero image)
- **DNS prefetch** for external domains (LinkedIn, YouTube, etc.)
- **Lazy loading** for non-critical images
- **Optimized images**: WebP format with appropriate compression
- **Minimal JavaScript**: Vanilla JS, no heavy frameworks
- **No external dependencies**: Except Google Fonts

## 📝 Content Sections

1. **Hero**: Full-viewport intro with bold typography
2. **About**: Revealing text animation on scroll
3. **Statistics**: Animated counters with particle background
4. **Skills**: Three categories with expandable accordion items
   - IT Infrastructure & Deployment
   - Automation & System Integration
   - IT Security & Data Analysis
5. **Contact**: Footer with social links and email

## 📄 License

All rights reserved. © 2026 Ceyhan Molla.
*Note: The live website automatically displays the current year in the copyright notice using JavaScript.*

---

**Live Site**: https://www.ceyhanmolla.com (after DNS propagation)  
**GitHub**: https://github.com/ceyhanmolla/ceyhanmolla.com