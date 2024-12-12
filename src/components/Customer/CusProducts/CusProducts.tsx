import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT, ApiSuccessResponseDT, ProductDT } from '../../../lib/types'
import { useGetAllProductsQuery } from '../../../store/product/productApi'
import { setPageTitle } from '../../../store/themeConfigSlice'
import IconSearch from '../../Icon/IconSearch'
import CusProduct from './CusProduct'
import SkeletonCard from '../../SkeletonCard'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const CusProducts = () => {
    const [products, setProducts] = useState<ProductDT[]>([])

    const dispatch = useDispatch()
    const { data, error, isLoading, isError } = useGetAllProductsQuery()

    useEffect(() => {
        dispatch(setPageTitle('Products'))

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
        }
    }, [data, isError, error, dispatch])

    return (
        <main>
            <section className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <span>All Product Categories</span>

                    <form>
                        <div className="relative border border-white-dark/20  w-full flex">
                            <button type="submit" className="text-primary m-auto p-3 flex items-center justify-center">
                                <IconSearch />
                            </button>
                            <input
                                type="text"
                                placeholder="Let's find any keyboard in fast way"
                                className="form-input border-0 border-l rounded-none bg-white  focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] dark:shadow-[#1b2e4b] placeholder:tracking-wider focus:outline-none py-3"
                            />
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />) : products.map((product) => <CusProduct key={product.id} product={product} />)}
                </div>
            </section>
        </main>
    )
}

export default CusProducts
