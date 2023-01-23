import { AddMenuModel } from "@/api/menu/MenuModel";
import { EditType, Title } from "@/type/BaseEnum";
import { DialogModel } from "@/type/BaseType";
import { nextTick, reactive, ref } from "vue";
import type { FormInstance } from 'element-plus'
import { SelectNode } from "@/api/dept/DeptModel";
import useInstance from "@/hooks/useInstance";
export default function useAddRole(dialog: DialogModel, onClose: Function, onShow: Function, emit: (event: any, ...args: any) => void) {
  const { global } = useInstance()
  const addMenuForm = ref<FormInstance>()
  let addModel = reactive<AddMenuModel>({  //表单绑定的数据
    id: '',
    editType: '',
    type: '',
    parentId: '',
    parentName: '',
    label: '',
    icon: '',
    name: '',
    path: '',
    url: '',
    code: '',
    orderNum: '',
  })
  const rules = reactive({
    type: [
      {
        required: true,
        trigger: "change",
        message: "请选择菜单类型",
      },
    ],
    parentName: [
      {
        required: true,
        trigger: "change",
        message: "请选择上级菜单",
      },
    ],
    label: [
      {
        required: true,
        trigger: "change",
        message: "请填写菜单名称",
      },
    ],
    name: [
      {
        required: true,
        trigger: "change",
        message: "请填写路由名称",
      },
    ],
    path: [
      {
        required: true,
        trigger: "change",
        message: "请填写路由路径",
      },
    ],
    url: [
      {
        required: true,
        trigger: "change",
        message: "请填写组件路径",
      },
    ],
    code: [
      {
        required: true,
        trigger: "change",
        message: "请填写权限字段",
      },
    ]
  })
  //确定
  const confirm = () => {
    addMenuForm.value?.validate(valid => {
      if (valid) {
        emit('save', addModel)
        //关闭
        onClose();
      }
    })
  }
  //显示弹框
  const show = (type: string, row?: AddMenuModel) => {
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT//设置弹框标题
    onShow(); //显示弹框
    global.$resetForm(addMenuForm.value, addModel); //清空数据
    nextTick(() => {
      if (type === EditType.EDIT) {
        global.$objCoppy(row, addModel);//回显编辑的内容
      }
    })
    addModel.type = type;
  }
  //选择上级菜单
  const select = (node: SelectNode) => {
    addModel.parentId = node.id
    addModel.parentName = node.name
  }
  return {
    confirm,
    show,
    addModel,
    rules,
    addMenuForm,
    select
  }
}