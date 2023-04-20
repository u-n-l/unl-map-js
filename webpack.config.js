const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  resolve: {
    fallback: {
      path: false,
      fs: false,
      buffer: require.resolve("buffer"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "unl-map-js.js",
    library: "UnlSdk",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
  },
};
