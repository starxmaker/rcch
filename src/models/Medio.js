import {currentDatabase} from "../Database"
class Medio{
    constructor(id,nombre, color){
        this.id=id
        this.nombre=nombre
        this.color=color
    }
    static insert(nombre, color){
            currentDatabase.executeCommand("insert into medio (nombre, color) values ('"+nombre+"', '"+color+"')")
            let id=currentDatabase.getLastInsertedId("medio")
            return new Medio(id, nombre, color)
         
    }
    delete(){
        currentDatabase.executeCommand("delete from medio where id="+this.id)
        return true
    }
    static getById(id){
        let results=currentDatabase.exec("select * from medio where id="+id)
        if (results.length==0) return false
        return new Medio(results[0].id, results[0].nombre, results[0].color)
    }
    static getAllMedios(){
        return currentDatabase.exec("select id as value, nombre as label from medio")
    }
}
export default Medio