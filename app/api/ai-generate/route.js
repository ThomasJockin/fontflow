import supabase from "../../../lib/supabase.js"
import {genSnapShot, saveFile} from "../../../lib/saveFile.js"

function prompt_gather(data) {
    let persona =
        "You are a "
            if(data.level == 3) {
                persona = persona + "seasoned graphic designer with 15 years of professional experience with a love and deep knowledge of typography"
            }
            if(data.level == 2) {
                persona = persona + "a graduate student studing for your MFA in graphic design. You really like typography and enjoy working with type to make exciting and effective posters"
            }
            if(data.level == 1) {
                persona = persona + "a undergraduate student in a BFA graphic design program. You have some knowledge of fonts but that knowledge is limited. You're looking to improve your typography by making posters"
            }
    
    let poster = 
        "The poster will be " 
            if (data.level == 3){
                poster = poster + data.vibe + " …and " + data.action + " …and also " + data.layout
            }
            if (data.level == 2) {
                poster = poster + data.action + " …and also " + data.layout
            }
            if (data.level == 1) {
                poster = poster + data.layout
            }
    let headline = 
        "The headline wil be the font " + data.header_font
            if (data.level == 3 || data.level == 2){
                headline = headline + " …but make the " + data.lang_object + " " + data.relation + "the " + data.font_property
            }

    let subhead =
        "The subhead will be the font " + data.subhead_font
            if(data.level == 3 || data.level == 2) {
                subhead = subhead + " …but also make it " + data.relation + " the " + data.attribute + " of the " + data.content
            }
    let chunk =
        "The content for the poster is " + data.chunk
    
    return `${persona}. Your task is to design the following artifact: ${poster}. ${headline}. ${subhead}. ${chunk}`
} 

export async function POST(request) {
    const result = await request.json();
    const collection = {...result.data, user_type:"ai"}
    const prompt = prompt_gather(collection);
    console.log({Testing:collection})
    const url = 'https://api.ideogram.ai/generate';
    const image_request =
        
                    {"prompt":prompt,
        
                    "resolution":"RESOLUTION_896_1120",
                     "model":"V_2",
                     "magic_prompt_option":"ON",
                     "num_images": 1,
                     "negative_prompt":"no logos and only use the content provided in the prompt. No illutrations",
                     "style_type":"DESIGN"}
    const options = {
        method: 'POST',
        headers: {
            'Api-Key': process.env.IDEOGRAM_KEY, 
            'Content-Type': 'application/json'},
        
            body: JSON.stringify({image_request})
        };

try {
    const ideogram = await fetch(url, options);
    console.log(ideogram.status);
    const ideogram_result = await ideogram.json();
    console.log(ideogram_result);
    const ideogram_img = await fetch(ideogram_result.data[0].url);
    console.log(ideogram_img);
    const file = await ideogram_img.blob();
    
    const aiGen = await saveFile(file,collection)
return Response.json({aiGen});
} catch (error) {
  console.error(error);
return Response.json({error});
}
};

export const maxDuration = 60