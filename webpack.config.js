var path=require('path');
const webpack = require('webpack')
//css单独抽离
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//生成模版
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    //源码调试
    devtool:'eval-source-map',
	entry:{
		main : './app/js/index.js',
		detail : './app/js/detail.js'
	},
	output:{
		filename:'js/[name].js',
        publicPath: 'http://localhost:8090/',
		path: path.resolve(__dirname, 'dist')
	},
    devServer: {
      contentBase: path.join(__dirname, "dist","view"),
      //contentBase: false,
      compress: true,
      port: 8090
    },
	module: {
	    rules: [
	      // {
	      //   test: /\.css$/,
	      //   use: [ 'style-loader', 'css-loader' ]
	      // },
	      // {
	      // 	test: /\.scss$/,
	      // 	use: [ 'style-loader', 'css-loader','sass-loader' ]
	      // },
	      {
	        test: /\.css$/,
	        use: ExtractTextPlugin.extract({
	          fallback: "style-loader",
	          use: [{
                loader : "css-loader"
              },
              {   
                loader : "postcss-loader",
                options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                    plugins: [
                        require('autoprefixer')({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
              ]
	        })
	      },
	      {
	        test: /\.scss$/,
	        use: ExtractTextPlugin.extract({
	          fallback: 'style-loader',
	          use: [{

                loader : 'css-loader'
            }, {
                loader : 'sass-loader'
            },
            {   
                loader : "postcss-loader",
                options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                    plugins: [
                        require('autoprefixer')({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }

                ]
	        })
	      },
          {
            test: /\.(jp[e]?g|png|gif)$/,
            use: [{
                loader : "url-loader",
                options : {
                    limit : 1 ,
                    name : "img/[name].[ext]"
                }
            }]
          },
          {
            test: /\.(eot|svg|ttf|woff)$/,
            use: [{
                loader : "url-loader",
                options : {
                    limit : 1 ,
                    name : "font/[name].[ext]"
                }
            }]
          }
	    ]
  	},
  	plugins: [
       
        new ExtractTextPlugin({
        	filename  : 'css/[name].css',
        	allChunks: true
        }),
        /**
             * title: 用来生成页面的 title 元素
             * filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
             * template: 模板文件路径，支持加载器，比如 html!./index.html
             * inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
             * favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
             * minify: {} | false , 传递 html-minifier 选项给 minify 输出
             * hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
             * cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
             * showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
             * chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
             * chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
             * excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块)
             *
             */
        new HtmlWebpackPlugin({
        	title: '模版app',
            template: path.join(__dirname,'template','index.html'),
            chunks : ["main"],
            filename : path.join(__dirname,'dist','view','index.html')
        }),
        new HtmlWebpackPlugin({
        	title: '模版app222',
        	chunks : ["detail"],
            template: path.join(__dirname,'template','index.html'),
            filename : path.join(__dirname,'dist' ,'view','detail.html')
        })
        //if you want to pass in options, you can do so:
        //new ExtractTextPlugin({
        //  filename: 'style.css'
        //})
  ]
}
