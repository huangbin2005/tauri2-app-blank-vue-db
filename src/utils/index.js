/**
 * 常用函数类
 * @author andy
 */

// 转换int
export function Int(v) {
return parseInt(v)
}
// 判断是否Boolean型
export function isBool(str) {
return /^true|false$/i.test(str)
}
// 判断是否true
export function isTrue(str) {
return /^true$/i.test(str)
}

export function isString(val) {
const type = typeof val
return type === 'string' || (type === 'object' && val != null && !Array.isArray(val) && Object.prototype.toString.call(val) === '[object String]')
}
export function isNumber(val) {
return !isNaN(parseFloat(val)) && isFinite(val)
}

export function isFunction(str) {
  return typeof str == 'function'
}

export function isArray(str) {
return isObject(str) || Array.isArray(str)
}
export function isObject(str) {
return str != null && typeof str == 'object'
}

export function isPromise(str) {
return isObject(str) && isFunction(str.then) && isFunction(str.catch)
}
export function isEmpty(val) {
if(val == null) return true
if(typeof val == 'boolean') return false
if(typeof val == 'number') return !isNumber(val)
if(val instanceof Error) return val.message == ''
switch(Object.prototype.toString.call(val)) {
  // String or Array
  case '[object String]':
  case '[object Array]':
    return !val.length

  // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]':
      return !val.size

    // Plain Object
    case '[object Object]':
      return !Object.keys(val).length;
  }
  return false
}

// 随机字符串
export function uuid(len = 32) {
  let $chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let $lens = $chars.length
  let str = ''
  for(var i = 0; i < len; i++){
    str += $chars.charAt(Math.floor(Math.random() * $lens))
  }
  return str
}
export function guid(len, firstU = true, radix = null) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
} else {
  let r
  // rfc4122标准要求返回的uuid中,某些位为固定的字符
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
  uuid[14] = '4'

  for (let i = 0; i < 36; i++) {
    if (!uuid[i]) {
      r = 0 | Math.random() * 16
      uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
    }
  }
}
// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
if (firstU) {
  uuid.shift()
  return 'u' + uuid.join('')
} else {
    return uuid.join('')
  }
}

export function clipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch((err) => {
    throw err !== undefined
      ? err
      : new DOMException('The request is not allowed', 'NotAllowedError');
    });
  }

  const span = document.createElement('span');
span.textContent = text;

span.style.whiteSpace = 'pre';

document.body.appendChild(span);

const selection = window.getSelection();
const range = window.document.createRange();
selection?.removeAllRanges();
range.selectNode(span);
selection?.addRange(range);

  let success = false;
  try {
    success = window.document.execCommand('copy');
  } catch (err) {
    // eslint-disable-next-line
    console.log('error', err);
  }

  selection?.removeAllRanges();
  window.document.body.removeChild(span);

return success
  ? Promise.resolve()
  : Promise.reject(
      new DOMException('The request is not allowed', 'NotAllowedError')
  );
}

export function getDate() {
const date = new Date().toLocaleDateString()
const time = new Date().toLocaleTimeString()
return `${date} ${time}`
}

// 验证手机号
export function checkTel(val) {
var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
  if(val == '' || !reg.test(val)){
    return false
  }
  return true
}

// 外链验证
export function isExternal(url) {
  const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
  return reg.test(url)
}

export function convert(str) {
  const c = str.charAt(0)
  return c.toUpperCase() + str.replace(c, '')
}

export function getScroll(type) {
const _s = convert(type)
return document.documentElement['scroll' + _s] || document.body['scroll' + _s]
}

export function getClient(type) {
const _s = convert(type)
return document.documentElement['client' + _s] || document.body['client' + _s]
}

export function getOffset(el, type) {
if(!el || !type) return
const _s = convert(type)
return el['offset' + _s]
}

export function getStyle(el, style) {
if(!el || !style) return
  return el.currentStyle ? el.currentStyle[style] : document.defaultView.getComputedStyle(el, null)[style]
}

// 获取弹窗最大层级
export function getZIndex(zIndex) {
  for(var zIdx = parseInt(zIndex), el = document.getElementsByTagName('*'), i = 0, len = el.length; i < len; i++)
  zIdx = Math.max(zIdx, el[i].style.zIndex)
return zIdx
}

// 格式单位
export function addUnit(value, defaultUnit = 'px') {
if(!value && value != 0) return ''
if(/\%|px|rem/.test(value)) {
  return value
}else {
  return `${value}${defaultUnit}`
}
}

// 对象上是否存在某个属性
export function hasOwn(options, prop) {
  const hasOwnProperty = Object.prototype.hasOwnProperty
  return hasOwnProperty.call(options, prop)
}

/**
 * 防抖原理(一定时间只有最后一次操作被执行)
 * 应用于：搜索框、商品下单支付
 */
export function debounce(fn, wait = 500) {
  let timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

export function throttle(fn, wait = 500, immediate = true) {

  let flag = false
  return function() {
    if(flag) return
    flag = true
    setTimeout(() => {
      fn.apply(this, arguments)
      flag = false
    }, wait)
  }
}

export const listener = {
  on: function(el, event, handle) {
    el.attachEvent ? el.attachEvent('on' + event, handle) : el.addEventListener(event, handle, false)
  },
  off: function(el, event, handle) {
    el.detachEvent ? el.detachEvent('on' + event, handle) : el.removeEventListener(event, handle, false)
  }
}

export function deepClone(target, map = new Map()) {
  if(typeof target == 'object' && target != null) {
    let cache = map.get(target)
    if(cache) return cache
    let isArray = Array.isArray(target)
    const result = isArray ? [] : {}
    map.set(target, result)
  if(isArray) {
    // 数组
    target.forEach((item, index) => {
      result[index] = deepClone(item, map)
    })
  }else {
    // 对象
    Object.keys(target).forEach(key => {
      result[key] = deepClone(target[key], map)
    })
  }
  return result
}else {
  return target
  }
}

export function objectAssign(target) {
  for(let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for(let prop in source) {
    if(source.hasOwnProperty(prop)) {
      let val = source[prop]
      if(val != undefined) {
        target[prop] = val
      }
    }
  }
}
  return target
}

export function isIE() {
  return !!window.ActiveXObject || 'ActiveXObject' in window
}

// 判断是否图片类型
export function isImg(str) {
if(!isString(str)) return
return /\.(gif|jpg|jpeg|png|bmp|webp|svg|tiff)$/.test(str.toLocaleLowerCase())
}

// 获取月日/周几
export function getCurrentDate() {
const date = new Date()
return date.getMonth() + 1 + '月' + date.getDate() + '日' + ' ' + '周' + '日一二三四五六'.charAt(date.getDay())
}

// 获取时分秒HH:mm:ss
export function getCurrentTime() {
const date = new Date()
const format = (num) => num < 10 ? '0' + num : num
return format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())
}
