###### `1、fastclick移动端300ms ios端input下拉框响应缓慢的解决：`

```js
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
```

###### `2、解决编程式路由重复点击报错问题：`

###### `push 版本`

```
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

```

`3、better-scroll`

###### `轮播图无缝轮播`

```js
export default {
  props: {
    //循环轮播
    loop: {
      //默认不循环
      type: Boolean,
      default: true,
    },
    //自动轮播
    autoPlay: {
      type: Boolean,
      default: true,
    },
    //自动轮播的时间参数
    interval: {
      type: Number,
      default: 4000,
      timer:null
    },
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
    }, 100);
    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  destroyed() {
      //有助于释放内存
    clearTimeout(this.timer);
  },
  methods: {
    //设置slider的宽度
    _setSliderWidth(isResize) {
      //获取子元素的个数，根据图片的个数渲染出对应的dot的个数
      this.children = this.$refs.sliderGroup.children;
      //设置初始宽度为0
      let width = 0;
      //   console.log(this.$refs.slider);
      let sliderWidth = this.$refs.slider.clientWidth; //获取整个的slider的宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item"); //设置对应好的样式名称,方便样式的装饰灯\等
        child.style.width = sliderWidth + "px"; //设置每张图片的宽度
        width += sliderWidth; //总宽度等于单个图片的宽度*个数
      }
        
        //如果是无缝轮播的话，子元素长度会增加2
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px"; // 设置整个滑动组件的总宽度
    },
    _initSlider() {
      //初始化一个silder组件
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snap: {
          loop: this.loop, // 循环
          threshold: 0.3,
          speed: 400, // 轮播间隔
        },
        click:true
      });
      //监听滚动事件 当翻到下一页结束后,改变索引, 得到小圆点的变化效果
      this.slider.on("scrollEnd", () => {
        //获取当前的第几个子元素
        let pageIndex = this.slider.getCurrentPage().pageX;
        // eslint-disable-next-line no-console
        // console.log(pageIndex);
        this.currentPageIndex = pageIndex; //存储一下当前的页面索引值
        if (this.autoPlay) {
          // 如果开启了自动播放, 那么就清楚定时器并手动再启动一次;
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      this.timer = setTimeout(() => {
        //注意，该语句可以实现无缝轮播
        this.slider.next()
      }, this.interval);
    },
  },}
```

###### `重点：this.slider.next()`

###### `4、阻止路由来回切换导致不停地发送axios请求`

`在app.vue文件中，将router-view使用keep-alive进行包裹，保证路由是出于持久存在状态`

###### `5、better-scroll的DOM结构`

`最外层(必须)>外层>内层`