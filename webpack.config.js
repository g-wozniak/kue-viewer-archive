const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const {nanoid} = require('nanoid')
const {WebpackPluginServe: Serve} = require('webpack-plugin-serve')

module.exports = env => {
    let plugins = []

    const src = path.resolve(__dirname, 'src')
    const components = path.resolve(src, 'components')
    const dist = path.resolve(__dirname, 'dist')
    const local = path.resolve(dist, '.local')

    console.log('\n\n webpack: Vinciway template viewer')
    console.log(` app output directory: ${local}`)

    const entry = path.resolve(local, 'index.html')

    plugins.push(
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(dist, 'index.template.html'),
            filename: entry
        })
    )

    plugins.push(
        new HtmlReplaceWebpackPlugin(
            [
                {
                    pattern: '_BUILD_',
                    replacement: nanoid(8)
                }
            ]
        )
    )

    plugins.push(new Serve({
        port: 3003,
        static: local,
        open: false,
        hmr: true,
        host: 'localhost',
        liveReload: true
    }))

    const config = {
        mode: 'development',
        entry: ['webpack-plugin-serve/client', './src/index.tsx'],
        output: {
            publicPath: '',
            path: path.resolve(local),
            filename: 'app.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@root': src,
                '@intf': path.resolve(src, 'intf'),
                '@helpers': path.resolve(src, 'helpers'),
                '@themes': path.resolve(src, 'themes'),
                '@state': path.resolve(src, 'state'),
                '@c': components
            }
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.ts|\.tsx$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.webpack.json'
                    },
                    exclude: [
                        path.resolve(__dirname, 'node_modules')
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: './styles',
                                name: 'local.min.css'
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        devtool: 'inline-source-map',
        stats: 'errors-only',
        watch: true
    }

    return {...config, plugins}

}