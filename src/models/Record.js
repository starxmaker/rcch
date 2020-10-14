import {currentDatabase} from "../Database"
class Record{
    constructor(id,hora,publicador,medio,publico,textos,tipo){
        this.id=id
        this.hora=hora
        this.publicador=publicador
        this.medio=medio
        this.publico=publico
        this.textos=textos
        this.tipo=tipo
    }
    static insert(publicador,medio,publico,textos,tipo){
        
            var date = new Date(); 
            var year=date.getFullYear()
            var month=date.getMonth()+1;
            if (month<10) month="0"+month;
            var day=date.getDate();
            if (day<10) day="0"+day;
            var hours=date.getHours();
            if(hours<10) hours="0"+hours;
            var minutes=date.getMinutes();
            if (minutes<10) minutes="0"+minutes;
            var seconds=date.getSeconds();
            if(seconds<10) seconds="0"+seconds;
            let hora=year+"-"+month+"-"+day+" "+hours + ":"  + minutes + ":"  + seconds;
            currentDatabase.executeCommand("insert into records (hora, publicador, medio, publico, textos, tipo) values ('"+hora+"',"+publicador+","+medio+","+publico+","+textos+","+tipo+")")
            let id=currentDatabase.getLastInsertedId("records")
           return new Record(id, hora, publicador, medio, publico, textos,tipo)
      
    }
    delete(){
        currentDatabase.executeCommand("delete from records where id="+this.id)
        return true
    }
    static getById(id){
        let results=currentDatabase.exec("select * from records where id="+id)
        if (results.length==0) return false
        return new Record(results[0].id, results[0].hora, results[0].publicador, results[0].medio, results[0].publico, results[0].textos, results[0].tipo)
    }
    static getAllRecords(){
        return currentDatabase.exec("select r.id, r.hora, r.textos, r.tipo, p.nombre as publicador, d.nombre as publico, m.nombre as medio from records r left join publicadores p on (r.publicador=p.id) left join publico d on (r.publico=d.id) left join medio m on (r.medio=m.id) order by 1 desc")
    }
    static getDailyStats(){
        var date = new Date(); 
            var year=date.getFullYear()
            var month=date.getMonth()+1;
            if (month<10) month="0"+month;
            var day=date.getDate();
            if (day<10) day="0"+day;
            let fecha=year+"-"+month+"-"+day;
            const stats=currentDatabase.exec("select count(*) as cartas, count(distinct(publicador)) as publicadores, sum(textos) as textos, SUM(CASE WHEN tipo = 1 THEN 1 ELSE 0 END) as revisitas, round(count(*)/count(distinct(publicador)),1) as porPublicador  from records where date(hora)=date('"+fecha+"')")
            let publicos=[]
            let statsPublico=currentDatabase.exec("select p.nombre as publico, count (r.id) as cartas, p.color  from records r left join publico p on (r.publico=p.id) group by publico having date('"+fecha+"')=date(hora)")
            statsPublico.map(item =>{
                publicos.push({
                    title: item.publico,
                    value: item.cartas,
                    color: item.color
                })
            })
            let statsMedio=currentDatabase.exec("select m.nombre as medio, count (r.id) as cartas, m.color  from records r left join medio m on (r.medio=m.id) group by medio having date('"+fecha+"')=date(hora)")
            let medios=[]
            statsMedio.map(item =>{
                medios.push({
                    title: item.medio,
                    value: item.cartas,
                    color:item.color
                })
            })
            return {
                cartas:stats[0].cartas,
            publicadores:stats[0].publicadores,
            textos:stats[0].textos,
            revisitas:stats[0].revisitas,
            porPublicador:stats[0].porPublicador,
            publicos: publicos,
            medios: medios
        
            }
        }
}
export default Record