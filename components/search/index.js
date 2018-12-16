// components/search/index.js

import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/paginationBev.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      value: false,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(event) {
      if (!this.data.q) {
        return
      }

      if (this.isLocked()) {
        return
      }

      this.locked()
      if (this.hasMore()) {
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
              this.setMoreData(res.books)
              this.unLocked()
            },
            () => {
              this.unLocked()
            })
      }
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this._closeResult()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const word = event.detail.value || event.detail.text
      this.setData({
        q: word
      })
      bookModel.search(0, word).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(word)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        noneResult: false,
        q: ''
      })
    }
  }
})

// scroll-view | page onreachbottom