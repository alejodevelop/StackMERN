// const http = require('http');

// esta libreria me permite ponerle colores a los console log
// const colors = require('colors');

// //funcion que se encarga de ejecutarse cuando se crea el servidor
// //se creo a parte para organizar mejor el codigo
// //pero esta tambien puede ir dentro de un callback en el metodo createServer
// //este callback toma dos parametros request - req y response -res
// const handleServer = (req, res) => {
//     res.writeHead(200, { 'Content-type': 'text/plain' })
//     res.write('Creando un servidor');
//     res.end();
// }

// const server = http.createServer(handleServer)

// server.listen(3000, () => {
//     console.log('server running on 3000 port'.rainbow);
// });



const express = require('express');

//se crea el servidor
const server = express();

//se ejecuta el servidorr
server.listen(3000, () => {
    console.log('server on port 3000');
})

//get cuando se inicia el servidor
server.get('/', (req, res) => {
    res.send('<h1>servidor iniciado usando express</h1>');
    res.end();
});