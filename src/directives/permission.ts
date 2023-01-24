import { Directive } from 'vue'
import { useUserStore } from '@/store'
export const permission: Directive = {
  mounted(el, binding) {
    const userStore = useUserStore();
    const { value } = binding
    const permissions = userStore.getPermissions
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = permissions.some((role: any) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'add\',\'edit\']"')
    }
  }
}