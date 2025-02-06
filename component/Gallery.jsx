import supabase from "../lib/supabase.js"

async function Gallery({}){

let { data: fontprompts, error } = await supabase
  .from('fontprompts')
  .select('*').order("id",{ascending:false})
    
    
return (
    <div>
        <h1>Gallery</h1>
        
        <div className="gallery">
        {fontprompts.map(
        prompt => 
            <div className="galleryshow" key={prompt.id}>
                <img className="img-item" src={prompt.img_url}/>
                <div className="gallery-text">
                <label>prompt </label>{prompt.vibe} but {prompt.action} along with a {prompt.layout} layout
                </div>
                <div className="gallery-text">
                    <span className="BigLetter">Aa</span>
                <label>headline </label>{prompt.header_font} but make the {prompt.lang_object} {prompt.relation} the {prompt.attribute}
                </div>
                <div className="gallery-text">
                    <span className="SmallLetter">Aa</span>
                <label>subhead </label>{prompt.subhead_font} but also make it {prompt.relation} the {prompt.font_property} of the {prompt.content}
                </div>
            </div>
        )}
            </div>
        
        </div>
)
};
export default Gallery;