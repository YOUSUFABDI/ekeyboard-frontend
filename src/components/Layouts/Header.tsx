import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT, ApiSuccessResponseDT, UserDT } from '../../lib/types'
import { IRootState } from '../../store'
import { useGetAuthenticatedUserQuery } from '../../store/auth/authApi'
import { toggleRTL, toggleSidebar, toggleTheme } from '../../store/themeConfigSlice'
import Dropdown from '../Dropdown'
import IconLaptop from '../Icon/IconLaptop'
import IconLogout from '../Icon/IconLogout'
import IconMenu from '../Icon/IconMenu'
import IconMoon from '../Icon/IconMoon'
import IconSun from '../Icon/IconSun'
import IconUser from '../Icon/IconUser'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const Header = () => {
    const [user, setUser] = useState<UserDT | null>(null)
    const { data, isLoading, isError, error } = useGetAuthenticatedUserQuery()

    const location = useLocation()
    const navigate = useNavigate()

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

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]')
        if (selector) {
            selector.classList.add('active')
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active')
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active')
            }
            const ul: any = selector.closest('ul.sub-menu')
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link')
                if (ele) {
                    ele = ele[0]
                    setTimeout(() => {
                        ele?.classList.add('active')
                    })
                }
            }
        }
    }, [location])

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false

    const themeConfig = useSelector((state: IRootState) => state.themeConfig)
    const dispatch = useDispatch()

    const setLocale = (flag: string) => {
        setFlag(flag)
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'))
        } else {
            dispatch(toggleRTL('ltr'))
        }
    }
    const [flag, setFlag] = useState(themeConfig.locale)

    const logout = () => {
        window.localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link to="/" className="main-logo flex items-center shrink-0">
                            {/* <img className="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.svg" alt="logo" /> */}
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">Ekeyboard</span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar())
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${
                                        themeConfig.theme === 'light' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
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
                                        themeConfig.theme === 'dark' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
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
                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={<img className="w-5 h-5 object-cover rounded-full" src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="flag" />}
                            >
                                <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                    {themeConfig.languageList.map((item: any) => {
                                        return (
                                            <li key={item.code}>
                                                <button
                                                    type="button"
                                                    className={`flex w-full hover:text-primary rounded-lg ${i18next.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                    onClick={() => {
                                                        i18next.changeLanguage(item.code)
                                                        // setFlag(item.code);
                                                        setLocale(item.code)
                                                    }}
                                                >
                                                    <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                    <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Dropdown>
                        </div>

                        <div className="dropdown shrink-0 flex">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={
                                    isLoading ? (
                                        <span className="flex justify-center items-center w-9 h-9 text-center rounded-full object-cover bg-success text-base text-white">IMG</span>
                                    ) : (
                                        <img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src={user?.photo} alt="userProfile" />
                                    )
                                }
                            >
                                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            {isLoading ? (
                                                <span className="flex justify-center items-center w-9 h-9 text-center rounded-full object-cover bg-success text-base">IMG</span>
                                            ) : (
                                                <img className="rounded-md w-10 h-10 object-cover" src={user?.photo} alt="userProfile" />
                                            )}
                                            <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 className="text-base">{user?.username}</h4>
                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                    {user?.email}
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
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
