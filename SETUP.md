# Getting Started - MERN Portfolio Setup

## What's Been Done ✅

Your portfolio has been completely redesigned with React and a MERN stack focus:

### New Features
- **React Components** - Modular architecture with Header, Hero, Projects, Skills, Contact, and Footer
- **Vite Build Tool** - Ultra-fast development and production builds
- **MERN Projects Showcase** - 6 featured project examples highlighting full-stack capabilities
- **Skills Matrix** - Organized by Frontend, Backend, Database, and DevOps with progress bars
- **Modern UI** - Gradient animations, smooth transitions, and responsive design
- **GitHub Pages Ready** - Free hosting with one command

## Quick Start

### 1. Install Dependencies (Already Done!)
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Opens at http://localhost:3000

### 3. Deploy to GitHub Pages

First time setup:
```bash
npm run deploy
```

This builds and deploys your site to GitHub Pages. It will be live at:
- `https://christopherhogben.github.io` (if using username.github.io repo)
- Or your custom domain if configured

## File Structure

```
chris-portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx & Header.css
│   │   ├── Hero.jsx & Hero.css
│   │   ├── Projects.jsx & Projects.css
│   │   ├── Skills.jsx & Skills.css
│   │   ├── Contact.jsx & Contact.css
│   │   └── Footer.jsx & Footer.css
│   ├── App.jsx & App.css
│   ├── main.jsx
│   ├── index.css
│   └── vite.config.js
├── index.html
├── package.json
└── README.md
```

## Customization Guide

### Update Portfolio Content

1. **Hero Section** - `src/components/Hero.jsx`
   - Change headline
   - Update tech stack badges
   - Modify code example

2. **Projects** - `src/components/Projects.jsx`
   - Edit the `projects` array with your real projects
   - Update project descriptions, tech, and features

3. **Skills** - `src/components/Skills.jsx`
   - Modify the `skills` array
   - Adjust proficiency levels (0-100)

4. **Contact Form** - `src/components/Contact.jsx`
   - Get form ID from [formspree.io](https://formspree.io)
   - Replace `action="https://formspree.io/f/YOUR_FORM_ID"`

5. **Footer Links** - `src/components/Footer.jsx`
   - Update GitHub, LinkedIn URLs
   - Change email address

### Customize Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --accent: #7c5cff;        /* Primary purple */
  --accent-2: #22d1ee;      /* Cyan */
  --accent-3: #ff7ad9;      /* Magenta */
  --accent-4: #5eead4;      /* Teal */
}
```

## Deployment Steps

### GitHub Pages Deployment

1. Create/use a repository on GitHub
2. Make sure `git` is initialized in your project folder
3. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Your site goes live! Check:
   - `https://christopherhogben.github.io` (if using username.github.io)
   - Or your configured custom domain

### Important for Non-User Repos

If NOT using `christopherhogben.github.io`, update:

**package.json:**
```json
"homepage": "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME"
```

**vite.config.js:**
```javascript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
  // ... rest of config
})
```

## What's Included

✅ Complete React app with 6 components
✅ 6 example MERN projects with descriptions
✅ Skills breakdown by category
✅ Contact form integration ready
✅ Mobile-responsive design
✅ Dark theme with gradients
✅ Smooth animations
✅ GitHub Pages deployment configured
✅ Production build optimized
✅ SEO-ready HTML

## Next Steps

1. **Customize your content** - Update projects, skills, and personal info
2. **Add your GitHub/LinkedIn** - Update footer social links
3. **Set up contact form** - Get Formspree ID and update Contact component
4. **Deploy!** - Run `npm run deploy`

## Useful Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run deploy    # Build and deploy to GitHub Pages
```

## Need Help?

- Check the updated README.md
- Examine component files for structure
- Vite docs: https://vitejs.dev
- React docs: https://react.dev
- GitHub Pages: https://pages.github.com

Enjoy your new MERN-focused portfolio! 🚀
