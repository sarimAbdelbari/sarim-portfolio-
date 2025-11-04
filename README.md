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
- 🌱 **Specializations**: MERN Stack, System Architecture, API Development

## ✨ Features

### 🎨 **Modern Design**
- Responsive design that works on all devices
- Dark/Light theme with smooth transitions
- Elegant animations powered by Framer Motion
- Clean and professional UI components
- Custom motion primitives for advanced animations

### ⚡ **Performance Optimized**
- **Advanced Image Preloading**: Custom loading system that preloads all assets before revealing content
- **Next.js Image Optimization**: Automatic WebP/AVIF conversion and responsive images
- **Smooth Loading Experience**: Cinema-style curtain animations with real-time progress tracking
- **Optimized Animations**: Animations start only after content is fully loaded
- **Lazy Loading**: Custom hooks for intelligent image lazy loading with intersection observer
- **Performance Mode**: Automatic motion reduction on smaller screens for better performance

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
- **Theme System**: Persistent dark/light mode using next-themes
- **Scroll Tracking**: Real-time scroll progress indicator
- **SEO Optimized**: Comprehensive metadata and Open Graph tags

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.2.3 (App Router)
- **UI Library**: React 19.0
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.6.3
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React 0.487
- **Typography**: Google Fonts (Inter, JetBrains Mono)

### **Development**
- **Language**: JavaScript/JSX
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm
- **Build Tool**: Next.js with Turbopack

### **Key Libraries**
```json
{
  "framer-motion": "^12.6.3",            // Advanced animations
  "react-simple-typewriter": "^5.0.1",   // Typewriter effect
  "swiper": "^11.2.10",                  // Blog carousel
  "next-themes": "^0.4.6",               // Theme switching
  "tailwind-merge": "^3.1.0",            // Dynamic className handling
  "lucide-react": "^0.487.0",            // Icon library
  "class-variance-authority": "^0.7.1",  // Component variant management
  "tw-animate-css": "^1.2.5",            // Additional animations
  "@radix-ui/react-dropdown-menu": "^2.1.6", // Dropdown components
  "@radix-ui/react-slot": "^1.1.2"       // Composition utilities
}
```

## 📂 Project Structure

```
sarim-portfolio/
├── app/                          # Next.js App Router
│   ├── (pages)/blog/            # Blog page route
│   ├── globals.css              # Global styles & animations
│   ├── layout.jsx               # Root layout with providers
│   └── page.jsx                 # Home page with all sections
├── components/
│   ├── layout/                  # Layout components
│   │   ├── loadingWarpper.jsx   # Advanced loading system
│   │   ├── navBar.jsx           # Navigation bar
│   │   ├── scrollIndicator.jsx  # Scroll progress indicator
│   │   ├── sidemenu.jsx         # Mobile menu drawer
│   │   └── lineSperator.jsx     # Section divider component
│   ├── sections/                # Page sections
│   │   ├── hero.jsx             # Hero section with typewriter
│   │   ├── aboutMe.jsx          # About & timeline section
│   │   ├── skills.jsx           # Skills with infinite slider
│   │   ├── projects.jsx         # Portfolio showcase
│   │   ├── blog.jsx             # Blog carousel
│   │   ├── comingSoonBlog.jsx   # Blog placeholder
│   │   └── contact.jsx          # Contact information
│   ├── ui/                      # Reusable UI components
│   │   ├── button.jsx           # Custom button component
│   │   ├── container.jsx        # Layout container
│   │   ├── dropdown-menu.jsx    # Dropdown menu (Radix UI)
│   │   └── toggle-mode.jsx      # Theme toggle switch
│   ├── motion-primitives/       # Custom animation components
│   │   ├── infinite-slider.jsx  # Infinite scrolling slider
│   │   └── progressive-blur.jsx # Gradient blur effects
│   ├── hooks/                   # Custom React hooks
│   │   ├── useLazyLoad.js       # Lazy loading with IntersectionObserver
│   │   └── usePerformanceMode.js # Auto motion reduction for mobile
│   └── provider/                # Context providers
│       └── theme-provider.jsx   # Dark/Light theme provider
├── public/assets/               # Static assets
│   ├── images/                  # Project & blog images
│   │   └── projects/            # Project screenshots
│   ├── skills/                  # Technology logos
│   ├── svg/                     # Icon assets
│   └── pdf/                     # Resume file
└── lib/                         # Utility functions
    ├── data.js                  # Project & category data
    └── utils.js                 # Helper functions (cn, etc.)
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

### 💡 **Skills Section**
- Infinite horizontal slider showcasing technology stack
- 12+ technologies including React, Next.js, Node.js, TypeScript
- Smooth hover interactions with speed adjustments
- Progressive blur edges for elegant visual effect
- Fully responsive with adaptive sizing

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

### Customization Guide

To customize this portfolio for your own use:

1. **Update Personal Information**
   - Edit `app/layout.jsx` for metadata and SEO
   - Update contact details in `components/sections/contact.jsx`
   - Replace resume in `public/assets/pdf/`

2. **Add Your Projects**
   - Update `lib/data.js` with your project information
   - Add project images to `public/assets/images/projects/`
   - Customize categories as needed

3. **Modify Skills**
   - Edit `components/sections/skills.jsx`
   - Add your technology logos to `public/assets/skills/`

4. **Customize Theme**
   - Adjust colors in `tailwind.config.js`
   - Modify animations in `app/globals.css`

5. **Update Assets**
   - Replace favicon in `public/assets/svg/`
   - Update hero images and backgrounds

## 🔧 Configuration

### **Theme Customization**
The site uses a custom theme configuration in `tailwind.config.js`:
- Primary colors: Blue gradient scheme
- Typography: Inter (body), JetBrains Mono (code)
- Dark/Light mode support
- Custom animations and transitions

### **Loading System**
Custom image preloading in `components/layout/loadingWarpper.jsx`:
- Preloads all critical images before content reveal
- Real-time progress tracking
- Fallback mechanisms for slow connections
- Cinema-style reveal animation

## 🏗️ Component Architecture

### **Layout Components**
- **LoadingWrapper**: Advanced preloading system with progress tracking
- **NavBar**: Responsive navigation with theme toggle
- **SideMenu**: Mobile-friendly drawer navigation
- **ScrollIndicator**: Visual feedback for scroll progress
- **LineSeparator**: Elegant section dividers with customizable variants

### **Section Components**
- **Hero**: Landing section with typewriter effect and floating icons
- **AboutMe**: Professional timeline and experience showcase
- **Skills**: Infinite slider with technology stack
- **Projects**: Filterable project gallery with multiple images per project
- **Blog**: Swiper carousel for blog posts
- **Contact**: Professional contact information and social links

### **UI Components** 
- **Button**: Customizable button with variants using CVA
- **Container**: Responsive layout wrapper with max-width constraints
- **DropdownMenu**: Radix UI based accessible dropdown
- **ToggleMode**: Theme switcher with smooth transitions

### **Animation System**
Framer Motion animations are optimized to:
- Start only after loading completes
- Provide smooth, synchronized motion
- Include hover and interaction states
- Support reduced motion preferences

### **Custom Hooks**

#### `useLazyLoad(imageSrc, options)`
Intelligent image lazy loading using Intersection Observer API:
- Loads images only when they enter the viewport
- Configurable threshold and root margin
- Built-in error handling with fallback support
- Returns loading states and ref for the element

#### `usePerformanceMode()`
Automatic performance optimization for mobile devices:
- Detects screen width < 768px (mobile/tablet)
- Enables motion reduction to improve performance
- Automatically updates on window resize
- Respects user's device capabilities

### **Custom Motion Components**

#### `InfiniteSlider`
Seamless infinite scrolling component:
- Configurable speed and hover speed
- Automatic content duplication for seamless loop
- Responsive gap and layout handling
- Used in Skills section for technology showcase

#### `ProgressiveBlur`
Gradient blur effect for elegant edge fading:
- Customizable blur direction (left/right)
- Adjustable blur intensity
- Pointer-events disabled for no interaction interference
- Perfect for carousel edges and sliders

### **Data Management**

#### `lib/data.js`
Centralized data structure for project content:
- **Categories**: 6 project categories (All, Landing Pages, SaaS/MVP, Tools, AI, Full Stack)
- **Projects Data**: Complete information for 5 portfolio projects
  - Project details, descriptions, and metadata
  - Technology stack arrays
  - Multiple images per project for galleries
  - Live URLs and GitHub repositories
  - Featured project flags
  
#### `lib/utils.js`
Utility functions for the application:
- **cn()**: Combines clsx and tailwind-merge for optimal className management
- Handles conditional classes and Tailwind CSS class conflicts

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Enhanced touch interactions
- **Performance**: Optimized images and lazy loading
- **Adaptive Animations**: Reduced motion on mobile for better performance

## 🎨 Design Philosophy

- **Minimalist**: Clean, focused design without clutter
- **Professional**: Suitable for business and client presentations
- **Interactive**: Engaging without being distracting
- **Accessible**: WCAG compliant with keyboard navigation
- **Fast**: Optimized for Core Web Vitals

## 📈 Performance Features

- **Lighthouse Score**: 90+ across all metrics
- **Image Optimization**: Next.js automatic optimization with WebP/AVIF
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Custom hooks with Intersection Observer
- **Performance Mode**: Automatic animation reduction on mobile
- **Turbopack**: Ultra-fast bundler for development
- **Caching**: Optimized caching strategies
- **Bundle Size**: Optimized dependencies and tree-shaking

## 🔍 SEO & Metadata

Comprehensive SEO optimization built into the application:
- **Meta Tags**: Title, description, keywords optimized for search engines
- **Open Graph**: Social media sharing previews configured
- **Author & Publisher**: Proper attribution and creator metadata
- **Structured Data**: Schema.org compatible metadata
- **Custom Favicon**: Unique branding with custom icon
- **Semantic HTML**: Proper heading hierarchy and semantic elements

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

- **Next.js Team** for the amazing framework and App Router
- **Framer Motion** for beautiful, powerful animations
- **Vercel** for seamless deployment and hosting
- **Tailwind CSS** for utility-first styling system
- **Radix UI** for accessible component primitives
- **Lucide** for the comprehensive icon library
- **Swiper.js** for the smooth carousel implementation
- **Open Source Community** for amazing tools and libraries

---

⭐ **If you like this project, please give it a star!** ⭐

*Built with ❤️ by Sarim Kerroucha*