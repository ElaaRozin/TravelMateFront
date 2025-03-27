import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Trip from './components/Trip/Trip';
import Contact from './components/Contact/Contact';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddTrip from './components/AddTrip/AddTrip';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/addTrip' element={<AddTrip/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trip/:tripId" 
          element={
            <ProtectedRoute>
              <Trip />
            </ProtectedRoute>
          } 
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
