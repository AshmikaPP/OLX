import { useState } from "react"
import Navbar from "./Navbar"
import Sellbody from "./Sellbody"



const Sell = () =>{
    const [search,setSearch] =  useState("")
 
    return(
        <>
        <Navbar setSearch={setSearch}/>
        <Sellbody/>
        </>
    )
}
export default Sell