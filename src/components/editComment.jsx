import { Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UseToken } from "../helpers/useToken";
import { useNavigate } from "react-router";
import ModalLayout from "./layout/modalLayout";

export default function EditComment({open, onClose, commentId}){
    const baseUrl = import.meta.env.VITE_API_URL;
    const [data, setData] = useState()
    const navigate = useNavigate()

    console.log(data)

    const {
        register,
        handleSubmit,
        setValue
    } = useForm()

    setValue("comment", data?.comment || 'loading...')

    async function fetchCommentData() {
        const res = await axios.get(`${baseUrl}/api/comment/${commentId}`,{
            headers: {
            Authorization: `Bearer ${UseToken()}`
            }
        })
        setData(res.data.content)
    }

    useEffect(()=>{
        fetchCommentData()
    },[])

    async function onSubmit(data) {
        const res = await axios.put(`${baseUrl}/api/comment/${commentId}`,{
            comment: data.comment,
        },{
            headers: {
                Authorization: `Bearer ${UseToken()}`
            }
        })

        navigate(0)
    }

    return(
        <ModalLayout open={open} onClose={onClose} content={
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div>
                    <label className="block text-sm text-gray-400">Comment</label>
                    <input className="w-96 px-3 py-2 rounded-md bg-light-gray text-white focus:outline-none" type="text" {...register("comment")} />    
                </div>
                <button className="w-full px-3 py-2 rounded-md bg-light-gray mt-10 hover:bg-accent-light-gray transition-all duration-150" type="submit">submit</button>
            </form>    
        }/>
    )

}