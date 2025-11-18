import { createContext, useEffect, useState } from "react";
import Sidebar from "../sidebar"
import { Outlet, useLocation, useNavigate } from "react-router"
import Cookies from "js-cookie";
import Notification from "../../helpers/notificationEcho";
import { Toaster } from "react-hot-toast";
import { api } from "../../helpers/api";

export const SessionData = createContext()

export default function MainLayout() {
  const token = Cookies.get("token")
  const navigate = useNavigate();
  const [selfData , setSelfData] = useState(); 
  const location = useLocation()
  

  async function fetchSelfData() {
    const res = await api.get(`/api/auth/self`,{
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
    window.scrollTo({
      top:0
    })
  },[location.pathname])

  useEffect(()=>{
    middleware()
  },[token])

  return (
    <SessionData.Provider value={selfData}>
      <Toaster/>
      <div className="flex">
        <Notification/>
        <Sidebar />
        <div className="flex-1 md:pl-56 relative">
          <Outlet />
        </div>
      </div>
    </SessionData.Provider>
  );
}
