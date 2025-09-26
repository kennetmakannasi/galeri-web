import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { SessionData } from '../components/layout/mainLayout';
import { UseToken } from '../helpers/useToken';
import { Icon } from '@iconify/react/dist/iconify.js';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
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

    await toast.promise(
      axios.post(`${baseUrl}/api/users/editus`, payload,{
        headers: {
          Authorization: 
            `Bearer ${UseToken()}`,
            'Content-Type': 'multipart/form-data'
        }
      }),
      {
        loading: 'Saving Changes...',
        success: <b>Success!</b>,
      } ,
      {
          loading:{
              style: {
                  borderRadius: '10px',
                  background: '#2E2E2E',
                  color: '#fff',
              },
          },
          success:{
              style:{
                  borderRadius: '10px',
                  background: '#2E2E2E',
                  color: '#fff',
              }
          },
      }
    ) 

    navigate(0)

    console.log(payload)
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
      <div className="w-full h-full relative mb-22">
        {data?.profile_banner ? (
          <div className='relative h-72 w-full'>
            <div className='inset-0 size-full bg-black/30 absolute rounded-4xl flex items-center justify-center'>
              <div className='bg-black/40 p-3 rounded-full'>
                <Icon icon="mdi:upload" height={40} />  
              </div>
            </div>
            <input className='absolute size-full opacity-0' type="file" {...register("profile_banner")} />
            <img
              src={previewProfileBanner || baseUrl + data?.profile_banner}
              alt="hero"
              className="w-full h-72 mt-8 object-cover rounded-4xl"
            /> 
          </div>
  
        ):(
          <div className="w-full h-72 mt-8 bg-dark-gray rounded-4xl animate-pulse">
          </div>
        )}
        <div className='absolute -bottom-18 ml-3'>
          <div className="relative">
            {data ? (
              <div className="w-40 h-40 rounded-full relative border-4 border-black overflow-hidden">
                <div className='inset-0 bg-black/30 size-full absolute flex items-center justify-center'>
                  <div className='bg-black/40 p-3 rounded-full'>
                    <Icon icon="mdi:upload" height={40} />  
                  </div>
                </div>
                <input {...register("profile_picture")} className='size-full absolute opacity-0' type="file" />
                <img
                  src={previewProfilePicture || baseUrl + data?.profile_picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>  
            ):(
              <div className="w-40 h-40 rounded-full relative border-4 border-black overflow-hidden bg-dark-gray animate-pulse"></div>
            )}

          </div> 
        </div>
      </div>
      {data ? (
        <div>
          <h1 className="text-xl font-semibold max-w-72">{data?.name}</h1>
          <p className="text-text-gray text-sm">{'@'+data?.username}</p>  
        </div>
      ):(
        <div>
          <div className="h-5 w-36 bg-dark-gray rounded-md animate-pulse"></div>
          <div className="h-4 w-20 bg-dark-gray rounded-md animate-pulse mt-2"></div>
        </div>
      )}

      <div className="mx-auto w-full h-[2px] bg-bright-yellow mt-6"></div>

      <div className='mt-16'>
          <h2 className="text-lg font-medium text-white mb-4 mt-4">Name</h2>
            <div>
              <input
                type="text"
                {...register("name",{required:true})}
                className="bg-dark-gray text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
            </div>
          <div>
            <h2 className="text-lg font-medium text-white my-4">Username</h2>
            <div 
            >
              <input
                type="text"
                {...register("username",{required:true})}
                className="bg-dark-gray text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
            </div>
            <h2 className="text-lg font-medium text-white mb-4 mt-4">Bio</h2>
            <div>
              <input
                type="text"
                {...register("bio",{required:false})}
                className="bg-dark-gray text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 text-white bg-dark-gray rounded-lg hover:bg-accent-dark-gray transition-all duration-150"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white bg-dark-gray rounded-lg hover:bg-accent-dark-gray transition-all duration-150"
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