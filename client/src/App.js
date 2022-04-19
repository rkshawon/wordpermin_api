import './App.css';
import Topbar from './components/topbar/Topbar';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import Advance from './pages/advance/Advance';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Common from './pages/common/Common';
import Unique from './pages/unique/Unique';
import Register from './pages/register/Register';
import Alphabetical from './pages/alphabetical/Alphabetical';
function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <Topbar/>
        <div className="main">
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/advance" element={<Advance />} />
            <Route path="/alphabetical" element={<Alphabetical />} />
            <Route path="/commonword" element={<Common />} />
            <Route path="/uniqueword" element={<Unique />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      <Footer/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
