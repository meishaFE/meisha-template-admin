<%_ if(options.sassPattern){ _%>
const path = require('path');
<%_ } _%>

module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true
  },
  outputDir: '<%= options.buildName %>',
  <%_ if(options.sassPattern){ _%>
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_index.scss')
      ]
    }
  }
  <%_ } _%>
}
