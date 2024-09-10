import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Gate from './pages/Gate/Gate';
import Explore from './pages/Explore/Explore'
import Dashboard from './pages/Dashbard/Dashboard';
import Shop from './pages/Shop/Shop';
import AnimatedCursor from './Components/Cursor';
import Profile from './pages/Trainer`s Profile/Profie';
import ShopByGenere from './pages/Shop/ShopByGenere';

function App() {
  return (
    <div className="App">
      <AnimatedCursor></AnimatedCursor>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
      </style>
      {/* <AnimatedCursor /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gate" element={<Gate />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/explore/profile/:username" element={<Profile />} />
          <Route path="/shop/:genere" element={<ShopByGenere />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
