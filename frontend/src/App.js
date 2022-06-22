import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import TrafficScreen from './Screens/TrafficScreen';
import LoginScreen from './Screens/LoginScreen';

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api');
      console.log(result);
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <div>
        <NavLink to="/" className="NavbarLink">
          Home
        </NavLink>{' '}
        <NavLink to="/login" className="NavLink">
          login
        </NavLink>
      </div>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/traffic" element={<TrafficScreen />}></Route>
          </Routes>
        </main>
      </div>
      ;
    </BrowserRouter>
  );
}

export default App;
