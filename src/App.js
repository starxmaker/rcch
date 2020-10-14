import React from 'react';
import './App.css';
import Notiflix from "notiflix-react"
import Header from "./components/Header"
import {Database} from "./Database"
import RegistroContainer from "./components/Registro/RegistroContainer"
import Publicador from "./models/Publicador"
import Publico from "./models/Publico"
import Medio from "./models/Medio"
import Record from "./models/Record"
import {currentDatabase} from './Database'




import { library } from "@fortawesome/fontawesome-svg-core";
import { faAddressBook, faCog, faPlusSquare, faPencilAlt, faTrashAlt, faCommentDots, faEnvelope, faHandPaper, faBook, faUserEdit, faUndoAlt, faFile, faFolder, faDownload, faEllipsisH, faHistory, faChartPie, faMoon, faHiking} from "@fortawesome/free-solid-svg-icons";
library.add(faAddressBook, faCog,faPlusSquare, faPencilAlt, faTrashAlt, faCommentDots, faEnvelope, faHandPaper, faBook, faUserEdit, faUndoAlt, faFile, faFolder, faDownload, faEllipsisH, faHistory, faChartPie, faMoon, faHiking);

Notiflix.Report.Init({
  backgroundColor: '#222',
  success: {
      titleColor: '#bebebe',
      messageColor: '#bebebe',
      buttonColor: '#bebebe',
  }
})



const App=() =>{

  const [allPublicadores,setAllPublicadores]= React.useState([])
    const [allPublicos,setAllPublicos]= React.useState([])
    const [allMedios, setAllMedios]= React.useState([])
    const [allLetters, setAllLetters] = React.useState([])

    const refreshData =()=>{
      if(currentDatabase!=null){
       let receivedPublicadores=Publicador.getAllPublicadores()
       setAllPublicadores(receivedPublicadores)
       let receivedPublicos=Publico.getAllPublicos()
       setAllPublicos(receivedPublicos)
       let receivedMedios=Medio.getAllMedios()
       setAllMedios(receivedMedios)
       let receivedLetters=Record.getAllRecords()
       setAllLetters(receivedLetters)
      }

   }
  React.useEffect(() => {
    new Database(refreshData)
  }, [])

  


    return (
      
        <div className="App">
          
            <Header  />
            <RegistroContainer allLetters={allLetters} allPublicadores={allPublicadores} allPublicos={allPublicos} allMedios={allMedios} refreshData={refreshData} />
        </div>
      
    )
}



export default App;
