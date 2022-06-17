import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import TrafficScreen from './Screens/TrafficScreen';

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      console.log(result);
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/traffic" element={<TrafficScreen />}></Route>
          </Routes>
        </main>
      </div>
      ;
    </BrowserRouter>
  );
}

export default App;
