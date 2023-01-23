import { Result, StatusCode } from './../../utils/request';
import { AddUserModel } from "@/api/user/UserModel";
import { EditType } from "@/type/BaseEnum";
import { ref } from "vue";
import useInstance from '@/hooks/useInstance';
import { addUser, editUser, deletetUser } from '@/api/user/user'

export default function useUser(getUserList: Function) {
  const { global } = useInstance(); //可获取到全局挂载对象
  const userAddRef = ref<{ show: (type: string, row?: AddUserModel) => void }>();
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
    if (params.type === EditType.ADD) {
      res = await addUser(params)
    } else {
      res = await editUser(params)
    }
    if (res && res.code === StatusCode.Success) {
      global.$message({ message: '新增成功', type: 'success' })
      getUserList()
    }
  }
  return {
    searchBtn,
    addBtn,
    editBtn,
    deleteBtn,
    userAddRef,
    save
  }
}