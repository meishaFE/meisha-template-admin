// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    WxLogin: false,
    $tool: false,
    $cookie: false,
    $http: false,
    $type: false,
    CONFIG: false,
    MeishaWatch: false
  },
  // add your custom rules here
  'rules': {
    'semi': [
      'error', 'always'
    ],
    'max-len': [
      'warn', 180
    ],
    // 一个函数的复杂性不超过 10，所有分支、循环、回调加·在一起，在一个函数里不超过 10 个
    complexity: [
      2, 10
    ],
    // 一个函数的嵌套不能超过 5 层，多个 for 循环，深层的 if-else，都是罪恶之源
    'max-depth': [
      2, 5
    ],
    // 一个函数最多 5 个参数。参数太多的函数，意味着函数功能过于复杂，请拆分
    'max-params': [
      2, 5
    ],
    // 一个函数最多有 100 行代码，如果超过了，请拆分之，或者精简之
    'max-statements': [
      2, 100
    ],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production'
      ? 2
      : 0
  }
}
