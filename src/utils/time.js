import { distanceInWordsStrict, format } from 'date-fns'
import zh_cn from 'date-fns/locale/zh_cn'

// input time: 1552989645
export const calcAge = (time, lang) => {
  const t = time * 1000
  const units = [
    { unit: 's', threshold: 60, suffix: lang === 'cn' ? '秒' : ' sec' },
    { unit: 'm', threshold: 60, suffix: lang === 'cn' ? '分钟' : ' min' },
    { unit: 'h', threshold: 24, suffix: lang === 'cn' ? '小时' : ' hr' },
    { unit: 'd', threshold: 365, suffix: lang === 'cn' ? '天' : ' day' },
    { unit: 'Y', threshold: 1, suffix: lang === 'cn' ? '年' : ' yr' }
  ]
  const now = new Date()
  if (t >= Date.parse(now)) {
    return lang === 'en' ? 'Just now' : '刚刚'
  }

  // e.g., [90132, 1502, 25, 1, 0]
  const arr = []
  units.forEach(item => {
    // distanceInWordsStrict 只比较差值（绝对值），时间先后不敏感
    arr.push(
      parseInt(
        distanceInWordsStrict(new Date(t), now, {
          locale: zh_cn,
          unit: item.unit
        }).split(' ')[0]
      )
    )
  })
  let crucialIndex = -1
  arr.reduceRight((accumulator, currentValue, index) => {
    if (accumulator === 0 && currentValue != 0) {
      crucialIndex = index
    }
    return currentValue
  }, 0)

  // crucialIndex = crucialIndex === -1 ? 4 : crucialIndex

  if (crucialIndex === -1) {
    return lang === 'en' ? 'Just now' : '刚刚'
  }

  // 最多同时显示两个单位
  let blockAge = `${arr[crucialIndex]}${units[crucialIndex].suffix}${
    arr[crucialIndex] > 1 && lang === 'en' ? 's ' : lang === 'en' ? ' ' : ''
  }`
  if (crucialIndex !== 0) {
    const secondaryNumber =
      arr[crucialIndex - 1] -
      arr[crucialIndex] * units[crucialIndex - 1].threshold
    blockAge += secondaryNumber
      ? secondaryNumber +
        units[crucialIndex - 1].suffix +
        (secondaryNumber > 1 && lang === 'en' ? 's ' : lang === 'en' ? ' ' : '')
      : ''
  }
  blockAge += lang === 'cn' ? '前' : 'ago'
  return blockAge
}

export const formatTime = time => {
  return format(new Date(time * 1000), 'YYYY-MM-DD HH:mm:ss')
}
