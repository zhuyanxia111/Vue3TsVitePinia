<template>
  <el-icon @click="changeIcon" class="icons">
    <component :is="status ? 'Fold' : 'Expand'" />
  </el-icon>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSystemStore } from '@/store';
const store = useSystemStore();
const status = computed(() => {
  return store.collapse;
});
const changeIcon = () => {
  store.setCollopse(!status.value);
};
</script>
<style lang="scss" scoped>
.icons {
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #303133;
  cursor: pointer;
  margin-right: 15px;
}
</style>
