const path = require("path");
const MiniCssExtractPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
    mode: "production",
    target: "web",
    devtool: "none",
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [ 
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
            }, 
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    }
}