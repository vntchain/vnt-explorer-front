export default {
  create: {
    mainTitle: ['创建新的钱包', 'Create New Wallet'],
    steps: [
      ['输入密码', 'Input Password'],
      ['保存文件', 'Save Keystore'],
      ['保存私钥', 'Save Private Key']
    ],
    password: {
      title: ['请输入密码', 'Enter a password'],
      buttonName: ['创建钱包', 'Create New Wallet'],
      notes: [
        ['密码用于加密你的私钥，不作为生成私钥的种子', 'placeholder0'],
        ['你需要密码+私钥解锁你的钱包', 'placeholder1']
      ],
      inputPlaceholder: ['请输入高强度密码', 'placeholder2']
    },
    keystore: {
      title: ['请保存你的Keystore文件', 'placeholder0'],
      buttonName: ['下载Keystore文件', 'placeholder1'],
      notes: [
        ['请勿遗失Keystore文件，丢失后无法找回', 'placeholder2'],
        [
          '请勿分享Keystore文件，否则你的数字资产可能面临被盗风险',
          'placeholder3'
        ],
        ['请及时备份你的Keystore文件', 'placeholder4']
      ],
      buttonNext: ['我已下载，下一步', 'placeholder5']
    },
    privateKey: {
      title: ['请保存你的私钥', 'placeholder0'],
      buttonName: ['打印纸钱包', 'placeholder1'],
      notes: [
        ['请勿遗失私钥，丢失后无法找回', 'placeholder2'],
        ['请勿分享私钥，否则您的数字资产可能面临被盗风险', 'placeholder3'],
        ['请及时备份私钥', 'placeholder4']
      ],
      buttonNext: ['全部就绪，进入账户页面', 'placeholder5']
    }
  },
  open: {
    mainTitle: ['打开你的钱包', 'Open Your Wallet'],
    title1: ['请选择打开钱包的方式', 'placeholder0'],
    title2: ['请输入私钥', 'placeholder1'],
    inputPlaceholder1: ['请输入密码', 'placeholder2'],
    inputPlaceholder2: ['请输入你的钱包私钥', 'placeholder3'],
    btn1: ['Keystore 文件', 'Keystore file'],
    btn2: ['私钥', 'Private Key'],
    title3: ['请选择Keystore文件', 'placeholder4'],
    title4: ['请输入密码', 'placeholder5'],
    btn3: ['打开钱包', 'Open Wallet'],
    upload: ['选择文件', 'Select File']
  },
  receive: {
    main: ['接收', 'Receive'],
    title1: ['钱包账户地址', 'Wallet Address'],
    title2: ['地址二维码', 'Address QRCode']
  },
  send: {
    main: ['发送', 'Send'],
    title1: ['钱包账户地址', 'Wallet Address'],
    title2: ['接收账户', 'Receiver Account'],
    title3: ['币种', 'Currency'],
    title4: ['数量', 'Amount'],
    title5: ['附加信息', 'Additional information'],
    btn1: ['全部', 'All'],
    btn2: ['确认发送', 'Confirm Sending'],
    ph1: ['请输入账户地址', 'Input Account Address'],
    ph2: ['请输入数量', 'Input Amount'],
    ph3: ['选填', 'Optional'],
    balance: ['可用余额', 'Balance']
  }
}
