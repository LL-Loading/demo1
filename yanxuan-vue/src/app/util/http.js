import axios from 'axios';
import store from '../store';
import Vue from 'vue';
import router from '../router'

const alwaysPendingPromise = new Promise(() => {});

function http(options) {
        let defaultOptions = { method:'post', loading:true, withToken:false };
        options = Object.assign({}, defaultOptions, options);
        if(options.loading) store.commit('loading/show');
        if(options.withToken) {
                options.headers = {
                        Authorization: sessionStorage.getItem('token')
                }
        }
        return axios(options)
                .then(response =>{
                        if(options.loading) setTimeout(() => {store.commit('loading/hide')},1000);
                        if(response.status === 200) return response.data || JSON.parse(response.request.responseText);
                        else throw new Error(response.statusText)
                })
                .then(result =>{
                        let {status, data, message} = result;
                        switch(status){
                                case 200:
                                        if(message !== '') Vue.prototype.$alert(message);
                                        return data;
                                case 401:
                                        sessionStorage.removeItem('token');
                                        message='您未登录或登录超时';
                                        router.push('/login');          //路由跳转到登录
                                case 199:
                                case 500:
                                        throw new Error(message);
                        }
                })
                .catch(err => {
                        if(options.loading) setTimeout(() => {store.commit('loading/hide')},1000);
                        Vue.prototype.$alert(err.message);
                        return alwaysPendingPromise;
                })
}


export default http;