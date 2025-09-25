import { useNavigate, Link } from "react-router";
import axios from "axios"
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Register(){
    const baseUrl = import.meta.env.VITE_API_URL;
    const {register, handleSubmit, formState: { errors }}= useForm();
    const navigate = useNavigate()

    async function onSubmit(data) {
        try{
            const res = await toast.promise(
                axios.post(`${baseUrl}/api/auth/register`, 
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
                ),
                {
                    loading: 'Logging In...',
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
            const token = res.data.content
            Cookies.set('token', token, {expires:7})
            navigate('/')
        }catch(error){
            toast.error("Unknown Error",{
                style:{
                    borderRadius: '10px',
                    background: '#2E2E2E',
                    color: '#fff',
                }
            })
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
                            <button type="submit" className="bg-bright-yellow w-full mt-7 p-3 rounded-2xl hover:bg-accent-bright-yellow transition-all duration-150" >Submit</button>
                        </div>
                        <div className="flex w-full justify-center items-center mt-16">
                            <p>Allready have an account? <Link className="font-semibold hover:underline" to={'/auth/login'}>Login</Link></p>
                        </div>
                    </form>
        </div>
    )
}