import { AddRoleModel } from "@/api/role/RoleModel";
import { EditType, Title } from "@/type/BaseEnum";
import { DialogModel } from "@/type/BaseType";
import { nextTick, reactive, ref } from "vue";
import type { FormInstance } from 'element-plus'
import useInstance from "@/hooks/useInstance";
import { getUserId } from "@/utils/auth";
export default function useAddRole(dialog: DialogModel, onClose: Function, onShow: Function, emit: (event: any, ...args: any) => void) {
  const { global } = useInstance()
  const addRoleForm = ref<FormInstance>()
  let addModel = reactive<AddRoleModel>({  //表单绑定的数据
    id: '',
    name: '',
    createUser: getUserId(),
    type: '',
    remark: ''
  })
  const rules = reactive({   //表单验证规则
    name: [{
      trigger: 'change',
      required: true,
      message: '请填写角色名称'
    }]
  })
  //确定
  const confirm = () => {
    addRoleForm.value?.validate(valid => {
      if (valid) {
        emit('save', addModel)
        //关闭
        onClose();
      }
    })
  }
  //显示弹框
  const show = (type: string, row?: AddRoleModel) => {
    type == EditType.ADD ? dialog.title = Title.ADD : Title.EDIT//设置弹框标题
    onShow(); //显示弹框
    global.$resetForm(addRoleForm.value, addModel); //清空数据
    nextTick(() => {
      if (type === EditType.EDIT) {
        global.$objCoppy(row, addModel);//回显编辑的内容
      }
    })
    addModel.type = type;
  }
  return {
    confirm,
    show,
    addModel,
    rules,
    addRoleForm
  }
}