(this.webpackJsonprcch=this.webpackJsonprcch||[]).push([[0],{162:function(e,a,t){e.exports=t(269)},167:function(e,a,t){},168:function(e,a,t){},177:function(e,a){},179:function(e,a){},190:function(e,a){},192:function(e,a){},217:function(e,a){},219:function(e,a){},220:function(e,a){},226:function(e,a){},228:function(e,a){},246:function(e,a){},248:function(e,a){},260:function(e,a){},263:function(e,a){},269:function(e,a,t){"use strict";t.r(a);var n,r=t(0),o=t.n(r),l=t(21),i=t.n(l),c=(t(167),t(11)),u=(t(168),t(16)),s=t(10),d=function(){return o.a.createElement("nav",{className:"navbar navbar-expand-md shadow-sm"},o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"navbar-brand deco-none"},o.a.createElement(s.a,{icon:"address-book"})," Registro de Cartas Congregaci\xf3n La Herradura")))},m=t(27),f=t(28),b=t(158),p=t.n(b),E=function(){function e(a){var t=this;Object(m.a)(this,e),p()().then((function(e){t.SQL=e;var r=window.localStorage.getItem("rcchDB");null==r?t.createDatabase():t.db=new t.SQL.Database(t.toBinArray(r)),t.db.run("PRAGMA foreign_keys = ON;"),n=t,null!=a&&a()}))}return Object(f.a)(e,[{key:"createDatabase",value:function(){this.db=new this.SQL.Database,this.buildInitialTables(),this.insertInitialData(),this.saveExistingDatabase()}},{key:"importDatabase",value:function(e,a){var t=this,n=e[0],r=new FileReader;r.onload=function(){var e=new Uint8Array(r.result);t.db=new t.SQL.Database(e),null!==a&&a()},r.readAsArrayBuffer(n)}},{key:"getBDID",value:function(){return this.db.db}},{key:"executeCommand",value:function(e){this.db.run(e),this.saveExistingDatabase()}},{key:"saveExistingDatabase",value:function(){window.localStorage.setItem("rcchDB",this.toBinString(this.db.export()))}},{key:"exportExistingDatabase",value:function(){var e=this.db.export(),a=new Blob([e]),t=document.createElement("a");document.body.appendChild(t),t.href=window.URL.createObjectURL(a);var n=new Date,r=n.getFullYear(),o=n.getMonth()+1;o<10&&(o="0"+o);var l=n.getDate();l<10&&(l="0"+l);var i=l+"-"+o+"-"+r;t.download="registro_"+i+".rcch",t.onclick=function(){setTimeout((function(){window.URL.revokeObjectURL(t.href)}),1500)},t.click()}},{key:"buildInitialTables",value:function(){this.db.run("CREATE TABLE publicadores (id integer primary key autoincrement, nombre varchar(255) NOT NULL, grupo int(11) not null default '0', invitado boolean);"),this.db.run("CREATE TABLE medio (id integer primary key autoincrement, nombre varchar(255) NOT NULL, color varchar(255));"),this.db.run("CREATE TABLE publico (id integer primary key autoincrement, nombre varchar(255) NOT NULL, color varchar(255));"),this.db.run("CREATE TABLE records (id integer primary key autoincrement, hora datetime not null, publicador integer not null, medio integer NOT NULL, publico integer not null, textos integer not null, tipo integer not null, FOREIGN KEY (publicador) REFERENCES publicadores(id) ON DELETE CASCADE,FOREIGN KEY (publico) REFERENCES publico(id) ON DELETE CASCADE, FOREIGN KEY (medio) REFERENCES medio(id) ON DELETE CASCADE);")}},{key:"insertInitialData",value:function(){this.db.run("insert into publico (nombre, color) values ('P\xfablico general', 'purple')"),this.db.run("insert into publico (nombre, color) values ('Familiar', 'red')"),this.db.run("insert into publico (nombre, color) values ('Conocido', 'green')"),this.db.run("insert into publico (nombre, color) values ('Paciente', 'blue')"),this.db.run("insert into publico (nombre, color) values ('Trabajador', 'grey')"),this.db.run("insert into medio (nombre, color) values ('Personalmente', 'orange')"),this.db.run("insert into medio (nombre, color) values ('WhatsApp', 'green')"),this.db.run("insert into medio (nombre, color) values ('Email', 'blue')"),this.db.run("insert into medio (nombre, color) values ('Tel\xe9fono', 'pink')"),this.db.run("insert into medio (nombre, color) values ('Servicio postal', 'yellow')")}},{key:"getLastInsertedId",value:function(e){var a=0,t=this.db.prepare("SELECT max(id) as id from "+e);for(t.getAsObject();t.step();){a=t.getAsObject().id,console.log("flag")}return t.free(),console.log(a),a}},{key:"exec",value:function(e){var a=this.db.prepare(e);a.getAsObject();for(var t=[];a.step();)t.push(a.getAsObject());return a.free(),t}},{key:"toBinString",value:function(e){for(var a=new Uint8Array(e),t=[],n=0;65535*n<a.length;n++)t.push(String.fromCharCode.apply(null,a.subarray(65535*n,65535*(n+1))));return t.join("")}},{key:"toBinArray",value:function(e){for(var a=e.length,t=new Uint8Array(a),n=0;n<a;n++)t[n]=e.charCodeAt(n);return t}}]),e}(),v=t(161),h=t(160),g=function(e){Object(v.a)(t,e);var a=Object(h.a)(t);function t(){return Object(m.a)(this,t),a.apply(this,arguments)}return Object(f.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"container",style:{marginTop:"2%"}},o.a.createElement("div",{className:"row justify-content-center"},o.a.createElement("div",{className:"col-md-8"},o.a.createElement("div",{className:"card"},this.props.children))))}}]),t}(o.a.Component),y=t(40),O=t(6),k=t(47),w=t(13),j=t(20),C=t(23),x=t(33),D=t(29),A=function(){function e(a,t,n,r,o,l,i){Object(m.a)(this,e),this.id=a,this.hora=t,this.publicador=n,this.medio=r,this.publico=o,this.textos=l,this.tipo=i}return Object(f.a)(e,[{key:"delete",value:function(){return n.executeCommand("delete from records where id="+this.id),!0}}],[{key:"insert",value:function(a,t,r,o,l){var i=new Date,c=i.getFullYear(),u=i.getMonth()+1;u<10&&(u="0"+u);var s=i.getDate();s<10&&(s="0"+s);var d=i.getHours();d<10&&(d="0"+d);var m=i.getMinutes();m<10&&(m="0"+m);var f=i.getSeconds();f<10&&(f="0"+f);var b=c+"-"+u+"-"+s+" "+d+":"+m+":"+f;return n.executeCommand("insert into records (hora, publicador, medio, publico, textos, tipo) values ('"+b+"',"+a+","+t+","+r+","+o+","+l+")"),new e(n.getLastInsertedId("records"),b,a,t,r,o,l)}},{key:"getById",value:function(a){var t=n.exec("select * from records where id="+a);return 0!=t.length&&new e(t[0].id,t[0].hora,t[0].publicador,t[0].medio,t[0].publico,t[0].textos,t[0].tipo)}},{key:"getAllRecords",value:function(){return n.exec("select r.id, r.hora, r.textos, r.tipo, p.nombre as publicador, d.nombre as publico, m.nombre as medio from records r left join publicadores p on (r.publicador=p.id) left join publico d on (r.publico=d.id) left join medio m on (r.medio=m.id) order by 1 desc")}},{key:"getDailyStats",value:function(){var e=new Date,a=e.getFullYear(),t=e.getMonth()+1;t<10&&(t="0"+t);var r=e.getDate();r<10&&(r="0"+r);var o=a+"-"+t+"-"+r,l=n.exec("select count(*) as cartas, count(distinct(publicador)) as publicadores, sum(textos) as textos, SUM(CASE WHEN tipo = 1 THEN 1 ELSE 0 END) as revisitas, round(count(*)/count(distinct(publicador)),1) as porPublicador  from records where date(hora)=date('"+o+"')"),i=[];n.exec("select p.nombre as publico, count (r.id) as cartas, p.color  from records r left join publico p on (r.publico=p.id) group by publico having date('"+o+"')=date(hora)").map((function(e){i.push({title:e.publico,value:e.cartas,color:e.color})}));var c=n.exec("select m.nombre as medio, count (r.id) as cartas, m.color  from records r left join medio m on (r.medio=m.id) group by medio having date('"+o+"')=date(hora)"),u=[];return c.map((function(e){u.push({title:e.medio,value:e.cartas,color:e.color})})),{cartas:l[0].cartas,publicadores:l[0].publicadores,textos:l[0].textos,revisitas:l[0].revisitas,porPublicador:l[0].porPublicador,publicos:i,medios:u}}}]),e}(),N=function(){function e(a,t,n,r){Object(m.a)(this,e),this.id=a,this.nombre=t,this.grupo=n,this.invitado=r}return Object(f.a)(e,[{key:"delete",value:function(){return n.executeCommand("delete from publicadores where id="+this.id),!0}}],[{key:"insert",value:function(a,t,r){return n.executeCommand("insert into publicadores (nombre,grupo, invitado) values ('"+a+"',"+t+", "+r+")"),new e(n.getLastInsertedId("publicadores"),a,t,r)}},{key:"getById",value:function(a){var t=n.exec("select * from publicadores where id="+a);return 0!=t.length&&new e(t[0].id,t[0].nombre,t[0].isInvitado)}},{key:"getAllPublicadores",value:function(){return n.exec("select id as value, nombre as label from publicadores")}}]),e}(),S=function(){function e(a,t,n){Object(m.a)(this,e),this.id=a,this.nombre=t,this.color=n}return Object(f.a)(e,[{key:"delete",value:function(){return n.executeCommand("delete from publico where id="+this.id),!0}}],[{key:"insert",value:function(a,t){return n.executeCommand("insert into publico (nombre, color) values ('"+a+"', '"+t+"')"),new e(n.getLastInsertedId("publico"),a,t)}},{key:"getById",value:function(a){var t=n.exec("select * from publico where id="+a);return 0!=t.length&&new e(t[0].id,t[0].nombre,t[0].color)}},{key:"getAllPublicos",value:function(){return n.exec("select id as value, nombre as label from publico")}}]),e}(),I=function(){function e(a,t,n){Object(m.a)(this,e),this.id=a,this.nombre=t,this.color=n}return Object(f.a)(e,[{key:"delete",value:function(){return n.executeCommand("delete from medio where id="+this.id),!0}}],[{key:"insert",value:function(a,t){return n.executeCommand("insert into medio (nombre, color) values ('"+a+"', '"+t+"')"),new e(n.getLastInsertedId("medio"),a,t)}},{key:"getById",value:function(a){var t=n.exec("select * from medio where id="+a);return 0!=t.length&&new e(t[0].id,t[0].nombre,t[0].color)}},{key:"getAllMedios",value:function(){return n.exec("select id as value, nombre as label from medio")}}]),e}(),T=t(9),L=o.a.forwardRef((function(e,a){var t=o.a.useState(!1),n=Object(c.a)(t,2),r=n[0],l=n[1];return o.a.useImperativeHandle(a,(function(){return{handleModalOpen:function(e){l(!0)}}})),o.a.createElement(T.a,{show:r,onHide:function(e){l(!1)}},o.a.createElement(T.a.Header,{closeButton:!0},o.a.createElement(T.a.Title,null,"Gestionar ",e.tipo)),o.a.createElement(T.a.Body,null,e.allElements.map((function(a){return o.a.createElement("a",{key:a.value,className:"list-group-item list-group-item-action flex-column align-items-start"},o.a.createElement("div",{key:"div"+a.value,className:"d-flex w-100 justify-content-between"},o.a.createElement("h5",{key:"h5"+a.value,className:"mb-1"},a.label),o.a.createElement("small",{key:"small"+a.value,className:"text-muted"},o.a.createElement(s.a,{key:"fw"+a.value,onClick:function(){return e.deleteFunction(a.value)},icon:"trash-alt"}))))}))))})),P=t(80),B=t(104),R={menu:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{backgroundColor:"#181818",color:"#AEBEAE",zIndex:3})},option:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{backgroundColor:a.isFocused?"#222222":"181818",color:"#AEBEAE"})},input:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{color:"#AEBEAE"})},control:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{background:"transparent",borderColor:"#404040"})},singleValue:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{color:"#AEBEAE"})}},M=o.a.forwardRef((function(e,a){var t=o.a.useState(!1),n=Object(c.a)(t,2),r=n[0],l=n[1],i=o.a.useState([]),d=Object(c.a)(i,2),m=d[0],f=d[1],b=o.a.useState([]),p=Object(c.a)(b,2),E=p[0],v=p[1],h=function(e){l(!1)};o.a.useImperativeHandle(a,(function(){return{handleModalOpen:function(e){l(!0)}}}));var g=function(e){for(var a=[],t=0;t<m.length;t++)a.push(m[t]);if(-1!=a.indexOf(e))return!1;if(y(e))a.push(e);else{for(var n=!0,r=0;r<a.length;r++)if(y(a[r])){a.splice(r,0,e),n=!1;break}n&&a.push(e)}f(a)},y=function(e){return-1!=E.indexOf(e)},O=function(e){var a=Object(B.a)(m);a.splice(a.indexOf(e),1),f(a)};return o.a.createElement(T.a,{show:r,onHide:h},o.a.createElement(T.a.Header,{closeButton:!0},o.a.createElement(T.a.Title,null,"Lista de espera")),o.a.createElement(T.a.Body,null,o.a.createElement(w.a.Group,{as:x.a},o.a.createElement(w.a.Label,{column:!0,sm:"4"},"Publicador"),o.a.createElement(D.a,{sm:"8"},o.a.createElement(C.a,null,o.a.createElement(P.a,{options:e.allPublicadores,styles:R,name:"fldPublicador",onChange:function(e){g(e),u.a.Notify.Success("Publicador agregado a la lista")}}),o.a.createElement(C.a.Append,null,o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){var a=window.prompt("Ingrese nombre del invitado");if(null===a||void 0===a||""===a.trim())return!1;var t=N.insert(a,0,!0);return e.refreshData(),u.a.Notify.Success("Invitado agregado"),g({label:a,value:t.id}),!0}},o.a.createElement(s.a,{icon:"hiking"})))))),o.a.createElement("div",{styles:{paddingTop:"20%"}},m.map((function(a,t){return o.a.createElement("a",{key:a.value,className:"list-group-item list-group-item-action flex-column align-items-start"},o.a.createElement("div",{className:"d-flex w-100 justify-content-between"},o.a.createElement("h5",{className:"mb-1",onClick:function(){var t;O(t=a),v([].concat(Object(B.a)(E),[t])),e.replacePublicador(t),h()}},o.a.createElement("span",{className:"currentNumber"}," ",t+1,"# ")," ",a.label),o.a.createElement("small",{className:"text-muted"},o.a.createElement(s.a,{icon:"trash-alt",onClick:function(){O(a)}}))))})))))})),F=function(e){var a={};e.fields.forEach((function(e){a=Object(O.a)(Object(O.a)({},a),{},Object(y.a)({},e.name,e.default))}));var t=o.a.useState(a),n=Object(c.a)(t,2),r=n[0],l=n[1],i=function(e){var a=e.target;"checkbox"===a.type?l((function(e){return Object(O.a)(Object(O.a)({},e),{},Object(y.a)({},a.name,a.checked))})):l((function(e){return Object(O.a)(Object(O.a)({},e),{},Object(y.a)({},a.name,a.value))}))};return o.a.createElement(T.a,{show:e.show,onHide:function(a){e.setShow(!1),console.log(r)}},o.a.createElement(T.a.Header,{closeButton:!0},o.a.createElement(T.a.Title,null,"Agregar ",e.tipo)),o.a.createElement(T.a.Body,null,e.fields.map((function(e,a){return o.a.createElement(w.a.Group,{as:x.a,key:a},o.a.createElement(w.a.Label,{column:!0,sm:"4"},e.label),o.a.createElement(D.a,{sm:"8"},o.a.createElement(w.a.Control,{type:e.type,name:e.name,value:r[e.name],checked:r[e.name],onChange:i})))})),o.a.createElement("div",{className:"text-center"},o.a.createElement(j.a,{variant:"primary",onClick:function(t){t.preventDefault(),e.submitFunction(r)&&l(a)}},"Agregar"))))},H={menu:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{backgroundColor:"#181818",color:"#AEBEAE",zIndex:3})},option:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{backgroundColor:a.isFocused?"#222222":"181818",color:"#AEBEAE"})},input:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{color:"#AEBEAE"})},control:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{background:"transparent",borderColor:"#404040"})},singleValue:function(e,a){return Object(O.a)(Object(O.a)({},e),{},{color:"#AEBEAE"})}},G=o.a.forwardRef((function(e,a){var t=o.a.useState(!1),n=Object(c.a)(t,2),r=n[0],l=n[1],i=o.a.useState(!1),d=Object(c.a)(i,2),m=d[0],f=d[1],b=o.a.useState(!1),p=Object(c.a)(b,2),E=p[0],v=p[1],h=o.a.useState({fldPublicador:{value:"0",label:"Seleccione"},fldDestinatario:1,fldMedio:1,fldTextos:0,fldTipo:"0"}),g=Object(c.a)(h,2),T=g[0],B=g[1],R=o.a.useRef(null),G=o.a.useRef(null),U=o.a.useRef(null),Y=o.a.useRef(null),q=function(e){"publicadores"==e?R.current.handleModalOpen():"publicos"==e?U.current.handleModalOpen():(e="lista")?Y.current.handleModalOpen():G.current.handleModalOpen()},z=function(){B({fldPublicador:{value:"0",label:"Seleccione"},fldDestinatario:1,fldMedio:1,fldTextos:0,fldTipo:"0"})};o.a.useImperativeHandle(a,(function(){return{reset:function(){z()},openLista:function(){q("lista")}}}));var K=function(e){if("target"in e){var a=e.target,t=a.name,n=a.value;B(Object(O.a)(Object(O.a)({},T),{},Object(y.a)({},t,n)))}else B(Object(O.a)(Object(O.a)({},T),{},{fldPublicador:e}))},Q=function(e){"publicador"===e?l(!0):"medio"===e?f(!0):v(!0)},W=function(a){if(null===a.nombre||void 0===a.nombre||""===a.nombre.trim())return!1;if(null===a.grupo||void 0===a.grupo||""===a.grupo.trim())return!1;var t=N.insert(a.nombre,a.grupo,a.isInvitado);return e.refreshData(),u.a.Notify.Success("Publicador agregado"),B(Object(O.a)(Object(O.a)({},T),{},{fldPublicador:{value:t.id,label:t.nombre}})),!0};return o.a.createElement(w.a,{onSubmit:function(a){if(a.preventDefault(),0==T.fldPublicador.value)return!1;A.insert(T.fldPublicador.value,T.fldMedio,T.fldDestinatario,T.fldTextos,T.fldTipo);e.refreshData(),z(),u.a.Notify.Success("Registro agregado")}},o.a.createElement("div",{className:"card-body"},o.a.createElement("div",{className:"container"},o.a.createElement(w.a.Group,{as:x.a},o.a.createElement(w.a.Label,{column:!0,sm:"4"},"Publicador"),o.a.createElement(D.a,{sm:"8"},o.a.createElement(C.a,null,o.a.createElement(P.a,{options:e.allPublicadores,styles:H,name:"fldPublicador",value:T.fldPublicador,onChange:K}),o.a.createElement(C.a.Append,null,o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){Q("publicador")}},o.a.createElement(s.a,{icon:"plus-square"})),o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){return q("publicadores")}},o.a.createElement(s.a,{icon:"pencil-alt"})),o.a.createElement(L,{tipo:"Publicadores",allElements:e.allPublicadores,ref:R,refreshData:e.refreshData,deleteFunction:function(a){var t=N.getById(a);0!=t&&t.delete(),u.a.Notify.Success("Publicador eliminado"),e.refreshData()}}),o.a.createElement(F,{show:r,setShow:l,tipo:"Publicador",submitFunction:W,fields:[{name:"nombre",type:"text",label:"Nombre",default:""},{name:"grupo",type:"number",label:"Grupo",default:"0"},{name:"isInvitado",type:"checkbox",label:"\xbfEs invitado?",default:!1}]}))))),o.a.createElement(w.a.Group,{as:x.a},o.a.createElement(w.a.Label,{column:!0,sm:"4"},"Destinatario"),o.a.createElement(D.a,{sm:"8"},o.a.createElement(C.a,null,o.a.createElement(w.a.Control,{as:"select",name:"fldDestinatario",value:T.fldDestinatario,onChange:K},e.allPublicos.map((function(e){return o.a.createElement("option",{key:e.value,value:e.value},e.label)}))),o.a.createElement(C.a.Append,null,o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){Q("publico")}},o.a.createElement(s.a,{icon:"plus-square"})),o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){return q("publicos")}},o.a.createElement(s.a,{icon:"pencil-alt"})),o.a.createElement(L,{tipo:"Destinatarios",allElements:e.allPublicos,ref:U,refreshData:e.refreshData,deleteFunction:function(a){var t=S.getById(a);0!=t&&t.delete(),u.a.Notify.Success("Publico eliminado"),e.refreshData()}}),o.a.createElement(F,{show:E,setShow:v,tipo:"Destinatario",submitFunction:function(a){if(null===a.nombre||void 0===a.nombre||""===a.nombre.trim())return!1;if(null===a.color||void 0===a.color||""===a.color.trim())return!1;var t=S.insert(a.nombre,a.color);return e.refreshData(),u.a.Notify.Success("Publico agregado"),B(Object(O.a)(Object(O.a)({},T),{},{fldDestinatario:t.id})),!0},fields:[{name:"nombre",type:"text",label:"Nombre",default:""},{name:"color",type:"color",label:"Color",default:""}]}))))),o.a.createElement(w.a.Group,{as:x.a},o.a.createElement(w.a.Label,{column:!0,sm:"4"},"Medio"),o.a.createElement(D.a,{sm:"8"},o.a.createElement(C.a,null,o.a.createElement(w.a.Control,{as:"select",name:"fldMedio",value:T.fldMedio,onChange:K},e.allMedios.map((function(e){return o.a.createElement("option",{key:e.value,value:e.value},e.label)}))),o.a.createElement(C.a.Append,null,o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){Q("medio")}},o.a.createElement(s.a,{icon:"plus-square"})),o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){return q("medios")}},o.a.createElement(s.a,{icon:"pencil-alt"})),o.a.createElement(L,{tipo:"Medios",allElements:e.allMedios,ref:G,refreshData:e.refreshData,deleteFunction:function(a){var t=I.getById(a);0!=t&&t.delete(),u.a.Notify.Success("Medio eliminado"),e.refreshData()}}),o.a.createElement(F,{show:m,setShow:f,tipo:"Medio",submitFunction:function(a){if(null===a.nombre||void 0===a.nombre||""===a.nombre.trim())return!1;if(null===a.color||void 0===a.color||""===a.color.trim())return!1;var t=I.insert(a.nombre,a.color);return console.log(t),e.refreshData(),u.a.Notify.Success("Medio agregado"),B(Object(O.a)(Object(O.a)({},T),{},{fldMedio:t.id})),!0},fields:[{name:"nombre",type:"text",label:"Nombre",default:""},{name:"color",type:"color",label:"Color",default:""}]}))))),o.a.createElement(w.a.Group,{as:x.a},o.a.createElement(w.a.Label,{column:!0,sm:"4"},"Textos b\xedblicos"),o.a.createElement(D.a,{sm:"8"},o.a.createElement(C.a,null,o.a.createElement(C.a.Prepend,null,o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){B((function(e){return Object(O.a)(Object(O.a)({},T),{},{fldTextos:e.fldTextos-1})}))}},"-")),o.a.createElement(k.a,{name:"fldTextos",value:T.fldTextos,onChange:K}),o.a.createElement(C.a.Append,null,o.a.createElement(j.a,{variant:"outline-secondary",onClick:function(){B((function(e){return Object(O.a)(Object(O.a)({},T),{},{fldTextos:e.fldTextos+1})}))}},"+"))))),o.a.createElement(w.a.Group,{as:x.a},o.a.createElement(w.a.Label,{column:!0,sm:"4"},"Tipo"),o.a.createElement(D.a,{sm:"8"},o.a.createElement(w.a.Check,{type:"radio",name:"fldTipo",label:"Primera visita",value:"0",checked:"0"===T.fldTipo,onChange:K}),o.a.createElement(w.a.Check,{type:"radio",label:"Revisita",name:"fldTipo",value:"1",checked:"1"===T.fldTipo,onChange:K})))),o.a.createElement("div",{className:"text-center"},o.a.createElement(j.a,{variant:"primary",type:"submit"},"Guardar registro"))),o.a.createElement(M,{allPublicadores:e.allPublicadores,ref:Y,addPublicador:W,refreshData:e.refreshData,replacePublicador:function(e){B(Object(O.a)(Object(O.a)({},T),{},{fldPublicador:e}))}}))})),U=t(30),Y=o.a.forwardRef((function(e,a){var t=o.a.useState(!1),l=Object(c.a)(t,2),i=l[0],s=l[1],d=function(e){s(!1)};o.a.useImperativeHandle(a,(function(){return{handleModalOpen:function(e){s(!0)}}}));var m=function(a){n.importDatabase(a,e.refreshData),d(),u.a.Report.Success("Informaci\xf3n","Base de datos importada con \xe9xito","OK")},f=function(e){var a=e.dataTransfer.files;m(a)},b=function(e){document.getElementById("drop-area").classList.add("highlight")},p=function(e){document.getElementById("drop-area").classList.remove("highlight")},E=function(e){e.preventDefault(),e.stopPropagation()};return Object(r.useEffect)((function(){i&&(["dragenter","dragover","dragleave","drop"].forEach((function(e){document.getElementById("drop-area").addEventListener(e,E,!1)})),["dragenter","dragover"].forEach((function(e){document.getElementById("drop-area").addEventListener(e,b,!1)})),["dragleave","drop"].forEach((function(e){document.getElementById("drop-area").addEventListener(e,p,!1)})),document.getElementById("drop-area").addEventListener("drop",f,!1))}),[i]),o.a.createElement(T.a,{show:i,onHide:d},o.a.createElement(T.a.Header,{closeButton:!0},o.a.createElement(T.a.Title,null,"Importar base de datos")),o.a.createElement(T.a.Body,null,o.a.createElement("div",{id:"drop-area"},o.a.createElement("form",{className:"my-form"},o.a.createElement("p",null,"Arrastre el archivo con extensi\xf3n .RCCH o pulse el siguiente bot\xf3n para buscarlo"),o.a.createElement("input",{type:"file",id:"fileElem",name:"fileElem",onChange:function(e){var a=e.target.files;m(a)}}),o.a.createElement("label",{className:"btn btn-primary",htmlFor:"fileElem"},"Buscar archivo")))))})),q=o.a.forwardRef((function(e,a){var t=o.a.useState(!1),n=Object(c.a)(t,2),r=n[0],l=n[1];o.a.useImperativeHandle(a,(function(){return{handleModalOpen:function(e){l(!0)}}}));return o.a.createElement(T.a,{show:r,onHide:function(e){l(!1)}},o.a.createElement(T.a.Header,{closeButton:!0},o.a.createElement(T.a.Title,null,"Historial de cartas")),o.a.createElement(T.a.Body,null,e.allElements.map((function(a){return o.a.createElement("a",{key:a.id,className:"list-group-item list-group-item-action flex-column align-items-start"},o.a.createElement("div",{key:"div"+a.id,className:"d-flex w-100 justify-content-between"},o.a.createElement("h5",{key:"h5"+a.id,className:"mb-1"},a.publicador),o.a.createElement("small",{key:"small"+a.id,className:"text-muted"}," ",function(e){"object"!==typeof e&&(e=new Date(e));var a,t=Math.floor((new Date-e)/1e3),n=Math.floor(t/31536e3);return n>=1?a="a\xf1o":(n=Math.floor(t/2592e3))>=1?a="mes":(n=Math.floor(t/86400))>=1?a="d\xeda":(n=Math.floor(t/3600))>=1?a="hora":(n=Math.floor(t/60))>=1?a="minuto":(n=t,a="segundo"),(n>1||0===n)&&(a+="s"),"Hace "+n+" "+a}(a.hora)," ",o.a.createElement(s.a,{key:"fw"+a.id,onClick:function(){return function(a){var t=A.getById(a);0!=t&&t.delete(),u.a.Notify.Success("Carta eliminada"),e.refreshData()}(a.id)},icon:"trash-alt"}))),o.a.createElement("p",{className:"mb-1"},o.a.createElement("font",{color:0==a.tipo?"purple":"orange"},0==a.tipo?"Primera visita":"Revisita")," a ",a.publico),o.a.createElement("small",{className:"text-muted"},"Enviada por ",a.medio))}))))})),z=t(70),K=t(103),Q=function(e){return o.a.createElement("div",{style:{float:"left",width:e.width,textAlign:"center",height:80,marginTop:10}},o.a.createElement("h4",null,e.label),o.a.createElement("h4",{styles:{marginTop:10}},e.value," ",o.a.createElement(s.a,{icon:e.icon,style:e.color})))},W=o.a.forwardRef((function(e,a){var t=o.a.useState(!1),n=Object(c.a)(t,2),r=n[0],l=n[1],i=o.a.useState({cartas:0,publicadores:0,textos:0,revisitas:0,porPublicador:0,publicos:[{title:"One",value:10,color:"#E38627"},{title:"Two",value:15,color:"#C13C37"},{title:"Three",value:20,color:"#6A2135"}],medios:[{title:"One",value:10,color:"#E38627"},{title:"Two",value:15,color:"#C13C37"},{title:"Three",value:20,color:"#6A2135"}]}),u=Object(c.a)(i,2),s=u[0],d=u[1];o.a.useImperativeHandle(a,(function(){return{handleModalOpen:function(e){l(!0),m()}}}));var m=function(){var e=A.getDailyStats();d(e)};return o.a.createElement(T.a,{show:r,onHide:function(e){l(!1)}},o.a.createElement(T.a.Header,{closeButton:!0},o.a.createElement(T.a.Title,null,"Estad\xedsticas del d\xeda de hoy")),o.a.createElement(T.a.Body,null,o.a.createElement(z.a,{interval:5e9},o.a.createElement(z.a.Item,null,o.a.createElement("h1",{className:"display-5",style:{textAlign:"center"}},"\xbfC\xf3mo nos fue?"),o.a.createElement(Q,{label:"Cartas",value:s.cartas,icon:"envelope",color:{color:"brown"},width:"50%"}),o.a.createElement(Q,{label:"Publicadores",value:s.publicadores,icon:"hand-paper",color:{color:"green"},width:"50%"}),o.a.createElement(Q,{label:"Textos",value:s.textos,icon:"book",color:{color:"grey"},width:"50%"}),o.a.createElement(Q,{label:"Revisitas",value:s.revisitas,icon:"undo-alt",color:{color:"orange"},width:"50%"}),o.a.createElement(Q,{label:"Cartas por publicador",value:s.porPublicador,icon:"user-edit",color:{color:"blue"},width:"100%"})),o.a.createElement(z.a.Item,null,o.a.createElement("h1",{className:"display-5",style:{textAlign:"center"}},"\xbfA qui\xe9n enviaremos?"),o.a.createElement(K.PieChart,{style:{height:300},data:s.publicos,label:function(e){var a=e.dataEntry;return"".concat(a.title+": "+Math.round(a.percentage)," %")},labelStyle:{fontSize:"5px",fontFamily:"sans-serif",fill:"white"}})),o.a.createElement(z.a.Item,null,o.a.createElement("h1",{className:"display-5",style:{textAlign:"center"}},"\xbfC\xf3mo se enviar\xe1n?"),o.a.createElement(K.PieChart,{style:{height:300},data:s.medios,label:function(e){var a=e.dataEntry;return"".concat(a.title+": "+Math.round(a.percentage)," %")},labelStyle:{fontSize:"5px",fontFamily:"sans-serif",fill:"white"}})))))})),V=o.a.forwardRef((function(e,a){var t=e.children,n=e.onClick;return o.a.createElement("span",{ref:a,onClick:function(e){e.preventDefault(),n(e)}},o.a.createElement(s.a,{icon:"cog"}),t)})),J=function(e){var a=o.a.useRef(null),t=o.a.useRef(null),r=o.a.useRef(null);return o.a.createElement("div",{className:"card-header"},o.a.createElement(U.a,{style:{float:"left"}},o.a.createElement(U.a.Toggle,{as:V,id:"dropdown-basic"}),o.a.createElement(U.a.Menu,null,o.a.createElement(U.a.Item,{onClick:function(){window.confirm("Se borrar\xe1n todos los datos guardados")&&(n.createDatabase(),e.refreshData())}}," ",o.a.createElement(s.a,{icon:"file"})," Nueva base de datos"),o.a.createElement(U.a.Item,{onClick:function(e){a.current.handleModalOpen()}},o.a.createElement(s.a,{icon:"folder"})," Abrir base de datos"),o.a.createElement(U.a.Item,{onClick:function(){n.exportExistingDatabase()}},o.a.createElement(s.a,{icon:"download"})," Descargar base de datos"),o.a.createElement(U.a.Item,{onClick:e.showLista},o.a.createElement(s.a,{icon:"ellipsis-h"})," Lista de espera"),o.a.createElement(U.a.Item,{onClick:function(e){t.current.handleModalOpen()}},o.a.createElement(s.a,{icon:"history"})," Ver historial"),o.a.createElement(U.a.Item,{onClick:function(e){r.current.handleModalOpen()}},o.a.createElement(s.a,{icon:"chart-pie"})," Estad\xedsticas"),o.a.createElement(U.a.Item,{onClick:e.resetForm},o.a.createElement(s.a,{icon:"undo-alt"})," Reiniciar formulario"),o.a.createElement(U.a.Item,{onClick:function(){return document.getElementById("darkSwitch").click()}},o.a.createElement(s.a,{icon:"moon"})," Activar/desactivar modo nocturno"))),o.a.createElement("span",{style:{float:"left",marginLeft:5}}," Registro de cartas"),o.a.createElement(Y,{ref:a,refreshData:e.refreshData}),o.a.createElement(q,{ref:t,refreshData:e.refreshData,allElements:e.allLetters}),o.a.createElement(W,{ref:r}))},_=function(e){var a=o.a.useRef(null);return o.a.createElement(g,null,o.a.createElement(J,{allLetters:e.allLetters,refreshData:e.refreshData,resetForm:function(){a.current.reset()},showLista:function(){a.current.openLista()}}),o.a.createElement(G,{allPublicadores:e.allPublicadores,allPublicos:e.allPublicos,allMedios:e.allMedios,refreshData:e.refreshData,ref:a}))},$=t(67),X=t(14);$.b.add(X.a,X.d,X.p,X.o,X.q,X.e,X.h,X.k,X.b,X.s,X.r,X.i,X.j,X.f,X.g,X.m,X.c,X.n,X.l),u.a.Report.Init({backgroundColor:"#222",success:{titleColor:"#bebebe",messageColor:"#bebebe",buttonColor:"#bebebe"}});var Z=function(){var e=o.a.useState([]),a=Object(c.a)(e,2),t=a[0],r=a[1],l=o.a.useState([]),i=Object(c.a)(l,2),u=i[0],s=i[1],m=o.a.useState([]),f=Object(c.a)(m,2),b=f[0],p=f[1],v=o.a.useState([]),h=Object(c.a)(v,2),g=h[0],y=h[1],O=function(){if(null!=n){var e=N.getAllPublicadores();r(e);var a=S.getAllPublicos();s(a);var t=I.getAllMedios();p(t);var o=A.getAllRecords();y(o)}};return o.a.useEffect((function(){new E(O)}),[]),o.a.createElement("div",{className:"App"},o.a.createElement(d,null),o.a.createElement(_,{allLetters:g,allPublicadores:t,allPublicos:u,allMedios:b,refreshData:O}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(268);i.a.render(o.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[162,1,2]]]);
//# sourceMappingURL=main.e3cd48b6.chunk.js.map