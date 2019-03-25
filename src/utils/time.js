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
  const arr = []
  units.forEach(item => {
    arr.push(
      parseInt(
        distanceInWordsStrict(new Date(t), new Date(), {
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
  })

  crucialIndex = crucialIndex === -1 ? 4 : crucialIndex
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
