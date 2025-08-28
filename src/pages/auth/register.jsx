import { Form, redirect } from "react-router"
import axios from "axios"
import Cookies from "js-cookie";

export async function handleRegister({request}) {
    const formData = await request.formData();
          const userData = Object.fromEntries(formData);
          const res = await axios.post("http://127.0.0.1:8000/api/auth/register", userData ,{
            headers:{
              'Content-Type': 'application/json'
            }
          },

        ) 
    const token = (res.data.content)
    Cookies.set('token', token, {expires:7})
    return redirect('/')
}

export default function Register(){
    return(
        <div className="mx-10 w-full">
                <h2 className="text-center text-4xl mb-12">Register</h2>
                    <Form method="post" className="w-full">
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Username</label>
                        </div>
                        <div>
                            <input type="username" name="username" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/> 
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Email address</label>
                        </div>
                        <div>
                            <input type="email" name="email" className="bg-white text-black w-full rounded-2xl p-3 mb-3"/> 
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm">Password</label>
                        </div>
                        <div>
                            <input type="password" name="password" className="bg-white text-black w-full rounded-2xl p-3"/>    
                        </div>
                        <div>
                            <button type="submit" className="bg-bright-yellow w-full mt-7 p-3 rounded-2xl " >Submit</button>
                        </div>
                    </Form>
        </div>
    )
}