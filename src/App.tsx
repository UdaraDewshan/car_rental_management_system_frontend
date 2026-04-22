import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import AddCarPage from './pages/admin/AddCarPage';
import ManageCarsPage from './pages/admin/ManageCarsPage';
import DashboardPage from './pages/admin/DashboardPage';

import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FleetPage from './pages/FleetPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BookingPage from './pages/BookingPage';
import MyAccountPage from './pages/MyAccountPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PublicFooter from './components/PublicFooter';
import AdminRoute from './components/AdminRoute';
import ManageBookingsPage from './pages/admin/ManageBookingsPage';
import AddDriverPage from './pages/admin/AddDriverPage';


function AppLayout() {
  const location = useLocation();

  const publicPages = ['/', '/login', '/signup', '/contact', '/about', '/fleet', '/my-account'];
  const isPublicPage = publicPages.includes(location.pathname) || location.pathname.startsWith('/book/');

  const hideFooterPages = ['/', '/login', '/signup'];
  const showFooter = !hideFooterPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {!isPublicPage && <Navbar />}

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/add-car" element={<AddCarPage />} />
            <Route path="/admin/manage-cars" element={<ManageCarsPage />} />
            <Route path="/admin/manage-bookings" element={<ManageBookingsPage />} />
            <Route path="/admin/add-driver" element={<AddDriverPage />} />
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