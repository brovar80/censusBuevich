const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

const {
    searchOnlyAPIKey,
    applicationID,
    index_name
} = process.env;

console.log('process.env.index_name', index_name);

const WEBPACK_MODES = {
    development: 'development',
    production: 'production'
};

module.exports = (env, { mode }) => {
    const devtool = mode === WEBPACK_MODES.development
        ? 'source-map'
        : void 0;

    return {
        devtool,
        entry: {
            app: './src/index.tsx'
        },
        output: {
            path: PATHS.dist,
            filename: '[name][contenthash].js',
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'file-loader'
                        }
                    ]
                },
                {
                    test: /\.tsx$/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png)$/,
                    loader: 'file-loader'
                }
            ],
        },
        resolve: {
            extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: `src/index.html`,
                filename: 'index.html',
                inject: true,
                chunks: [ 'app' ]
            }),
            new webpack.DefinePlugin({
                env: {
                    searchOnlyAPIKey,
                    applicationID,
                    index_name
                }
            })
        ]
    };
};