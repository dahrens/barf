// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'
import VueChartist from 'vue-chartist'

Vue.config.productionTip = false

fontawesome.library.add(brands, solid)

if (JSON && !JSON.dateParser) {
  var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/
  JSON.dateParser = function (key, value) {
    if (typeof value === 'string') {
      var a = reISO.exec(value)
      if (a) return new Date(value)
    }
    return value
  }
}

Vue.use(VueChartist)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
