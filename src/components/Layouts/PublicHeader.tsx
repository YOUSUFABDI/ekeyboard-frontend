import { Link } from 'react-router-dom'
import IconShoppingCart from '../Icon/IconShoppingCart'
import IconUser from '../Icon/IconUser'

const PublicHeader = () => {
    return (
        <header className="flex item-center justify-between">
            <div>
                <span>Ekeyboard</span>
            </div>

            <div>
                <Link to={'#'}>Home</Link>
                <Link to={'#'}>Product</Link>
                <Link to={'#'}>About us</Link>
                <Link to={'#'}>Contact us</Link>
            </div>

            <div>
                <button>
                    <IconShoppingCart />
                </button>
                <button>
                    <IconUser />
                </button>
            </div>
        </header>
    )
}

export default PublicHeader
