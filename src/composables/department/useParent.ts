import { DeptModel, SelectNode } from './../../api/dept/DeptModel';
import { ref, reactive } from "vue";
import { getDeptParentApi } from '@/api/dept/dept'
import { ElTree } from 'element-plus';
export default function useParent() {
  const parentTree = ref<InstanceType<typeof ElTree>>()
  const selectNode = reactive<SelectNode>({
    id: '',
    name: ''
  })
  const treeData = reactive({
    data: []
  })
  const defaultProps = reactive({
    children: "children",
    label: "name",
    disabled: 'false'
  })
  const handleNodeClick = (data: DeptModel) => {
    selectNode.id = data.id
    selectNode.name = data.name
  }
  const getTreeData = async () => {
    const res = await getDeptParentApi()
    if (res && res.code === 200) {
      treeData.data = res.data
    }
  }
  const openBtn = (data: DeptModel) => {
    data.open = !data.open;
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open;
    }
  };
  return {
    treeData,
    defaultProps,
    handleNodeClick,
    getTreeData,
    parentTree,
    openBtn,
    selectNode
  }
}