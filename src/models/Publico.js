import {currentDatabase} from "../Database"
class Publico{
    constructor(id,nombre, color){
        this.id=id
        this.nombre=nombre
        this.color=color
    }
    static insert(nombre, color){
            currentDatabase.executeCommand("insert into publico (nombre, color) values ('"+nombre+"', '"+color+"')")
            let id=currentDatabase.getLastInsertedId("publico")
            return new Publico(id, nombre, color)
         
    }
    delete(){
        currentDatabase.executeCommand("delete from publico where id="+this.id)
        return true
    }
    static getById(id){
        let results=currentDatabase.exec("select * from publico where id="+id)
        if (results.length==0) return false
        return new Publico(results[0].id, results[0].nombre, results[0].color)
    }
    static getAllPublicos(){
        return currentDatabase.exec("select id as value, nombre as label from publico")
    }
}
export default Publico