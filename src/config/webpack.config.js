const path = require("path");
const paths = require("./paths");
const webpack = require("webpack");

module.exports = {
  entry: "../src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"], sourceMap: true },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "../dist/",
    filename: "bundle.js",
    // sourceMapFilename: "[name].js.map"
  },
  devServer: {
    contentBase: path.join("../"+__dirname, "public/"),
    port: 3004,
    publicPath: "http://localhost:3004/dist",
    historyApiFallback: true,
    hotOnly: true,
    open: true,
  },
  devtool: "source-map",
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml,
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined
      )
    ),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
