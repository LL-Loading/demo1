import http from './http.js';

export default {
        category: {
                getData(fid) { return http({ method: 'get', url: '/category/list/' + fid }); }
        },
        product:{
                getList(ajaxData) {
                        return http({ method:'get', url:'/list/productlist', data: ajaxData })
                },
                getItem(id) {
                        return http({ url:'/list/detail/' + id, method: 'get'  })
                }
        },
        user:{
                loginPwd(name, pwd) {
                        return http({ url:'/user/login/name', data:{ name,pwd } })
                },
                getCode() {
                        return http({ method:'get', url:'/user/login/getCode', loading:false })
                },
                loginPhone(phone,code) {
                        return http({ url:'/user/login/phone', data:{ phone,code }, loading:false })
                },
                getUser() {return http({ url:'/user/getUser',  method:'get', withToken:true, })},
                register(ajaxData) { return http({ url:'/user/register', data:ajaxData }) },
        },
        cart: {
                product(pid, count){  return http({url: '/cart/product', data:{pid, count} , withToken:true}) },
                getCount() {return http({ url:'/cart/count', withToken:true, method:'get' })},
                cartList() { return http({ url:'/cart/list', withToken:true }) },
                remove(ids) { return http({ withToken: true, url:'/cart/delete', data: { ids:JSON.stringify(ids) } }); },
                settlement(ids,account,addressId) { return http({ withToken:true, url:'/cart/settlement', data:{ ids:JSON.stringify(ids),account:account ,addressId} }) },
                increase(id) { return http({ withToken:true, url:'/cart/increase/' +id, method:'get'}) },
                decrease(id) { return http({ withToken: true, url:'/cart/decrease/' +id, method:'get'}) },

        },
        address:{
                addressList() { return http({ url:'/address/list', withToken:true, }) },
                setDefault(id) { return http({ url:'/address/default/' +id , withToken:true,}) },
                addAddress(ajaxData) { return http({ url:'/address/add', data:ajaxData, withToken:true, }) },
                deleteAddress(id) { return http({ url:'/address/delete/' +id, withToken:true }) },
                update(ajaxData) { return http({ url:'/address/update/'+ajaxData.id, withToken:true, data:ajaxData }) },
        },
        order:{
                address() { return http({ url:'/order/list', withToken:true, data:{ isDefault:1 } })  },
                orderList() { return http({ url:'/order/account', withToken:true,  }) },
                orderDetail() { return http({ url:'/order/getlist', withToken:true,  }) },
        },
}
