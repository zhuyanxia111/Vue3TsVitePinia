import { AddRoleModel, AssignSaveParm, AssignTreeParm } from "@/api/role/RoleModel";
import { EditType, Title } from "@/type/BaseEnum";
import { DialogModel, StrNum, TreeArr } from "@/type/BaseType";
import { ElTree } from "element-plus";
import { reactive, ref } from "vue";
import { assignTreeApi, assignSaveApi } from "@/api/role/role";
import { getUserId } from "@/utils/auth";
import { Obj } from "@/utils/objCoppy";
import useInstance from "@/hooks/useInstance";
export default function useAssignMenu(dialog: DialogModel, onShow: Function, onClose: Function,) {
  const { global } = useInstance()
  const assignTree = ref<InstanceType<typeof ElTree>>()//权限树的ref属性
  //树的属性配置
  const defaultProps = reactive({
    children: 'children',
    label: 'label',
  })
  //权限树数据
  const assignTreeData: {
    list: Obj[];
    assignTreeChecked: TreeArr;
  } = reactive({
    list: [],
    assignTreeChecked: [] //原来分配的权限id的集合
  })
  //定义分配权限保存的参数
  const saveParm = reactive<AssignSaveParm>({
    roleId: '',
    list: []
  })
  const getAssignTree = async (params: AssignTreeParm) => {
    const res = await assignTreeApi(params)
    if (res && res.code == 200) {
      //设置权限树数据
      assignTreeData.list = res.data.listmenu
      //设置角色原来的权限Id
      assignTreeData.assignTreeChecked = res.data.checkList
      //数据回显，判断角色原来是否已经分配过权限，如果有，回显
      if (assignTreeData.assignTreeChecked.length > 0) {
        let newArr: TreeArr = [];
        assignTreeData.assignTreeChecked.forEach((item => {
          checked(item, assignTreeData.list, newArr)
        }))
        assignTreeData.assignTreeChecked = newArr;
      }
    }
  }
  const checked = (id: StrNum, data: Obj[], newArr: TreeArr) => {
    data.forEach((item: Obj) => {
      if (item.id == id) {
        if (item.children && item.children.length == 0) {
          newArr.push(item.id)
        }
      } else {
        if (item.children && item.children.length != 0) {
          //递归调用
          checked(id, item.children, newArr)
        }
      }
    })
  }
  //确定
  const confirm = async () => {
    //获取选中的数据
    let checkedIds = assignTree.value?.getCheckedKeys(false) || []
    //获取半节点ids
    let hlfIds = assignTree.value?.getHalfCheckedKeys() || []
    saveParm.list = checkedIds?.concat(hlfIds)
    //提交保存
    let res = await assignSaveApi(saveParm)
    if (res && res.code == 200) {
      //信息提示
      global.$message({ message: res.msg, type: 'success' })
      //关闭弹框
      onClose()
    }
  }
  //显示弹框
  const show = (roleId: string, name: string) => {
    assignTreeData.list = []
    assignTreeData.assignTreeChecked = []
    //设置角色id
    saveParm.roleId = roleId;
    saveParm.roleId = roleId;
    const parm = {
      roleId: roleId,
      userId: getUserId() || ''
    }
    getAssignTree(parm)
    //显示弹框
    dialog.height = 420
    dialog.width = 300
    dialog.title = '为【' + name + '】分配权限';
    onShow();
  }
  return {
    confirm,
    show,
    defaultProps,
    assignTreeData
  }
}