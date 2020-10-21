import {currentDatabase} from "../Database"
class Medio{
    constructor(id,nombre, color){
        this.id=id
        this.nombre=nombre
        this.color=color
    }
    static async insert(nombre, color){
        if (currentDatabase.isOnline()){

            const results=await currentDatabase.postInformation("/medios",{nombre: nombre, color: color})
            
            return new Medio(results.idMedio, results.nombre, results.color)
            
        }else{
            currentDatabase.executeCommand("insert into medio (nombre, color) values ('"+nombre+"', '"+color+"')")
            let id=currentDatabase.getLastInsertedId("medio")
            return new Medio(id, nombre, color)
        }
         
    }
    async delete(){
        if (currentDatabase.isOnline()){
            const result=await currentDatabase.deleteInformation("/medios/"+this.id)
            return true
        }else {
        currentDatabase.executeCommand("delete from medio where id="+this.id)
        return true
        }
    }
    static async getById(id){
        if (currentDatabase.isOnline()){
            const result=await currentDatabase.getInformation("/medios/"+id)
            return new Medio(result.idMedio,result.nombre, result.color)
        }else {
        let results=currentDatabase.exec("select * from medio where id="+id)
        if (results.length==0) return false
        return new Medio(results[0].id, results[0].nombre, results[0].color)
        }
    }
    static getAllMedios=async() =>{
        if (currentDatabase.isOnline()){
            const results=await currentDatabase.getInformation("/medios/getAll")
            var allMedios=[]
            results.forEach(item =>{
                allMedios.push({value: item.idMedio, label: item.nombre})
            })
            
            return allMedios
        }else{
            return currentDatabase.exec("select id as value, nombre as label from medio")
        }
    }
}
export default Medio