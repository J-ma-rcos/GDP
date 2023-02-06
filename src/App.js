import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home';
import Company from './Components/Pages/Company';
import NewProject from './Components/Pages/newproject';
import Contact from './Components/Pages/Contact';
import Projects from './Components/Pages/Projects';
import Project from './Components/Pages/Project';


import Container from './Components/Layout/Container';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';


function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/newproject" element={<NewProject/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/project/:id" element={<Project/>}/>
        </Routes>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;
