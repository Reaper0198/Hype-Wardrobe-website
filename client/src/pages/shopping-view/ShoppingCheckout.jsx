import React, { useState } from 'react'
import accountImg from "../../assets/account.jpg"
import Address from '../../components/shopping-view/Address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemContent from '@/components/shopping-view/UserCartItemContent'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop-slice/order-slice'
import { toast } from 'react-toastify'

const ShoppingCheckout = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.shopCart)
    const { user } = useSelector(state => state.auth)
    const { approvalURL } = useSelector(state => state.shopOrder)
    const [curSelectedAddress, setCurSelectedAddress] = useState(null);
    const [isPaymentStart, setIsPaymentStart] = useState(false);

    const totalCartAmt = cartItems && cartItems.items && cartItems.items.length > 0 ?
        cartItems.items.reduce((sum, currItem) => sum +
            (currItem?.salesPrice > 0 ? currItem?.salesPrice : currItem?.price) * currItem?.quantity, 0) : 0


    function handleInitiatePayment(){


        if(curSelectedAddress === null){
            toast.info(" Please select a address first", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                })

            return ;
        }

        const orderData = {
            userId : user?.id,
            cartId : cartItems?._id,
            cartItems : cartItems.items.map(item=> ({
                productId : item?.productId,
                title : item?.title,
                image : item?.image,
                price : item.salesPrice > 0 ? item?.salesPrice : item?.price,
                quantity : item?.quantity
            })),
            addressInfo : {
                addressId : curSelectedAddress?._id,
                address : curSelectedAddress?.address,
                city : curSelectedAddress?.city,
                phone : curSelectedAddress?.phone,
                notes : curSelectedAddress?.notes
            } ,
            orderStatus : 'pending',
            paymentMethod : 'paypal',
            paymentStatus : 'pending',
            totalAmount : totalCartAmt,
            OrderDate : new Date(),
            orderUpdateDate : new Date(),
            paymentId : '',
            payerId : '' 
        }
        
        dispatch(createNewOrder(orderData))
            .then(data=>{
                console.log('data', data)
                if(data.payload.success){
                    setIsPaymentStart(true);
                }else{
                    setIsPaymentStart(false);
                }
            })

        if(approvalURL){
            window.location.href = approvalURL;
        }

    }

    return (
        <div className='flex flex-col'>
            <div className='relative md:h-[300px] w-full overflow-hidden'>
                <img src={accountImg} alt=""
                    className='h-full w-full object-cover object-center' />
            </div>
            <div className='flex flex-col-reverse md:flex-row gap-5 mt-5 p-5'>
                <div className='flex-1'>
                    <Address  setCurSelectedAddress={setCurSelectedAddress}
                        curSelectedAddress={curSelectedAddress}/>
                </div>
                <Card className='h-fit flex-1'>
                    <CardContent>
                        <h2 className='font-semibold text-3xl my-3'>Your Cart Contents :</h2>
                        <div className='flex flex-col gap-4'>
                            {
                                cartItems && cartItems.items && cartItems.items.length > 0 ?
                                    cartItems.items.map((cartItem, index) =>
                                        <div key={index}>
                                            <UserCartItemContent cartItem={cartItem} />
                                            <Separator className='mt-2 mb-0' />
                                        </div>
                                    ) : null
                            }
                        </div>
                        <div className='mt-4 space-y-4'>
                            <div className='flex justify-between p-2'>
                                <span className='font-semibold text-2xl'>Total :</span>
                                <span className='font-semibold text-2xl'>₹{totalCartAmt}</span>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <Button 
                                onClick={()=> handleInitiatePayment()}
                                disabled={totalCartAmt === 0}
                                className='text-lg font-semibold px-10'>Checkout with Paypay</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ShoppingCheckout