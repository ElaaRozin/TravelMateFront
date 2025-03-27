import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import Footer from '../Footer/Footer';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  return (
    <div>
      <NavBar/>
    <div className="home-container">
      <div className="overlay">
        <h1>Welcome to TravelMate ✈️</h1>
        <p>Plan your next adventure with ease and discover new destinations.</p>
        {!token&&<button onClick={() => navigate("/register")}>Get Started</button>}
        { token && (<button onClick={() => navigate("/profile")}>To Your Profile</button>)}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Home;
