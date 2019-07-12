export default {
  language: 'English',

  blank: '',
  rank: '#',
  confirmPage: 'OK',

  /*
  ** Prompt msg
  */
  copy: 'Copied!',
  pkErr: 'Failed to open wallet!',
  invalidAddr: 'Invalid address!',
  txSended:
    'Transaction has been sended, detailed information should be available soon...',
  goBack: 'Back',

  /*
  ** Header Fields
  */
  logoText: '',
  vote: 'Vote',
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
  nav4: 'More',
  nav4Sub1: 'VNT Official Website',
  nav4Sub2: 'VNT Box',
  hdSearchPh: 'Search address, block, transaction', // placeholder for header search box
  nav5: 'MainNet',
  nav5Sub1: 'MainNet',
  nav5Sub2: 'TestNet',
  /*
 ** Home banner
 */
  hbFieldHeight: 'Block Height',
  hbFieldTxCount: 'Transactions',
  hbFieldAccountCount: 'Total Accounts',
  hbFieldCurrTps: 'Current/Max TPS',
  hbFieldMarketCapCny: 'Market Cap',
  hbFieldAvailableSupply: 'Circulating Supply',
  hbFieldPriceCny: 'Price（24h Change）',
  hbFieldSuperNode: 'Super/Candidate Nodes',
  hbFieldUnit: ' k',
  hbFieldFlag: '$ ',
  /*
 ** Home brief info box (left and right)
 */
  lTitle: 'Latest Blocks',
  lField1: 'View All >',
  lField2: 'Transactions: ',
  lField3: 'Block Reward ',
  lField4: 'Produced by: ',
  lField5: 'Transactions in this Block',
  lField6: 'Static Block Reward',
  lField7: 'Txn Fees',

  rTitle: 'Transactions',
  rField1: 'View All >',
  rField2: 'From: ',
  rField3: 'To: ',
  rField4: 'Value: ',
  /*
  ** Home chart
  */
  chartTitle: 'VNT Price Charts（14 days）',

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
  st1InputPH: 'Use 8 to 16 characters with letters and numbers',
  st1NoteError1: 'Must contain at least one number',
  st1NoteError2: 'Must contain at least one letter',
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
  bdpHeader: 'Block',
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
  bdpField11: 'Witness Switching Time ：',

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
  contractToolTip: 'contract',

  /*
  ** Tx detail page
  */
  tdpTitle: 'Transaction',
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
  alpColumn1: 'Rank',
  alpColumn2: 'Address',
  alpColumn3: 'Balance',
  alpColumn4: 'Percentage',
  alpColumn5: 'Transactions',

  /*
  ** Account detail page
  */
  adpField1: 'Address',
  adpField2: 'Balance',
  adpField3: 'Transactions',
  adpField4: 'Transactions',
  adpField5: 'Token Txs',
  adpField6: 'Token Balance',
  adpField7: 'Token',
  adpField8: 'Price',
  adpField9: 'Value in VNT',
  adpField10: 'Memo',
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
  cdpTitle: 'Contract',
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
  dgTitle: 'VNT Developer Guidlines',
  dgNav1: 'VNT Introduction',
  dgNav2: 'Network Setup',
  dgNav3: 'Vote and Consensus',
  dgNav4: 'DAPP Development',
  dgNav4Sub1: 'How to Create a Smart Contract',
  dgNav4Sub2: 'How to Build a Smart Contract',
  dgNav4Sub3: 'How to Deploy a Smart Contract',
  dgNav5: 'Join the Hubble VNT Testnet',
  dgNav6: 'Wallet plugin',
  dgNav6Sub1: 'Installation',
  dgNav6Sub2: 'Instructions',
  dgNav7: 'Join the Hubble VNT network',

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
  tnfBannerSubTitle: 'Get it now',
  tnfTitle: 'Enter your testnet account address',
  tnfPlaceholder1: 'Testnet account address',
  tnfBtn: 'Claim',
  successInfo: 'Submitted successfully, please check from account page!',

  /*
  ** error message
  */
  system_err: 'System error!',
  wrong_address: 'Wrong address format, please input valid address or ',
  new_address: 'create a new one',
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
  owBanner: 'Open your wallet',
  owTitle: 'Select type: ',
  owMethod1: 'Keystore File',
  owMethod1Field1: 'Choose Keystore file：',
  owMethod1Field2: 'Select File',
  owMethod1Field3: 'Please input password：',
  owMethod1Ph: 'Please input password',
  owMethod2: 'Private Key',
  owMethod2Field1: 'Please input private key: ',
  owMethod2Ph: 'Please input your wallet password',
  owBtn: 'Open wallet',

  /*
  ** Wallet account
  */
  waTitle: 'Wallet Account',
  waField1: 'Balance',
  waField2: 'Address',
  waField3: 'Send/Receive',
  waBtn1: 'Send',
  waBtn2: 'Receive',

  /*
  ** Receive page
  */
  rpBanner: 'Receive',
  rpTitle1: 'Wallet Address',
  rpTitle2: 'Address QRCode',

  /*
  ** Send page
  */
  spBanner: 'Send',
  spTitle1: 'Wallet Address',
  spTitle2: 'Receiver Address',
  spPh1: 'Receiver Address',
  spTitle3: 'Currency',
  spTitle4: 'Amount',
  spPh2: 'Amount',
  spTitle5: 'Additional',
  spPh3: 'Optional',
  sendTip: 'Send At Least : ',
  spField1: 'Balance: ',
  spBtn1: 'All',
  spBtn2: 'Confirmed',

  /*
  ** partners 
  */
  partners: 'Business Partner',

  /*
  ** footer 
  */
  footerLogoText: 'Distributed Smart Value Network',
  subscribe_hint: 'Subscribe for more VNT Chain Infomation',
  footerPlaceholder: 'Enter your email',
  submitBtn: 'Submit',
  inputSyntaxError: 'Invalid Email Address',
  submit_success: 'Thank you for subscribing',
  submit_failed: 'Submit failed',
  nav_home: 'Home',
  nav_tech: 'Technology',
  nav_developer: 'Developer',
  nav_news: 'News',
  nav_community: 'Community',
  nav_cooperation: 'Cooperation',
  nav_about: 'About Us'
}
