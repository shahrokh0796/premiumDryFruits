const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: "development",
    entry: { index: "./src/index.js" },
    devtool: "source-map", 
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        devMiddleware: {
            index: false,
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true, // Handle React Router paths
        proxy: [
            {
                context: () => true,
                target: "http://localhost:5500",
                changeOrigin: true,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Server Side Rendering, React',
            template: "./src/index.html",

        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
    ],
    output: {
        filename: "[name].bundle.js", //output bunndle
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        clean: true,
    },
    target: "web",
    module: {
        rules: [ 
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    optimization: {
        runtimeChunk: "single",
    },
}