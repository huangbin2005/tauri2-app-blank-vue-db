/**
 * 模拟数据初始化mockjs
 * @author andy
 */

import Mock from 'mockjs'

export default (options = { mock, setup: () => null }) => {
const { mock = process.env.NODE_ENV === 'development', setup } = options
if(mock === false) return
Mock.setup({
  timeout: '500-1500'
})
setup()
}
