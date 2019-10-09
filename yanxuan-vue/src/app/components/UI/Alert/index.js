import Vue from 'vue';

const AlertConstructor = Vue.extend(require('./Alert.vue').default);


export default text=> {
        let Instance = new AlertConstructor({data: {text}}).$mount();
        document.body.appendChild(Instance.$el)

}