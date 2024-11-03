import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectAdminPropsDT = React.PropsWithChildren

const ProtectAdmin = ({ children }: ProtectAdminPropsDT) => {
    const role = localStorage.getItem('role')
    const navigate = useNavigate()

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/not-allowed', { replace: true })
        }
    }, [navigate, role])

    return children
}

export default ProtectAdmin
