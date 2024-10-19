import ProductCard from '@/components/admin-view/ProductCard';
import ProductImageUpload from '@/components/admin-view/ProductImageUpload';
import CommonForm from '@/components/common/CommonForm';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { addNewProduct, deleteProduct, editAProduct, fetchAllProducts } from '@/store/product-slice/product-slice';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormData = {
    image : null,
    title : '',
    description : '',
    category : '',
    brand : '',
    price : '',
    salesPrice : '',
    totalStock : '',
}
const AdminProducts = () => {
    
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    
    
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const {productList} = useSelector(state=>state.adminProducts)
    const dispatch = useDispatch();
    
    function onSubmit(event){
        event.preventDefault();
        currentEditedId ? 
            dispatch(editAProduct({
                id : currentEditedId,
                formData
            })).then((data)=>{
                setOpenCreateProductDialog(false);
                toast.success(data.payload.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(fetchAllProducts());

            }) :
        
        dispatch(addNewProduct({
            ...formData,
            image : uploadedImageUrl
        })).then((data)=>{
            if(data.payload.success){
                setImageFile(null);
                setOpenCreateProductDialog(false);
                setFormData(initialFormData)
                toast.success(data.payload.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            
        })
    }
    
    useEffect(()=>{
        dispatch(fetchAllProducts())},[dispatch])
        
    function handleDelete(id){
        dispatch(deleteProduct(id)).then((data)=>{
            if(data?.payload.success){
                toast.success(data.payload.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(fetchAllProducts());
            }
        });

    }
        
        return (
            <Fragment >
                <div className='flex-col w-full'>

            <div className='mb-5 w-full flex justify-end'>
                <Button onClick={() => setOpenCreateProductDialog(true)}>Add new Product</Button>
            </div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {productList && productList.length > 0 ?
                    productList.map((productItem) => (
                    <ProductCard key={productItem._id}
                        product={productItem}
                        setCurrentEditedId={setCurrentEditedId}
                        setOpenCreateProductDialog={setOpenCreateProductDialog}
                        setFormData={setFormData}
                        handleDelete={handleDelete}/>)) : null
                    
                }
            </div>
                </div>
            <Sheet  open={openCreateProductDialog} 
                onOpenChange={() => {setOpenCreateProductDialog(false);
                                    setFormData(initialFormData);
                                    setCurrentEditedId(null);
                }}>
                <SheetContent side = 'right' className='overflow-auto'>
                    <SheetHeader>
                        <SheetTitle>{currentEditedId ? "Edit Product Details" : "Add New Product"}</SheetTitle>
                    </SheetHeader>
                    {currentEditedId ? null : <ProductImageUpload
                        file={imageFile} 
                        setFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}/>}
                    <div className='py-6'>
                        <CommonForm 
                            onSubmit={onSubmit}
                            formData={formData} 
                            setFormData={setFormData} 
                            buttonText={currentEditedId ? "Save Changes" : "Add Product"}
                            formControls={addProductFormElements}>

                        </CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts