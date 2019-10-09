import Vue from 'vue';
import Router from 'vue-router';
import page from '../page';

Vue.use(Router);

const router = new Router({
        routes:[
                { path:'/login', component:page.Login },
                { path:'/home', component:page.Home },
        ],
});

router.beforeEach((to, from, next) => {
        if(to.fullPath === '/home' && !sessionStorage.getItem('name'))  next('/login');
        else next();
});


export default router;