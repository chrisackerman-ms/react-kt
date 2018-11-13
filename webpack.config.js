const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //
  // What to bundle.
  //
  entry: {
    client: [
      // Prepend the polyfill module to the bundle to support legacy environments (IE). This is in place of letting
      // Babel inject polyfills automatically. See the ".babelrc" file "useBuildIns" option.
      "@babel/polyfill",

      // And here is the entry point to our web application.
      "./src/index.jsx"
    ]
  },

  //
  // How to resolve dependencies.
  //
  resolve: {
    // Extensions to append to an import string/path if it does not include an explicit extension.
    // * E.g. `import "./foo"` will first try to import "./foo.js", then "./foo.tsx", "./foo/index.js", and finally
    //   "./foo/index.jsx".
    extensions: [".js", ".jsx"],

    // Define how modules (import/require) will be resolved.
    // * Using an ABSOLUTE path for "node_modules" fixes some problems when using linked modules. Look up NPM and
    //   module linking for more information.
    modules: [path.join(__dirname, "node_modules")]
  },

  //
  // Configure how different modules or module types are handled.
  //
  module: {
    //
    // Define the loaders used for modules which match regular expressions.
    //
    // * If multiple loaders are given for a rule, they are "nested" similar to the way filters in a web server work.
    //   The first one uses the output returned by the second one. You could also think about it as running in reverse
    //   order to the order in which they are listed.
    //
    rules: [
      {
        // Match JavaScript and JSX files (no TypeScript).
        test: /\.jsx?$/,
        use: [
          // Run the raw source through the Babel compiler.
          { loader: "babel-loader", options: { babelrc: true } }
        ]
      },
      {
        // Match CSS files.
        test: /\.css$/,
        use: [
          // This loader accepts the output from the next loader (it wraps the next loader), and uses it to create a
          // <style> tag on your page.
          "style-loader",

          // This loader reads CSS into an intermediate data structure. If you didn't use the above "style-loader" with
          // it, you would get this raw data structure as the result of your import statement, but no actual css would
          // be applied to the page.
          "css-loader",

          // You could use an additional loader (e.g. Sass) to accept higher order style languages.
        ]
      }
    ]
  },

  //
  // Where to write bundled output.
  //
  output: {
    // Set the target directory for output bundles.
    path: path.resolve("dist"),

    // Define the bundle name. We're using the name of the project (from package.json), a hash of the bundle's content,
    // and the ".bundle.js" suffix.
    // * Using the hash works to break caching when the site is updated.
    filename: "[name].[chunkhash].bundle.js"
  },

  //
  // Configure source map output.
  //
  // The "source-map" value creates a *.js.map file which completely maps the bundle output back to your source code.
  // There are other options which may be faster or generate fewer output files, but this is the most complete and
  // compatible.
  //
  devtool: "source-map",

  //
  // Configure the local development server.
  //
  devServer: {
    port: 8080
  },

  //
  // Add Webpack plugins.
  //
  plugins: [
    // Generates an index.html file in the output directory with an appended bundle <script> tag.
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
