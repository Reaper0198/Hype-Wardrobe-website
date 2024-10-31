import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'

const ProductDetailsDialog = ({open, setOpen, productDetails}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
            <div className='relative overflow-hidden rounded-lg'>
                <img src={productDetails?.image} alt={productDetails?.title}
                    height={600} width={600}
                    className='aspect-square w-full object-cover' />
            </div>
            <div className=''>
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
                    <Button className='w-full text-xl font-medium'>Add to Cart</Button>
                </div>
                <Separator />
                <div className='max-h-[300px] overflow-auto'>
                    <h2 className='text-xl font-bold mb-4'>Reviews</h2>
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
                                <AvatarFallback>TH</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-semibold'>Tris Hemsworth</h3>
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
                                <AvatarFallback>FH</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-semibold'>Fhris Hemsworth</h3>
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
                    <div className='mt-6 flex gap-2 p-1'>
                        <Input placeholder='Write a review...'/>
                        <Button>Submit</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog