import { lazy } from 'react'
const AccountSetting = lazy(() => import('../components/Profile/AccountSetting'))
const NotAllowed = lazy(() => import('../pages/NotAllowed'))
const PublicLayout = lazy(() => import('../components/Layouts/PublicLayout'))
const Login = lazy(() => import('../components/Auth/Login'))
const Products = lazy(() => import('../components/Products/Products'))
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'))
const LandingPage = lazy(() => import('../components/LandingPg/LandingPg'))
const Index = lazy(() => import('../pages/Index'))
const Profile = lazy(() => import('../pages/ProfilePage/Profile'))
const Error = lazy(() => import('../components/Error'))
const ProductPage = lazy(() => import('../pages/ProductsPage/ProductPage'))
const ProtectAdmin = lazy(() => import('../components/ProtectAdmin'))
const ProtectCustomer = lazy(() => import('../components/ProtectCustomer'))
const EditProductPage = lazy(() => import('../pages/ProductsPage/EditProductPage'))
const CusProductsPage = lazy(() => import('../pages/CusProductsPage/CusProductsPage'))
const ViewCusProductPage = lazy(() => import('../pages/CusProductsPage/ViewCusProductPage'))
const CusCartPage = lazy(() => import('../pages/CusProductsPage/CusCartPage'))

const routes = [
    // public routes
    {
        path: '/',
        element: (
            <PublicLayout>
                <LandingPage />
            </PublicLayout>
        ),
        layout: 'public',
    },
    {
        path: '/products',
        element: (
            <PublicLayout>
                <CusProductsPage />
            </PublicLayout>
        ),
        layout: 'public',
    },
    {
        path: '/product/:id',
        element: (
            <PublicLayout>
                <ViewCusProductPage />
            </PublicLayout>
        ),
        layout: 'public',
    },
    {
        path: '/product/cart',
        element: (
            <PublicLayout>
                <CusCartPage />
            </PublicLayout>
        ),
        layout: 'public',
    },
    {
        path: '/about-us',
        element: (
            <PublicLayout>
                <h1>about us</h1>
            </PublicLayout>
        ),
        layout: 'public',
    },
    {
        path: '/contact-us',
        element: (
            <PublicLayout>
                <h1>contact us</h1>
            </PublicLayout>
        ),
        layout: 'public',
    },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/not-allowed',
        element: <NotAllowed />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
    // public routes

    // customer routes
    {
        path: '/cust/profile',
        element: (
            <PublicLayout>
                <ProtectedRoute>
                    <ProtectCustomer>
                        <h1>Cus profile</h1>
                    </ProtectCustomer>
                </ProtectedRoute>
            </PublicLayout>
        ),
        layout: 'public',
    },
    // customer routes

    // dashboard routes
    {
        path: '/dashboard',
        element: (
            <ProtectAdmin>
                <Index />
            </ProtectAdmin>
        ),
    },
    {
        path: '/dash-products',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <Products />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dash-products/create',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <ProductPage />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dash-product/:id',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <EditProductPage />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dash-users/profile',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <Profile />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dash-users/user-account-settings',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <AccountSetting />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    // dashboard routes
]

export { routes }
