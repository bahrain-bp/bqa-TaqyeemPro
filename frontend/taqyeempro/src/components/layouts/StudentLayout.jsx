import React from 'react'
import StudentNavBar from './StudentNavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import StudentDashboard from '../pages/StudentPages/StudentDashboard'


export default function StudentLayout() {
  return (
    <div>
      <StudentNavBar/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
