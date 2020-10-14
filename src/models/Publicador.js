import {currentDatabase} from "../Database"
class Publicador{
    constructor(id,nombre, isInvitado){
        this.id=id
        this.nombre=nombre
        this.isInvitado=isInvitado
    }
    static insert(nombre, isInvitado){
            currentDatabase.executeCommand("insert into publicadores (nombre, isInvitado) values ('"+nombre+"', "+isInvitado+")")
            let id=currentDatabase.getLastInsertedId("publicadores")
            return new Publicador(id, nombre, isInvitado)
         
    }
    delete(){
        currentDatabase.executeCommand("delete from publicadores where id="+this.id)
        return true
    }
    static getById(id){
        let results=currentDatabase.exec("select * from publicadores where id="+id)
        if (results.length==0) return false
        return new Publicador(results[0].id, results.[0].nombre, results[0].isInvitado)
    }
    static getAllPublicadores(){
        return currentDatabase.exec("select id as value, nombre as label from publicadores")
    }
}
export default Publicador