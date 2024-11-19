import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiErrorResponseDT, ApiSuccessResponseDT, ProductDT } from '../../lib/types'
import { useDispatch } from 'react-redux'
import { useGetAllProductsQuery } from '../../store/product/productApi'
import { setPageTitle } from '../../store/themeConfigSlice'
import Swal from 'sweetalert2'
import IconArrowBackward from '../Icon/IconArrowBackward'
import IconHeart from '../Icon/IconHeart'
import IconPlus from '../Icon/IconPlus'
import IconMinus from '../Icon/IconMinus'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const ViewCusProduct = () => {
    const [clickedProduct, setClickedProduct] = useState<ProductDT | undefined>()
    const [selectedImage, setSelectedImage] = useState<string | undefined>(clickedProduct?.images[0]?.imageUrl)
    const [qty, setQty] = useState(0)

    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()

    const { data, error, isLoading, isError } = useGetAllProductsQuery()

    useEffect(() => {
        dispatch(setPageTitle('View product'))

        if (isError) {
            let errorMessage = 'An error occurred'
            if (error && 'data' in error) {
                const errorData = error.data as ApiErrorResponseDT
                errorMessage = errorData.error?.message || errorMessage
            }
            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }

        if (data && data.payload && !data.error) {
            const response = data as ApiSuccessResponseDT<ProductDT[]>

            const clickedPro = response.payload.data.find((product) => Number(product.id) === Number(id))
            setClickedProduct(clickedPro)
        }
    }, [data, isError, error, dispatch, id])

    useEffect(() => {
        if (clickedProduct?.images.length) {
            setSelectedImage(clickedProduct.images[0].imageUrl)
        }
    }, [clickedProduct])

    const incrementQty = () => {
        setQty(qty + 1)
    }
    const decrementQty = () => {
        if (qty < 1) return
        setQty(qty - 1)
    }

    return (
        <main>
            <section>
                <div>
                    <Link to={'/products'} className="flex items-center gap-1">
                        <IconArrowBackward />
                        <span>Back</span>
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-14 mt-12 mb-12">
                    <div className="flex flex-col gap-16 items-center justify-center py-20 bg-[#F3F5F8] dark:bg-black-dark-light lg:w-[775px] rounded-3xl">
                        <div className="">
                            <img className="w-full md:w-[300px] h-[300px] object-cover" src={selectedImage} alt="" />
                        </div>
                        <div className="flex items-center gap-9 ">
                            {clickedProduct?.images.map((image) => (
                                <img
                                    key={image.id}
                                    className="w-20 h-20 border border-gray-400 rounded-lg cursor-pointer"
                                    src={image?.imageUrl}
                                    alt="Product thumbnail"
                                    onClick={() => setSelectedImage(image?.imageUrl)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div>
                            <span className="text-3xl font-bold">{clickedProduct?.name}</span>
                            <p className="text-white-dark mt-4">{clickedProduct?.description}</p>
                            <span className="flex items-center gap-1 mt-4">
                                {' '}
                                <IconHeart fill className="text-danger" />
                                <span>{clickedProduct?.likes}</span>
                            </span>
                            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light mt-4">${clickedProduct?.price}</h5>
                        </div>

                        <div className="bg-[#F3F5F8] dark:bg-black-dark-light w-[440px] p-6 rounded-lg flex items-center gap-3">
                            <span>QTY</span>
                            <button className="btn btn-primay-light" onClick={incrementQty}>
                                <IconPlus />
                            </button>
                            <span className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light mt-4">{qty}</span>
                            <button className="btn btn-primay-light" onClick={decrementQty}>
                                <IconMinus />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mt-10">
                            <button className="btn btn-primary" onClick={incrementQty}>
                                Add to cart
                            </button>
                            <button className="btn btn-danger" onClick={incrementQty}>
                                Like
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ViewCusProduct
