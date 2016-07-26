import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import Lib from './common/lib.js'
import store from './vuex/store.js'

require('./common/base.sass');
require('./common/main.sass');
let devWidth = document.documentElement.clientWidth;
if( devWidth > 640 ) devWidth = 640;
document.documentElement.style.fontSize = devWidth / (750/100) + 'px';

Vue.use(VueTouch);
Vue.use(VueRouter);
Vue.use(VueResource);


import {closeLoading,openLoading} from './vuex/actions'
//全局函数 调用顶层设置title
Vue.mixin({
  methods: {
  	setTitle: function (val) {
	  	if(val) this.$dispatch('setTitle', val);
	},
	setLoadStatus: function (val) {
	  	this.$dispatch('setLoadStatus', val);
	}
  },
  vuex: {
    actions: {
      closeLoading,openLoading
    }
  }
});
//错误组件
Vue.component('error-module', reslove => { return require(['./components/Error.vue'],reslove) });
Vue.component('loading-module', reslove => { return require(['./components/Loading.vue'],reslove) });
Vue.component('app-download', reslove => { return require(['./components/AppDownload.vue'],reslove) });

//顶层组件 设置title
let topApp = Vue.extend({
	data (){
		return {
			loadStatus: true
		}
	},
	events: {
	    'setTitle': function (title) {
	      Lib.setTitle(title);
	    },
	    'setLoadStatus': function (val) {
	      this.loadStatus = val;
	    }
	},
	store
});

//加载路由配置
import configRoute from './router.js'
let router = new VueRouter();
configRoute(router,Vue,topApp);