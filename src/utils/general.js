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
 * @param {Object} object 对象
 * @return {Object} object
 */
export const deleteObjectEmptyValue = obj => {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    obj[key].toString() ? (newObj[key] = obj[key]) : newObj
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
