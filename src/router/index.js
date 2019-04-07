import Vue from 'vue'
import Router from 'vue-router'

import modelA from './modelA';
import modelB from './modelB';
import modelC from './modelC'

Vue.use(Router)
const asyncRoutes = [{
  path: '/testA',
  name: 'testA',
  meta: {
    name: '模块A'
  },
  component: () => import('@/components/index.vue'),
  children: [
    ...modelA
  ]
}, {
  path: '/testB',
  name: 'testB',
  meta: {
    name: '模块B'
  },
  component: () => import('@/components/index.vue'),
  children: [
    ...modelB
  ]
},{
  path: '/testC',
  name: 'testC',
  meta: {
    name: '模块C'
  },
  component: () => import('@/components/index.vue'),
  children: [
    ...modelC
  ]
}]
const constRoutes = [{
  path: '/',
  redirect: '/testA'
}]
export default new Router({
  mode: 'hash',
  base: __dirname,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constRoutes
})
export { asyncRoutes,constRoutes }