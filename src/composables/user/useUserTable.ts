import { reactive } from 'vue'
import { UserListParm } from '@/api/user/UserModel'
import { getUserListApi } from '@/api/user/user'
export default function useUserTable() {
  const tableData = reactive({
    list: []
  })
  const listParm = reactive<UserListParm>({
    deptId: '',
    currentPage: 1,
    pageSize: 10,
    loginName: '',
    total: 0
  })
  const getUserList = async () => {  //获取表格数据
    let res = await getUserListApi(listParm)
    if (res && res.code == 200) {
      tableData.list = res.data.records
      listParm.total = res.data.total;
    }
  }
  const sizeChange = (size: number) => {//页容量改变触发
    listParm.pageSize = size;
    getUserList();
  }
  const currentChange = (page: number) => {
    listParm.currentPage = page
    getUserList();
  }
  const treeClick = async (deptId: number) => {  //树点击数据
    //设置点击的部门id
    listParm.deptId = deptId;
    //获取部门列表
    getUserList();
  }
  const resetBtn = () => {
    listParm.loginName = ""
    getUserList()
  }
  return {
    tableData,
    listParm,
    getUserList,
    sizeChange,
    currentChange,
    treeClick,
    resetBtn
  }
}