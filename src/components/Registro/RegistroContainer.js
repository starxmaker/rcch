import React from "react"
import RegistroComponent from "./RegistroComponent"
import RegistroBody from "./RegistroBody"
import RegistroHeader from "./RegistroHeader"


    
const RegistroContainer = (props)=> {
    const bodyRef=React.useRef(null)
    const resetForm=()=>{
        bodyRef.current.reset();
    }
    const showLista=()=>{
        bodyRef.current.openLista()
    }
    
        return(
            <RegistroComponent>
                <RegistroHeader allLetters={props.allLetters} refreshData={props.refreshData} resetForm={resetForm} showLista={showLista} online={props.online}/>
                <RegistroBody allPublicadores={props.allPublicadores} allPublicos={props.allPublicos} allMedios={props.allMedios} refreshData={props.refreshData} ref={bodyRef}/>
            </RegistroComponent>
                      
        )
}




export default RegistroContainer