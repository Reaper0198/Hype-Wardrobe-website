import HomeProductCard from '@/components/shopping-view/HomeProductCard';
import ProductDetailsDialog from '@/components/shopping-view/ProductDetailsDialog';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getSearchResults } from '@/store/shop-slice/search-slice';
import { fetchProductDetails } from '@/store/shop-slice/shop-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const ShoppingSearch = () => {

    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchResults } = useSelector(state => state.shopSearch)
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector(state => state.shopProducts)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    function handleSearch() {
        const findThis = {
            keyword
        }
        dispatch(getSearchResults(findThis))
            .then((data) => {
                setKeyword('')
            })
    }

    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true);
        }
    }, [productDetails])

    const handleGetProductDetails = (id) => {
        dispatch(fetchProductDetails(id))
    }
    return (
        <div className='container mx-auto md:px-6 px-4 py-8'>
            <div className='flex-col justify-center mb-8'>
                <div className='flex items-center justify-center mx-auto'>
                    <div className='gap-2 flex items-center w-fit'>
                        <Input value={keyword} name='keyword' placeholder='Search Product...'
                            className='py-4 px-2 w-[60vw] ' onChange={(event) => setKeyword(event.target.value)} />
                        <Button onClick={() => handleSearch(event)}
                            className='py-6 text-xl font-semibold'>Search</Button>
                    </div>
                </div>
                <div>
                    {
                        searchResults && searchResults.length > 0 ?
                            searchResults.map((item) =>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                    <HomeProductCard product={item}
                                        handleGetProductDetails={handleGetProductDetails} /></div>) :

                                <div className='flex items-center justify-center'>
                                    <h1 className='text-2xl font-light mt-12 w-fit'>No result found!</h1>
                                </div>

                    }
                </div>
                <ProductDetailsDialog
                    open={openDetailsDialog}
                    setOpen={setOpenDetailsDialog}
                    productDetails={productDetails} />
            </div>
        </div>
    )
}

export default ShoppingSearch