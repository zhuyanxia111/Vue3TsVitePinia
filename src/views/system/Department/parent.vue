<template>
  <sys-dialog
    :title="dialog.title"
    :visible="dialog.visible"
    :height="dialog.height"
    :width="dialog.width"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-tree
        :data="treeData.data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        style="font-size: 14px"
        ref="parentTree"
        node-key="id"
        :highlight-current="true"
        :expand-on-click-node="false"
        default-expand-all
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
  </sys-dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineExpose } from 'vue';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog'; //事件
import useParent from '@/composables/department/useParent';
import { DeptModel } from '@/api/dept/DeptModel';
const { dialog, onClose, onShow } = useDialog();
const emit = defineEmits(['select']);
const {
  treeData,
  defaultProps,
  handleNodeClick,
  getTreeData,
  parentTree,
  openBtn,
  selectNode,
} = useParent();
const confirm = () => {
  emit('select', selectNode);
  onClose();
};

const show = async () => {
  dialog.height = 450;
  dialog.width = 300;
  dialog.title = '选择上级部门';
  //显示弹框
  await getTreeData();
  onShow();
};
defineExpose({
  show,
});
</script>
<style lang="scss">
@import '@/assets/commonTree.scss';
</style>
