import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import TrafficScreen from './Screens/TrafficScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AccountScreen from './Screens/AccountScreen';
import HeaderScreen from './Components/HeaderScreen';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <HeaderScreen />
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
