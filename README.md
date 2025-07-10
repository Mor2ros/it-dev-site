# IT-Dev-Site

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🌐 Multilanguage (RU/EN)
- 🛠️ Admin panel for content management
- 🖼️ Custom icon selection for services
- 📧 Up-to-date contact email: Teamastriks@gmail.com
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Admin Panel

- Go to `/admin` route to access the admin panel.
- Default login: `admin` / `admin123`
- Manage services, testimonials, team, and contacts.
- For each service, you can select an icon from a visual list.
- All changes are saved to the SQLite database.

## Customizing Service Icons

- In the admin panel, open the "Услуги" (Services) tab.
- For each service, click on the icon to select a new one from the available set.
- The selected icon will be shown on the main page for that service.

## Contact Email

- The contact email at the bottom of the site is now: **Teamastriks@gmail.com**
- This is reflected in both Russian and English versions.

## Viewing the Database

To view the contents of the SQLite database, run:

```bash
node view-db.cjs
```

This will print all services, testimonials, team members, and contacts to the console.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### GitHub Pages (Recommended)

The project is configured for automatic deployment to GitHub Pages.

1. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

2. **Automatic Deployment:**
   - Every push to the `main` branch will trigger automatic build and deployment
   - The site will be available at: `https://Mor2ros.github.io/it-dev-site`

3. **Manual Deployment:**
   ```bash
   npm run deploy
   ```

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router and AstrikS Team.
