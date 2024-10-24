import sortBy from 'lodash/sortBy'
import { DataTable, DataTableSortStatus } from 'mantine-datatable'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ApiErrorResponseDT, ApiSuccessResponseDT, ProductDT } from '../../lib/types'
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../store/product/productApi'
import { setPageTitle } from '../../store/themeConfigSlice'
import IconEdit from '../Icon/IconEdit'
import IconPlus from '../Icon/IconPlus'
import IconTrashLines from '../Icon/IconTrashLines'

const toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em',
})

const Products = () => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState<ProductDT[]>([])
    const [deleteProduct] = useDeleteProductMutation()

    const { data, error, isLoading, isError } = useGetAllProductsQuery()

    useEffect(() => {
        dispatch(setPageTitle('Products'))

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
            const response = data as ApiSuccessResponseDT<ProductDT[]>
            setProducts(response.payload.data) // Set products state with API data
        }
    }, [data, isError, error, dispatch])

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            const updatedProducts = id ? products.filter((product) => product.id !== id) : products.filter((product) => !selectedRecords.includes(product.id))
            setProducts(updatedProducts)
        }
    }

    const [page, setPage] = useState(1)
    const PAGE_SIZES = [10, 20, 30, 50, 100]
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
    const [initialRecords, setInitialRecords] = useState(sortBy(products, 'name')) // Assuming 'name' exists in your product data
    const [records, setRecords] = useState(initialRecords)
    const [selectedRecords, setSelectedRecords] = useState<any>([])

    const [search, setSearch] = useState('')
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name', // Assuming sorting by 'name'
        direction: 'asc',
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
            return products.filter((product) => {
                return (
                    product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()) // Adjust based on your product fields
                )
            })
        })
    }, [search, products])

    useEffect(() => {
        const sortedData = sortBy(initialRecords, sortStatus.columnAccessor)
        setRecords(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData)
        setPage(1)
    }, [sortStatus, initialRecords])

    const handleDelete = async (productId: string) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action will permanently delete the product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        })
        if (confirmDelete.isConfirmed) {
            try {
                await deleteProduct(productId).unwrap()
                Swal.fire('Deleted', 'The product has been deleted.', 'success')
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete the product.', 'error')
            }
        }
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Products
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Products</span>
                </li>
            </ul>

            <div className="pt-5">
                <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
                    <div className="invoice-table">
                        <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                            <div className="flex items-center gap-2">
                                <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                                    <IconTrashLines />
                                    Delete
                                </button>
                                <Link to="/products/create" className="btn btn-primary gap-2">
                                    <IconPlus />
                                    Add New
                                </Link>
                            </div>
                            <div className="ltr:ml-auto rtl:mr-auto">
                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>

                        <div className="datatables pagination-padding">
                            <DataTable
                                className="whitespace-nowrap table-hover invoice-table"
                                records={records}
                                columns={[
                                    {
                                        accessor: 'id',
                                        sortable: true,
                                        render: ({ id }) => (
                                            <NavLink to={`/products/${id}`}>
                                                <div className="text-primary underline hover:no-underline font-semibold">{`#${id}`}</div>
                                            </NavLink>
                                        ),
                                    },
                                    {
                                        accessor: 'name',
                                        sortable: true,
                                        render: ({ name }) => (
                                            <div className="flex items-center font-semibold">
                                                <div>{name}</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: 'image',
                                        sortable: true,
                                        render: ({ images }) => (
                                            <div className="flex items-center font-semibold">
                                                <div className="flex">
                                                    {images.map((image) => (
                                                        <img key={image.id} className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src={image.imageUrl} alt="product-img" />
                                                    ))}
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: 'description',
                                        sortable: true,
                                    },
                                    {
                                        accessor: 'price',
                                        sortable: true,
                                        titleClassName: 'text-right',
                                        render: ({ price }) => <div className="text-left font-semibold">{`$${price.toFixed(2)}`}</div>,
                                    },
                                    {
                                        accessor: 'stock',
                                        sortable: true,
                                        render: ({ stock }) => <span className={`badge badge-outline-${stock > 0 ? 'success' : 'danger'}`}>{stock > 0 ? 'In Stock' : 'Out of Stock'}</span>,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Actions',
                                        sortable: false,
                                        textAlignment: 'center',
                                        render: ({ id }) => (
                                            <div className="flex gap-4 items-center w-max mx-auto">
                                                <NavLink to={`/products/edit/${id}`} className="flex hover:text-info">
                                                    <IconEdit className="w-4.5 h-4.5" />
                                                </NavLink>
                                                <button type="button" className="flex hover:text-danger" onClick={() => handleDelete(id)}>
                                                    <IconTrashLines />
                                                </button>
                                            </div>
                                        ),
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
                                selectedRecords={selectedRecords}
                                onSelectedRecordsChange={setSelectedRecords}
                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
