<template>
<div>
	<p v-if="begin" class="begin">
		<span v-if="beginD">{{beginD}}天</span>
		<span v-if="beginH">{{beginH}}时</span>
		<span v-if="beginM">{{beginM}}分钟</span>
		<span v-if="beginS">{{beginS}}秒</span>
		<span>后开始</span>
	</p>
	<p v-if="active" class="active">
		<span v-if="activeD">{{activeD}}天</span>
		<span v-if="activeH">{{activeH}}时</span>
		<span v-if="activeM">{{activeM}}分钟</span>
		<span v-if="activeS">{{activeS}}秒</span>
		<span>后结束</span>
	</p>
	<p v-if="over" class="over">比赛已结束</p>
</div>
</template>
<script>
export default {
  	props: ['startTime','endTime'],
	data (){
		return {
			begin: false,
			over: false,
			active: false,
			beginD: false,
			beginH: false,
			beginM: false,
			beginS: false,
			activeD: false,
			activeH: false,
			activeM: false,
			activeS: false
		}
	},
	ready (){
		this.getT();
	},
	methods: {
		getT (){
			var timeout = setTimeout(this.getT,1000);
			var curTime = new Date();
			var start = new Date(this.startTime)
			var end = new Date(this.endTime);
			var leftStart = parseInt((start.getTime() - curTime.getTime())/1000);
			var leftEnd = parseInt((end.getTime() - curTime.getTime())/1000);
			if(leftStart > 0){
				this.begin = true;
				var beginD = parseInt(leftStart/(24*60*60));
				var beginH = parseInt(leftStart/(60*60)%24);
				var beginM = parseInt(leftStart/60%60);
				var beginS = parseInt(leftStart%60);
				if (beginD > 0) {
					this.beginD = beginD;
					this.beginH = beginH;
				}else if(beginH > 0){
					this.beginD = false;
					this.beginH = beginH;
				}else if(beginM > 0){
					this.beginH = false;
					this.beginM = beginM;
				}else{
					this.beginM = false;
					this.beginS = beginS;
				}
			}else if(leftEnd > 0){
				this.begin = false;
				this.active = true;
				var activeD = parseInt(leftEnd/(24*60*60));
				var activeH = parseInt(leftEnd/(60*60)%24);
				var activeM = parseInt(leftEnd/60%60);
				var activeS = parseInt(leftEnd%60);
				if (activeD > 0) {
					this.activeD = activeD;
					this.activeH = activeH;
				}else if(activeH > 0){
					this.activeD = false;
					this.activeH = activeH;
				}else if(activeM > 0){
					this.activeH = false;
					this.activeM = activeM;
				}else{
					this.activeM = false;
					this.activeS = activeS;
				}
			}else{
				this.begin = false;
				this.active = false;
				this.over = true;
				clearTimeout(timeout);
			}
				
		}
	}
}
</script>
<style scope>
	.begin,.active{font-size: 0}
	.over,.begin span,.active span{font-size: 0.28rem}
</style>