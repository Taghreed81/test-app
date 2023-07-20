import Image from "next/image"

export function ProductsList ({products})  {
  return (
    <>
      {products.map((product: any) => (
        <div
          className="flex flex-col justify-center items-center my-12"
          key={product.id}
        >
          <h2 className="text-lg font-bold py-6">{product.title}</h2>
          <p>{product.description}</p>

           {/* <Image
            src={`${product.imageUrl}`}
            priority 
            width={1200}
            height={1200}
            className="w-full lg:w-1/2 h-auto rounded-2xl"
            alt="firebase" 
          />  */}
       
        </div>
      ))}
    </>
  )
}

export default ProductsList