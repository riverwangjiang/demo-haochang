<template>
 	<div class="appdownload-wrapper">
		 <img class="appdownload-logo left" src="../images/icon/icon-logo.png" alt="">
		 <div class="appdownload-title left">
		 	<p class="t1 fs32">好唱</p>
		 	<p class="t2 fs28">你身边的好声音</p>
		 </div>
		 <a class="appdownload-btn right fs28" href="{{url}}">在好唱中打开</a>
	 </div>
</template>
<script>
export default {
  props: ['url']
}
</script>
<style scoped>
.appdownload-wrapper{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1.2rem;
	background: url(../images/icon/icon-download-bg.png) repeat-x;
}
.appdownload-logo{
	width: 0.8rem;
    height: 0.8rem;
    margin: 0.2rem 0 0 0.3rem;
}
.appdownload-title{margin: 0.2rem 0 0 0.2rem;}
.appdownload-title .t1{color: #fff;}
.appdownload-title .t2{color: #a8a8a8;}
.appdownload-btn{
	width: 2.06rem;
	color: #ffa200;
    display: block;
    border: 1px solid #ffa200;
    height: 0.56rem;
    line-height: 0.56rem;
    margin: 0.3rem 0.3rem 0 0;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    text-align: center;
}
</style>
