<template>
 <div class="map-wrapper" id="map">
 </div>
</template>
<script>
let ktvLocation = {};
window.initKtv = () => {
	if(! document.getElementById('map') ) return;
 	let map = new BMap.Map('map');  
	let point = new BMap.Point(ktvLocation.latitude, ktvLocation.longitude);
	map.centerAndZoom(point, 17);
	let marker = new BMap.Marker(point);  					// 创建标注
	map.addOverlay(marker);               					// 将标注添加到地图中
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); 			//跳动的动画
	let opts = {
	  position : point,    									// 指定文本标注所在的地理位置
	  offset   : new BMap.Size(15, -50)    					//设置文本偏移量
	}
	let label = new BMap.Label(ktvLocation.name, opts);  		// 创建文本标注对象
	label.setStyle({
		 color : "#000",
		 fontSize : "12px",
		 height : "20px",
		 lineHeight : "20px",
		 fontFamily:"\"PingFangSC-Regular\",\"Droid Sans\",\"Microsoft yahei\""
	});
	map.addOverlay(label);  
}
export default {
  props: ['mapData'],
  watch:{
  	'mapData' (){
  		this.update();
  	}
  },
  methods:{
  	loadJScript (){
  		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api.map.baidu.com/api?v=1.4&callback=initKtv";
		document.body.appendChild(script);
  	},
  	update (){
  		if( this.mapData.name != undefined &&  this.mapData.name != '' ){
	    	ktvLocation = this.mapData;
	    	this.loadJScript({});
	    }
  	}
  },
  route:{
  	data (){
  		this.update();
  	}
  }
}
</script>
<style scoped>
.map-wrapper{width: 100%;height:100%; font-size:28px;color: #fff;}
</style>
