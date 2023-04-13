import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice
}) {
    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    async function saveProduct(e) {
        e.preventDefault()
        const data = {title, description, price}

        if (_id) {
            await axios.put('/api/products', {...data,_id})
        } else {
            await axios.post('/api/products', data)
        }

        setGoToProducts(true)
    }

    if (goToProducts) {
        router.push('/products')
    }

    return (
        <form onSubmit={saveProduct}>
            <label >Product name</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product name"/>
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
            <label>Price (in EUR)</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price"></input>
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}