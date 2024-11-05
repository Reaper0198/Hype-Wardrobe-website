import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {

    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <nav className='flex min-h-screen w-full'>
            {/* Admin Sidebar */}
            <AdminSidebar open={openSidebar}
                setOpen={setOpenSidebar} />
            <div className='flex flex-1 flex-col'>
                {/* Admin Header */}
                <AdminHeader setOpen={setOpenSidebar} />
                <main className='min-h-screen  bg-muted/40 p-4 md:p-6'>
                    <Outlet />
                </main>
            </div>

        </nav>
    )
}

export default AdminLayout