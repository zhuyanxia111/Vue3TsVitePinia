import { EditType, Title } from "@/type/BaseEnum"
import { DialogModel } from "@/type/BaseType"
import { AddUserModel } from "@/api/user/UserModel";
import useInstance from '@/hooks/useInstance';
import { ref } from "vue";
import type { FormInstance } from 'element-plus';
import { SelectNode } from '@/api/dept/DeptModel';
export default function useUserAddAndEdit(dialog: DialogModel, onShow: Function, onClose: Function, emit: (event: any, ...args: any) => void, addModel: AddUserModel) {
  const { global } = useInstance();
  const addUserForm = ref<FormInstance>();
  const show = (type: string, row?: AddUserModel) => {
    onShow()
    global.$resetForm(addUserForm.value, addModel); //清空数据
    type === EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    if (type === EditType.EDIT) {
      global.$objCoppy(row, addModel);
    }
    addModel.type = type;
  }
  const confirm = () => {
    addUserForm.value?.validate((valid) => {
      if (valid) {
        emit('save', addModel);
        onClose();
      }
    });
    onShow()
  }
  //选择的所属部门
  const select = (node: SelectNode) => {
    addModel.deptId = node.id;
    addModel.deptName = node.name;
  };
  return {
    show,
    confirm,
    addUserForm,
    select
  }
}