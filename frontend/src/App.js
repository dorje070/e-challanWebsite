import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import TrafficScreen from './Screens/TrafficScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AccountScreen from './Screens/AccountScreen';

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

  return (
    <BrowserRouter>
      <div>
        {isempty ? (
          <div>
            <NavLink to="/" className="NavbarLink">
              Home
            </NavLink>{' '}
            <NavLink to="/login" className="NavLink">
              sign in
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/traffic" className="NavbarLink">
              Home
            </NavLink>{' '}
            <NavLink to="/traffic/profile" className="NavLink">
              profile
            </NavLink>{' '}
            <NavLink to="/traffic/account" className="NavLink">
              account
            </NavLink>{' '}
            <NavLink to="/" className="NavbarLink" onClick={signOutHandler}>
              sign out
            </NavLink>
          </div>
        )}
      </div>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/traffic" element={<TrafficScreen />}></Route>
            <Route path="/traffic/profile" element={<ProfileScreen />}></Route>
            <Route path="/traffic/account" element={<AccountScreen />}></Route>
          </Routes>
        </main>
      </div>
      ;
    </BrowserRouter>
  );
}

export default App;
