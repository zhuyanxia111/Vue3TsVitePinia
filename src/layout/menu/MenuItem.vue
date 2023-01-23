<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0"
      :index="menu.path"
      :key="menu.path"
    >
      <template #title>
        <!-- <Icon class="icons" :icon="menu.meta.icon"></Icon> -->
        <el-icon class="icons">
          <component :is="menu.meta.icon" />
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" style="color: #f4f4f5">
      <!-- <Icon class="icons" :icon="menu.meta.icon"></Icon> -->
      <el-icon class="icons">
        <component :is="menu.meta.icon" />
      </el-icon>
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps(['menuList']);
</script>
<style scoped lang="scss">
.icons {
  /* width: 24px;
  height: 18px;
  margin-right: 5px; */
  margin-right: 5px;
  font-size: 22px;
}
</style>
