import { ChangeEvent, useEffect, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT } from '../../lib/types'
import { useGetCategoriesQuery } from '../../store/category/categoryApi'
import { useGetAllProductsQuery, useUpdateProductMutation } from '../../store/product/productApi'
import { setPageTitle } from '../../store/themeConfigSlice'
import { useParams } from 'react-router-dom'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const EditProduct = () => {
    const [images, setImages] = useState<ImageListType>([])
    const [category, setCategory] = useState<{ value: number; label: string } | null>(null)
    const [productName, setProductName] = useState<string>('')
    const [productPrice, setProductPrice] = useState<number>(0)
    const [productDescription, setProductDescription] = useState<string>('')
    const [productStock, setProductStock] = useState<number>(0)

    const { id } = useParams()

    const { data: categories } = useGetCategoriesQuery()
    const { data: products } = useGetAllProductsQuery()
    const [updateProduct, { isLoading, isError, isSuccess }] = useUpdateProductMutation()

    const currentProduct = products?.payload?.data?.find((product) => product.id === id || '0')

    const categoryOptions =
        categories?.payload?.data?.map((category) => ({
            value: category.id,
            label: category.name,
        })) || []

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Products'))
    }, [dispatch])

    useEffect(() => {
        if (currentProduct) {
            setProductName(currentProduct.name)
            setProductDescription(currentProduct.description)
            setProductPrice(currentProduct.price)
            setProductStock(currentProduct.stock)
            const productCategory = categories?.payload.data?.find((cat) => cat.id === currentProduct.categoryId)
            setCategory({
                value: currentProduct.categoryId,
                label: productCategory?.name || '',
            })
            const imageUrls = currentProduct.images?.map((image) => ({ dataURL: image.imageUrl })) || []
            setImages(imageUrls)
        }
    }, [currentProduct])

    const maxNumber = 5

    const onChange = (imageList: ImageListType) => {
        setImages(imageList)
    }

    const handleCategoryChange = (selectedOption: { value: number; label: string } | null) => {
        setCategory(selectedOption)
    }

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!productName || !productDescription || !productPrice || !productStock || !category || images.length === 0) {
            toast.fire({ icon: 'error', title: 'Please provide all necessary data' })
            return
        }

        if (isNaN(productPrice) || productPrice <= 0 || isNaN(productStock) || productStock < 0) {
            toast.fire({ icon: 'error', title: 'Invalid price or stock value' })
            return
        }

        const imageUrls = images.map((image) => image.dataURL) as string[]

        const requestBody = {
            productName,
            productPrice,
            productDescription,
            productImage: imageUrls,
            productStock,
            categoryId: category?.value,
        }

        try {
            await updateProduct({ requestBody, productId: id || '0' }).unwrap()
            toast.fire({ icon: 'success', title: 'Product created successfully!' })
        } catch (error) {
            let errorMessage = 'An error occurred'
            if ((error as any).data) {
                const errorData = (error as any).data as ApiErrorResponseDT
                errorMessage = errorData.error.message
            }
            toast.fire({ icon: 'error', title: errorMessage || 'Failed to create product' })
        }
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/products" className="text-primary hover:underline">
                        Products
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Edit</span>
                </li>
            </ul>

            <div className="pt-5">
                <div className="panel px-5 border-white-light dark:border-[#1b2e4b]">
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <div className="mb-5">
                                <label htmlFor="ctnName">Product name</label>
                                <input id="ctnName" type="text" placeholder="Product name" className="form-input" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="ctnDescription">Product description</label>
                                <input
                                    id="ctnDescription"
                                    type="text"
                                    placeholder="Product description"
                                    className="form-input"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="ctnPrice">Product price</label>
                                <input
                                    id="ctnPrice"
                                    type="number"
                                    placeholder="Product price"
                                    className="form-input"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="ctnStock">Product stock</label>
                                <input
                                    id="ctnStock"
                                    type="number"
                                    placeholder="Product stock"
                                    className="form-input"
                                    value={productStock}
                                    onChange={(e) => setProductStock(parseInt(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Product category</label>
                                <Select options={categoryOptions} value={category} onChange={handleCategoryChange} />
                            </div>

                            <div className="mb-5 custom-file-container">
                                <div className="label-container">
                                    <label>Product images</label>
                                    <button type="button" className="custom-file-container__image-clear" title="Clear Image" onClick={() => setImages([])}>
                                        ×
                                    </button>
                                </div>
                                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} multiple dataURLKey="dataURL" acceptType={['jpg', 'jpeg', 'png']}>
                                    {({ imageList, onImageUpload, onImageRemove }) => (
                                        <div className="upload__image-wrapper">
                                            <button type="button" onClick={onImageUpload}>
                                                Choose Files...
                                            </button>
                                            <div className="flex">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative">
                                                        <img src={image.dataURL} alt={`Product ${index + 1}`} className="m-auto" />
                                                        <button type="button" onClick={() => onImageRemove(index)}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                        <button className="btn btn-primary gap-2" type="submit" disabled={isLoading}>
                            {isLoading ? 'Updating Product...' : 'Update Product'}
                        </button>
                        {isError && <p>Error updating product. Please try again.</p>}
                        {isSuccess && <p>Product Update successfully!</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct
