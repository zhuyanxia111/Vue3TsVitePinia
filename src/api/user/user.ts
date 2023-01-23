import http from "@/utils/http"
import { Api } from "../enumApi"
import { LoginParm, LoginResult, UserListParm, AddUserModel } from './UserModel'
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

