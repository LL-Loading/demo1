import API from '../util/api.js';

export default {
        namespaced:true,
        state:{
                list:[],
                fids:[]
        },
        getters:{
                mainList(state) {return state.list.filter(item => item.fid === 0 )},
        },
        mutations:{
                _recordFid(state,fid) { state.fids.push(fid) },
                _appendData(state,data) { state.list = state.list.concat(data) },
                _addCategory(state,item) {
                        if(state.fids.indexOf(item.fid) !== -1) state.list.push(item)
                },
                _updateCategory(state, data) {
                        let oldData = state.list.find((item) => item.id === data.id);
                        //如果修改分类时更换了父分类，且父分类没有被懒加载过
                        if(oldData.fid !== data.fid && state.fids.indexOf(data.fid) ===-1 ){
                                let i = state.list.findIndex(item => item.id === data.id);
                                state.list.splice(i,1)
                        } else {
                                let i = state.list.findIndex(item => item.id === data.id);
                                state.list.splice(i,1,data)
                        }
                },
                _removeCategory(state,id) {
                        let i = state.findIndex(item => item.id === id );
                        state.list.splice(i, 1);
                },
        },
        actions:{
                getData({state,commit}, fid) {
                        if(state.fids.indexOf(fid) !== -1)
                                return Promise.resolve(state.list.filter(item => item.fid === fid))
                        else {
                                return API.category.getData(fid)
                                .then(data => {
                                        commit('_recordFid', fid);
                                        commit('_appendData', data);
                                        return data;
                                })
                        }
                },
                addCategory({commit},ajaxData) {
                        return API.category.addCategory(ajaxData)
                                .then(id => {
                                        commit('_addCategory',Object.assign({},ajaxData,{id}));
                                        return id;
                                })
                },
                updateCategory({commit}, ajaxData) {
                        return API.category.updateCategory(ajaxData)
                                .then(() => {
                                        let { oldAvatar, ...data } = ajaxData;
                                        data.avatar = data.avatar !== '' ? '/images/category/' + data.avatar : oldAvatar;
                                        commit('_updateCategory', data);
                                        return data;
                                });
                },
        },
        removeCategory({commit}, ajaxData) {
                return API.category.removeCategory(ajaxData)
                        .then(() => commit('_removeCategory', ajaxData.id));
        },

}