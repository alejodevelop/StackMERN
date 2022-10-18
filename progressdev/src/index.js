const express = require ("express");
const app = express();
const morgan = require('morgan');
const {mongoose}=require('./conexionbase');
const Task = require('./modelobase/tabla');
const path = require('path');

//configuracion de la aplicacion (setting)
app.set('port',process.env.PORT||3000);

//funciones a ejecutar antes de llegar a las rutas (middleware)
app.use(morgan('dev'));
app.use(express.json());

//rutas (routes)
app.use('/api/tasks',require('./rutas/tareas.rutas'));

//archivos estaticos (static files - public)
app.use(express.static(path.join(__dirname,'public')));


//iniciar servidor

app.listen(app.get('port'),()=>{console.log('hola mundo como estan')});