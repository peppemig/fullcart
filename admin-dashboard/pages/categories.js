import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios"
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import Link from "next/link";

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        axios.get('/api/categories').then(response => {
            setCategories(response.data)
        })
    }

    async function saveCategory(e) {
        e.preventDefault()
        await axios.post('/api/categories', {name});
        setName('')
        fetchCategories()
    }

    return (
        <Layout>
            <div className="flex flex-col">

                <h1 className="mb-2">Categories</h1>
                <label>New category name</label>
                <form onSubmit={saveCategory} className="flex items-center gap-2">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="mb-0" type="text" placeholder="category name"/>
                    <button type="submit" className="btn-primary">Save</button>
                </form>
                    
            </div>

            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(cat => (
                            <tr key={cat._id}>
                                <td>{cat.name}</td>
                                <td className="flex gap-2">
                                    <Link href={'/products/edit/'+cat._id} className="flex w-fit py-1 px-2 rounded-md bg-blue-900 items-center justify-center gap-1 hover:bg-blue-400 transition cursor-pointer">
                                        <AiFillEdit color="white"/>
                                        <div className="text-white text-sm">Edit</div>
                                    </Link>
                                    <Link href={'/products/delete/'+cat._id} className="flex w-fit py-1 px-2 rounded-md bg-red-500 items-center justify-center gap-1 hover:bg-red-300 transition cursor-pointer">
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