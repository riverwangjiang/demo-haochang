import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 应用初始化状态
const state = {
	//loading
	loadingStatus: false,
	//个人页面
	userInfo_datas: {}
}

const mutations = {
  	// UPDATA_USERINFO_DATA (state, { userInfoData }) {
   //  	state.userInfo_data = userInfoData.data;
  	// }
  	OPEN_LOADING (state){
  		state.loadingStatus = true;
  	},
  	CLOSE_LOADING (state){
  		state.loadingStatus = false;
  	},
  	ADD_USERINFO_DATA (state,{data,id}){
  		state.userInfo_datas[ 'state_' + id ] = data;
  	}
}

export default new Vuex.Store({
	  // strict: true,
	  state,
	  mutations
})