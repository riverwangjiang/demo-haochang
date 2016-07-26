import Vue from 'vue'
import $ from 'jquery'

Vue.filter('dateFormat', function (value) {
  var d = new Date(value);
  return d.getFullYear() + '.' +  (d.getMonth() + 1 ) + '.' + d.getDate();
})
Vue.filter('isArray', function (value) {
  return $.isArray(value);
})