import { DeptModel, SelectNode } from './../../api/dept/DeptModel';
import { ref, reactive, onMounted, nextTick } from "vue";
import { getLeftTree } from '@/api/user/user'
import { ElTree } from 'element-plus';
export default function useLeftTree(emit: (event: 'treeClick', ...args: any[]) => void) {
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
    emit('treeClick', data.id)
  }
  const getTreeData = async () => {
    const res = await getLeftTree()
    if (res && res.code === 200) {
      treeData.data = res.data
      nextTick(() => {
        const firstNode = document.querySelector(".el-tree-node") as any;
        if (firstNode) {
          firstNode.click();
        }
      })
    }
  }
  const openBtn = (data: DeptModel) => {
    data.open = !data.open;
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open;
    }
  };
  onMounted(() => {
    getTreeData()
  })
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