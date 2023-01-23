<template>
  <div>
    <Collapse></Collapse>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import Collapse from './Collapse.vue';
import { useSystemStore } from '@/store/index';
const isCollapse = computed(()=>{
  const store = useSystemStore();
  return store.collapse
})
</script>
<style lang="scss" scoped></style>
