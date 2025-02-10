//make a function to pass in the file, assign a random name with the hook randomName append that name to the url of supabase

import randomName from "@scaleway/random-name";
import supabase from "./supabase.js"

export function genSnapShot(data) {
    return(
     {
            level: data.level,
            chunk: data.chunk,
            relation: data.relation,
            layout: data.layout,
            attribute: data.attribute,
            header_font: data.headerfont,
            subhead_font: data.subheadfont,
            vibe: data.vibe,
            action: data.action,
            font_property: data.fontProperity,
            lang_object: data.langObject,
            content: data.content,
            timer_started_at: data.timer_started_at,
            user_type: data?.user_type || "human"
    }
    )    
    
}

export async function saveFile(file, data ) {
    const imgName = randomName();
    const fileType = file.type.replace("image/", ".");
    const uploadName = `${imgName}${fileType}`;
    const img_url = `https://brkglddslfqgpfptphbm.supabase.co/storage/v1/object/public/uploads/${uploadName}`;
    
    const snapShot = { ...data,img_url };

    const fileupload = await supabase.storage.from('uploads').upload(uploadName, file);
            if (fileupload.error) throw fileupload.error;
    const result = await supabase.from("fontprompts").insert(snapShot).select().single();

    return

    
    
}