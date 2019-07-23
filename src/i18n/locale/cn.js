export default {
  language: '简体中文',

  blank: '',
  rank: '#',
  confirmPage: '确定',
  /*
  ** Prompt msg
  */
  copy: '复制成功!',
  pkErr: '打开钱包失败',
  invalidAddr: '地址格式错误',
  txSended: '交易已发送，请稍后查询交易结果...',
  goBack: '返回',

  /*
  ** Header Fields
  */
  logoText: '维特链浏览器',
  vote: '节点投票',
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
  nav2Sub3: '测试网水龙头',
  nav3: '钱包',
  nav3Sub1: '创建钱包',
  nav3Sub2: '打开钱包',
  nav3AuthSub1: '钱包账户',
  nav3AuthSub2: '发送',
  nav3AuthSub3: '接收',
  nav3AuthSub4: '退出登录',
  nav4: '更多',
  nav4Sub1: 'VNT官网',
  nav4Sub2: 'VNT Box',
  nav4Sub3: '主网映射',
  hdSearchPh: '搜索地址，区块，交易', // placeholder for header search box
  nav5: '主网',
  nav5Sub1: '主网',
  nav5Sub2: '测试网',
  nav6Sub1: '简体中文',

  /*
  ** Home banner
  */
  hbFieldHeight: '区块高度',
  hbFieldTxCount: '交易数',
  hbFieldAccountCount: '总账户数',
  hbFieldCurrTps: '当前/历史峰值 TPS',
  hbFieldMarketCapCny: 'VNT 市值',
  hbFieldAvailableSupply: 'VNT 流通量',
  hbFieldPriceCny: 'VNT 价格（24h涨跌）',
  hbFieldSuperNode: '超级节点(即将开放)',
  hbFieldUnit: ' 万',
  hbFieldFlag: '￥ ',
  /*
  ** Home brief info box (left and right)
  */
  lTitle: '最新出块',
  lField1: '查看全部 >',
  lField2: '交易数：',
  lField3: '区块奖励 ',
  lField4: '出块者：',
  lField5: '该区块内的交易',
  lField6: '出块奖励',
  lField7: '手续费',

  rTitle: '交易',
  rField1: '查看全部  >',
  rField2: '发送方：',
  rField3: '接收方：',
  rField4: '价值：',
  /*
  ** Home chart
  */
  chartTitle: 'VNT 14天内行情走势',

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
  st1InputPH: '请输入 8-16 位字符，包含字母和数字',
  st1NoteError1: '至少包含一个数字',
  st1NoteError2: '至少包含一个字母',
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
  bdpHeader: '区块',
  blpTitle: '区块',
  blpSubTitle: num => `当前共${num}区块`,
  blpColumn1: '区块编号',
  blpColumn2: '块龄',
  blpColumn3: '交易',
  blpColumn4: '出块者',
  blpColumn5: '区块奖励',
  blpColumn6: '容量',

  /*
  ** Block detail page
  */
  bdpTitle: '区块编号',
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
  bdpField11: '见证人切换时间 ：',
  /*
  ** Tx list page
  */
  tlpTitle: '交易',
  tlpSubTitle: num => `当前共${num}交易`,
  tlpColumn1: '交易哈希值',
  tlpColumn2: '区块编号',
  tlpColumn3: '块龄',
  tlpColumn4: '发送方 ',
  tlpColumn5: '接收方 ',
  tlpColumn6: '价值',
  txFilterByBlock: '区块',
  txFilterByBlockSub: num => `共 ${num} 交易`,
  tlpSubTitleBlock: num => `区块${num}：`,
  txFilterByAccount: '地址',
  txFilterByAccountSub: num => `共 ${num} 交易`,
  tlpColumn01: '数量',
  contractToolTip: '合约',
  /*
  ** Tx detail page
  */
  tdpTitle: '交易',
  tdpField1: '交易哈希值',
  tdpField2: '状态',
  tdpField3: '区块编号',
  tdpField4: '时间戳',
  tdpField5: '发送方 ',
  tdpField6: '接收方 ',
  tdpField7: '代币转移',
  tdpField8: '价值',
  tdpField9: '燃料限制',
  tdpField10: '实际消耗燃料',
  tdpField11: '燃料价格',
  tdpField12: 'Nonce',
  tdpField13: '数据输入',
  tdpField14: ' 代币数量',
  tdpField15: '合约 ',
  tdpField16: '代币合约 ',
  txSuccess: '成功',
  txFailed: '失败',
  tdpField17: '交易序号',

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
  adpField10: '备注',
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
  cdpTitle: '合约',
  cdpField1: '合约代码',
  cdpColumn3: '合约创建者：',
  cdpColumn4: '创建于交易：',

  /*
  ** Token list page
  */
  tklpColumn0: '#',
  tklpTitle: '代币',
  tklpSubTitle: num => `当前共 ${num} 代币`,
  tklpColumn1: '代币总量',
  tklpColumn2: '持有地址',
  tklpColumn3: '合约地址',
  tklpColumn4: '总供应量:',
  tklpColumn5: '持有地址:',
  tklpColumn6: '合约:',
  tklpColumn7: '官网:',

  /*
  ** Token detail page
  */
  tkdpField1: '合约代码',
  tkdpSubTitle: num => `当前共 ${num} 持有人`,
  tkdpField2: '持有人',
  tkdpField3: '数量',
  tkdpField4: '百分比',

  /*
  ** Token detail page - holders
  */
  tkdphField1: '排名',
  tkdphField2: '地址',
  tkdphField3: '数量',
  tkdphField4: '百分比',

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
  dgNav6: '钱包插件',
  dgNav6Sub1: '安装',
  dgNav6Sub2: '使用方法',
  dgNav7: '加入VNT Hubble主网',

  /*
  ** Super Node page
  */
  snTitle: '超级节点',
  snSubTitleComp1: '超级节点：',
  snSubTitleComp2: '候选节点：',
  snSubTitleComp3: '总计：',
  snNav1: '列表',
  snNav2: '地图',
  snColumn1: '排名',
  snColumn2: '名称',
  snColumn3: '票数',
  snColumn4: '得票率',
  snColumn5: '状态',

  /*
  ** Test network faucet
  */
  tnfBanner: '测试网水龙头',
  tnfBannerSubTitle: '立即领取',
  tnfTitle: '填写测试网账户地址获得VNT测试币',
  tnfPlaceholder1: '测试网账户地址',
  tnfBtn: '立即提交',
  successInfo: '提交成功，请在账户页面查询',

  /*
  ** error message
  */
  system_err: '系统错误',
  wrong_address: '地址格式错误，请提供有效地址或',
  new_address: '创建一个新地址',
  duplicated_send: '正在发送中，请稍后查看',
  send_over_frequent: '发送太频繁，一天只能发送一次',
  system_nonce_err: '获取交易 nonce 失败，请联系管理员',
  system_sign_err: '交易签名失败，请联系管理员',
  system_tx_send_err: '交易发送失败，请联系管理员',
  wrong_keyword: '关键字格式错误，请输入合法的关键字',
  search_err: '搜索错误',
  not_found: '不存在',

  /*
  ** Open wallet
  */
  owBanner: '打开你的钱包',
  owTitle: '请选择打开钱包的方式：',
  owMethod1: 'Keystore 文件',
  owMethod1Field1: '请选择Keystore文件：',
  owMethod1Field2: '选择文件',
  owMethod1Field3: '请输入密码：',
  owMethod1Ph: '请输入密码',
  owMethod2: '私钥',
  owMethod2Field1: '请输入私钥：',
  owMethod2Ph: '请输入你的钱包私钥',
  owBtn: '打开钱包',

  /*
  ** Wallet account
  */
  waTitle: '钱包账户',
  waField1: '可用余额',
  waField2: '地址',
  waField3: '发送/接收',
  waBtn1: '发送',
  waBtn2: '接收',

  /*
  ** Receive page
  */
  rpBanner: '接收',
  rpTitle1: '钱包账户地址',
  rpTitle2: '地址二维码',

  /*
  ** Send page
  */
  spBanner: '发送',
  spTitle1: '钱包账户地址',
  spTitle2: '接收账户',
  spPh1: '请输入接收账户地址',
  spTitle3: '币种',
  spTitle4: '数量',
  spPh2: '请输入数量',
  spTitle5: '附加信息',
  spPh3: '选填',
  sendTip: '最少发送 : ',
  spField1: '可用余额：',
  spBtn1: '全部',
  spBtn2: '确认发送',

  /*
  ** partners 
  */
  partners: '合作伙伴',

  /*
  ** footer 
  */
  footerLogoText: '分布式智能价值网络',
  subscribe_hint: '订阅我们获取更多VNT Chain信息',
  footerPlaceholder: '邮件地址',
  submitBtn: '提交',
  inputSyntaxError: '邮箱格式不合法',
  submit_success: '提交成功',
  submit_failed: '提交失败',
  nav_home: '首页',
  nav_tech: '技术',
  nav_developer: '开发者',
  nav_news: '新闻',
  nav_community: '社区',
  nav_cooperation: '合作',
  nav_about: '关于我们'
}
