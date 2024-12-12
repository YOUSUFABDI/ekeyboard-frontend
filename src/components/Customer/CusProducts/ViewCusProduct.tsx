import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT, ApiSuccessResponseDT, ProductDT } from '../../../lib/types'
import { addToCart } from '../../../store/order/cartSlice'
import { useGetAllProductsQuery, useLikeProductMutation } from '../../../store/product/productApi'
import { setPageTitle } from '../../../store/themeConfigSlice'
import IconArrowBackward from '../../Icon/IconArrowBackward'
import IconHeart from '../../Icon/IconHeart'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const ViewCusProduct = () => {
    const [clickedProduct, setClickedProduct] = useState<ProductDT | undefined>(undefined)
    const [selectedImage, setSelectedImage] = useState<string | undefined>(clickedProduct?.images[0]?.imageUrl)
    const [hasLiked, setHasLiked] = useState<boolean>(false) // To track if the user has clicked Like

    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()

    const { data, error, isLoading, isError } = useGetAllProductsQuery()
    const [likeProduct, { isLoading: isLiking }] = useLikeProductMutation()

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

    const handleAddToCart = () => {
        dispatch(addToCart(clickedProduct))
    }

    const handleLike = async () => {
        if (!clickedProduct || isLiking || hasLiked) return // Prevent action if already liked or during update

        // Optimistic UI update: Immediately update the UI to show the like
        setClickedProduct((prev) =>
            prev
                ? {
                      ...prev,
                      likes: prev.likes + 1, // Increment likes
                  }
                : undefined
        )

        setHasLiked(true) // Mark as liked

        toast.fire({
            icon: 'success',
            title: 'Product liked successfully',
            padding: '2em',
        })

        try {
            // Perform the API call
            await likeProduct(clickedProduct.id).unwrap()
        } catch (error: any) {
            setClickedProduct((prev) =>
                prev
                    ? {
                          ...prev,
                          likes: prev.likes - 1, // Revert the increment if failed
                      }
                    : undefined
            )
            setHasLiked(false) // Revert liked state

            const errorMessage = error?.data?.error?.message || 'Failed to like the product.'
            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }
    }

    const handleUnlike = async () => {
        if (!clickedProduct || isLiking || !hasLiked) return // Prevent action if already unliked or during update

        // Optimistic UI update: Immediately update the UI to show the unlike
        setClickedProduct((prev) =>
            prev
                ? {
                      ...prev,
                      likes: prev.likes - 1, // Decrement likes
                  }
                : undefined
        )

        setHasLiked(false) // Mark as unliked

        toast.fire({
            icon: 'success',
            title: 'Product unliked successfully',
            padding: '2em',
        })

        try {
            // Perform the API call
            await likeProduct(clickedProduct.id).unwrap()
        } catch (error: any) {
            setClickedProduct((prev) =>
                prev
                    ? {
                          ...prev,
                          likes: prev.likes + 1, // Revert the decrement if failed
                      }
                    : undefined
            )
            setHasLiked(true) // Revert liked state

            const errorMessage = error?.data?.error?.message || 'Failed to unlike the product.'
            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }
    }

    if (isLoading) return <p>Loading...</p>

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
                        <div className="flex items-center gap-9">
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
                                <IconHeart fill={clickedProduct?.isLiked} className="text-danger" />
                                <span>{clickedProduct?.likes}</span>
                            </span>
                            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light mt-4">${clickedProduct?.price}</h5>
                        </div>

                        <div className="flex items-center gap-4 mt-10">
                            <Link to={'/product/cart'} className="btn btn-primary" onClick={handleAddToCart}>
                                Add to cart
                            </Link>
                            {/* Button will only show "Unlike" after liking */}
                            <button
                                className="btn btn-danger"
                                onClick={hasLiked ? handleUnlike : handleLike}
                                disabled={isLiking} // Disable the button while the API request is in progress
                            >
                                {hasLiked ? 'Unlike' : 'Like'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ViewCusProduct
