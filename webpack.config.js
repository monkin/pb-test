const path = require("path");

module.exports = (_, argv) => ({
    entry: "./client/index.tsx",
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
        }, {
            test: /\.pcss$/,
            use: [
                "style-loader",
                { loader: "css-loader", options: { modules: true, importLoaders: 1 } },
                "postcss-loader"
            ]
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".pcss"]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, path.join("build", "client"))
    }
});
