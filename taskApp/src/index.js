/*
    archivo de nodejs, express
    donde se inicializara y creara el servidor
*/

// lo primero que se hace para inicializar el proyecto es tipear npm init


const express = require('express');
const morgan = require('morgan'); // Morgan is a HTTP request logger middleware for Node. js, You might think of Morgan as a helper that generates request logs
const path = require('path'); // Permite identificar el sistema de ejecucion y manejar las rutas de manera apropiada usando / o \ segun corresponda
const app = express();

// Conexion a mongodb
const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // se encarga de convertir los datos en formato json, antes se usaba bodyparser

// Routes
app.use('/api/tasks/', require('./routes/task.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public'))); //especifico que el recurso html principal esta en public

// Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});


