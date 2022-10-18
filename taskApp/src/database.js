/*
    archivo envcargado de la conexion a la base de datos
*/

const moongose = require('mongoose');

const URI = 'mongodb://localhost/mern-tasks';

moongose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = moongose;