import API from '../util/api.js';
export default{
        namespaced: true,
        modules: {},
        state: {
                activeId: 0,                    //记录当前激活的以及分类id
                list: [],                           //记录所有分类信息
                fids: []
        },
        getters: {
                subList: function(state) {
                        return state.list.activeId ===0 ? [] : state.list.filter(item => item.fid === state.activeId);
                }
        },
        mutations: {
                _appendData: function(state, payload) { state.list = state.list.concat(payload); },
                _recordFid: function(state, payload) { state.fids.push(payload); },
                _toggleId: function(state, payload) { state.activeId = payload; }
        },
        actions:{
                _getData({commit}, fid) {
                        return  API.category.getData(fid)
                                .then(data => {
                                        commit('_recordFid', fid);
                                        commit( '_appendData', data );
                                        return data;
                                });
                },
                toggleId({ state, commit, dispatch}, id) {
                        commit('_toggleId', id);
                        if(state.fids.indexOf(id) !== -1) return Promise.resolve();
                        return  dispatch('_getData', id)
                },
                init: function({ state, dispatch }) {
                        if(state.activeId !== 0) return Promise.resolve([state.list[0]]);
                        return dispatch('_getData', 0);
                }
        }
}