import Link from "next/link"
import {GiShoppingBag} from "react-icons/gi"
import {AiOutlineHome} from "react-icons/ai"
import {BiCog, BiCategoryAlt} from "react-icons/bi"
import {FaClipboardList} from "react-icons/fa"
import {BsFillBoxFill} from "react-icons/bs"
import { useRouter } from "next/router"

export default function Nav() {
    const inactiveLink = "flex gap-1 items-center font-semibold text-md p-1 hover:bg-gray-200 hover:text-blue-900 transition rounded-lg"
    const activeLink = inactiveLink + " bg-white text-blue-900 rounded-lg"
    const router = useRouter()
    const {pathname} = router

    return (
        <aside className="text-white p-4">

            <Link href={'/'} className="flex flex-col items-center justify-center mb-5">
                <div className="flex items-center font-bold text-xl">
                    <GiShoppingBag size={35}/>
                    <span>Fullcart</span>   
                </div>
                <div className="font-semibold text-md">Admin Panel</div>
            </Link>

            <nav className="flex flex-col gap-2">
                <Link className={pathname === '/' ? activeLink : inactiveLink} href={'/'}>
                    <AiOutlineHome size={25}/>
                    Dashboard
                </Link>
                <Link className={pathname.includes('/products') ? activeLink : inactiveLink} href={'/products'}>
                    <BsFillBoxFill size={25}/>
                    Products
                </Link>
                <Link className={pathname.includes('/categories') ? activeLink : inactiveLink} href={'/categories'}>
                    <BiCategoryAlt size={25}/>
                    Categories
                </Link>
                <Link className={pathname.includes('/orders') ? activeLink : inactiveLink} href={'/orders'}>
                    <FaClipboardList size={25}/>
                    Orders
                </Link>
                <Link className={pathname.includes('/settings') ? activeLink : inactiveLink} href={'/settings'}>
                    <BiCog size={25}/>
                    Settings
                </Link>
            </nav>

        </aside>
    )
}