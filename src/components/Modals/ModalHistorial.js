import React, {useEffect} from "react"
import Modal from 'react-bootstrap/Modal'
import Notiflix from "notiflix-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Record from "../../models/Record"
import {timeSince} from "../../Utils"





const ModalHistorial = React.forwardRef((props, ref) => {  
    const [show, setShow] = React.useState(false) 

    
    const handleModalClose=event =>{
        setShow(false)
    }
    React.useImperativeHandle(ref, () => ({
        handleModalOpen(event){
            setShow(true)
        }
    }))

    const deleteRecord=id =>{
        let targetRecord=Record.getById(id)
        if (targetRecord!=false) targetRecord.delete()
        Notiflix.Notify.Success("Carta eliminada")
        props.refreshData()
    }

   
 
   
        return (
    
            <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Historial de cartas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        {props.allElements.map(item => <a key={item.id} className="list-group-item list-group-item-action flex-column align-items-start"><div key={"div"+item.id} className='d-flex w-100 justify-content-between' ><h5 key={"h5"+item.id} className='mb-1'>{item.publicador}</h5><small key={"small"+item.id} className='text-muted'> {timeSince(item.hora)} <FontAwesomeIcon key={"fw"+item.id} onClick={() => deleteRecord(item.id)} icon="trash-alt" /></small></div><p className='mb-1'><font color={item.tipo==0 ? "purple" : "orange"}>{item.tipo==0 ? "Primera visita" : "Revisita"}</font> a {item.publico}</p><small className='text-muted'>Enviada por {item.medio}</small></a>)}
            </Modal.Body>
            </Modal>
        )
  })

  export default ModalHistorial