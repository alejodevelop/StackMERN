const fs = require('fs');

//parametros, nombre y ubicacion del archivo
// contenido
//callback que se ejecutara cuando el archivo sea creado, codigo asincrono

fs.writeFile('./texto.txt', "texto random dentro de un archivo random", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('archivo creado correctamente');
        console.log('');
    }
});

console.log();
console.log('mientras se crea el archivo, se muestra este mensaje');
console.log('por que el codigo anterior a estos logs es asincrono');
console.log('');

fs.readFile('./texto.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log('leyendo el archivo...');
        console.log();
        console.log(data.toString());
    }
})

//1:02:50