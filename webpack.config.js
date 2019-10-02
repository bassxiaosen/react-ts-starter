const devMode = process.env.NODE_ENV !== 'production'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: {
    index: __dirname + "/src/pages/Index/index.tsx",
  },
  output: {
    path: __dirname + "/dist",//打包后的文件存放的地方
    filename: "[name].js", //打包后输出文件的文件名
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.(j|t)sx?$/,
        include: [path.resolve('./src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' ]
      },
      {
        test: /\.less$/,
        use: [ devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader' ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React-TS-Starter',
      filename: 'index.html',
      chunks: ['index'],
      template: __dirname + '/templates/Index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less', '.jsx'],
    alias: {
      "@": path.join(__dirname, "src"),
      pages: path.join(__dirname, "src/pages"),
      router: path.join(__dirname, "src/router")
    }
  },
  optimization: {
    splitChunks: {
      chunks: "async", // 默认只处理异步chunk的配置 async
      minSize: 30000, // 如果模块的最小体积小于30，就不拆分它
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 异步加载Chunk时的最大并行请求数
      maxInitialRequests: 3, // 可改为5 入口Chunk的最大并行请求数 针对多入口的maxAsyncRequests
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true, // 此处写成false，公共块就不会是default~Greeter1~Greeter4.js了，而是0.js这样命名Chunk。
      cacheGroups: { // 缓存组，拆分Chunk的规则
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10, // 此数越大，越优先匹配
          },
          default: {
              minChunks: 2, // CommonsChunkPlugin的minChunks既可以传方法，也可以传数字，现在只可以传数字了，如果你想传方法，用test属性
              priority: -20,
              reuseExistingChunk: true //  配置项允许重用已经存在的代码块而不是创建一个新的代码块。这句我不懂，有知道的小伙伴麻烦告诉我一下
          }
      }
    }
  },
  devServer: {
    hot: true,
    contentBase: __dirname + '/dist',
    host: "0.0.0.0", // 可以使用手机访问
    port: 8080,
    historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
    inline: true,
    overlay: {
      errors: true
    },
    proxy: {
      // 代理到后端的服务地址，会拦截所有以api开头的请求地址
      "/api": "http://localhost:3000"
    }
  }
}