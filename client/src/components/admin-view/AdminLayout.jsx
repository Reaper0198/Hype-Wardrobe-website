import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
        {/* Admin Sidebar */}
        <AdminSidebar/>
        <div className='flex flex-1 flex-col'>
            {/* Admin Header */}
            <AdminHeader/>
            <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
                <Outlet />
            </main>
        </div>

    </div>
  )
}

export default AdminLayout