import { defineStore } from 'pinia'
interface State {
  collapse: boolean
}
export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      collapse: true
    }
  },
  getters: {
    getCollapse: (state: State) => {
      return state.collapse
    }
  },
  actions: {
    setCollopse(value: boolean) {
      this.collapse = value
    }
  }
})