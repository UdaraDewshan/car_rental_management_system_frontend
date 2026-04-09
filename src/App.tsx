import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddCarPage from './pages/admin/AddCarPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
          <h1 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Car Rental Management System</h1>
          <div style={{ textAlign: 'center' }}>
            <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
            <Link to="/admin/add-car">Add New Car (Admin)</Link>
          </div>
        </nav>


        <Routes>
          <Route path="/" element={<h2 style={{ textAlign: 'center' }}>Welcome to the Home Page!</h2>} />
          
          <Route path="/admin/add-car" element={<AddCarPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;