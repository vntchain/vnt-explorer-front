const isMainNet = process.env.REACT_APP_NET === 'mainnet'
const net = isMainNet ? 'mainnet' : 'testnet'

export const blockBriefLogo = (function() {
  const imgArray = new Array(8).fill(0)
  //console.log(process.env) // eslint-disable-line
  return imgArray.map((item, i) => {
    let url = `assets/images/${net}/blockBriefLogo/icon${i + 1}`
    let src = require('../' + url + '.png')
    return { src }
  })
})()

export const headerLogo = isMainNet
  ? require('../assets/images/mainnet/headerLogo.png')
  : require('../assets/images/testnet/headerLogo.png')

export const blockIcon = isMainNet
  ? require('../assets/images/mainnet/icon-block.png')
  : require('../assets/images/testnet/icon-block.png')

export const txIcon = isMainNet
  ? require('../assets/images/mainnet/icon-trading.png')
  : require('../assets/images/testnet/icon-trading.png')
