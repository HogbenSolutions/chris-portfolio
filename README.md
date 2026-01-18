# Christopher Hogben - MERN Stack Portfolio

A modern, full-stack portfolio website showcasing MERN stack expertise and projects. Built with React, Vite, and styled with a stunning gradient UI.

## 🚀 Features

- **Modern React Components** - Clean, reusable component architecture
- **Vite Build Tool** - Lightning-fast development and production builds
- **Responsive Design** - Works seamlessly on all devices
- **Dark Theme** - Beautiful gradient-based dark UI with animations
- **MERN Focused** - Showcases MongoDB, Express, React, and Node.js expertise
- **GitHub Pages Ready** - Deploy for free with one command
- **SEO Optimized** - Meta tags and semantic HTML

## 📋 Project Structure

```
src/
├── components/
│   ├── Header.jsx / Header.css
│   ├── Hero.jsx / Hero.css
│   ├── Projects.jsx / Projects.css
│   ├── Skills.jsx / Skills.css
│   ├── Contact.jsx / Contact.css
│   └── Footer.jsx / Footer.css
├── App.jsx
├── App.css
├── main.jsx
├── index.css
└── vite.config.js
```

## 🛠️ Tech Stack

**Frontend:**
- React 18.2
- Vite 5.0
- CSS3 with animations

**Deployment:**
- GitHub Pages (free hosting)
- gh-pages npm package

## 📦 Installation & Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```
The app will open at http://localhost:3000

3. **Build for production:**
```bash
npm run build
```
Creates optimized build in `dist/` folder

## 🌐 Deployment to GitHub Pages

### Prerequisites
- GitHub repository for free hosting (christopherhogben.github.io recommended)

### Deploy with one command:

```bash
npm run deploy
```

This automatically:
1. Builds the React app
2. Deploys to GitHub Pages
3. Site goes live at your GitHub Pages URL

### Manual Setup

If deploying to a non-user repository:

1. Update `package.json`:
```json
"homepage": "https://github.com/USERNAME/repo-name"
```

2. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/repo-name/',
  // ...
})
```

## 📝 Customization

### Update Content

- **Header/Navigation** - `src/components/Header.jsx`
- **Hero Section** - `src/components/Hero.jsx`
- **Projects** - `src/components/Projects.jsx`
- **Skills** - `src/components/Skills.jsx`
- **Contact** - `src/components/Contact.jsx`
- **Footer** - `src/components/Footer.jsx`

### Customize Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --accent: #7c5cff;
  --accent-2: #22d1ee;
  --accent-3: #ff7ad9;
  --accent-4: #5eead4;
}
```

## 📧 Contact Form

Update the Formspree form ID in `src/components/Contact.jsx`:

```javascript
action="https://formspree.io/f/YOUR_FORM_ID"
```

## 📱 Responsive Design

Fully responsive across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## 🎨 Features

- Animated aurora background
- Smooth scroll behavior
- Interactive card animations
- Mobile hamburger menu
- Animated skill progress bars
- Form validation

## 🚀 Performance

- Optimized with Vite
- Minimal bundle size
- CSS animations only (no dependencies)
- Fast production builds

---

**Built with ❤️ using React & Vite**
