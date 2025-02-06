"use client"
import { useCopyToClipboard } from 'usehooks-ts'
import {useData} from "./DataProvider.jsx";

function Content({}){
    const {data} =useData()
    const item = data.chunk
    return(
        <div className="content-display">
<span suppressHydrationWarning >{item}</span>
         </div>
    )

};


export default Content;