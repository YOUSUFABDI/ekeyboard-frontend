import React from 'react'
import { ProductDT } from '../../lib/types'
import { Link } from 'react-router-dom'
import IconPlus from '../Icon/IconPlus'
import IconHeart from '../Icon/IconHeart'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/order/cartSlice'

interface CusProductProps {
    product: ProductDT
}

const CusProduct: React.FC<CusProductProps> = ({ product }) => {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    return (
        <div key={product.id} className="flex items-center justify-center">
            <div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="py-7 px-6">
                    <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] overflow-hidden">
                        <Link to={`/product/${product.id}`}>
                            <img src={product?.images[0].imageUrl} alt="cover" className="w-full h-full object-cover" />
                        </Link>
                    </div>
                    <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{product.name}</h5>
                    <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">${product.price}</h5>
                    <p className="text-white-dark">{product.description}</p>

                    <div className="flex items-center justify-between">
                        <button className="btn btn-primary mt-6" onClick={handleAddToCart}>
                            <IconPlus />
                        </button>
                        <button className="text-white-dark flex items-center gap-2">
                            <IconHeart fill className="text-danger" />
                            <span>{product.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CusProduct
