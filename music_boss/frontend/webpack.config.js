const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",  // Added mode field for clarity, can be "development" during dev
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
    publicPath: "/static/frontend/",  // Ensures assets are correctly referenced in production
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,  // Caches babel-loader results for faster builds
          },
        },
      },
      {
        test: /\.css$/,  // Add this if you are using CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,  // Handling images
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",  // Splits vendor code into separate files to optimize caching
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],  // Allows importing without specifying file extensions
  },
};
