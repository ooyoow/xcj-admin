import moment from 'moment'
/**
 * @description 根据起始、结束日期获取所有日期
 * @param {String} beginTime 起始日期时间戳
 * @param {String} endTime 结束时间戳
 */

export const getDateByInterval = (beginTime, endTime) => {
  const oneDayTime = 24 * 60 * 60 * 1000
  const result = []
  for (let i = beginTime; i <= endTime; ) {
    result.push(moment(i).format('YYYY-MM-DD'))
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
