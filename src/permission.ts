import router from './router'
import { useUserStore, useMenuStore } from '@/store'
import { getToken, removeToken } from './utils/auth';
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  let token = getToken();
  if (token) { //token存在
    if (to.path === "/login" || to.path === "/") {
      next()
    } else {
      const userStore = useUserStore()
      const menuStore = useMenuStore()
      let hasRoles = userStore.permissions && userStore.permissions.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          await userStore.getInfo()
          await menuStore.getMenuList(router)
          //确保动态添加的路由已经被完全加载上去
          next({ ...to, replace: true })
        } catch (error) {
          //重置token
          removeToken();
          //跳到登录
          next({ path: '/login' })
        }
      }
    }
  } else { //token不存在 , 跳转的时候，需要注意 BredCum.vue里面判断first
    //判断是否存在白名单中
    if (whiteList.indexOf(to.path) !== -1) { //存在白名单中
      next();
    } else { //不存在白名单中,去登录
      next({ path: '/login' })
    }
  }
})