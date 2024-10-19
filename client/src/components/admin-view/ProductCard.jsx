import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const ProductCard = ({product, setCurrentEditedId, setOpenCreateProductDialog,
     setFormData, handleDelete}) => {

  return (
    <Card className='w-[320px] max-w-sm mx-auto shadow-md'>
        <div>
            <div className='relative'>
                <img src={product.image} alt={product.title} 
                    className='w-full h-[300px] object-cover rounded-t-lg'/>
            </div>
            <CardContent className='!py-2'>
                <h2 className='text-xl font-semibold mb-2'>{product?.title}</h2>
                <div className='flex flex-row justify-between items-center '>
                    <p>Price :</p>
                    <span className={` ${product?.salesPrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>₹{product.price}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Sales Price :</p>
                    {product.salesPrice > 0 ? 
                    <span className='text-lg font-bold'>₹{product.salesPrice}</span> : 
                    <span className='text-base '>NA</span>}
                    
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <Button onClick={()=>{
                        setCurrentEditedId(product._id)
                        setOpenCreateProductDialog(true)
                        setFormData(product)
                    }}>Edit</Button>
                    <Button onClick={()=>{
                        handleDelete(product._id)
                    }}>Delete</Button>
                </div>
            </CardContent>
        </div>
    </Card>
  )
}

export default ProductCard