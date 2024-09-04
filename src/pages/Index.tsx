import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import IconArrowLeft from '../components/Icon/IconArrowLeft'
import IconBolt from '../components/Icon/IconBolt'
import IconCashBanknotes from '../components/Icon/IconCashBanknotes'
import IconCreditCard from '../components/Icon/IconCreditCard'
import IconDollarSign from '../components/Icon/IconDollarSign'
import IconHorizontalDots from '../components/Icon/IconHorizontalDots'
import IconInbox from '../components/Icon/IconInbox'
import IconMultipleForwardRight from '../components/Icon/IconMultipleForwardRight'
import IconNetflix from '../components/Icon/IconNetflix'
import IconShoppingCart from '../components/Icon/IconShoppingCart'
import IconTag from '../components/Icon/IconTag'
import IconUser from '../components/Icon/IconUser'
import { IRootState } from '../store'
import { setPageTitle } from '../store/themeConfigSlice'

const Index = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'))
    })
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode)
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false

    const [loading] = useState(false)

    //Daily Sales
    const dailySales: any = {
        series: [
            {
                name: 'Sales',
                data: [44, 55, 41, 67, 22, 43, 21],
            },
            {
                name: 'Last Week',
                data: [13, 23, 20, 8, 13, 27, 33],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    }

    //Total Orders
    const totalOrders: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Sales</span>
                </li>
            </ul>

            <div className="pt-5">
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-2 xl:col-span-1">
                        <div className="flex items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">
                                Daily Sales
                                <span className="block text-white-dark text-sm font-normal">Go to columns for details.</span>
                            </h5>
                            <div className="ltr:ml-auto rtl:mr-auto relative">
                                <div className="w-11 h-11 text-warning bg-[#ffeccb] dark:bg-warning dark:text-[#ffeccb] grid place-content-center rounded-full">
                                    <IconDollarSign />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    <ReactApexChart series={dailySales.series} options={dailySales.options} type="bar" height={160} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Summary</h5>
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    button={<IconHorizontalDots className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Mark as Done</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="space-y-9">
                            <div className="flex items-center">
                                <div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
                                    <div className="bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light  rounded-full w-9 h-9 grid place-content-center">
                                        <IconInbox />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex font-semibold text-white-dark mb-2">
                                        <h6>Income</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto">$92,600</p>
                                    </div>
                                    <div className="rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                        <div className="bg-gradient-to-r from-[#7579ff] to-[#b224ef] w-11/12 h-full rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
                                    <div className="bg-success-light dark:bg-success text-success dark:text-success-light rounded-full w-9 h-9 grid place-content-center">
                                        <IconTag />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex font-semibold text-white-dark mb-2">
                                        <h6>Profit</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto">$37,515</p>
                                    </div>
                                    <div className="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                        <div className="bg-gradient-to-r from-[#3cba92] to-[#0ba360] w-full h-full rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
                                    <div className="bg-warning-light dark:bg-warning text-warning dark:text-warning-light rounded-full w-9 h-9 grid place-content-center">
                                        <IconCreditCard />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex font-semibold text-white-dark mb-2">
                                        <h6>Expenses</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto">$55,085</p>
                                    </div>
                                    <div className="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                        <div className="bg-gradient-to-r from-[#f09819] to-[#ff5858] w-full h-full rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex items-center justify-between w-full p-5 absolute">
                            <div className="relative">
                                <div className="text-success dark:text-success-light bg-success-light dark:bg-success w-11 h-11 rounded-lg flex items-center justify-center">
                                    <IconShoppingCart />
                                </div>
                            </div>
                            <h5 className="font-semibold text-2xl ltr:text-right rtl:text-left dark:text-white-light">
                                3,192
                                <span className="block text-sm font-normal">Total Orders</span>
                            </h5>
                        </div>
                        <div className="bg-transparent rounded-lg overflow-hidden">
                            {/* loader */}
                            {loading ? (
                                <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                    <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                </div>
                            ) : (
                                <ReactApexChart series={totalOrders.series} options={totalOrders.options} type="area" height={290} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-2 xl:col-span-1 pb-0">
                        <h5 className="font-semibold text-lg dark:text-white-light mb-5">Recent Activities</h5>
                        <PerfectScrollbar className="relative h-[290px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3 mb-4">
                            <div className="text-sm cursor-pointer">
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-primary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Updated Server Logs</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">Just Now</div>

                                    <span className="badge badge-outline-primary absolute ltr:right-0 rtl:left-0 text-xs bg-primary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Pending
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-success w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Send Mail to HR and Admin</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">2 min ago</div>

                                    <span className="badge badge-outline-success absolute ltr:right-0 rtl:left-0 text-xs bg-success-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Completed
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-danger w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Backup Files EOD</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">14:00</div>

                                    <span className="badge badge-outline-danger absolute ltr:right-0 rtl:left-0 text-xs bg-danger-light dark:bg-black opacity-0 group-hover:opacity-100">Pending</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Collect documents from Sara</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">16:00</div>

                                    <span className="badge badge-outline-dark absolute ltr:right-0 rtl:left-0 text-xs bg-dark-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-warning w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Conference call with Marketing Manager.</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                    <span className="badge badge-outline-warning absolute ltr:right-0 rtl:left-0 text-xs bg-warning-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        In progress
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-info w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Rebooted Server</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                    <span className="badge badge-outline-info absolute ltr:right-0 rtl:left-0 text-xs bg-info-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-secondary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Send contract details to Freelancer</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">18:00</div>

                                    <span className="badge badge-outline-secondary absolute ltr:right-0 rtl:left-0 text-xs bg-secondary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Pending
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-primary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Updated Server Logs</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">Just Now</div>

                                    <span className="badge badge-outline-primary absolute ltr:right-0 rtl:left-0 text-xs bg-primary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Pending
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-success w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Send Mail to HR and Admin</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">2 min ago</div>

                                    <span className="badge badge-outline-success absolute ltr:right-0 rtl:left-0 text-xs bg-success-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Completed
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-danger w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Backup Files EOD</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">14:00</div>

                                    <span className="badge badge-outline-danger absolute ltr:right-0 rtl:left-0 text-xs bg-danger-light dark:bg-black opacity-0 group-hover:opacity-100">Pending</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Collect documents from Sara</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">16:00</div>

                                    <span className="badge badge-outline-dark absolute ltr:right-0 rtl:left-0 text-xs bg-dark-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-warning w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Conference call with Marketing Manager.</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                    <span className="badge badge-outline-warning absolute ltr:right-0 rtl:left-0 text-xs bg-warning-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        In progress
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-info w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Rebooted Server</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                    <span className="badge badge-outline-info absolute ltr:right-0 rtl:left-0 text-xs bg-info-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-secondary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Send contract details to Freelancer</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">18:00</div>

                                    <span className="badge badge-outline-secondary absolute ltr:right-0 rtl:left-0 text-xs bg-secondary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Pending
                                    </span>
                                </div>
                            </div>
                        </PerfectScrollbar>
                        <div className="border-t border-white-light dark:border-white/10">
                            <Link to="/" className=" font-semibold group hover:text-primary p-4 flex items-center justify-center group">
                                View All
                                <IconArrowLeft className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
                            </Link>
                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Transactions</h5>
                            <div className="dropdown">
                                <Dropdown placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}>
                                    <ul>
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Mark as Done</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-6">
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">SP</span>
                                    <div className="px-3 flex-1">
                                        <div>Shaun Park</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$36.11</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-warning-light dark:bg-warning text-warning dark:text-warning-light">
                                        <IconCashBanknotes />
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>Cash withdrawal</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$16.44</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-danger-light dark:bg-danger text-danger dark:text-danger-light">
                                        <IconUser className="w-6 h-6" />
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>Amy Diaz</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$66.44</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light">
                                        <IconNetflix />
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>Netflix</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$32.00</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-info-light dark:bg-info text-info dark:text-info-light">DA</span>
                                    <div className="px-3 flex-1">
                                        <div>Daisy Anderson</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">+$10.08</span>
                                </div>
                                <div className="flex">
                                    <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-primary-light dark:bg-primary text-primary dark:text-primary-light">
                                        <IconBolt />
                                    </span>
                                    <div className="px-3 flex-1">
                                        <div>Electricity Bill</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">-$22.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Recent Orders</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">Customer</th>
                                        <th>Product</th>
                                        <th>Invoice</th>
                                        <th>Price</th>
                                        <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-6.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Luke Ivory</span>
                                            </div>
                                        </td>
                                        <td className="text-primary">Headphone</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#46894</Link>
                                        </td>
                                        <td>$56.07</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-7.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Andy King</span>
                                            </div>
                                        </td>
                                        <td className="text-info">Nike Sport</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#76894</Link>
                                        </td>
                                        <td>$126.04</td>
                                        <td>
                                            <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-8.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Laurie Fox</span>
                                            </div>
                                        </td>
                                        <td className="text-warning">Sunglasses</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#66894</Link>
                                        </td>
                                        <td>$56.07</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-9.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Ryan Collins</span>
                                            </div>
                                        </td>
                                        <td className="text-danger">Sport</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#75844</Link>
                                        </td>
                                        <td>$110.00</td>
                                        <td>
                                            <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-10.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Irene Collins</span>
                                            </div>
                                        </td>
                                        <td className="text-secondary">Speakers</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#46894</Link>
                                        </td>
                                        <td>$56.07</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Top Selling Product</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr className="border-b-0">
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">Product</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Sold</th>
                                        <th className="ltr:rounded-r-md rtl:rounded-l-md">Source</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-headphones.jpg" alt="avatar" />
                                                <p className="whitespace-nowrap">
                                                    Headphone
                                                    <span className="text-primary block text-xs">Digital</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>$168.09</td>
                                        <td>$60.09</td>
                                        <td>170</td>
                                        <td>
                                            <Link className="text-danger flex items-center" to="/">
                                                <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                                Direct
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-shoes.jpg" alt="avatar" />
                                                <p className="whitespace-nowrap">
                                                    Shoes <span className="text-warning block text-xs">Faishon</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>$126.04</td>
                                        <td>$47.09</td>
                                        <td>130</td>
                                        <td>
                                            <Link className="text-success flex items-center" to="/">
                                                <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                                Google
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-watch.jpg" alt="avatar" />
                                                <p className="whitespace-nowrap">
                                                    Watch <span className="text-danger block text-xs">Accessories</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>$56.07</td>
                                        <td>$20.00</td>
                                        <td>66</td>
                                        <td>
                                            <Link className="text-warning flex items-center" to="/">
                                                <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                                Ads
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-laptop.jpg" alt="avatar" />
                                                <p className="whitespace-nowrap">
                                                    Laptop <span className="text-primary block text-xs">Digital</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>$110.00</td>
                                        <td>$33.00</td>
                                        <td>35</td>
                                        <td>
                                            <Link className="text-secondary flex items-center" to="/">
                                                <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                                Email
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/product-camera.jpg" alt="avatar" />
                                                <p className="whitespace-nowrap">
                                                    Camera <span className="text-primary block text-xs">Digital</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>$56.07</td>
                                        <td>$26.04</td>
                                        <td>30</td>
                                        <td>
                                            <Link className="text-primary flex items-center" to="/">
                                                <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                                                Referral
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
