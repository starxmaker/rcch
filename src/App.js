import React from 'react';
import './App.css';
import Notiflix from "notiflix"
import Header from "./components/Header"
import {Database} from "./Database"
import RegistroContainer from "./components/Registro/RegistroContainer"
import ModalLogin from "./components/Modals/ModalLogin"
import Publicador from "./models/Publicador"
import Publico from "./models/Publico"
import Medio from "./models/Medio"
import Record from "./models/Record"
import {currentDatabase} from './Database'




import { library } from "@fortawesome/fontawesome-svg-core";
import { faAddressBook, faCog, faPlusSquare, faPencilAlt, faTrashAlt, faCommentDots, faEnvelope, faHandPaper, faBook, faUserEdit, faUndoAlt, faFile, faFolder, faDownload, faEllipsisH, faHistory, faChartPie, faMoon, faHiking, faSignOutAlt, faFilm, faFileAlt} from "@fortawesome/free-solid-svg-icons";
library.add(faAddressBook, faCog,faPlusSquare, faPencilAlt, faTrashAlt, faCommentDots, faEnvelope, faHandPaper, faBook, faUserEdit, faUndoAlt, faFile, faFolder, faDownload, faEllipsisH, faHistory, faChartPie, faMoon, faHiking, faSignOutAlt, faFilm, faFileAlt);

Notiflix.Report.init({
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
    const [showLogin, setShowLogin] =React.useState(false)
    const [online, setOnline] = React.useState(false)

    const refreshData = async (filtros)=>{
      if (filtros==undefined) filtros={publicadores: true, publicos:true, medios:true, records:true}
      if(currentDatabase!=null){
        
        if(window.localStorage.getItem("sessionToken")!=undefined  && window.localStorage.getItem("sessionToken")!=""){
          let response = await currentDatabase.initOnlineServer(window.localStorage.getItem("server"), window.localStorage.getItem("sessionToken"))
          
          if (response){
            setOnline(true)
              handleShowLogin(false)
            }else{
              handleShowLogin(true)
            }
          }else{
            handleShowLogin(true)
          }
       if (filtros.publicadores){
          let receivedPublicadores=await Publicador.getAllPublicadores()
          setAllPublicadores(receivedPublicadores)
       }
       if (filtros.publicos){
          let receivedPublicos=await Publico.getAllPublicos()
          setAllPublicos(receivedPublicos)
       }
       if (filtros.medios){
              
       let receivedMedios= await Medio.getAllMedios()
       setAllMedios(receivedMedios)
       }
       if (filtros.records){
       let receivedLetters=await Record.getAllRecords()
       setAllLetters(receivedLetters)
       }
       Notiflix.Loading.remove()
      }

   }
   
   const handleServerLogin = async (server, token) =>{
    const result= await currentDatabase.initOnlineServer(server,token)
    if (result){
      refreshData({publicadores: true, publicos:true, medios:true, records:true})
      setOnline(true)
    }
}
const handleShowLogin = show=>{
  setShowLogin(show)
}




React.useEffect(() => {
  Notiflix.Loading.arrows('Cargando ambiente');
  new Database(refreshData)
  
}, [])


  


    return (
      
        <div className="App">
          <ModalLogin show={showLogin} handleServerLogin={handleServerLogin} />
            <Header  />
            <RegistroContainer allLetters={allLetters} allPublicadores={allPublicadores} allPublicos={allPublicos} allMedios={allMedios} refreshData={refreshData} online={online} />
        </div>
      
    )
}



export default App;
