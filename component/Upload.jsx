"use client"
import supabase from "../lib/supabase.js"
import {useData} from "./DataProvider.jsx";
import {useSearchParams, useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import randomName from "@scaleway/random-name";
import cloneDeep from "lodash/cloneDeep";
import {genSnapShot, saveFile} from "../lib/saveFile.js";

function WorkUpload() {
    const {data} = useData();
    const sp = useSearchParams();
    const router = useRouter();
    const level = sp.get("level") || 1;
    const [loading, setStatus] = useState(false);
    

    async function upload(event) { 
        const newData = genSnapShot({...data,level})
        const file = event.target.files[0]
        if (!file) return;

        setStatus(true);

        try {
            await Promise.all(
                [
                    saveFile(file, newData),
                    fetch("/api/ai-generate", {
                method:"POST", 
                headers:{
                    'Content-Type': 'application/json'},
                body: JSON.stringify({data:newData})
                                    }
                 )
                    
                ]
            );
            
            setStatus(false);
            router.refresh(); // Small delay before refresh

            
        } 
        
        catch (error) {
            console.error("Upload error:", error);
            
            setStatus(false);
        }
    }
    
    return (
        <div>
            <label className="lv-1" htmlFor="file">
                {loading ? "Uploading..." : "Upload your Work"}
            </label>
            <input className="custom-file-input" id="file" type="file" onChange={upload} />
        </div>
    );
}

export default WorkUpload;
