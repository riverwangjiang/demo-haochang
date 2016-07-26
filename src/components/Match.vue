<template>
 <div class="match-wrapper container" v-show="ajaxCompeted">
	  <div v-if="isNormal">
	  	  <div class="match-countdown fs28">
	  	  	<time-countdown :start-time="matchData.startTime" :end-time="matchData.endTime" ></time-countdown>
	  	  </div>
	  	  <div class="match-poster">
	  	  	<img :src="matchData.poster" alt="" title="">
	  	  </div>
		  <div class="match-info containerSidePadding">
			  <h1 class="match-title fs48">{{ matchData.title }}</h1>
			  <div class="match-date fs24">比赛时间 : {{ matchData.startTime | dateFormat }}-{{ matchData.endTime | dateFormat }}</div>
			  <p class="match-descript fs36 lh62">{{ matchData.intro }}</p>
			  <div class="match-rewards fs36 lh62">
					<p v-for="reward in matchData.rewards">{{ reward.name }} {{ reward.item }}，共{{ reward.count }}人</p>
			  </div>
			  <div class="match-rules fs36 lh62">
			  	<p class="match-rules-title">比赛规则：</p>
			  	<p class="match-rules-descript">{{ matchData.rules }}</p>
			  </div>
		  </div>
	  </div>
	  <div class="match-end" v-if="!isNormal">
	  	  <error-module :error-msg="isUnnormalMsg"></error-module>
	  </div>
	  <app-download :url="matchData.appUrl"></app-download>
  </div>
</template>
<script>
require('../common/filter');
import TimeCountdown from './TimeCountdown.vue'

export default {
  ready () {
  	
  },
  route: {
  	data(transition) {
     	this.setTitle('比赛详情');
	  	let vueThis = this;

	  	this.$http.get('/match.json',{ params: vueThis.$route.params }).then((rep) => {
	  		vueThis.ajaxCompeted = true;
	  		let httpData = rep.json();
			
			if(httpData){
	   			vueThis.isNormal = true;
	   			vueThis.matchData = httpData;
	   		}else{
	   			vueThis.isNormal = false;
	   			vueThis.isUnnormalMsg = httpData.error;
	   		}

	  	}, (rep) => {
	  		vueThis.ajaxCompeted = true;
	  		console.log(rep);
		   	vueThis.isNormal = false;
		   	vueThis.isUnnormalMsg = '比赛不存在';
	  	});
    } 
  },
  data (){
    return {
    	matchData: {
    		appUrl: 'XXXXXXXXXXXXXXXXX',
	    	title:'',
	    	intro:'',
	    	startTime: 0,
	    	endTime:0,
	    	rewards:[],
	    	rules:'',
	    	poster: ''
	    },
	    countDown: '',
	    ajaxCompeted: false,
	    isNormal: false,
	    isUnnormalMsg: "比赛结束"
    }
  },
  components:{
  	'time-countdown' : TimeCountdown
  }
}
</script>
<style scoped>
.lh62{line-height: .62rem;}
.match-countdown{
    height: 0.6rem;
    line-height: 0.6rem;
	text-align: center;
}
.match-poster{
	width: 100%;
	height: 3.52rem;
	overflow: hidden;
}
.match-poster img{width: 100%;}
.match-info{padding-top: 0.5rem;padding-bottom: 0.5rem}
.match-date{margin-top: 0.1rem;}
.match-descript{margin-top: 0.3rem;}
.match-rewards{margin-top: 0.5rem;}
.match-rewards p{margin-bottom: 0.15rem}
.match-rules{margin-top: 0.5rem;}
.match-end{width: 100%;position: absolute;top: 30%;left: 0;}
</style>
