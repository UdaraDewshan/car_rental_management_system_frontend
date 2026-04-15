import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AddCarPage from './pages/admin/AddCarPage';
import ManageCarsPage from './pages/admin/ManageCarsPage';
import DashboardPage from './pages/admin/DashboardPage';

import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppLayout() {
  const location = useLocation();
  
  const isPublicPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {!isPublicPage && <Navbar />}

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} /> 

          <Route path="/admin/dashboard" element={<DashboardPage />} /> 
          <Route path="/admin/add-car" element={<AddCarPage />} />
          <Route path="/admin/manage-cars" element={<ManageCarsPage />} />
        </Routes>
      </main>

      {!isPublicPage && <Footer />}

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