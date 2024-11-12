import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT, ApiSuccessResponseDT, UserDT } from '../../lib/types'
import { IRootState } from '../../store'
import { useGetAuthenticatedUserQuery } from '../../store/auth/authApi'
import { toggleTheme } from '../../store/themeConfigSlice'
import Dropdown from '../Dropdown'
import IconLaptop from '../Icon/IconLaptop'
import IconLogout from '../Icon/IconLogout'
import IconMoon from '../Icon/IconMoon'
import IconShoppingCart from '../Icon/IconShoppingCart'
import IconSun from '../Icon/IconSun'
import IconUser from '../Icon/IconUser'

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

    useEffect(() => {
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
        // Clear the local storage token and reset user state to null
        window.localStorage.removeItem('token')
        setUser(null) // This triggers a re-render of the component

        // Provide feedback to the user
        toast.fire({
            icon: 'success',
            title: 'You have been logged out.',
            padding: '2em',
        })

        // Navigate to the home page without refreshing
        navigate('/')
    }

    return (
        <header className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black justify-between">
            <div>
                <span>Ekeyboard</span>
            </div>

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

            <div className="flex items-center gap-3">
                <div>
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
                </div>

                <button className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                    <IconShoppingCart />
                </button>

                <div className="dropdown shrink-0 flex">
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
                        <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
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
                                    <li>
                                        <Link to="/users/profile" className="dark:hover:text-white">
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
                                <li>
                                    <Link to="/login" className="text-primary !py-3">
                                        Log In
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}

export default PublicHeader
