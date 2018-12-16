// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    laste: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    leftSrc: 'images/triangle@left.png',
    rightSrc: 'images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function (event) {
      if (!this.properties.laste) {
        this.triggerEvent('onLeft', {}, {})
      }
    },

    onRight: function (event) {
      if (!this.properties.first) {
        this.triggerEvent('onRight', {}, {})
      }
    }
  }
})
