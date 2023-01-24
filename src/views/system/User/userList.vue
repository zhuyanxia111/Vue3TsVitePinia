<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <el-aside width="200px" style="border-right: 1px solid #dfe6ec">
      <LeftTree @treeClick="treeClick"></LeftTree>
    </el-aside>
    <el-main height>
      <el-form :model="listParm" label-width="80px" :inline="true">
        <el-form-item label>
          <el-input v-model="listParm.loginName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="Search" @click="searchBtn">搜索</el-button>
          <el-button icon="Close" @click="resetBtn">重置</el-button>
          <el-button type="primary" icon="Plus" @click="addBtn">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 用户表格 -->
      <el-table :height="tableHeight" :data="tableData.list" border stripe>
        <el-table-column prop="loginName" label="用户名"></el-table-column>
        <el-table-column prop="deptName" label="所属部门"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" width="320" label="操作">
          <template #default="scope">
            <el-button type="primary" icon="Edit" @click="editBtn(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              icon="Setting"
              @click="assignBtn(scope.row)"
              >分配角色</el-button
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
      <AddAndEdit ref="userAddRef" @save="save" />
      <AssignRole ref="assignRoleRef" />
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import LeftTree from './LeftTree.vue';
import { ref, onMounted } from 'vue';
import useUserTable from '@/composables/user/useUserTable';
import AddAndEdit from './AddAndEdit.vue';
import useUser from '@/composables/user/useUser';
import AssignRole from './AssignRole.vue';
const containerHeight = ref(0);
const tableHeight = ref(0);
onMounted(() => {
  containerHeight.value = window.innerHeight - 150;
  tableHeight.value = window.innerHeight - 290;
});
const {
  tableData,
  listParm,
  getUserList,
  sizeChange,
  currentChange,
  treeClick,
  resetBtn,
} = useUserTable();
const {
  searchBtn,
  addBtn,
  editBtn,
  deleteBtn,
  userAddRef,
  save,
  assignBtn,
  assignRoleRef,
} = useUser(getUserList);
</script>
