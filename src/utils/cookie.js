import Cookie from 'js-cookie'
import { version } from '../../package'

const tokenKey = 'XCJ-Token'

/**
 * @description 获取 cookie 值
 * @param {String} name token name
 */
export const getCookie = (name = tokenKey) => {
  return Cookie.get(name)
}

/**
 * @description 存储 cookie 值
 * @param {String} name token name
 * @param {String} value token value
 * @param {Object} setting token setting
 */
export const setCookie = (name = tokenKey, value = '', setting = {}) => {
  const Cookieetting = {
    expires: 1
  }
  Object.assign(Cookieetting, setting)
  Cookie.set(name, value, Cookieetting)
}

/**
 * @description 获取全部 token 值
 */
export const getAllCookie = () => {
  return Cookie.get()
}

/**
 * @description 删除 token
 * @param {String} name token name
 */
export const removeCookie = (name = tokenKey) => {
  return Cookie.remove(name)
}
