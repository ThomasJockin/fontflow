import supabase from "../lib/supabase.js"
import GalleryCard from "./GalleryCard.jsx"
import {useCounter} from 'usehooks-ts'

async function Gallery({}){

let { data: fontprompts, error } = await supabase
  .from('fontprompts')
  .select('*').order("uploaded_file_at",{ascending:false})
    
    
return (
    <div>
        <h1>Gallery</h1>
        <div className="gallery">
            
        {fontprompts.map(
        prompt => 
            <GalleryCard key={prompt.id} {...prompt}/>
        )}
            </div>
        
        </div>
)
};
export default Gallery;