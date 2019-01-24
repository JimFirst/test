import axios from 'axios'
import store from '../store'
import Cookies from 'js-cookie'
import router from '../router'
import MessageBox from 'element-ui/lib/message-box'
import Notification from 'element-ui/lib/notification';

let pending = []; 
let cancelToken = axios.CancelToken; 
let removePending = (config) => { 
    for(let p in pending){ 
        if(pending[p].u === config.url + '&' + config.method) { 
            if(pending[p].cancel&&config.cancel){
                pending[p].f(); 
                pending.splice(p, 1);  
            } 
        } 
    } 
} 

export function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: window.Global.ctx,
            timeout: 45000,
            headers: {
                'Authorization': Cookies.get("web3Token"),
                'refreshToken':Cookies.get("web3refreshToken"),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'application/json;charset=UTF-8'
                // 'Content-Type': 'text/html;charset=UTF-8'
            },
        })

        instance.interceptors.request.use(function (config) {
            removePending(config);
            config.cancelToken = new cancelToken((c)=>{
                pending.push({ u: config.url + '&' + config.method, f: c ,cancel:config.cancel?config.cancel:false});  
            })
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            removePending(response.config); 
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });

        instance(options)
            .then(response => {
                const res = response.data;
                if (res.resultCode !== 0&&res.resultCode !==55000) {
                    const axiosErrorMessage = store.state.user.axiosErrorMessage;
                    const time = new Date().getTime();
                    switch (res.resultCode) {
                            case 4:
                            Cookies.remove('web3Token');
                            if (axiosErrorMessage.msg != res.message || time - axiosErrorMessage.time > 2000) {
                                MessageBox({
                                    title: '异常',
                                    message: '当前账号已过期',
                                    type: 'error',
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: '关闭',
                                })
                            };
                            router.push({
                                path: '/login',
                            });
                            store.commit('SET_axiosErrorMessage', {
                                time: time,
                                msg: res.message
                            });
                            break;
                        case 3:
                            Cookies.remove('web3Token');
                            if (axiosErrorMessage.msg != res.message || time - axiosErrorMessage.time > 2000) {
                                MessageBox({
                                    title: '异常',
                                    message: '当前账号已被禁用，请联系管理员',
                                    type: 'error',
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: '关闭',
                                })
                            };
                            router.push({
                                path: '/login',
                            });
                            store.commit('SET_axiosErrorMessage', {
                                time: time,
                                msg: res.message
                            });
                            break;
                        case 2:
                            Cookies.remove('web3Token');
                            if (axiosErrorMessage.msg != res.message || time - axiosErrorMessage.time > 2000) {
                                MessageBox({
                                    title: '服务器异常',
                                    message: '登陆超时',//token为空
                                    type: 'error',
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: '关闭',
                                })
                            };
                            router.push({
                                path: '/login',
                            });
                            store.commit('SET_axiosErrorMessage', {
                                time: time,
                                msg: res.message
                            });
                            break;
                        case 1:
                            Cookies.remove('web3Token');
                            if (axiosErrorMessage.msg != res.message || time - axiosErrorMessage.time > 2000) {
                                MessageBox({
                                    title: '服务器异常',
                                    message: '登陆超时',
                                    type: 'error',
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: '关闭',
                                })
                            }
                            router.push({
                                path: '/login',
                            });
                            store.commit('SET_axiosErrorMessage', {
                                time: time,
                                msg: res.message
                            });
                            break;
                        case 12000:
                            if (axiosErrorMessage.msg != res.message || time - axiosErrorMessage.time > 2000) {
                                MessageBox({
                                    title: '服务器异常',
                                    message: '系统错误',
                                    type: 'error',
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: '关闭',
                                })
                            }
                            store.commit('SET_axiosErrorMessage', {
                                time: time,
                                msg: res.message
                            });
                            break;
                        case 15000:
                            if (axiosErrorMessage.msg != res.message || time - axiosErrorMessage.time > 2000) {
                                MessageBox({
                                    title: '服务器异常',
                                    message: '参数错误',
                                    type: 'error',
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: '关闭',
                                })
                            }
                            store.commit('SET_axiosErrorMessage', {
                                time: time,
                                msg: res.message
                            });
                            break;
                        case 30003:
                            MessageBox({
                                title: '点位过保',
                                message: res.message,
                                type: 'error',
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonText: '关闭',
                            });
                            break;
                        case 55001:
                            MessageBox({
                                title: '请期待',
                                message: '当前只提供机箱数据查看，其余功能开发中，敬请期待！',
                                type: 'error',
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonText: '关闭',
                            });
                            break;
                        default:
                            // MessageBox({
                            //     title: '服务器异常',
                            //     message: res.message,
                            //     type: 'error',
                            //     showCancelButton: true,
                            //     showConfirmButton: false,
                            //     cancelButtonText: '关闭',
                            // })
                            Notification({
                                title: '警告',
                                message: res.message,
                                type: 'warning',
                                duration:'2000'
                              });                      
                            store.commit('SET_axiosErrorMessage', {
                                time: time,
                                msg: res.message
                            });
                            break;
                    }
                };
                resolve(res)
            }).catch(err => {
                const time = new Date().getTime();
                store.commit('SET_axiosErrorMessage', {
                    time: time,
                    msg: '服务器异常:' + (err.code === 'ECONNABORTED' ? '请求超时' : '异常')
                });
                reject(err)
            })
    })
}

export function dataUtil(data) {
    const qs = require('qs');
    return qs.stringify(data)
}