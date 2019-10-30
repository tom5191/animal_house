import Vue from 'vue';
import App from './App.vue';
import vuex from 'vuex';

import { MdButton, MdContent, MdTabs, MdField } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import store from './store'
import router from './router'

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdField);
Vue.use(vuex);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
