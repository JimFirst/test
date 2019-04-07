import {asyncRoutes, constRoutes} from '../../router/index'
function hasPower(v, info) {
    if(info&&info.length>0){
        return info.some(i=>i.name == v.name);
    }else{
        return false;
    } 
}
const permissions = {
    state: {
        addRoutes: []
    },
    mutations: {
        getRoutes(state, data) {
            state.addRoutes = data
        }
    },
    actions: {
        getAddRoutes({commit}, info) {
            return new Promise((resolve, reject) => {
                let addRoutes = asyncRoutes.filter(v => {
                    if(hasPower(v, info)){
                        if (v.children && v.children.length > 0) {
                            v.children = v.children.filter(child => {
                                if (hasPower(child,info)) {
                                    return child
                                }
                                return false;
                            })
                            console.log(v)
                            return v;
                        }
                    }
                })
                commit('getRoutes', addRoutes)
                resolve([...constRoutes,...addRoutes])
            })
            
        }
    }
}
export default permissions