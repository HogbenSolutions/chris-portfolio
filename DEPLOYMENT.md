# Deployment Configuration Guide

## GitHub Pages Setup

Your portfolio is ready to deploy to GitHub Pages for free hosting!

### Option 1: User/Organization Repository (Recommended)

If using `christopherhogben.github.io` repository:

1. **Create the repo** on GitHub named exactly: `christopherhogben.github.io`

2. **Initialize git** (if not already done):
```bash
cd /Users/christopherhogben/Documents/chris-portfolio
git init
git add .
git commit -m "Initial MERN portfolio commit"
```

3. **Add remote and deploy**:
```bash
git remote add origin https://github.com/christopherhogben/christopherhogben.github.io.git
git branch -M main
git push -u origin main
npm run deploy
```

4. **Your site is live at**: https://christopherhogben.github.io

### Option 2: Project Repository

If using a different repository name (e.g., `portfolio`):

1. **Update configuration files**:

   **package.json:**
   ```json
   "homepage": "https://christopherhogben.github.io/portfolio"
   ```

   **vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/portfolio/',
     plugins: [react()],
     // ... rest
   })
   ```

2. **Git setup**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/christopherhogben/portfolio.git
git branch -M main
git push -u origin main
```

3. **Deploy**:
```bash
npm run deploy
```

4. **Your site is live at**: https://christopherhogben.github.io/portfolio

### Option 3: Custom Domain

After deploying to GitHub Pages:

1. **In your GitHub repo settings:**
   - Go to Settings > Pages
   - Under "Custom domain" enter your domain (e.g., hogben.solutions)
   - Check "Enforce HTTPS"

2. **DNS Configuration:**
   Update your domain's DNS records:
   ```
   A record: 185.199.108.153
   A record: 185.199.109.153
   A record: 185.199.110.153
   A record: 185.199.111.153
   
   OR CNAME record: christopherhogben.github.io
   ```

3. **Verify** the CNAME file was created (GitHub handles this)

## Automatic Deployment Workflow

### Using GitHub Actions (Optional)

For automatic deployment on every push, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Then just push to main and it auto-deploys!

## Manual Deployment Checklist

- [ ] Repository created on GitHub
- [ ] Local git initialized: `git init`
- [ ] Files committed: `git add .` && `git commit -m "message"`
- [ ] Remote added: `git remote add origin <URL>`
- [ ] Pushed to GitHub: `git push -u origin main`
- [ ] `package.json` homepage updated (if not using username.github.io)
- [ ] `vite.config.js` base updated (if not using username.github.io)
- [ ] Run: `npm run deploy`
- [ ] Check GitHub Actions/Pages in repo settings
- [ ] Verify site is live

## Troubleshooting

### Build errors:
```bash
npm run build
# Check console for errors
```

### Deploy issues:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Try deploy again
npm run deploy
```

### 404 errors on subpages:
- Check `base` in `vite.config.js` matches your URL path
- Check `homepage` in `package.json` matches your deployment URL

### GitHub Pages not showing:
1. Go to repo Settings > Pages
2. Verify source is set to "Deploy from a branch"
3. Branch should be `gh-pages` (created by `npm run deploy`)
4. Wait 1-2 minutes for GitHub to process

## After Deployment

1. **Test the site** - Visit your GitHub Pages URL
2. **Update DNS** - If using custom domain
3. **Verify all links** - Navigation and contact form
4. **Check mobile** - Responsive design
5. **Monitor** - Use GitHub Analytics

## Update Workflow

After deployment, for future updates:

```bash
# Make changes to components
# Then:
git add .
git commit -m "Update: description of changes"
git push origin main

# For GitHub Pages:
npm run deploy

# That's it! Site updates automatically
```

## Need Help?

- GitHub Pages Docs: https://pages.github.com
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
- gh-pages package: https://www.npmjs.com/package/gh-pages
