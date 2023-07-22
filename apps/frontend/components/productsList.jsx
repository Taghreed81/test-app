import Image from "next/image"
import Link from "next/link"
import { HiPencilAlt } from 'react-icons/hi'
import RemoveBtn from "./RemoveBtn"

export function ProductsList ({products})  {
  return (
    <>
    <div className="grid gap-16 grid-cols-fluid ">
      {products.map((product) => (
        <div
          className="flex flex-col justify-between items-center my-12 px-6 border border-slate-300"
          key={product.id}
        >
          <h2 className="text-2xl font-bold py-6">{product.title}</h2>
         
           <Image
            src={`${product.imageUrl}`}
            priority 
            width={1200}
            height={1200}
            className="my-12"
            alt="" 
          /> 
           <p className="mb-6">{product.description}</p>

          <div className="flex gap-2 mb-4">
          <RemoveBtn id ={`${product.id}`}/>
       <Link href={`${product.id}`}>
        <HiPencilAlt size={24}/>
       </Link>
       </div>
        </div>
      ))}
      </div>
    </>
  )
}

export default ProductsList