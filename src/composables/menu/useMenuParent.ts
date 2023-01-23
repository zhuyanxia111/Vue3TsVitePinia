import { MenuModel } from "@/api/menu/MenuModel";
import { getParentTree } from "@/api/menu/menu"
import { DialogModel } from "@/type/BaseType";
import { reactive, ref } from "vue";
import type { ElTree } from 'element-plus'
import { SelectNode } from "@/api/dept/DeptModel";
export default function useMenuParent(dialog: DialogModel, onClose: Function, onShow: Function, emit: (event: any, ...args: any) => void) {
  const parentTree = ref<InstanceType<typeof ElTree>>();//树的ref属性
  const treeData = reactive({ data: [] })//上级树的数据
  const selectNode = reactive<SelectNode>({ id: '', name: '' }) //选中的数据
  const defaultProps = reactive({ children: 'children', label: 'label', })  //树的属性
  const confirm = () => {
    emit('select', selectNode)
    onClose();
  }
  const getTreeData = async () => {
    let res = await getParentTree();
    if (res && res.code == 200) {
      treeData.data = res.data;
    }
  }
  //显示弹框
  const show = async () => {
    dialog.title = "选择上级菜单"
    dialog.height = 420;
    dialog.width = 300;
    await getTreeData()
    onShow(); //显示弹框
  }
  const openBtn = (data: MenuModel) => {
    data.open = !data.open;
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open;
    }
  }
  const handleNodeClick = (data: MenuModel) => {
    selectNode.id = data.id;
    selectNode.name = data.label
  }
  return {
    confirm,
    show,
    parentTree,
    treeData,
    handleNodeClick,
    defaultProps,
    openBtn
  }
}