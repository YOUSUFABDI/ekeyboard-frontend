import { lazy } from 'react'
const AccountSetting = lazy(() => import('../components/Admin/Profile/AccountSetting'))
const NotAllowed = lazy(() => import('../pages/NotAllowed'))
const AboutUs = lazy(() => import('../pages/AboutUs'))
const ContactUs = lazy(() => import('../pages/ContactUs'))
const PublicLayout = lazy(() => import('../components/Layouts/PublicLayout'))
const Login = lazy(() => import('../components/Auth/Login'))
const Signup = lazy(() => import('../components/Auth/Signup'))
const VerifyEmail = lazy(() => import('../components/Auth/VerifyEmail'))
const ForgotPassword = lazy(() => import('../components/Auth/ForgotPassword'))
const ResetPassword = lazy(() => import('../components/Auth/ResetPassword'))
const Products = lazy(() => import('../components/Admin/Products/Products'))
const OrdersPage = lazy(() => import('../pages/AdminPages/OrdersPage/OrdersPage'))
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'))
const LandingPage = lazy(() => import('../components/Customer/LandingPg/LandingPg'))
const Index = lazy(() => import('../pages/Index'))
const Profile = lazy(() => import('../pages/ProfilePage/Profile'))
const Error = lazy(() => import('../components/Error'))
const ProductPage = lazy(() => import('../pages/AdminPages/ProductsPage/ProductPage'))
const ProtectAdmin = lazy(() => import('../components/ProtectAdmin'))
const ProtectCustomer = lazy(() => import('../components/ProtectCustomer'))
const EditProductPage = lazy(() => import('../pages/AdminPages/ProductsPage/EditProductPage'))
const CusProductsPage = lazy(() => import('../pages/CustomerPages/CusProductsPage/CusProductsPage'))
const ViewCusProductPage = lazy(() => import('../pages/CustomerPages/CusProductsPage/ViewCusProductPage'))
const CusCartPage = lazy(() => import('../pages/CustomerPages/CusProductsPage/CusCartPage'))
const CusProfilePage = lazy(() => import('../pages/CustomerPages/CusProfilePage/CusProfilePage'))

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
                <AboutUs />
            </PublicLayout>
        ),
        layout: 'public',
    },
    {
        path: '/contact-us',
        element: (
            <PublicLayout>
                <ContactUs />
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
        path: '/sign-up',
        element: <Signup />,
        layout: 'blank',
    },
    {
        path: '/verify-email',
        element: <VerifyEmail />,
        layout: 'blank',
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
        layout: 'blank',
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
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
                        <CusProfilePage />
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
        path: '/dash-users/orders',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <OrdersPage />
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
