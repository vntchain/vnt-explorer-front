import r from 'constants/routes'

export default [
  {
    title: 'nav1',
    key: 'blockchain',
    children: [
      {
        title: 'nav1Sub1',
        key: 'brief',
        path: r.home
      },
      {
        title: 'nav1Sub2',
        key: 'blocks',
        path: r.blockList
      },
      {
        title: 'nav1Sub3',
        key: 'transactions',
        path: r.txList
      },
      {
        title: 'nav1Sub4',
        key: 'accounts',
        path: r.accountList
      },
      {
        title: 'nav1Sub5',
        key: 'contracts',
        path: r.contractList
      },
      {
        title: 'nav1Sub6',
        key: 'tokens',
        path: r.tokenList
      },
      {
        title: 'nav1Sub7',
        key: 'superNode',
        path: r.nodeList
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
        path: r.devGuides
      },
      /* {
        title: 'nav2Sub2',
        key: 'chaincodeTools',
        path: '/chaincode'
      }, */
      {
        title: 'nav2Sub3',
        key: 'faucet',
        path: r.faucet
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
        path: r['create-wallet']
      },
      {
        title: 'nav3Sub2',
        key: 'openWallet',
        path: r['open-wallet']
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
        key: 'wallet-account',
        path: r['wallet-account']
      },
      {
        title: 'nav3AuthSub2',
        key: 'send',
        path: r['send']
      },
      {
        title: 'nav3AuthSub3',
        key: 'receive',
        path: r['receive']
      },
      {
        title: 'nav3AuthSub4',
        btn: true,
        key: 'logout'
      }
    ]
  }
]

// menu for developer guide page
export const devGuideMenu = [
  {
    title: 'dgNav1',
    key: 'developer',
    path: '/developer'
  },
  {
    title: 'dgNav2',
    key: 'network',
    path: '/developer/network'
  },
  {
    title: 'dgNav3',
    key: 'consensus',
    path: '/developer/consensus'
  },
  {
    title: 'dgNav5',
    key: 'join',
    path: '/developer/join'
  },
  {
    title: 'dgNav4',
    key: 'dapp',
    path: '/developer/dapp'
  },
  {
    title: 'dgNav4Sub1',
    key: 'develop',
    path: '/developer/dapp/develop'
  },
  {
    title: 'dgNav4Sub2',
    key: 'compile',
    path: '/developer/dapp/compile'
  },
  {
    title: 'dgNav4Sub3',
    key: 'invoke',
    path: '/developer/dapp/invoke'
  }
]
