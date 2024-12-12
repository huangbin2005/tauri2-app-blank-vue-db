/**
 * 公共插件配置
 */
import ElementPlus from 'element-plus'
import zhCN from 'element-plus/es/locale/lang/zh-cn'

import i18n from './i18n'

// 引入指令
import directive from '@/directives'

export default (app) => {
app.use(ElementPlus, {
  locale: zhCN
})
app.use(i18n)

// 注册指令
  app.use(directive)
}
