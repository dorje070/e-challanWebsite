import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import TrafficScreen from './Screens/TrafficScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';

function App() {
  const data = localStorage.getItem('userInfo');
  var isempty = false;
  if (data === null) {
    isempty = true;
  }

  const signOutHandler = () => {
    localStorage.removeItem('userInfo');
    console.log(data);
    window.location.href = '/';
  };
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
        {isempty ? (
          <NavLink to="/login" className="NavLink">
            sign in
          </NavLink>
        ) : (
          <NavLink to="/" className="NavbarLink" onClick={signOutHandler}>
            sign out
          </NavLink>
        )}
      </div>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/traffic" element={<TrafficScreen />}></Route>
            <Route path="/traffic/profile" element={<ProfileScreen />}>
              {' '}
            </Route>
          </Routes>
        </main>
      </div>
      ;
    </BrowserRouter>
  );
}

export default App;
