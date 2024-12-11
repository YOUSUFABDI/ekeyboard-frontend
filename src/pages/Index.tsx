import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import IconCreditCard from '../components/Icon/IconCreditCard'
import IconHorizontalDots from '../components/Icon/IconHorizontalDots'
import IconInbox from '../components/Icon/IconInbox'
import IconMultipleForwardRight from '../components/Icon/IconMultipleForwardRight'
import IconShoppingCart from '../components/Icon/IconShoppingCart'
import IconTag from '../components/Icon/IconTag'
import { IRootState } from '../store'
import { useGetRecentOrdersQuery, useGetTopSellingProductsQuery } from '../store/dashboard/dashboard'
import { setPageTitle } from '../store/themeConfigSlice'

const Index = () => {
    const dispatch = useDispatch()

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode)
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false

    const { data, error, isLoading } = useGetTopSellingProductsQuery(10) // Fetch top 10 products
    console.log(data)

    const [loading] = useState(false)

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

    useEffect(() => {
        dispatch(setPageTitle('Dashboard'))
    })

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

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    {/* recent otders */}
                    <RecentOrdersPanel />
                    {/* recent otders */}

                    {/*Top Selling Product  */}
                    <TopSellingProductsPanel />
                    {/*Top Selling Product  */}
                </div>
            </div>
        </div>
    )
}

export default Index

const TopSellingProductsPanel: React.FC = () => {
    const { data, error, isLoading } = useGetTopSellingProductsQuery(10)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading top-selling products</p>
    if (!data?.payload?.data?.length) return <p>No products found.</p>

    return (
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
                            <th>Sold</th>
                            <th className="ltr:rounded-r-md rtl:rounded-l-md">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.payload.data.map((item) => (
                            <tr key={item.product.id} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                <td className="min-w-[150px] text-black dark:text-white">
                                    <div className="flex">
                                        <img
                                            className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover"
                                            src={item.product.images[0]?.imageUrl || '/assets/images/default-product.jpg'}
                                            alt={item.product.name}
                                        />
                                        <p className="whitespace-nowrap">{item.product.name}</p>
                                    </div>
                                </td>
                                <td>${item.product.price}</td>
                                <td>{item.totalSold}</td>
                                <td>{item.product.category.name || 'General'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const RecentOrdersPanel: React.FC = () => {
    const { data, error, isLoading } = useGetRecentOrdersQuery(10) // Fetch 10 recent orders

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading recent orders</p>
    if (!data?.payload?.data?.length) return <p>No orders found.</p>

    return (
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
                        {data?.payload?.data.map((order) => (
                            <tr key={order.orderId} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                <td className="min-w-[150px] text-black dark:text-white">
                                    <div className="flex items-center">
                                        <img
                                            className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover"
                                            src="/assets/images/profile-6.jpeg" // You can add dynamic images if you have them
                                            alt="avatar"
                                        />
                                        <span className="whitespace-nowrap">{order.customerName}</span>
                                    </div>
                                </td>
                                <td className="text-primary">{order.productName}</td>
                                <td>
                                    <Link to="/apps/invoice/preview">#{order.orderId}</Link> {/* Dynamic invoice link */}
                                </td>
                                <td>${order.orderPrice.toFixed(2)}</td> {/* Formatting price */}
                                <td>
                                    <span className={`badge ${order.orderStatus === 'Paid' ? 'bg-success' : 'bg-secondary'} shadow-md dark:group-hover:bg-transparent`}>{order.orderStatus}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
