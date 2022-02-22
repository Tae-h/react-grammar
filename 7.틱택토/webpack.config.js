const path = require("path");
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'tictactoa-config',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.css'], // 생략할 확장자 등록
    },
    entry: { // 입력
        //app: ['./client.jsx', './WordRelay.jsx'],
        //app: ['./client.jsx']
        app: ['./client'], // 이미 client.jsx 파일에서 WordRelay.jsx 파일을 불러오고 있어서 추가 할 필요 없음
    },

    module: {
        rules: [{
            test: /\.jsx?/, // js, jsx 파일에 바 벨을 적용 하겠음
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-react', {
                        targets: {
                            browsers: ['> 1% in KR'] // browserslist
                        },
                        debug: true,
                    }],
                    '@babel/preset-env'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            }
        }]
    },

    plugins: [
       new RefreshWebpackPlugin(),
    ],

    output: { // 출력
        path: path.join(__dirname,  'dist'), // __dirname: 현재폴더 경로
        filename: 'app.js',
        publicPath:  '/dist',
    },
    devServer: {
        devMiddleware: {
          publicPath:  '/dist'
        },
        static: {
            directory: path.resolve(__dirname)
        },
        hot: true,
    }
}