import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";

export default function UploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {register, handleSubmit, watch}= useForm();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  async function onSubmit(data) { 
    try{
      const payload = {
        "title": data.title,
        "description": data.description,
        "image_url": data.image_url[0]
      }

      const res = await axios.post('http://127.0.0.1:8000/api/post', payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(payload)
      navigate(0)
    }catch(error){
      console.error(error)
    }
    
  }

  const img = watch("image_url");
  const file = img?  img[0] : null
  const previewImg = file? URL.createObjectURL(file) : null

  return (
    <>
      {/* Tombol buka modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex"
      >
        <Icon height={20} icon={'basil:add-outline'}/>
        <div className="relative">
            <p className='ml-3 after:absolute after:h-0.5 after:bottom-0 after:w-0 after:left-0 after:bg-white after:ml-3 hover:after:w-full after:duration-150 after:transition-all'>Add Post</p>
        </div>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 px-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-[#1e1e1e] p-6 rounded-2xl w-[700px] flex gap-6 text-white">
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" method="post" onSubmit={handleSubmit(onSubmit)}>
                  {/* Upload Box */}
                  <div className="bg-[#2c2c2c] rounded-2xl p-6 flex flex-col items-center justify-center w-full border border-gray-700">
                    <Icon icon="mdi:upload" className="text-4xl mb-3" />
                    <p className="text-center text-lg mb-2">
                      Select a file or drag <br /> and drop it here
                    </p>
                    <img src={previewImg || 'no'} alt="" />
                    <input className="opacity-0" type="file" name="" id="" {...register("image_url")}/>
                    <p className="text-xs text-gray-400 text-center">
                      It is recommended to use high-quality .jpg files less than 20 MB
                      in size or .mp4 files less than 200 MB in size.
                    </p>
                    <div className="border-b border-gray-600 my-4 w-full"></div>
                    <button type="submit" className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-500 transition">
                      Post
                    </button>
                  </div>

                  {/* Input Title & Caption */}
                  <div className="bg-[#2c2c2c] rounded-2xl p-6 flex flex-col gap-4 w-full">
                    <div>
                      <label className="block text-sm text-gray-400">Title</label>
                      <input
                        type="text"
                        {...register("title")}
                        placeholder="Add Title"
                        className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400">Caption</label>
                      <textarea
                        {...register("description")}
                        placeholder="Add caption"
                        className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none"
                      ></textarea>
                    </div>
                  </div>  
                </form>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
