// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueQuillEditor from  'vue-quill-editor'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import rangeInput from './components/common/rangeInput.vue'
import AMap from 'vue-amap';
Vue.use(AMap);
Vue.use(ElementUI);
Vue.use(vueQuillEditor)
Vue.config.productionTip = false
Vue.component(rangeInput.name,rangeInput)

router.beforeEach((to, from, next) => {
  if(to.path == '/path') {
    next()
  } else {
    if(store.state.permissions.addRoutes.length == 0) {
      let data = [{
        name:'testA'
      },{
        name:'aa'
      },{
        name:'ab'
      },{
        name:'testC'
      },{
        name:'ca'
      },{
        name:'cc'
      }];
      store.dispatch('getAddRoutes',data).then(res => {
        router.addRoutes(res)
        next({ ...to, replace: true })
      })
    } else {
      next()
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
