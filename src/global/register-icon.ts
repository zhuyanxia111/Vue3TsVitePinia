import * as Icons from '@element-plus/icons-vue'
import { App, createVNode } from "vue"
//keyof获取对象的属性的键
//typeof 获取对象声明的类型
export default function (app: App): void {
  /* 
  //在页面使用方式 <Icon icon="Edit"></Icon>
  const Icon = (props: { icon: string }) => {
    const { icon } = props;
    return createVNode(Icons[icon as keyof typeof Icons]);
  };
  app.component('Icon', Icon);
  */

  //在页面使用方式 
  /* 
  <el-icon class="icons">
    <component :is="menu.meta.icon" />或<Edit />
  </el-icon>
  */
  for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
  }
}