import Token from "../component/Token"
import Content from "../component/Content"
import Timer from "../component/Timer"
import Card from "../component/Card"
import Gallery from "../component/Gallery.jsx"
import LvSelector from "../component/LvSelector"
import FontCard from "../component/FontCard"
           
export default async function Home({searchParams}) {
    const parms = await searchParams
    const level = parms.level
  return (
      <div id="top">
      <div className="header">
      <h1>FontFlow Sprints.</h1>
      <h2>Find your font pairing flow in 90-minute design sprints.</h2> 
      <div>
<div className="container">
      <div className="level">
<LvSelector />
      <ul>
<li>The poster will be<p /> {level == 3 && <><Token category="vibe"/>… and </>}{level >=2 && <><Token category="action"/>… and also</>} <Token category="layout"/> &#9639;  </li>
      
<li>The headline will be set in <FontCard category="headerfont" />{level >=2 && <>… but make the <Token category="langObject"/> <Token category="relation"/> the <Token category="fontProperity"/> &#9639;</>}  </li>
      
<li>The subhead will be <FontCard category="subheadfont"/>{level == 3 && <>… but also make it <Token category="relation"/> the <Token category="attribute"/> of the <Token category="content"/> &#9639;</>}  </li>
      </ul>
      </div>
      
      <div className="level">
      < span className="LvSelector"> <label> &#10113; Copy content to clipboard</label></span>
      <Content />

      </div>
      
      <div className="level">
      < span className="LvSelector"> <label>&#10114; Get your workspace ready and start the timer </label></span>
      <Timer />
      </div>
      
      </div>
      </div>
</div>
      
      
      <Gallery />
      
      </div>
  );
}



