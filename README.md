# 🚀 DevPorto - Personal Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Showcase your projects, skills, and experience with a beautiful and professional design.

![DevPorto Preview](https://img.shields.io/badge/DevPorto-Portfolio%20Website-blue?style=for-the-badge&logo=react)

## ✨ Features

- 🎨 **Modern Design** - Clean and professional UI with dark/light theme support
- 📱 **Fully Responsive** - Optimized for all devices (desktop, tablet, mobile)
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🔍 **SEO Optimized** - Meta tags and structured data for better search visibility
- 📱 **Mobile First** - Responsive design that works perfectly on mobile devices
- 🎯 **Smooth Navigation** - Seamless navigation between sections
- 🎨 **Custom UI Components** - Beautiful, reusable components built with shadcn/ui

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Lucide React** - Beautiful & consistent icon toolkit
- **Framer Motion** - Smooth animations and transitions

### Build Tools

- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing
- **TypeScript** - Type checking and compilation

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/DevPorto.git
   cd DevPorto
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
DevPorto/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   │   ├── assets/        # Images and media files
│   │   ├── favicon.svg    # Website favicon
│   │   └── logo.svg       # Logo files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   ├── sections/  # Page sections
│   │   │   └── ...        # Other components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   ├── pages/         # Page components
│   │   └── main.tsx       # Application entry point
│   ├── index.html         # HTML template
│   └── package.json       # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 Customization

### Personal Information

Update your personal information in the following files:

- `client/src/components/sections/Introduction.tsx` - Name, title, bio
- `client/src/components/sections/Experience.tsx` - Work experience
- `client/src/components/sections/Education.tsx` - Educational background
- `client/src/components/sections/Skills.tsx` - Skills and technologies
- `client/src/pages/Portfolio.tsx` - Portfolio projects

### Styling

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Update font families in CSS files
- **Themes**: Customize dark/light theme colors

### Images

Replace images in `client/public/assets/` with your own:

- Profile pictures
- Project screenshots
- Company logos
- Background images

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- **Desktop** (1200px+) - Full sidebar navigation
- **Tablet** (768px - 1199px) - Adaptive layout
- **Mobile** (< 768px) - Mobile-first design with collapsible navigation

## 🌙 Theme System

- **Light Theme** - Clean, professional appearance
- **Dark Theme** - Modern, eye-friendly dark mode
- **Auto-switching** - Respects user's system preferences
- **Manual toggle** - Users can manually switch themes

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `client/dist`
4. Deploy automatically on every push

### Vercel

1. Import your GitHub repository to Vercel
2. Set framework preset to Vite
3. Deploy with default settings

### GitHub Pages

1. Add `gh-pages` dependency
2. Update `package.json` scripts
3. Deploy with `npm run deploy`

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Build
npm run build        # Build the app
npm run preview      # Preview the build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Fast build tool

## 📞 Contact

**Kurniawan Dwi Saputra**

- GitHub: [@KDSdev94](https://github.com/KDSdev94)
- Portfolio: https://wawankds.netlify.app/
- Email: kurdwisap04@gmail.com

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Kurniawan Dwi Saputra.
