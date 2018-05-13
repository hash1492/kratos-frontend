import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import ResetPassword from '../components/ResetPassword.vue'
import Home from '../components/Home.vue'
import MyProfile from '../components/MyProfile.vue'
import ViewOthersProfile from '../components/ViewOthersProfile.vue'
import FriendsList from '../components/FriendsList.vue'

import Auth from '../services/auth/auth.service'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(Auth.isLoggedIn()) {
          next({name: 'Home'});
        } else {
          next();
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if(Auth.isLoggedIn()) {
          next({name: 'Home'});
        } else {
          next();
        }
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      beforeEnter: (to, from, next) => {
        if(Auth.isLoggedIn()) {
          next({name: 'Home'});
        } else {
          next();
        }
      }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
      beforeEnter: (to, from, next) => {
        if(Auth.isLoggedIn()) {
          next({name: 'Home'});
        } else {
          next();
        }
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if(!Auth.isLoggedIn()) {
          next({name: 'Login'});
        } else {
          next();
        }
      }
    },
    {
      path: '/my-profile',
      name: 'MyProfile',
      component: MyProfile,
      beforeEnter: (to, from, next) => {
        if(!Auth.isLoggedIn()) {
          next({name: 'Login'});
        }
      }
    },
    {
      path: '/profile/:user_id',
      name: 'ViewOthersProfile',
      component: ViewOthersProfile,
      beforeEnter: (to, from, next) => {
        if(!Auth.isLoggedIn()) {
          next({name: 'Login'});
        } else {
          next();
        }
      }
    },
    {
      path: '/my-friends',
      name: 'FriendsList',
      component: FriendsList,
      beforeEnter: (to, from, next) => {
        if(!Auth.isLoggedIn()) {
          next({name: 'Login'});
        } else {
          next();
        }
      }
    },
    { path: '*', redirect: '/login' }
  ]
})
