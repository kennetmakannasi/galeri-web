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
      profile_picture: data.profile_picture[0]
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

  return (
    <div className="min-h-screen text-white px-4 md:px-12"> {/* Hapus bg-gray-900 */}
      {/* Header Cover - Samakan dengan SelfProfile */}
      <div className="relative">
        {data?.profile_banner ? (
          <img
            src={data?.profile_banner}
            alt="hero"
            className="w-full h-80 mt-15 object-cover rounded-4xl"
          />   
        ):(
          <div className="w-full h-80 mt-15 bg-dark-gray rounded-4xl"></div>
        )}


      {/*garis*/}
      <div className="w-full h-px bg-bright-yellow bottom-[-123px] absolute"></div>

        {/* Foto Profil - Samakan dengan SelfProfile */}
        <div className="absolute bottom-[-110px] left-18 flex flex-col items-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden">
              <img
                src={data?.profile_picture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-5 w-6.5 h-6.5 bg-green-500 rounded-full border-2 border-black"></div>
          </div>

          {/* Nama & Status */}
          <div>
            <div className="flex items-center gap-2 mt-5">
              <h1 className="text-xl font-semibold">{data?.username}</h1>
              <span className="px-2 py-1 bg-green-600 text-xs rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        {/* <div className="absolute bottom-[-60px] right-0 flex ">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-800 hover:bg-gray-700 px-5 mr-2 py-2 rounded-lg text-sm font-medium transition-colors" 
          >
            Log out
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Back
          </button>
        </div> */}
      </div>

      {/*Log out*/}
      <div className="absolute bottom-151">
      </div>

      {/* Form Content - Sesuaikan margin top karena header baru */}
      <div className="mt-38">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Photo */}
          <div className="ml-8 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">Profile photo</h2>
            <div className="flex items-center gap-6">
              <img 
                src={previewProfilePicture || data?.profile_picture}
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex gap-4">
                <button 
                  type="button"
                  className="px-4 py-2 bg-gray-800 relative text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <input {...register("profile_picture")} className='w-full opacity-0 absolute' type="file" />
                  Update  
                </button>
                <button 
                  type="button"
                  className="px-4 py-2 text-red-500 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Email */}
          {/* garis */}
          <div className="w-full h-px bg-bright-yellow my-8"></div>

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
              {/* <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="Last name"
              /> */}
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
        </form>
      </div>
    </div>
  );
};

export default EditProfile;