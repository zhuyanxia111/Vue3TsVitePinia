import http from "@/utils/http"
import { Api } from "../enumApi"
import { LoginParm, LoginResult, UserListParm, AddUserModel, AssignRoleListParm, SelectRoleParm } from './UserModel'
export async function getImagApi(): Promise<any> {
  return await http.getImage(Api.getImg)
}
export async function loginApi(params: LoginParm): Promise<any> {
  return await http.login<LoginResult>(Api.login, params)
}
export const getInfo = async () => {
  return await http.get(Api.getInfo)
}
export const getLeftTree = async () => {
  return await http.get(Api.getDeptList)
}
export const getUserListApi = async (params: UserListParm) => {
  return await http.get(Api.getUserList, params)
}
export const addUser = async (params: AddUserModel) => {
  return await http.post(Api.addEditUser, params)
}
export const editUser = async (params: AddUserModel) => {
  return await http.put(Api.addEditUser, params)
}
export const deletetUser = async (params: { [key: string]: any }) => {
  return await http.delete(Api.addEditUser, params)
}
//查询用户原来用有的角色id
export const getRoleIdApi = async (userId: number | string) => {
  return await http.getRestApi(Api.getRoleId, { userId: userId })
}
//获取分配角色弹框列表
export const getRoleListApi = async (parm: AssignRoleListParm) => {
  return await http.get(Api.getRoleList, parm)
}
//分配角色保存
export const assingRoleSaveApi = async (parm: SelectRoleParm) => {
  return await http.post(Api.assingRole, parm)
}
//退出登录
export async function loginOutApi(parm: object) {
  return await http.post(Api.loginOut, parm)
}
//数据库还原
export async function restoreApi() {
  return await http.post(Api.restore, null)
}