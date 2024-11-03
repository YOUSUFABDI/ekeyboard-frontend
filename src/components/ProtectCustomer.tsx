import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectCustomerPropsDT = React.PropsWithChildren

const ProtectCustomer = ({ children }: ProtectCustomerPropsDT) => {
    const role = localStorage.getItem('role')
    const navigate = useNavigate()

    useEffect(() => {
        if (role !== 'user') {
            navigate('/not-allowed', { replace: true })
        }
    }, [navigate, role])

    return children
}

export default ProtectCustomer
