// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueQuillEditor from  'vue-quill-editor'
import router from './router'
import ElementUI from 'element-ui';

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
