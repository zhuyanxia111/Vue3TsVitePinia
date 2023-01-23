import { getMenuListApi } from '@/api/menu/menu'
import { defineStore } from 'pinia'
import { Router, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
const modules = import.meta.glob('../../views/**/*.vue')
interface State {
  count: number,
  collapse: boolean,
  menuList: Array<RouteRecordRaw> | any
}
export const useMenuStore = defineStore('menu', {
  state: (): State => {
    return {
      count: 0,
      collapse: false,
      menuList: [
        {
          path: '/dashboard',
          component: "Layout",
          meta: {
            title: "首页",
            icon: "HomeFilled",
            roles: ["sys:manage"]
          },
          children: []
        }
      ]
    }
  },
  getters: {
    getAllMenuList(): Array<RouteRecordRaw> {
      return this.menuList
    }
  },
  actions: {
    setMenuList(routes: Array<RouteRecordRaw>) {
      this.menuList = this.menuList.concat(routes)
    },
    async getMenuList(router: Router) {
      const res = await getMenuListApi()
      let accessedRoutes: Array<RouteRecordRaw> = [];
      if (res.code == 200) {
        accessedRoutes = filterAsyncRoutes(res.data, router)
      }
      this.setMenuList(accessedRoutes)
      return res
    }
  }
})
export function filterAsyncRoutes(routes: Array<RouteRecordRaw>, router: any) {
  const res: Array<RouteRecordRaw> = []
  //循环每一个路由
  routes.forEach((route: any) => {
    const tmp = { ...route }
    const component = tmp.component;
    if (route.component) {
      //给每条数据的component转换为符合route的格式
      if (component == 'Layout') {
        tmp.component = Layout;
      } else {
        tmp.component = modules[`../../views${component}.vue`]
      }
    }
    //判断是否有下级
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, router)
    }
    //添加到路由
    router.addRoute(tmp)
    res.push(tmp)
  })
  return res
}