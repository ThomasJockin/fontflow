"use client"
import {useState, useEffect} from "react"
import {useRouter, useSearchParams} from "next/navigation"

function LvSelector(){
const router= useRouter();
const searchparm = useSearchParams();
const defaultlevel = searchparm.get("level") || 1;
const [level, setLevel] = useState(defaultlevel); 
const setLevelNumber = (event) => setLevel(
        parseInt(event.target.value)
    );
const [levelName, setLevelName] = useState("Undergrad");
useEffect(
    () =>{
        router.replace(`/?level=${level}`)
        searchparm
       if(level === 1){setLevelName("Undergad")}
        if(level === 2){setLevelName("Graduate")}
        if(level === 3){setLevelName("Professional")}
   }
    ,[level]
)
const textColor = level === 1 ? "lv-1":
level === 2 ? "lv-2":
"lv-3";
    
return (
    <div className="lv-gen">
        < div className="LvSelector">
    <label htmlFor ="challenge"> &#10112; Set your Difficulty Level </label>
             <input type="range" id="level" name="challenge" min="1" max="3" value={level} onChange={setLevelNumber} />
        </div>
           <span className={textColor}> Level {level} {levelName}</span>
        </div>
)
};
export default LvSelector;
    



