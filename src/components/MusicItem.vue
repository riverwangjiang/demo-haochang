<template>
  <div class="musicItem-wrapper" v-link=" { path: '/player/'+musicInfo.id+'' }">
  	<div class="musicItem-info fs32" :class="{ 'borderTop': musicIndex != 0,'singer': (musicInfo.singer != undefined && musicInfo.singer != '' ) }">
  		<div class="musicItem-name texthidden">{{musicInfo.name}}</div>
      <div class="musicItem-singer fs24 texthidden">{{musicInfo.singer}}</div>
  	</div>
  </div>
</template>
<script>
export default {
  props:['musicInfo','musicIndex']
}
</script>
<style scoped>
.musicItem-wrapper{
	height: 1.2rem;
	background: rgba(256,256,256,0.1) url(../images/icon/icon-arrow-right.png) no-repeat 95%;
	background-size: 0.21rem 0.36rem;
	padding-left: 0.3rem;
}
.musicItem-info{height: 100%;line-height: 1.2rem;color: #fff;box-sizing: border-box;}
.musicItem-info.singer{line-height: 0.4rem;padding-top:0.25rem;}
.musicItem-singer{color:#c8c8c8;}
.musicItem-name,.musicItem-singer{width: 85%;}
</style>
