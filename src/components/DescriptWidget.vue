<template>
 <div class="descriptWidget-wrapper">
	  <div class="descriptWidget-info fs32" :class="{ 'texthidden': !introOpen }">{{title}}{{content}}</div>
	  <div class="descriptWidget-btn" :class="{ 'down': !introOpen,'up':introOpen }" v-touch:tap="introOpen = !introOpen"></div>
  </div>
</template>
<script>
export default {
  props: [ 'title','content'],
  data (){
    return {
	    introOpen: false,
    }
  }
}
</script>
<style scoped>
.descriptWidget-info{color: #c8c8c8;line-height: 0.5rem;word-break: break-all;}
.descriptWidget-btn{width: 1rem;height: 0.5rem;margin: 0 auto;}
.descriptWidget-btn.down{background: url(../images/icon/icon-arrow-down.png) no-repeat center;background-size: 0.36rem 0.2rem;}
.descriptWidget-btn.up{background: url(../images/icon/icon-arrow-top.png) no-repeat center;background-size: 0.36rem 0.2rem;}
</style>
