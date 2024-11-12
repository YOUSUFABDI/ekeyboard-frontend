import React from 'react'
import PublicHeader from '../Layouts/PublicHeader'

interface PublicLayoutProps {
    children: React.ReactNode
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <div className="">
            <PublicHeader />
            <main className=" w-[1440px] mx-auto">{children}</main>
        </div>
    )
}

export default PublicLayout
