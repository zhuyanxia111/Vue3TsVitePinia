import { AddDeptModel, DeptModel } from './DeptModel';
import http from "@/utils/http"
import { ListParm } from '@/api/dept/DeptModel'
import { Api } from "../enumApi"
//部门列表
export const getDeptListApi = async (parms: ListParm) => {
  return await http.get(Api.getDeptList, parms)
}
export const getDeptParentApi = async () => {
  return await http.get(Api.getParent)
}
//新增
export const addDeptParentApi = async (params: AddDeptModel) => {
  return await http.post(Api.add, params)
}
//编辑
export const editDeptParentApi = async (params: AddDeptModel) => {
  return await http.put(Api.add, params)
}
//删除
export const deleteDeptParentApi = async (params: { [key: string]: any }) => {
  return await http.delete(Api.delete, params)
}