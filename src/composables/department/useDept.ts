import { Result, StatusCode } from './../../utils/request';
import { AddDeptModel, DeptModel } from "@/api/dept/DeptModel";
import { EditType } from "@/type/BaseEnum";
import { ref } from "vue";
import useInstance from '@/hooks/useInstance';
import { addDeptParentApi, editDeptParentApi, deleteDeptParentApi } from '@/api/dept/dept';

export default function useDept(getDepList: Function) {
  const { global } = useInstance(); //可获取到全局挂载对象
  const addDeptRef = ref<{ show: (type: string, row?: DeptModel) => void }>();
  //搜索
  const searchBtn = () => {
    getDepList()
  }
  //新增
  const addBtn = () => {
    addDeptRef.value?.show(EditType.ADD);
  }
  //编辑
  const editBtn = (row: DeptModel) => {
    addDeptRef.value?.show(EditType.EDIT, row)
  }
  //删除
  const deleteBtn = async (row: DeptModel) => {
    const confirm = await global.$myconfirm('确定删除该数据吗?')
    if (confirm) {
      const res = await deleteDeptParentApi({ id: row.id })
      if (res && res.code === StatusCode.Success) {
        global.$message({ message: '删除成功', type: 'success' })
        getDepList()
      }
    }
  }
  //保存
  const save = async (params: AddDeptModel) => {
    let res: Result;
    if (params.type === EditType.ADD) {
      res = await addDeptParentApi(params)
    } else {
      res = await editDeptParentApi(params)
    }
    if (res && res.code === StatusCode.Success) {
      global.$message({ message: '新增成功', type: 'success' })
      getDepList()
    }
  }
  return {
    searchBtn,
    addBtn,
    editBtn,
    deleteBtn,
    addDeptRef,
    save
  }
}