/**
 * 环境变量
 * @author andy
 */

import { isBool, isNumber } from './index'

export function isDev(mode) {
return mode === 'development'
}

export function isProd(mode) {
return mode === 'production'
}

/* 解析.env环境变量 */
export function parseEnv(env) {
const envArr = {}
Object.keys(env).map(key => {
  let envVal = env[key]
  envVal = isBool(envVal) ? JSON.parse(envVal) : envVal
  envVal = isNumber(envVal) ? Number(envVal) : envVal
  envArr[key] = envVal
})
return envArr
}
