<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    @tab-click="tabClick"
    @tab-remove="removeTab"
    closable
  >
    <el-tab-pane
      v-for="item in tabsList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    ></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef, watch } from 'vue';
import { useSystemStore } from '@/store';
import { ITab } from '@/store/type';
import { useRoute, useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
const store = useSystemStore();
const route = useRoute();
const router = useRouter();
const activeTab = ref(route.path);
const tabsList: ComputedRef<ITab[]> = computed((): ITab[] => {
  return store.tabsList;
});
//监听路由修改选中的tab，并添加到tabList
watch(
  () => route.path,
  () => {
    setActiveTab();
    addTab();
  }
);
onMounted(() => {
  setActiveTab();
  addTab();
});
const setActiveTab = () => {
  activeTab.value = route.path;
};
const tabClick = (tab: TabsPaneContext, event: Event) => {
  const { props } = tab;
  router.push({ path: props.name as string });
};
const removeTab = (targetName: string) => {
  if (targetName === '/dashboard') return; //不能删除首页
  const tabs = tabsList.value;
  let activeName = activeTab.value;
  if (activeName === targetName) {
    tabs.forEach((tab: ITab, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.path;
        }
      }
    });
  }
  activeTab.value = activeName;
  const editableTabs: ITab[] = tabs.filter(
    (tab: ITab) => tab.path !== targetName
  );
  //替换store里面的tablist为删除后的tablist
  store.changeTab(editableTabs);
  router.push({ path: activeName });
};
const addTab = () => {
  //获取当前的路由信息
  const { path, meta } = route;
  const tab: ITab = {
    path: path,
    title: meta.title as string,
  };
  //修改store里面的tablist
  store.addTabs(tab);
};
</script>
<style scoped lang="scss">
:deep(.el-tabs__header) {
  margin: 0px;
}
:deep(.el-tabs__item) {
  height: 26px !important;
  line-height: 26px !important;
  text-align: center !important;
  border: 1px solid #d8dce5 !important;
  margin: 0px 3px !important;
  color: #495060;
  font-size: 12px !important;
  padding: 0xp 10px !important;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.is-active) {
  border-bottom: 1px solid transparent !important;
  border: 1px solid #42b983 !important;
  background-color: #42b983 !important;
  color: #fff !important;
}
:deep(.el-tabs__item:hover) {
  color: #495060 !important;
}
:deep(.is-active:hover) {
  color: #fff !important;
}
</style>
