import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/account/Home';
import Login from './component/account/Login';
import Projects from './component/account/Projects';
import Footer from './component/account/Footer'; // Import Footer
import Header from './component/account/Header';
import Usercontext from './Context/context';
import { AuthProvider } from './Context/Contextprovider';

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Projects" element={<Projects />} />
          </Routes>
        </>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;