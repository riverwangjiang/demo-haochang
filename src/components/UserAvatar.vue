<template>
 <div class="userAvatar-wrapper">
  	<img class="userAvatar-avatar" :src="userData.avatar" alt="" v-link=" { path: '/user/'+userData.id+'' }" >
  	<div class="userAvatar-name fs36 texthidden">{{userData.nickname}}</div>
 </div>
</template>
<script>
export default {
  props:['userData'],
  ready () { 	
  },
  data (){
    return {
    	
    }
  }
}
</script>
<style scoped>
.userAvatar-avatar{width: 1.6rem;height: 1.6rem;margin: 0 auto;border-radius: 50%;-webkit-border-radius: 50%} 
.userAvatar-name{text-align: center;color: #fff;margin-top: 0.3rem}
</style>
