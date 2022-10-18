// Server side

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// to render react in server side
const React = require('react');
const ReactDOMServer = require('react-dom/server');
import App from '../src/App.js';

// middleware
app.use('/static', express.static(path.join(__dirname, '..', 'public')));


// routes
app.get('/', (req, res) => {
    const component = ReactDOMServer.renderToString(<App />)
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="author" content="Alejandro Cabarcas Perdomo">
            <meta name="description" content="Educative Platform">
            <title>react-app</title>
        </head>
        
        <body>
        
            <div id="root">${component}</div>
        
            <script src="./static/bundle.js"></script>
        
        </body>
        
        </html>
    `

    res.send(html);
});


// listening port
app.listen(port, () => {
    console.log(`server now listening at http://localhost:${port}`);
});