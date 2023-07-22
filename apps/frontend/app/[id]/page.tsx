'use client'
import { CreateProductDto } from "@test-app/dtos";
import EditProductForm from "apps/frontend/components/EditProductForm";
import Image from "next/image";
import { useEffect, useState } from "react";

const getProductById = async (id: any) => {
    try {
        const  res =  await fetch(`http://localhost:3000/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            cache: 'no-store',
            method: 'UPDATE'
          });
          if(!res.ok) {
            throw new Error('Failed to fetch Product')
          }
          return res.json();

    } catch (err) {
        console.log(err)

    }
}


export default function ProductDetails ({params}: { params: { id: string } }) {
    const {id} = params;
    const [product, setProduct] = useState<CreateProductDto>();

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
   const res =  await fetch(`http://localhost:3000/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            cache: 'no-store'
          });
          const  data = await res.json();
          setProduct(data)
        }

    return (
        <div>
            {/* <h1>Product Details</h1>
            <h2>{product?.title}</h2>
            <div>{product?.description}</div>
            <div>{product?.price}</div>
           {!product?.imageUrl ? <div>Loading...</div> :
            <Image  src={`${product?.imageUrl}`}
            priority 
            width={1200}
            height={1200}
            className="my-12"
            alt="" />} */}

{product && <EditProductForm product = {product}/>}

        </div>
    )
}