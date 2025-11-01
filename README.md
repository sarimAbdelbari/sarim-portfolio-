# 🌟 Sarim Kerroucha - Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Full-Stack Developer. Built with cutting-edge technologies and featuring smooth animations, elegant design, and optimal performance.

![Portfolio Preview](public/assets/images/PortfolioProject1.png)

## 🚀 Live Demo

**Website:** [sarimabdelbari.vercel.app](https://sarimabdelbari.vercel.app/)

## 👨‍💻 About Me

I'm **Sarim Kerroucha**, a passionate Full-Stack Developer with over 2 years of experience crafting digital experiences. Currently working as a Full Stack Web Developer at **Groupe Chiali**, where I design and implement scalable solutions using modern web technologies.

- 🎓 **Bachelor's in Computer Science** - Université Djillali Liabes (2020-2023)
- 💼 **Full Stack Developer** - Groupe Chiali (June 2024 - Present)
- 🏆 **Capstone Project**: LinkedIn-inspired networking platform (17.5/20)
- 🌱 **Specializations**: (ReactJS/NextJs) (NodeJS/ExpressJs), System Architecture, API Development

## ✨ Features

### 🎨 **Modern Design**
- Responsive design that works on all devices
- Dark/Light theme with smooth transitions
- Elegant animations powered by Framer Motion
- Clean and professional UI components

### ⚡ **Performance Optimized**
- **Advanced Image Preloading**: Custom loading system that preloads all assets before revealing content
- **Next.js Image Optimization**: Automatic WebP/AVIF conversion and responsive images
- **Smooth Loading Experience**: Cinema-style curtain animations with real-time progress tracking
- **Optimized Animations**: Animations start only after the content is fully loaded

### 🎭 **Interactive Elements**
- **Typewriter Effect**: Dynamic role switching animation
- **Floating Tech Icons**: Animated technology stack showcase
- **Hover Effects**: Subtle interactions throughout the site
- **Smooth Scrolling**: Enhanced navigation experience

### 🔧 **Technical Features**
- **Component-Based Architecture**: Modular and maintainable code structure
- **Custom Loading Context**: Prevents animation conflicts during loading
- **Error Handling**: Graceful fallbacks for image loading failures
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.2.3 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.6.3
- **UI Components**: Radix UI primitives
- **Typography**: Google Fonts (Inter, JetBrains Mono)

### **Development**
- **Language**: JavaScript/JSX
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm
- **Build Tool**: Next.js with Turbopack

### **Key Libraries**
```json
{
  "framer-motion": "^12.6.3",      // Animations
  "react-simple-typewriter": "^5.0.1", // Typewriter effect
  "swiper": "^11.2.10",            // Blog carousel
  "next-themes": "^0.4.6",         // Theme switching
  "tailwind-merge": "^3.1.0"       // Dynamic className handling
}
```

## 📂 Project Structure

```
sarim-portfolio/
├── app/                          # Next.js App Router
│   ├── (pages)/blog/            # Blog page
│   ├── globals.css              # Global styles
│   ├── layout.jsx               # Root layout
│   └── page.jsx                 # Home page
├── components/
│   ├── layout/                  # Layout components
│   │   ├── loadingWarpper.jsx   # Advanced loading system
│   │   ├── navBar.jsx           # Navigation
│   │   ├── scrollIndicator.jsx  # Scroll progress
│   │   └── sidemenu.jsx         # Mobile menu
│   ├── sections/                # Page sections
│   │   ├── hero.jsx             # Hero section with animations
│   │   ├── aboutMe.jsx          # About section
│   │   ├── projects.jsx         # Portfolio showcase
│   │   ├── blog.jsx             # Blog carousel
│   │   └── contact.jsx          # Contact form
│   ├── ui/                      # Reusable UI components
│   └── provider/                # Context providers
├── public/assets/               # Static assets
│   ├── images/                  # Project & blog images
│   ├── svg/                     # Icon assets
│   └── pdf/                     # Resume
└── lib/                         # Utility functions
```

## 🎯 Key Sections

### 🏠 **Hero Section**
- Animated introduction with typewriter effect
- Floating technology icons (React, Next.js, Node.js, TypeScript)
- Call-to-action buttons with hover animations
- Background particle system

### 📖 **About Me**
- Professional timeline with education and experience
- Interactive hover effects
- Detailed accomplishments and skills

### 💼 **Projects Portfolio**
- **Featured Project**: Fikrat Tech Agency
- **4 Additional Projects**: Pyramid CMS, VitaLife, Feather Platform, Portfolio
- Interactive image galleries with navigation
- Technology stack badges
- Live demo and source code links

### 📝 **Blog Section**
- Swiper.js carousel for smooth navigation
- Blog post previews with images
- Category filtering and read time indicators

### 📬 **Contact**
- Professional contact information
- Social media links
- Resume download option

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sarimAbdelbari/sarim-portfolio-.git
cd sarim-portfolio-
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration

### **Theme Customization**
The site uses a custom theme configuration in `tailwind.config.js`:
- Primary colors: Blue gradient scheme
- Typography: Inter (body), JetBrains Mono (code)
- Dark/Light mode support

### **Loading System**
Custom image preloading in `components/layout/loadingWarpper.jsx`:
- Preloads all critical images before content reveal
- Real-time progress tracking
- Fallback mechanisms for slow connections
- Cinema-style reveal animation

### **Animation System**
Framer Motion animations are optimized to:
- Start only after loading completes
- Provide smooth, synchronized motion
- Include hover and interaction states
- Support reduced motion preferences

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Enhanced touch interactions
- **Performance**: Optimized images and lazy loading

## 🎨 Design Philosophy

- **Minimalist**: Clean, focused design without clutter
- **Professional**: Suitable for business and client presentations
- **Interactive**: Engaging without being distracting
- **Accessible**: WCAG compliant with keyboard navigation
- **Fast**: Optimized for Core Web Vitals

## 📈 Performance Features

- **Lighthouse Score**: 90+ across all metrics
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Optimized caching strategies
- **Bundle Analysis**: Optimized package sizes

## 🤝 Contributing

While this is a personal portfolio, I welcome suggestions and feedback:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: [sarimabdelbari@gmail.com](mailto:sarimabdelbari@gmail.com)
- **LinkedIn**: [Sarim Kerroucha](https://linkedin.com/in/sarimkerroucha)
- **GitHub**: [@sarimAbdelbari](https://github.com/sarimAbdelbari)
- **Portfolio**: [sarimabdelbari.vercel.app](https://sarimabdelbari.vercel.app/)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Framer Motion** for beautiful animations
- **Vercel** for seamless deployment
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible component primitives

---

⭐ **If you like this project, please give it a star!** ⭐

*Built with ❤️ by Sarim Kerroucha*
