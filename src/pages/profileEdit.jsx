import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { SessionData } from '../components/layout/mainLayout';

const EditProfile = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const data = useContext(SessionData);
  const {register, handleSubmit , setValue , watch} = useForm()

  setValue("name", data?.name || '...')
  setValue("username", data?.username || '...')
  setValue("bio", data?.bio || '')

  async function onSubmit(data) {
    const payload = {
      name: data.name,
      username: data.username,
      bio: data.bio,
      profile_picture: data.profile_picture[0],
      profile_banner: data.profile_banner[0]
    }

    await axios.post("http://127.0.0.1:8000/api/users/editus", payload,{
      headers: {
        Authorization: 
          `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
    })

    navigate(0)
  }

  const proPicImg = watch("profile_picture");
  const proPicFile = proPicImg?  proPicImg[0] : null
  const previewProfilePicture = proPicFile? URL.createObjectURL(proPicFile) : null

  const proBannerImg = watch("profile_banner");
  const proBannerFile = proBannerImg?  proBannerImg[0] : null
  const previewProfileBanner = proBannerFile? URL.createObjectURL(proBannerFile) : null

  return (
    <div className="min-h-screen text-white px-4 md:px-12"> {/* Hapus bg-gray-900 */}
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header Cover - Samakan dengan SelfProfile */}
      <div className="relative">
        {data?.profile_banner ? (
          <div className='relative h-80 w-full'>
            <input className='absolute size-full opacity-0' type="file" {...register("profile_banner")} />
            <img
              src={previewProfileBanner || data?.profile_banner}
              alt="hero"
              className="w-full h-80 mt-15 object-cover rounded-4xl"
            /> 
          </div>
  
        ):(
          <div className="w-full h-80 mt-15 bg-dark-gray rounded-4xl">
          </div>
        )}


      {/*garis*/}
      <div className="w-full h-px bg-bright-yellow bottom-[-123px] absolute"></div>

        {/* Foto Profil - Samakan dengan SelfProfile */}
        <div className="absolute bottom-[-110px] left-18 flex flex-col items-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full relative border-4 border-black overflow-hidden">
              <input {...register("profile_picture")} className='size-full absolute opacity-0' type="file" />
              <img
                src={previewProfilePicture || data?.profile_picture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Nama & Status */}
          <div>
            <div className="flex items-center mt-5">
              <h1 className="text-xl font-semibold">{data?.username}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-151">
      </div>

      <div className="mt-38">
          <h2 className="text-lg font-medium text-white mb-4 mt-4">Name</h2>
            <div>
              <input
                type="text"
                {...register("name",{required:true})}
                className="bg-gray-800 text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
            </div>
          {/* Full Name */}
          <div>
            <h2 className="text-lg font-medium text-white my-4">Username</h2>
            <div 
            // className="grid grid-cols-2 gap-4"
            >
              <input
                type="text"
                {...register("username",{required:true})}
                className="bg-gray-800 text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
            </div>
            <h2 className="text-lg font-medium text-white mb-4 mt-4">Bio</h2>
            <div>
              <input
                type="text"
                {...register("bio",{required:false})}
                className="bg-gray-800 text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Save changes
            </button>
          </div>
      </div>
      </form>
    </div>
  );
};

export default EditProfile;