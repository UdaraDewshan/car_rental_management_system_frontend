import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCarPage from './pages/admin/AddCarPage';
import ManageCarsPage from './pages/admin/ManageCarsPage';
import DashboardPage from './pages/admin/DashboardPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        <Navbar />

        <Routes>
          <Route path="/" element={<DashboardPage />} /> 
          
          <Route path="/admin/add-car" element={<AddCarPage />} />
          <Route path="/admin/manage-cars" element={<ManageCarsPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;