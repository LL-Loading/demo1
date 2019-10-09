import API from '../util/api.js';

export default {
        namespaced:true,
        state:{
                list:[],
        },
        getters:{},
        mutations:{
                _init( state,payload ) { state.list = payload },
                _setDefault(state, payload){
                        state.list.forEach(item => item.isDefault = item.id === payload ? 1: 0)
                },
                _remove(state,payload){
                        let i = state.list.findIndex(item => item.id === payload);
                        if(i !== -1)  state.list.splice(i, 1);
                },
                _add(state,payload) {
                        state.list.push(payload)
                },
                _updateList(state,payload) {
                        let i = state.list.findIndex(item => item.id === payload.id);
                        if(i !== 1) state.list.splice(i, 1, payload);
                }

        },
        actions:{
                addressList({commit}) {
                        return API.address.addressList().then(data => {
                                commit('_init',data);
                        });
                },
                setDefault({commit},payload) {
                        return API.address.setDefault(payload).then(data => commit('_setDefault', payload))
                },
                remove({commit},payload) {
                        return API.address.deleteAddress(payload).then(() => commit('_remove',payload))
                },
                addAddress({commit},payload) {
                        return API.address.addAddress(payload).then(data => commit('_add',payload))
                },
                updateAddress({commit}, payload) {
                        return API.address.update(payload).then(data => commit('_updateList', Object.assign({} , payload)))
                },

        },
}