const paginationBev = Behavior({
  data: {
    book: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {
    setMoreData(book) {
      const tempArray = this.data.book.concat(book)
      this.setData({
        book: tempArray
      })
    },

    getCurrentStart() {
      return this.data.book.length
    },

    setTotal(total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      } 
    },

    hasMore() {
      if (this.data.book.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    initialize() {
      this.setData({
        book: [],
        total: null,
        noneResult: false,
        loading: false
      })
    },

    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    }
  }
})

export {
  paginationBev
}