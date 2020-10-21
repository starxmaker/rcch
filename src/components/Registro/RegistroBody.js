import React from "react"
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Record from "../../models/Record"
import Publicador from "../../models/Publicador"
import Publico from "../../models/Publico"
import Medio from "../../models/Medio"
import ModalManage from "../Modals/ModalManage"
import Notiflix from "notiflix-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from "react-select"
import ModalLista from "../Modals/ModalLista"
import ModalIngresar from "../Modals/ModalIngresar"



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

const  RegistroBody = React.forwardRef((props, ref) => {
    const [showModalIngresarPublicador, setShowModalIngresarPublicador] =React.useState(false)
    const [showModalIngresarMedio, setShowModalIngresarMedio] =React.useState(false)
    const [showModalIngresarPublico, setShowModalIngresarPublico] =React.useState(false)
    const [fldForm,setFldForm] = React.useState({
        fldPublicador:{
            value:"0",
            label: "Seleccione"
        },
        fldDestinatario: 1,
        fldMedio:1,
        fldTextos:0,
        fldTipo:"0"
    });

    const modalRefPublicadores=React.useRef(null)
    const modalRefMedios=React.useRef(null)
    const modalRefPublicos=React.useRef(null)
    const modalRefLista=React.useRef(null)

 

    const handleModalOpen= tipo =>{
        if (tipo=="publicadores"){
            modalRefPublicadores.current.handleModalOpen()
        }else{
            if (tipo=="publicos"){
                modalRefPublicos.current.handleModalOpen()
            }else{
                if(tipo=="lista"){
                    modalRefLista.current.handleModalOpen()
                }else{
                    modalRefMedios.current.handleModalOpen()
                }
                
            }
        }
        //modalRef.current.handleModalOpen()
    }

    const resetForm=()=>{
            setFldForm({
                fldPublicador:{
                    value:"0",
                    label: "Seleccione"
                },
                fldDestinatario: 1,
                fldMedio:1,
                fldTextos:0,
                fldTipo:"0"
            })
        }
    React.useImperativeHandle(ref, () => ({
        reset(){
            resetForm()
        },
        openLista(){
            handleModalOpen("lista")
        }
    }))

    const replacePublicador=(item)=>{
        setFldForm({...fldForm,fldPublicador: item})
    }
  
    
    
    const handleChange= event =>{
        
        if("target" in event){
            let {name, value} = event.target
            setFldForm({...fldForm,[name]: value})
        }else{
            setFldForm({...fldForm,fldPublicador: event})
        }
       
    }
    const handleSubmit= async (event) =>{
        event.preventDefault()
        if (fldForm.fldPublicador.value==0) return false
        Notiflix.Loading.Arrows('Agregando registro');
        
        
        let currentRecord=await Record.insert(fldForm.fldPublicador.value,fldForm.fldMedio, fldForm.fldDestinatario, fldForm.fldTextos, fldForm.fldTipo)
        Notiflix.Loading.Remove()
        resetForm()
        Notiflix.Notify.Success("Registro agregado")
    }
    const increment=()=>{
        setFldForm(prevState=>{
            return {
                ...fldForm,
                fldTextos: prevState.fldTextos + 1
            }
        })
        
    }
    const decrement=()=>{
        setFldForm(prevState=>{
            return {
                ...fldForm,
                fldTextos: prevState.fldTextos - 1
            }
        })
    }
    const deletePublicador=async (id) =>{
        Notiflix.Loading.Arrows('Eliminando publicador');
        let targetPublicador= await Publicador.getById(id)
        if (targetPublicador!=false) await targetPublicador.delete()
        Notiflix.Notify.Success("Publicador eliminado")
        Notiflix.Loading.Remove()
        props.refreshData({publicadores: true})
    }
    const deleteMedio= async(id)=>{
        Notiflix.Loading.Arrows('Eliminando medio');
        let targetMedio=await Medio.getById(id)
        if (targetMedio!=false) await targetMedio.delete()
        Notiflix.Notify.Success("Medio eliminado")
        Notiflix.Loading.Remove()
        props.refreshData({medios: true})
    }
    const deletePublico= async(id)=>{
        Notiflix.Loading.Arrows('Eliminando público');
        let targetPublico=await Publico.getById(id)
        if (targetPublico!=false) await targetPublico.delete()
        Notiflix.Notify.Success("Publico eliminado")
        Notiflix.Loading.Remove()
        props.refreshData({publicos: true})
    }
    const openModalIngresar=(tipo)=>{
        if (tipo==="publicador"){
            setShowModalIngresarPublicador(true)
        }else{
            if (tipo==="medio"){
                setShowModalIngresarMedio(true)
            }else{
                setShowModalIngresarPublico(true)
            }
        }
    }
    const addPublicador= async( fields)=>{
        if (fields.nombre===null || fields.nombre===undefined || fields.nombre.trim()==="" ) return false
        if (fields.grupo===null || fields.grupo===undefined || fields.grupo.trim()==="" ) return false
        Notiflix.Loading.Arrows('Agregando publicador');
        let newObject= await Publicador.insert(fields.nombre, fields.grupo, fields.isInvitado)
        Notiflix.Loading.Remove()
        await props.refreshData({publicadores: true})
        Notiflix.Notify.Success("Publicador agregado")
        setFldForm({
            ...fldForm,
            fldPublicador:{
                value: newObject.id,
                label: newObject.nombre
            }
        })
        return true
    }
    const addMedio= async(fields)=>{
        if (fields.nombre===null || fields.nombre===undefined || fields.nombre.trim()==="" ) return false
        if (fields.color===null || fields.color===undefined || fields.color.trim()==="" ) return false
        Notiflix.Loading.Arrows('Agregando medio');
       
        let newObject=await Medio.insert(fields.nombre, fields.color)
        Notiflix.Loading.Remove()
        await props.refreshData({medios:true})
        Notiflix.Notify.Success("Medio agregado")
        setFldForm({
            ...fldForm,
            fldMedio:newObject.id
        })
        return true
    }
    const addPublico= async(fields)=>{
        if (fields.nombre===null || fields.nombre===undefined || fields.nombre.trim()==="" ) return false
        if (fields.color===null || fields.color===undefined || fields.color.trim()==="" ) return false
        Notiflix.Loading.Arrows('Agregando público');
        let newObject=await Publico.insert(fields.nombre, fields.color)
        Notiflix.Loading.Remove()
        Notiflix.Notify.Success("Publico agregado")
        await props.refreshData({publicos: true})
        
        setFldForm({
            ...fldForm,
            fldDestinatario: newObject.id
        })
        return true
    }
        return(
            <Form onSubmit={handleSubmit}>
                
            <div className="card-body">
                <div className="container" >
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Publicador
                        </Form.Label>
                        <Col sm="8">
                        <InputGroup>
                            <Select options={props.allPublicadores} styles={customStyles} name="fldPublicador" value={fldForm.fldPublicador} onChange={handleChange} />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={() => {openModalIngresar("publicador")}}><FontAwesomeIcon icon="plus-square"/></Button>                  
                                <Button variant="outline-secondary" onClick={()=> handleModalOpen("publicadores")}><FontAwesomeIcon icon="pencil-alt" /></Button>
                                <Button variant="outline-secondary" onClick={()=> handleModalOpen("lista")}><FontAwesomeIcon icon="ellipsis-h" /></Button>
                               
                                
                                <ModalManage tipo="Publicadores" allElements={props.allPublicadores} ref={modalRefPublicadores}
                                        refreshData={props.refreshData} deleteFunction={deletePublicador}/>
                                <ModalIngresar 
                                show={showModalIngresarPublicador} 
                                setShow={setShowModalIngresarPublicador} 
                                tipo="Publicador"
                                submitFunction={addPublicador}
                                fields={[
                                    {name: "nombre", type: "text", label: "Nombre", default: ""}, 
                                    {name: "grupo", type: "number", label: "Grupo", default: "0"}, 
                                    {name: "isInvitado", type: "checkbox", label: "¿Es invitado?", default:false}]} 
                                />

                            </InputGroup.Append>
                        </InputGroup>   
                       </Col> 
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Destinatario
                        </Form.Label>
                        <Col sm="8">
                            <InputGroup>
                            <Form.Control as="select" name="fldDestinatario" value={fldForm.fldDestinatario} onChange={handleChange}>
                                { props.allPublicos.map(item => <option key={item.value} value={item.value}>{item.label}</option> ) }
                            </Form.Control>
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={() => {openModalIngresar("publico")}}><FontAwesomeIcon icon="plus-square" /></Button>
                                <Button variant="outline-secondary" onClick={()=> handleModalOpen("publicos")}><FontAwesomeIcon icon="pencil-alt" /></Button>
                                <ModalManage tipo="Destinatarios" allElements={props.allPublicos} ref={modalRefPublicos}
                                    refreshData={props.refreshData} deleteFunction={deletePublico}/>
                                    <ModalIngresar 
                                show={showModalIngresarPublico} 
                                setShow={setShowModalIngresarPublico} 
                                tipo="Destinatario"
                                submitFunction={addPublico}
                                fields={[
                                    {name: "nombre", type: "text", label: "Nombre", default: ""}, 
                                    {name: "color", type: "color", label: "Color", default:""}]} 
                                />
                            </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Medio
                        </Form.Label>
                        <Col sm="8">
                            <InputGroup>
                            <Form.Control as="select" name="fldMedio" value={fldForm.fldMedio} onChange={handleChange}>
                            { props.allMedios.map(item => <option key={item.value} value={item.value}>{item.label}</option> ) }
                            
                            </Form.Control>
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={() => {openModalIngresar("medio")}}><FontAwesomeIcon icon="plus-square" /></Button>
                                <Button variant="outline-secondary" onClick={()=> handleModalOpen("medios")}><FontAwesomeIcon icon="pencil-alt" /></Button>
                                <ModalManage tipo="Medios" allElements={props.allMedios} ref={modalRefMedios}
                                    refreshData={props.refreshData} deleteFunction={deleteMedio}/>
                                <ModalIngresar 
                                show={showModalIngresarMedio} 
                                setShow={setShowModalIngresarMedio} 
                                tipo="Medio"
                                submitFunction={addMedio}
                                fields={[
                                    {name: "nombre", type: "text", label: "Nombre", default: ""}, 
                                    {name: "color", type: "color", label: "Color", default:""}]} 
                                />
                            </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Textos bíblicos
                        </Form.Label>
                        <Col sm="8">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <Button variant="outline-secondary" onClick={decrement}>-</Button>
                            </InputGroup.Prepend>
                            <FormControl name="fldTextos" value={fldForm.fldTextos} onChange={handleChange}/>
                                
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={increment}>+</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Tipo
                        </Form.Label>
                        <Col sm="8">
                                <Form.Check 
                                    type="radio"
                                    name="fldTipo"
                                    label="Primera visita"
                                    value="0"
                                    checked={fldForm.fldTipo==="0"}
                                    onChange={handleChange}
                                />

                                <Form.Check
                                    type="radio"
                                    label="Revisita"
                                    name="fldTipo"
                                    value="1"
                                    checked={fldForm.fldTipo==="1"}
                                    onChange={handleChange}
                                />
                        </Col>
                    </Form.Group>
                </div>
                <div className="text-center" >
                    <Button variant="primary" type="submit">
                        Guardar registro
                    </Button>
                </div>
            </div>
            <ModalLista allPublicadores={props.allPublicadores} ref={modalRefLista}
                                       addPublicador={addPublicador} refreshData={props.refreshData} replacePublicador={replacePublicador} />
         
            
            </Form>
        )
})
export default RegistroBody