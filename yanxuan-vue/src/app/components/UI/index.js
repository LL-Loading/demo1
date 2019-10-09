//所有vue的母亲是Vue，父亲是Vue.prototype, javascript规定， 父亲具有的属性儿子自动具有

import Vue from 'vue';
import notice from './Notice'
import alert from './Alert'
import confirm from './Confirm';

Vue.prototype.$notice = notice;
Vue.prototype.$alert = alert;
Vue.prototype.$confirm = confirm;