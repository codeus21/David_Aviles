# David Aviles - Portfolio Website

A modern, responsive portfolio website built with React and Vite. This website showcases my skills, projects, and provides a way to get in touch with a beautiful, animated interface.

## ✨ Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode Toggle** - Switch between themes
- **Mobile-First Navigation** - Hamburger menu for mobile devices
- **Smooth Animations** - Typewriter effect, slide-in animations, and floating backgrounds
- **Interactive Contact Form** - EmailJS integration for direct messaging
- **Project Showcase** - Display your projects with live demos and GitHub links
- **Skills Display** - Organized skill categories with hover effects
- **Professional Styling** - Modern gradients, shadows, and typography

## 🛠️ Technologies Used

- **Frontend**: React 19, JavaScript (ES6+)
- **Styling**: CSS3 with CSS Variables and Animations
- **Build Tool**: Vite
- **Email Service**: EmailJS
- **Deployment**: Vercel/Netlify ready

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/codeus21/David_Aviles.git
```

2. Navigate to the project directory
```bash
cd my-website
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `dist` folder.

## 📁 Project Structure

```
my-website/
├── src/
│   ├── components/
│   │   └── TypeWriter.jsx      # Typewriter animation component
│   ├── PersonalWebsite.jsx     # Main portfolio component
│   ├── PersonalWebsite.css     # All styling and animations
│   └── main.jsx               # Entry point
├── public/
│   └── BarberBook-screenshot.png  # Project screenshot
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
└── package.json              # Project dependencies
```

## 🎨 Key Features Explained

### Mobile Navigation
- Hamburger menu that slides down from the top
- Auto-hides when scrolling or clicking outside
- Smooth animations and transitions

### Animations
- **Typewriter Effect**: Cycling text in the hero section
- **Slide-in Animations**: Elements appear as you scroll
- **Floating Background**: Subtle moving particles in the hero section
- **Hover Effects**: Interactive elements with smooth transitions

### Contact Form
- Integrated with EmailJS for direct email sending
- Form validation and status messages
- Loading states and error handling

## 🌐 Deployment

This project is ready for deployment on:
- **Vercel** (recommended for React/Vite projects)
- **Netlify** (great for static sites)
- **GitHub Pages** (free hosting)

## 📱 Mobile Testing

To test on mobile devices:
1. Run `npm run dev`
2. Find your computer's IP address
3. Visit `http://YOUR_IP:5173` on your mobile device
4. Both devices must be on the same WiFi network

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

David Aviles - [Your Email]
- GitHub: [@codeus21](https://github.com/codeus21)
- Portfolio: [Live Demo](your-deployed-url-here)
