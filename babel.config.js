module.exports = {
  //
  // Preset configurations which are "inherited".
  //
  presets: [
    // Replace JavaScript language features which are not universally supported, with equivalents that are compatible
    // with your target browsers.
    "@babel/preset-env",

    // Replace JSX syntax with React.* API calls.
    "@babel/preset-react"
  ],

  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
};
