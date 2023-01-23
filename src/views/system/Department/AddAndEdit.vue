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
      <el-form
        :model="dialogModel"
        ref="addDeptForm"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="parentName" label="上级部门">
              <el-input type="hidden" v-model="dialogModel.pid"></el-input>
              <el-input
                @click="selectParent"
                v-model="dialogModel.parentName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name" label="部门名称">
              <el-input v-model="dialogModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="deptCode" label="部门编码">
              <el-input v-model="dialogModel.deptCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptPhone" label="部门电话">
              <el-input v-model="dialogModel.deptPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="manager" label="部门经理">
              <el-input v-model="dialogModel.manager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptAddress" label="部门地址">
              <el-input v-model="dialogModel.deptAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="orderNum" label="部门序号">
              <el-input v-model="dialogModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </sys-dialog>
  <parent @select="select" ref="parentRef" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog'; //事件
import { EditType, Title } from '@/type/BaseEnum';
import useBaseModel from '@/composables/department/useBaseModel'; //表单数据
import parent from './parent.vue';
import useSelectParent from '@/composables/department/useSelectParent';
import { DeptModel, SelectNode } from '@/api/dept/DeptModel';
import type { FormInstance } from 'element-plus';
import useInstance from '@/hooks/useInstance';
const { dialogModel, rules } = useBaseModel(); //基础数据
const { dialog, onClose, onShow } = useDialog(); //弹框时间
const { parentRef, selectParent } = useSelectParent(); //上级部门弹窗
const addDeptForm = ref<FormInstance>();
const { global } = useInstance();
//点击保存组件传回数据
const emit = defineEmits(['save']);
const confirm = () => {
  addDeptForm.value?.validate((valid) => {
    if (valid) {
      emit('save', dialogModel);
      onClose();
    }
  });
};
//选择的上级部门返回数据
const select = (node: SelectNode) => {
  dialogModel.pid = node.id;
  dialogModel.parentName = node.name;
};
//调用子组件展示弹框
const show = (type: string, row: DeptModel) => {
  onShow(); //显示弹框
  global.$resetForm(addDeptForm.value, dialogModel); //清空数据
  if (type === EditType.EDIT) {
    global.$objCoppy(row, dialogModel);
  }
  type == EditType.ADD
    ? (dialog.title = Title.ADD)
    : (dialog.title = Title.EDIT); //设置弹框的标题
  dialogModel.type = type; //设置type
};
//在外边需要调用的时候可以暴露出去
defineExpose({
  show,
});
</script>
<style scoped lang="scss"></style>
