<template>
 <div class="musicList-wrapper">
	  <div class="musicList-name fs28 containerSidePadding" v-if=" (listName != undefined) && (listName != '') " >{{ listName }}</div>
	  <div class="musicList-list">
	  	  <music-item v-for="musicItem in musiclists" :music-info="musicItem" :music-index="$index"></music-item>
	  </div>
  </div>
</template>
<script>
import MusicItem from './MusicItem.vue'

export default {
  props:['listName','listAry'],
  components:{
  	'music-item': MusicItem
  },
  computed:{
  	musiclists (){
  		let ary = [];
  		return ary.concat(this.listAry);
  	}
  }
}
</script>
<style scoped>
.musicList-name{color: #a9a8a8;margin-bottom: 0.15rem;}
</style>
