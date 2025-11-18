import { useSearchParams } from "react-router"
import ScrollGrid from "../components/scrollGrid";

export default function SearchPage(){

    const [searchParams] = useSearchParams();
    const param = searchParams.get('q')

    return(
        <div className="px-4 md:px-12 py-8">
            {param ? (
                <ScrollGrid endpoint={'post/search'} searchQuery={param}/>   
            ):(
                <p>Enter a keyword</p>
            )}
             
        </div>
    )
}