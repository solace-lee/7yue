import {
  HTTP
} from '../util/http.js'
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        // console.log(sCallback)
        sCallback(res)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }

  _getKey(index) {
    return 'classic-' + index
  }

  isfirst(index) {
    return index == 1 ? true : false
  }

  islast(index) {
    let lastIndex = this._getLastIndex()
    return lastIndex == index ? true : false
  }

  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  _setLastIndex(index) {
    wx.setStorageSync('last', index)
  }

  _getLastIndex() {
    let index = wx.getStorageSync('last')
    return index
  }
}

export {
  ClassicModel
}