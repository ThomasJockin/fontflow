"use client"
import {useState} from "react";
import {useData} from "./DataProvider.jsx";
import {useSearchParams} from "next/navigation";
import supabase from "../lib/supabase.js"

function SaveButton() {
    const {data} =useData();
    const sp = useSearchParams();
    const level = sp.get("level") || 1;
    const [loading, setStatus] = useState(false)
    
    async function save() {
        setStatus(true);
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
                timer_started_at: data.timer_started_at
            }
        )
        setStatus(false);
        
    };
    
    return(
    <button onClick={save}>
            {
                loading == true ? "Saving": "Save your Work"
            }
        </button>
    );
    
};

export default SaveButton;