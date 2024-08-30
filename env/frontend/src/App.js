import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Gate from './pages/Gate/Gate';
import Explore from './pages/Explore/Explore'
function App() {
  return (
    <div className="App">

      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
      </style>
      {/* <AnimatedCursor /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gate" element={<Gate />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
