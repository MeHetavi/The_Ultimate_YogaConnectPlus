import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
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
import Orders from './pages/Dashbard/Orders';
import ChangePassword from './pages/Dashbard/ChangePassword';
import NotFound from './pages/Error/NotFound';
import { useSelector } from 'react-redux';
import Cart from './pages/Shop/Cart';
import Wishlist from './pages/Shop/Wishlist';
import VideoCall from './pages/Dashbard/VideoCall';
import LeftNavbar from './Components/Skeleton/LeftNavbar';



function App() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const handlePageRefresh = () => {
      if (window.performance && window.performance.navigation.type === 1) {
        // Navigation type 1 indicates a page refresh
        window.location.href = '/';
      }
    };

    handlePageRefresh(); // Check on initial load
    window.addEventListener('load', handlePageRefresh);

    return () => {
      window.removeEventListener('load', handlePageRefresh);
    };
  }, []);

  // Helper function to render protected routes
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/404" replace />;
  };

  return (
    <div className="App">
      <AnimatedCursor></AnimatedCursor>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
      </style>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gate" element={<Gate />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/dashboardNav" element={<LeftNavbar />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/progress" element={<ProtectedRoute element={<Progress />} />} />
          <Route path="/updateProfile" element={<ProtectedRoute element={<UpdateProfile />} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/explore/profile/:username" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/shop/:genere" element={<ShopByGenere />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
          <Route path="/changePassword" element={<ProtectedRoute element={<ChangePassword />} />} />
          <Route path="/videoCall" element={<VideoCall />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/wishlist" element={<ProtectedRoute element={<Wishlist />} />} />

          {/* 404 Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
