import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/navbar'
import Content from './components/content'
import Footer from './components/footer'

function App() {
    return (
      <>
        <Router>
            <Navbar/>
            <Content/>
            <Footer/>
        </Router>
      </>
    );
}

export default App;