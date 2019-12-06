module.exports = (api, options, rootOptions) => {
  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      'axios': '^0.18.0',
      'lodash': '^4.17.10',
      '@ungap/url-search-params':'^0.1.2'
    },
    /**
     * https://github.com/babel/babel/tree/master/packages/babel-preset-stage-2 stage2迁移方案
     */

    devDependencies: {
      '@babel/plugin-syntax-import-meta': '^7.0.0',
      '@babel/plugin-proposal-json-strings': '^7.0.0',
      '@babel/plugin-proposal-function-sent': '^7.0.0',
      '@babel/plugin-proposal-export-namespace-from': '^7.0.0',
      '@babel/plugin-proposal-numeric-separator': '^7.0.0',
      '@babel/plugin-proposal-throw-expressions': '^7.0.0',
      'eslint-config-standard': '^12.0.0',
      'eslint-friendly-formatter': '^3.0.0',
      'eslint-loader': '^2.0.0',
      'eslint-plugin-html': '^3.0.0',
      'eslint-plugin-import': '^2.7.0',
      'eslint-plugin-node': '^5.2.0',
      'eslint-plugin-promise': '^3.4.0',
      'eslint-plugin-standard': '^3.0.1',
      'prettier': '^1.6.1',//check
      'prettier-eslint': '^8.0.0',//check,
    },
    scripts: {
      "serve": "vue-cli-service serve --open",
      "build": "vue-cli-service build",      
      'lint': 'vue-cli-service lint'
    }
  });
  // 安装 vuex
  if (options.vuex) {
    api.extendPackage({
      dependencies: {
        'vuex': '^3.1.1'
      }
    });
  }


  // 安装 element-ui 库
  if (options.element) {
    api.extendPackage({
      dependencies: {
        'element-ui': '^2.10.1'
      }
    });
  }

  // 安装 vue-router 库
  if (options.router) {
    api.extendPackage({
      dependencies: {
        'vue-router': '^3.0.1'
      }
    });
  }

  // Use pre-commit for auto fix + format
  if (options.precommit) {
    api.extendPackage({
      devDependencies:{
        'husky': '^0.14.3',
        'lint-staged': '^4.1.3'
      },
      scripts:{
        'precommit': 'lint-staged'
      },
      'lint-staged': {
        'src/**/*.{js,scss,css,less}': [
          'prettier-eslint --write',
          'git add'
        ],
        'src/**/*.vue': [
          './node_modules/.bin/eslint --fix',
          'git add'
        ]
      },
    })
  }
  // 安装 meishaWatch 库
  if (options.meishaWatch) {
    api.extendPackage({
      dependencies: {
        'meisha-fe-watch': '^1.0.5'
      }
    });
  }
  // 安装公共sass变量库
  if (options.sassPattern) {
    api.extendPackage({
      dependencies: {
        "style-resources-loader": "^1.2.1",
        "vue-cli-plugin-style-resources-loader": "^0.1.3",
      }
    });
  }


  //删除原生src文件
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/'))
      .forEach(path => delete files[path])
  })

  //公共基础目录和文件
  api.render('./base');

  // 配置文件
  // api.render({
  //   './.eslintrc.js'     : './base/_eslintrc.js',
  //   './.gitignore'       : './base/_gitignore',
  //   './.eslintignore'    : './base/_eslintignore',
  //   './.editorconfig'    : './base/_editorconfig',
  //   './.browserslistrc'  : './base/_browserslistrc',
  //   './ESLINT.md'        : './base/ESLINT.md',
  //   './babel.config.js'  : './base/babel.config.js'
  // });
}
