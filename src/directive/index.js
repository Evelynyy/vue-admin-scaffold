import Vue from 'vue'
import dAaa from './d-aaaa'

const window
// tslint:disable:variable-name
const install = (_Vue) => {
  _Vue.directive('d-aaa', dAaa)
}

if (window.Vue) {
  window.dAaa = dAaa
  Vue.use(install)
}

dAaa.install = install

export default dAaa
