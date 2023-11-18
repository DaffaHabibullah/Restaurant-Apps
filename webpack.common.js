const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const ImageminMozjpeg = require("imagemin-mozjpeg");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "src/scripts/index.js"),
        // sw: path.resolve(__dirname, "src/scripts/sw.js"),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 20000,
            maxSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: "~",
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src/templates/index.html"),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/public/"),
                    to: path.resolve(__dirname, "dist/"),
                    globOptions: {
                        ignore: ["**/images/**"],
                    },
                },
            ],
        }),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, "src/public/Daffa_Habibullah--PP.jpg"),
            outputPath: "public/favicons",
            publicPath: "public",
            prefix: "favicons/",
        }),
        new ImageminWebpackPlugin({
            plugins: [
                ImageminMozjpeg({
                    quality: 50,
                    progressive: true,
                }),
            ],
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            swDest: "./sw.bundle.js",
            runtimeCaching: [
                {
                    urlPattern: new RegExp("^https://restaurant-api.dicoding.dev/"),
                    handler: "StaleWhileRevalidate",
                    options: {
                        cacheName: "RestaurantCatalogue-V1",
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
            ],
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "server",
            openAnalyzer: true,
        }),
    ],
};
