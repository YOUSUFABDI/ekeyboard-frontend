import { lazy } from 'react'
import AccountSetting from '../components/Profile/AccountSetting'
import NotAllowed from '../pages/NotAllowed'
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

const routes = [
    // customer routes
    {
        path: '/',
        element: <LandingPage />,
        layout: 'blank',
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
        path: '/products',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <Products />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    {
        path: '/products/create',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <ProductPage />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    {
        path: 'product/:id',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <EditProductPage />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    {
        path: '/users/profile',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <Profile />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    {
        path: '/users/user-account-settings',
        element: (
            <ProtectedRoute>
                <ProtectAdmin>
                    <AccountSetting />
                </ProtectAdmin>
            </ProtectedRoute>
        ),
    },
    // dashboard routes

    // public routes
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
]

export { routes }
