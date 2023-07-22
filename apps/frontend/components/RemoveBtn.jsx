'use client'
import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"

export default function REmoveBtn ({id}) {

    const router = useRouter()

    const removeProduct = async () => {
        const confirmd = confirm('Are you sure you want to delete it?')

        if(confirmd) {
           const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            method: 'DELETE'         
         });
         //this stil not working
         if(res.ok) {
         router.reload();
         }
        }
    }
    return (
        <button onClick={removeProduct} className="text-red-400 s">
            <HiOutlineTrash size={24}/>
        </button>
    )
}