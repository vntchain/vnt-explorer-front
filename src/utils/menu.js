export default [
  {
    title: ['区块链', 'Blockchain'],
    key: 'blockchain',
    children: [
      {
        title: ['概览', 'Overview'],
        key: 'brief',
        path: '/'
      },
      {
        title: ['区块', 'Blocks'],
        key: 'blocks',
        path: '/blocks'
      },
      {
        title: ['交易', 'Transactions'],
        key: 'transactions',
        path: '/transactions'
      },
      {
        title: ['账户', 'Account'],
        key: 'account',
        path: '/account'
      },
      {
        title: ['合约', 'Chaincodes'],
        key: 'chaincode',
        path: '/chaincode'
      },
      {
        title: ['代币', 'Token'],
        key: 'token',
        path: '/token'
      },
      {
        title: ['超级节点', 'Super Node'],
        key: 'superNode',
        path: '/super-node'
      }
    ]
  },
  {
    title: ['开发者', 'Developer'],
    key: 'develop',
    children: [
      {
        title: ['VNT开发者指南', 'VNT Developer Guides'],
        key: 'devGuides',
        path: '/developer'
      },
      {
        title: ['合约工具', 'Chaincode Tools'],
        key: 'chaincodeTools',
        path: '/chaincode'
      }
    ]
  },
  {
    title: ['钱包', 'Wallet'],
    condition: false, // before auth
    key: 'walletB',
    children: [
      {
        title: ['创建钱包', 'Create Wallet'],
        key: 'createWallet',
        path: '/new-wallet'
      },
      {
        title: ['打开钱包', 'View Wallet'],
        key: 'viewWallet',
        path: '/view-wallet'
      }
    ]
  },
  {
    title: ['钱包', 'Wallet'],
    condition: true, // after auth
    key: 'walletA',
    children: [
      {
        title: ['钱包账户', 'Account'],
        key: 'account',
        path: '/account'
      },
      {
        title: ['发送', 'Send'],
        key: 'send',
        path: '/send'
      },
      {
        title: ['接收', 'Receive'],
        key: 'receive',
        path: '/receive'
      },
      {
        btn: true,
        title: ['退出登录', 'Logout'],
        key: 'logout'
      }
    ]
  }
]
