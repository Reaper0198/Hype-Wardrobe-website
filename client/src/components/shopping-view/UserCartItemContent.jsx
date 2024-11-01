import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartQty } from '@/store/shop-slice/cart-slice'
import { toast } from 'react-toastify'

const UserCartItemContent = ({cartItem}) => {

    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch();

function handleCartItemDelete(cartItem){
    dispatch(deleteCartItem({userId : user?.id, productId : cartItem?.productId}))
    .then(data=> {
        if(data?.payload?.success){
            toast.success("Product removed from cart", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    })
}

function handleUpdataQuantity(cartItem, typeOfAction){
    dispatch(updateCartQty({
        userId : user?.id,
        productId : cartItem?.productId,
        quantity : typeOfAction === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1
    }))
}

  return (
    <div className='flex items-center space-x-4'>
        <img src={cartItem.image} alt={cartItem.title} className='w-20 h-20 rounded object-cover'/>
        <div className='flex-1'>
            <h3 className='font-medium'>{cartItem?.title}</h3>
            <div className='flex flex-row justify-between'>
                <div className='flex items-center mt-1 gap-1'>
                    <Button onClick={()=> handleUpdataQuantity(cartItem, 'plus')} 
                    variant='outline' className='h-8 w-8 rounded-full' size='icon'>
                        <Plus className='h-4 w-4' />
                        <span className='sr-only'>Increase</span>
                    </Button>
                    <span className='font-semibold'>{cartItem?.quantity}</span>
                    <Button onClick={()=> handleUpdataQuantity(cartItem, 'minus')} 
                        disabled={cartItem?.quantity === 1}
                        variant='outline' className='h-8 w-8 rounded-full' size='icon'>
                        <Minus className='h-4 w-4' />
                        <span className='sr-only'>Decrease</span>
                    </Button>
                </div>
                <p className='font-semibold'>₹
                    {
                        ((cartItem?.salesPrice > 0 ? cartItem?.salesPrice : cartItem?.price)
                            * cartItem?.quantity).toFixed(2)
                    }
                </p>
            </div>
            <div className='flex flex-col items-end'>
                <Button variant='outline' size='icon'>
                    <Trash onClick={()=> handleCartItemDelete(cartItem)} className='cursor-pointer mt-1' size={20} />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default UserCartItemContent