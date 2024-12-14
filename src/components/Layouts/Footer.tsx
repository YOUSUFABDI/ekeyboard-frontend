const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black text-white py-5 px-6 absolute bottom-0 left-0 right-0">
            <div className="container mx-auto text-center">
                {/* Logo or Title */}
                <h3 className="text-3xl font-bold text-indigo-500 mb-4">My Awesome Company</h3>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-400">We provide exceptional products and services. Let us know how we can help you achieve your goals.</p>

                {/* Copyright */}
                <div className="text-sm text-gray-400">
                    <p>&copy; 2024 My Awesome Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
