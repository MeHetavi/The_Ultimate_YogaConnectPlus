import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';
import Home from './pages/Home/Home';
import Gate from './pages/Gate/Gate';
import Explore from './pages/Explore/Explore'
import Progress from './pages/Dashbard/Progress';
import Shop from './pages/Shop/Shop';
import AnimatedCursor from './Components/Cursor';
import Profile from './pages/Trainer`s Profile/Profie';
import ShopByGenere from './pages/Shop/ShopByGenere';
import UpdateProfile from './pages/Dashbard/UpdateProfile';
import Dashboard from './pages/Dashbard/Dashboard';
import { useNavigate } from 'react-router-dom';
function NavigationHandler({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('isReloading', 'true');
    };

    const handleLoad = () => {
      const isReloading = sessionStorage.getItem('isReloading');
      if (isReloading) {
        sessionStorage.removeItem('isReloading');
        navigate('/');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, [navigate]);

  return children;
}

function App() {
  return (
    <div className="App">
      <AnimatedCursor></AnimatedCursor>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
      </style>
      <BrowserRouter>
        <NavigationHandler>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gate" element={<Gate />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/explore/profile/:username" element={<Profile />} />
            <Route path="/shop/:genere" element={<ShopByGenere />} />
          </Routes>
        </NavigationHandler>
      </BrowserRouter>
    </div>
  );
}

export default App;
