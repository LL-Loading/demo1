import API from '../util/api.js';
import Vue from 'vue';

export default{
        namespaced: true,
        state:{
                list:[]
        },
        getters: {},
        mutations: {
                reset(state) {state.list=[];},
                _init(state,payload) {
                        payload.forEach(item => {
                                item.select1=true;
                                item.select2=false;
                        });
                        state.list = payload
                },
                toggleAllSelect1(state,payload) {  state.list.forEach(item => item.select1 = payload)},
                toggleAllSelect2(state,payload) {  state.list.forEach(item => item.select2 = payload)},
                toggleSelect1(state, payload) {
                        let target = state.list.find(item => item.id === payload);
                        if(target) target.select1 = !target.select1;
                },
                toggleSelect2(state, payload) {
                        let target = state.list.find(item => item.id === payload);
                        if(target) target.select2 = !target.select2;
                },
                _remove(state, payload) {
                        let i = -1;
                        payload.forEach(id => {
                                i = state.list.findIndex(item => item.id === id );
                                if(i !== -1 ) state.list.splice(i, 1);
                        });
                },
                _increase(state,payload) {
                        let target = state.list.find(item => item.id === payload );
                        if(target) target.count = target.count + 1
                },
                _decrease(state,payload) {
                        let target = state.list.find(item => item.id === payload );
                        if(target) target.count = target.count - 1
                }
        },
        actions: {
                init({ commit }) {

                        return API.cart.cartList().then( (data) =>{  commit('_init', data); });
                },

                removeList({commit,state}) {
                        return Vue.prototype.$confirm('确定删除选定的商品从购物车中移除吗？')
                                .then(() => {
                                let ids = [];
                                state.list.forEach(item => {
                                        if(item.select2) {
                                                ids.push(item.id);
                                        }
                                });
                                return API.cart.remove(ids).then(() => commit('_remove',ids));
                                })
                },
                settlement({commit,state},addressId) {
                        let ids = [], account = 0;
                        state.list.forEach(item => {
                                if(item.select1){
                                        ids.push(item.id);
                                        account += item.count * item.newprice;
                                }
                        });
                        return API.cart.settlement(ids,account,addressId).then(() =>{
                                commit('_remove',ids)
                        });
                },
                increase({commit}, {id}) {
                        console.log(id)
                        return API.cart.increase(id).then(() => commit('_increase', id));
                },
                decrease({commit}, {id}) {
                        return API.cart.decrease(id).then(() => commit('_decrease',id));
                },
        }
};