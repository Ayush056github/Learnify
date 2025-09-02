# Learnify - AI-Powered Study Revolution

A modern, responsive website for Learnify, an AI-powered study platform that helps students transform their study materials with artificial intelligence.

## 🚀 Features

- **Modern Design**: Clean, professional UI with gradient accents
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Components**: Hover effects, smooth transitions, and modern UI patterns
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Next.js 14**: Latest React framework with App Router

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter)
- **Build Tool**: Next.js built-in bundler

## 📁 Project Structure

```
Learnify/
├── app/
│   ├── globals.css          
│   ├── layout.tsx          
│   └── page.tsx             
├── components/
│   ├── Header.tsx         
│   ├── Hero.tsx             
│   ├── Features.tsx         
│   ├── Testimonials.tsx   
│   ├── Pricing.tsx          
│   └── Footer.tsx           
├── package.json             
├── tailwind.config.js       
├── tsconfig.json            
└── README.md                
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studeezy
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

## 📱 Sections

### Header
- Fixed navigation with logo
- Navigation links (Features, Testimonials, Pricing)
- Action buttons (Sign In, Get Started)

### Hero Section
- AI-Powered Study Revolution tagline
- Main headline with gradient text
- Description and call-to-action buttons
- Trust indicators (No Credit Card, Free Forever, 10,000+ Students)

### Features
- 6 key features with icons
- Smart Document Upload, AI Analysis, Chat with Documents
- Smart Note Organization, Advanced Search, Study Recommendations

### Testimonials
- Student success stories
- 5-star ratings
- University affiliations

### Pricing
- 3 pricing tiers (Free Forever, Student Pro, Academic Plus)
- Feature comparisons
- Popular plan highlighting

### Footer
- Company information
- Product and company links
- Social media icons
- Legal links

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Purple**: Purple gradient (#a855f7 to #7c3aed)
- **Grays**: Neutral grays for text and backgrounds
- **Accents**: Green for success states, yellow for ratings

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Components
- **Buttons**: Primary (gradient), Secondary (outline)
- **Cards**: Rounded corners with subtle shadows
- **Icons**: Lucide React icon set

## 🔧 Customization

### Adding New Sections
1. Create a new component in the `components/` folder
2. Import and add it to `app/page.tsx`
3. Style using Tailwind CSS classes

### Modifying Colors
Update the color palette in `tailwind.config.js` under the `theme.extend.colors` section.

### Adding New Features
1. Add feature data to the `features` array in `Features.tsx`
2. Update the grid layout if needed
3. Add corresponding icons from Lucide React

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
# or
yarn build
```

### Start Production Server
```bash
npm start
# or
yarn start
```

### Deploy
The project can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
