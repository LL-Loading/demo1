import http from './http.js';

export default {
        user:{
                admin(ajaxData) {
                        return http({ url:'/user/admin', withToken:true, data:ajaxData })
                },
                changePwd(ajaxData) { return http({ url:'/user/changepwd', data:ajaxData, withToken:true }) }
        },
        category: {
                getData(fid){
                        return http({method: 'get', url: '/category/list/' + fid});
                },
                addCategory(ajaxData){
                        return http({url: '/category/add', data: ajaxData});
                },
                removeCategory(ajaxData){
                        return http({url: '/category/remove', data: ajaxData});
                },
                updateCategory(ajaxData){
                        return http({url: '/category/update', data: ajaxData})
                },
                removeCategory(ajaxData){
                        return http({url: '/category/remove', data: ajaxData});
                },
        },
        product: {
                getProductData(ajaxData) { return http({ url:'/product/admin-list', data:ajaxData }) },
                removeBanner(ajaxData) { return http({ url:'/product/banner/remove', data:ajaxData }) },
        },
}