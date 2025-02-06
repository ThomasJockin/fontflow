"use client"

import { useState } from 'react'
import ms from 'ms'
import prettyMilliseconds from 'pretty-ms';

import { useCountdown } from 'usehooks-ts'
import SaveButton from "./SaveButton.jsx"
import {useData} from "./DataProvider.jsx"
import WorkUpload from "./Upload.jsx"

function Timer(){
    const {setData, data}=useData()
    const [isRunning, setIsRunning] = useState();
    
const [count, {startCountdown, stopCountdown, resetCountdown}] = 
      useCountdown(
          {countStart:ms("90m"),
           intervalMs:0.00000001
           })

let timerColor
        switch(true){
            case isRunning == false:
                timerColor="pause"
                break
            case count === ms("90m"):
                timerColor= "timer-start"
                break
            case count >= ms("61m"):
                timerColor= "rd1"
                break
            case count >= ms("30m"):
                timerColor= "rd2"
                break
            case count >= ms("29m"):
                timerColor= "rd3"
                break
            default: 
                timerColor= "timer-start"
                break
    };
            
        //count === ms("90m") ? "timer-start":
       // count >=ms("61m") ? "rd1":
        //count <=ms("30m") ? "rd2":
        //count <=ms("29m") ? "rd3": "timer-start";
    
    
    
    
const showUpload = 
        count ===ms("90m") ? "upload-box-hide":
        "upload-box-show";

    
        function start() {
            startCountdown();
            setIsRunning(true);
           const timerStart = new Date()
           setData(data => ({...data, timer_started_at:timerStart})) 
    };
    
        function pause() {
            stopCountdown();
            setIsRunning(false);
        }
    
        function reset() {
            resetCountdown();
            setIsRunning();
        }
    

return (
    <div className="timercontainer">
        <div className="timer"><span className={timerColor}>{prettyMilliseconds(count,{colonNotation: true, secondsDecimalDigits:0})}</span></div>
        <div>
      <button className={isRunning  ? "active": "unActive"} onClick={start}>start</button>
            
      <button className={isRunning !=null  && isRunning == false ? "active": "unActive"}  onClick={pause}>pause</button>
            
      <button onClick={reset}>reset</button>
            </div>
        <div className= {showUpload}>
        <WorkUpload/>
        </div>
        </div>

)


};
export default Timer;