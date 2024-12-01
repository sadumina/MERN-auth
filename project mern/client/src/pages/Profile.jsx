import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef,useEffect} from 'react';
import {getDownloadURL, getStorage, uploadBytesResumable} from 'firebase/storage';
import { app} from '../firebase'
import { ref } from 'firebase/storage';


export default function Profile() {
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const [imagePrecent, setImagePrecent] = useState(0);
  const [imageError , setImagerError] = useState(false);
  const [formData , setFormData] = useState({});
  console.log(formData);
  const {currentUser} =useSelector((state) =>state.user);
  useEffect(()=>{
      if(image){
        handleFileUpload(image);
      }

      },[image]

  )
  const handleFileUpload = async (image) => {

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePrecent(progress);
      }


    );
    (error) => {
      setImagerError(true);
    }
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) => {
          setFormData({
            ...formData,profilePicture : downloadURL
          });
        }
      )
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='text-3xl font- text-center my-7'>Profile</h1>
       <form className='flex flex-col gap-4'>
        <input type = "file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setImage(e.target.files[0])}/>
         <img
            src={currentUser.profilePicture}
            alt='profile'
            className='h-24 w-24 self-center cursor-pointer rounded-full object-cover'
            onClick={() => fileRef.current.click()}
            />
            <p className='text-sm self-center'>
              {imageError ? (
                <span className='text-red-700'>Error uploading image </span>) 
                : imagePrecent > 0 && imagePrecent < 100 ? (
                  <span className='text-slate-700'>{`Uploading : ${imagePrecent} %`}
                  </span>) : imagePrecent === 100 ? (
                    <span className='text-green-700'>Image upload Sucesfully</span> 
                  ):(
                   ''
                  )
                      
              }
              
            </p>
            <input defaultValue={currentUser.username} type = "text" id ='username' 
            placeholder='UserName' className='bg-slate-100 rounded-lg p-3'
            />
            <input defaultValue={currentUser.email}  type = "email" id ='email' 
            placeholder='Email' className='bg-slate-100 rounded-lg p-3'
            />
            <input type = "password" id ='password' 
            placeholder='Password' className='bg-slate-100 rounded-lg p-3'
            />
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase 
            hover:opacity-95 disabled:opacity-85'>
                  Update
            </button>
       </form>
       <div className='flex justify-between mt-5'>
           <span className='text-red-700 cursor-pointer'>Delete Account</span>
           <span className='text-red-700 cursor-pointer'>Sign Out</span>

       </div>
    </div>
  )
}
