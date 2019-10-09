import API from '../util/api.js';

export default{
        namespaced:true,
        state:{
                list:[],
                order:[]
        },
        getter:{},
        mutations:{
                _init( state,payload ) { state.list = payload },
                _order( state,payload ) { state.order = payload },
        },
        actions:{
                init({commit}) {
                        return API.order.address().then(data => {
                                commit('_init',data);
                        });
                },
                orderList({commit}) {
                        return API.order.orderList().then(data => {
                                commit('_order',data)
                        })
                }
        }
}