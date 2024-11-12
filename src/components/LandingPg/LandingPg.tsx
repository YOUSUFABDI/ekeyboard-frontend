const LandingPg = () => {
    return (
        <main className="">
            <section className="flex items-center justify-between">
                <div className="flex-1">
                    <div>
                        <span className="text-4xl font-bold">Product Collection</span>
                        <p className="text-xl mt-4 w-[609px]">
                            Welcome to our online fashion haven, where we invite you to embark on a thrilling journey of discovery. We understand that fashion is an expression of your unique
                            personality, and we've curated an extensive collection of dresses, shoes, and more to help you find your new favorites.
                        </p>
                    </div>
                    <button type="button" className="btn btn-primary mt-6">
                        Shop Now
                    </button>
                </div>
                <div className="flex-1 mt-16">
                    <img className="object-cover rounded-lg" src="https://media.wired.com/photos/638a55ca7c1b7d0edd58fde5/master/pass/MacTigr-Das-Keyboard-Gear.jpg" alt="" />
                </div>
            </section>
        </main>
    )
}

export default LandingPg
