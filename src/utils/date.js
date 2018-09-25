import { format } from "date-fns";

export default class DateUtils {
  /**
   * @description 时间戳格式化
   * @param {Number} date 时间戳
   * @param {String}} fmt 格式规则 默认 "YYYY-MM-DD HH:mm:ss"
   * @return {String} "YYYY-MM-DD HH:mm:ss"
   */
  static format(date, fmt = "YYYY-MM-DD HH:mm:ss") {
    return (date && typeof date === 'number') ? format(date, fmt) : "";
  }
}
/**
 * @description 根据起始、结束日期获取所有日期
 * @param {String} beginTime 起始日期时间戳
 * @param {String} endTime 结束时间戳
 */
export const getDateByInterval = (beginTime, endTime) => {
  const oneDayTime = 24 * 60 * 60 * 1000
  const result = []
  for (let i = beginTime; i <= endTime;) {
    result.push(format(i, 'YYYY-MM-DD'))
    i += oneDayTime
  }
  return result
}

/**
 * @description 根据年生成本年所有年月数据
 * @param {String} year 年
 * @return {Array} 当年12个月年月数组
 */
export const createMonthByYear = year => {
  const result = []
  for (let index = 1; index < 13; index++) {
    if (index < 10) {
      result.push(`${year}-0${index}`)
      continue
    }
    result.push(`${year}-${index}`)
  }
  return result
}

/**
 * @description 时间戳格式化
 * @param {Number} date 时间戳
 * @param {String}} fmt 格式规则 默认 "YYYY-MM-DD HH:mm:ss"
 * @return {String} "YYYY-MM-DD HH:mm:ss"
 */
export const formatTimeStamp = (date, fmt = "YYYY-MM-DD HH:mm:ss") => {
  return (date && typeof date === 'number') ? format(date, fmt) : "";
}