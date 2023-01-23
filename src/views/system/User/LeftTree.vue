<template>
  <el-tree
    ref="parentTree"
    :data="treeData.data"
    node-key="id"
    :props="defaultProps"
    default-expand-all
    :highlight-current="true"
    :expand-on-click-node="false"
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <div class="custom-tree-container">
        <!-- 长度为0说明没有下级 -->
        <span v-if="data.children.length == 0">
          <DocumentRemove
            style="
              width: 1.3em;
              height: 1.3em;
              margin-right: 5px;
              color: #8c8c8c;
            "
          />
        </span>
        <!-- 点击展开和关闭 -->
        <span v-else @click.stop="openBtn(data)">
          <component
            style="
              width: 1.1em;
              height: 1.1em;
              margin-right: 5px;
              color: #8c8c8c;
            "
            :is="data.open ? Plus : Minus"
          />
        </span>
        <span>{{ node.label }}</span>
      </div>
    </template>
  </el-tree>
</template>
<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons';
import {} from 'vue';
import useLeftTree from '@/composables/user/useLeftTree';
//树相关数据
const emit: (event: 'treeClick', ...args: any[]) => void = defineEmits();
const {
  treeData,
  defaultProps,
  handleNodeClick,
  getTreeData,
  openBtn,
  parentTree,
  selectNode,
} = useLeftTree(emit);
</script>

<style lang="scss">
@import '@/assets/commonTree.scss';
</style>
