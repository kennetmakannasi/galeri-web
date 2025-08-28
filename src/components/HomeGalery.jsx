import { useEffect, useState } from "react";
import Masonry from "react-layout-masonry";
import { Link } from "react-router";
import axios from "axios";
import PostSkeleton from "./postSkeleton";
import Cookies from "js-cookie";

export default function HomeGalery() {

 const [data, setData] = useState();
  const token = Cookies.get("token")

 async function fetchData() {
  const res = await axios.get(`http://127.0.0.1:8000/api/post?page=1`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  setData(res.data.content.data)  
 }

 useEffect(()=>{
  fetchData()
 },[])

 console.log(data)

  return (
    <div className="mt-8">
      <Masonry columns={{ 640: 2, 1024: 3, 1440: 4 }} gap={17}>
      {data?.map((item, idx) => (
        <Link to={`/post/${item.id}`}>
          <div key={idx} className="mb-3 break-inside-avoid rounded-xl overflow-hidden">
            <img
              src={item.image_url}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-auto object-cover"
            />
            <p>{item.title}</p>
          </div>
        </Link>
      )) || 
      [...Array(15)].map((item, index)=>(
            <div className={`${index % 2 === 0 ? 'h-80': 'h-56'} w-full bg-dark-gray rounded-xl animate-pulse`}>
            </div>
        ))}
      </Masonry>
    </div>
  );
}
