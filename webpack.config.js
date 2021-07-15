const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function (_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  // const envFile = dotenv.config({ path: `.env.${_env.APP_ENV}` }).parsed;

  // const envKeys = Object.keys(envFile).reduce((prev, next) => {
  //   prev[next] = JSON.stringify(envFile[next]);
  //   return prev;
  // }, {});

  return {
    devtool: isDevelopment && "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "assets/js/[name].[contenthash:8].js",
      chunkFilename: "assets/js/[name].[contenthash:8].chunk.js",
      publicPath: "/openstreet-examples",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development",
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          include: path.join(__dirname, "public/img"),
          loader: "file-loader",
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        // {
        //   test: /\.(eot|otf|ttf|woff|woff2)$/,
        //   loader: require.resolve("file-loader"),
        //   options: {
        //     name: "static/media/[name].[hash:8].[ext]",
        //   },
        // },
        {
          test: /\.less$/,
          use: [
            isProduction
              ? MiniCssExtractPlugin.loader
              : { loader: "style-loader" },
            { loader: "css-loader" },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  modifyVars: {
                    "primary-color": "#1473E6",
                  },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },

    resolve: { extensions: ["*", ".js", ".jsx"] },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      isProduction &&
      new MiniCssExtractPlugin({
        filename: "assets/css/[name].[contenthash:8].css",
        chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        inject: true,
        // googleKey: envFile.GOOGLE_KEY,
        // gaId: envFile.GA_ID,
        env: _env.APP_ENV,
      }),
      // new webpack.DefinePlugin({
      //   "process.env": {
      //     NODE_ENV: JSON.stringify(isProduction ? "production" : "development"),
      //     APP_ENV: JSON.stringify(_env.APP_ENV),
      //     ...envKeys,
      //   },
      //   envFile: envFile,
      // }),
      // new CopyWebpackPlugin({
      //   patterns: [{ from: "public" }],
      // }),
      new CompressionPlugin(),
      // new AntdDayjsWebpackPlugin(),
    ].filter(Boolean),

    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
        new OptimizeCssAssetsPlugin(),
      ],
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: 10,
        maxAsyncRequests: 10,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `${cacheGroupKey}.${packageName.replace("@", "")}`;
            },
          },
          common: {
            minChunks: 2,
            priority: -10,
          },
        },
      },
      runtimeChunk: "single",
    },

    devServer: {
      port: 3004,
      historyApiFallback: true,
      hotOnly: true,
      open: true,
      overlay: true,
    },
  };
};
