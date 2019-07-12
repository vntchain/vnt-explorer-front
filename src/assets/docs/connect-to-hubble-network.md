# 如何加入VNT Hubble主网

本文目录：
- [主网基本信息](#主网基本信息)
- [加入主网](#加入主网)
- [其他资料](#其他资料)


## 主网基本信息
VNT Hubble主由19个见证人节点组成，负责执行交易和打包区块，部署了3个公共全节点，并开启了RPC服务，查询和发送交易时可以使用这些公共全节点。

**待定**

19个初始的见证人P2P地址：
```
"/ip4/47.106.71.114/tcp/3001/ipfs/1kHh6iu6GiXidWZCm3B7kw4HChM4CncLiccTbQtJSUrDpnR",
"/ip4/47.108.69.101/tcp/3001/ipfs/1kHeyfXwiuXLbNFLrCsu54gBPkf3e2J8hvbXBsD5NTfwEA1",
"/ip4/47.108.67.119/tcp/3001/ipfs/1kHhg1CeC5h8TT7UYtnrk5f6d27p89nqRSRvfX6uNBSYsVG",
"/ip4/39.100.143.156/tcp/3001/ipfs/1kHd9mkdbw2smReu9G4dGxZ38JNyni6ajNSq9crTwsFiazg",
"/ip4/118.190.59.122/tcp/3001/ipfs/1kHYCNwh1SVfTWGrgeSzYLH65NMrzVbjMCFKp2KKhCqfd42",

"/ip4/118.190.59.100/tcp/3001/ipfs/1kHivFPKBXSwtLTkjTuzuMPpbHbDuVh6rQwGGzUXPjh1sSw",
"/ip4/47.56.69.191/tcp/3001/ipfs/1kHHMELQGozJeaGckomHSMSymwgYWj2cRR2uSgn9y5eB7rV",
"/ip4/39.97.171.233/tcp/3001/ipfs/1kHLWCTi4qqfZw13f393K79Qjmo7yNEVTPtozLpjvhTvwCs",
"/ip4/47.103.107.188/tcp/3001/ipfs/1kHbmc5hvBcQRoWh5MhpLM3ryKiQdukRJZEF4CrVeKWYeHc",
"/ip4/47.103.57.160/tcp/3001/ipfs/1kHG2ZxeGmVxrWXm18Y8eQsmNdwqofb1ExGResSM4P86RF8",

"/ip4/47.254.235.57/tcp/3001/ipfs/1kHDWP8wPvZ9UTDthgfbJ4uygwsziYCoSVHypUPRqJfoGJb",
"/ip4/120.77.236.120/tcp/3001/ipfs/1kHmBZUaPtEmEZPhL1wUFprEH27vSjoF75duK7Wv9dbYri2",
"/ip4/47.111.131.2/tcp/3001/ipfs/1kHC41ck2NwkyNxtEuEsKcYpv5iyGC9j4ekgE3B7BcUNW3D",
"/ip4/47.88.217.237/tcp/3001/ipfs/1kHevyN16xUnQR5yD8DWa4VtiQpJ9kWYnboTEPtRhB5MDRs",
"/ip4/47.91.19.11/tcp/3001/ipfs/1kHQaPVKPkoSaoUiJbC2GTRXC5eEDCSRTJY4nw9irrFjoN3",

"/ip4/47.254.20.76/tcp/3001/ipfs/1kHfn7yfdJx4x2f8fh7ZzxFuA5f5KBGyfUWgBUHXMQWKFaL",
"/ip4/47.93.191.135/tcp/3001/ipfs/1kHCnrsiTwr9y7q8zBCxE6DdHNPTfLfsHYdCzdjGYvdKpYY",
"/ip4/101.132.191.42/tcp/3001/ipfs/1kHdWEpRxfqYzc9K5SS617NwNHSQUYBcQJMBVp6QwqPzAgJ",
"/ip4/39.104.62.26/tcp/3001/ipfs/1kHTiT8vJ73EQWpJC57dpsjJ4Erz1VoS61zpfPtaYuJ6iZt"
```

2个公共全节点的P2P地址，可做引导节点（vntbootnode）:

```
/ip4/39.97.235.82/tcp/3001/ipfs/1kHGsEoQBPJF6qBbWmbkEr6BFCfBJcyEucEd1bdwUdFs3zp
/ip4/47.111.137.127/tcp/3001/ipfs/1kHNL9HvSFPbrhZhEutgK7wMF6Uws2mCocG8GTz6CFSixpG
```

2个公共全节点的RPC信息是：

```
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
                "/ip4/47.106.71.114/tcp/3001/ipfs/1kHh6iu6GiXidWZCm3B7kw4HChM4CncLiccTbQtJSUrDpnR",
                "/ip4/47.108.69.101/tcp/3001/ipfs/1kHeyfXwiuXLbNFLrCsu54gBPkf3e2J8hvbXBsD5NTfwEA1",
                "/ip4/47.108.67.119/tcp/3001/ipfs/1kHhg1CeC5h8TT7UYtnrk5f6d27p89nqRSRvfX6uNBSYsVG",
                "/ip4/39.100.143.156/tcp/3001/ipfs/1kHd9mkdbw2smReu9G4dGxZ38JNyni6ajNSq9crTwsFiazg",
                "/ip4/118.190.59.122/tcp/3001/ipfs/1kHYCNwh1SVfTWGrgeSzYLH65NMrzVbjMCFKp2KKhCqfd42",

                "/ip4/118.190.59.100/tcp/3001/ipfs/1kHivFPKBXSwtLTkjTuzuMPpbHbDuVh6rQwGGzUXPjh1sSw",
                "/ip4/47.56.69.191/tcp/3001/ipfs/1kHHMELQGozJeaGckomHSMSymwgYWj2cRR2uSgn9y5eB7rV",
                "/ip4/39.97.171.233/tcp/3001/ipfs/1kHLWCTi4qqfZw13f393K79Qjmo7yNEVTPtozLpjvhTvwCs",
                "/ip4/47.103.107.188/tcp/3001/ipfs/1kHbmc5hvBcQRoWh5MhpLM3ryKiQdukRJZEF4CrVeKWYeHc",
                "/ip4/47.103.57.160/tcp/3001/ipfs/1kHG2ZxeGmVxrWXm18Y8eQsmNdwqofb1ExGResSM4P86RF8",

                "/ip4/47.254.235.57/tcp/3001/ipfs/1kHDWP8wPvZ9UTDthgfbJ4uygwsziYCoSVHypUPRqJfoGJb",
                "/ip4/120.77.236.120/tcp/3001/ipfs/1kHmBZUaPtEmEZPhL1wUFprEH27vSjoF75duK7Wv9dbYri2",
                "/ip4/47.111.131.2/tcp/3001/ipfs/1kHC41ck2NwkyNxtEuEsKcYpv5iyGC9j4ekgE3B7BcUNW3D",
                "/ip4/47.88.217.237/tcp/3001/ipfs/1kHevyN16xUnQR5yD8DWa4VtiQpJ9kWYnboTEPtRhB5MDRs",
                 "/ip4/47.91.19.11/tcp/3001/ipfs/1kHQaPVKPkoSaoUiJbC2GTRXC5eEDCSRTJY4nw9irrFjoN3",
                 
                "/ip4/47.254.20.76/tcp/3001/ipfs/1kHfn7yfdJx4x2f8fh7ZzxFuA5f5KBGyfUWgBUHXMQWKFaL",
                 "/ip4/47.93.191.135/tcp/3001/ipfs/1kHCnrsiTwr9y7q8zBCxE6DdHNPTfLfsHYdCzdjGYvdKpYY",
                "/ip4/101.132.191.42/tcp/3001/ipfs/1kHdWEpRxfqYzc9K5SS617NwNHSQUYBcQJMBVp6QwqPzAgJ",
                "/ip4/39.104.62.26/tcp/3001/ipfs/1kHTiT8vJ73EQWpJC57dpsjJ4Erz1VoS61zpfPtaYuJ6iZt"

            ]
        }
    },
    "timestamp": "0x5d18e76e",
    "extraData": "0x",
    "gasLimit": "0x47b760",
    "difficulty": "0x1",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "0x91837ff26639700c9688cf8f3fe92bd8b2ec806d": {
            "balance": "0x9b18ab5df7180b6b8000000"
        },
        "0x3c60a032ba3c6177e50188748e55e5894fb241e4": {
            "balance": "0x6765c793fa10079d0000000"
        },
        "0xaa2b5f39fb2a4aee56db3ee19567f699d30df1a1": {
            "balance": "0x6765c793fa10079d0000000"
        },
        "0x61a6e04c737483d72c20de6e71dd8cbb6f6c747d": {
            "balance": "0x6765c793fa10079d0000000"
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
gvnt --networkid 2 --datadir . --port 3001 --vntbootnode "/ip4/39.97.235.82/tcp/3001/ipfs/1kHGsEoQBPJF6qBbWmbkEr6BFCfBJcyEucEd1bdwUdFs3zp" --syncmode full --rpc --rpcaddr 0.0.0.0 --rpcport 8880 --rpcapi="db,core,net,vnt,personal" console
```



成功执行以上5步，你应当已经连接上了VNT Hubble主网，并且开始同步区块，区块同步可采用以下方法查看：


通过`attach`命令连接到节点：
```bash
$ cd vntnode
$ gvnt attach gvnt.ipc
```

查看同步：
```
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
