import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { IRootState } from '../../store'
import { toggleTheme } from '../../store/themeConfigSlice'
import IconLaptop from '../Icon/IconLaptop'
import IconMoon from '../Icon/IconMoon'
import IconShoppingCart from '../Icon/IconShoppingCart'
import IconSun from '../Icon/IconSun'
import IconUser from '../Icon/IconUser'
import { useEffect, useState } from 'react'
import { ApiErrorResponseDT, ApiSuccessResponseDT, UserDT } from '../../lib/types'
import { useGetAuthenticatedUserQuery } from '../../store/auth/authApi'
import Swal from 'sweetalert2'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const PublicHeader = () => {
    const [user, setUser] = useState<UserDT | null>(null)
    const { data, isLoading, isError, error } = useGetAuthenticatedUserQuery()

    const token = localStorage.getItem('token')

    const location = useLocation()
    const themeConfig = useSelector((state: IRootState) => state.themeConfig)
    const dispatch = useDispatch()

    const isActiveLink = (path: string) => location.pathname === path

    useEffect(() => {
        if (isError) {
            let errorMessage = 'An error occurred'
            if ((error as any).data) {
                const errorData = (error as any).data as ApiErrorResponseDT
                errorMessage = errorData.error.message
            }

            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }

        if (data && data.payload && !data.error) {
            const response = data as unknown as ApiSuccessResponseDT<{ user: UserDT }>
            setUser(response.payload.data.user)
        }
    }, [data, isError, error])

    return (
        <header className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black justify-between">
            <div>
                <span>Ekeyboard</span>
            </div>

            <nav className="flex space-x-4">
                <nav className="flex space-x-4">
                    <Link to="/" className={`hover:text-blue-500 ${isActiveLink('/') ? 'text-blue-600 font-bold' : ''}`}>
                        Home
                    </Link>
                    <Link to="/products" className={`hover:text-blue-500 ${isActiveLink('/products') ? 'text-blue-600 font-bold' : ''}`}>
                        Product
                    </Link>
                    <Link to="/about-us" className={`hover:text-blue-500 ${isActiveLink('/about-us') ? 'text-blue-600 font-bold' : ''}`}>
                        About us
                    </Link>
                    <Link to="/contact-us" className={`hover:text-blue-500 ${isActiveLink('/contact-us') ? 'text-blue-600 font-bold' : ''}`}>
                        Contact us
                    </Link>
                </nav>
            </nav>

            <div className="flex items-center gap-3">
                <div>
                    {themeConfig.theme === 'light' ? (
                        <button
                            className={`${
                                themeConfig.theme === 'light' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                            }`}
                            onClick={() => {
                                dispatch(toggleTheme('dark'))
                            }}
                        >
                            <IconSun />
                        </button>
                    ) : (
                        ''
                    )}
                    {themeConfig.theme === 'dark' && (
                        <button
                            className={`${
                                themeConfig.theme === 'dark' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                            }`}
                            onClick={() => {
                                dispatch(toggleTheme('system'))
                            }}
                        >
                            <IconMoon />
                        </button>
                    )}
                    {themeConfig.theme === 'system' && (
                        <button
                            className={`${
                                themeConfig.theme === 'system' &&
                                'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                            }`}
                            onClick={() => {
                                dispatch(toggleTheme('light'))
                            }}
                        >
                            <IconLaptop />
                        </button>
                    )}
                </div>

                <button>
                    <IconShoppingCart />
                </button>
                <button>
                    {/* <IconUser /> */}
                    {token && <img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src={user?.photo} alt="userProfile" />}
                </button>
            </div>
        </header>
    )
}

export default PublicHeader
