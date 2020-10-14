import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header=()=>{
    return(
     <nav className="navbar navbar-expand-md shadow-sm" >
            <div className="container">
                <div className="navbar-brand deco-none">
                    <FontAwesomeIcon icon="address-book" /> Registro de Cartas Congregación La Herradura
                </div>
            </div>
        </nav>
    )
}
export default Header