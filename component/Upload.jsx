"use client"
import supabase from "../lib/supabase.js"
import {useData} from "./DataProvider.jsx";
import {useSearchParams, useRouter} from "next/navigation";
import {useState} from "react";
import randomName from "@scaleway/random-name";

function WorkUpload() {
    const {data}=useData();
    const sp = useSearchParams();
   const router = useRouter();
    const level = sp.get("level") || 1;
    const [loading,setStatus] = useState(false)
    async function upload(currentData){ 
        const snapShot= { 
                level:level,
                chunk: currentData.chunk,
                relation: currentData.relation,
                layout: currentData.layout,
                attribute: currentData.attribute,
                header_font:currentData.headerfont,
                subhead_font:currentData.subheadfont,
                vibe:currentData.vibe,
                action:currentData.action,
                font_property:currentData.fontProperity,
                lang_object:currentData.langObject,
                content:currentData.content,
                timer_started_at: currentData.timer_started_at
                        }
        setStatus(true);
        const file = event.target.files[0]
        const imgName = randomName()
        const fileType = file.type.replace("image/","."); 
        const uploadName = `${imgName}${fileType}`
        const fileupload = await supabase.storage.from('uploads').upload(uploadName, file)
        
        const newRecord = Object.assign(snapShot, {
               
                img_url: `https://brkglddslfqgpfptphbm.supabase.co/storage/v1/object/public/uploads/${uploadName}`
            })
        console.log({newRecord})
        const result = await supabase.from("fontprompts").insert(newRecord).select()
        console.log({result})
        setStatus(false);
        //await router.refresh();
    }
    
    
    return(
        <div>
        <label className="lv-1" htmlFor="file">  {
                loading == true ? "Uploading": "Upload your Work"
            }</label>
        <input className="custom-file-input" id ="file" type="file" onChange={()=>upload(data)} /> 
            
            </div>
    )
    
};

export default WorkUpload ;


