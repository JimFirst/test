import Vue from 'vue'
import Router from 'vue-router'

import modelA from './modelA';
import modelB from './modelB'
Vue.use(Router)
const asyncRoutes=[{
  path: '/index',
  name: 'testA',
  meta:{
    name:'模块A'
  },
  component:() => import ('@/components/index.vue'),
  children:[
    ...modelA
  ]
},{
  path: '/index',
  name: 'testB',
  meta:{
    name:'模块B'
  },
  component:() => import ('@/components/index.vue'),
  children:[
    ...modelB
  ]
}]
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    ...asyncRoutes
  ]
})
export {asyncRoutes }