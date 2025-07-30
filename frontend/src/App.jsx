import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctor from './pages/Doctors'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const App=()=> {
  return (
    <div className=''>
      <ToastContainer/>
      <Navbar/>
      <Routes>
         <Route  path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/doctors' element={<Doctor/>}/>
        <Route path='/doctors/:speciality' element={<Doctor/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/> 
        <Route path='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        
      </Routes>
      <Footer/>

    
    </div>
  )
}

export default App