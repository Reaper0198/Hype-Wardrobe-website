import { LogOut, Menu } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({setOpen}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout(){
        // dispatch(logoutUser());
        dispatch(resetTokenAndCredentials());
        sessionStorage.clear();
        navigate('/auth/login')
    }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
        <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block'>
            <Menu size={28} strokeWidth={2.5} />
            <span className='sr-only'>Menu</span>
        </Button>
        <div className='flex flex-1 justify-end'>
            <Button onClick={()=>handleLogout()}
            className='inline-flex gap-2 items-center round-md px-4 py-2 text-sm font-medium shadow'>
                <LogOut size={28} strokeWidth={2.5} />
                Logout
            </Button>

        </div>

    </header>
  )
}

export default AdminHeader