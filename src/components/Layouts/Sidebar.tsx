import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { IRootState } from '../../store'
import { toggleSidebar } from '../../store/themeConfigSlice'
import IconCaretsDown from '../Icon/IconCaretsDown'
import IconMinus from '../Icon/IconMinus'
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard'

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('')
    const [errorSubMenu, setErrorSubMenu] = useState(false)
    const themeConfig = useSelector((state: IRootState) => state.themeConfig)
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark)
    const location = useLocation()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value
        })
    }

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]')
        if (selector) {
            selector.classList.add('active')
            const ul: any = selector.closest('ul.sub-menu')
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || []
                if (ele.length) {
                    ele = ele[0]
                    setTimeout(() => {
                        ele.click()
                    })
                }
            }
        }
    }, [])

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/dashboard" className="main-logo flex items-center shrink-0">
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('Ekeyboard')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/dashboard" className="group">
                                            <div className="flex items-center">
                                                <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/dash-products" className="group">
                                            <div className="flex items-center">
                                                <IconMinus className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Products')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/dash-users/orders" className="group">
                                            <div className="flex items-center">
                                                <IconMinus className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Orders')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/dash-users/profile" className="group">
                                            <div className="flex items-center">
                                                <IconMinus className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Profile')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
