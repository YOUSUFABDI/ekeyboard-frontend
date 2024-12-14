const AboutUs = () => {
    return (
        <section className="bg-gray-100 dark:bg-dark-dark-light py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold text-primary mb-6">About Us</h2>
                <p className="text-lg text-black dark:text-white mb-12">
                    We are a passionate team committed to providing the best products and services to our customers. With years of experience in the industry, we strive to create innovative solutions
                    that meet the evolving needs of the digital world.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary">Our Mission</h3>
                        <p className="text-black dark:text-white">
                            Our mission is to deliver high-quality products that enhance our customers' lives and businesses, helping them achieve their goals with ease and efficiency.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary">Our Vision</h3>
                        <p className="text-black dark:text-white">
                            Our vision is to become a global leader in the tech industry, offering cutting-edge solutions that redefine the way businesses operate and customers interact with
                            technology.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
