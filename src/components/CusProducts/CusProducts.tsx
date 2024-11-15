import IconPlus from '../Icon/IconPlus'
import IconSearch from '../Icon/IconSearch'

const CusProducts = () => {
    const products = [
        {
            id: 1,
            image: 'https://cdn.thewirecutter.com/wp-content/media/2024/04/mechanicalkeyboards-2048px-1361.jpg',
            title: 'CLI Based',
            description: 'Etiam sed augue ac justo tincidunt posuere. Vivamus euismod eros, nec risus malesuada.',
        },
        {
            id: 2,
            image: 'https://cdn.thewirecutter.com/wp-content/media/2024/04/mechanicalkeyboards-2048px-1361.jpg',
            title: 'Web Application',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis.',
        },
        {
            id: 3,
            image: 'https://cdn.thewirecutter.com/wp-content/media/2024/04/mechanicalkeyboards-2048px-1361.jpg',
            title: 'Cloud Computing',
            description: 'Aliquam erat volutpat. Integer vehicula est at ligula vehicula, at tincidunt sem bibendum.',
        },
    ]

    return (
        <section>
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <span>All Product Categories</span>

                    <form>
                        <div className="relative border border-white-dark/20  w-full flex">
                            <button type="submit" className="text-primary m-auto p-3 flex items-center justify-center">
                                <IconSearch />
                            </button>
                            <input
                                type="text"
                                placeholder="Let's find any keyboard in fast way"
                                className="form-input border-0 border-l rounded-none bg-white  focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] dark:shadow-[#1b2e4b] placeholder:tracking-wider focus:outline-none py-3"
                            />
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-center">
                            <div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                <div className="py-7 px-6">
                                    <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] overflow-hidden">
                                        <img src={product.image} alt="cover" className="w-full h-full object-cover" />
                                    </div>
                                    <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{product.title}</h5>
                                    <p className="text-white-dark">{product.description}</p>
                                    <button type="button" className="btn btn-primary mt-6">
                                        <IconPlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CusProducts
