<template>
  <MenuLogo v-if="!isCollapse" />
  <el-menu
    :default-active="activeIndex"
    router
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    background-color="#304156"
  >
    <MenuItem :menuList="menuList" />
  </el-menu>
</template>

<script setup lang="ts">
import { ref, reactive, computed, ComputedRef } from 'vue';
import MenuItem from './MenuItem.vue';
import MenuLogo from './MenuLogo.vue';
import { useRoute } from 'vue-router';
import { useSystemStore, useMenuStore } from '@/store';
const store = useSystemStore();
const menuStore = useMenuStore();
const isCollapse: ComputedRef<boolean> = computed((): boolean => {
  return store.collapse;
});
const route = useRoute();
const activeIndex: ComputedRef<string> = computed((): string => {
  const { path } = route;
  return path;
});
const menuList = computed(() => {
  return menuStore.getAllMenuList;
});
const handleOpen: Function = (key: string, keyPath: string[]): void => {
};
const handleClose: Function = (key: string, keyPath: string[]): void => {
};
</script>
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
}
:deep(.el-menu .el-menu-item) {
  color: #bfcbd9;
}
:deep(.el-menu-item.is-active) {
  color: #409eff !important;
}
:deep(.is-opened .el-menu-item) {
  background-color: #1f2d3d !important;
}
:deep(.el-menu-item:hover) {
  background-color: #001528 !important;
}
</style>
