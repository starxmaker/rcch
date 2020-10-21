import {currentDatabase} from "../Database"
class Publicador{
    constructor(id,nombre,grupo, invitado){
        this.id=id
        this.nombre=nombre
        this.grupo=grupo
        this.invitado=invitado
    }
    static async insert(nombre, grupo, isInvitado){
        if (currentDatabase.isOnline()){

            const results=await currentDatabase.postInformation("/publicadores",{nombre: nombre, grupo: grupo, invitado: isInvitado})
            
            return new Publicador(results.idPublicador, results.nombre, results.grupo, results.invitado)
            
        }else{
            currentDatabase.executeCommand("insert into publicadores (nombre,grupo, invitado) values ('"+nombre+"',"+grupo+", "+isInvitado+")")
            let id=currentDatabase.getLastInsertedId("publicadores")
            return new Publicador(id, nombre, grupo, isInvitado)
        }
         
    }
    async delete(){
        if (currentDatabase.isOnline()){
            const result=await currentDatabase.deleteInformation("/publicadores/"+this.id)
            return true
        }else {
            currentDatabase.executeCommand("delete from publicadores where id="+this.id)
            return true
        }
    }
    static async getById(id){
        if (currentDatabase.isOnline()){
            const result=await currentDatabase.getInformation("/publicadores/"+id)
            return new Publicador(result.idPublicador,result.nombre, result.grupo, result.invitado )
        }else {
            let results=currentDatabase.exec("select * from publicadores where id="+id)
            if (results.length==0) return false
            return new Publicador(results[0].id, results[0].nombre, results[0].isInvitado)
        }

    }
    static async getAllPublicadores(){
        if (currentDatabase.isOnline()){
            const results=await currentDatabase.getInformation("/publicadores/getAll")
            var allPublicadores=[]
            results.forEach(item =>{
                allPublicadores.push({value: item.idPublicador, label: item.nombre})
            })
            
            return allPublicadores
        }else{
        return currentDatabase.exec("select id as value, nombre as label from publicadores")
        }
    }
}
export default Publicador