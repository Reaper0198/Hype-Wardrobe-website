import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemContent from './UserCartItemContent'
import { Separator } from '../ui/separator'
import { useNavigate } from 'react-router-dom'

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
    //console.log('cartItems', cartItems)
    const navigate = useNavigate();

    const totalCartAmt = cartItems && cartItems.items && cartItems.items.length > 0 ? 
    cartItems.items.reduce((sum, currItem) => sum + 
        (currItem?.salesPrice > 0 ? currItem?.salesPrice : currItem?.price)* currItem?.quantity, 0) : 0

    return (
        <SheetContent className='sm:max-w-md'>
            <SheetHeader>
                <SheetTitle>Your Cart
                    <span className='text-muted-foreground text-sm'> ({cartItems && cartItems.items &&  cartItems.items.length > 0 ? cartItems.items.length : 0} products)</span>
                </SheetTitle>
            </SheetHeader>
            
                <div className='mt-8 space-y-4 overflow-auto max-h-[70vh] pr-2'>
                    {

                        cartItems && cartItems.items &&  cartItems.items.length > 0 ?
                            cartItems.items.map(item =>  <div key={item.productId}><UserCartItemContent cartItem={item} />
                                <Separator className='my-1'/></div>
                            
                            ) : null
                    }
                </div>
                <div className='mt-4 space-y-4'>
                    <div className='flex justify-between p-2'>
                        <span className='font-semibold'>Total :</span>
                        <span className='font-semibold'>₹{totalCartAmt}</span>
                    </div>
                </div>
                <Button onClick={()=> {navigate('/shop/checkout');
                    setOpenCartSheet(false);
                }}
                    className='w-full mt-4 text-lg font-medium my-2'>Proceed to Checkout
                </Button>
            
        </SheetContent>
    )
}

export default UserCartWrapper