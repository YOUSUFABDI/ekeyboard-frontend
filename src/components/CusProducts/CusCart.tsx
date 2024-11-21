import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IRootState } from '../../store'
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../store/order/cartSlice'
import { useMakeOrderMutation } from '../../store/order/OrderApi'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT, MakeOrderRequestDT } from '../../lib/types'
import { useEffect } from 'react'
import { setPageTitle } from '../../store/themeConfigSlice'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const CusCart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: IRootState) => state.cart.items)

    const [makeOrder, { isLoading, isError, error }] = useMakeOrderMutation()

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    }

    const handleIncrement = (productId: string) => {
        dispatch(incrementQuantity(productId))
    }

    const handleDecrement = (productId: string) => {
        dispatch(decrementQuantity(productId))
    }

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId))
    }

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.fire({
                icon: 'error',
                title: 'Your cart is empty!',
                padding: '2em',
            })
            return
        }

        try {
            const orderRequests: MakeOrderRequestDT[] = cartItems.map((item) => ({
                productID: item.id,
                quantity: item.quantity,
            }))

            for (const order of orderRequests) {
                console.log(order) // Debugging: Log each order request
                await makeOrder(order).unwrap()
            }

            dispatch(clearCart())

            toast.fire({
                icon: 'success',
                title: 'Order placed successfully!',
                padding: '2em',
            })
        } catch (err: any) {
            console.error('Error placing order:', err) // Debugging: Log full error
            const errorMessage = err?.data?.error?.message || 'Failed to place order.'
            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }
    }

    useEffect(() => {
        dispatch(setPageTitle('Cart'))

        if (isError && error) {
            console.error('Error from API:', error) // Debugging: Log API error
            const errorMessage = (error as ApiErrorResponseDT)?.error?.message || 'An error occurred.'
            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }
    }, [isError, dispatch, error])

    return (
        <div className="">
            <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                    <Link to="/products" className="btn btn-primary">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow-sm">
                                <div className="flex items-center gap-4">
                                    <img src={item.images[0]?.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="text-gray-500">
                                            ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="btn btn-primary" onClick={() => handleDecrement(item.id)} disabled={item.quantity === 1}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button className="btn btn-primary" onClick={() => handleIncrement(item.id)}>
                                        +
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 ml-4" onClick={() => handleRemoveFromCart(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold">Total: ${calculateTotal()}</h2>
                        <button disabled={isLoading} className="btn btn-primary mt-4" onClick={handleCheckout}>
                            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CusCart
