// import Vue from 'vue'
// export const updataUserInfoData = ({ dispatch },userId) => {

// 	return Vue.http.get('/user/information',{ params: { userId: userId } }).then((rep) => {
// 		dispatch({
// 		  	type: 'UPDATA_USERINFO_DATA',
// 		  	userInfoData: rep.json()
// 		});
//   	}).catch(response => Promise.reject());

// }

export const closeLoading = ({ dispatch }) => {
	dispatch('CLOSE_LOADING');
}
export const openLoading = ({ dispatch }) => {
	dispatch('OPEN_LOADING');
}


export const addUserInfoData = ({ dispatch, state},id,data) => {
	if( !state.userInfo_datas[ 'state_' + id ] ){
		dispatch({
			type: 'ADD_USERINFO_DATA',
			id: id,
			data: data
		});
	}
}