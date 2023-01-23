import http from "@/utils/http"
import { Api } from "../enumApi"
import { AddMenuModel } from "./MenuModel"
export const getMenuListApi = async () => {
  return await http.get(Api.getMenuList)
}
export const getMenuTableApi = async () => {
  return await http.get(Api.getMenuTable)
}
//新增
export const addMenuApi = async (parm: AddMenuModel) => {
  return await http.post(Api.addMenu, parm)
}
//编辑
export const editMenuApi = async (parm: AddMenuModel) => {
  return await http.put(Api.addMenu, parm)
}
//删除
export const deleteMenApi = async (id: number |
  string) => {
  return await http.delete(Api.addMenu, { id: id })
}
export const getParentTree = async () => {
  return await http.get(Api.getMenuParent)
}