import React from 'react'
import Navbar from './components/Home/Navbar'
import MainPage from './components/Home/MainPage'
import FeaturePage from './components/Home/FeaturePage'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Students/Sidebar'
import TestPage from './components/Students/Test/Test'
import Courses from './components/Students/Course/Course'
import { RadialOrbitalTimelineDemo } from './components/ui/demo'



const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="w-full min-h-screen bg-white">
          <Navbar />
          <MainPage />
          <div className="py-10">
 <RadialOrbitalTimelineDemo />
          </div>
        </div>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Sidebar />}>
        <Route index element={<Courses />} />
        <Route path="courses" element={<Courses />} />
        <Route path="test" element={<TestPage />} />
      </Route>
    </Routes>
  )
}

export default App
