<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-table :height="tableHeight" :data="tableData.list" border stripe>
        <el-table-column width="50" align="center" label="选中">
          <template #default="scope">
            <el-radio
              v-model="selectRoleId"
              :label="scope.row.id"
              @change="tableSelect(scope.row.id)"
              >{{ '' }}</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="parms.currentPage"
        :page-sizes="[10, 20, 40, 80, 100]"
        :page-size="parms.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parms.total"
        background
      ></el-pagination>
    </template>
  </SysDialog>
</template>
<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useAssignRole from '@/composables/user/useAssignRole';
import useDialog from '@/hooks/useDialog';
const { dialog, onShow, onClose } = useDialog(); //操作弹框
const {
  tableData,
  getTableList,
  sizeChange,
  currentChange,
  tableSelect,
  confirm,
  show,
  parms,
  selectRoleId,
  tableHeight,
} = useAssignRole(dialog, onShow, onClose);
defineExpose({ show });
</script>
