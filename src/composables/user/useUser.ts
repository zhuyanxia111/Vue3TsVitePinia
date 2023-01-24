import { Result, StatusCode } from './../../utils/request';
import { AddUserModel } from "@/api/user/UserModel";
import { EditType } from "@/type/BaseEnum";
import { ref } from "vue";
import useInstance from '@/hooks/useInstance';
import { addUser, editUser, deletetUser } from '@/api/user/user'

export default function useUser(getUserList: Function) {
  const { global } = useInstance(); //可获取到全局挂载对象
  const userAddRef = ref<{ show: (type: string, row?: AddUserModel) => void, onClose: () => void }>();
  const assignRoleRef = ref<{ show: (name: string | undefined, userId: number | string | undefined) => void }>();
  //搜索
  const searchBtn = () => {
    getUserList()
  }
  //新增
  const addBtn = () => {
    userAddRef.value?.show(EditType.ADD);//调用编辑弹窗的方法
  }
  //编辑
  const editBtn = (row?: AddUserModel) => {
    userAddRef.value?.show(EditType.EDIT, row)//调用编辑弹窗的方法
  }
  //删除
  const deleteBtn = async (id: string | number) => {
    const confirm = await global.$myconfirm('确定删除该数据吗?')
    if (confirm) {
      const res = await deletetUser({ id: id })
      if (res && res.code === StatusCode.Success) {
        global.$message({ message: '删除成功', type: 'success' })
        getUserList()
      }
    }
  }
  //保存
  const save = async (params: AddUserModel) => {
    let res: Result;
    let msg: string;
    if (params.type === EditType.ADD) {
      res = await addUser(params)
      msg = "新增成功"
    } else {
      res = await editUser(params)
      msg = "编辑成功"
    }
    if (res && res.code === StatusCode.Success) {
      global.$message({ message: msg, type: 'success' })
      userAddRef.value?.onClose()
      getUserList()
    }
  }
  //分配角色
  const assignBtn = (row?: AddUserModel) => {
    assignRoleRef.value?.show(row?.username, row?.id)
  }
  return {
    searchBtn,
    addBtn,
    editBtn,
    deleteBtn,
    userAddRef,
    save,
    assignBtn,
    assignRoleRef
  }
}