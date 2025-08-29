import { useEffect, useState } from "react";
import Masonry from "react-layout-masonry";
import { Link } from "react-router";
import axios from "axios";
import PostSkeleton from "./postSkeleton";
import Cookies from "js-cookie";
import { useInView } from "react-intersection-observer";

export default function HomeGalery() {

  const [data, setData] = useState();
  const token = Cookies.get("token");
  const baseUrl = import.meta.env.VITE_API_URL;
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);

 async function fetchData() {
  const res = await axios.get(`${baseUrl}/api/post?page=${page}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if(page ===1){
    setData(res.data.content.data)
    setNextPage(res.data.content.last_page)
  }  
  else{
    setData(prevDatas => prevDatas.concat(res.data.content.data))
    setLoading(false)
  }
 }

 useEffect(()=>{
  fetchData()
 },[page])

 if(inView){
      setTimeout(() => {
      console.log("inview akaka")  
      setPage(page+1)
      setLoading(true)
    }, 50);
 }

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
        {loading ? 
          [...Array(10)].map((item, index)=>(
            <div className={`${index % 2 === 0 ? 'h-80': 'h-56'} w-full bg-dark-gray rounded-xl animate-pulse`}>
            </div>
          )) : ''
        }
      </Masonry>
      {nextPage >= page ? (
        <div className="h-1 w-full" ref={ref}></div>
      ):(
        'no more page'
      )}
    </div>
  );
}
