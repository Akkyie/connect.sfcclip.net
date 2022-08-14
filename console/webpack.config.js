// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { VueLoaderPlugin } = require("vue-loader")

const isProduction = process.env.NODE_ENV == "production"

const stylesHandler = MiniCssExtractPlugin.loader

const config = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    //publicPath: "/console/dist/",
    filename: "build.js"
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, "./public"),
      vue$: "vue/dist/vue.esm.js" // 'vue/dist/vue.common.js' webpack 1 c”¨
    }
  },
  devServer: {
    open: true,
    host: "localhost"
  },
  externals: {
    vue: "Vue"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),

    new MiniCssExtractPlugin(),

    new VueLoaderPlugin()

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: ["vue-style-loader", "css-loader", "stylus-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = "production"
  } else {
    config.mode = "development"
  }
  return config
}
