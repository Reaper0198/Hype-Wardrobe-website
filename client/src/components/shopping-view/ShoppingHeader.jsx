import { LogOut, Menu, Shirt, ShoppingCart, UserRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'
import UserCartWrapper from './UserCartWrapper'
import { fetchCartItems } from '@/store/shop-slice/cart-slice'
import { Label } from '../ui/label'




function MenuItems(){

    const navigate = useNavigate();

    function handleNavigate(category){
        console.log('category', category)
        if(category !== 'home'){
            const queryParams = new URLSearchParams();
            queryParams.set('categories', category);
            navigate(`/shop/listing?${queryParams.toString()}`);
        }else{
            navigate('/shop/home')
        }
    }

    return (
        <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
            {
                shoppingViewHeaderMenuItems.map(menuItem => 
                <Label onClick={()=>handleNavigate(menuItem.id)}
                 className='text-sm font-semibold' key={menuItem.id}>
                    {menuItem.label}
                </Label>)
            }
        </nav>
    );
}

function HeaderRightContent(){

    const {user} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openCartSheet, setOpenCartSheet] =  useState(false);
    const {cartItems} = useSelector(state => state.shopCart)

    function handleLogout(){
        dispatch(logoutUser());
    }

    useEffect(()=>{
        dispatch(fetchCartItems(user.id))
    },[dispatch])

    //console.log('cartItems', cartItems);

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet open={openCartSheet} onOpenChange={()=> setOpenCartSheet(false)}>
                <Button onClick={()=> setOpenCartSheet(true)} variant='outline' size='icon'>
                    <ShoppingCart  className='h-5 w-5'/>
                    <span className='sr-only'>User Cart</span>
                </Button>
                <UserCartWrapper  cartItems={cartItems ? cartItems : {}}/>
            </Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className='bg-black'>
                        <AvatarFallback className='bg-black text-white font-bold'>
                            {user?.userName[0].toUpperCase()}</AvatarFallback>                
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' className='w-56'>
                    <DropdownMenuLabel className='w-full'>Hi {user?.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
                        <UserRound  className='mr-2 h-4 w-4'/>Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=> handleLogout()}>
                        <LogOut  className='mr-2 h-4 w-4'/>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

const ShoppingHeader = () => {

    const {isAuthenticated, user} = useSelector(state=>state.auth);
    

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
        <div className='flex h-16 items-center justify-between px-4 md:px-6 '>
            <Link to='/shop/home' className='flex items-center gap-2'>
                <Shirt className='h-5 w-5  bg-gradient-to-r from-blue-500 to-green-500' />
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
                    <HeaderRightContent />
                </SheetContent>
            </Sheet>
            <div className='hidden lg:block'>
                <MenuItems />
            </div>
            <div className='hidden lg:block'>
                <HeaderRightContent />
            </div>

        </div>

    </header>
  )
}

export default ShoppingHeader