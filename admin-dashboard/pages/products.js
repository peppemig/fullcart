import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"

export default function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        })
    }, [])

    return (
        <Layout>
            <Link href={'/products/new'} className="btn-primary">Add new product</Link>

            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Product name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td className="flex gap-2">
                                    <Link href={'/products/edit/'+product._id} className="flex w-fit py-1 px-2 rounded-md bg-blue-900 items-center justify-center gap-1 hover:bg-blue-400 transition cursor-pointer">
                                        <AiFillEdit color="white"/>
                                        <div className="text-white text-sm">Edit</div>
                                    </Link>
                                    <Link href={'/products/delete/'+product._id} className="flex w-fit py-1 px-2 rounded-md bg-red-500 items-center justify-center gap-1 hover:bg-red-300 transition cursor-pointer">
                                        <AiFillDelete color="white"/>
                                        <div className="text-white text-sm">Delete</div>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Layout>
    )
}