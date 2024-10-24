import { lazy } from 'react'
import AccountSetting from '../components/Profile/AccountSetting'
import NotAllowed from '../pages/NotAllowed'
const Login = lazy(() => import('../components/Auth/Login'))
const Products = lazy(() => import('../components/Products/Products'))
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'))
const Index = lazy(() => import('../pages/Index'))
const Profile = lazy(() => import('../pages/ProfilePage/Profile'))
const Error = lazy(() => import('../components/Error'))
const ProductPage = lazy(() => import('../pages/ProductsPage/ProductPage'))
const ProtectedPermistion = lazy(() => import('../components/ProtectPermistion'))
const EditProductPage = lazy(() => import('../pages/ProductsPage/EditProductPage'))

const routes = [
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/',
        element: (
            <ProtectedPermistion>
                <Index />
            </ProtectedPermistion>
        ),
    },
    {
        path: '/products',
        element: (
            <ProtectedRoute>
                <ProtectedPermistion>
                    <Products />
                </ProtectedPermistion>
            </ProtectedRoute>
        ),
    },
    {
        path: '/products/create',
        element: (
            <ProtectedRoute>
                <ProtectedPermistion>
                    <ProductPage />
                </ProtectedPermistion>
            </ProtectedRoute>
        ),
    },
    {
        path: 'product/:id',
        element: (
            <ProtectedRoute>
                <ProtectedPermistion>
                    <EditProductPage />
                </ProtectedPermistion>
            </ProtectedRoute>
        ),
    },

    // USER
    {
        path: '/users/profile',
        element: (
            <ProtectedRoute>
                <ProtectedPermistion>
                    <Profile />
                </ProtectedPermistion>
            </ProtectedRoute>
        ),
    },
    {
        path: '/users/user-account-settings',
        element: (
            <ProtectedRoute>
                <ProtectedPermistion>
                    <AccountSetting />
                </ProtectedPermistion>
            </ProtectedRoute>
        ),
    },
    // USER

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
]

export { routes }
