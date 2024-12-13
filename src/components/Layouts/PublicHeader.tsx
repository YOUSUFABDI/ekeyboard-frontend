import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiSuccessResponseDT, UserDT } from '../../lib/types'
import { IRootState } from '../../store'
import { useGetAuthenticatedUserQuery } from '../../store/auth/authApi'
import { setPageTitle, toggleTheme } from '../../store/themeConfigSlice'
import Dropdown from '../Dropdown'
import IconLaptop from '../Icon/IconLaptop'
import IconLogout from '../Icon/IconLogout'
import IconMoon from '../Icon/IconMoon'
import IconShoppingCart from '../Icon/IconShoppingCart'
import IconSun from '../Icon/IconSun'
import IconUser from '../Icon/IconUser'
import IconMenu from '../Icon/IconMenu'

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
    const navigate = useNavigate()
    const location = useLocation()
    const themeConfig = useSelector((state: IRootState) => state.themeConfig)
    const dispatch = useDispatch()

    const isActiveLink = (path: string) => location.pathname === path

    const cartItems = useSelector((state: IRootState) => state.cart.items)

    useEffect(() => {
        dispatch(setPageTitle('Home'))

        if (isError) {
            const errorMessage = (error as any)?.data?.error?.message || 'An unexpected error occurred while fetching user data.'
            console.error('Error fetching user data:', errorMessage)

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

    const logout = () => {
        window.localStorage.clear()
        setUser(null)

        toast.fire({
            icon: 'success',
            title: 'You have been logged out.',
            padding: '2em',
        })

        navigate('/')
        window.location.reload()
    }

    return (
        <header className="relative bg-white w-full px-5 py-2.5 dark:bg-black">
            <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
                <div className="flex-shrink-0">
                    <Link to={'/'}>
                        <span className="text-lg md:text-xl">Ekeyboard</span>
                    </Link>
                </div>

                {/* Desktop and Tablet navigation */}
                <nav className="hidden lg:flex space-x-4">
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

                {/* User and theme controls */}
                <div className="hidden lg:flex items-center gap-3 ">
                    <button
                        className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                        onClick={() => {
                            const nextTheme = themeConfig.theme === 'light' ? 'dark' : themeConfig.theme === 'dark' ? 'system' : 'light'
                            dispatch(toggleTheme(nextTheme))
                        }}
                    >
                        {themeConfig.theme === 'light' && <IconSun />}
                        {themeConfig.theme === 'dark' && <IconMoon />}
                        {themeConfig.theme === 'system' && <IconLaptop />}
                    </button>

                    <Link to="/product/cart" className="relative flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                        <IconShoppingCart />
                        <span className="bg-danger text-white absolute right-0 top-0 w-4 h-4 rounded-full text-center flex items-center justify-center font-bold"> {cartItems.length}</span>
                    </Link>

                    <Dropdown
                        offset={[0, 8]}
                        placement="bottom-end"
                        btnClassName="relative group block"
                        button={
                            isLoading ? (
                                <span className="flex justify-center items-center w-9 h-9 text-center rounded-full bg-gray-300 text-base">...</span>
                            ) : user ? (
                                <img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src={user.photo} alt="userProfile" />
                            ) : (
                                <button className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                    <IconUser />
                                </button>
                            )
                        }
                    >
                        <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90 bg-gray-100 dark:bg-[#0E1726]">
                            {token && user ? (
                                <>
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img className="rounded-md w-10 h-10 object-cover" src={user.photo} alt="userProfile" />
                                            <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 className="text-base">{user.username}</h4>
                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                    {user.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="ltr:pl-4 rtl:pr-4">
                                        <Link to="/cust/profile" className="dark:hover:text-white flex">
                                            <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            <span>Profile</span>
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10 ltr:pl-4 rtl:pr-4 mt-3">
                                        <button onClick={logout} className="text-danger !py-3 flex">
                                            <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            <span>Sign Out</span>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" className="text-primary !py-3">
                                            Log In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sign-up" className="text-primary !py-3">
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </Dropdown>
                </div>

                {/* Mobile menu */}
                <div className="dropdown flex gap-4 lg:hidden">
                    <button
                        className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                        onClick={() => {
                            const nextTheme = themeConfig.theme === 'light' ? 'dark' : themeConfig.theme === 'dark' ? 'system' : 'light'
                            dispatch(toggleTheme(nextTheme))
                        }}
                    >
                        {themeConfig.theme === 'light' && <IconSun />}
                        {themeConfig.theme === 'dark' && <IconMoon />}
                        {themeConfig.theme === 'system' && <IconLaptop />}
                    </button>

                    <Link to="/product/cart" className="relative flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                        <IconShoppingCart />
                        <span className="bg-danger text-white absolute right-0 top-0 w-4 h-4 rounded-full text-center flex items-center justify-center font-bold">0</span>
                    </Link>

                    <Dropdown
                        offset={[0, 8]}
                        placement="bottom-end"
                        btnClassName="relative group block"
                        button={
                            <button className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                <IconMenu />
                            </button>
                        }
                    >
                        <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                            <nav>
                                <li>
                                    <Link to="/" className={`hover:text-blue-500 ${isActiveLink('/') ? 'text-blue-600 font-bold' : ''}`}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products" className={`hover:text-blue-500 ${isActiveLink('/products') ? 'text-blue-600 font-bold' : ''}`}>
                                        Product
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about-us" className={`hover:text-blue-500 ${isActiveLink('/about-us') ? 'text-blue-600 font-bold' : ''}`}>
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact-us" className={`hover:text-blue-500 ${isActiveLink('/contact-us') ? 'text-blue-600 font-bold' : ''}`}>
                                        Contact us
                                    </Link>
                                </li>
                            </nav>

                            {token && user ? (
                                <>
                                    <li>
                                        <Link to="/cust/profile" className="dark:hover:text-white">
                                            <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <button onClick={logout} className="text-danger !py-3">
                                            <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            Sign Out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" className="text-primary !py-3">
                                            Log In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sign-up" className="text-primary !py-3">
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}
export default PublicHeader
