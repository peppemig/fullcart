import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect()

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({_id: req.query.id}))
        } else {
            res.json(await Product.find())
        }
    }

    if (method === 'POST') {
        const {title, description, price, images, category} = req.body

        const product = await Product.create({
            title: title,
            description: description,
            price: price,
            images: images,
            category: category
        })
        res.json(product)
    }

    if (method === 'PUT') {
        const {title, description, price, images, _id, category} = req.body

        await Product.updateOne({_id:_id}, {
            title:title, 
            description:description, 
            price:price, 
            images:images,
            category: category
        })
        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }

}