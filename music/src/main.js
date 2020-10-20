// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick';
import './common/css/prevent.css'
import './common/fonts/demo.css'
import './common/fonts/iconfont.css'
import './common/css/font.css'
import './common/css/font-song.css'
import  Vuex from 'vuex'

Vue.use(Vuex)
import store from './store/index'
FastClick.attach(document.body);

//移动端点击 300ms延迟问题  解决fastclick Ios输入框拉取缓慢问题
var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

FastClick.prototype.focus = function (targetElement) {
  var length;
  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
    length = targetElement.value.length;
    targetElement.focus(); // 加入这一句话
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>'
})
