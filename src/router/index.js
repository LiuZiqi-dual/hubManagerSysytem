import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/Login'
import Home from '@/Home'
import usertable from '../components/Usertable.vue'
import adduser from '../components/Adduser.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '/usertable',
        name: 'usertable',
        component: usertable
      },
      {
        path: '/adduser',
        name: 'adduser',
        component: adduser
      }]
    }
  ]
})
