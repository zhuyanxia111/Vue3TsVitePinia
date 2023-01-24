import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './permission'
import { globalRegister } from './global'
import resetForm from './utils/resetForm'
import objCoppy from './utils/objCoppy'
import myconfirm from './utils/myconfirm'
import { ElMessage } from "element-plus";
import { permission } from '@/directives/permission'//按钮权限
const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$resetForm = resetForm//清空表单
app.config.globalProperties.$objCoppy = objCoppy//对象复制
app.config.globalProperties.$myconfirm = myconfirm//确定弹框
app.config.globalProperties.$message = ElMessage//确定弹框
app.use(globalRegister)
app.use(router)
app.use(pinia)
app.mount('#app')
app.directive('permission', permission)
