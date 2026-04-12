import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddCarPage from './pages/admin/AddCarPage';
import ManageCarsPage from './pages/admin/ManageCarsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <h1 className="text-xl font-black text-indigo-600 tracking-tighter uppercase">CarDirect<span className="text-slate-900">.</span></h1>
          <div className="flex gap-6">
            <Link to="/" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">Home</Link>
            <Link to="/admin/manage-cars" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">Manage Fleet</Link>
            <Link to="/admin/add-car" className="bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md shadow-indigo-100">Add New Car</Link>
          </div>
        </nav>

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