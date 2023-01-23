<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParm" label-width="80px" :inline="true">
      <el-form-item>
        <el-input
          placeholder="请输入角色名称"
          v-model="listParm.name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" @click="searchBtn">搜索</el-button>
        <el-button icon="Close" style="color: #ff7670" @click="resetBtn"
          >重置</el-button
        >
        <el-button type="primary" @click="addBtn" icon="Plus">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="tableData.list" border stripe>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="角色备注"></el-table-column>
      <el-table-column label="操作" align="center" width="400">
        <template #default="scope">
          <el-button type="primary" icon="Edit" @click="editBtn(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="primary"
            icon="Setting"
            @click="assignPermission(scope.row.id, scope.row.name)"
            >分配权限</el-button
          >
          <el-button
            type="danger"
            icon="Delete"
            @click="deleteBtn(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="listParm.pageSize"
      :total="listParm.total"
      background
    ></el-pagination>
  </el-main>
  <AddRole ref="addRoleRef" @save="save" />
  <AssignMenu ref="assignMenuRef" />
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue';
import useRoleTable from '@/composables/role/useRoleTable';
import AddRole from './AddRole.vue';
import useRole from '@/composables/role/useRole';
import AssignMenu from './AssignMenu.vue';
const {
  tableData,
  listParm,
  getRoleList,
  sizeChange,
  currentChange,
  resetBtn,
  searchBtn,
} = useRoleTable();
const tableHeight = ref(0);
const {
  addBtn,
  editBtn,
  deleteBtn,
  save,
  assignPermission,
  addRoleRef,
  assignMenuRef,
} = useRole(getRoleList); //操作弹窗按钮
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 290;
  });
});
</script>
<style scoped lang="scss"></style>
