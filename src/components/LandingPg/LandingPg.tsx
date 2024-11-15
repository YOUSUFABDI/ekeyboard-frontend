import { Link } from 'react-router-dom'
import SkeletonCard from '../SkeletonCard'
import CusProduct from '../CusProducts/CusProduct'
import { useEffect, useState } from 'react'
import { ApiErrorResponseDT, ApiSuccessResponseDT, ProductDT } from '../../lib/types'
import { useDispatch } from 'react-redux'
import { useGetAllProductsQuery } from '../../store/product/productApi'
import { setPageTitle } from '../../store/themeConfigSlice'
import Swal from 'sweetalert2'
import IconSearch from '../Icon/IconSearch'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const LandingPg = () => {
    const [products, setProducts] = useState<ProductDT[]>([])

    const dispatch = useDispatch()
    const { data, error, isLoading, isError } = useGetAllProductsQuery()
    useEffect(() => {
        dispatch(setPageTitle('Home'))

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
            setProducts(response.payload.data) // Set products state with API data
            console.log(products)
        }
    }, [data, isError, error, dispatch])

    return (
        <main className="w-full">
            <section className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 mt-6 lg:mt-0">
                    <div>
                        <span className="text-4xl font-bold">Product Collection</span>
                        <p className="text-xl mt-4 w-full lg:w-[609px]">
                            Welcome to our online shop, where we invite you to embark on a thrilling journey of discovery. we've curated an extensive collection of keyboards, and more to help you find
                            your new favorites.
                        </p>
                    </div>
                    <Link to={'/products'} className="btn btn-primary mt-6 w-fit">
                        Shop Now
                    </Link>
                </div>
                <div className="flex-1  ">
                    <img className="object-cover rounded-lg w-full" src="https://cdn.thewirecutter.com/wp-content/media/2024/04/mechanicalkeyboards-2048px-1361.jpg" alt="" />
                </div>
            </section>

            <section className="mt-16">
                <div className="flex items-center justify-between">
                    <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Products</h5>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />) : products.map((product) => <CusProduct key={product.id} product={product} />)}
                </div>
            </section>
        </main>
    )
}

export default LandingPg
