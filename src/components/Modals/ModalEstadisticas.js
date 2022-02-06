import React, {useState} from "react"
import Record from "../../models/Record"
import Modal from 'react-bootstrap/Modal'
import Notiflix from "notiflix"
import Carousel from 'react-bootstrap/Carousel'
import ChartLabel from "../Otros/ChartLabel"

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
            videos: 0,
            publicaciones: 0,
            revisitaDiff:[
                { title: 'One', value: 10, color: '#6f42c1' },
                { title: 'Two', value: 15, color: '#fd7e14' },
            ],
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
        async handleModalOpen(event){
            Notiflix.Loading.arrows('Cargando estadisticas');
            await loadData()
            setShow(true)
            Notiflix.Loading.remove()
        }
    }))

    const loadData=async ()=>{
        const stats= await Record.getDailyStats()
        if(stats){
            console.log(stats)
            setEstadisticas(stats)
        }
        
        
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
        <EstadisticasItem label="Textos" value={estadisticas.textos} icon="book" color={{color:"grey"}}   width="50%"/>
        <EstadisticasItem label="Revisitas" value={estadisticas.revisitas} icon="undo-alt" color={{color:"orange"}}  width="50%" />
        <EstadisticasItem label="Videos" value={estadisticas.videos} icon="film" color={{color:"cyan"}}  width="50%" />
        <EstadisticasItem label="Publicaciones" value={estadisticas.publicaciones} icon="file-alt" color={{color:"indigo"}}  width="100%" />
        
    
  </Carousel.Item>
  <Carousel.Item>
  <h1 className="display-5" style={{textAlign: "center"}}>¿Hemos hablado antes?</h1>
  <PieChart style={{height:300}}
  data={estadisticas.revisitaDiff}
  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
  labelStyle={{
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: "white"
  }
  }
/>
<div style={{textAlign: "center", paddingTop: 10}}>
{estadisticas.revisitaDiff.map (item =>{ return (<ChartLabel color={item.color} label ={item.title} />) })}
</div>


  </Carousel.Item>
  <Carousel.Item>
  <h1 className="display-5" style={{textAlign: "center"}}>¿A quién enviaremos?</h1>
  <PieChart style={{height:300}}
  data={estadisticas.publicos}
  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
  labelStyle={{
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: "white"
  }
  }
/>
<div style={{textAlign: "center", paddingTop: 10}}>
{estadisticas.publicos.map (item =>{ return (<ChartLabel color={item.color} label ={item.title} />) })}
</div>


  </Carousel.Item>
  <Carousel.Item>
  <h1 className="display-5" style={{textAlign: "center"}}>¿Cómo se enviarán?</h1>
  <PieChart style={{height:300}}
  data={estadisticas.medios}
  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
  labelStyle={{
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: "white"
  }
  }
/>

<div style={{textAlign: "center", paddingTop: 10}}>
{estadisticas.medios.map (item =>{ return (<ChartLabel color={item.color} label ={item.title} />) })}
</div>
  </Carousel.Item>
</Carousel>

        </Modal.Body>
        </Modal>
    )
})

export default ModalEstadisticas