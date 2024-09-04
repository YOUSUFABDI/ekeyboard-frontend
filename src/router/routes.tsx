import { lazy } from 'react'
import AccountSetting from '../pages/Users/AccountSetting'
import NotAllowed from '../pages/NotAllowed'
const Login = lazy(() => import('../components/Login'))
const Products = lazy(() => import('../pages/Products/Products'))
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'))
const Index = lazy(() => import('../pages/Index'))
const Profile = lazy(() => import('../pages/Users/Profile'))
const Error = lazy(() => import('../components/Error'))
const ProtectedPermistion = lazy(() => import('../components/ProtectPermistion'))

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
