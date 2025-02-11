import path from "node:path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const IS_DEV = process.env.NODE_ENV === "development";

const config: webpack.Configuration = {
  entry: path.resolve(import.meta.dirname, "./src/index.tsx"),
  output: {
    path: path.resolve(import.meta.dirname, "./dist"),
    publicPath: process.env.PUBLIC_PATH ?? "",
    filename: "[name].[contenthash].js"
  },
  mode: IS_DEV ? "development" : "production",
  devtool: IS_DEV ? false : "hidden-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "swc-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(import.meta.dirname, "./index.html")
    }),
    !IS_DEV && new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      BASE_API_URL: IS_DEV
        ? '"http://localhost:4000"'
        : JSON.stringify(process.env.API_URL)
    })
  ].filter(Boolean)
};

export default config;
