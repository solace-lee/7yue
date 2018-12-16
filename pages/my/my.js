import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({
  data: {
    authorized: false,
    hasUserInfo: true,
    userInfo: null,
    classics: [],
    myBooksCount: 0,
    imgSrc: '/images/my/my.png'
  },

  onLoad(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log('err')
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/page/about/about'
    })
  },

  getMyBookCount(event) {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        myBooksCount: res.count
      })
    })
  },

  getMyFavor() {
    classicModel.getMyFavor(res=>{
      this.setData({
        classics: res
      })
    })
  }
})