"use client"
import supabase from "../lib/supabase.js"
import {useData} from "./DataProvider.jsx";
import {useSearchParams, useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import randomName from "@scaleway/random-name";
import cloneDeep from "lodash/cloneDeep";

function WorkUpload() {
    const {data} = useData();
    const sp = useSearchParams();
    const router = useRouter();
    const level = sp.get("level") || 1;
    const [loading, setStatus] = useState(false);

    async function upload(event, currentData) { 
        const file = event.target.files[0];
        if (!file) return;

        console.log({currentData});
        const imgName = randomName();
        const fileType = file.type.replace("image/", ".");
        const uploadName = `${imgName}${fileType}`;

        const safeData = cloneDeep(currentData); // Ensure immutability

        const snapShot = { 
            level: level,
            chunk: safeData.chunk,
            relation: safeData.relation,
            layout: safeData.layout,
            attribute: safeData.attribute,
            header_font: safeData.headerfont,
            subhead_font: safeData.subheadfont,
            vibe: safeData.vibe,
            action: safeData.action,
            font_property: safeData.fontProperity,
            lang_object: safeData.langObject,
            content: safeData.content,
            timer_started_at: safeData.timer_started_at,
            img_url: `https://brkglddslfqgpfptphbm.supabase.co/storage/v1/object/public/uploads/${uploadName}`
        };

        setStatus(true);
        console.log({snapShot});

        try {
            const fileupload = await supabase.storage.from('uploads').upload(uploadName, file);
            if (fileupload.error) throw fileupload.error;

            const result = await supabase.from("fontprompts").insert(snapShot).select().single();
            console.log({result});

            setStatus(false);
            setTimeout(() => router.refresh(), 500); // Small delay before refresh
        } catch (error) {
            console.error("Upload error:", error);
            setStatus(false);
        }
    }
    
    return (
        <div>
            <label className="lv-1" htmlFor="file">
                {loading ? "Uploading..." : "Upload your Work"}
            </label>
            <input className="custom-file-input" id="file" type="file" onChange={(e) => upload(e, data)} />
        </div>
    );
}

export default WorkUpload;
