webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(14)
	__vue_script__ = __webpack_require__(18)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Match.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(25)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-007b3ab8/Match.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-007b3ab8&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Match.vue", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-007b3ab8&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Match.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.lh62[_v-007b3ab8]{line-height: .62rem;}\n.match-countdown[_v-007b3ab8]{\n    height: 0.6rem;\n    line-height: 0.6rem;\n\ttext-align: center;\n}\n.match-poster[_v-007b3ab8]{\n\twidth: 100%;\n\theight: 3.52rem;\n\toverflow: hidden;\n}\n.match-poster img[_v-007b3ab8]{width: 100%;}\n.match-info[_v-007b3ab8]{padding-top: 0.5rem;padding-bottom: 0.5rem}\n.match-date[_v-007b3ab8]{margin-top: 0.1rem;}\n.match-descript[_v-007b3ab8]{margin-top: 0.3rem;}\n.match-rewards[_v-007b3ab8]{margin-top: 0.5rem;}\n.match-rewards p[_v-007b3ab8]{margin-bottom: 0.15rem}\n.match-rules[_v-007b3ab8]{margin-top: 0.5rem;}\n.match-end[_v-007b3ab8]{width: 100%;position: absolute;top: 30%;left: 0;}\n", ""]);

	// exports


/***/ },
/* 16 */,
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});

	var _TimeCountdown = __webpack_require__(19);

	var _TimeCountdown2 = _interopRequireDefault(_TimeCountdown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(24);
	exports.default = {
			ready: function ready() {},

			route: {
					data: function data(transition) {
							this.setTitle('比赛详情');
							var vueThis = this;

							this.$http.get('/match.json', { params: vueThis.$route.params }).then(function (rep) {
									vueThis.ajaxCompeted = true;
									var httpData = rep.json();

									if (httpData) {
											vueThis.isNormal = true;
											vueThis.matchData = httpData;
									} else {
											vueThis.isNormal = false;
											vueThis.isUnnormalMsg = httpData.error;
									}
							}, function (rep) {
									vueThis.ajaxCompeted = true;
									console.log(rep);
									vueThis.isNormal = false;
									vueThis.isUnnormalMsg = '比赛不存在';
							});
					}
			},
			data: function data() {
					return {
							matchData: {
									appUrl: 'XXXXXXXXXXXXXXXXX',
									title: '',
									intro: '',
									startTime: 0,
									endTime: 0,
									rewards: [],
									rules: '',
									poster: ''
							},
							countDown: '',
							ajaxCompeted: false,
							isNormal: false,
							isUnnormalMsg: "比赛结束"
					};
			},

			components: {
					'time-countdown': _TimeCountdown2.default
			}
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(20)
	__vue_script__ = __webpack_require__(22)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\TimeCountdown.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(23)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-35062857/TimeCountdown.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./TimeCountdown.vue", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./TimeCountdown.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.begin,.active{font-size: 0}\n.over,.begin span,.active span{font-size: 0.28rem}\n", ""]);

	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		props: ['startTime', 'endTime'],
		data: function data() {
			return {
				begin: false,
				over: false,
				active: false,
				beginD: false,
				beginH: false,
				beginM: false,
				beginS: false,
				activeD: false,
				activeH: false,
				activeM: false,
				activeS: false
			};
		},
		ready: function ready() {
			this.getT();
		},

		methods: {
			getT: function getT() {
				var timeout = setTimeout(this.getT, 1000);
				var curTime = new Date();
				var start = new Date(this.startTime);
				var end = new Date(this.endTime);
				var leftStart = parseInt((start.getTime() - curTime.getTime()) / 1000);
				var leftEnd = parseInt((end.getTime() - curTime.getTime()) / 1000);
				if (leftStart > 0) {
					this.begin = true;
					var beginD = parseInt(leftStart / (24 * 60 * 60));
					var beginH = parseInt(leftStart / (60 * 60) % 24);
					var beginM = parseInt(leftStart / 60 % 60);
					var beginS = parseInt(leftStart % 60);
					if (beginD > 0) {
						this.beginD = beginD;
						this.beginH = beginH;
					} else if (beginH > 0) {
						this.beginD = false;
						this.beginH = beginH;
					} else if (beginM > 0) {
						this.beginH = false;
						this.beginM = beginM;
					} else {
						this.beginM = false;
						this.beginS = beginS;
					}
				} else if (leftEnd > 0) {
					this.begin = false;
					this.active = true;
					var activeD = parseInt(leftEnd / (24 * 60 * 60));
					var activeH = parseInt(leftEnd / (60 * 60) % 24);
					var activeM = parseInt(leftEnd / 60 % 60);
					var activeS = parseInt(leftEnd % 60);
					if (activeD > 0) {
						this.activeD = activeD;
						this.activeH = activeH;
					} else if (activeH > 0) {
						this.activeD = false;
						this.activeH = activeH;
					} else if (activeM > 0) {
						this.activeH = false;
						this.activeM = activeM;
					} else {
						this.activeM = false;
						this.activeS = activeS;
					}
				} else {
					this.begin = false;
					this.active = false;
					this.over = true;
					clearTimeout(timeout);
				}
			}
		}
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "\r\n<div>\r\n\t<p v-if=\"begin\" class=\"begin\">\r\n\t\t<span v-if=\"beginD\">{{beginD}}天</span>\r\n\t\t<span v-if=\"beginH\">{{beginH}}时</span>\r\n\t\t<span v-if=\"beginM\">{{beginM}}分钟</span>\r\n\t\t<span v-if=\"beginS\">{{beginS}}秒</span>\r\n\t\t<span>后开始</span>\r\n\t</p>\r\n\t<p v-if=\"active\" class=\"active\">\r\n\t\t<span v-if=\"activeD\">{{activeD}}天</span>\r\n\t\t<span v-if=\"activeH\">{{activeH}}时</span>\r\n\t\t<span v-if=\"activeM\">{{activeM}}分钟</span>\r\n\t\t<span v-if=\"activeS\">{{activeS}}秒</span>\r\n\t\t<span>后结束</span>\r\n\t</p>\r\n\t<p v-if=\"over\" class=\"over\">比赛已结束</p>\r\n</div>\r\n";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _jquery = __webpack_require__(8);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.filter('dateFormat', function (value) {
	  var d = new Date(value);
	  return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
	});
	_vue2.default.filter('isArray', function (value) {
	  return _jquery2.default.isArray(value);
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "\n <div class=\"match-wrapper container\" v-show=\"ajaxCompeted\" _v-007b3ab8=\"\">\n\t  <div v-if=\"isNormal\" _v-007b3ab8=\"\">\n\t  \t  <div class=\"match-countdown fs28\" _v-007b3ab8=\"\">\n\t  \t  \t<time-countdown :start-time=\"matchData.startTime\" :end-time=\"matchData.endTime\" _v-007b3ab8=\"\"></time-countdown>\n\t  \t  </div>\n\t  \t  <div class=\"match-poster\" _v-007b3ab8=\"\">\n\t  \t  \t<img :src=\"matchData.poster\" alt=\"\" title=\"\" _v-007b3ab8=\"\">\n\t  \t  </div>\n\t\t  <div class=\"match-info containerSidePadding\" _v-007b3ab8=\"\">\n\t\t\t  <h1 class=\"match-title fs48\" _v-007b3ab8=\"\">{{ matchData.title }}</h1>\n\t\t\t  <div class=\"match-date fs24\" _v-007b3ab8=\"\">比赛时间 : {{ matchData.startTime | dateFormat }}-{{ matchData.endTime | dateFormat }}</div>\n\t\t\t  <p class=\"match-descript fs36 lh62\" _v-007b3ab8=\"\">{{ matchData.intro }}</p>\n\t\t\t  <div class=\"match-rewards fs36 lh62\" _v-007b3ab8=\"\">\n\t\t\t\t\t<p v-for=\"reward in matchData.rewards\" _v-007b3ab8=\"\">{{ reward.name }} {{ reward.item }}，共{{ reward.count }}人</p>\n\t\t\t  </div>\n\t\t\t  <div class=\"match-rules fs36 lh62\" _v-007b3ab8=\"\">\n\t\t\t  \t<p class=\"match-rules-title\" _v-007b3ab8=\"\">比赛规则：</p>\n\t\t\t  \t<p class=\"match-rules-descript\" _v-007b3ab8=\"\">{{ matchData.rules }}</p>\n\t\t\t  </div>\n\t\t  </div>\n\t  </div>\n\t  <div class=\"match-end\" v-if=\"!isNormal\" _v-007b3ab8=\"\">\n\t  \t  <error-module :error-msg=\"isUnnormalMsg\" _v-007b3ab8=\"\"></error-module>\n\t  </div>\n\t  <app-download :url=\"matchData.appUrl\" _v-007b3ab8=\"\"></app-download>\n  </div>\n";

/***/ }
]);