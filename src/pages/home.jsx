import Dropdown from "../components/dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Home(){
    return(
        <>
        <p>ini page home</p>
        <Dropdown
            buttonContent={
                <Icon icon={'bi:three-dots'}/>
            }
            dropdownContent={
                <>
                <div>aaaaaa</div>
                <div>bbbbbbbb</div>
                </>
                
            }
        />
        </>
    )
}