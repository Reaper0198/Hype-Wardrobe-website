import React, { useEffect, useState } from 'react'
import banner_1 from '../../assets/banner-1.png'
import banner_2 from '../../assets/banner-2.webp'
import banner_3 from '../../assets/banner-3.png'
import banner_4 from '../../assets/banner-4.jpg'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FaUserTie } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import { FaBabyCarriage } from "react-icons/fa";
import { BsWatch } from "react-icons/bs";
import { GiConverseShoe } from "react-icons/gi";
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop-slice/shop-slice'
import { SiNike } from "react-icons/si";
import { SiAdidas } from "react-icons/si";
import { SiPuma } from "react-icons/si";
import { TbLetterL } from "react-icons/tb";
import { TbLetterH } from "react-icons/tb";
import { PiDotsThreeOutline } from "react-icons/pi";
import { useNavigate } from 'react-router-dom'
import ProductCard from '@/components/admin-view/ProductCard'
import ShopingProductCard from '@/components/shopping-view/ShopingProductCard'
import HomeProductCard from '@/components/shopping-view/HomeProductCard'
import ProductDetailsDialog from '@/components/shopping-view/ProductDetailsDialog'
import { FaArrowRight } from "react-icons/fa";

const categoryWithIcon = [
    {id : "men", label : "Men", icon : FaUserTie},
    {id : "women", label : "Women", icon : GiLargeDress},
    {id : "kids", label : "Kids", icon : FaBabyCarriage},
    {id : "accessories", label : "Accessories", icon : BsWatch},
    {id : "footwear", label : "Footwear", icon : GiConverseShoe},
]

const brandWithIcon = [
    {icon : SiNike, id : "nike", label : "Nike"},
    {icon : SiAdidas, id : "adidas", label : "Adidas"},
    {icon : SiPuma, id : "puma", label : "Puma"},
    {icon : TbLetterL, id : "levi", label : "Levi's"},
    {icon : TbLetterH, id : "h&m", label : "H&M"},
    {icon : PiDotsThreeOutline, id : "Other", label : "Other"}
]


const ShoppingHome = () => {

    const slides = [banner_1, banner_2, banner_3, banner_4]
    const [curSlide, setCurSlide] = useState(0);
    const dispatch = useDispatch();
    const {productList, productDetails} = useSelector(state=>state.shopProducts)
    const navigate = useNavigate();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


    useEffect(()=> {
        const timer = setInterval(()=>{
            setCurSlide(prevSlide => (prevSlide+1)% slides.length)
        }, 3000)

        return ()=> clearInterval(timer);
    },[])

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts({
            categoryParams : [],
            brandParams : [],
            sortParams : 'price-lowtohigh'
        }))
    },[categoryWithIcon])

    function handleNavigateToListingPage(item, section){
        const queryParams = new URLSearchParams();
        queryParams.set(section, item.id);
        navigate(`/shop/listing?${queryParams.toString()}`);
    }

    useEffect(()=>{
        if(productDetails !== null){
            setOpenDetailsDialog(true);
        }
    },[productDetails])

    const handleGetProductDetails = (id) =>{
        dispatch(fetchProductDetails(id))
    }

    //console.log('productList', productList)
  return (
    <div className='flex flex-col min-h-screen'>
        <div className='relative w-full h-[250px] md:h-[600px] overflow-hidden'>
            {
            slides.map((slide, index)=> <img key={index} src={slide} 
            className={`${index === curSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-[250px] md:w-full md:h-full transition-opacity duration-1000`}/>
            )
            }
            <Button variant='outline' size='icon'
                onClick={()=>setCurSlide(prevSlide => (prevSlide -1 + slides.length) % slides.length)} 
                className='hidden m-auto md:block absolute top-1/2 left-4 opacity-80 transform -translate-y-1/2 bg-white'>
                <ChevronLeftIcon  className='w-4 h-5'/>
            </Button>
            <Button variant='outline' size='icon' 
                 onClick={()=>setCurSlide(prevSlide => (prevSlide +1) % slides.length)} 
                className='hidden md:block absolute top-1/2 right-4 opacity-80 transform -translate-y-1/2 bg-white'>
                <ChevronRightIcon  className='w-4 h-5 '/>
            </Button>
        </div>
        <section className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {
                        categoryWithIcon.map(item => 
                        <Card onClick={()=>handleNavigateToListingPage(item, "categories")}
                        key={item.id} className='cursor-pointer hover:shadow-lg transition-shadow'>
                            <CardContent className='flex flex-col items-center justify-between p-6'>
                                    <item.icon className='w-6 md:w-12 h-6 md:h-12 mb-2 md:mb-4 text-primary'/>
                                    <span className='font-bold'>{item.label}</span>
                            </CardContent>   
                        </Card>)
                    }

                </div>
            </div>
        </section>
        <section className='py-6 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brands</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                    {
                        brandWithIcon.map(item => 
                        <Card onClick={()=>handleNavigateToListingPage(item, "brands")} 
                        key={item.id} className='cursor-pointer hover:shadow-lg transition-shadow'>
                            <CardContent className='flex flex-col items-center justify-between p-6'>
                                    <item.icon className='w-6 md:w-12 h-6 md:h-12 mb-2 md:mb-4 text-primary'/>
                                    <span className='font-bold'>{item.label}</span>
                            </CardContent>   
                        </Card>)
                    }

                </div>
            </div>
        </section>
        <section className='py-6 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-8'>Featured Items</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        productList.map((item, index) => 
                        
                            //console.log('index', item)
                            index < 4 ? <HomeProductCard 
                            key={index}
                            handleGetProductDetails={handleGetProductDetails}
                            product={item}
                            /> : null
                        )
                    }

                </div>
                <div className='flex justify-end hover:text-red-500 gap-2' onClick={()=>navigate('/shop/listing')}>
                    <span className='cursor-pointer text-base'>Explore more Products</span>
                    <FaArrowRight className='mt-1.5'/>
                </div>
            </div>
        </section>
        <ProductDetailsDialog  
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}/>
    </div>
  )
}

export default ShoppingHome