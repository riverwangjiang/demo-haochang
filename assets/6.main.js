webpackJsonp([6],{

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(70)
	__vue_script__ = __webpack_require__(72)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Player.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(92)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1f4af77e/Player.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(71);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1f4af77e&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Player.vue", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1f4af77e&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Player.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.player-error[_v-1f4af77e]{width: 100%;position: absolute;top: 30%;left: 0;}\n.player-normal[_v-1f4af77e]{height: 100%;}\n.player-wrapper[_v-1f4af77e]{height: 100%;}\n", ""]);

	// exports


/***/ },

/***/ 72:
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
	  ready: function ready() {
	    this.setTitle('好唱-你身边的好声音');
	  },
	  data: function data() {
	    return {
	      playerData: {
	        data: {
	          appUrl: 'xxxxxxxxx',
	          user: {
	            id: 0,
	            avatar: '',
	            nickname: ''
	          },
	          song: {
	            id: 0,
	            name: '',
	            intro: '',
	            type: 0,
	            sourceUrl: '',
	            lyricUrl: ''
	          }
	        },
	        errno: 0,
	        error: ''
	      },
	      ajaxCompeted: false,
	      activelyric: true,
	      activeDescript: false,
	      rebuildAudio: true
	    };
	  },

	  computed: {
	    isNormal: function isNormal() {
	      return this.playerData.errno == 0 ? true : false;
	    }
	  },
	  components: {
	    'player-audio': function playerAudio(reslove) {
	      return __webpack_require__.e/* require */(7, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(77)]; (reslove.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	    },
	    'player-video': function playerVideo(reslove) {
	      return __webpack_require__.e/* require */(8, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(85)]; (reslove.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	    }
	  },
	  route: {
	    data: function data() {
	      var _this = this;

	      var query = this.$route.params;

	      this.openLoading();
	      this.$http.get('/player.json', { params: query }).then(function (rep) {
	        _this.closeLoading();
	        _this.ajaxCompeted = true;
	        var httpData = rep.json();
	        _this.playerData = httpData;
	      }).catch(function (rep) {});
	    }
	  }
	};

/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(74);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(75)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./zy.media.css", function() {
				var newContent = require("!!./../../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./zy.media.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".zy_media {\r\n\t/*background:#000;*/\r\n\tposition:absolute;\r\n\tbottom: 1.6rem;\r\n\twidth: 100%;\r\n}\r\n.zy_media video,.zy_media audio {\r\n\twidth:100%;\r\n\tposition:absolute;\r\n\ttop:0;\r\n\tleft:0;\r\n\tdisplay:block\r\n}\r\n.zy_fullscreen {\r\n\toverflow:hidden\r\n}\r\n.zy_fullscreen .zy_media {\r\n\tposition:fixed;\r\n\tleft:0;\r\n\ttop:0;\r\n\tright:0;\r\n\tbottom:0;\r\n\tz-index:1000\r\n}\r\n.zy_fullscreen .zy_wrap,.zy_fullscreen video {\r\n\twidth:100%;\r\n\theight:100%\r\n}\r\n.zy_wrap {\r\n\twidth:100%\r\n}\r\n.zy_title {\r\n\theight:34px;\r\n\tpadding-left:10px;\r\n\tcolor:#fff;\r\n\tfont-size:12px;\r\n\tline-height:34px;\r\n\twhite-space:nowrap;\r\n\ttext-overflow:ellipsis;\r\n\toverflow:hidden;\r\n\tbackground:rgba(0,0,0,.25);\r\n\tposition:absolute;\r\n\tleft:0;\r\n\tright:0;\r\n\ttop:0;\r\n\t-webkit-transition:top .5s;\r\n\ttransition:top .5s\r\n}\r\n.zy_media .dec_play,.zy_media .dec_loading,.zy_media .dec_error {\r\n\tmargin:-32px 0 0 -31px;\r\n\tposition:absolute;\r\n\ttop:50%;\r\n\tleft:50%\r\n}\r\n.zy_media .dec_play::before {\r\n\twidth:60px;\r\n\theight:60px;\r\n\tcontent:'';\r\n\tborder-radius:60px;\r\n\tborder:#e5e5e4 1px solid;\r\n\tdisplay:block\r\n}\r\n.zy_media .dec_play::after {\r\n\twidth:0;\r\n\theight:0;\r\n\tcontent:'';\r\n\tborder-color:transparent transparent transparent #e5e5e4;\r\n\tborder-width:14px 20px;\r\n\tborder-style:solid;\r\n\tposition:absolute;\r\n\ttop:16px;\r\n\tleft:23px;\r\n\tz-index:2;\r\n\tdisplay:block\r\n}\r\n.zy_media .dec_loading {\r\n\twidth:62px;\r\n\theight:62px;\r\n\t-webkit-animation:ani_loading .6s infinite linear;\r\n\t-webkit-animation-fill-mode:forwards;\r\n\tanimation:ani_loading .6s infinite linear;\r\n\tanimation-fill-mode:forwards\r\n}\r\n@-webkit-keyframes ani_loading {\r\n\t100% {\r\n\t-webkit-transform:rotate(360deg)\r\n}\r\n}@keyframes ani_loading {\r\n\t100% {\r\n\ttransform:rotate(360deg)\r\n}\r\n}.zy_media .dec_loading::before {\r\n\twidth:7px;\r\n\theight:7px;\r\n\tcontent:'';\r\n\tborder-radius:7px;\r\n\tbackground:#fff;\r\n\topacity:.8;\r\n\tposition:absolute;\r\n\ttop:25px\r\n}\r\n.zy_media .dec_loading::after {\r\n\twidth:48px;\r\n\theight:48px;\r\n\tcontent:'';\r\n\tborder-radius:50px;\r\n\tborder:7px solid #fff;\r\n\topacity:.2;\r\n\tdisplay:block\r\n}\r\n.zy_media .dec_error {\r\n\twidth:62px;\r\n\theight:62px;\r\n\tmargin-top:-53px;\r\n\tmargin-left:-25px;\r\n\twhite-space:nowrap;\r\n\tcolor:#fff;\r\n\tfont-size:12px;\r\n\ttext-align:center;\r\n\tposition:absolute;\r\n\ttop:50%;\r\n\tleft:50%\r\n}\r\n.zy_controls {\r\n\theight: 1rem;\r\n\tposition:absolute;\r\n\tleft:0;\r\n\tright:0;\r\n\tbottom:0;\r\n\t-webkit-transition:bottom .5s;\r\n\ttransition:bottom .5s;\r\n\tdisplay:-webkit-box;\r\n\tdisplay:box;\r\n\tdisplay:-webkit-flex;\r\n\tdisplay:flex;\r\n\tpadding: 0 1.3rem\r\n}\r\n/*.zy_playpause_btn {\r\n\twidth:26px;\r\n\theight:30px;\r\n\tmargin-right:4px;\r\n\tpadding:13px 0 0 14px;\r\n\tposition:relative\r\n}\r\n.zy_play::before {\r\n\twidth:0;\r\n\theight:0;\r\n\tcontent:'';\r\n\tborder-color:transparent transparent transparent #cbcbcb;\r\n\tborder-width:8px 12px;\r\n\tborder-style:solid;\r\n\tdisplay:block\r\n}\r\n.zy_pause::before,.zy_pause::after {\r\n\twidth:3px;\r\n\theight:14px;\r\n\tcontent:'';\r\n\tbackground:#cbcbcb;\r\n\tposition:absolute;\r\n\ttop:13px;\r\n\tleft:14px\r\n}\r\n.zy_pause::after {\r\n\tleft:22px\r\n}*/\r\n.zy_timeline {\r\n\t/*margin-right:10px;*/\r\n\t-webkit-box-flex:1;\r\n\t-webkit-flex:1 1 auto;\r\n\tflex:1 1 auto;\r\n\twidth: 100%;\r\n\tposition: relative;\r\n}\r\n.zy_timeline_slider {\r\n\twidth:100%;\r\n\theight:1px;\r\n\tbackground:#999;\r\n\tposition:absolute;\r\n\ttop:50%;\r\n\tleft:0\r\n}\r\n.zy_timeline_buffering {\r\n\twidth:100%;\r\n\theight:15px;\r\n\ttop:-7px;\r\n\tbackground-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(.25,rgba(255,255,255,.15)),color-stop(.25,transparent),color-stop(.5,transparent),color-stop(.5,rgba(255,255,255,.15)),color-stop(.75,rgba(255,255,255,.15)),color-stop(.75,transparent),to(transparent));\r\n\tbackground-image:-webkit-linear-gradient(-45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);\r\n\tbackground-image:linear-gradient(-45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);\r\n\t-webkit-background-size:15px 15px;\r\n\tbackground-size:15px 15px;\r\n\t-webkit-animation:ani_buffering 2s linear infinite;\r\n\tanimation:ani_buffering 2s linear infinite;\r\n\tposition:absolute\r\n}\r\n@-webkit-keyframes ani_buffering {\r\n\tfrom {\r\n\tbackground-position:0 0\r\n}\r\nto {\r\n\tbackground-position:30px 0\r\n}\r\n}@keyframes ani_buffering {\r\n\tfrom {\r\n\tbackground-position:0 0\r\n}\r\nto {\r\n\tbackground-position:30px 0\r\n}\r\n}.zy_timeline_loaded {\r\n\twidth:0;\r\n\theight:1px;\r\n\tbackground:#e5e5e5;\r\n\tposition:absolute;\r\n\ttop:0;\r\n\tleft:0;\r\n\tz-index:1\r\n}\r\n.zy_timeline_current {\r\n\twidth:0;\r\n\theight:1px;\r\n\tbackground:#ff6159;\r\n\tposition:relative;\r\n\tz-index:2\r\n}\r\n.zy_timeline_handle {\r\n\twidth: 0.24rem;\r\n\theight: 0.24rem;\r\n\tborder-radius: 50%;\r\n\t-webkit-border-radius: 50%;\r\n\tbackground:#e5e5e5;\r\n\tposition:absolute;\r\n\t/*top:-8px;*/\r\n\ttop: 50%;\r\n\tmargin-top: -0.12rem;\r\n\tleft:-8px;\r\n\tz-index:3\r\n}\r\n.zy_time {\r\n\twidth:auto;\r\n\theight:44px;\r\n\tmargin-right:5px;\r\n\tline-height:44px;\r\n\tfont-size:11px;\r\n\tcolor:#999;\r\n\ttext-align:center\r\n}\r\n.zy_time .zy_currenttime {\r\n\tcolor:#e5e5e5\r\n}\r\n.zy_fullscreen_btn {\r\n\twidth:38px;\r\n\theight:44px;\r\n\tbackground-image:url(data:image/png;\r\n\tbase64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAAEsY2FrAAAAElBMVEX///////////////////////+65XQCAAAABXRSTlMAHm1u3TG+li4AAAB5SURBVBgZBcGxbQNBEAQwPnCXC49TviU4UQnKx8ZP/62YVB58qQCIBwArGgAAwK4HkAUEgEXAEmBFG/AH+B0gN5BrQLwAAG4bXLOBewPXB/AGu6VtG4CeAUCdAaCcAVCcAQAAAAMAzrAD4IwdAM7PDgDOJwBt2wAA/9uDEjcL3fqtAAAAAElFTkSuQmCC);\r\n\tbackground-repeat:no-repeat;\r\n\tbackground-position:center;\r\n\t-webkit-background-size:16px;\r\n\tbackground-size:16px\r\n}\r\n.zy_unfullscreen {\r\n\tbackground-image:url(data:image/png;\r\n\tbase64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAAEsY2FrAAAAElBMVEX///////////////////////+65XQCAAAABXRSTlMAHm1u3TG+li4AAAB5SURBVBgZBcGxDcMwEAQwGtH1QuD0WiGAB8gI39z+q4SEhR8AwALAwmAwgCAIS4AV0BYg7UAWEIttwNeA1x7gO8BrQDsAAGlBDpA3kOuAeIO4eDYZAM+WAeDZGQA8nwFo2w4AAAAAANq2A9D7AKDuA0C5D4DiPgDAH9lBEChOLXSRAAAAAElFTkSuQmCC)\r\n}\r\n.zy_auto_duration,.zy_auto_currenttime{\r\n\tcolor: #a8a8a8;\r\n\tfont-size: 0.24rem;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\theight: 1rem;\r\n    line-height: 1rem;\r\n}\r\n.zy_auto_duration{\r\n\tright: 0.3rem;\r\n}\r\n.zy_auto_currenttime{\r\n\tleft: 0.3rem;\r\n}\r\n\r\n.player-video-wrapper .zy_media{height: 100% !important;top: 0;}", ""]);

	// exports


/***/ },

/***/ 76:
/***/ function(module, exports) {

	'use strict';

	/*
	 *
	 * zy.media.js
	 * HTML5 <video> and <audio> native player
	 *
	 * Copyright 2016, iReader FE(掌阅书城研发--前端组)
	 * License: MIT
	 * 
	 */
	;
	(function () {

		var zyMedia = {};

		// Default config
		zyMedia.config = {
			// Overrides the type specified, for dynamic instantiation
			type: '',
			// Set media title
			mediaTitle: '',
			// Force native controls
			nativeControls: false,
			// Autoplay
			autoplay: false,
			// Preload, not 'auto', in native app of xiaomi HM 1SW,
			// the images does not synchronize with sound of video which is cross-domain
			preload: 'none',
			// Video width
			videoWidth: '100%',
			// Video height
			videoHeight: 'auto',
			// Aspect ration 16:9
			aspectRation: 16 / 9,
			// Audio width
			audioWidth: '100%',
			// Audio height
			audioHeight: 44,
			// AutoLoop, true for infinite loop, false for rewind to beginning when media ends
			autoLoop: false,
			// Time format to show. Default 1 for 'mm:ss', 2 for 'm:s'
			timeFormatType: 1,
			// Forces the hour marker (##:00:00)
			alwaysShowHours: false,
			// Hide controls when playing and mouse is not over the video
			alwaysShowControls: false,
			// Display the video control
			hideVideoControlsOnLoad: false,
			// Show fullscreen button
			enableFullscreen: true,
			// When this player starts, it will pause other players
			pauseOtherPlayers: true,
			// Media duration
			duration: 0,
			// Sucess callback
			success: null,
			// Error callback
			error: null,
			//自定义时间显示元素
			timeElm: false,
			//自定义播放按钮
			playElm: null,
			src: '',
			lyricCallback: null
		};

		// Feature detect
		(function (t) {
			var ua = window.navigator.userAgent.toLowerCase();
			var v = document.createElement('video');

			t.isiOS = /iphone|ipod|ipad/i.test(ua) && !window.MSStream;
			t.isAndroid = /android/i.test(ua) && !window.MSStream;
			t.isBustedAndroid = /android 2\.[12]/i.test(ua);
			t.isChromium = /chromium/i.test(ua);

			t.hasTouch = 'ontouchstart' in window;
			t.supportsCanPlayType = typeof v.canPlayType !== 'undefined';

			// Vendor for no big Play button
			t.isVendorBigPlay = /iphone/i.test(ua) && !window.MSStream;
			// Vendor for no controls bar
			t.isVendorControls = /baidu/i.test(ua);
			// Vendor and app for fullscreen button
			t.isVendorFullscreen = /micromessenger|weibo/i.test(ua);
			// Vendor for autoplay be disabled, iOS device and 昂达
			t.isVendorAutoplay = /v819mini/i.test(ua) || t.isiOS;
			// Prefix of current working browser

			t.nativeFullscreenPrefix = function () {
				if (v.requestFullScreen) {
					return '';
				} else if (v.webkitRequestFullScreen) {
					return 'webkit';
				} else if (v.mozRequestFullScreen) {
					return 'moz';
				} else if (v.msRequestFullScreen) {
					return 'ms';
				}
				return '-';
			}();

			// None-standard
			t.hasOldNativeFullScreen = t.nativeFullscreenPrefix == '-' && v.webkitEnterFullscreen;

			// OS X 10.5 can't do this even if it says it can
			if (t.hasOldNativeFullScreen && /mac os x 10_5/i.test(ua)) {
				t.nativeFullscreenPrefix = '-';
				t.hasOldNativeFullScreen = false;
			}
		})(zyMedia.features = {});

		// Get style
		function _css(el, property) {
			return parseInt(el.style[property] || getComputedStyle(el, null).getPropertyValue(property));
		}

		// Has Class
		function _hasClass(el, token) {
			return new RegExp('(\\s|^)' + token + '(\\s|$)').test(el.className);
		}

		// Add class
		function _addClass(el, token) {
			if (el.classList) {
				el.classList.add(token);
			} else if (!_hasClass(el, token)) {
				el.className += '' + token;
			}
		}

		// Remove class
		function _removeClass(el, token) {
			if (el.classList) {
				el.classList.remove(token);
			} else if (_hasClass(el, token)) {
				el.className = el.className.replace(new RegExp('(\\s|^)' + token + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
			}
		}

		// Get time format
		function timeFormat(time, options) {
			// Video's duration is Infinity in GiONEE(金立) device
			if (!isFinite(time) || time < 0) {
				time = 0;
			}
			// Get hours
			var _time = options.alwaysShowHours ? [0] : [];
			if (Math.floor(time / 3600) % 24) {
				_time.push(Math.floor(time / 3600) % 24);
			}
			// Get minutes
			_time.push(Math.floor(time / 60) % 60);
			// Get seconds
			_time.push(Math.floor(time % 60));
			_time = _time.join(':');
			// Fill '0'
			if (options.timeFormatType == 1) {
				_time = _time.replace(/(:|^)([0-9])(?=:|$)/g, '$10$2');
			}

			return _time;
		};

		// Report whether or not the document in fullscreen mode
		function isInFullScreenMode() {
			return document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen;
		}

		// Get media type from file extension
		function getTypeFromFileExtension(url) {
			url = url.toLowerCase().split('?')[0];
			var _ext = url.substring(url.lastIndexOf('.') + 1);
			var _av = /mp4|m4v|ogg|ogv|m3u8|webm|webmv|wmv|mpeg|mov/gi.test(_ext) ? 'video/' : 'audio/';

			switch (_ext) {
				case 'mp4':
				case 'm4v':
				case 'm4a':
					return _av + 'mp4';
				case 'webm':
				case 'webma':
				case 'webmv':
					return _av + 'webm';
				case 'ogg':
				case 'oga':
				case 'ogv':
					return _av + 'ogg';
				case 'm3u8':
					return 'application/x-mpegurl';
				case 'ts':
					return _av + 'mp2t';
				default:
					return _av + _ext;
			}
		}

		// Get media type
		function getType(url, type) {
			// If no type is specified, try to get from the extension
			if (url && !type) {
				return getTypeFromFileExtension(url);
			} else {
				// Only return the mime part of the type in case the attribute contains the codec
				// see http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#the-source-element
				// `video/mp4; codecs="avc1.42E01E, mp4a.40.2"` becomes `video/mp4`
				if (type && ~type.indexOf(';')) {
					return type.substr(0, type.indexOf(';'));
				} else {
					return type;
				}
			}
		}

		// Detect if current type is supported  
		function detectType(media, options, src) {
			var mediaFiles = [];
			var i;
			var n;
			var isCanPlay;

			// Get URL and type
			if (options.type) {
				// Accept either string or array of types
				if (typeof options.type == 'string') {
					mediaFiles.push({
						type: options.type,
						url: src
					});
				} else {
					for (i = 0; i < options.type.length; i++) {
						mediaFiles.push({
							type: options.type[i],
							url: src
						});
					}
				}
			} else if (src !== null) {
				// If src attribute
				mediaFiles.push({
					type: getType(src, media.getAttribute('type')),
					url: src
				});
			} else {
				// If <source> elements
				for (i = 0; i < media.children.length; i++) {
					n = media.children[i];

					if (n.nodeType == 1 && n.tagName.toLowerCase() == 'source') {
						src = n.getAttribute('src');
						mediaFiles.push({
							type: getType(src, n.getAttribute('type')),
							url: src
						});
					}
				}
			}

			// For Android which doesn't implement the canPlayType function (always returns '')
			if (zyMedia.features.isBustedAndroid) {
				media.canPlayType = function (type) {
					return (/video\/(mp4|m4v)/i.test(type) ? 'maybe' : ''
					);
				};
			}
			// For Chromium to specify natively supported video codecs (i.e. WebM and Theora) 
			if (zyMedia.features.isChromium) {
				media.canPlayType = function (type) {
					return (/video\/(webm|ogv|ogg)/i.test(type) ? 'maybe' : ''
					);
				};
			}

			if (zyMedia.features.supportsCanPlayType) {
				for (i = 0; i < mediaFiles.length; i++) {
					// Normal detect
					if (mediaFiles[i].type == "video/m3u8" || media.canPlayType(mediaFiles[i].type).replace(/no/, '') !== ''
					// For Mac/Safari 5.0.3 which answers '' to canPlayType('audio/mp3') but 'maybe' to canPlayType('audio/mpeg')
					|| media.canPlayType(mediaFiles[i].type.replace(/mp3/, 'mpeg')).replace(/no/, '') !== ''
					// For m4a supported by detecting mp4 support
					|| media.canPlayType(mediaFiles[i].type.replace(/m4a/, 'mp4')).replace(/no/, '') !== '') {
						isCanPlay = true;
						break;
					}
				}
			}

			return isCanPlay;
		};

		// Mediaplayer instance No
		var zymIndex = 0;
		// Store Mediaplayer instance
		zyMedia.players = {};

		// Constructor, MediaPlayer
		zyMedia.MediaPlayer = function (media, option) {
			var t = this;
			var i;
			// Make sure it can't be instantiated again
			if (media.isInstantiated) {
				return;
			} else {
				media.isInstantiated = true;
			}

			t.media = media;

			// Detect video or audio
			var _tagName = t.media.tagName.toLowerCase();
			if (!/audio|video/.test(_tagName)) return;

			t.isVideo = _tagName === 'video';

			// Extend options
			t.options = {};
			for (i in zyMedia.config) {
				t.options[i] = zyMedia.config[i];
			}

			try {
				for (i in option) {
					t.options[i] = option[i];
				}
				// Data-config has the highest priority
				var config = JSON.parse(t.media.getAttribute('data-config'));
				for (i in config) {
					t.options[i] = config[i];
				}
			} catch (exp) {}
			// Autoplay be disabled
			if (t.options.autoplay) {
				t.options.autoplay = !zyMedia.features.isVendorAutoplay;
			}

			if (!t.isVideo) {
				t.options.alwaysShowControls = true;
			}

			if (t.options.nativeControls || zyMedia.features.isVendorControls) {
				// Use native controls
				t.media.setAttribute('controls', 'controls');
			} else {
				var src = t.media.getAttribute('src');

				src = src === '' ? null : src;

				if (t.options.src) {
					src = t.options.src;
					t.media.setAttribute('src', src);
				}

				if (detectType(t.media, t.options, src)) {
					// Unique ID
					t.id = 'zym_' + zymIndex++;
					zyMedia.players[t.id] = t;
					t.init();
				} else {
					console.log('不支持此' + (t.isVideo ? '视' : '音') + '频');
				}
			}
		};

		zyMedia.MediaPlayer.prototype = {

			isControlsVisible: true,
			isFullScreen: false,

			setPlayerSize: function setPlayerSize(width, height) {
				var t = this;
				var _W = _css(t.container, 'width');
				// The width is not more than container width
				if (width > _W) {
					t.width = _W;
				}

				// Set height for video
				if (t.enableAutoSize) {
					var nativeWidth = t.media.videoWidth;
					var nativeHeight = t.media.videoHeight;
					// Uniform scale
					if (nativeWidth && nativeHeight) {
						if (Math.abs(t.options.aspectRation - nativeWidth / nativeHeight) < .1) {
							t.options.aspectRation = nativeWidth / nativeHeight;
						}
					}

					t.height = parseInt(_W / t.options.aspectRation);
				}

				t.container.style.width = t.width + 'px';
				t.media.style.height = t.container.style.height = t.height + 'px';
			},

			showControls: function showControls() {
				var t = this;

				if (t.isControlsVisible) return;

				t.controls.style.bottom = 0;

				if (t.options.mediaTitle) {
					t.title.style.top = 0;
				}

				t.isControlsVisible = true;
			},

			hideControls: function hideControls() {
				var t = this;

				if (!t.isControlsVisible || t.options.alwaysShowControls) return;

				t.controls.style.bottom = '-45px';

				if (t.options.mediaTitle) {
					t.title.style.top = '-35px';
				}

				t.isControlsVisible = false;
			},

			setControlsTimer: function setControlsTimer(timeout) {
				var t = this;
				clearTimeout(t.controlsTimer);

				t.controlsTimer = setTimeout(function () {
					t.hideControls();
				}, timeout);
			},

			updateTimeline: function updateTimeline(e) {
				var t = this;
				var el = e !== undefined ? e.target : t.media;
				var percent = null;
				var _W = _css(t.slider, 'width');
				// Support buffered
				if (!el) return;
				if (el.buffered && el.buffered.length > 0 && el.buffered.end && el.duration) {
					percent = el.buffered.end(el.buffered.length - 1) / el.duration;
				}
				// Support bufferedBytes
				else if (el.bytesTotal !== undefined && el.bytesTotal > 0 && el.bufferedBytes !== undefined) {
						percent = el.bufferedBytes / el.bytesTotal;
					}
					// Support progressEvent.lengthComputable
					else if (e && e.lengthComputable && e.total !== 0) {
							percent = e.loaded / e.total;
						}

				// Update the timeline
				if (percent !== null) {
					percent = Math.min(1, Math.max(0, percent));
					t.loaded.style.width = _W * percent + 'px';
					// Adjust when pause change from playing (魅族)
					t.media.addEventListener('pause', function (e) {
						setTimeout(function () {
							t.loaded.style.width = _W * percent + 'px';
							t.updateTimeline(e);
						}, 300);
					});
				}

				if (t.media.currentTime !== undefined && t.media.duration) {
					// Update bar and handle
					var _w = Math.round(_W * t.media.currentTime / t.media.duration);
					t.current.style.width = _w + 'px';
					t.handle.style.left = _w - Math.round(_css(t.handle, 'width') / 2) + 'px';
				}
			},

			updateTime: function updateTime() {
				var t = this;
				if (t.options.lyricCallback) {
					t.options.lyricCallback(t.media.currentTime, t.media.duration);
				}
				t.currentTime.innerHTML = timeFormat(t.media.currentTime, t.options);

				// Duration is 1 in (读者) device
				if (t.options.duration > 1 || t.media.duration > 1) {
					t.durationDuration.innerHTML = timeFormat(t.options.duration > 1 ? t.options.duration : t.media.duration, t.options);
				}
			},

			enterFullScreen: function enterFullScreen() {
				var t = this;
				// Store size
				t.normalHeight = _css(t.container, 'height');
				t.normalWidth = _css(t.container, 'width');

				// Attempt to do true fullscreen
				if (zyMedia.features.nativeFullscreenPrefix != '-') {
					t.container[zyMedia.features.nativeFullscreenPrefix + 'RequestFullScreen']();
				} else if (zyMedia.features.hasOldNativeFullScreen) {
					t.media.webkitEnterFullscreen();
					return;
				}

				// Set it to not show scroll bars so 100% will work
				_addClass(document.documentElement, 'zy_fullscreen');

				// Make full size
				t.media.style.width = t.container.style.width = '100%';
				t.media.style.height = t.container.style.height = '100%';
				_addClass(t.fullscreenBtn, 'zy_unfullscreen');
				t.isFullScreen = true;
			},

			exitFullScreen: function exitFullScreen() {
				var t = this;
				// Come out of native fullscreen
				if (isInFullScreenMode() || t.isFullScreen) {
					if (zyMedia.features.nativeFullscreenPrefix != '-') {
						document[zyMedia.features.nativeFullscreenPrefix + 'CancelFullScreen']();
					} else if (zyMedia.features.hasOldNativeFullScreen) {
						document.webkitExitFullscreen();
					}
				}
				_removeClass(document.documentElement, 'zy_fullscreen');
				t.media.style.width = t.container.style.width = t.normalWidth + 'px';
				t.media.style.height = t.container.style.height = t.normalHeight + 'px';
				_removeClass(t.fullscreenBtn, 'zy_unfullscreen');
				t.isFullScreen = false;
			},

			// Media container
			buildContainer: function buildContainer() {
				var t = this;

				t.container = t.media.parentNode;
				t.container.style.overflow = 'hidden';
				// Preset container's height by aspectRation
				t.container.style.height = (t.isVideo ? _css(t.container, 'width') / t.options.aspectRation : t.options.audioHeight) + 'px';
				t.container.innerHTML = '<div class="zy_wrap"></div><div class="zy_controls"></div>' + (t.options.mediaTitle ? '<div class="zy_title">' + t.options.mediaTitle + '</div>' : '');

				t.title = t.container.querySelector('.zy_title');

				t.media.setAttribute('preload', t.options.preload);
				t.container.querySelector('.zy_wrap').appendChild(t.media);
				t.controls = t.container.querySelector('.zy_controls');

				if (t.isVideo) {
					t.width = t.options.videoWidth;
					t.height = t.options.videoHeight;

					if (t.width == '100%' && t.height == 'auto') {
						t.enableAutoSize = true;
					}
					t.setPlayerSize(t.width, t.height);
				}
			},

			// Play/pause button
			buildPlaypause: function buildPlaypause() {
				var t = this;

				var play;
				if (!t.options.playElm) {
					play = document.createElement('div');
					play.className = 'zy_playpause_btn zy_play';
					play.setAttribute('id', 'videoPlay');
					t.controls.appendChild(play);
				} else {
					play = document.getElementById(t.options.playElm);
					//play.className = 'zy_playpause_btn zy_play';
				}

				play.addEventListener('click', function () {
					t.media.isUserClick = true;

					if (t.media.paused) {
						t.media.play();
						// Controls bar auto hide after 3s
						if (!t.media.paused && !t.options.alwaysShowControls) {
							t.setControlsTimer(3000);
						}
					} else {
						t.media.pause();
					}
				});

				function togglePlayPause(s) {
					if (t.media.isUserClick || t.options.autoplay) {
						if ('play' === s) {
							_removeClass(play, 'zy_play');
							_addClass(play, 'zy_pause');
						} else {
							_removeClass(play, 'zy_pause');
							_addClass(play, 'zy_play');
						}
					}
				};

				t.media.addEventListener('play', function () {
					togglePlayPause('play');
				});

				t.media.addEventListener('playing', function () {
					togglePlayPause('play');
				});

				t.media.addEventListener('pause', function () {
					togglePlayPause('pse');
				});

				t.media.addEventListener('paused', function () {
					togglePlayPause('pse');
				});
			},

			// Timeline
			buildTimeline: function buildTimeline() {
				var t = this;
				var timeline = document.createElement('div');
				timeline.className = 'zy_timeline';
				timeline.innerHTML = '<div class="zy_timeline_slider">' + '<div class="zy_timeline_buffering" style="display:none"></div>' + '<div class="zy_timeline_loaded"></div>' + '<div class="zy_timeline_current"></div>' + '<div class="zy_timeline_handle"></div>' + '</div>';
				t.controls.appendChild(timeline);

				t.slider = timeline.children[0];
				t.buffering = t.slider.children[0];
				t.loaded = t.slider.children[1];
				t.current = t.slider.children[2];
				t.handle = t.slider.children[3];

				var isPointerDown = false;
				var _X = t.slider.offsetLeft;
				var _W = _css(t.slider, 'width');

				var pointerMove = function pointerMove(e) {
					var _time = 0;
					var x;

					if (e.changedTouches) {
						x = e.changedTouches[0].pageX;
					} else {
						x = e.pageX;
					}

					if (t.media.duration) {
						if (x < _X) {
							x = _X;
						} else if (x > _W + _X) {
							x = _W + _X;
						}

						_time = (x - _X) / _W * t.media.duration;

						if (isPointerDown && _time !== t.media.currentTime) {
							t.media.currentTime = _time;
						}
					}
				};
				// Handle clicks
				if (zyMedia.features.hasTouch) {
					t.slider.addEventListener('touchstart', function (e) {
						isPointerDown = true;
						pointerMove(e);
						_X = t.slider.offsetLeft;
						_W = _css(t.slider, 'width');
						t.slider.addEventListener('touchmove', pointerMove);
						t.slider.addEventListener('touchend', function (e) {
							isPointerDown = false;
							t.slider.removeEventListener('touchmove', pointerMove);
						});
					});
				} else {
					t.slider.addEventListener('mousedown', function (e) {
						isPointerDown = true;
						pointerMove(e);
						_X = t.slider.offsetLeft;
						_W = _css(t.slider, 'width');
						t.slider.addEventListener('mousemove', pointerMove);
						t.slider.addEventListener('mouseup', function (e) {
							isPointerDown = false;
							t.slider.addEventListener('mousemove', pointerMove);
						});
					});
				}

				t.slider.addEventListener('mouseenter', function (e) {
					t.slider.addEventListener('mousemove', pointerMove);
				});

				t.slider.addEventListener('mouseleave', function (e) {
					if (!isPointerDown) {
						t.slider.removeEventListener('mousemove', pointerMove);
					}
				});

				//4Hz ~ 66Hz, no longer than 250ms
				t.media.addEventListener('timeupdate', function (e) {
					t.updateTimeline(e);
				});
			},

			// Current and duration time 00:00/00:00
			buildTime: function buildTime() {
				var t = this;

				if (!t.options.timeElm) {
					var time = document.createElement('div');
					time.className = 'zy_time';
					time.innerHTML = '<span class="zy_currenttime">' + timeFormat(0, t.options) + '</span>/' + '<span class="zy_duration">' + timeFormat(t.options.duration, t.options) + '</span>';
					t.controls.appendChild(time);
					t.currentTime = time.children[0];
					t.durationDuration = time.children[1];
				} else {
					var zy_duration = document.createElement('div');
					var zy_currenttime = document.createElement('div');
					zy_duration.className = 'zy_auto_duration';
					zy_currenttime.className = 'zy_auto_currenttime';
					zy_duration.innerHTML = timeFormat(t.options.duration, t.options);
					zy_currenttime.innerHTML = timeFormat(0, t.options);
					t.controls.appendChild(zy_duration);
					t.controls.appendChild(zy_currenttime);
					t.currentTime = zy_currenttime;
					t.durationDuration = zy_duration;
				}
				//4Hz ~ 66Hz, no longer than 250ms
				t.media.addEventListener('timeupdate', function () {
					t.updateTime();
				});
			},

			// Fullscreen button
			buildFullscreen: function buildFullscreen() {
				var t = this;
				// Native events
				if (zyMedia.features.nativeFullscreenPrefix != '-') {
					// Chrome doesn't alays fire this in an iframe
					var func = function func(e) {
						if (t.isFullScreen) {
							if (!isInFullScreenMode()) {
								t.exitFullScreen();
							}
						}
					};

					document.addEventListener(zyMedia.features.nativeFullscreenPrefix + 'fullscreenchange', func);
				}

				t.fullscreenBtn = document.createElement('div');
				t.fullscreenBtn.className = 'zy_fullscreen_btn';
				t.controls.appendChild(t.fullscreenBtn);

				t.fullscreenBtn.addEventListener('click', function () {
					if (zyMedia.features.nativeFullscreenPrefix != '-' && isInFullScreenMode() || t.isFullScreen) {
						t.exitFullScreen();
					} else {
						t.enterFullScreen();
					}
				});
			},

			// bigPlay, loading and error info
			buildDec: function buildDec() {
				var t = this;

				var loading = document.createElement('div');
				loading.className = 'dec_loading';
				loading.style.display = 'none';
				t.container.appendChild(loading);

				var error = document.createElement('div');
				error.className = 'dec_error';
				error.style.display = 'none';
				error.innerHTML = '播放异常';
				t.container.appendChild(error);

				var bigPlay = document.createElement('div');

				if (!zyMedia.features.isVendorBigPlay) {
					bigPlay.className = 'dec_play';
					t.container.appendChild(bigPlay);
					bigPlay.addEventListener('click', function () {
						// For some device trigger 'play' event 
						t.media.isUserClick = true;

						t.media.play();
						// Controls bar auto hide after 3s
						if (!t.media.paused && !t.options.alwaysShowControls) {
							t.setControlsTimer(3000);
						}
					});
				}

				t.media.addEventListener('play', function () {
					// Only for user click
					if (t.media.isUserClick) {
						bigPlay.style.display = 'none';
						loading.style.display = '';
						t.buffering.style.display = 'none';
					}
				});

				t.media.addEventListener('playing', function () {
					bigPlay.style.display = 'none';
					loading.style.display = 'none';
					t.buffering.style.display = 'none';
					error.style.display = 'none';
				});

				t.media.addEventListener('seeking', function () {
					loading.style.display = '';
					bigPlay.style.display = 'none';
					t.buffering.style.display = '';
				});

				t.media.addEventListener('seeked', function () {
					loading.style.display = 'none';
					t.buffering.style.display = 'none';
				});

				t.media.addEventListener('pause', function () {
					bigPlay.style.display = '';
				});

				t.media.addEventListener('waiting', function () {
					loading.style.display = '';
					bigPlay.style.display = 'none';
					t.buffering.style.display = '';
				});

				// Don't listen to 'loadeddata' and 'canplay', 
				// some Android device can't fire 'canplay' or irregular working when use 'createEvent' to trigger 'canplay' (读者i800)

				// Error handling
				t.media.addEventListener('error', function (e) {
					loading.style.display = 'none';
					bigPlay.style.display = '';
					t.buffering.style.display = 'none';
					t.media.pause();
					error.style.display = '';

					if (typeof t.options.error == 'function') {
						t.options.error(e);
					}
				});
			},

			init: function init() {
				var t = this;

				// Build
				var batch = ['Container', 'Playpause', 'Timeline', 'Time'];
				if (t.options.enableFullscreen && !zyMedia.features.isVendorFullscreen && t.isVideo) {
					batch.push('Fullscreen');
				}

				if (t.isVideo) {
					batch.push('Dec');
				}

				for (var i = 0; i < batch.length; i++) {
					try {
						t['build' + batch[i]]();
					} catch (exp) {}
				}

				// Controls fade
				if (t.isVideo) {
					if (zyMedia.features.hasTouch) {
						t.media.addEventListener('click', function () {
							// Toggle controls
							if (t.isControlsVisible) {
								t.hideControls();
							} else {
								t.showControls();
								// Controls bar auto hide after 3s
								if (!t.media.paused && !t.options.alwaysShowControls) {
									t.setControlsTimer(3000);
								}
							}
						});
					} else {
						// Click to play/pause
						t.media.addEventListener('click', function () {
							if (t.media.paused) {
								t.media.play();
							} else {
								t.media.pause();
							}
						});

						// Show/hide controls
						t.container.addEventListener('mouseenter', function () {
							t.showControls();

							if (!t.options.alwaysShowControls) {
								t.setControlsTimer(3000);
							}
						});

						t.container.addEventListener('mousemove', function () {
							t.showControls();

							if (!t.options.alwaysShowControls) {
								t.setControlsTimer(3000);
							}
						});
					}

					if (t.options.hideVideoControlsOnLoad) {
						t.hideControls();
					}

					t.media.addEventListener('loadedmetadata', function (e) {
						if (t.enableAutoSize) {
							// For more properly videoWidth or videoHeight of HM 1SW(小米), QQ browser is 0
							setTimeout(function () {
								if (!isNaN(t.media.videoHeight)) {
									t.setPlayerSize();
								}
							}, 50);
						}
					});
				}

				t.media.addEventListener('play', function () {
					var p;

					for (var i in zyMedia.players) {
						p = zyMedia.players[i];

						if (p.id != t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {
							try {
								p.media.pause();
							} catch (exp) {}
						}
					}
				});

				// Adjust controls when orientation change, 500ms for Sumsung tablet
				window.addEventListener('orientationchange', function () {
					setTimeout(function () {
						t.setPlayerSize();
					}, 500);
				});

				t.media.addEventListener('ended', function (e) {
					t.media.currentTime = 0;

					if (t.options.autoLoop) {
						t.media.play();
					} else {
						// Fixing an Android stock browser bug, where "seeked" isn't fired correctly after ending the video and jumping to the beginning
						if (t.isVideo) {
							setTimeout(function () {
								t.container.querySelector('.dec_loading').style.display = 'none';
							}, 20);
						}

						t.media.pause();
					}

					t.updateTimeline(e);
				});

				t.media.addEventListener('loadedmetadata', function (e) {
					t.updateTime();
				});

				if (t.options.autoplay) {
					t.media.isUserClick = false;
					t.media.play();
				}

				if (typeof t.options.success == 'function') {
					t.options.success(t.media);
				}
			}

		};

		// String or node
		module.exports = function (selector, options) {
			if (typeof selector === 'string') {
				console.log(document.querySelectorAll(selector));
				[].forEach.call(document.querySelectorAll(selector), function (el) {
					new zyMedia.MediaPlayer(el, options);
				});
			} else {
				new zyMedia.MediaPlayer(selector, options);
			}
		};
	})();

/***/ },

/***/ 92:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"player-wrapper container container-bg\" v-show=\"ajaxCompeted\" _v-1f4af77e=\"\">\n  <div class=\"player-normal\" v-if=\"isNormal\" _v-1f4af77e=\"\">\n      <player-audio :play-data=\"playerData.data\" v-if=\"playerData.data.song.type == 1\" _v-1f4af77e=\"\"></player-audio>\n      <player-video :play-data=\"playerData.data\" v-if=\"playerData.data.song.type == 2\" _v-1f4af77e=\"\"></player-video>\n  </div>\n  <div class=\"player-error\" v-if=\"!isNormal\" _v-1f4af77e=\"\">\n      <error-module :error-msg=\"playerData.error\" _v-1f4af77e=\"\"></error-module>\n  </div>\n\n  <app-download :url=\"playerData.data.appUrl\" _v-1f4af77e=\"\"></app-download>\n</div>\n";

/***/ }

});