export const fixTwo = float => Number(float).toFixed(2)

export const thousandth = number => (number + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')

export const lowerCase = str => {
  if(str === null || str === undefined) return ''
  return str.toLowerCase()
}