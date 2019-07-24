module.exports = {
  presets: [
    ['@vue/app',{
      <%_ if(options.polyfill){ _%>
      useBuiltIns: 'entry',
      <%_ } _%>
    }]
  ],
  plugins:[
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions"
  ]
}
  