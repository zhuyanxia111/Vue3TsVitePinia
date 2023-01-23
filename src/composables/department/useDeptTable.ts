import { getDeptListApi } from "@/api/dept/dept"
import { ListParm } from "@/api/dept/DeptModel"
import { reactive, onMounted } from 'vue'
export default function useDepartTable() {
  const searchFrom = reactive<ListParm>({
    searchName: ''
  })
  const tableData = reactive({
    list: []
  })
  const getDepList = async () => {
    const res = await getDeptListApi(searchFrom)
    if (res && res.code === 200) {
      tableData.list = res.data
    }
  }
  onMounted(() => {
    getDepList()
  })
  return {
    searchFrom,
    tableData,
    getDepList
  }
}