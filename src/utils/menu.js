export default [
  {
    title: 'nav1',
    key: 'blockchain',
    children: [
      {
        title: 'nav1Sub1',
        key: 'brief',
        path: '/'
      },
      {
        title: 'nav1Sub2',
        key: 'blocks',
        path: '/blocks'
      },
      {
        title: 'nav1Sub3',
        key: 'transactions',
        path: '/txs'
      },
      {
        title: 'nav1Sub4',
        key: 'account',
        path: '/account'
      },
      {
        title: 'nav1Sub5',
        key: 'chaincode',
        path: '/chaincode'
      },
      {
        title: 'nav1Sub6',
        key: 'token',
        path: '/token'
      },
      {
        title: 'nav1Sub7',
        key: 'superNode',
        path: '/super-node'
      }
    ]
  },
  {
    title: 'nav2',
    key: 'develop',
    children: [
      {
        title: 'nav2Sub1',
        key: 'devGuides',
        path: '/developer'
      },
      {
        title: 'nav2Sub2',
        key: 'chaincodeTools',
        path: '/chaincode'
      }
    ]
  },
  {
    title: 'nav3',
    condition: false, // before auth
    key: 'walletB',
    children: [
      {
        title: 'nav3Sub1',
        key: 'createWallet',
        path: '/new-wallet'
      },
      {
        title: 'nav3Sub2',
        key: 'viewWallet',
        path: '/view-wallet'
      }
    ]
  },
  {
    title: 'nav3',
    condition: true, // after auth
    key: 'walletA',
    children: [
      {
        title: 'nav3AuthSub1',
        key: 'account',
        path: '/account'
      },
      {
        title: 'nav3AuthSub2',
        key: 'send',
        path: '/send'
      },
      {
        title: 'nav3AuthSub3',
        key: 'receive',
        path: '/receive'
      },
      {
        title: 'nav3AuthSub4',
        btn: true,
        key: 'logout'
      }
    ]
  }
]
