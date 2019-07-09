import r from 'constants/routes'
import cnIcon from 'assets/images/cn.png'
import enIcon from 'assets/images/en.png'
const isMainNet = process.env.REACT_APP_NET === 'mainnet'

import hotIcon from 'assets/images/hot.png'

export const voteDetail = {
  title: 'vote',
  path: 'https://vote.vntchain.io',
  imgSrc: hotIcon,
  key: 'vote'
}

const menu = [
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
      // {
      //   title: 'nav2Sub3',
      //   key: 'faucet',
      //   path: r.faucet
      // }
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

export default menu

const faucetMenu = {
  title: 'nav2Sub3',
  key: 'faucet',
  path: r.faucet
}
const newMenu = []
menu.map(item => {
  let tempObj = {}
  tempObj = JSON.parse(JSON.stringify(item))
  if(tempObj.key === 'develop'){
    tempObj.children.push(faucetMenu)
  }
  newMenu.push(tempObj)
})
export const testMenu = newMenu

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
  },
  {
    title: 'dgNav6',
    key: 'extension',
    children: [
      {
        title: 'dgNav6Sub1',
        key: 'install',
        path: '/developer/wallet/install'
      },
      {
        title: 'dgNav6Sub2',
        key: 'use',
        path: '/developer/wallet/use'
      },
    ]
  }
]

export const moreMenu = {
  title: 'nav4',
  key: 'more',
  children: [
    {
      title: 'nav4Sub1',
      key: 'vntOfficialWebsite',
      path: r.vntOfficialWebsite,
      friendLink: true
    },
    {
      title: 'nav4Sub2',
      key: 'vntBox',
      path: r.vntBox,
      friendLink: true
    },
    {
      title: 'nav4Sub3',
      key: 'vntTokenMap',
      path: r.vntTokenMap,
      friendLink: true
    }
  ]
}

export const vntNetMenu = {
  title: isMainNet ? 'nav5Sub1' : 'nav5Sub2',
  key: 'vntNet',
  children: [
    {
      title: isMainNet ? 'nav5Sub1' : 'nav5Sub2',
      key: 'first',
      path: isMainNet ? r.mainNet : r.testNet
    },
    {
      title: isMainNet ? 'nav5Sub2' : 'nav5Sub1',
      key: 'second',
      path: isMainNet ? r.testNet : r.mainNet,
      friendLink: true
    }
  ]
}

export const headerLang = {
  defaultValue: 'cn',
  children: [
    {
      title: '简体中文',
      value: 'cn',
      key: 'cn',
      imgSrc: cnIcon
    },
    {
      title: 'English',
      value: 'en',
      key: 'en',
      imgSrc: enIcon
    }
  ]
}

export const footerNav = [
  {
    title: 'nav_home',
    key: 'brief',
    path: r.home
  },
  {
    title: 'nav_tech',
    key: 'officalTech',
    path: r.vntOfficialWebsiteTech,
    friendLink: true
  },
  {
    title: 'nav_developer',
    key: 'officalDeveloper',
    path: r.vntOfficialWebsiteDeveloper,
    friendLink: true
  },
  {
    title: 'nav_news',
    key: 'officalNews',
    path: r.vntOfficialWebsiteNews,
    friendLink: true
  },
  {
    title: 'nav_community',
    key: 'officalCommunith',
    path: r.vntOfficialWebsiteCommunity,
    friendLink: true
  },
  {
    title: 'nav_cooperation',
    key: 'officalCooperation',
    path: r.vntOfficialWebsiteCooperation,
    friendLink: true
  },
  {
    title: 'nav_about',
    key: 'officalAbout',
    path: r.vntOfficialWebsiteAbout,
    friendLink: true
  }
]

export const footerSocialData = [
  {
    title: 'GitHub',
    link: 'https://github.com/vntchain',
    img: require('../assets/images/footer/social1.png'),
    iconType: 'github'
  },
  {
    title: 'Medium',
    link: 'https://medium.com/vnt-chain-labs',
    img: require('../assets/images/footer/social2.png'),
    iconType: 'medium'
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/VNTChainLabs',
    img: require('../assets/images/footer/social3.png'),
    iconType: 'twitter'
  },
  {
    title: 'Weibo',
    link: 'https://weibo.com/vntchain',
    img: require('../assets/images/footer/social4.png'),
    iconType: 'weibo'
  },
  {
    title: 'Reddit',
    link: 'https://www.reddit.com/r/VNTChain/',
    img: require('../assets/images/footer/social5.png'),
    iconType: 'reddit'
  },
  {
    title: 'Telegram',
    link: 'https://t.me/VNTChainLabs',
    img: require('../assets/images/footer/social6.png'),
    iconType: 'dribbble'
  },
  {
    title: 'WeChat',
    img: require('../assets/images/footer/social7.png'),
    iconType: 'wechat'
  },
  {
    title: 'Mail',
    img: require('../assets/images/footer/social8.png'),
    iconType: 'mail'
  }
]
