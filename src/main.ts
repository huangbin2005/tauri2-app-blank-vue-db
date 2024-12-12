import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus';
import zhCN from 'element-plus/es/locale/lang/zh-cn'

import './style.scss'

createApp(App).use(ElementPlus, {
    locale: zhCN
  }).mount("#app");
