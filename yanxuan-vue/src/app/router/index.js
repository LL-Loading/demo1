import Vue from 'vue';
import Router from 'vue-router'

import page from '../page';
Vue.use(Router);                //注册组件
const router = new Router({

        routes: [
                { path:'/', redirect:'/home' },
                { path: '/home', component: page.Home },
                {
                        path: '/cart',
                        component: page.Cart,
                        mate:{ keepAlive:true, authenticate:true }
                },
                { path: '/category', component: page.Category },
                { path: '/identify', component: page.Identify },
                { path: '/profile', component: page.Profile },
                {
                        path: '/list/:mId/:sId',
                        component: page.List,
                        meta:{ keepAlive:true }

                },
                { path:'/login', component:page.Login },
                { path:'/detail/:id', component:page.Detail },
                { path:'/address', component:page.Address },
                {
                        path:'/order',
                        component:page.Order,
                        meta:{ authenticate:true }
                },
                { path:'/register', component:page.Register },
                { path:'/payment', component:page.Payment },
                { path:'/orderdetail', component:page.OrderDetail },
        ]

});
router.beforeEach((to, from, next) => {
        if(to.meta.authenticate && !sessionStorage.getItem('token'))
                router.push({ name:'login', params: { reference: to.fullPath } });
        else if(to.fullPath === '/login' && !to.params.reference) {
                to.params.reference = from.fullPath;
                next();
        } else
                next();

});

//导出
export default router;