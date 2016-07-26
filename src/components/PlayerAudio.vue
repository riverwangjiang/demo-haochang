<template>
  <div class="player-audio-wrapper" id="mydiv">
        <div class="player-mediaInfo">
          <div class="player-left">
            <img class="player-userAvatar" :src="PlayData.user.avatar" v-link=" { path: '/user/'+ PlayData.user.id +'' }" alt="">
            <div class="player-title">
               <div class="player-musicName fs32 texthidden">{{ PlayData.song.name }}</div>
               <div class="player-username fs28 texthidden">{{ PlayData.user.nickname }}</div>
            </div>
          </div>
          <div class="player-ctrlBtn zy_play" id="playElm"></div>
        </div>
        <div class="player-tabs">
           <div class="player-tabContainer" :class="{ 'activelyric':activelyric, 'activeDescript':activeDescript }" v-touch:swipeleft="changeTab('left',$event)" v-touch:swiperight="changeTab('right',$event)">
              <div class="player-tab-lyric">
                  <div class="player-tab-lyric-c" v-if="!lyricError">
                      <div class="player-tab-lyricList fs36" :style="moveStep">
                        <div class="player-tab-lyric-item texthidden" :class="{ 'active': $index == currentIndex }" :style="height" v-for=" item in lyric">{{ item[1] }}</div>
                    </div>
                  </div>
                  <div class="player-tab-lyric-error fs32" v-else>
                      暂无歌词
                  </div>
              </div>
              <div class="player-tab-descript">
                  <div class="player-tab-descript-c">
                    <p class="containerSidePadding fs32">歌曲介绍：{{ PlayData.song.intro == ''? '暂无作品描述' : PlayData.song.intro }}</p>
                  </div>
              </div>
              <div class="player-tab-dot">
                <span class="dot" :class="{ 'active':activelyric }"></span>
                <span class="dot" :class="{ 'active':activeDescript }"></span>
              </div>
           </div>
        </div>
        <div class="zy_media">
            <audio></audio>
        </div>
  </div>
</template>
<script>

import Vue from 'vue'
require('../common/media/zy.media.css');
let $ = require('jquery');
let bodyHeight = $('body').height();
let myHtml = document.getElementsByTagName('html')[0];
let font = parseFloat(window.getComputedStyle(myHtml , null)['font-size']);
let itemHeight = ((bodyHeight - 6.5*font)/5).toFixed(0);
var media = require('../common/media/zy.media.js');
var _ = require('underscore');
export default {
  props: ['PlayData'],
  ready () { 	
    media('audio',{
        timeElm: true,
        playElm: 'playElm',
        preload: 'load',
        src: this.PlayData.song.sourceUrl,
        lyricCallback: ( time ,endTime )=>{
          if( this.lyric.length != 0 ){
              this.lyric.forEach((item, index)=>{
                if(  Number(time).toFixed(3) > item[0] ){
                  this.currentIndex = index;
                  
                    this.currentStep = -( index - 2 ); 
                
                }else if( Number(time).toFixed(3) <= this.lyric[0][0]){
                  this.currentIndex = -1;
                  this.currentStep =  3;
                }
              });
          }
        }
    });
    //获取歌词
    this.$http.get(this.PlayData.song.lyricUrl).then((rep) => {
      this.formatLyric(rep.text());
    }).catch((rep) => {
      this.lyricError = true
    });
  },
  data (){
    return {
      	 activelyric: true,
         activeDescript: false,
         lyric: [],
         currentIndex: -1,
         currentStep: 3,
         lyricError: false,
    }
  },
  computed:{
    moveStep (){
      return {
        'margin-top': ( this.currentStep * itemHeight) + 'px'
      }
    },
    height (){
      return {
        'height':itemHeight + 'px',
        'line-height': itemHeight + 'px' 
      }
    }
  },
  methods: {
    changeTab (val,event){
      if( val == 'left'){
        this.activeDescript = true;
        this.activelyric = false;
      }else if( val == 'right'){
        this.activeDescript = false;
        this.activelyric = true;
      }
    },
    formatLyric (val){
        function timeToFloat(time, is_milli) {
            var times = time.split(':'), proportion = 1;
            switch (times.length) {
                case 3 :
                    proportion = 3600;
                    break;
                case 2 :
                    proportion = 60;
                    break;
            }
            var time_float = 0;
            for (var each_time in times) {
                time_float += parseFloat(times[each_time]) * proportion;
                proportion /= 60;
            }

            if (is_milli) {
                time_float *= 1000;
            }

            return time_float;
        }
      let regexp = /\d{2}:\d{2}\.\d{3}.{4}\d{2}:\d{2}\.\d{3}.{4}.+?(?=')/gm;
      let data = val.match(regexp);
      let lyric = [];
      data.forEach((element, index, data) => {
          lyric[index] = [timeToFloat(element.substr(0, 9)), element.substr(element.lastIndexOf('\'') + 1)];
      });
      this.lyric = lyric;
    }
  }
}
</script>
<style scoped>
.player-audio-wrapper{height: 100%;}
.player-mediaInfo{height: 1.4rem;background-color: rgba(0,0,0,0.3);position: fixed;top:0;left:0;width: 100%;}
.player-left{position: relative;box-sizing: border-box;height: 100%;padding-right: 1.5rem;}
.player-ctrlBtn{position: absolute;right:0.3rem;top:50%;margin-top:-0.35rem;width: 0.7rem;height: 0.7rem;}
.player-ctrlBtn.zy_play{background:url(../images/icon/icon-play.png) no-repeat;background-size: contain;}
.player-ctrlBtn.zy_pause{background:url(../images/icon/icon-pause.png) no-repeat;background-size: contain;}
.player-userAvatar{width: 0.8rem;height: 0.8rem;position: absolute;top: 0.3rem;left: 0.3rem;border-radius: 50%;-webkit-border-radius: 50%}
.player-title{padding:0.3rem 0 0 1.3rem;}
.player-musicName{color: #fff;}
.player-username{color: #c8c8c8;}
.player-tabs{height: 100%;box-sizing: border-box;padding:1.8rem 0 1.5rem;}
.player-tabContainer{height: 100%;position: relative;overflow: hidden;}
.player-tab-lyric,.player-tab-descript{
    position: absolute;
    top: 0;
    width:100%;
    height:100%;
    transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
    transform: translate3d(0,0,0);
    -webkit-transform: translate3d(0,0,0);
    word-break: break-all;
}
.player-tab-lyric{}
.player-tab-descript,.player-tab-lyric{left: 100%;color: #a9a8a8;box-sizing: border-box;padding-bottom: 0.6rem;}
.player-tab-lyric{padding: 0.2rem 0 1.5rem;}
.player-tab-descript-c,.player-tab-lyric-c{max-height:100%;overflow:hidden;}
.player-tabContainer.activelyric .player-tab-lyric{left: 0;}
.player-tabContainer.activelyric .player-tab-descript{left: 100%;}
.player-tabContainer.activeDescript .player-tab-lyric{left: -100%;}
.player-tabContainer.activeDescript .player-tab-descript{left: 0;}
.player-tab-dot{position: absolute;width:0.52rem;height: 0.12rem;bottom: 0; left: 50%; margin-left: -0.26rem;}
.player-tab-dot span{display: block;width: 0.12rem;height: 0.12rem;background:#fff;border-radius: 50%;-webkit-border-radius: 50%;float:left;margin: 0 0.07rem;}
.player-tab-dot span.active{background: #c8c8c8;}
.player-tab-lyricList{color: #a8a8a8;text-align: center;}
.player-tab-lyric-item{margin: 0 auto; width: 65%;height: 1.4rem;line-height: 1.4rem}
.player-tab-lyric-item.active{color: #ffbb33;}
.player-tab-lyric-error{text-align: center;margin-top: 2rem;}
</style>
