import React from 'react'
import PublicHeader from '../Layouts/PublicHeader'
import Footer from './Footer'

interface PublicLayoutProps {
    children: React.ReactNode
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <div className="">
            <PublicHeader />
            <main className="w-full lg:container px-5 mx-auto mt-16 pb-60">{children}</main>
            <Footer />
        </div>
    )
}

export default PublicLayout
