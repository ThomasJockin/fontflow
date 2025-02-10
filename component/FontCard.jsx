"use client"
import Token from "./Token"
import {useData} from './DataProvider.jsx'

function FontCard({category}){
    
    const {data}= useData()
    const item = data[category] || "loading"

return (
<span className="fontcard"> 
    <span className="BigLetter">Aa</span>
    
    <ul>
    
  <li className="item">{item}</li>
    <li>available at Google Fonts</li>
      </ul>
    </span>

)
};
export default FontCard;