import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {PulseLoader} from "react-spinners"

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages
}) {
    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || [])
    const [goToProducts, setGoToProducts] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()

    async function saveProduct(e) {
        e.preventDefault()
        const data = {title, description, price, images}

        if (_id) {
            await axios.put('/api/products', {...data,_id})
        } else {
            await axios.post('/api/products', data)
        }

        setGoToProducts(true)
    }

    async function uploadImages(e) {
        const files = e.target?.files
        if(files?.length > 0) {
            setIsUploading(true)

            const data = new FormData()
            for (const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data]
            })

            setIsUploading(false)
        }
    }

    if (goToProducts) {
        router.push('/products')
    }

    return (
        <form onSubmit={saveProduct}>

            <label >Product name</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product name"/>

            <label>Images</label>
            <div className="mb-2 flex gap-1 items-center">

                {images?.length > 0 && images.map(link => (
                    <div className="border-2 rounded-md overflow-hidden" key={link}>
                        <Image src={link} height={100} width={100} alt="product image"/>
                    </div>
                ))}

                {isUploading && (
                    <div className="w-24 h-24 flex items-center justify-center border-2 rounded-md">
                        <PulseLoader size={8} color="#12195c"/>
                    </div>
                )}

                <label className="w-24 h-24 bg-gray-200 hover:bg-gray-100 transition flex rounded-md items-center justify-center cursor-pointer">
                    <AiOutlinePlusCircle size={30} className="text-gray-700"/>
                    <input type="file" onChange={uploadImages} className="hidden"/>
                </label>
            </div>

            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>

            <label>Price (in EUR)</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price"></input>
            
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}