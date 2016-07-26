<template>
  <div class="player-wrapper container container-bg" v-show="ajaxCompeted">
    <div class="player-normal" v-if="isNormal">
        <player-audio :play-data="playerData.data" v-if="playerData.data.song.type == 1"></player-audio>
        <player-video :play-data="playerData.data" v-if="playerData.data.song.type == 2"></player-video>
    </div>
    <div class="player-error" v-if="!isNormal">
        <error-module :error-msg="playerData.error"></error-module>
    </div>

    <app-download :url="playerData.data.appUrl"></app-download>
  </div>
</template>
<script>
import Vue from 'vue'
require('../common/media/zy.media.css');
var media = require('../common/media/zy.media.js');
export default {
  ready () { 	
    this.setTitle('好唱-你身边的好声音');
  },
  data (){
    return {
         playerData: {
            data:{
              appUrl: 'xxxxxxxxx',       
              user: {
                  id: 0,
                  avatar: '',
                  nickname: ''
              },
              song: {
                  id: 0,
                  name: '',
                  intro: '',
                  type: 0,
                  sourceUrl: '',
                  lyricUrl: ''
              },
            },
            errno: 0,
            error: ''
         },
         ajaxCompeted: false,
      	 activelyric: true,
         activeDescript: false,
         rebuildAudio: true
    }
  },
  computed:{
    isNormal (){
      return this.playerData.errno == 0 ? true : false; 
    }
  },
  components: {
    'player-audio': reslove => { return require(['./PlayerAudio.vue'],reslove) },
    'player-video': reslove => { return require(['./PlayerVideo.vue'],reslove) }
  },
  route: {
    data() {
        //this.rebuildAudio = false;
      let query = this.$route.params;
      // let local_data = this.getterUserInfo[ 'state_' + query.userId ];
      // if( local_data ){
      //   this.userInfoData = local_data;
      // }else{
          this.openLoading();
        this.$http.get('/player.json',{ params: query }).then((rep) => {
          //this.rebuildAudio = true;
          this.closeLoading();
          this.ajaxCompeted = true;
          let httpData = rep.json();
          this.playerData = httpData;

          // Vue.nextTick(function () {
          //   media('audio',{
          //     timeElm: true,
          //     playElm: 'playElm',
          //     preload: 'load',
          //     src: httpData.data.song.sourceUrl
          //   });
          // });
          
        }).catch((rep) => {
          // to 404
        });
    }
  }
}
</script>
<style scoped>
.player-error{width: 100%;position: absolute;top: 30%;left: 0;}
.player-normal{height: 100%;}
.player-wrapper{height: 100%;}
</style>
