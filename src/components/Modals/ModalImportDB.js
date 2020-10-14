import React, {useEffect} from "react"
import Modal from 'react-bootstrap/Modal'
import {currentDatabase} from '../../Database'
import Notiflix from "notiflix-react"





const ModalImportDB = React.forwardRef((props, ref) => {  
    const [show, setShow] = React.useState(false)
    const handleChange=e=>{
        let files=e.target.files
        handleFiles(files)
    }
    

    
    const handleModalClose=event =>{
        setShow(false)
    }
    React.useImperativeHandle(ref, () => ({
        handleModalOpen(event){
            setShow(true)
        }
    }))
    const handleFiles=(files)=>{
        currentDatabase.importDatabase(files, props.refreshData)
        
        handleModalClose()
        Notiflix.Report.Success('Información','Base de datos importada con éxito','OK');
    }
    
    const handleDrop=(e)=>{
        let dt = e.dataTransfer
  let files = dt.files
handleFiles(files)

    }

    const highlight =(e)=>{
        document.getElementById('drop-area').classList.add('highlight')
      }
      
    const unhighlight=(e) => {
        document.getElementById('drop-area').classList.remove('highlight')
      }
     const preventDefaults= (e) => {
        e.preventDefault()
        e.stopPropagation()
      }

      useEffect(() => {

        if (show){
            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                document.getElementById('drop-area').addEventListener(eventName, preventDefaults, false)
            })
            
            ;['dragenter', 'dragover'].forEach(eventName => {
                document.getElementById('drop-area').addEventListener(eventName, highlight, false)
            })

            ;['dragleave', 'drop'].forEach(eventName => {
                document.getElementById('drop-area').addEventListener(eventName, unhighlight, false)
            })

            document.getElementById('drop-area').addEventListener('drop', handleDrop, false)
            
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [show])
   
        return (
    
            <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Importar base de datos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div id="drop-area">
                <form className="my-form">
                    <p>Arrastre el archivo con extensión .RCCH o pulse el siguiente botón para buscarlo</p>
                    <input type="file" id="fileElem" name="fileElem" onChange={handleChange} />
                    <label className="btn btn-primary" htmlFor="fileElem">Buscar archivo</label>
                </form>
                </div>
            </Modal.Body>
            </Modal>
        )
  })

  export default ModalImportDB