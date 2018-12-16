// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer: function(newNumber, old, path) {
        let val = newNumber.length == 1 ? "0" + newNumber : newNumber
        this.setData({
          index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: 0,
    month: ''
  },

  attached: function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = this.data.months[date.getMonth()]
    this.setData({
      year: year,
      month: month
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
