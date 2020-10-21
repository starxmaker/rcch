import {currentDatabase} from "../Database"
class Publico{
    constructor(id,nombre, color){
        this.id=id
        this.nombre=nombre
        this.color=color
    }
    static async insert(nombre, color){
        if (currentDatabase.isOnline()){

            const results=await currentDatabase.postInformation("/publicos",{nombre: nombre, color: color})
            
            return new Publico(results.idPublico, results.nombre, results.color)
            
        }else{
            currentDatabase.executeCommand("insert into publico (nombre, color) values ('"+nombre+"', '"+color+"')")
            let id=currentDatabase.getLastInsertedId("publico")
            return new Publico(id, nombre, color)
        }
         
    }
    async delete(){
        if (currentDatabase.isOnline()){
            const result=await currentDatabase.deleteInformation("/publicos/"+this.id)
            return true
        }else {
        currentDatabase.executeCommand("delete from publico where id="+this.id)
        return true
        }
    }
    static async getById(id){
        if (currentDatabase.isOnline()){
            const result=await currentDatabase.getInformation("/publicos/"+id)
            return new Publico(result.idPublico,result.nombre, result.color)
        }else {
        let results=currentDatabase.exec("select * from publico where id="+id)
        if (results.length==0) return false
        return new Publico(results[0].id, results[0].nombre, results[0].color)
        }
    }
    static async getAllPublicos(){
        if (currentDatabase.isOnline()){
            const results=await currentDatabase.getInformation("/publicos/getAll")
            var allPublicos=[]
            results.forEach(item =>{
                allPublicos.push({value: item.idPublico, label: item.nombre})
            })
            
            return allPublicos
        }else{
        return currentDatabase.exec("select id as value, nombre as label from publico")
        }
    }
}
export default Publico