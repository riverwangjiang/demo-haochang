<template>
 <div class="userInfo-wrapper container container-bg" v-show="ajaxCompeted">
	  <div v-if="isNormal">
	  	  <div class="userInfo-info">
			<div class="userInfo-avatar containerSidePadding">
				<user-avatar :user-data="userInfoData.data.user"></user-avatar>
			</div>
	  	  	<div class="userInfo-id fs24"  href="javascript:;" v-touch:tap="copy($event)" >ID {{userInfoData.data.user.id}}</div>			
			<div class="userInfo-intro">
	  	  		<descript-widget title="简介：" :content=" userInfoData.data.intro == ''? '这家伙很懒，什么都没留下' : userInfoData.data.intro "></descript-widget>
	  	  	</div>
	  	  </div>
		  <div class="userInfo-Rank" v-if="!rankEmpty">
		  	  <div class="userInfo-topRank" v-if="!topRankEmpty">
		  		  <music-list list-name="热门作品" :list-ary="userInfoData.data.top_rank"></music-list>
		  	  </div>
		  	  <div class="userInfo-recentRank" v-if="!recentRankEmpty">
		  		  <music-list list-name="最近打榜" :list-ary="userInfoData.data.recent_rank"></music-list>
		  	  </div>
		  	  <div class="userInfo-appDownload fs32">下载好唱，查看更多作品</div>
		  </div>
			
		  <div class="userInfo-noRank" v-if="rankEmpty">
		  	  <error-module error-msg="该用户暂无作品"></error-module>
		  </div>
	  </div>
	  <div class="userInfo-error" v-if="!isNormal">
	  	  <error-module :error-msg="userInfoData.error"></error-module>
	  </div>
	  <app-download :url="userInfoData.data.appUrl"></app-download>
  </div>
</template>
<script>
import DescriptWidget from './DescriptWidget.vue'
import MusicList from './MusicList.vue'
import UserAvatar from './UserAvatar.vue'

import { addUserInfoData } from '../vuex/actions'   //vuex方法
export default {
  vuex: {
    actions: {
      addUserInfoData
    },
    getters: {
      getterUserInfo: (state) => state.userInfo_datas
    }
  },
  data (){
    return {
    	userInfoData: {
    		data: {
    			appUrl: 'XXXXXXXXXXXXX',
		    	user: {
		            id: 0,
		            avatar: '',
		            nickname: ''
		        },
		        intro: '这家伙很懒，什么都没留下',
		    	top_rank: {                          
		            name: 'topRank',
		            id: 0
		        },
		        recent_rank: [    
		            {
		                name: 'topRank',
		            	id: 0
		            }
		        ]
    		},
    		errno: 0,
    		error: ''
	    },
	    introOpen: false,
	    ajaxCompeted: true
    }
  },
  computed:{
  	rankEmpty (){
		return  ( this.userInfoData.data.top_rank == ''  && this.userInfoData.data.recent_rank == 0) ? true : false;
  	},
  	topRankEmpty (){
  		return this.userInfoData.data.top_rank == '' ? true : false; 
  	},
  	recentRankEmpty (){
  		return this.userInfoData.data.recent_rank.length == 0 ? true : false; 
  	},
  	isNormal (){
  		return this.userInfoData.errno == 0 ? true : false; 
  	}
  },
  components: {
  	'music-list': MusicList,
  	'descript-widget': DescriptWidget,
  	'user-avatar': UserAvatar
  },
  route: {
    data() {
    	this.setTitle('好唱-个人主页');
	  	let query = this.$route.params; //查询id
	  	let local_data = this.getterUserInfo[ 'state_' + query.userId ];  //查询 本地store是否有当前ID的数据
	  	if( local_data ){
	  		this.userInfoData = local_data;
	  	}else{
	  		//本地store没有当前ID的数据 服务器请求
	  		this.openLoading();
	  		this.ajaxCompeted = false;
		  	this.$http.get('/user.json',{ params: query }).then((rep) => {
		  		this.closeLoading();
		  		this.ajaxCompeted = true;
		  		let httpData = rep.json();
		  		this.userInfoData = httpData;
				this.addUserInfoData( query.userId,httpData );
		  	}).catch((rep) => {
		  		// to 404
		  		// this.closeLoading();
		  		// this.ajaxCompeted = true;
		  		// this.userInfoData.errno = -1;
		  		// this.userInfoData.error = '用户不存在';
		  	});
	  	}

    }
  }
}
</script>
<style scoped>
.userInfo-info{padding: 0.6rem 0 0.3rem;}
.userInfo-error{width: 100%;position: absolute;top: 30%;left: 0;}
.userInfo-avatar{margin-bottom: 0.2rem}
.userInfo-id{
	width: 1.96rem;
	height: 0.36rem;
	line-height: 0.36rem;
	margin: 0 auto;
	color: #1b97ed;
    border: 1px solid #1b97ed;
    text-align: center;
    border-radius: 0.98rem;
    -webkit-border-radius: 0.98rem;
}
.userInfo-intro{padding: 0.3rem 0.3rem 0}
.userInfo-noRank{margin: 1rem auto;}
.userInfo-topRank{margin-bottom: 0.25rem}
.userInfo-appDownload{text-align: center;height: 1rem;line-height: 1rem;color: #a9a8a8;}
</style>
