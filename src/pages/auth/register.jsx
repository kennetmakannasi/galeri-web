export default function Register(){
    return(
        <div className="mx-10 w-full">
                <h2 className="text-center text-4xl mb-12">Register</h2>
                    <form className="w-full">
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Username</label>
                        </div>
                        <div>
                            <input type="username" className="bg-amber-50 text-black w-full rounded-2xl p-3 mb-3"/> 
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="text-sm">Email address</label>
                        </div>
                        <div>
                            <input type="email" className="bg-amber-50 text-black w-full rounded-2xl p-3 mb-3"/> 
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm">Password</label>
                        </div>
                        <div>
                            <input type="password" className="bg-amber-50 text-black w-full rounded-2xl p-3"/>    
                        </div>
                        <div>
                            <button type="submit" className="bg-bright-yellow w-full mt-7 p-3 rounded-2xl " >Submit</button>
                        </div>
                    </form>
        </div>
    )
}