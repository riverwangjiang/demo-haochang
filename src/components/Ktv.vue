<template>
  <div class="ktv-wrapper container container-bg" v-show="ajaxCompeted">
  	<div v-if="isNormal">
  		<div class="ktv-userAvatar containerSidePadding">
  			<user-avatar :user-data="ktvData.user"></user-avatar>
  		</div>
  		<div class="ktv-msg fs32">快来KTV一起唱K吧，房间号密我</div>
  		<div class="ktv-address containerSidePadding">
  			<div class="ktv-name fs28">
  				<div class="l">店名：</div>
  				<div class="c">{{ktvData.ktv.name}}</div>
  			</div>
  			<div class="ktv-addrDetail fs28">
  				<div class="l">地址：</div>
  				<div class="c"><span>{{ktvData.ktv.address}}</span></div>
  			</div>
  		</div>
  		<div class="ktv-map">
  			<!-- <map-module :map-data="ktvData.ktv"></map-module> -->
        <router-view :map-data="ktvData.ktv"></router-view>
  		</div>
  	</div>
  	<div class="ktv-error" v-if="!isNormal">
  	  	  <error-module :error-msg="isUnnormalMsg"></error-module>
  	</div>
  	<app-download :url="ktvData.appUrl"></app-download>
  </div>
</template>
<script>
import UserAvatar from './UserAvatar.vue'

export default {
  ready () {	
  	
  },
  route: {
    data(transition) {
      this.setTitle('好唱-KTV分享');
      let vueThis = this;

      this.$http.get('/map.json',{ params: vueThis.$route.params }).then((rep) => {
        vueThis.ajaxCompeted = true;
        let httpData = rep.json();
      
      if(httpData.errno == 0){
          vueThis.isNormal = true;
          vueThis.ktvData = httpData.data;
        }else{
          vueThis.isNormal = false;
          vueThis.isUnnormalMsg = httpData.error;
        }

      }, (rep) => {
        vueThis.ajaxCompeted = true;
        console.log(rep);
        vueThis.isNormal = false;
        vueThis.isUnnormalMsg = 'KTV不存在';
      });
    } 
  },
  data (){
    return {
    	ktvData:{
    		appUrl: 'XXXXXXXXXXXXX',
    		user: {
            	id: '',
            	avatar: '',
            	nickname: ''
	        },
	    	ktv: {
				name: '',
	            address: '',
	            latitude: 0,
	            longitude: 0
	    	}
    	},
    	ajaxCompeted: false,
    	isNormal: true,
    	isUnnormalMsg: 'ktv不存在'
    }
  },
  components: {
  	'user-avatar': UserAvatar
  }
}
</script>
<style scoped>
/*.ktv-wrapper{background: url(../images/icon/icon-userInfo-bg.jpg) no-repeat;background-size: cover;}*/
.ktv-userAvatar{padding-top: 0.6rem;padding-bottom: 0.35rem}
.ktv-map{width: 100%;height: 5.33rem;}
.ktv-error{width: 100%;position: absolute;top: 30%;left: 0;}
.ktv-msg{color: #fff; text-align: center;}
.ktv-address{background: rgba(256,256,256,0.1);padding-top:0.3rem;padding-bottom:0.3rem;margin-top: 0.2rem;color:#c8c8c8;}
.ktv-address span{color: #1b97ed;text-decoration: underline;}
.ktv-name,.ktv-addrDetail{position: relative;}
.ktv-name .l,.ktv-addrDetail .l{position: absolute;top: 0;left:0;}
.ktv-name .c,.ktv-addrDetail .c{padding-left: 1rem;word-break: break-all}
.ktv-addrDetail{margin-top: 0.15rem}
</style>
