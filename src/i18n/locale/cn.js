export default {
  language: 'EN',

  /*
  ** Header Fields
  */
  nav1: '区块链',
  nav1Sub1: '概览',
  nav1Sub2: '区块',
  nav1Sub3: '交易',
  nav1Sub4: '账户',
  nav1Sub5: '合约',
  nav1Sub6: '代币',
  nav1Sub7: '超级节点',
  nav2: '开发者',
  nav2Sub1: 'VNT开发者指南',
  nav2Sub2: '合约工具',
  nav3: '钱包',
  nav3Sub1: '创建钱包',
  nav3Sub2: '打开钱包',
  nav3AuthSub1: '钱包账户',
  nav3AuthSub2: '发送',
  nav3AuthSub3: '接收',
  nav3AuthSub4: '退出登录',
  hdSearchPh: '搜索地址，区块，交易', // placeholder for header search box
  /*
  ** Home banner
  */
  hbField1: '区块高度',
  hbField2: '交易数',
  hbField3: '当前/峰值 TPS',
  hbField4: '总账户数',
  hbField5: '超级节点/候选节点',
  /*
  ** Home brief info box (left and right)
  */
  lTitle: '区块',
  lField1: '查看全部 >',
  lField2: '交易数：',
  lField3: '区块奖励 ',
  lField4: '出块者：',

  rTitle: '交易',
  rField1: '查看全部  >',
  rField2: '发送方：',
  rField3: '接收方：',
  rField4: '数额：',
  /*
  ** Home chart
  */
  chartTitle: 'VNT 14天内交易历史',

  /*
  ** Create wallet
  */
  CWBanner: '创建新的钱包',
  stage1: '输入密码',
  stage2: '保存文件',
  stage3: '保存私钥',
  /*
  ** Create wallet stage1
  */
  st1Title: '请输入密码',
  st1Note1: '密码用于加密你的私钥，不作为生成私钥的种子',
  st1Note2: '你需要密码+私钥解锁你的钱包',
  st1InputPH: '请输入至少 6 位字符',
  st1Btn: '创建钱包',
  /*
  ** Create wallet stage2
  */
  st2Title: '请保存你的Keystore文件',
  st2Note1: '请勿遗失Keystore文件，丢失后无法找回',
  st2Note2: '请勿分享Keystore文件，否则你的数字资产可能面临被盗风险',
  st2Note3: '请及时备份你的Keystore文件',
  st2Btn1: '下载Keystore文件',
  st2Btn2: '我已下载，下一步',
  /*
  ** Create wallet stage3
  */
  st3Title: '请保存你的私钥',
  st3Note1: '请勿遗失私钥，丢失后无法找回',
  st3Note2: '请勿分享私钥，否则您的数字资产可能面临被盗风险',
  st3Note3: '请及时备份私钥',
  st3Btn1: '打印纸钱包',
  st3Btn2: '全部就绪，进入账户页面',

  /*
  ** Block list page
  */
  blpTitle: '区块',
  blpSubTitle: num => `当前共${num}区块`,
  blpColumn1: '区块高度',
  blpColumn2: '块龄',
  blpColumn3: '交易',
  blpColumn4: '出块者',
  blpColumn5: '区块奖励',
  blpColumn6: '容量',

  /*
  ** Block detail page
  */
  bdpTitle: '高度',
  bdpField1: '时间戳',
  bdpField2: '交易',
  bdpField3: '哈希值',
  bdpField4: '父哈希值',
  bdpField5: '出块者',
  bdpField6: '容量',
  bdpField7: '燃料费用',
  bdpField8: '燃料限制',
  bdpField9: '区块奖励',
  bdpField10: '额外数据',

  /*
  ** Tx list page
  */
  tlpTitle: '交易',
  tlpSubTitle: num => `当前共${num}交易`,
  tlpColumn1: '交易哈希值',
  tlpColumn2: '区块',
  tlpColumn3: '块龄',
  tlpColumn4: '发送方 ',
  tlpColumn5: '接收方 ',
  tlpColumn6: '价值',
  txFilterByBlock: '区块',
  txFilterByBlockSub: num => `共 ${num} 交易`,
  txFilterByAccount: '地址',
  txFilterByAccountSub: num => `共 ${num} 交易`,

  /*
  ** Tx detail page
  */
  tdpTitle: '交易',
  tdpField1: '交易哈希值',
  tdpField2: '状态',
  tdpField3: '区块高度',
  tdpField4: '时间戳',
  tdpField5: '发送方 ',
  tdpField6: '接收方 ',
  tdpField7: '代币转移',
  tdpField8: '价值',
  tdpField9: '燃料限制',
  tdpField10: '交易燃料费用',
  tdpField11: '燃料价格',
  tdpField12: '随机数',
  tdpField13: '数据输入',
  tdpField14: ' 代币数量',

  /*
  ** Account list page
  */
  alpTitle: '账户',
  alpSubTitle: num => `当前共${num}账户`,
  alpColumn1: '排名',
  alpColumn2: '地址',
  alpColumn3: '余额',
  alpColumn4: '百分比',
  alpColumn5: '交易数量',

  /*
  ** Account detail page
  */
  adpField1: '地址',
  adpField2: '余额',
  adpField3: '交易',
  adpField4: '交易',
  adpField5: '代币交易',
  adpField6: '代币余额',
  adpField7: '代币',
  adpField8: '价格',
  adpField9: 'Value in VNT',
  adpCount1: num => `当前共${num}交易`,
  adpCount2: num => `当前共${num}代币交易`,
  adpCount3: num => `当前共${num}代币`,

  /*
  ** Contract list page
  */
  clpTitle: '合约',
  clpSubTitle: num => `当前共 ${num} 合约`,
  clpColumn1: '地址',
  clpColumn2: '合约名称',
  clpColumn3: '余额',
  clpColumn4: '交易数量',

  /*
  ** Contract detail page
  */
  cdpField1: '合约代码',

  /*
  ** Token list page
  */
  tlpTitle: '代币',
  tlpSubTitle: num => `当前共 ${num} 代币`,
  tlpColumn1: '代币总量',
  tlpColumn2: '持有地址',
  tlpColumn3: '合约地址',

  /*
  ** Contract detail page
  */
  tdpField1: '合约代码'
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
  dgNav4Sub3: '如何部署调用合约'
}
