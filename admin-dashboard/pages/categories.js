import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios"
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import Link from "next/link";

export default function Categories() {
    const [editedCategory, setEditedCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [properties, setProperties] = useState([])
    const [parentCategory, setParentCategory] = useState('')
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

        if (editedCategory) {
            
            if (parentCategory === '') {
                console.log('senza parent')
                await axios.put('/api/categories', {
                    name: name, 
                    _id: editedCategory._id, 
                    properties: properties.map(p => ({
                        name:p.name,
                        values:p.values.split(',')
                    }))
                })
            } else {
                console.log('con parent')
                await axios.put('/api/categories', {
                    name: name, 
                    parentCategory: parentCategory, 
                    _id: editedCategory._id,
                    properties: properties.map(p => ({
                        name:p.name,
                        values:p.values.split(',')
                    }))
                });
            }
            setEditedCategory(null)

        } else {

            if (parentCategory === '') {
                console.log('senza parent')
                await axios.post('/api/categories', {
                    name: name,
                    properties: properties.map(p => ({
                        name:p.name,
                        values:p.values.split(',')
                    }))
                });
            } else {
                console.log('con parent')
                await axios.post('/api/categories', {
                    name: name, 
                    parentCategory: parentCategory,
                    properties: properties.map(p => ({
                        name:p.name,
                        values:p.values.split(',')
                    }))
                });
            }

        }

        setName('')
        setParentCategory('')
        setProperties([])
        fetchCategories()
    }

    async function deleteCategory(id) {
        await axios.delete('/api/categories?id='+id)
        fetchCategories()
    }

    function addProperty() {
        setProperties(prev => {
            return [...prev, {name:'', values: ''}]
        })
    }

    function editCategory(cat){
        setEditedCategory(cat)
        setName(cat.name)
        {cat.parent?._id === undefined ? setParentCategory('') : setParentCategory(cat.parent?._id)}
        setProperties(cat.properties)
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        })
    }

    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties
        })
    }

    function removeProperty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            })
        })
    }


    return (
        <Layout>
            <div className="flex flex-col">

                <h1 className="mb-2">Categories</h1>

                <label>{editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}</label>
                
                <form onSubmit={saveCategory}>

                    <div className="flex items-center gap-2">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Category name"/>
                        <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                            <option className="border-2" value={null}>No parent category</option>
                            {categories.length > 0 &&
                                categories.map(cat => (
                                    <option key={cat._id} value={cat._id} className="border-2">{cat.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                        <label>Properties</label>
                        <button
                            onClick={addProperty} 
                            type="button" 
                            className="flex btn-secondary w-fit">Add new property</button>

                        {properties.length > 0 && properties.map((property, index) => (
                            <div key={index} className="flex gap-2 items-center">

                                <input 
                                    type="text" 
                                    key={index+'name'} 
                                    value={property.name} 
                                    onChange={ev => handlePropertyNameChange(index, property, ev.target.value)} 
                                    placeholder="Property name (example: color)"/>

                                <input 
                                    type="text" 
                                    key={index+'values'} 
                                    value={property.values}  
                                    onChange={ev => handlePropertyValuesChange(index, property, ev.target.value)} 
                                    placeholder="Property value (example: red)"/>

                                <button
                                    type="button"
                                    onClick={() => removeProperty(index)} 
                                    className="bg-red-500 mb-2 text-white text-sm py-2 px-1 rounded-md hover:bg-red-300 transition cursor-pointer font-semibold">
                                        Remove
                                    </button>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="btn-primary mr-2">Save</button>

                    {editedCategory && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setName('');
                                setParentCategory('');
                                setProperties([])
                            }}
                        >Cancel</button>
                    )}
                </form>
                    
            </div>
            
            {!editedCategory && (
                <table className="basic mt-2">
                    <thead>
                        <tr>
                            <td>Category name</td>
                            <td>Parent category</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 &&
                            categories.map(cat => (
                                <tr key={cat._id}>
                                    <td>{cat.name}</td>
                                    <td>{cat.parent?.name}</td>
                                    <td className="flex gap-2">

                                        <button onClick={() => editCategory(cat)} className="flex w-fit py-1 px-2 rounded-md bg-blue-900 items-center justify-center gap-1 hover:bg-blue-400 transition cursor-pointer">
                                            <AiFillEdit color="white"/>
                                            <div className="text-white text-sm">Edit</div>
                                        </button>

                                        <button onClick={() => deleteCategory(cat._id)} className="flex w-fit py-1 px-2 rounded-md bg-red-500 items-center justify-center gap-1 hover:bg-red-300 transition cursor-pointer">
                                            <AiFillDelete color="white"/>
                                            <div className="text-white text-sm">Delete</div>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </Layout>
    )
}