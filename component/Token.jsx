"use client"
import {useData} from './DataProvider.jsx'

function Token ({category}) {
    const {data}= useData()
    const item = data[category] || "loading"
return (
    <span className="item">{item}</span>
    )
};



export default Token;