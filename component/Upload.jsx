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
    async function upload(event){ 
        setStatus(true);
        const file = event.target.files[0]
        const imgName = randomName()
        const fileType = file.type.replace("image/","."); 
        const uploadName = `${imgName}${fileType}`
        const fileupload = await supabase.storage.from('uploads').upload(uploadName, file)
        const result = await supabase.from("fontprompts").insert(
            {
                level:level,
                chunk: data.chunk,
                relation: data.relation,
                layout: data.layout,
                attribute: data.attribute,
                header_font:data.headerfont,
                subhead_font:data.subheadfont,
                vibe:data.vibe,
                action:data.action,
                font_property:data.fontProperity,
                lang_object:data.langObject,
                content:data.content,
                timer_started_at: data.timer_started_at,
                img_url: `https://brkglddslfqgpfptphbm.supabase.co/storage/v1/object/public/uploads/${uploadName}`
            }
        )
        setStatus(false);
        await router.refresh();
    }
    
    
    return(
        <div>
        <label className="lv-1" htmlFor="file">  {
                loading == true ? "Uploading": "Upload your Work"
            }</label>
        <input className="custom-file-input" id ="file" type="file" onChange={upload} /> 
            </div>
    )
    
};

export default WorkUpload ;


