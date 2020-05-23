const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const webpack = require("webpack");
const pug_root = `./src/pug/`; //読み込まれるpugのディレクトリ
const build_html_root = `./html/`; //buildしたhtmlの出力先のディレクトリ

//jsとcssのバンドルを分ける設定
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => ({
  //npm run startでローカルサーバーを立ち上げるオプション
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    compress: true,
    port: 7776,
    open: true,
    watchContentBase: true,
    headers: {
      "X-Custom-Foo": "bar", //headerに付け加えられる。chromeの開発者ツールで「Network」でfilterの「ALL」を選び左にあるSearchから「X-Custom-Foo」と検索すれば出てくる。これをjsで読み取る方法がわかればよし。
    },
    // index: "dev_top.html"//http://localhost:7776でURLをたたいた時に出てくるbuildしたhtmlファイル
  },

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/main.js`,
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    // path: `${__dirname}/docs`,
    path: path.join(__dirname, "docs"),
    // path: `${__dirname}`,
    // 出力ファイル名
    filename: "00_bundle.js",
  },

  // 最適化オプションを上書き
  optimization: {
    minimizer: [
      new TerserPlugin({
        //参考：https://www.monotalk.xyz/blog/Remove-all-JavaScript-comments-when-compressing-Webpack-4/
        extractComments: "all", //buildした時にコメントアウト削除
        terserOptions: {
          compress: {
            // drop_console: true //console.logを削除
          },
        },
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },

  module: {
    rules: [
      //babelの設定
      //拡張子 .js の場合
      {
        test: /\.js$/,
        use: [{
          // Babel を利用する
          loader: "babel-loader",
          // Babel のオプションを指定する
          options: {
            presets: [
              // プリセットを指定することで、ES2019 を ES5 に変換
              "@babel/preset-env",
              {
                // target:{ie:11}//ターゲットとしてIE11を指定
              },
            ],
          },
        }, ],
      },
      // pug-loaderの設定
      {
        test: /\.pug$/,
        use: [{
          loader: "pug-loader",
          options: argv.mode !== "production" ? {
            pretty: true,
          } : {}, //HTMLを圧縮しないオプション
        }, ],
      },
      {
        // 対象となるファイルの拡張子(sass,scss,csssf)
        test: /\.(sa|sc|c)ss$/,
        // Sassファイルの読み込みとコンパイル
        use: [
          MiniCssExtractPlugin.loader,
          // loader: MiniCssExtractPlugin.loader,
          // スタイルシートをJSからlinkタグに展開する機能
          // "style-loader",
          // CSSをバンドルするための機能
          "css-loader",
          // compiles Sass to CSS
          "sass-loader",
        ],
      },
      // imgの設定
      {
        test: /\.(png|svg|jpe?g|gif)/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            // outputPath: './assets/img/',
            // publicPath: '../assets/img'
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [
    //buildしたらdocsディレクトリの中身が一回削除されるやつ。
    new CleanWebpackPlugin({
      //削除されたくないやつを書くんかな？document見てもよくわからん。
      cleanAfterEveryBuildPatterns: ["static*.*", "!static1.js"],
    }),
    new MiniCssExtractPlugin({
      filename: "00_bundle.css",
    }),
    //pugからhtmlの変換
    new HtmlWebpackPlugin({
      template: pug_root + "index.pug",
      filename: "./index.html",
    }),
    // new HtmlWebpackPlugin({
    //   template: pug_root + '.pug',
    //   filename: './.html'
    // }),

    //jQueyで変数$を使うための記述
    //参考
    //：https://qiita.com/NoUkeNoLife/items/b5aa1934dc8c92459957
    //:https://webpack.js.org/plugins/provide-plugin/
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
      _: "lodash",
      "window._": "lodash",
    }),
  ],
  watch: true,
  //chrome開発者ツールでどのcssからとってきたかわかるけどmain.scssかbootstrap.min.jsしかないからあんまり意味ない
  devtool: "source-map",
});