import { useNavigate } from "react-router";
import axios from "axios"
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

export default function Register(){
    const {register, handleSubmit, formState: { errors }}= useForm();
    const navigate = useNavigate()

    async function onSubmit(data) {
        try{
            const res = await axios.post("http://127.0.0.1:8000/api/auth/register", 
            {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password
            } ,{
                headers:{
                'Content-Type': 'application/json'
                }
            },

            ) 
            const token = res.data.content
            Cookies.set('token', token, {expires:7})
            navigate('/')
        }catch(error){
            console.error(error)
        }     
    }

    return(
        <div className="mx-10 w-full">
                <h2 className="text-center text-4xl mb-12">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Name</label>
                        </div>
                        <div>
                            <input type="username" {...register("name", { required: true })} name="name" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/> 
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Username</label>
                        </div>
                        <div>
                            <input type="username" {...register("username", { required: true })} name="username" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/> 
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Email address</label>
                        </div>
                        <div>
                            <input type="email" {...register("email", { required: true })} name="email" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/> 
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm">Password</label>
                        </div>
                        <div>
                            <input type="password" {...register("password", { required: true })} name="password" className="bg-white text-black w-full rounded-2xl p-3"/>    
                        </div>
                        <div>
                            <button type="submit" className="bg-bright-yellow w-full mt-7 p-3 rounded-2xl " >Submit</button>
                        </div>
                    </form>
        </div>
    )
}