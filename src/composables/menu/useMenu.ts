import { EditType } from '@/type/BaseEnum'
import { ref } from 'vue'
import {
  deleteMenApi,
  addMenuApi,
  editMenuApi
} from '@/api/menu/menu'
import { AddMenuModel, } from '@/api/menu/MenuModel'
import useInstance from '@/hooks/useInstance';
import { Result, StatusCode } from '@/utils/request';
export default function useRole(getTableList: Function) {
  const { global } = useInstance();
  const addMenuRef = ref<{ show: (type: string, row?: AddMenuModel) => void }>()// 新增编辑弹框组件ref属性
  const assignMenuRef = ref<{ show: (roleId: string, name: string) => void }>()
  //新增
  const addBtn = () => {
    addMenuRef.value?.show(EditType.ADD)
  }
  //编辑
  const editBtn = (row: AddMenuModel) => {
    addMenuRef.value?.show(EditType.EDIT, row)
  }
  //删除
  const deleteBtn = async (id: string | number) => {
    const confirm = await global.$myconfirm('确定删除该数据吗?')
    if (confirm) {
      const res = await deleteMenApi(id)
      if (res && res.code === StatusCode.Success) {
        global.$message({ message: '删除成功', type: 'success' })
        getTableList()
      }
    }
  }
  //保存
  const save = async (params: AddMenuModel) => {
    let res: Result;
    let msg: string;
    if (params.type === EditType.ADD) {
      res = await addMenuApi(params)
      msg = "新增成功"
    } else {
      res = await editMenuApi(params)
      msg = "编辑成功"
    }
    if (res && res.code === StatusCode.Success) {
      global.$message({ message: msg, type: 'success' })
      getTableList()
    }
  }

  return {
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addMenuRef,
    assignMenuRef
  }
}