import axios from 'axios';
import { MessageBox,Loading } from 'element-ui';
import router from '../router';

const alwaysPendingPromise = new Promise(() => {});
let loadingInstance = null;

function http(options) {
        let defaultOptions = { method:'post',  withToken:false };
        options = Object.assign({}, defaultOptions, options);
        if(options.withToken) {
                options.headers = {
                        Authorization: sessionStorage.getItem('token')
                }
        };
        loadingInstance = Loading.service();


        return axios(options)
                .then(response =>{
                        if(response.status === 200) return response.data || JSON.parse(response.request.responseText);
                        else throw new Error(response.statusText)
                })
                .then(result =>{
                        let {status, data, message} = result;
                        switch(status){
                                case 200:
                                        if(message !== '') MessageBox.alert(message, '提示', { showClose:false,type:'success' });
                                        setTimeout(() => {
                                                loadingInstance.close();
                                        },500);
                                        return data;
                                case 401:
                                        sessionStorage.removeItem('token');
                                        sessionStorage.removeItem('name');
                                        message='您未登录或登录超时';
                                        router.replace('/login');          //路由跳转到登录
                                case 199:
                                case 500:
                                        throw new Error(message);
                        }
                })
                .catch(err => {
                        MessageBox.alert(err.message,'警告', { showClose:false,type:'warning' });
                        setTimeout(() => {
                                loadingInstance.close();
                        },500);
                        return alwaysPendingPromise;
                })
}


export default http;