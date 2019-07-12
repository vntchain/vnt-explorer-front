const tokenMapUrl = 
  process.env.REACT_APP_NET === 'mainnet' 
    ? 'https://migration.vntchain.io' 
    : 'https://migration.vnt.link'

export default {
  home: '/',
  blockList: '/blocks',
  blockDetail: '/block',
  txList: '/txs',
  txDetail: '/transaction',
  accountList: '/accounts',
  accountDetail: '/account',
  contractList: '/contracts',
  contractDetail: '/contract',
  tokenList: '/tokens',
  tokenDetail: '/token',
  nodeList: '/super-node',
  devGuides: '/developer',
  faucet: '/faucet',
  vntOfficialWebsite: 'http://www.vntchain.io/',
  vntBox: 'https://vnt.link/',
  vntTokenMap: tokenMapUrl,
  'create-wallet': '/create-wallet',
  'open-wallet': '/open-wallet',
  'wallet-account': '/wallet',
  send: '/send',
  receive: '/receive',
  wallet: '/wallet',
  mainNet: 'https://www.vntchain.io/',
  testNet: 'https://hubscan.vnt.link/',
  vntOfficialWebsiteTech: 'http://www.vntchain.io/technology',
  vntOfficialWebsiteDeveloper: 'http://www.vntchain.io/developers',
  vntOfficialWebsiteNews: 'http://www.vntchain.io/news',
  vntOfficialWebsiteCommunity: 'https://vnt.link',
  vntOfficialWebsiteCooperation: 'http://www.vntchain.io/partners',
  vntOfficialWebsiteAbout: 'http://www.vntchain.io/about'
}
