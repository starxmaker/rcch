import React from "react"

const ChartLabel= (props) =>{
    return (
        <div style={{display: "inline-block", paddingRight: 20}}>
            <div style={{
  height: "1.5em",
  width: 30,
  backgroundColor: props.color,
  float: "left"
}}></div>
            
            <div style={{paddingLeft: 10, float: "left"}}>{props.label} </div>
        </div>
    )
}

export default ChartLabel