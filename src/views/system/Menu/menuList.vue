<template style="padding: 0px 20px">
  <el-main>
    <!-- 新增按钮 -->
    <el-form :inline="true">
      <el-form-item>
        <el-button
          type="primary"
          @click="addBtn"
          icon="Plus"
          v-permission="['sys:menu:add']"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :height="tableHeight"
      :data="tableData.list"
      style="width: 100%"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="label" label="菜单名称" />
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <el-tag v-if="scope.row.type == '0'">目录</el-tag>
          <el-tag v-if="scope.row.type == '1'" type="success">菜单</el-tag>
          <el-tag v-if="scope.row.type == '2'" type="danger">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="图标">
        <template #default="scope">
          <el-icon class="icons" v-if="scope.row.icon">
            <component :is="scope.row.icon" />
          </el-icon>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="路由名称" />
      <el-table-column prop="path" label="路由地址" />
      <el-table-column prop="url" label="组件路径" />
      <el-table-column label="操作" width="210" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            @click="editBtn(scope.row)"
            icon="Edit"
            v-permission="['sys:menu:edit']"
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="deleteBtn(scope.row.id)"
            icon="Close"
            v-permission="['sys:menu:delete']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <AddMenu ref="addMenuRef" @save="save" />
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import useMenuTable from '@/composables/menu/useMenuTable';
import useMenu from '@/composables/menu/useMenu';
import AddMenu from './AddMenu.vue';
//表格的高度
const tableHeight = ref(0);
//表格数据获取
const { tableData, getTableList } = useMenuTable();

//表格的操作
const { addBtn, editBtn, deleteBtn, save, addMenuRef } = useMenu(getTableList);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 200;
  });
});
</script>
<style scoped lang="scss">
.icons {
  width: 24px;
  height: 18px;
  margin-right: 5px;
}
</style>
