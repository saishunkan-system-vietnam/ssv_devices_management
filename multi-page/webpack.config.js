const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const getFilesFromDir = require("./config/files");
const PAGE_DIR = path.join("src", "pages", path.sep);
const htmlPlugins = getFilesFromDir(PAGE_DIR, [".html"]).map(filePath => {
  const fileName = filePath.replace(PAGE_DIR, "");
  // { chunks:["contact", "vendor"], template: "src/pages/update.html",  filename: "update.html"}
  return new HtmlWebPackPlugin({
    chunks: [fileName.replace(path.extname(fileName), ""), "vendor"],
    template: filePath,
    filename: fileName
  })
});

// { contact: "./src/pages/update.js" }
const entry = getFilesFromDir(PAGE_DIR, [".js"]).reduce((obj, filePath) => {
  const entryChunkName = filePath.replace(path.extname(filePath), "").replace(PAGE_DIR, "");
  obj[entryChunkName] = `./${filePath}`;
  return obj;
}, {});

module.exports = (env, argv) => ({
  entry: entry,
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[hash:4].js"
  },
  devtool: argv.mode === 'production' ? false : 'eval-source-maps',
  plugins: [
    ...htmlPlugins
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src", "components"),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
          }
        },
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          { loader: "css-loader", options: { url: true, sourceMap: true } },
        ]
      },
      {
        test: /\.(svg|jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (url, resourcePath, context) => {
                if (argv.mode === 'development') {
                  const relativePath = path.relative(context, resourcePath);
                  return `/${relativePath}`;
                }
                return `/assets/images/${path.basename(resourcePath)}`;
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath, context) => {
                if (argv.mode === 'development') {
                  const relativePath = path.relative(context, resourcePath);
                  return `/${relativePath}`;
                }
                return `/assets/fonts/${path.basename(resourcePath)}`;
              }
            }
          }
        ]
      }]
  },
  optimization: {
    minimize: argv.mode === 'production' ? true : false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://localhost',
      apiEndpoint: {
        auth: '/auth/signin',
        login: '/api/v1/user/login',
        update_profile: '/api/v1/user/profile',
        lstusers: '/api/v1/user',
        show_user: '/api/v1/user/show/',
        restock_user: '/api/v1/user/restock',
        delete_user: '/api/v1/user/delete',

        list_category: '/api/v1/category',
        add_category: '/api/v1/category/add',
        edit_category: '/api/v1/category/edit',
        get_category: '/api/v1/category/view/',
        delete_category: '/api/v1/category/delete/',
        filter_category: '/api/v1/category/filter',
        list_brands: '/api/v1/brand',
        list_borrow: '/api/v1/borrow',
        view_borrow: '/api/v1/borrow/view/',
        add_borrow: '/api/v1/borrow/add',
        edit_borrow: '/api/v1/borrow/edit',
        delete_borrow: '/api/v1/borrow/delete',
        approve_borrow: '/api/v1/borrow/approve',
        no_approve_borrow: '/api/v1/borrow/noapprove',
        return_borrow: '/api/v1/borrow/returndevice',
        return_confirm_borrow: '/api/v1/borrow/confirmreturndevice',
        filter_borrow: '/api/v1/borrow/filter',
        notification_broken: '/api/v1/maintenance/notification_broken',

        brand_list: '/api/v1/brand',
        brand_view: '/api/v1/brand/view/',
        brand_add: '/api/v1/brand/add',
        brand_edit: '/api/v1/brand/edit',
        brand_delete: '/api/v1/brand/delete',
        brand_filter: '/api/v1/brand/filter',

        list_device: '/api/v1/device',
        view_device: '/api/v1/device/view/',
        add_device: '/api/v1/device/add',
        edit_device: '/api/v1/device/edit',
        delete_device: '/api/v1/device/delete',
        filter_device: '/api/v1/device/filter',

        maintenance_list: '/api/v1/maintenance',
        maintenance_add: '/api/v1/maintenance/add',
        maintenance_edit: '/api/v1/maintenance/edit',
        maintenance_delete: '/api/v1/maintenance/delete',
        maintenance_view: '/api/v1/maintenance/view/',
        maintenance_comfirm_notification_broken: '/api/v1/maintenance/comfirm_notification_broken',
        maintenance_no_comfirm_notification_broken: '/api/v1/maintenance/no_comfirm_notification_broken',
        maintenance_filter: '/api/v1/maintenance/filter',
      }
    })
  }
});
