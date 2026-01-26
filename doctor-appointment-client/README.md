# 🏥 MediMeet - Doctor Appointment Platform (Frontend)

> **A modern, responsive, and feature-rich React application for booking doctor appointments, managing health records, and uploading medical reports with beautiful UI/UX.**

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2-purple?logo=vite)](https://vitejs.dev/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Development](#-development)
- [Component Architecture](#-component-architecture)
- [State Management](#-state-management)
- [Styling Approach](#-styling-approach)
- [Performance Optimizations](#-performance-optimizations)
- [Best Practices](#-best-practices)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Secure login with JWT token storage
- Protected routes with automatic redirects
- Session persistence with localStorage
- Auto-logout on token expiry

### 👤 User Profile Management
- Complete profile view and edit
- Profile picture upload (5MB max)
- Real-time profile updates
- Account information display
- Profile picture in navbar

### 📅 Appointment Booking
- Browse available doctors by specialty
- Easy appointment scheduling
- Date and time selection
- Add medical concerns/notes
- View all appointments
- Cancel appointments with confirmation

### 📄 Medical Reports Management
- Upload reports to appointments (15MB max)
- Support for PDF, JPEG, PNG, DOC, DOCX, TXT
- Download uploaded reports
- Delete reports with confirmation
- View report history per appointment
- Expandable report section

### 🎨 Beautiful UI/UX
- Responsive design (mobile, tablet, desktop)
- Dark theme with emerald accents
- Smooth animations and transitions
- Loading states and spinners
- Toast notifications for feedback
- Accessible navigation and buttons

### 📚 Information & Education
- Frequently Asked Questions (FAQs)
- Medical specialties showcase
- Patient testimonials
- Featured doctors display
- Services overview

---

## 🛠 Tech Stack

### Core Framework
- **React** (v19.2) - UI library with hooks
- **React Router DOM** (v7.12) - Client-side routing
- **Vite** (v7.2) - Next-generation build tool

### State Management
- **Redux Toolkit** (v2.11) - State management
- **Redux** (v9.2) - Predictable state container
- **Redux Thunk** (v3.1) - Async thunk middleware

### HTTP Client
- **Axios** (v1.13) - Promise-based HTTP client

### Styling & UI
- **Tailwind CSS** (v4.1) - Utility-first CSS framework
- **Tailwind CSS Vite** (v4.1) - Vite plugin for Tailwind
- **Lucide React** (v0.563) - Beautiful SVG icons
- **React Icons** (v5.5) - Icon library (FontAwesome)

### Notifications & UX
- **React Toastify** (v11.0) - Toast notifications
- **TW Animate CSS** (v1.4) - Animation utilities

### Development Tools
- **ESLint** (v9.39) - Code linting
- **Vite Plugins** - React fast refresh

---

## 📁 Project Structure

```
doctor-appointment-client/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation with profile dropdown
│   │   ├── Footer.jsx          # Footer section
│   │   ├── DoctorCard.jsx      # Doctor display card
│   │   ├── Sidebar.jsx         # Sidebar navigation
│   │   ├── ProtectedRoute.jsx  # Route protection HOC
│   │   └── ...                 # Other components
│   ├── pages/
│   │   ├── Home.jsx            # Landing page + FAQs
│   │   ├── Login.jsx           # Login page
│   │   ├── Signup.jsx          # Registration page
│   │   ├── Services.jsx        # Doctor listing
│   │   ├── BookAppointment.jsx # Appointment booking
│   │   ├── MyAppointments.jsx  # Appointments view + reports
│   │   ├── MyProfile.jsx       # Profile management
│   │   ├── Dashboard.jsx       # User dashboard
│   │   └── ...                 # Other pages
│   ├── features/
│   │   └── auth/
│   │       └── authSlice.js    # Redux auth state
│   ├── app/
│   │   └── store.js            # Redux store config
│   ├── lib/
│   │   ├── data.js             # Mock data
│   │   ├── specialities.js     # Medical specialties
│   │   └── utils.js            # Utility functions
│   ├── utils/
│   │   └── api.js              # API client config
│   ├── assets/                 # Images and static files
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   ├── index.css               # Global styles
│   └── ...
├── public/                     # Public assets
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore patterns
├── package.json                # Dependencies
├── README.md                   # Documentation
└── index.html                  # HTML template
```

---

## 🚀 Installation

### Prerequisites
- Node.js v18 or higher
- npm or yarn package manager
- Backend server running on port 5000

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd doctor-appointment-client
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Create environment file**
```bash
cp .env.example .env
# Edit .env if needed (backend URL, API settings)
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

Application opens at `http://localhost:5173`

---

## 🛠 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Format code (if configured)
npm run format
```

### Environment Variables (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=MediMeet
VITE_APP_VERSION=1.0.0
```

---

## 🏗 Component Architecture

### Page Structure

**Home.jsx**
```
Header
├── Hero Section
├── Specialties Section
├── Features Section
├── Testimonials Section
├── FAQs Section (Accordion)
└── CTA Section
Footer
```

**MyAppointments.jsx**
```
Header
├── Appointment List
│   ├── Appointment Card
│   ├── Doctor Info
│   ├── Date/Time/Notes
│   ├── Reports Section (Expandable)
│   │   ├── Upload Button
│   │   └── Reports List
│   └── Cancel Button
└── Empty State
Footer
```

**MyProfile.jsx**
```
Header
├── Profile Card
│   ├── Profile Picture (with upload)
│   └── User Information
│       ├── Display Mode
│       └── Edit Mode
└── Account Information
Footer
```

### Component Reusability

- **ProtectedRoute**: Guards authenticated pages
- **DoctorCard**: Reusable doctor display component
- **FAQItem**: Accordion item for FAQs
- **Feature**: Feature showcase component

---

## 🔄 State Management

### Redux Store Structure

```javascript
{
  auth: {
    user: {
      _id: string,
      name: string,
      email: string,
      phone: string,
      profilePicture: string
    },
    token: string
  }
}
```

### Actions

```javascript
// Auth Actions
- loginUser(credentials)        // Async action
- updateUserProfile(data)       // Update local state
- logout()                      // Clear state

// Persistence
- State synced to localStorage
- Auto-restored on page reload
```

### Middleware

```javascript
- redux-thunk for async operations
- Redux Toolkit for immer immutability
- localStorage integration for persistence
```

---

## 🎨 Styling Approach

### Tailwind CSS Strategy

**Color Palette**
- Background: `slate-950`, `slate-900`, `slate-800`
- Primary: `emerald-400`, `emerald-500`, `emerald-600`
- Text: `white`, `slate-300`, `slate-400`
- Accents: `yellow-400`, `red-400`, `blue-400`

**Component Styling**
```jsx
// Consistent pattern used throughout
<div className="border border-emerald-900/20 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-6 hover:border-emerald-700/40 transition-all">
  {/* content */}
</div>
```

**Responsive Design**
```jsx
// Mobile-first approach
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

**Animations**
- Smooth transitions: `transition-all`, `duration-200`
- Loading spinners: `animate-spin`
- Hover effects: Scale, color, shadow changes
- Icon rotations: `rotate-180`, `transition-transform`

---

## ⚡ Performance Optimizations

### Code Splitting
- Route-based lazy loading (future implementation)
- Component-level code splitting

### Asset Optimization
- Vite optimizes imports
- Tailwind purges unused styles
- Icon library tree-shaking

### Rendering Optimization
- React 19 automatic optimizations
- Redux prevents unnecessary re-renders
- Memoization for expensive components (future)

### Bundle Analysis
```bash
# Check bundle size
npm run build
# Check dist/ folder for size breakdown
```

---

## 🎯 Best Practices Implemented

### Security
✅ **Token Management**
- JWT stored in Redux + localStorage
- Sent in Authorization header
- Auto-logout on token issues

✅ **User Data**
- No sensitive data in localStorage except token
- Password never stored client-side
- HTTPS recommended in production

✅ **File Uploads**
- Client-side file validation
- Size and type checks
- Server-side re-validation

### Code Quality
✅ **Component Structure**
- Functional components with hooks
- Proper state and effect management
- Cleanup functions in useEffect
- Custom hooks for reusable logic

✅ **Error Handling**
- Try-catch in API calls
- Toast notifications for feedback
- Proper loading states
- Error boundary ready (future)

✅ **Accessibility**
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance

### API Integration
✅ **HTTP Client**
- Axios configured with base URL
- Automatic header management
- Error response handling
- Timeout configuration

✅ **User Experience**
- Loading states for all async operations
- Success/error toast notifications
- Confirmation dialogs for destructive actions
- Responsive feedback mechanisms

---

## 🚀 Deployment

### Build Process

```bash
# Development build
npm run dev

# Production build
npm run build

# Output in dist/ directory
```

### Deployment Platforms

**Vercel (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Netlify**
```bash
# Connect GitHub repo to Netlify
# Auto-deploys on push
```

**Traditional Hosting**
```bash
# Build and serve dist/ folder
npm run build
# Serve dist/ with your web server
```

### Environment Configuration

**Production .env**
```env
VITE_API_URL=https://api.medimeet.com/api
VITE_APP_ENV=production
```

---

## 🧪 Testing Workflow

### Manual Testing Checklist

**Authentication**
- [ ] Register new user
- [ ] Login with credentials
- [ ] Token persists on refresh
- [ ] Logout clears state
- [ ] Protected routes redirect

**Appointments**
- [ ] Browse doctors
- [ ] Book appointment
- [ ] View my appointments
- [ ] Cancel appointment
- [ ] Appointment persists

**Reports**
- [ ] Upload report to appointment
- [ ] Download report
- [ ] Delete report
- [ ] Multiple reports per appointment

**Profile**
- [ ] View profile
- [ ] Edit profile
- [ ] Upload profile picture
- [ ] Picture shows in navbar

**UI/UX**
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] All icons display
- [ ] Animations smooth

---

## 🐛 Troubleshooting

### Common Issues

**Issue: API connection errors**
```
Solution:
- Check backend server is running on port 5000
- Verify VITE_API_URL in .env
- Check CORS configuration in backend
```

**Issue: Profile picture not showing**
```
Solution:
- Ensure /uploads folder exists in backend
- Check file permissions
- Verify backend /uploads route is served
```

**Issue: State lost on refresh**
```
Solution:
- localStorage is enabled in browser
- Check Redux persister middleware
- Verify authSlice saves to localStorage
```

**Issue: File upload failing**
```
Solution:
- Check file size (max 15MB for reports, 5MB for profile)
- Verify file format is supported
- Check backend multer configuration
- Ensure reports/ folder exists in backend
```

**Issue: Slow performance**
```
Solution:
- Clear browser cache
- Check network tab in DevTools
- Verify API response times
- Run npm run build and preview
```

---

## 📚 Learning Resources

### React & Hooks
- [React Documentation](https://react.dev)
- [React Hooks Guide](https://react.dev/reference/react)

### Redux & State Management
- [Redux Official Docs](https://redux.js.org)
- [Redux Toolkit](https://redux-toolkit.js.org)

### Styling
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Responsive Design Guide](https://tailwindcss.com/docs/responsive-design)

### Tools
- [Vite Documentation](https://vitejs.dev)
- [Axios Guide](https://axios-http.com)

---

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open Pull Request

### Code Standards
- Use functional components with hooks
- Follow existing code style
- Add comments for complex logic
- Test all features manually

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💼 About

Built with modern React and Tailwind CSS technologies for a seamless healthcare appointment experience. Designed with user experience and accessibility in mind.

### Highlights
- 🎨 Beautiful, responsive UI
- ⚡ Fast performance with Vite
- 🔒 Secure authentication
- 📱 Mobile-first design
- 🎯 User-friendly interface
- 🚀 Production-ready code

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Last Updated**: January 26, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
