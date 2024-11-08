import React, { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { addToCart, fetchCartItems } from '@/store/shop-slice/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setProductDetails } from '@/store/shop-slice/shop-slice'
import StarRatingComp from '../common/StarRatingComp'
import { Label } from '../ui/label'

const ProductDetailsDialog = ({open, setOpen, productDetails}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const [reviewMsg, setReviewMsg] = useState('');

    function handleAddToCart(id){
        dispatch(addToCart({
            userId : user?.id,
            productId : id,
            quantity : 1
        })).then(data => {
            if(data?.payload.success){
                dispatch(fetchCartItems(user?.id))
            }})
    }

    function handleReviewSubmit(){
        toast.info("Only bought products can be reviewed", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            }

        )
    }

    function handleDialogClose(){
        setOpen(false);
        dispatch(setProductDetails())
    }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className='max-w-[90vw] sm:max-w-[80vw] lg:max-w-[80vw]'>
        <div className='flex flex-col md:flex-row gap-8 sm:p-12 max-h-[90vh]'>

            <div className='flex-1 relative overflow-clip max-sm:max-h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-lg mt-2'>
                <img src={productDetails?.image} alt={productDetails?.title}
                    height={400} width={400}
                    className='aspect-square w-full object-cover rounded-lg' />
            </div>
            <div className='flex-1 overflow-y-scroll pr-4'>
                <div>
                    <h1 className='text-3xl font-extrobold'>{productDetails?.title}</h1>
                    <p className='text-muted-foreground text-xl mb-5 mt-3'>{productDetails?.description}</p>
                </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='flex items-center gap-0.5'>
                                            <StarIcon className='h-5 w-5 fill-primary'/>
                                            <StarIcon className='h-5 w-5 fill-primary'/>
                                            <StarIcon className='h-5 w-5 fill-primary'/>
                                            <StarIcon className='h-5 w-5 fill-primary'/>
                                            <StarIcon className='h-5 w-5 fill-primary'/>
                        </div>
                        <span>(4.3)</span>
                    </div>
                <div className='flex items-center justify-between'>
                    <p className={`text-3xl font-semibold 
                        ${productDetails?.salesPrice > 0 ? 'line-through' : '' }`}>₹{productDetails?.price}</p>
                {productDetails?.salesPrice > 0 ? <p className='text-2xl font-semibold font-muted-foreground'>₹{productDetails?.salesPrice}</p> : null }
                </div>
                <div className='my-5'>
                    <Button onClick={()=> {handleAddToCart(productDetails?._id);
                                            toast.success("Product added to the cart", {
                                            position: "top-right",
                                            autoClose: 1500,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light",
                                            })}}
                    className='w-full text-xl font-medium'>Add to Cart</Button>
                </div>
                <Separator />
                <div className='max-h-[300px] overflow-auto'>
                    <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                    <div className='mt-2 flex-col gap-4 px-2'>
                        <Label className='text-lg'>Share your review</Label>
                        <div className='flex mb-2'>
                            <StarRatingComp 
                                rating={3}/>
                        </div>
                        <div className='flex gap-2 pb-2'>
                            <Input placeholder='Write a review...' value={reviewMsg}
                                onChange={(event)=> setReviewMsg(event.target.value)}/>
                            <Button onClick={()=>handleReviewSubmit()}>Submit</Button>
                        </div>
                    </div>
                    <div className='grid gap-6'>
                        <div className='flex gap-4'>
                            <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>CH</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-semibold'>Chris Hemsworth</h3>
                                </div>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                </div>
                                <p>This is a good product but quality could have been better</p>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>JC</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-semibold'>John Cena</h3>
                                </div>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                </div>
                                <p>This is a good product but quality could have been better</p>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>TH</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-semibold'>Tom Holland</h3>
                                </div>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                    <StarIcon className='h-5 w-5 fill-primary'/>
                                </div>
                                <p>This is a good product but quality could have been better</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog