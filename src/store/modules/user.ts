import { defineStore } from 'pinia'
import { getInfo, loginApi } from "@/api/user/user";
import { LoginParm, LoginResult } from "@/api/user/UserModel";
import { Result } from "@/utils/request";
import { setToken, setUserId, setExpireTime } from '@/utils/auth';
import { getToken } from '@/utils/auth';
//定义state类型
export type UserState = {
  token: string | null,
  userId: string,
  permissions: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: getToken(),
      userId: "",
      permissions: []
    }
  },
  getters: {
    getToken(): string | null {
      return this.token
    },
    getPermissions(): string[] {
      return this.permissions
    }
  },
  actions: {
    async login(loginParm: LoginParm) {
      const res = await loginApi(loginParm)
      if (res.data.code == 200) {
        this.token = res.data.token
        this.userId = res.data.id
        setToken(res.data.token)
        setUserId(res.data.id)
        setExpireTime(res.data.expireTime)
      }
      return res
    },
    async getInfo() {
      const { data } = await getInfo()
      this.permissions = data.roles
      return data
    }
  }
})