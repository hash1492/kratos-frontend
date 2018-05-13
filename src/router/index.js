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

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/my-profile',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: '/profile/:user_id',
      name: 'ViewOthersProfile',
      component: ViewOthersProfile
    },
    {
      path: '/my-friends',
      name: 'FriendsList',
      component: FriendsList
    },
    { path: '*', redirect: '/login' }
  ]
})
