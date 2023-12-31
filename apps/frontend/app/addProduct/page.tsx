'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { CreateProductDto } from '@test-app/dtos';
import { initializeApp } from "firebase/app";
import { getAnalytics,  isSupported } from "firebase/analytics";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseConfig} from './firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);


type CreateProductFE = CreateProductDto | {
    title:''
    description:'',
    price:0,
    imageUrl:'',
}

export default function AddProduct () {

    const initialValues:CreateProductFE={
        title:'',
        description:'',
        price:0,
        imageUrl:'',
    }

  const [form, setForm] = useState<CreateProductFE>(initialValues)
  const [file, setFile] = useState("");
  const router = useRouter();


  const storage = getStorage(app);

  useEffect(() => {
  const uploadFile = () => {
    const name = new Date().getTime() + file.name;

    console.log(name);
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
          setForm((form) =>({...form, imageUrl: downloadURL}))

        });
      }
    );
  };
  file && uploadFile();
}, [file]);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.price = Number(form.price);
    JSON.stringify(form.imageUrl)

    fetch('http://localhost:3000/api/products/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'application/json',
},
    body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((data) => {
        router.push('/products')

      })
      .catch((error) => {
        console.error(error);
      });
  };  


  const handleUpdate = (e: any) => {  
    const { name, value } = e.target;
      setForm((form) => ({
        ...form,
        [name]: value,
      }));    
}

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Add Product</h1>
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
            value={form.title}
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
            value={form.description}
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
            value={form.price}
            onChange={handleUpdate}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
        <div className="left">
            <img
               src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
             
              alt=""
            />
          </div>
          <label htmlFor="image" className="block mb-2">
            Image:
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            required
            onChange={(e: any) => setFile(e.target.files[0])}
            className="focus:outline-none"
          />

        </div>
        <button
          type="submit"
          className="px-4 py-2 mb-8 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};
