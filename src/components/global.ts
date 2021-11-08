import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('./', false, /[\w]+\.vue$/)

requireComponent.keys().forEach(key => {
  const componentConfig = requireComponent(key)
  const fileName = key.match(/[\w]+\.vue$/)[0]
  const componentName = upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$/, '')))
  Vue.component(componentName, componentConfig.default || componentConfig)
})
