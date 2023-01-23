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
      <el-form
        :model="addModel"
        ref="addMenuForm"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop="type" label="菜单类型">
              <el-radio-group v-model="addModel.type">
                <el-radio :label="'0'">目录</el-radio>
                <el-radio :label="'1'">菜单</el-radio>
                <el-radio :label="'2'">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="parentName" label="上级菜单">
              <el-input type="hidden" v-model="addModel.parentId"></el-input>
              <el-input
                @click="selectParent"
                v-model="addModel.parentName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="label" label="菜单名称">
              <el-input v-model="addModel.label"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="addModel.type != '2'" :span="12" :offset="0">
            <el-form-item prop="icon" label="菜单图标">
              <el-input v-model="addModel.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="addModel.type == '1'" :span="12" :offset="0">
            <el-form-item prop="name" label="路由名称">
              <el-input v-model="addModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="addModel.type == '1'" :span="12" :offset="0">
            <el-form-item prop="path" label="路由地址">
              <el-input v-model="addModel.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="addModel.type == '1'" :span="12" :offset="0">
            <el-form-item prop="url" label="组件路径">
              <el-input v-model="addModel.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="权限字段">
              <el-input v-model="addModel.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="菜单序号">
              <el-input v-model="addModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <MenuParent ref="parentRef" @select="select" />
</template>
<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useAddMenu from '@/composables/menu/useAddMenu';
import useDialog from '@/hooks/useDialog';
import MenuParent from './MenuParent.vue';
import useSelectParent from '@/composables/department/useSelectParent';
const emit = defineEmits(['save']);
const { dialog, onClose, onShow } = useDialog(); //弹框属性
const { confirm, show, addModel, rules, addMenuForm, select } = useAddMenu(
  dialog,
  onClose,
  onShow,
  emit
);
const { parentRef, selectParent } = useSelectParent();
defineExpose({
  show,
});
</script>
<style scoped lang="scss"></style>
