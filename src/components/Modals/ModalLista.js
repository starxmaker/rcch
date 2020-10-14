import React, {useState} from "react"
import Publicador from "../../models/Publicador"
import Modal from 'react-bootstrap/Modal'
import Notiflix from "notiflix-react"
import Select from "react-select"
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt } from "@fortawesome/free-solid-svg-icons"



const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#181818",
      color: "#AEBEAE",
      zIndex: 3
    }),
    option:(provided,state) =>({
        ...provided,
        backgroundColor: state.isFocused ? "#222222" : "181818",
      color: "#AEBEAE"
    }),
    input: (provided, state)=> ({
    ...provided,
      color: "#AEBEAE"
    }),
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderColor: "#404040"
      
    }),
    singleValue: (provided, state) => {
  
      return { ...provided, color: "#AEBEAE" };
    }
  }

const ModalLista= React.forwardRef((props, ref)=>{
    const [show, setShow] = React.useState(false) 
    const [lista, setLista] = React.useState([])
    const [history, setHistory] = React.useState([])
    
    const handleModalClose=event =>{
        setShow(false)
    }
    const handleChange= event =>{
        updateListaEspera(event);
        Notiflix.Notify.Success("Publicador agregado a la lista")
       
    }

    React.useImperativeHandle(ref, () => ({
        handleModalOpen(event){
            setShow(true)
        }
    }))

 

    const updateListaEspera=publisher=>{
        const newState=[]
        for (let i=0; i<lista.length; i++){
            newState.push(lista[i])
         }
            if(newState.indexOf(publisher)!=-1) return false;
             if (checkParticipacion(publisher)){
                 newState.push(publisher)
             }else{
                 var nobodyParticipated=true
                 for (let i=0; i<newState.length; i++){
                    if (checkParticipacion(newState[i])){
                        newState.splice(i,0,publisher)
                        nobodyParticipated=false
                        break;
                    }
                 }
                 if(nobodyParticipated){
                     newState.push(publisher)
                 }
             }
             
             
       setLista(newState)       
      }

    const checkParticipacion = publisher =>{
        return history.indexOf(publisher)!=-1;
    }
   
    const deleteElement= publisher =>{
        const newLista=[...lista]
        newLista.splice(newLista.indexOf(publisher),1)
        setLista(newLista)     
        
    }

    const modifyCurrentName =(publisher) =>{
        deleteElement(publisher);
        setHistory([...history, publisher])
        props.replacePublicador(publisher)
        handleModalClose()
      }
    return (
        <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
            <Modal.Title>Lista de espera</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Publicador
                        </Form.Label>
                        <Col sm="8">
                        <InputGroup>
                            <Select options={props.allPublicadores} styles={customStyles} name="fldPublicador"  onChange={handleChange} />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={props.addPublicador}><FontAwesomeIcon icon="plus-square"/></Button>           
                            </InputGroup.Append>
                        </InputGroup>   
                       </Col> 
                    </Form.Group>

                    <div  styles={{paddingTop:"20%"}}>
    {lista.map((item,index) => (
    <a key={item.value} 
        className='list-group-item list-group-item-action flex-column align-items-start'>
        <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1' onClick={() => {modifyCurrentName(item)}}>
                <span className='currentNumber'> {index+1}# </span> {item.label} 
            </h5><small className='text-muted'>
            <FontAwesomeIcon icon='trash-alt' onClick={() => {deleteElement(item)}} /></small></div></a>))}
                    </div>

        </Modal.Body>
        </Modal>
    )
})

export default ModalLista