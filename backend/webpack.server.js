const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: 'none',
    entry: {server: "./src/server.js"}, //Entry point for your application
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "server.bundle.js", //output bundle
        // libraryTarget: "commonjs2"
    },
    target: "node", //specify Node.js environment
    externals: [nodeExternals()], //Exclude nodemodules from the bundle
    module: {
        rules: [
            {
                test: /.(js|jsx)$/, //Match .js and .jsx files
                exclude: /node_modules/, //Exclude node_midules
                use: {
                    loader: "babel-loader", //Use babel loader
                    options: {
                        presets: [
                            "@babel/preset-env", 
                            "@babel/preset-react"
                        ], //  Babel presets
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"], // Resolve these extentions
    },
}