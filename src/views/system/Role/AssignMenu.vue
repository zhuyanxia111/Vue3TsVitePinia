<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-tree
        ref="assignTree"
        :data="assignTreeData.list"
        node-key="id"
        :props="defaultProps"
        empty-text="暂无数据"
        :show-checkbox="true"
        default-expand-all
        :highlight-current="true"
        :default-checked-keys="assignTreeData.assignTreeChecked"
      ></el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useAssignMenu from '@/composables/role/useAssignMenu';
import useDialog from '@/hooks/useDialog';
//弹框属性
const { dialog, onShow, onClose } = useDialog();
const { confirm, show, defaultProps, assignTreeData, assignTree } =
  useAssignMenu(dialog, onShow, onClose);
defineExpose({ show });
</script>
<style scoped lang="scss"></style>
