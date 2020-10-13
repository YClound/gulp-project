const presets = [
  [
    "@babel/env",
    {
      "targets": { //指定要转译到哪个环境
        //浏览器环境
        "browsers": ["last 2 versions", "safari >= 7"]
      },
      "modules": false
    },
    "stage-2"
  ]
]

const plugins = [
  ["@babel/plugin-transform-runtime", {
    "absoluteRuntime": false,
    "corejs": false,
    "helpers": false,
    "regenerator": true,
    "useESModules": false
  }],
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-transform-regenerator",
  "@babel/plugin-transform-modules-commonjs",
  ["@babel/plugin-proposal-decorators", { "legacy": true }],]

module.exports = { presets, plugins }