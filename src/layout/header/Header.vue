<template>
  <div  style="display: flex; justify-content: space-between;width: 100%;">
    <div style="display: flex; align-items: center">
      <Collapse></Collapse>
      <BredCum></BredCum>
    </div>
    <UserInfo></UserInfo>
  </div>
</template>
<script setup lang="ts">
import Collapse from './Collapse.vue';
import BredCum from './BredCum.vue';
import UserInfo from './UserInfo.vue';
</script>
<style lang="scss" scoped></style>
