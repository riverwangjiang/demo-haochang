webpackJsonp([8],{

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(86)
	__vue_script__ = __webpack_require__(90)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\PlayerVideo.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(91)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-cbb5e766/PlayerVideo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cbb5e766&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PlayerVideo.vue", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cbb5e766&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PlayerVideo.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.player-video-wrapper[_v-cbb5e766]{height: 100%;}\n.player-mediaInfo[_v-cbb5e766]{height: 1.4rem;position: fixed;top:0;left:0;width: 100%;z-index: 9999;}\n.player-left[_v-cbb5e766]{position: relative;box-sizing: border-box;height: 100%;padding-right: 1.5rem;}\n.player-ctrlBtn[_v-cbb5e766]{position: absolute;left:50%;margin-left:-0.7rem;top:3.5rem;width: 1.4rem;height: 1.4rem;z-index: 99}\n.player-ctrlBtn.zy_play[_v-cbb5e766]{background:url(" + __webpack_require__(88) + ") no-repeat;background-size: contain;}\n.player-ctrlBtn.zy_pause[_v-cbb5e766]{background:url(" + __webpack_require__(89) + ") no-repeat;background-size: contain;}\n.player-userAvatar[_v-cbb5e766]{width: 0.8rem;height: 0.8rem;position: absolute;top: 0.3rem;left: 0.3rem;border-radius: 50%;-webkit-border-radius: 50%}\n.player-title[_v-cbb5e766]{padding:0.3rem 0 0 1.3rem;}\n.player-musicName[_v-cbb5e766]{color: #fff;}\n.player-username[_v-cbb5e766]{color: #c8c8c8;}\n.player-tabs[_v-cbb5e766]{height: 100%;box-sizing: border-box;}\n.player-tabContainer[_v-cbb5e766]{height: 100%;position: relative;overflow: hidden;}\n.player-tab-lyric[_v-cbb5e766],.player-tab-descript[_v-cbb5e766]{\n    position: absolute;\n    top: 0;\n    width:100%;\n    height: 100%;\n    transition: all 0.1s linear;\n    -webkit-transition: all 0.1s linear;\n    transform: translate3d(0,0,0);\n    -webkit-transform: translate3d(0,0,0);\n    word-break: break-all;\n}\n.player-tab-lyric[_v-cbb5e766]{}\n.player-tab-descript[_v-cbb5e766]{left: 100%;color: #a9a8a8;box-sizing: border-box;height: 7.5rem;}\n.player-tab-descript-c[_v-cbb5e766]{height:100%;overflow:hidden;background: rgba(0,0,0,0.9);padding-top: 1.8rem; box-sizing: border-box;}\n.player-tabContainer.activelyric .player-tab-lyric[_v-cbb5e766]{left: 0;}\n.player-tabContainer.activelyric .player-tab-descript[_v-cbb5e766]{left: 100%;}\n.player-tabContainer.activeDescript .player-tab-lyric[_v-cbb5e766]{left: 0;}\n.player-tabContainer.activeDescript .player-tab-descript[_v-cbb5e766]{left: 0;}\n.player-tab-dot[_v-cbb5e766]{position: absolute;width:0.52rem;height: 0.12rem;bottom: 1.5rem; left: 50%; margin-left: -0.26rem;}\n.player-tab-dot span[_v-cbb5e766]{display: block;width: 0.12rem;height: 0.12rem;background:#fff;border-radius: 50%;-webkit-border-radius: 50%;float:left;margin: 0 0.07rem;}\n.player-tab-dot span.active[_v-cbb5e766]{background: #c8c8c8;}\n", ""]);

	// exports


/***/ },

/***/ 88:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MENGNEEyOEU0RTdDMTFFNkI2N0ZBRThERjA5QTk1MkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MENGNEEyOEY0RTdDMTFFNkI2N0ZBRThERjA5QTk1MkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowQ0Y0QTI4QzRFN0MxMUU2QjY3RkFFOERGMDlBOTUyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowQ0Y0QTI4RDRFN0MxMUU2QjY3RkFFOERGMDlBOTUyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiI9UqEAAA+sSURBVHja7J0JVJRl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"

/***/ },

/***/ 89:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzZFMUFCQjY0RTdDMTFFNkI3MUVCQTY4NUU5NTQzQTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzZFMUFCQjc0RTdDMTFFNkI3MUVCQTY4NUU5NTQzQTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNkUxQUJCNDRFN0MxMUU2QjcxRUJBNjg1RTk1NDNBNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNkUxQUJCNTRFN0MxMUU2QjcxRUJBNjg1RTk1NDNBNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlegnhsAAA7KSURBVHja7J15UFPX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"

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(73);
	var media = __webpack_require__(76);
	exports.default = {
	  props: ['PlayData'],
	  ready: function ready() {
	    media('video', {
	      timeElm: true,
	      preload: 'load',
	      videoHeight: '100%',
	      enableFullscreen: false,
	      alwaysShowControls: true,
	      src: 'http://video-qn.okchang.com/tingting/mv/201602/1454921230_10723095.mp4'
	    });
	  },
	  data: function data() {
	    return {
	      activelyric: true,
	      activeDescript: false,
	      playStatus: true
	    };
	  },

	  methods: {
	    changeTab: function changeTab(val, event) {
	      if (val == 'left') {
	        this.activeDescript = true;
	        this.activelyric = false;
	      } else if (val == 'right') {
	        this.activeDescript = false;
	        this.activelyric = true;
	      }
	    }
	  }
	};

/***/ },

/***/ 91:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"player-video-wrapper\" _v-cbb5e766=\"\">\n      <div class=\"player-mediaInfo\" _v-cbb5e766=\"\">\n        <div class=\"player-left\" _v-cbb5e766=\"\">\n          <img class=\"player-userAvatar\" :src=\"PlayData.user.avatar\" v-link=\" { path: '/user/'+ PlayData.user.id +'' }\" alt=\"\" _v-cbb5e766=\"\">\n          <div class=\"player-title\" _v-cbb5e766=\"\">\n             <div class=\"player-musicName fs32 texthidden\" _v-cbb5e766=\"\">{{ PlayData.song.name }}</div>\n             <div class=\"player-username fs28 texthidden\" _v-cbb5e766=\"\">{{ PlayData.user.nickname }}</div>\n          </div>\n        </div>\n      </div>\n      <div class=\"player-tabs\" _v-cbb5e766=\"\">\n         <div class=\"player-tabContainer\" :class=\"{ 'activelyric':activelyric, 'activeDescript':activeDescript }\" v-touch:swipeleft=\"changeTab('left',$event)\" v-touch:swiperight=\"changeTab('right',$event)\" _v-cbb5e766=\"\">\n            <div class=\"player-tab-lyric\" _v-cbb5e766=\"\">\n                  <div class=\"zy_media\" _v-cbb5e766=\"\">\n                    <video v-touch:tap=\"play\" _v-cbb5e766=\"\"></video>\n                  </div>\n            </div>\n            <div class=\"player-tab-descript\" _v-cbb5e766=\"\">\n                <div class=\"player-tab-descript-c\" _v-cbb5e766=\"\">\n                  <p class=\"containerSidePadding fs32\" _v-cbb5e766=\"\">歌曲介绍：{{ PlayData.song.intro == ''? '暂无作品描述' : PlayData.song.intro }}</p>\n                </div>\n            </div>\n            <div class=\"player-tab-dot\" _v-cbb5e766=\"\">\n              <span class=\"dot\" :class=\"{ 'active':activelyric }\" _v-cbb5e766=\"\"></span>\n              <span class=\"dot\" :class=\"{ 'active':activeDescript }\" _v-cbb5e766=\"\"></span>\n            </div>\n         </div>\n      </div>\n</div>\n";

/***/ }

});