const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: {
    app: "/index.js",
    db: "/db.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "app.bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      name: "Offline Budget Tracker",
      short_name: "Budget Tracker",
      description:
        "An application that allows you to work with travel budgets offline and online.",
      background_color: "#01579b",
      theme_color: "#ffffff",
      "theme-color": "#ffffff",
      start_url: "/",
      icons: [
        {
          src: path.resolve("./public/icons/icon-192x192.png"),
          sizes: [192, 512],
          destination: path.join("icons"),
        },
      ],
      fingerprints: false,
      inject: false,
    }),
  ],
};

module.exports = config;
