let path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SriPlugin = require("webpack-subresource-integrity");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const Jarvis = require("webpack-jarvis");

module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "index.js",
    crossOriginLoading: "anonymous"
  },
  devServer: {
    contentBase: path.join(__dirname, "assets"),
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?url=false"
        })
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" }
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({ template: "src/index.html" }),
    new ExtractTextPlugin("patterns.css")
    // new Jarvis()
  ],
  node: {
    fs: "empty"
  }
};
