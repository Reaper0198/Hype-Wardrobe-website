//import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'


const categories = ['men', 'women', 'kids', 'accessories', 'footwear'];
const brands = ['nike', 'puma', 'adidas', 'levi', 'other', 'h&m'];



const ProductFilter = ({selectedBrands, selectedCategories, handleBrandChange, handleCategoryChange}) => {

  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
            <h2 className='text-lg font-bold'>Filters</h2>
        </div>
        <div className='p-4 space-y-4'>
                    <div>
                        <h3 className='text-base font-semibold'>Categories</h3>
                        <div className='grid gap-2 my-2'>
                            {
                            categories.map(category => <Label key={category}
                            className='flex items-center gap-2 font-normal'>
                                <Checkbox onCheckedChange={()=>handleCategoryChange(category)}
                                    checked={
                                        selectedCategories.includes(category)
                                    }/>{category}
                            </Label>)    
                            }
                        </div>
                        <Separator />
                        <h3 className='text-base font-semibold'>Brands</h3>
                        <div className='grid gap-2 my-2'>
                            {
                            brands.map(brand => <Label key={brand}
                            className='flex items-center gap-2 font-normal'>
                                <Checkbox onCheckedChange={()=>handleBrandChange(brand)}
                                    checked={
                                        selectedBrands.includes(brand)
                                    }/>{brand}
                            </Label>)    
                            }
                        </div>
                        <Separator />
                    </div>
            
        </div>
    </div>
  )
}

export default ProductFilter