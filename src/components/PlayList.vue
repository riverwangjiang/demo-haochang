<template>
 <div class="playlist-wrapper container container-bg" v-show="ajaxCompeted">
	  <div v-if="isNormal">

	  	  <div class="playlist-info">
				<div class="playlist-createInfo">
					<img class="playlist-createInfo-cover" :src="playlistData.cover" alt="">
					<div class="playlist-createInfo-info">
						<p class="playlist-createInfo-infoName texthidden fs36">{{playlistData.name}}</p>
						<p class="playlist-createInfo-infoCreator texthidden fs32">创建者：{{playlistData.user.nickname}}</p>
						<p class="playlist-createInfo-infoCount texthidden fs28">共 <span>{{playlistData.count}}</span> 首</p>
					</div>
				</div>
	  	  	<div class="playlist-intro" v-if=" playlistData.intro != '' ">
	  	  		<descript-widget title="歌单阐述：" :content="playlistData.intro"></descript-widget>
	  	  	</div>
	  	  </div>
			
		  <div v-if="!songsEmpty">
		  	  <music-list list-name="歌曲列表" :list-ary="playlistData.songs"></music-list>
		  	  <div class="playlist-appDownload fs32">下载好唱，收藏歌单</div>
		  </div>
			
		  <div class="playlist-none" v-if="songsEmpty">
		  	  <error-module error-msg="暂无作品"></error-module>
		  </div>

	  </div>
	  <div class="playlist-error" v-if="!isNormal">
	  	  <error-module :error-msg="isUnnormalMsg"></error-module>
	  </div>
	  <app-download :url="playlistData.appUrl"></app-download>
  </div>
</template>
<script>;
import DescriptWidget from './DescriptWidget.vue'
import MusicList from './MusicList.vue'

export default {
  ready () { 	
  },
  route: {
    data(transition) {
     	this.setTitle('好唱-歌单');
	  	let vueThis = this;
	  	this.$http.get('/song.json',{ params: vueThis.$route.params }).then((rep) => {
	  		vueThis.ajaxCompeted = true;
	  		let httpData = rep.json();
			
			if(httpData.errno == 0){
	   			vueThis.isNormal = true;
	   			if( httpData.data.songs.length != 0 ){
	   				vueThis.songsEmpty = false;
	   			}

	   			vueThis.playlistData = httpData.data;
	   		}else{
	   			vueThis.isNormal = false;
	   			vueThis.isUnnormalMsg = httpData.error;
	   		}

	  	}, (rep) => {
	  		vueThis.ajaxCompeted = true;
	  		console.log(rep);
		   	vueThis.isNormal = false;
		   	vueThis.isUnnormalMsg = '歌单不存在';
	  	});
    }    
  },
  data (){
    return {
    	playlistData: {
    		appUrl: 'XXXXXXXXXXXXX',
	    	user: {
	            id: 123123,
	            nickname: ''
	        },
	        intro: '',
	        cover: '',
	        name: '',
	        count: '',
	        songs: []
	    },
	    songsEmpty: true,
	    introOpen: false,
	    ajaxCompeted: false,
	    isNormal: false,
	    isUnnormalMsg: "歌单已被删除"
    }
  },
  components: {
  	'music-list': MusicList,
  	'descript-widget': DescriptWidget
  }
}
</script>
<style scoped>
.playlist-info{padding: 0.3rem;}
.playlist-error{width: 100%;position: absolute;top: 30%;left: 0;}
.playlist-createInfo{position: relative;height: 1.8rem;}
.playlist-createInfo-cover{width: 1.8rem;height: 1.8rem;position: absolute;top: 0;left: 0;}
.playlist-createInfo-info{padding: 0.2rem 0 0 2rem}
.playlist-createInfo-infoName{color: #fff;}
.playlist-createInfo-infoCreator{margin:0.08rem 0;}
.playlist-createInfo-infoCreator,.playlist-createInfo-infoCount{color: #c8c8c8;}
.playlist-createInfo-infoCount span{color: #fff;}
.playlist-intro{margin-top: 0.3rem;}
.playlist-none{margin: 1.5rem auto;}
.playlist-appDownload{text-align: center;height: 1rem;line-height: 1rem;color: #a9a8a8;}
</style>
