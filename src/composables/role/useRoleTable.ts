import { reactive, onMounted } from 'vue'
import { getRoleListApi } from '@/api/role/role'
import { RoleListParm } from '@/api/role/RoleModel'
import { getUserId } from '@/utils/auth'
export default function useRoleTable() {
  const tableData = reactive({
    list: []
  })
  const listParm = reactive<RoleListParm>({
    userId: getUserId() || '',
    currentPage: 1,
    pageSize: 10,
    name: '',
    total: 0
  })
  const getRoleList = async () => {  //获取表格数据
    let res = await getRoleListApi(listParm)
    if (res && res.code == 200) {
      tableData.list = res.data.records
      listParm.total = res.data.total;
    }
  }
  const sizeChange = (size: number) => {//页容量改变触发
    listParm.pageSize = size;
    getRoleList();
  }
  const currentChange = (page: number) => {
    listParm.currentPage = page
    getRoleList();
  }
  const resetBtn = () => {
    listParm.name = ""
    getRoleList()
  }
  const searchBtn = () => {
    getRoleList()
  }
  onMounted(() => {
    getRoleList()
  })
  return {
    tableData,
    listParm,
    getRoleList,
    sizeChange,
    currentChange,
    resetBtn,
    searchBtn
  }
}