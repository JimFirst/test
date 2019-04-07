import Vue from 'vue'
import Vuex from 'vuex'

import permissions from './modules/permissions'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        permissions
    },
    state: {
        test:'111'
    },
    getters: {

    },
})
export default store