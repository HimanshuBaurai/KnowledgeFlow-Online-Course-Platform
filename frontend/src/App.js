import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../src/components/Home/Home.jsx'
import Header from './components/Layout/Header/Header.jsx';
import Courses from './components/Courses/Courses.jsx';
import Footer from './components/Layout/Footer/Footer.jsx';
import Login from './components/Auth/Login.jsx';

function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
