import http from '../util/http.js'
import API from '../util/api.js';

export default {
        namespaced: true,
        state:{
                list:[],
        },
        getter:{},
        mutations:{
                _reset: function(state){
                        state.list = [];
                },
                _updateList(state, payload) { state.list = payload },
                _appendData: function(state, payload){
                        state.list = state.list.concat(payload);
                }

        },
        actions:{
                getData({ commit}, payload){
                        if(payload.start === 0) commit('_reset');
                        return new Promise(resolve =>{
                               http({ data: payload, url: '/list/productlist',  loading: false })
                                        .then(data =>{
                                                commit('_appendData', data);
                                                resolve(data.length);
                                        });
                        });
                },
                getItem({state}, payload) {
                        let target = state.list.find(item => item.id === payload);
                        if(target)  return Promise.resolve(target);
                        else return API.product.getItem(payload)
                }
        }
}