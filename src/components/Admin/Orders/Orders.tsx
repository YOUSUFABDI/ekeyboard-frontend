import sortBy from 'lodash/sortBy'
import { DataTable, DataTableSortStatus } from 'mantine-datatable'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT, ApiSuccessResponseDT, OrderDT } from '../../../lib/types'
import { useGetOrdersQuery, useChangeOrderStatusMutation } from '../../../store/order/OrderApi'
import { setPageTitle } from '../../../store/themeConfigSlice'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const Orders = () => {
    const dispatch = useDispatch()
    const { data, error, isLoading, isError } = useGetOrdersQuery()
    const [changeOrderStatus] = useChangeOrderStatusMutation()

    const [orders, setOrders] = useState<OrderDT[]>([])
    const [loadingMap, setLoadingMap] = useState<{ [key: number]: boolean }>({}) // Loading state for each order

    useEffect(() => {
        dispatch(setPageTitle('Orders'))

        if (isError) {
            let errorMessage = 'An error occurred'
            if (error && 'data' in error) {
                const errorData = error.data as ApiErrorResponseDT
                errorMessage = errorData.error?.message || errorMessage
            }
            toast.fire({
                icon: 'error',
                title: errorMessage,
                padding: '2em',
            })
        }

        if (data && data.payload && !data.error) {
            const response = data as ApiSuccessResponseDT<OrderDT[]>
            setOrders(response.payload.data)
        }
    }, [data, isError, error, dispatch])

    const [page, setPage] = useState(1)
    const PAGE_SIZES = [10, 20, 30, 50, 100]
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
    const [initialRecords, setInitialRecords] = useState(sortBy(orders, 'createdDT'))
    const [records, setRecords] = useState(initialRecords)

    const [search, setSearch] = useState('')
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'createdDT',
        direction: 'desc',
    })

    useEffect(() => {
        setPage(1)
    }, [pageSize])

    useEffect(() => {
        const from = (page - 1) * pageSize
        const to = from + pageSize
        setRecords([...initialRecords.slice(from, to)])
    }, [page, pageSize, initialRecords])

    useEffect(() => {
        setInitialRecords(() => {
            return orders.filter((order) => {
                return order.user.fullName.toLowerCase().includes(search.toLowerCase()) || order.product.name.toLowerCase().includes(search.toLowerCase())
            })
        })
    }, [search, orders])

    useEffect(() => {
        const sortedData = sortBy(initialRecords, sortStatus.columnAccessor)
        setRecords(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData)
        setPage(1)
    }, [sortStatus, initialRecords])

    const handleChangeStatus = async (orderId: number, newStatus: string) => {
        // Set loading state for this order
        setLoadingMap((prev) => ({ ...prev, [orderId]: true }))

        const confirmChange = await Swal.fire({
            title: 'Are you sure?',
            text: `Change order status to ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
        })

        if (confirmChange.isConfirmed) {
            try {
                const response = await changeOrderStatus({ id: orderId, status: newStatus }).unwrap()
                toast.fire({
                    icon: 'success',
                    title: response.payload.message,
                })

                // Update orders locally
                setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
            } catch (error: any) {
                console.error('API Error:', error)
                const errorMessage = error.data?.error?.message || 'Failed to update the order status.'
                toast.fire({
                    icon: 'error',
                    title: errorMessage,
                })
            } finally {
                // Reset loading state for this order
                setLoadingMap((prev) => ({ ...prev, [orderId]: false }))
            }
        } else {
            // Reset loading state for this order if canceled
            setLoadingMap((prev) => ({ ...prev, [orderId]: false }))
        }
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Orders
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Orders</span>
                </li>
            </ul>

            <div className="pt-5">
                <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
                    <div className="invoice-table">
                        <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                            <div className="ltr:ml-auto rtl:mr-auto">
                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>

                        <div className="datatables pagination-padding">
                            <DataTable<OrderDT>
                                className="whitespace-nowrap table-hover invoice-table"
                                records={records}
                                columns={[
                                    {
                                        accessor: 'id',
                                        title: 'Order ID',
                                        sortable: true,
                                    },
                                    {
                                        accessor: 'user.fullName',
                                        title: 'Customer',
                                        sortable: true,
                                    },
                                    {
                                        accessor: 'product.name',
                                        title: 'Product',
                                        sortable: true,
                                    },
                                    {
                                        accessor: 'quantity',
                                        title: 'Quantity',
                                        sortable: true,
                                    },
                                    {
                                        accessor: 'status',
                                        title: 'Status',
                                        render: (record: OrderDT) =>
                                            loadingMap[record.id] ? ( // Show spinner if loading
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="">Changing...</span>
                                                </div>
                                            ) : (
                                                <select className="form-select" value={record.status} onChange={(e) => handleChangeStatus(record.id, e.target.value)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            ),
                                    },
                                    {
                                        accessor: 'createdDT',
                                        title: 'Date',
                                        sortable: true,
                                        render: (record: OrderDT) => (record.createdDT ? new Date(record.createdDT).toLocaleDateString() : 'N/A'),
                                    },
                                ]}
                                highlightOnHover
                                totalRecords={initialRecords.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={PAGE_SIZES}
                                onRecordsPerPageChange={setPageSize}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
