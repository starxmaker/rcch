import React, {useEffect} from "react"
import Modal from 'react-bootstrap/Modal'
import Notiflix from "notiflix"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios"




const ModalLogin = props => {  
    
    const [show, setShow] = React.useState(props.show)   
    const [fields, setFields] = React.useState({
        server: "",
        userName: "",
        password: ""
    })
    const logIn=event =>{
       
        if (fields.server.trim()!="" && fields.userName.trim!="" && fields.password.trim()!=""){
            let servidor=fields.server.trim()
            if(servidor.charAt(servidor.length-1) == "/"){ servidor = servidor.substr(0, servidor.length - 1);}
            Notiflix.Loading.arrows('Iniciando sesión');
            axios.post(servidor+"/usuarios/login", { username: fields.userName, password: fields.password })
            .then(res => {
                Notiflix.Report.success('Información','Inicio de sesión exitoso','OK');
                Notiflix.Loading.remove();
                handleModalClose()
                props.handleServerLogin(servidor,res.data.token)
      }).catch(err => {
        Notiflix.Report.failure('Información','Credenciales erroneas, reintente','OK');
        Notiflix.Loading.remove();
    })
        }
    }


    const handleChange = event => {
        const target= event.target
        setFields(prevState =>{
          return {...prevState,[target.name]: target.value}
        })
    }
    const handleModalClose = () =>{
        setShow(false)
    }
 

    React.useEffect(() => {
        if(window.localStorage.getItem("server")){
          setFields(prevState =>{
            return {...prevState, server: window.localStorage.getItem("server") }
          })
        }
      }, [])
      React.useEffect(() => {
        setShow(props.show)
      }, [props.show])

   
        return (
    
            <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group as={Row}>
                    <Form.Label column sm="4">
                        Servidor: 
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control  name="server" value={fields.server} onChange={handleChange}/>
                   </Col> 
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="4">
                        Usuario: 
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control  name="userName" value={fields.userName} onChange={handleChange}/>
                   </Col> 
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="4">
                        Contraseña: 
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control  type="password" name="password" value={fields.password} onChange={handleChange}/>
                   </Col> 
                </Form.Group>

                <div className="text-center" >
                    <Button variant="primary" block onClick={logIn}>
                        Iniciar sesión
                    </Button>
                    <Button variant="secondary" block onClick={handleModalClose}>
                        Usar sin conexión
                    </Button>
                </div>

           </Modal.Body>
            </Modal>
            
            
            
        )
  }

  export default ModalLogin