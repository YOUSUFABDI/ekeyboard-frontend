import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectedRoutePropsDT = React.PropsWithChildren

const ProtectedRoute = ({ children }: ProtectedRoutePropsDT) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (token === null) {
            navigate('/login', { replace: true })
        }
    }, [navigate, token])

    return children
}

export default ProtectedRoute
