import ModeratorLayout from '@/components/layouts/ModeratorLayout'
import ModeratorDashboard from '@/components/pages/ModeratorDashboard'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function ModeratorRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ModeratorLayout/>}>
          <Route index element={<ModeratorDashboard/>}/>
        </Route>
      </Routes>
    </div>
  )
}
