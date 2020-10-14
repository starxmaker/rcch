import React, {useState} from "react"
import Record from "../../models/Record"
import Modal from 'react-bootstrap/Modal'
import Notiflix from "notiflix-react"
import Carousel from 'react-bootstrap/Carousel'

import { PieChart } from 'react-minimal-pie-chart'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EstadisticasItem= (props) =>{
    return (
        <div style={{float:"left", width: props.width, textAlign: "center", height: 80, marginTop:10}}> 
            <h4>{props.label}</h4>
            <h4 styles={{marginTop: 10}}>
                {props.value} <FontAwesomeIcon icon={props.icon} style={props.color} />
            </h4>
        </div>
    )
}




const ModalEstadisticas= React.forwardRef((props, ref)=>{
    const [show, setShow] = React.useState(false) 
    const [estadisticas, setEstadisticas] = React.useState(
        {
            cartas:0,
            publicadores:0,
            textos:0,
            revisitas:0,
            porPublicador:0,
            publicos:[
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' }
            ],
            medios: [
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' }
            ]
        })
    
       
    const handleModalClose=event =>{
        setShow(false)
    }

    React.useImperativeHandle(ref, () => ({
        handleModalOpen(event){
            setShow(true)
            loadData()
        }
    }))

    const loadData=()=>{
        const stats= Record.getDailyStats()
        setEstadisticas(stats)
        
    }
    return (
        <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
            <Modal.Title>Estadísticas del día de hoy</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Carousel interval={5000000000}>
  <Carousel.Item>
  <h1 className="display-5" style={{textAlign: "center"}}>¿Cómo nos fue?</h1>
        <EstadisticasItem label="Cartas" value={estadisticas.cartas} icon="envelope" color={{color:"brown"}}   width="50%"/>
        <EstadisticasItem label="Publicadores" value={estadisticas.publicadores} icon="hand-paper" color={{color:"green"}}  width="50%" />
        <EstadisticasItem label="Textos" value={estadisticas.textos} icon="book" color={{color:"grey"}}   width="50%"/>
        <EstadisticasItem label="Revisitas" value={estadisticas.revisitas} icon="undo-alt" color={{color:"orange"}}  width="50%" />
        <EstadisticasItem label="Cartas por publicador" value={estadisticas.porPublicador} icon="user-edit" color={{color:"blue"}}  width="100%" />

    
  </Carousel.Item>
  <Carousel.Item>
  <h1 className="display-5" style={{textAlign: "center"}}>¿A quién enviaremos?</h1>
  <PieChart style={{height:300}}
  data={estadisticas.publicos}
  label={({ dataEntry }) => `${dataEntry.title+": "+Math.round(dataEntry.percentage)} %`}
  labelStyle={{
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: "white"
  }
  }
/>

  </Carousel.Item>
  <Carousel.Item>
  <h1 className="display-5" style={{textAlign: "center"}}>¿Cómo se enviarán?</h1>
  <PieChart style={{height:300}}
  data={estadisticas.medios}
  label={({ dataEntry }) => `${dataEntry.title+": "+Math.round(dataEntry.percentage)} %`}
  labelStyle={{
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: "white"
  }
  }
/>
  </Carousel.Item>
</Carousel>

        </Modal.Body>
        </Modal>
    )
})

export default ModalEstadisticas