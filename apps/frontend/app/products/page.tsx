'use client'

import { useState, useEffect } from 'react';
import ProductsList from "../../components/productsList"
import Link from 'next/link';

export default function Products() {
    const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/all', {
        headers: {
                  Authorization: 'Bearer' + localStorage.getItem('access_token')
        },
      });
      if (response.ok) {
        const products: [] = await response.json();
        setData(products);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
        <div>
            <div className='flex flex-auto justify-end px-8 py-8'>
                
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'><Link href='/addProduct'>Add Product</Link></button>
            </div>
            {data && <ProductsList products={data} />}
        </div>
  )
}