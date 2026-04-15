import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCarPage from './pages/admin/AddCarPage';
import ManageCarsPage from './pages/admin/ManageCarsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        
        <Navbar />
        
        <Routes>
          <Route path="/" element={<div className="flex items-center justify-center h-96"><h2 className="text-3xl font-bold text-slate-400">Welcome to CarDirect Dashboard</h2></div>} />
          <Route path="/admin/add-car" element={<AddCarPage />} />
          <Route path="/admin/manage-cars" element={<ManageCarsPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;