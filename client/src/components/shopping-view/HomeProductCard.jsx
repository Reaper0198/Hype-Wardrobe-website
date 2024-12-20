import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const HomeProductCard = ({product, handleGetProductDetails}) => {

    const navigate = useNavigate();

  return (
    <Card className='w-[350px] md:w-full mx-auto m-2'>
        <div onClick={()=> handleGetProductDetails(product._id)}>
            <div className='relative'>
                <img src={product?.image} alt={product?.image} className='w-full h-[300px] object-cover rounded-t-lg' />
                {
                    product?.salesPrice > 0 ? <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-700'>Sale</Badge> : null
                }
            </div>
            <CardContent className='px-4 py-1'>
                <div className='h-8 overflow-auto'>
                <h2 className='text-xl font-semibold mb-2'>{product?.title}</h2>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <span className='text-base text-muted-foreground'>{product?.brand}</span>
                    <span className='text-sm text-muted-foreground'>{product?.category}</span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product?.salesPrice > 0 ? 'line-through' : ''} text-lg font-medium text-primary`}>₹{product?.price}</span>
                    {
                        product?.salesPrice > 0 ?
                        <span className='text-lg text-primary font-medium'>₹{product?.salesPrice}</span> : null
                    }
                </div>
            </CardContent>
        </div>
    </Card>
  )
}

export default HomeProductCard