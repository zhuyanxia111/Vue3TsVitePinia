import { EditType } from '@/type/BaseEnum'
import { ref } from 'vue'
import {
  deleteRoleApi,
  addRoleApi,
  editRoleApi
} from '@/api/role/role'
import { AddRoleModel, } from '@/api/role/RoleModel'
import useInstance from '@/hooks/useInstance';
import { Result, StatusCode } from '@/utils/request';
export default function useRole(getRoleList: Function) {
  const { global } = useInstance();
  const addRoleRef = ref<{ show: (type: string, row?: AddRoleModel) => void }>()// 新增编辑弹框组件ref属性
  const assignMenuRef = ref<{ show: (roleId: string, name: string) => void }>()
  //新增
  const addBtn = () => {
    addRoleRef.value?.show(EditType.ADD)
  }
  //编辑
  const editBtn = (row: AddRoleModel) => {
    addRoleRef.value?.show(EditType.EDIT, row)

  }
  //删除
  const deleteBtn = async (id: string | number) => {
    const confirm = await global.$myconfirm('确定删除该数据吗?')
    if (confirm) {
      const res = await deleteRoleApi({ id: id })
      if (res && res.code === StatusCode.Success) {
        global.$message({ message: '删除成功', type: 'success' })
        getRoleList()
      }
    }

  }
  //保存
  const save = async (params: AddRoleModel) => {
    let res: Result;
    if (params.type === EditType.ADD) {
      res = await addRoleApi(params)
    } else {
      res = await editRoleApi(params)
    }
    if (res && res.code === StatusCode.Success) {
      global.$message({ message: '新增成功', type: 'success' })
      getRoleList()
    }
  }
  //分配权限
  const assignPermission = (id: string, name: string) => {
    assignMenuRef.value?.show(id, name)
  }
  return {
    addBtn,
    editBtn,
    deleteBtn,
    save,
    assignPermission,
    addRoleRef,
    assignMenuRef
  }
}