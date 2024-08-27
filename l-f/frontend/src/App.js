import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import FrontPage from './Components/FrontPage'; // Import the FrontPage component
import Main from './Components/Main';
import LostItemForm from './Components/LostItemForm';




function App() {
  return (
    <>
    <Router>
      <div>
        
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/main"  element={<Main/>}/>
          <Route path="/lost-item"  element={<LostItemForm/>}/>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<FrontPage />} /> {/* Load FrontPage along with Navbar */}
          <Route path="/FrontPage" element={<FrontPage />} /> {/* Add a route for the FrontPage */}
          {/* Add more routes for other pages */}
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;



