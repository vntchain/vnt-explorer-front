# 如何加入VNT Hubble主网

本文目录：

- [主网基本信息](#主网基本信息)
- [加入主网](#加入主网)
- [其他资料](#其他资料)

## 主网基本信息

VNT Hubble主由19个见证人节点组成，负责执行交易和打包区块，部署了3个公共全节点，并开启了RPC服务，查询和发送交易时可以使用这些公共全节点。

19个初始的见证人P2P地址：

```bash
"/ip4/47.106.71.114/tcp/3001/ipfs/1kHfbk8u12U1HSyaqAe6f622wVMESHcvFZ8VcbGKwsrtT6H",
"/ip4/47.108.69.101/tcp/3001/ipfs/1kHb7UpvD2zbEgCCPzboTtJLENQ1YhEZ1H2A7QNTb18sHd4",
"/ip4/47.108.67.119/tcp/3001/ipfs/1kHjhzoNTxEpFvRky1oVvCUAPBUuGzBvBcXmkroDU9NhACg",
"/ip4/39.100.143.156/tcp/3001/ipfs/1kHG1essWxbjSUjwKMrJcva6Y7XfPoBN86pUemd4wnd2X2A",
"/ip4/118.190.59.122/tcp/3001/ipfs/1kHBXTtDX4JqStm4qBNCcCZar9isCyu74BPgX6b2odm7zw7",
"/ip4/118.190.59.100/tcp/3001/ipfs/1kHWbCuCgjLnERsaVr7FCSAWFiA7Sx1CdzstMQKKkEWdYSr",
"/ip4/47.56.69.191/tcp/3001/ipfs/1kHcupmVj3eLe6QdgrXRn5qetpQQc4XhYc6LXNhQUkRCDK5",
"/ip4/39.97.171.233/tcp/3001/ipfs/1kHDnV8YSUrHNLf6NGWY7QHxBjMLnKPxKFKvMdPLt1Gg7a6",
"/ip4/47.103.107.188/tcp/3001/ipfs/1kHTKpK29Kw2EvJ3C817yn6wNDgpXw6oWAkUz8AzAozrVHD",
"/ip4/47.103.57.160/tcp/3001/ipfs/1kHD3RiEFGZE2SQQgGhX1yzipcR8sE6cSaTj3Xi1yvF1EBL",
"/ip4/47.254.235.57/tcp/3001/ipfs/1kHMwGapAtV92rXgkxRx4dgjUZnXVtE6wUa8Bk3yzFYLz4h",
"/ip4/120.77.236.120/tcp/3001/ipfs/1kHHW1DrdwETgtZmDdERZEDgKiAfP2SDfxz2oKuzjuJK2B9",
"/ip4/47.111.131.2/tcp/3001/ipfs/1kHCcTMZ8EjRm23nffDsYEEARohWwF4ks6zdsaBs3JbzKnA",
"/ip4/47.88.217.237/tcp/3001/ipfs/1kHVYJ6tckDB5gChvDFo46esBWzz6aWsMaEXfxJPNwruHWZ",
"/ip4/47.91.19.11/tcp/3001/ipfs/1kHBa9E1onVKmruWvefJHSNFGokkNc3ESZebnq2oJFRDFDG",
"/ip4/47.254.20.76/tcp/3001/ipfs/1kHKUGfEQ4nzpWG4SkQAUPicrKHCVo32WTgNEQbM75rNEbx",
"/ip4/47.93.191.135/tcp/3001/ipfs/1kHVzyb8mczCYNB3suPCXac7HMPEc4XyvibHE2hQsh8ehEk",
"/ip4/101.132.191.42/tcp/3001/ipfs/1kHCoMGo8ANpjFNMyYFZLTHruBJ5DrAXYVBvfQP2CZWKf6h",
"/ip4/39.104.62.26/tcp/3001/ipfs/1kHHvSatMYVHDdDFNmMyta8tNY4c4VvtifkBAxfjNG7wSpU"
```

2个公共全节点的P2P地址，可做引导节点（vntbootnode）:

```bash
/ip4/39.97.235.82/tcp/3001/ipfs/1kHaSHxTJGAWKgk69Dk4a3BZzzJvVMfzsDHehyJDgm4tXQ8
/ip4/47.111.137.127/tcp/3001/ipfs/1kHeSvsAiMe33UYipYQVGGvE2akfBspD6fnNq9uWRquEMqY
```

2个公共全节点的RPC信息是：

```bash
39.97.235.82:8880
47.111.137.127:8880
```

## 加入主网

我们欢迎任何人加入到Hubble主网，加入主网的步骤如下：

第一步：部署节点首先要克隆`go-vnt`源码，具体安装和编译请关注go-vnt项目[README.md](<https://github.com/vntchain/go-vnt#%E4%BB%8E%E6%BA%90%E7%A0%81%E5%AE%89%E8%A3%85gvnt>)。

第二步：创建并进入节点目录。

```bash
cd ~
mkdir vntnode
cd vntnode
```

第三步：使用`init.json`文件初始化节点，测试网`init.json`内容如下：

```json
{
    "config": {
        "chainId": 1,
        "dpos": {
            "period": 2,
            "witnessesnum": 19,
            "witnessesUrl": [
"/ip4/47.106.71.114/tcp/3001/ipfs/1kHfbk8u12U1HSyaqAe6f622wVMESHcvFZ8VcbGKwsrtT6H",
"/ip4/47.108.69.101/tcp/3001/ipfs/1kHb7UpvD2zbEgCCPzboTtJLENQ1YhEZ1H2A7QNTb18sHd4",
"/ip4/47.108.67.119/tcp/3001/ipfs/1kHjhzoNTxEpFvRky1oVvCUAPBUuGzBvBcXmkroDU9NhACg",
"/ip4/39.100.143.156/tcp/3001/ipfs/1kHG1essWxbjSUjwKMrJcva6Y7XfPoBN86pUemd4wnd2X2A",
"/ip4/118.190.59.122/tcp/3001/ipfs/1kHBXTtDX4JqStm4qBNCcCZar9isCyu74BPgX6b2odm7zw7",
"/ip4/118.190.59.100/tcp/3001/ipfs/1kHWbCuCgjLnERsaVr7FCSAWFiA7Sx1CdzstMQKKkEWdYSr",
"/ip4/47.56.69.191/tcp/3001/ipfs/1kHcupmVj3eLe6QdgrXRn5qetpQQc4XhYc6LXNhQUkRCDK5",
"/ip4/39.97.171.233/tcp/3001/ipfs/1kHDnV8YSUrHNLf6NGWY7QHxBjMLnKPxKFKvMdPLt1Gg7a6",
"/ip4/47.103.107.188/tcp/3001/ipfs/1kHTKpK29Kw2EvJ3C817yn6wNDgpXw6oWAkUz8AzAozrVHD",
"/ip4/47.103.57.160/tcp/3001/ipfs/1kHD3RiEFGZE2SQQgGhX1yzipcR8sE6cSaTj3Xi1yvF1EBL",
"/ip4/47.254.235.57/tcp/3001/ipfs/1kHMwGapAtV92rXgkxRx4dgjUZnXVtE6wUa8Bk3yzFYLz4h",
"/ip4/120.77.236.120/tcp/3001/ipfs/1kHHW1DrdwETgtZmDdERZEDgKiAfP2SDfxz2oKuzjuJK2B9",
"/ip4/47.111.131.2/tcp/3001/ipfs/1kHCcTMZ8EjRm23nffDsYEEARohWwF4ks6zdsaBs3JbzKnA",
"/ip4/47.88.217.237/tcp/3001/ipfs/1kHVYJ6tckDB5gChvDFo46esBWzz6aWsMaEXfxJPNwruHWZ",
"/ip4/47.91.19.11/tcp/3001/ipfs/1kHBa9E1onVKmruWvefJHSNFGokkNc3ESZebnq2oJFRDFDG",
"/ip4/47.254.20.76/tcp/3001/ipfs/1kHKUGfEQ4nzpWG4SkQAUPicrKHCVo32WTgNEQbM75rNEbx",
"/ip4/47.93.191.135/tcp/3001/ipfs/1kHVzyb8mczCYNB3suPCXac7HMPEc4XyvibHE2hQsh8ehEk",
"/ip4/101.132.191.42/tcp/3001/ipfs/1kHCoMGo8ANpjFNMyYFZLTHruBJ5DrAXYVBvfQP2CZWKf6h",
"/ip4/39.104.62.26/tcp/3001/ipfs/1kHHvSatMYVHDdDFNmMyta8tNY4c4VvtifkBAxfjNG7wSpU"
            ]
        }
    },
    "timestamp": "0x5d18dc80",
    "extraData": "0x546f206578706c6f726520737472616e6765206e657720776f726c6473efbc8c746f207365656b206f7574206e6577206c69666520616e64206e657720636976696c697a6174696f6e73efbc8c746f20626f6c646c7920676f207768657265206e6f206f6e652068617320676f6e65206265666f72652e",
    "gasLimit": "0x47b760",
    "difficulty": "0x1",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "08257303e7f2ed7529cb81d2521d70a652e38238": {
            "balance": "0x48ec9b2d230d5a7c00000"
        },
        "09fd5d32fdff6e28e93cd9d9dfbaf5821d15e8d0": {
            "balance": "0x19d971e4fe8401e74000000"
        },
        "0acef1c9182e92ad80618e177f6c3bcac85a7a0a": {
            "balance": "0xf8277896582678ac000000"
        },
        "0e9a4daadb35f37a081f8d48b5d1fc793dc9ea7c": {
            "balance": "0xae09eedac3a019ec00000"
        },
        "0eefec6d3bf82d84dbd0666f5e1db6298a4b1888": {
            "balance": "0x68b01f58f4fdcc3c00000"
        },
        "11556936ebe002f4948c5af40c046565df0fbd74": {
            "balance": "0x33b2e3c9fd0803ce8000000"
        },
        "14f19ea14598e482905f0d1985d4bb37dd413c40": {
            "balance": "0xbe0d928eb933fdf000000"
        },
        "17d72a1ae6aab8d2b59886d3252bea33d1058cb8": {
            "balance": "0x1cda2096bc8fbca800000"
        },
        "28e77afbcdbc628de497a85baa477660e5aa10f4": {
            "balance": "0x1abc06b5f2d50a6800000"
        },
        "2f6fce36a2dda0374c3a292e55d319e5cfc809e5": {
            "balance": "0xf8277896582678ac000000"
        },
        "425fba17477cb54b8d4047bb5930e00d2d5100f5": {
            "balance": "0x4646fad426e3fbac00000"
        },
        "4279408c1ed0ce78fc19a23e22af98208d14374b": {
            "balance": "0x1c747bbc96bcbb3c00000"
        },
        "43a3ede687f505ed106b41626d5b70e1bf550f7d": {
            "balance": "0x1abc06b5f2d50a6800000"
        },
        "4417a444c00b007803196ade124a300470f5fd95": {
            "balance": "0x19d971e4fe8401e74000000"
        },
        "4721b8e0594ca55d21d5de430dc8076820ecb896": {
            "balance": "0x2421998b7201816400000"
        },
        "4bc6af201fad669cd315d18d503a3bb7f555b673": {
            "balance": "0x1c0ed6e270e9b9d000000"
        },
        "4eebc801e52fd63e90ec1660bbe492f6de27e167": {
            "balance": "0x9b60aacdd1e2d71800000"
        },
        "4f6b04717b0dbfd5397266f81fef868ca4c68efd": {
            "balance": "0xf8277896582678ac000000"
        },
        "59879b671e2e034f387f625e7e123828def0d798": {
            "balance": "0xb377112ac88e82b000000"
        },
        "5d4fad8937f72cec3ca46ce1c14349018058213e": {
            "balance": "0xc6205537ba4bc58400000"
        },
        "66a101458305ae2cec192a94751055f025648869": {
            "balance": "0x89a23c233886b411680000"
        },
        "77af92b3bd4acf994d7518c79ae2f303e9b4c6eb": {
            "balance": "0x1adde853ff70b58c00000"
        },
        "7831db47c51c01666a435021888f2dcd04dcf02f": {
            "balance": "0x62120e7a7e965f3400000"
        },
        "8d6ae3764e5d0fdbfcabdd443dcdf300b4574c03": {
            "balance": "0xa56fa5b99019a5c8000000"
        },
        "8e667c898c2f2d7ebf1265652a35638347067754": {
            "balance": "0x95f29ecfdc8d99ddc980000"
        },
        "8eb227bb885ef74b52e6c8a3b6662de641a93cdf": {
            "balance": "0x19d971e4fe8401e74000000"
        },
        "90e1814cbef1aaa66acdab66d94109b12ec5afad": {
            "balance": "0xb5facfe5b81c365c00000"
        },
        "92dc2b4b56ce19a394ca6ff7af42e70296b6813b": {
            "balance": "0xa9027164e484b29400000"
        },
        "93355b1d40b20b92231e1bf2fbcb813ed1810547": {
            "balance": "0x19d971e4fe8401e74000000"
        },
        "983c54b64024bb92f42a065ca55e2d6b408a17be": {
            "balance": "0x33b2e3c9fd0803ce8000000"
        },
        "9b3e39a565f31aa669574668b8302ff500e9b73c": {
            "balance": "0xc0b332e7b55d5cc000000"
        },
        "9d69b5d31f33172435ec20ac847dfb3ba6bf94a4": {
            "balance": "0xa56fa5b99019a5c8000000"
        },
        "a14c79d97e2c58de4499a552a2ec72823ed93db0": {
            "balance": "0x1c6f307be4c4687e6000000"
        },
        "b49eb8f256dce146d6ed2682469e3a97f469575d": {
            "balance": "0x24cb01a1b10bd91800000"
        },
        "c8db01d838946a1be94cc18ff454ed32194cb1b6": {
            "balance": "0x96592d57f2c76fc000000"
        },
        "c9024f109ace4b50c800f857c57538a34eb2728c": {
            "balance": "0x5b521bfdfb93470800000"
        },
        "cc6991f75fe5bd8b73407d4b1d8a5c7c4d2e1e3a": {
            "balance": "0x2bf1a8054a46d0092000000"
        },
        "cdfbb44442e595260e2148e8f0caadfe149daa4c": {
            "balance": "0x1dc74be914d16aa400000"
        },
        "cf4b31e13d8f31d693ce609d62ea11d0ae663a40": {
            "balance": "0xc5fe7399adb01a6000000"
        },
        "d699607661f8a38b1eaab41274cf3cbacf267592": {
            "balance": "0xba9ca88171649c4800000"
        },
        "d9b7c50f6509a5aa747535c5248a58ff504fd505": {
            "balance": "0x22f0aafd00887d2000000"
        },
        "dc3c71f9f694235eeac29254902d51b1cb36638a": {
            "balance": "0x1abc06b5f2d50a6800000"
        },
        "e02c15f9a2a893b9d6ef4fdae67cef85e7e74af7": {
            "balance": "0xbe2f742cc5cfa91400000"
        },
        "e7e5dcf58d99c5fbb12084974cd8c6d9c89c9551": {
            "balance": "0x9920af4efb8c79b400000"
        }
    },
    "witnesses": [
        "0x91837ff26639700c9688cf8f3fe92bd8b2ec806d",
        "0x3c60a032ba3c6177e50188748e55e5894fb241e4",
        "0xaa2b5f39fb2a4aee56db3ee19567f699d30df1a1",
        "0x61a6e04c737483d72c20de6e71dd8cbb6f6c747d",
        "0x186bae02dc3444d2bb3d39504fefdc9754860481",
        "0xf4c8fd44490493000b8776fd1597752bd9ede431",
        "0x4e94885ed5cfe31a00c7496176f59fdc5e5c7a71",
        "0x4b47c3262a9d2c309b692c9220898ff728054c00",
        "0x31ba9c8cf34d7cc0957a95744b245322af427786",
        "0x4dcfcd45b253119c0d3db6b9ba9e154167dd6a58",
        "0xe6c745142283dbbe4b4a03e969525e25031939fa",
        "0xc61a92dd1713f9ba2214f0ce92e3d408ba4d426d",
        "0xc221a4d0b30dee366bc7899dd29e0f7ac9a7e45a",
        "0xddfd32c4d33915685b926ba5eaab3860db1690cd",
        "0xd338d81c4723982c815a294de3b38608dad9962c",
        "0x6cd54fc6da0f044c43d4550d87ae10b9e1cea351",
        "0xd328d8864649ed050b3d8e9d77f94c75299fd243",
        "0x386dd85ad17b6bd60d2d142473b54bf9d5439842",
        "0x4b8a6cff7b9e008caa936aadd33d9be048623d53"
    ],
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

创建`init.json`文件，并写入以上内容。然后使用`init.json`进行初始化：

```bash
gvnt init init.json --datadir .
```

第四步：创建gvnt账号，可以设置密码：

```bash
gvnt account new .
```

如果你已经有账号，可以直接将账号keystore文件拷贝到`vntnode/keystore`目录。

第五步：使用任一公共全节点的p2p地址作为bootnode，启动节点：

```bash
gvnt --networkid 1 --datadir . --port 3001 --vntbootnode "/ip4/39.97.235.82/tcp/3001/ipfs/1kHaSHxTJGAWKgk69Dk4a3BZzzJvVMfzsDHehyJDgm4tXQ8" --syncmode full --rpc --rpcaddr 0.0.0.0 --rpcport 8880 --rpcapi="db,core,net,vnt,personal" console
```



成功执行以上5步，你应当已经连接上了VNT Hubble主网，并且开始同步区块，区块同步可采用以下方法查看：

通过`attach`命令连接到节点：

```bash
$ cd vntnode
$ gvnt attach gvnt.ipc
```

查看同步：

```bash
> core.syncing
{
  currentBlock: 1992176,
  highestBlock: 2003529,
  knownStates: 0,
  pulledStates: 0,
  startingBlock: 1990059
}
```

## 其他资料

如果你想成为Hubble超级节点，请查看[如何成为超级节点](https://github.com/vntchain/vnt-documentation/blob/master/developer-guide/04-bp/become-to-witness.md)。
