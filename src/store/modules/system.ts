import { ITab } from '../type/index';
import { defineStore } from 'pinia'
import { getTabs, setTabs } from '@/utils/index';

const storageTabsList: ITab[] = getTabs()
interface State {
  collapse: boolean,
  tabsList: ITab[]
}
export const useSystemStore = defineStore('system', {
  state: (): State => {
    return {
      collapse: false,
      tabsList: storageTabsList
    }
  },
  getters: {
    getCollapse(): boolean {
      return this.collapse
    },
    getTabList(): ITab[] {
      return this.tabsList
    }
  },
  actions: {
    setCollopse(value: boolean) {
      this.collapse = value
    },
    addTabs(tab: ITab) {
      if (this.tabsList.some((item: ITab) => item.path === tab.path)) return
      this.tabsList.push(tab)
      setTabs(this.tabsList)
    },
    changeTab(tabs: ITab[]) {
      this.tabsList = tabs
      setTabs(tabs)
    }
  }
})