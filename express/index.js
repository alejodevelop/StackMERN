
//creando un servidor usando la forma convencional 
//de la libreria http ofrecida por node
// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// server.listen(3000, () => {
//     console.log('server on port 3000');
// })

const express = require('express');

// creo el servidor con express 
const app = express();

//un middleware es una manejador de peticion que se puede ejecutar antes
//de que se ejecuten la o las rutas definidas
//logger se va a encargar de registrar las peticiones que lleguen al servidor
//existe un middleware que hace lo que have esta funcion
//se llama morgan y puede instalarse con npm
function logger(req, res, next) {
    console.log('middleware message: Request received');
    console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//settings
//una forma de declarar variables para usarlas posteriormente
//en la configuracion del servidor
//esto permite gestionar mejor las varibales globales del servidor
app.set("appName", "express tutorial");
app.set('port', 3000);
//motor de plantilla, hay que instalarlo externamente
app.set('view engine', 'ejs');

//sirve para que el servidor express pueda entender el formato de json
// y asi poder mostrar un json en consola sin que mande un undefined
//ejecutando dos middleware antes de todas las peticiones
// las funciones middlewares sirven para procesar datos antes
// de que se procesen las rutas
app.use(express.json());
app.use(logger);

//routing o enrutamiento

// metodo que sirve para especificar que en todas la rutas especificadas
// se ejecuten las acciones descritas dentro del callback
//este metodo se ejecuta primero que el de la ruta especificada
app.all("/user", (req, res, next) => {
    console.log("Este console log se ejecuta para todas las rutas user");
    // se ejecuta el metodo next para que continue con la ruta
    // y asi no se limite solo a ejecutar lo escrito aqui
    next();
});


// get sirve para pedir algo al servidor, como cargar una pagina
app.get('/', (req, res) => {
    res.send('get request received');
});

app.get('/user', (req, res) => {
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    });
});

app.get('/ejs', (req, res) => {
    const data = [{ name: 'jhon' }, { name: 'joe' }, { name: 'cameron' }]
    res.render('index.ejs', { people: data })
});

//post sirve para enviar datos al servidor, como un formulario
app.post('/about', (req, res) => {
    res.send('post request received');
});

//se pueden crear rutas dinamicas con parametros agregando /: param
app.post('/user/:id', (req, res) => {
    res.send('post request received')
    console.log(req.body);
    console.log(req.params);
});

//put sirve para actualizar o reemplazar datos
app.put('/contac', (req, res) => {
    res.send('put or update request received');
});

app.put('/user/:id', (req, res) => {
    console.log(req.body);
    res.send(`User ${req.params.id} updated`);
});


//eliminar algo dentro del servidor
app.delete('/test', (req, res) => {
    res.send('<h1>delete request received</h1>');
});

app.delete('/user/:userId', (req, res) => {
    res.send(`User ${req.params.userId} deleted`);
});

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('server on port ', app.get('port'));
});

//middleware static files
//si la ruta principal / no esta de definida, se muestra el contenido
// de la carpeta public (un html, css y javascript)
app.use(express.static('public'));

//01:15:15