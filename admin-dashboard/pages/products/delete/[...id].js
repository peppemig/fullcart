import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios"
import ProductForm from "@/components/ProductForm";

export default function DeleteProductPage() {
    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter()
    const {id} = router.query

    function goBack() {
        router.push('/products')
    }

    async function deleteProduct() {
        await axios.delete('/api/products?id='+id)
        goBack()
    }

    useEffect(() => {
        if (!id) {return}
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data)
        })
    }, [id])

    return (
        <Layout>
            {
                productInfo && (
                    <>
                    <div className="flex flex-col gap-2 mb-5 text-center">
                        <h1 className="mb-2">Do you really want to delete this product?</h1>
                        <p>Title: {productInfo.title}</p>
                        <p>Description: {productInfo.description}</p>
                        <p>Price: {productInfo.price}</p>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <div onClick={deleteProduct} className="bg-red-500 text-white px-2 py-1 font-semibold rounded-md cursor-pointer">Yes, delete</div>
                        <div onClick={goBack} className="bg-blue-900 text-white px-2 py-1 font-semibold rounded-md cursor-pointer">No, go back to products</div>
                    </div>
                    </>
                )
            }
        </Layout>
    )
}