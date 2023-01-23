import { defineStore } from 'pinia'
export const useStore = defineStore('user', {
  state: () => {
    return {
      user: '用户'
    }
  },
  getters: {
    // doubleCount: (state) => state.counter * 2,
  }
})