const path = require('path');
const nodeExternals = require('webpack-node-externals');

const jsConfigs = {

    loader: 'babel-loader',
    test: /\.js$/,
    exclude: /node_modules/

}

const devServerConfigs = {
    contentBase: path.join(__dirname, 'public'),
}


const clientConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [
            jsConfigs
        ]
    },
    devServer: devServerConfigs
}

const serverConfig = {
    entry: './server/index.js',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            jsConfigs
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        __dirname: false
    }
}

module.exports = [serverConfig, clientConfig]