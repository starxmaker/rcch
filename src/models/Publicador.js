import {currentDatabase} from "../Database"
class Publicador{
    constructor(id,nombre,grupo, invitado){
        this.id=id
        this.nombre=nombre
        this.grupo=grupo
        this.invitado=invitado
    }
    static insert(nombre, grupo, isInvitado){
            currentDatabase.executeCommand("insert into publicadores (nombre,grupo, invitado) values ('"+nombre+"',"+grupo+", "+isInvitado+")")
            let id=currentDatabase.getLastInsertedId("publicadores")
            return new Publicador(id, nombre, grupo, isInvitado)
         
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