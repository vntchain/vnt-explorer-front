const net = process.env.IsMainNet ? 'main' : 'test'

export const blockBriefLogo = (function() {
  const imgArray = new Array(8).fill(0)

  return imgArray.map((item, i) => {
    let url = `assets/images/${net}/blockBriefLogo/icon${i + 1}`
    let src = require('../' + url + '.png')
    return { src }
  })
})()
