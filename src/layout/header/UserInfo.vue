<template>
  <div class="header-right">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="userimg" src="./../../assets/avatar.jpg" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="resetBtn">还原数据</el-dropdown-item>
          <el-dropdown-item @click="loginOutBtn">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import useInstance from '@/hooks/useInstance';
import { loginOutApi, restoreApi } from '@/api/user/user';
import { getToken, cleanSession } from '@/utils/auth';
const { global } = useInstance();
//退出登录
const loginOutBtn = async () => {
  let confirm = await global.$myconfirm('确定退出登录吗？');
  if (confirm) {
    let parm = {
      token: getToken(),
    };
    let res = await loginOutApi(parm);
    if (res && res.code == 200) {
      //清空session
      cleanSession();
      //跳到登录
      window.location.href = '/login';
    }
  }
};
//还原数据
const resetBtn = async () => {
  let confirm = await global.$myconfirm('确定还原数据吗?');
  if (confirm) {
    let res = await restoreApi();
    if (res.code == 200) {
      global.$message.success(res.msg);
    }
  }
};
</script>
<style scoped lang="scss">
.header-right {
  /* display: flex; */
}
.userimg {
  height: 42px;
  width: 42px;
  border-radius: 50%;
}
</style>
