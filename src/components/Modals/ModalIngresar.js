import React, {useEffect} from "react"
import Modal from 'react-bootstrap/Modal'
import Notiflix from "notiflix-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ModalIngresar = (props) => { 
    
    
    var campos={}
    props.fields.forEach(field => {
            campos= {
                ...campos,
                [field.name]: field.default
            }
    })
    const [fields, setFields]= React.useState(campos)
    const handleChange = event => {
        const target= event.target
        if (target.type==="checkbox"){
            setFields(prevState =>{
                return {...prevState, [target.name]: target.checked}
            })
        }else{
            setFields(prevState =>{
                return {...prevState,[target.name]: target.value}
            })
        }
    }
    const handleModalClose=event =>{
        props.setShow(false)
        console.log(fields)
    }
    const handleSubmit=event =>{
        event.preventDefault()
        let result=props.submitFunction(fields)
        if (result){
            setFields(campos)
        }
    }
    
   
        return (
    
            <Modal show={props.show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar {props.tipo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.fields.map((item, index) =>(
                    <Form.Group as={Row} key={index}>
                    <Form.Label column sm="4">
                        {item.label}
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type={item.type} name={item.name} value={fields.[item.name]} checked={fields.[item.name]} onChange={handleChange}/>
                        
                   </Col> 
                </Form.Group>
                ))}
                <div className="text-center" >
                    <Button variant="primary" onClick={handleSubmit}>
                        Agregar
                    </Button>
                </div>
            </Modal.Body>
            </Modal>
        )
  }

  export default ModalIngresar