<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs" >{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router';
//RouteLocationMatched是ts提示的报错
const tabs: Ref<RouteLocationMatched[]> = ref([]);
//面包屑数据
const route = useRoute();
const getBredcurm = () => {
  let mached = route.matched.filter((item) => item.meta && item.meta.title);
  const first = mached[0];
  if (first.path !== '/dashboard') {
    //如果没用首页的面包屑构造一个首页
    mached = [
      {
        path: '/dashboard',
        meta: {
          title: '首页',
        },
      } as any,
    ].concat(mached);
  }
  //设置面包屑数据
  tabs.value = mached;
};
getBredcurm();
watch(
  () => route.path,
  () => getBredcurm()
);
</script>
<style scoped lang="scss"></style>
