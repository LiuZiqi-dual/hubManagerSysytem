// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */

//  添加全局路由守卫（导航守卫）
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  var token = localStorage.getItem('mytoken')
  if (token) {
    console.log(456)
    next()
  } else {
    console.log(789)
    console.log(to)
    if (to.path === '/login') {
      next()
    } else {
      next({path: '/login'})
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
