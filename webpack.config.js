const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
          test: /\.html$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]'
                  }
              }
          ],
          exclude: path.resolve(__dirname, 'src/index.html')
      },
      {
        test: /\.gif$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'gif/',
                    publicPath: 'gif/'
                }
            }
        ],
    }      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};