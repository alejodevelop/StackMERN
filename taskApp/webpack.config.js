const path = require('path');

module.exports = {
  entry: ['./src/app/index.js'],  // Elegimos nuestro punto de entrada
  output: {
    path: path.resolve(__dirname, 'src/public/'),
    publicPath: 'src/public',
    filename: 'bundle.js'
  },  // Añadimos nuestro punto de salida
  resolve: {
    extensions: ['.js', '.jsx']  // Añadimos el soporte para la extencion de JSX
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,      // Expresion regular, (toma los archivos que finalicen en jsx y js)
        exclude: /node_modules/,  // Ignora la carpeta de node_modules
        use: {
          loader: "babel-loader" // Utiliza la configuracion de Babel
        }
      },

    ]
  },
};