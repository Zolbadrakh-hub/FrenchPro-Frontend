import React from 'react'
import './App.css';
import Home from './Components/Homepage/Home';
import Recorder from './Components/Recorder/Recorder';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Recorder' element={<Recorder/>}/>
        {/* <Route path='/*' element={<ErrorPage />}/> */}
      </Routes>
    </div>
    </Router>
  )
}

export default App
