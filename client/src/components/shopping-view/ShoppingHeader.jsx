import { Menu, Shirt, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu } from '../ui/dropdown-menu'


function MenuItems(){
    return (
        <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
            {
                shoppingViewHeaderMenuItems.map(menuItem => 
                <Link className='text-sm font-semibold' key={menuItem.id} to={menuItem.path}>
                    {menuItem.label}
                </Link>)
            }
        </nav>
    );
}

function HeaderRightContent(){
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <ShoppingCart  className='h-5 w-5'/>
            <DropdownMenu/>
        </div>
    )
}

const ShoppingHeader = () => {

    const {isAuthenticated} = useSelector(state=>state.auth);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
        <div className='flex h-16 items-center justify-between px-4 md:px-6 '>
            <Link to='/shop/home' className='flex items-center gap-2'>
                <Shirt className='h-5 w-5' />
                <span className='font-bold'>Hype Wardrobe</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='outline' size='icon' className='lg:hidden'>
                        <Menu className='h-5 w-5'/>
                        <span className='sr-only'>Toggle Header menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-full max-w-xs'>
                    <MenuItems />
                </SheetContent>
            </Sheet>
            <div className='hidden lg:block'>
                <MenuItems />
            </div>
            {
                isAuthenticated ? <div></div> : null
            }
        </div>

    </header>
  )
}

export default ShoppingHeader