import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Admin Pages
import AddCarPage from './pages/admin/AddCarPage';
import ManageCarsPage from './pages/admin/ManageCarsPage';
import DashboardPage from './pages/admin/DashboardPage';

// Public Pages
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage'; 
import AboutPage from './pages/AboutPage'; 
import FleetPage from './pages/FleetPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Components
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import PublicFooter from './components/PublicFooter';
import AdminRoute from './components/AdminRoute'; // 🔴 අලුත් ගාඩ්ව ගත්තා!

function AppLayout() {
  const location = useLocation();
  
  const publicPages = ['/', '/login', '/signup', '/contact', '/about', '/fleet'];
  const isPublicPage = publicPages.includes(location.pathname);

  const hideFooterPages = ['/', '/login', '/signup'];
  const showFooter = !hideFooterPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {!isPublicPage && <Navbar />}

      <main className="flex-1 flex flex-col">
        <Routes>
          {/* ========================================== */}
          {/* 1. මේවා Public පිටු (ඕනෑම කෙනෙක්ට යන්න පුළුවන්) */}
          {/* ========================================== */}
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/fleet" element={<FleetPage />} />
          
          {/* ========================================== */}
          {/* 2. මේවා Protected පිටු (Admin ට විතරයි යන්න පුළුවන්) */}
          {/* AdminRoute එක ඇතුලේ මේවා දැම්මම ඉබේම ආරක්ෂා වෙනවා */}
          {/* ========================================== */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} /> 
            <Route path="/admin/add-car" element={<AddCarPage />} />
            <Route path="/admin/manage-cars" element={<ManageCarsPage />} />
          </Route>

        </Routes>
      </main>

      {showFooter && (
        isPublicPage ? <PublicFooter /> : <Footer />
      )}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;