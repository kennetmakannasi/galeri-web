import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { Icon } from "@iconify/react/dist/iconify.js"
import axios from "axios"
import { UseToken } from "../helpers/useToken"

export default function SearchBar(){
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState();
    const baseUrl = import.meta.env.VITE_API_URL;

    function handleSearch(event){
        event.preventDefault()
        navigate(`/search?q=${searchValue}`)
        setSearchValue("")
        navigate(0)
    }

    async function fetchData() {
        if(searchValue){
            try{
                const res = await axios.get(`${baseUrl}/api/post/search?q=${searchValue}`,{
                    headers: {
                Authorization: `Bearer ${UseToken()}`,
                'Content-Type': 'multipart/form-data'
            }
                })
                setData(res.data.content.data || [])
            }catch(error){
                const status = error.response.status

                if(status === 404){
                    setData(
                        [{
                            title: "not found"
                        }]
                    )
                }
                console.error(error)
            }    
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            fetchData()    
        }, 1000);
        
    }, [searchValue])

    return(
        <>
            <div className="relative h-8 flex items-center">
                <Icon className="absolute ml-3 text-gray-400" height={16} icon={'la:search'}/>
                <form className="h-full" onSubmit={handleSearch}>
                    <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className="bg-dark-gray h-full px-9 w-full rounded-lg" type="text" placeholder="Search"/>    
                </form>
            </div>
            {searchValue && (
                <div className="w-full bg-dark-gray absolute z-10">
                    {data?.map((item)=>(
                        <Link to={`/search?q=${item.title}`}>
                            <p>{item.title}</p>
                        </Link>
                    ))}
                </div>    
            )}
 
        </>
  
    )
}