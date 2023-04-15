import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req,res) {
    const {method} = req
    await mongooseConnect()

    if (method === 'POST') {
        const {name, parentCategory} = req.body

        const categoryDoc = await Category.create({name: name, parent: parentCategory})
        res.json(categoryDoc)
    }

    if (method === 'GET') {
        const categories = await Category.find().populate('parent')
        res.json(categories)
    }

    if (method === 'PUT') {
        const {name, parentCategory, _id} = req.body

        if (parentCategory === 'No parent category') {
            const categoryDoc = await Category.updateOne({_id:_id}, {name:name})
            const unsetParent = await Category.updateOne({_id:_id}, {$unset: {parent: 1}})
            res.json(unsetParent)
        } else {
            const categoryDoc = await Category.updateOne({_id:_id},{name: name, parent: parentCategory})
            res.json(categoryDoc)
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Category.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }
}