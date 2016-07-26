<template>
  <div class="error-center">
	  <img src="../images/icon/icon-error.png" alt="">
	  <p class="fs32">{{errorMsg}}</p>
  </div>
</template>
<script>
export default {
  props: ['errorMsg'],
}
</script>
<style scoped>
.error-center{width: 100%;}
.error-center img{width: 3.8rem; margin: 0 auto;}
.error-center p{text-align: center;
    color: #a9a8a8;
    margin-top: 0.3rem;
}
</style>
