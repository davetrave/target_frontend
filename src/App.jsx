import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseList from './components/CourseList';
// import AddCourseForm from './components/AddCourseForm';
import CourseDetail from './components/CourseDetail';
import BottomNavBar from './components/BottomNavBar';
import LandingPage from './components/LandingPage';
import Login from './components/Login'
import Register from "./components/Register"
import Protected from "./components/ProtectedRoute"

const App = () => {

  const HandleRegister = (route, method) => {
    localStorage.clear()
    return <Register />
  }
  
  return (
    
    
     <BrowserRouter>
       
         <Routes>
          
            <Route path="/" exact element={<Protected><LandingPage /></Protected>} />
            <Route path="/home" exact element={<Protected><LandingPage /></Protected>} />
            <Route path="/courses" exact element={<Protected><CourseList /></Protected>} />
            {/* <Route path="/settings" element={<Protected><SettingsPage /></Protected>} /> */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/course/:id" element={<Protected><CourseDetail /></Protected>} />
           <Route path="/login" exact element={<Login />} />
           <Route path="/register" exact element={<HandleRegister />} />
           
         </Routes>
         <BottomNavBar/>
       
     </BrowserRouter>
     
  );
};



const SettingsPage = () => {
    return (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p>Manage your account settings here.</p>
  </div>
    );
  };

export default App;
