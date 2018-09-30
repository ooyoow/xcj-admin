/**
 * @description 对象参数转url参数
 * @param {Object} params 参数对象
 */
export const expandParams = params => {
  let flag = true
  let urlParams = ''
  Object.keys(params).forEach(key => {
    if (params[key]) {
      urlParams += `${flag ? '?' : '&'}${key}=${params[key]}`
      flag = false
    }
  })
  return urlParams
}

/**
 * @description 对象空值去取
 * @param {Object} object 对象
 * @return {Object} object
 */
export const deleteObjectEmptyValue = obj => {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    obj[key] !== null && obj[key] !== undefined && obj[key].toString() ? (newObj[key] = obj[key]) : newObj
  })
  return newObj
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
export const newPage = url => {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'menu-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('menu-link'))
}

/**
 * @description 防抖函数
 * @param {String} url 地址
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @description 通过文件url截取文件名
 * @param {String} url 地址
 * @return {String} fileName
 */
export const interceptFileName = (url) => {
  if (url) {
    const index = url.lastIndexOf('\/');
    return url.substring(index + 1, url.length);
  }
  return ''
}
