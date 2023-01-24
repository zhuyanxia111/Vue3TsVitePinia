<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form
      :model="searchFrom"
      :rules="rules"
      label-width="80px"
      :inline="true"
    >
      <el-form-item>
        <el-input
          v-model="searchFrom.searchName"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" @click="searchBtn()">查询</el-button>
        <el-button
          type="primary"
          @click="addBtn()"
          icon="Plus"
          v-permission="['sys:addDepartment']"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData.list"
      style="width: 100%"
      row-key="id"
      default-expand-all
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :height="tableHeight"
    >
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="deptCode" label="部门编码" />
      <el-table-column prop="deptPhone" label="部门电话" />
      <el-table-column width="200" align="center" label="操作">
        <template #default="scope">
          <el-button
            type="success"
            @click="editBtn(scope.row)"
            icon="Edit"
            v-permission="['sys:editDept']"
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="deleteBtn(scope.row)"
            icon="Close"
            v-permission="['sys:deleteDept']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <AddAndEdit @save="save" ref="addDeptRef" />
  </el-main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useDepartTable from '@/composables/department/useDeptTable';
import useBaseModel from '@/composables/department/useBaseModel';
import AddAndEdit from './AddAndEdit.vue';
import useDept from '@/composables/department/useDept';
const tableHeight = ref(0);
tableHeight.value = window.innerHeight - 250;
const { rules } = useBaseModel();
const { searchFrom, tableData, getDepList } = useDepartTable();
const { searchBtn, addBtn, editBtn, deleteBtn, addDeptRef, save } =
  useDept(getDepList);
</script>
<style scoped lang="scss"></style>
