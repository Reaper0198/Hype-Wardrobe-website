import { Archive, Bolt, Truck } from "lucide-react"
import { UserRoundCog } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";


function MenuItems({setOpen}) {

    const navigate = useNavigate();
    

    const adminSidebarMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            path: '/admin/dashboard',
            icon: <Bolt size={20} strokeWidth={2} />
        },
        {
            id: 'products',
            label: 'Products',
            path: '/admin/products',
            icon: <Archive size={20} strokeWidth={2} />
        },
        {
            id: 'orders',
            label: 'Orders',
            path: '/admin/orders',
            icon: <Truck size={20} strokeWidth={2} />
        }
    ]
    return (
        <div className='mt-8 flex-col flex gap-2'>
            {
                adminSidebarMenuItems.map((menuItem) =>
                    <div key={menuItem.id}
                        onClick={() => {
                            navigate(menuItem.path)
                            setOpen ? setOpen(false) : null
                        }}
                        className='flex text-lg cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
                        {menuItem.icon}
                        <span>{menuItem.label}</span>
                    </div>)

            }
        </div >
    )
}

const AdminSidebar = ({open, setOpen}) => {

    const navigate = useNavigate();

    return (
        <Fragment>

            <Sheet open={open} onOpenChange={setOpen} >
            {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent side='left' className='w-64'>
                    <div className="flex flex-col h-full">
                        <SheetHeader className='border-b'>
                            <SheetTitle className='flex gap-2'>
                                <UserRoundCog size={24} strokeWidth={2.5} />
                                <div className='flex flex-row gap-2 text-xl font-bold'>Admin Panel</div>                                
                            </SheetTitle>                            
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>                    
                    </div>
                </SheetContent>
            </Sheet>


            <aside className='hidden w-64 flex-col text-black border-r bg-background p-6 lg:flex'>
                <div onClick={() => navigate('/admin/dashboard')} 
                    className='flex cursor-pointer items-center gap-2' >
                    <UserRoundCog size={24} strokeWidth={2.5} />
                    <h1 className='flex flex-row gap-2 text-xl font-bold'>Admin Panel</h1>
                    <hr/>
                </div>
                <MenuItems />
            </aside>
        </Fragment>

    )
}

export default AdminSidebar