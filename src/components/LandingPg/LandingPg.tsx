import { Link } from 'react-router-dom'

const LandingPg = () => {
    return (
        <main className="w-full">
            <section className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 mt-6 lg:mt-0">
                    <div>
                        <span className="text-4xl font-bold">Product Collection</span>
                        <p className="text-xl mt-4 w-full lg:w-[609px]">
                            Welcome to our online shop, where we invite you to embark on a thrilling journey of discovery. we've curated an extensive collection of keyboards, and more to help you find
                            your new favorites.
                        </p>
                    </div>
                    <Link to={'/products'} className="btn btn-primary mt-6 w-fit">
                        Shop Now
                    </Link>
                </div>
                <div className="flex-1 mt-16 ">
                    <img className="object-cover rounded-lg w-full" src="https://cdn.thewirecutter.com/wp-content/media/2024/04/mechanicalkeyboards-2048px-1361.jpg" alt="" />
                </div>
            </section>
        </main>
    )
}

export default LandingPg
