"use client"
import { useCopyToClipboard } from 'usehooks-ts'
import {useData} from "./DataProvider.jsx";

function Content({}){
    const {data} =useData() 
    const item = data.chunk || "loading"
    return(
        <div className="content-display">
{item} &#9639; 
         </div>
    )

};


export default Content;