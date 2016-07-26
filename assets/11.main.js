webpackJsonp([11],{

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

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(110)
	__vue_script__ = __webpack_require__(113)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\AppDownload.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(114)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3289647c/AppDownload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(111);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3289647c&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppDownload.vue", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.23.1/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3289647c&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppDownload.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.appdownload-wrapper[_v-3289647c]{\n\tposition: fixed;\n\tbottom: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 1.2rem;\n\tbackground: url(" + __webpack_require__(112) + ") repeat-x;\n}\n.appdownload-logo[_v-3289647c]{\n\twidth: 0.8rem;\n    height: 0.8rem;\n    margin: 0.2rem 0 0 0.3rem;\n}\n.appdownload-title[_v-3289647c]{margin: 0.2rem 0 0 0.2rem;}\n.appdownload-title .t1[_v-3289647c]{color: #fff;}\n.appdownload-title .t2[_v-3289647c]{color: #a8a8a8;}\n.appdownload-btn[_v-3289647c]{\n\twidth: 2.06rem;\n\tcolor: #ffa200;\n    display: block;\n    border: 1px solid #ffa200;\n    height: 0.56rem;\n    line-height: 0.56rem;\n    margin: 0.3rem 0.3rem 0 0;\n    border-radius: 5px;\n    -webkit-border-radius: 5px;\n    text-align: center;\n}\n", ""]);

	// exports


/***/ },

/***/ 112:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAB4CAIAAAC8Wg/XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDJCMkE0QjY0ODE2MTFFNjlFQjg5NjQxQjlENTZCNzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDJCMkE0Qjc0ODE2MTFFNjlFQjg5NjQxQjlENTZCNzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMkIyQTRCNDQ4MTYxMUU2OUVCODk2NDFCOUQ1NkI3NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMkIyQTRCNTQ4MTYxMUU2OUVCODk2NDFCOUQ1NkI3NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrjdOs8AAAA2SURBVHjaYnR1dWViYGDAwP///8fLxidGDE1IjBR5QnL41NHCTGr5kRQaiJkZGRmRaRAGCDAAhI3EBCuG4TYAAAAASUVORK5CYII="

/***/ },

/***/ 113:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['url']
	};

/***/ },

/***/ 114:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n \t<div class=\"appdownload-wrapper\" _v-3289647c=\"\">\n\t\t <img class=\"appdownload-logo left\" src=\"" + __webpack_require__(115) + "\" alt=\"\" _v-3289647c=\"\">\n\t\t <div class=\"appdownload-title left\" _v-3289647c=\"\">\n\t\t \t<p class=\"t1 fs32\" _v-3289647c=\"\">好唱</p>\n\t\t \t<p class=\"t2 fs28\" _v-3289647c=\"\">你身边的好声音</p>\n\t\t </div>\n\t\t <a class=\"appdownload-btn right fs28\" href=\"{{url}}\" _v-3289647c=\"\">在好唱中打开</a>\n\t </div>\n";

/***/ },

/***/ 115:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTMyRkM2RkU0ODE2MTFFNkJBMThDQTUxODZBMTMyMzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTMyRkM2RkY0ODE2MTFFNkJBMThDQTUxODZBMTMyMzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMzJGQzZGQzQ4MTYxMUU2QkExOENBNTE4NkExMzIzMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMzJGQzZGRDQ4MTYxMUU2QkExOENBNTE4NkExMzIzMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph5JbakAAAjXSURBVHja7F1rbBRV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"

/***/ }

});