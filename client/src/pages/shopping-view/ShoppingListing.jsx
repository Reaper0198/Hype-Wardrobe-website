import ProductFilter from '@/components/shopping-view/ProductFilter'
import ShopingProductCard from '@/components/shopping-view/ShopingProductCard'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop-slice/shop-slice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'




const ShoppingListing = () => {

    const dispatch = useDispatch();
    const {productList, productDetails} = useSelector(state=> state.shopProducts)
    const [sort, setSort] = useState(null);




    function handleSort(value){
        setSort(value);
    }

    useEffect(()=>{
        setSort("price-lowtohigh")    
    },[])

    const navigate = useNavigate();
    const location = useLocation();
  
    // Initialize state for filters
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    // Parse query parameters on component load
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const brands = params.get("brands") ? params.get("brands").split(",") : [];
      const categories = params.get("categories") ? params.get("categories").split(",") : [];
      setSelectedBrands(brands);
      setSelectedCategories(categories);
    }, [location.search]);
  
    // Handle brand selection
    const handleBrandChange = (brand) => {
      const newBrands = selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand];
      setSelectedBrands(newBrands);
      updateURL(newBrands, selectedCategories);
    };
  
    // Handle category selection
    const handleCategoryChange = (category) => {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category];
      setSelectedCategories(newCategories);
      updateURL(selectedBrands, newCategories);
    };
  
    // Update the URL query parameters based on filter state
    const updateURL = (brands, categories) => {
      const params = new URLSearchParams();
      if (brands.length) params.set("brands", brands.join(","));
      if (categories.length) params.set("categories", categories.join(","));
      navigate({ search: params.toString() });
    };

    useEffect(()=>{
        if(selectedBrands !== null && selectedCategories !== null && sort !== null)
            {dispatch(fetchAllFilteredProducts({
                categoryParams: selectedCategories,
                brandParams: selectedBrands,
                sortParams: sort}))
            console.log('selectedBrands', selectedBrands)
};
    }, [dispatch, selectedBrands, selectedCategories, sort])

const handleGetProductDetails = (id) =>{
    console.log('id', id)
    dispatch(fetchProductDetails(id))
}
console.log('productDetails', productDetails)


  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr]'>
        <div className='w-[250px]'>

        <ProductFilter selectedBrands={selectedBrands} 
            selectedCategories={selectedCategories}
            handleBrandChange={handleBrandChange}
            handleCategoryChange={handleCategoryChange}/>
        </div>
        <div className=' bg-background w-full rounded-lg shadow-sm'>
            <div className='p-4 border-b flex items-center justify-between mb-2'>
                <h2 className='text-lg font-bold'>All Products</h2>
                <div className='flex items-center gap-3'>
                    <span className='text-muted-foreground'>{productList.length} products</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='sm' className='flex items-center'>
                            <ArrowUpDownIcon className='h-4 w-4 mr-1' /> 
                            <span>Sort by</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-[200px]'>
                        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                            {
                                sortOptions.map(sortItem =>
                                <DropdownMenuRadioItem value={sortItem.id}
                                 key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                            }
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto'>
                {
                    productList && productList.length > 0 ? 
                    productList.map(productItem => (<div key={productItem._id} className='mx-auto'>
                        <ShopingProductCard  product={productItem}
                        handleGetProductDetails={handleGetProductDetails}/></div>)) : null
                        
                }
            </div>
        </div>
    </div>
  )
}

export default ShoppingListing