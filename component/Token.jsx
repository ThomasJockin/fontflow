"use client"
import lodash from "lodash";
import {useData} from './DataProvider.jsx'

function Token ({category}) {
    const {data}= useData()
    const item = data[category]
return (
    <span suppressHydrationWarning className="item">{item}</span>
    )
};



export default Token;