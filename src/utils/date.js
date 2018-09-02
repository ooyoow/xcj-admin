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
