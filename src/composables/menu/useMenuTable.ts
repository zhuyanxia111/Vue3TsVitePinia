import { reactive, onMounted } from 'vue'
import { getMenuTableApi } from '@/api/menu/menu'
export default function useRoleTable() {
  const tableData = reactive({
    list: []
  })
  const getTableList = async () => {  //获取表格数据
    let res = await getMenuTableApi()
    if (res && res.code == 200) {
      tableData.list = res.data
    }
  }
  onMounted(() => {
    getTableList()
  })
  return {
    tableData,
    getTableList,
  }
}