<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onConfirm="confirm"
    @onClose="onClose"
  >
    <template v-slot:content>
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
              ></DocumentRemove>
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
                :is="data.open ? 'Plus' : 'Minus'"
              />
            </span>
            <span>{{ node.label }}</span>
          </div>
        </template>
      </el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useMenuParent from '@/composables/menu/useMenuParent';
const emit = defineEmits(['select']);
const { dialog, onClose, onShow } = useDialog(); //弹框属性
const {
  confirm,
  show,
  parentTree,
  treeData,
  handleNodeClick,
  defaultProps,
  openBtn,
} = useMenuParent(dialog, onClose, onShow, emit);
defineExpose({ show });
</script>
<style scoped lang="scss">
@import '@/assets/commonTree.scss';
</style>
