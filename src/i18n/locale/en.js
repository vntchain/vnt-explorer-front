export default {
  language: '中文',

  blank: '',
  rank: '#',
  /*
  ** Header Fields
  */
  nav1: 'Blockchain',
  nav1Sub1: 'Overview',
  nav1Sub2: 'Blocks',
  nav1Sub3: 'Transactions',
  nav1Sub4: 'Accounts',
  nav1Sub5: 'Contracts',
  nav1Sub6: 'Tokens',
  nav1Sub7: 'Super Nodes',
  nav2: 'Developer',
  nav2Sub1: 'VNT Developer Guides',
  nav2Sub2: 'Chaincode Tools',
  nav2Sub3: 'Test NetWork Faucet',
  nav3: 'Wallet',
  nav3Sub1: 'Create Wallet',
  nav3Sub2: 'Open Wallet',
  nav3AuthSub1: 'Account',
  nav3AuthSub2: 'Send',
  nav3AuthSub3: 'Receive',
  nav3AuthSub4: 'Logout',
  hdSearchPh: 'Search address, block, transaction', // placeholder for header search box
  /*
 ** Home banner
 */
  hbField1: 'Block Height',
  hbField2: 'Transactions',
  hbField3: 'Current/Max TPS',
  hbField4: 'Total Accounts',
  hbField5: 'Super/Candidate Nodes',
  /*
 ** Home brief info box (left and right)
 */
  lTitle: 'Blocks',
  lField1: 'View All >',
  lField2: 'Transactions: ',
  lField3: 'Block Reward ',
  lField4: 'Produced by: ',

  rTitle: 'Transactions',
  rField1: 'View All >',
  rField2: 'From: ',
  rField3: 'To: ',
  rField4: 'Value: ',
  /*
  ** Home chart
  */
  chartTitle: 'VNT 14 days Transaction History',

  /*
  ** Create wallet
  */
  CWBanner: 'Create New Wallet',
  stage1: 'Input Password',
  stage2: 'Save Keystore',
  stage3: 'Save Private Key',
  /*
  ** Create wallet stage1
  */
  st1Title: 'Enter a Password',
  st1Note1:
    'This password encrypts your private key. This does not act as a seed to generate your keys.',
  st1Note2:
    'You will need this password and your private key to unlock your wallet.',
  st1InputPH: 'Please Enter at least 6 characters',
  st1Btn: 'Create New Wallet',
  /*
  ** Create wallet stage2
  */
  st2Title: 'Save Your Keystore File',
  st2Note1:
    'Do not lose it! VNT Foundation cannot help you recover a lost key.',
  st2Note2:
    'Do not share it! Your funds may be stolen if you use this file a malicious site',
  st2Note3: 'Make a backup!',
  st2Btn1: 'Download Keystore File',
  st2Btn2: "I've downloaded, next",
  /*
  ** Create wallet stage3
  */
  st3Title: 'Save Your Private Key',
  st3Note1:
    'Do not lose it! VNT Foundation cannot help you recover a lost key.',
  st3Note2:
    'Do not share it! Your funds may be stolen if you use this file a malicious site',
  st3Note3: 'Make a backup!',
  st3Btn1: 'Print Paper Wallet',
  st3Btn2: 'All set. Continue!',

  /*
  ** Block list page
  */
  blpTitle: 'Blocks',
  blpSubTitle: num => `A Total of ${num} Block${num > 1 ? 's' : ''}`,
  blpColumn1: 'Block Number',
  blpColumn2: 'Block Age',
  blpColumn3: 'Transactions',
  blpColumn4: 'Producer',
  blpColumn5: 'Block Reward',
  blpColumn6: 'Capacity',

  /*
  ** Block detail page
  */
  bdpTitle: 'Block Number',
  bdpField1: 'Timestamp',
  bdpField2: 'Transactions',
  bdpField3: 'Hash',
  bdpField4: 'Parent Hash',
  bdpField5: 'Producer',
  bdpField6: 'Capacity',
  bdpField7: 'Gas Used',
  bdpField8: 'Gas Limit',
  bdpField9: 'Block Reward',
  bdpField10: 'Extra Data',

  /*
  ** Tx list page
  */
  tlpTitle: 'Transactions',
  tlpSubTitle: num => `A Total of ${num} Transaction${num > 1 ? 's' : ''}`,
  tlpColumn1: 'TxHash',
  tlpColumn2: 'Block Number',
  tlpColumn3: 'Age',
  tlpColumn4: 'From ',
  tlpColumn5: 'To ',
  tlpColumn6: 'Value',
  txFilterByBlock: 'Block',
  tlpSubTitleBlock: num => `Block ${num}: `,
  txFilterByBlockSub: num =>
    `A Total of ${num} Transaction${num > 1 ? 's' : ''}`,
  tlpColumn01: 'Amount',

  /*
  ** Tx detail page
  */
  tdpTitle: 'Transactions',
  tdpField1: 'Transaction Hash',
  tdpField2: 'Status',
  tdpField3: 'Block Number',
  tdpField4: 'Timestamp',
  tdpField5: 'From ',
  tdpField6: 'To ',
  tdpField7: 'Transfer',
  tdpField8: 'Value',
  tdpField9: 'Gas Limit',
  tdpField10: 'Gas Used',
  tdpField11: 'Gas Price',
  tdpField12: 'Nonce',
  tdpField13: 'Input Data',
  tdpField14: ' Token Amount',
  tdpField15: 'Contract ',
  tdpField16: 'Token Contract ',
  txSuccess: 'success',
  txFailed: 'failed',
  tdpField17: 'Index',

  /*
  ** Account list page
  */
  alpTitle: 'Accounts',
  alpSubTitle: num => `A Total of ${num} Account${num > 1 ? 's' : ''}`,
  alpColumn1: '#',
  alpColumn2: 'Address',
  alpColumn3: 'Balance',
  alpColumn4: 'Percentage',
  alpColumn5: 'Transactions',

  /*
  ** Account detail page
  */
  adpField1: 'Addresses',
  adpField2: 'Balance',
  adpField3: 'Transactions',
  adpField4: 'Transactions',
  adpField5: 'Token Txs',
  adpField6: 'Token Balance',
  adpField7: 'Token',
  adpField8: 'Price',
  adpField9: 'Value in VNT',
  adpCount1: num => `A Total of ${num} Tx${num > 1 ? 's' : ''}`,
  adpCount2: num => `A Total of ${num} Token Tx${num > 1 ? 's' : ''}`,
  adpCount3: num => `A Total of ${num} Token${num > 1 ? 's' : ''}`,

  /*
  ** Contract list page
  */
  clpTitle: 'Contracts',
  clpSubTitle: num => `A Total of ${num} Contract${num > 1 ? 's' : ''}`,
  clpColumn1: 'Address',
  clpColumn2: 'Contract Name',
  clpColumn3: 'Balance',
  clpColumn4: 'TxCount',

  /*
  ** Contract detail page
  */
  cdpField1: 'Contract Code',
  cdpColumn3: 'Owner',
  cdpColumn4: 'Creator Tx',

  /*
  ** Token list page
  */
  tklpColumn0: '#',
  tklpTitle: 'Token',
  tklpSubTitle: num => `${num} token${num > 1 ? 's' : ''} in total`,
  tklpColumn1: 'Total Supply',
  tklpColumn2: 'Holders',
  tklpColumn3: 'Address',
  tklpColumn4: 'Total Supply:',
  tklpColumn5: 'Holders:',
  tklpColumn6: 'Contract Address:',
  tklpColumn7: 'Home Page:',

  /*
  ** Token detail page
  */
  tkdpField1: 'Contract Code',
  tkdpSubTitle: num => `${num} holder${num > 1 ? 's' : ''} in total`,
  tkdpField2: 'Holders',
  tkdpField3: 'Amount',
  tkdpField4: 'Percentage',

  /*
  ** Token detail page - holders
  */
  tkdphField1: 'Ranking',
  tkdphField2: 'Address',
  tkdphField3: 'Amount',
  tkdphField4: 'Percentage',

  /*
  ** Developer guide page
  */
  dgTitle: 'VNT开发者指南',
  dgNav1: 'VNT介绍',
  dgNav2: '网络搭建',
  dgNav3: '共识投票',
  dgNav4: 'DAPP开发指南',
  dgNav4Sub1: '如何开发合约',
  dgNav4Sub2: '如何编译合约',
  dgNav4Sub3: '如何部署调用合约',
  dgNav5: '加入VNT Hubble测试网',

  /*
  ** Super Node page
  */
  snTitle: 'Super Nodes',
  snSubTitleComp1: 'Super nodes: ',
  snSubTitleComp2: 'Candidate nodes: ',
  snSubTitleComp3: 'Total: ',
  snNav1: 'List',
  snNav2: 'Map',
  snColumn1: 'Ranking',
  snColumn2: 'Name',
  snColumn3: 'Votes',
  snColumn4: 'Percentage',
  snColumn5: 'Status',

  /*
  ** Test network faucet
  */
  tnfBanner: 'VNT Faucet',
  tnfTitle: 'Enter your testnet account address',
  tnfPlaceholder1: 'Testnet account address',
  tnfBtn: 'Claim',
  successInfo: 'Submitted Successfully!',

  /*
  ** error message
  */
  system_err: 'System error!',
  wrong_address: 'Wrong address format!',
  duplicated_send: 'Ongoing sending, please check again later!',
  send_over_frequent: 'Too frequent, only once per day is allowed!',
  system_nonce_err: 'Obtaining tx nonce failed, please contact the admin!',
  system_sign_err: 'Signing tx failed, please contact the admin!',
  system_tx_send_err: 'Sending tx failed, please contact the admin!',
  wrong_keyword: 'Wrong format of keyword, please check again!',
  search_err: 'Search error!',
  not_found: 'Not found!',

  /*
  ** Open wallet
  */
  owBanner: '打开你的钱包',
  owTitle: '请选择打开钱包的方式：',
  owMethod1: 'Keystore File',
  owMethod1Field1: '请选择Keystore文件：',
  owMethod1Field2: 'Select File',
  owMethod1Field3: '请输入密码：',
  owMethod1Ph: 'Please input password',
  owMethod2: 'Private Key',
  owMethod2Field1: '请输入私钥：',
  owMethod2Ph: '请输入你的钱包私钥',
  owBtn: '打开钱包',

  /*
  ** Wallet account
  */
  waTitle: 'Wallet Account',
  waField1: 'Balance',
  waField2: 'Address',
  waField3: 'Send/Receive',
  waBtn1: 'Send',
  waBtn2: 'Receive'
}
