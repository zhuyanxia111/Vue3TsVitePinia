import { nextTick, onMounted, reactive, ref } from 'vue'
import { getRoleIdApi, getRoleListApi, assingRoleSaveApi } from '@/api/user/user'
import { AssignRoleListParm } from '@/api/user/UserModel'
import { getUserId } from '@/utils/auth'
import useInstance from '@/hooks/useInstance'
import { DialogModel } from '@/type/BaseType'
export default function useAssignRole(dialog: DialogModel, onShow: Function, onClose: Function) {
  const tableHeight = ref(0);
  const { global } = useInstance()
  //选中用户的id
  const selectUserId = ref<string | number>('')
  //选中的角色id
  const selectRoleId = ref<string | number>('');
  //表格数据
  const tableData = reactive({
    list: []
  })
  const parms = reactive<AssignRoleListParm>({
    userId: getUserId() || '',
    currentPage: 1,
    pageSize: 4,
    total: 0
  })
  const getTableList = async () => {  //获取表格数据
    const res = await getRoleListApi(parms)
    if (res && res.code == 200) {
      tableData.list = res.data.records;
      parms.total = res.data.total;
    }
  }
  const sizeChange = (size: number) => {//页容量改变触发
    parms.pageSize = size
    getTableList();
  }
  const currentChange = (page: number) => {
    parms.currentPage = page
    getTableList();
  }
  const tableSelect = async (id: number | string) => {//树点击数据
    //设置点击的部门id
    selectRoleId.value = id
  }
  const confirm = async () => {
    if (!selectRoleId.value) {
      global.$message({ message: '请选择角色', type: 'warning' })
      return;
    }
    let parm = {
      roleId: selectRoleId.value,
      userId: selectUserId.value
    }
    const res = await assingRoleSaveApi(parm)
    if (res && res.code == 200) {
      global.$message({ message: '分配成功', type: 'success' })
      //关闭弹框
      onClose();
    }
  }
  const show = async (name: string, userId: number | string) => {
    selectRoleId.value = ''
    selectUserId.value = userId
    //获取用户所属权限
    const res = await getRoleIdApi(userId)
    if (res.data) {
      selectRoleId.value = res.data.roleId
    }
    dialog.height = 400
    dialog.title = '为【' + name + '】分配角色';
    onShow();
  }
  onMounted(() => {
    nextTick(() => {
    });
    tableHeight.value = dialog.height
    getTableList()
  })
  return {
    tableData,
    getTableList,
    sizeChange,
    currentChange,
    tableSelect,
    confirm,
    show,
    selectRoleId,
    parms,
    tableHeight
  }
}