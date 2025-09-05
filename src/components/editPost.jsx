import { Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UseToken } from "../helpers/useToken";
import { useNavigate } from "react-router";

export default function EditPost({open, onClose, postId}){
    const [data, setData] = useState()
    const navigate = useNavigate()
    const baseUrl = import.meta.env.VITE_API_URL;

    const {
        register,
        handleSubmit,
        setValue
    } = useForm()

    setValue("title", data?.post?.title || 'loading...')
    setValue("description", data?.post?.description || 'loading...')

    async function fetchPostData() {
        const res = await axios.get(`${baseUrl}/api/post/${postId}`,{
            headers: {
          Authorization: `Bearer ${UseToken()}`
        }
        })
        setData(res.data.content)
    }

    useEffect(()=>{
        fetchPostData()
    },[])

    async function onSubmit(data) {
        const res = await axios.put(`${baseUrl}/api/post/${postId}`,{
            title: data.title,
            description: data.description
        },{
            headers: {
                Authorization: `Bearer ${UseToken()}`
            }
        })

        navigate(0)
    }

    return(
        <Dialog open={open} as="div" className="fixed z-60 inset-0 flex size-full justify-center items-center bg-black/50" onClose={onClose}>
            <DialogPanel
                transition 
                className="duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 flex size-full items-center "
            >
                <div className="size-full flex justify-center items-center px-4">
                    <div className="bg-dark-gray rounded-xl flex items-center justify-center">
                        <div className="w-full p-5">
                            <form onSubmit={handleSubmit(onSubmit)} action="">
                                <div>
                                    <input type="text" {...register("title")} />    
                                </div>
                                <div>
                                    <input type="text" {...register("description")} />    
                                </div>
                                <button type="submit">submit</button>
                            </form>    
                        </div>
                    </div>
                </div>
                
            </DialogPanel>
        </Dialog>   
    )

}