export default function textSplit(text, unit) {
  let t = text
  const splitArr = []
  while (t.length > unit) {
    splitArr.push(t.slice(0, unit))
    t = t.slice(unit)
  }
  splitArr.push(t)
  return splitArr
}

/* export default function textSplit(text, unit) {
  if (text.length < unit) {
    return [text]
  }
  return textSplit(text.slice(0, text.length - unit), unit).concat([
    text.slice(text.length - unit, text.length)
  ])
} */
