import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import IconCreditCard from '../components/Icon/IconCreditCard'
import IconHorizontalDots from '../components/Icon/IconHorizontalDots'
import IconInbox from '../components/Icon/IconInbox'
import IconTag from '../components/Icon/IconTag'
import { useGetRecentOrdersQuery, useGetSummaryQuery, useGetTopSellingProductsQuery } from '../store/dashboard/dashboard'
import { setPageTitle } from '../store/themeConfigSlice'

const Index = () => {
    const dispatch = useDispatch()

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
                    {/* summary */}
                    <SummaryPanel />
                    {/* summary */}
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

const SummaryPanel: React.FC = () => {
    const { data, error, isLoading } = useGetSummaryQuery({})

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error fetching summary data</p>

    // Destructure the data from the response
    const { totalCustomers, totalProfit, totalOrders } = data?.payload?.data || {}

    return (
        <div className="panel h-full">
            <div className="flex items-center justify-between dark:text-white-light mb-5">
                <h5 className="font-semibold text-lg">Summary</h5>
                <div className="dropdown">
                    <Dropdown
                        placement="bottom-end" // or "bottom-start" based on your needs
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
                        <div className="bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light rounded-full w-9 h-9 grid place-content-center">
                            <IconInbox />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex font-semibold text-white-dark mb-2">
                            <h6>Total Customers</h6>
                            <p className="ltr:ml-auto rtl:mr-auto">{totalCustomers}</p>
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
                            <h6>Total Profit</h6>
                            <p className="ltr:ml-auto rtl:mr-auto">${totalProfit?.toFixed(2)}</p>
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
                            <h6>Total Orders</h6>
                            <p className="ltr:ml-auto rtl:mr-auto">{totalOrders}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
