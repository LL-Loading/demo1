import Vue from 'vue';
import Vuex from 'vuex';

import category from './category.js';
import loading from './loading.js';
import product from './product.js'
import cart from './cart.js';
import address from './address.js';
import order from './order.js';
Vue.use(Vuex);

const store = new Vuex.Store({
        modules: { category, loading, product, cart, address,order },
        state: {},
        getters: {},
        mutations: {},
        actions: {}
});

export default store;