import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('show', {
  state: () => {
    return { show: true }
  },
  actions: {
    startLoading () {
      this.show = true
    },
    stopLoading () {
      setTimeout(() => {
        this.show = false
      }, 300)
    }
  }
})
