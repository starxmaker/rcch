import React, {useEffect} from "react"
import Modal from 'react-bootstrap/Modal'
import Notiflix from "notiflix"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





const ModalManage = React.forwardRef((props, ref) => {  
    const [show, setShow] = React.useState(false)   

    
    const handleModalClose=event =>{
        setShow(false)
    }
    React.useImperativeHandle(ref, () => ({
        handleModalOpen(event){
            setShow(true)
        }
    }))
 
   
        return (
    
            <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Gestionar {props.tipo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.allElements.map(item => <a key={item.value} className="list-group-item list-group-item-action flex-column align-items-start"><div key={"div"+item.value} className='d-flex w-100 justify-content-between' ><h5 key={"h5"+item.value} className='mb-1'>{item.label}</h5><small key={"small"+item.value} className='text-muted'><FontAwesomeIcon key={"fw"+item.value} onClick={() => props.deleteFunction(item.value)} icon="trash-alt" /></small></div></a>)}
            </Modal.Body>
            </Modal>
        )
  })

  export default ModalManage