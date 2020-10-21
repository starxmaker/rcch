import React from "react"
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalImportDB from "../Modals/ModalImportDB"
import ModalHistorial from "../Modals/ModalHistorial"
import ModalEstadisticas from "../Modals/ModalEstadisticas"
import {currentDatabase} from "../../Database"
import Notiflix from "notiflix-react"


const RegistroHeader = (props)=>{
   
    const modalRef=React.useRef(null)
    const modalHistoryRef=React.useRef(null)
    const modalEstadisticasRef=React.useRef(null)

    

    const handleModalOpen= event =>{
        modalRef.current.handleModalOpen()
    }
    const handleModalHistoryOpen= event =>{
        modalHistoryRef.current.handleModalOpen()
    }
    const createNewDatabase= () => {
    const confirmacion=window.confirm("Se borrarán todos los datos guardados");
        if (confirmacion){
            currentDatabase.createDatabase()
            props.refreshData()
        }
        
    }
    const handleModalEstadisticasOpen= event =>{
        modalEstadisticasRef.current.handleModalOpen()
    }
        return(
            <div className="card-header">
                                <Dropdown style={{float: "left"}}>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={createNewDatabase} style={props.online ? {display: "none"} : {}}> <FontAwesomeIcon icon="file" /> Nueva base de datos</Dropdown.Item>
                                        <Dropdown.Item onClick={handleModalOpen}  style={props.online ? {display: "none"} : {}}><FontAwesomeIcon icon="folder" /> Abrir base de datos</Dropdown.Item>
                                        <Dropdown.Item onClick={() =>{
                                            currentDatabase.exportExistingDatabase()
                                        }}  style={props.online ? {display: "none"} : {}}><FontAwesomeIcon icon="download" /> Descargar base de datos</Dropdown.Item>
                                        <Dropdown.Item style={props.online ? {} : {display: "none"}} onClick={() =>{
                                            Notiflix.Loading.Arrows('Cerrando sesión');
                                            window.localStorage.removeItem("sessionToken")
                                            window.location.reload()
                                        }}><FontAwesomeIcon icon="sign-out-alt" /> Cerrar sesión</Dropdown.Item>
                                        <Dropdown.Item onClick={props.showLista}><FontAwesomeIcon icon="ellipsis-h" /> Lista de espera</Dropdown.Item>
                                        <Dropdown.Item onClick={handleModalHistoryOpen}><FontAwesomeIcon icon="history" /> Ver historial</Dropdown.Item>
                                        <Dropdown.Item onClick={handleModalEstadisticasOpen}><FontAwesomeIcon icon="chart-pie" /> Estadísticas</Dropdown.Item>
                                        
                                        <Dropdown.Item onClick={props.resetForm}><FontAwesomeIcon icon="undo-alt" /> Reiniciar formulario</Dropdown.Item>
                                        
                                       
                                        <Dropdown.Item onClick={()=> document.getElementById("darkSwitch").click()}><FontAwesomeIcon icon="moon" /> Activar/desactivar modo nocturno</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <span style={{float: "left", marginLeft:5}}> Registro de cartas</span> 
                                <ModalImportDB ref={modalRef}
                                    refreshData={props.refreshData}
                                    />
                                <ModalHistorial ref={modalHistoryRef}
                                    refreshData={props.refreshData} allElements={props.allLetters} />
                                    <ModalEstadisticas ref={modalEstadisticasRef} />
                            </div>
        )
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

    <span ref={ref} onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    <FontAwesomeIcon icon="cog" />
    {children}
    </span>
  ));
export default RegistroHeader