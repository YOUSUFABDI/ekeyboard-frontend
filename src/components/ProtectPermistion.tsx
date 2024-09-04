import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectedPermistionPropsDT = React.PropsWithChildren

const ProtectedPermistion = ({ children }: ProtectedPermistionPropsDT) => {
    const role = localStorage.getItem('role')
    const navigate = useNavigate()

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/not-allowed', { replace: true })
        }
    }, [navigate, role])

    return children
}

export default ProtectedPermistion
