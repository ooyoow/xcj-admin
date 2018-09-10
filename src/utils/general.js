/**
 * @description 对象参数转url参数
 * @param {Object} params 参数对象
 */
export const expandParams = params => {
  let flag = true
  let urlParams = ''
  Object.keys(params).forEach(key => {
    if (params[key]) {
      urlParams = `${flag ? '?' : '&'}${key}=${params[key]}`
      flag = false
    }
  })
  return urlParams
}

/**
 * @description 对象空值去取
 * @param {Object} obj 对象
 */
export const removeEmptyValue = obj => {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    obj[key].toString() ? (newObj[key] = obj[key]) : newObj
  })
  return newObj
}