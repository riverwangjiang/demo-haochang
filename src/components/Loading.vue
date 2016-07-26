<template>
 <div class="loading-wrapper" v-if="status">
 	<div class="loading-title fs32">Loading...</div>
 </div>
</template>
<script>
export default {
	vuex: {
    getters: {
      status: ({loadingStatus}) => loadingStatus 
    }
  }
}
</script>
<style scoped>
.loading-wrapper{width: 100%; height: 100%;background:rgba(0,0,0,1);position: fixed;top: 0;left: 0;z-index:10000;}
.loading-title{color: #fff;width: 100%;height: 1rem;line-height: 1rem;text-align: center;position: absolute;left: 0;top: 50%;margin-top: -0.5rem;}
</style>
