import React from 'react'
import PublicHeader from '../Layouts/PublicHeader'

interface PublicLayoutProps {
    children: React.ReactNode
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <div className="">
            <PublicHeader />
            <main className="px-5 mt-5">{children}</main>
        </div>
    )
}

export default PublicLayout
