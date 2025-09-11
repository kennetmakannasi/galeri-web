import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

export default function Login(){
    const baseUrl = import.meta.env.VITE_API_URL;
    const {register, handleSubmit, formState: { errors }}= useForm();
    const navigate = useNavigate()

    async function onSubmit(data) {
        try{
            const res = await axios.post(`${baseUrl}/api/auth/login`, 
            {
                username: data.username,
                password: data.password
            } ,{
                headers:{
                'Content-Type': 'application/json'
                }
            },
            )   
            const token = res.data.content.token
            Cookies.set('token', token, {expires:7})
            navigate('/')
        }catch(error){
            if(error.response){
                const status = error.response.status

                if(status === 400){
                    alert("wrong password or username")
                }
            }else{
                alert("Unknown Error")
            }
            console.error(error)
        }     
    }

    return(
        <div className="mx-10 w-full">
                <h2 className="text-center text-4xl mb-12">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Email address or Username</label>
                        </div>
                        <div>
                            <input type="text" {...register("username", { required: true })} name="username" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/>
                            {errors.username && <div>insert username or email</div>} 
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm">Password</label>
                        </div>
                        <div>
                            <input type="password" {...register("password", { required: true })} name="password" className="bg-white text-black w-full rounded-2xl p-3"/>
                            {errors.password && <div>insert password</div>}     
                        </div>
                        <div>
                            <button type="submit" className="bg-bright-yellow w-full mt-7 p-3 rounded-2xl hover:bg-accent-bright-yellow transition-all duration-150" >Submit</button>
                        </div>
                    </form>
        </div>
    )
}