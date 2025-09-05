import { createContext, useEffect, useState } from "react";
import Sidebar from "../sidebar"
import { Outlet, useNavigate } from "react-router"
import axios from "axios";
import Cookies from "js-cookie";

export const SessionData = createContext()

export default function MainLayout() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token")
  const navigate = useNavigate();
  const [selfData , setSelfData] = useState(); 

  async function fetchSelfData() {
    const res = await axios.get(`${baseUrl}/api/auth/self`,{
       headers: {
        Authorization: `Bearer ${token}`
      }
    })
    Cookies.set('uId', res.data.content.id ,{expires:7})
    setSelfData(res.data.content)
  }

  useEffect(()=>{
    fetchSelfData()
  },[])

  function middleware(){
    if(!token){
      navigate('/auth/login')
    }
  }

  useEffect(()=>{
    middleware()
  },[token])

  return (
    <SessionData.Provider value={selfData}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:pl-56 relative">
          <Outlet />
        </div>
      </div>
    </SessionData.Provider>
  );
}
