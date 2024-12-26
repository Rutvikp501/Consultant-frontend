import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import AddLeads from '../pages/AddLeads/AddLeads'
import Signup from '../pages/Signup/Signup'
import SingleLeads from '../pages/SingleLeads/SingleLeads'
import AddEvent from '../pages/AddLeads/AddEvent'
import Home from '../pages/Home/Home'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import InventoryPage from '../pages/InventoryPage/InventoryPage'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import ResetPassword from '../pages/ResetPassword/ResetPassword'
import SingleConvertedLeads from '../pages/SingleConvertedLeads/SingleConvertedLeads'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads/:id" element={<SingleLeads />} />
        <Route path="/converted/:id" element={<SingleConvertedLeads />} />
        <Route path="/addLeads" element={<AddLeads />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pdf" element={<InventoryPage />} />
        <Route path="/addLeads/events" element={<AddEvent />} />
    </Routes>
  )
}

export default AllRoutes