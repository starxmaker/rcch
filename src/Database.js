import initSqlJs from "sql.js";

let currentDatabase

class Database{
    constructor(callback){
        
        initSqlJs().then(SQL => {
        this.SQL=SQL
        let database=window.localStorage.getItem("rcchDB")
        
        if(database==null){
           this.createDatabase()
        }else{
            this.db=new this.SQL.Database(this.toBinArray(database));
        }
        this.db.run("PRAGMA foreign_keys = ON;")
        currentDatabase=this
        if (callback!=null) callback()
    })
    }
    createDatabase(){
        this.db=new this.SQL.Database()
        this.buildInitialTables()
        this.insertInitialData()
        this.saveExistingDatabase()
    }

    importDatabase(files, callback){
    
        var f = files[0];
        var r = new FileReader();
        r.onload = () => {
            var Uints = new Uint8Array(r.result);
            this.db = new this.SQL.Database(Uints);
            if (callback!==null) callback()
            
        }
        r.readAsArrayBuffer(f);
        
    }
    getBDID(){
        return this.db.db
    }
    
    executeCommand(command){
        this.db.run(command)
        this.saveExistingDatabase()
    }
    saveExistingDatabase(){
        window.localStorage.setItem("rcchDB",this.toBinString(this.db.export()));
    }
    exportExistingDatabase(){
        var arraybuff = this.db.export();
		var blob = new Blob([arraybuff]);
		var a = document.createElement("a");
		document.body.appendChild(a);
        a.href = window.URL.createObjectURL(blob);
        var date = new Date(); 
        var year=date.getFullYear()
        var month=date.getMonth()+1;
        if (month<10) month="0"+month;
        var day=date.getDate();
        if (day<10) day="0"+day;
        let fecha=day+"-"+month+"-"+year;

		a.download = "registro_"+fecha+".rcch";
		a.onclick = function () {
			setTimeout(function () {
				window.URL.revokeObjectURL(a.href);
			}, 1500);
		};
		a.click();
    }
    buildInitialTables(){
       this.db.run("CREATE TABLE publicadores (id integer primary key autoincrement, nombre varchar(255) NOT NULL, isInvitado boolean);")
       this.db.run("CREATE TABLE medio (id integer primary key autoincrement, nombre varchar(255) NOT NULL, color varchar(255));")
       this.db.run("CREATE TABLE publico (id integer primary key autoincrement, nombre varchar(255) NOT NULL, color varchar(255));")
       this.db.run("CREATE TABLE records (id integer primary key autoincrement, hora datetime not null, publicador integer not null, medio integer NOT NULL, publico integer not null, textos integer not null, tipo integer not null, FOREIGN KEY (publicador) REFERENCES publicadores(id) ON DELETE CASCADE,FOREIGN KEY (publico) REFERENCES publico(id) ON DELETE CASCADE, FOREIGN KEY (medio) REFERENCES medio(id) ON DELETE CASCADE);")
    }
    insertInitialData(){

        this.db.run("insert into publico (nombre, color) values ('Público general', 'purple')");
        this.db.run("insert into publico (nombre, color) values ('Familiar', 'red')");
        this.db.run("insert into publico (nombre, color) values ('Conocido', 'green')");
        this.db.run("insert into publico (nombre, color) values ('Paciente', 'blue')");
        this.db.run("insert into publico (nombre, color) values ('Trabajador', 'grey')");

        this.db.run("insert into medio (nombre, color) values ('Personalmente', 'orange')");
        this.db.run("insert into medio (nombre, color) values ('WhatsApp', 'green')");
        this.db.run("insert into medio (nombre, color) values ('Email', 'blue')");
        this.db.run("insert into medio (nombre, color) values ('Teléfono', 'pink')");
        this.db.run("insert into medio (nombre, color) values ('Servicio postal', 'yellow')");
    }

    getLastInsertedId(table){
        let id=0
        let stmt = this.db.prepare("SELECT max(id) as id from "+table)
        stmt.getAsObject()
        
        while(stmt.step()) { //
            let row = stmt.getAsObject()
            id=row.id
            console.log("flag")
        }
        stmt.free()
        console.log(id)
        return id
    }
    exec(sql){
        let stmt = this.db.prepare(sql)
        stmt.getAsObject()
        let rows=[]
        while(stmt.step()) { //
            rows.push(stmt.getAsObject())
        }
        stmt.free()
        return rows;
        
    }

      toBinString (arr) {
        var uarr = new Uint8Array(arr);
        var strings = [], chunksize = 0xffff;
        // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
        for (var i=0; i*chunksize < uarr.length; i++){
            strings.push(String.fromCharCode.apply(null, uarr.subarray(i*chunksize, (i+1)*chunksize)));
        }
        return strings.join('');
    }
    
    toBinArray (str) {
        var l = str.length,
                arr = new Uint8Array(l);
        for (var i=0; i<l; i++) arr[i] = str.charCodeAt(i);
        return arr;
    }
    
}
export {Database, currentDatabase}