import http from "@/utils/http";
import { Api } from "../enumApi";
import { RoleListParm, AddRoleModel, DeleteParm, AssignTreeParm, AssignSaveParm } from "./RoleModel"
export const getRoleListApi = async (params: RoleListParm) => {
  return await http.get(Api.getRoleList, params)
}

export const addRoleApi = async (params: AddRoleModel) => {
  return await http.put(Api.addRole, params)
}
//编辑角色
export const editRoleApi = async (parm: AddRoleModel) => {
  return await http.put(Api.add, parm)
}
//删除角色
export const deleteRoleApi = async (parm: DeleteParm) => {
  return await http.delete(Api.add, parm)
}
//分配权限树的数据
export const assignTreeApi = async (parm: AssignTreeParm) => {
  return await http.get(Api.assignTree, parm)
}
//分配权限保存
export const assignSaveApi = async (parm: AssignSaveParm) => {
  return await http.post(Api.assignSave, parm)
}