<template>
  <el-container class="layout">
    <el-aside class="asside" width="auto">
      <MenuBarVue></MenuBarVue>
    </el-aside>
    <el-container class="layout">
      <el-header class="header">
        <HeaderVue></HeaderVue>
      </el-header>
      <el-main class="main">
        <Tabs />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import MenuBarVue from './menu/MenuBar.vue';
import HeaderVue from './header/Header.vue';
import Tabs from './tabs/Tabs.vue';
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  .asside {
    background-color: #304156;
  }
  .header {
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
  }
  .main {
    // background-color: darkcyan;
  }
}
</style>
