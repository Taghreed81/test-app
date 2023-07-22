'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAnalytics,  isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { firebaseConfig} from '../app/addProduct/firebase';



const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export default function EditProductForm ({product}) {

    const [updateForm, setUpdateForm ] = useState(product)
    const [file, setFile] = useState("");
    const router = useRouter()

    const storage = getStorage(app);


    useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
  
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setUpdateForm((updateForm) =>({...updateForm, imageUrl: downloadURL}))
  
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleUpdate = (e) => {  
    const { name, value } = e.target;
      setUpdateForm((updateForm) => ({
        ...updateForm,
        [name]: value,
      }));    
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateForm.price = Number(updateForm.price);
        JSON.stringify(updateForm.imageUrl)

        try {
            const  res =  await fetch(`http://localhost:3000/api/products/update/${product.id}`, {
              method: 'PATCH',
              headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateForm )
              });
              if(!res.ok) {
                throw new Error('Failed to update Product')
              } 
              router.push('/products')              
    
        } catch (err) {
            console.log(err)   
        }      
      };  
    
 
    return (
        <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">Update Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={updateForm.title}
              onChange={handleUpdate}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={updateForm.description}
              onChange={handleUpdate}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              required
              value={updateForm.price}
              onChange={handleUpdate}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
          <div className="left">
          {!product?.imageUrl ? <div>Loading...</div> :
            <Image  src={  file
              ? URL.createObjectURL(file)
              : `${product?.imageUrl}`}
                  priority 
                  width={1200}
                  height={1200}
                  className="my-12"
                  alt="" />}
            </div>
            <label htmlFor="image" className="block mb-2">
              Image:
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="focus:outline-none"
            />
  
          </div>
          <button
            type="submit"
            className="px-4 py-2 mb-8 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Update Product
          </button>
        </form>
      </div>
    )
}