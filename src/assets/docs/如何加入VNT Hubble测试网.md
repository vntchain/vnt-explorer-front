# 如何加入VNT Hubble测试网



VNT Hubble测试网共部署了19个见证人节点，负责执行交易和打包区块，部署了4个公共全节点，并开启了RPC服务，查询和发送交易时可以使用这些公共全节点。

4个公共全节点的RPC信息是：

```
http://47.104.173.117:8880
http://39.104.62.26:8880
http://47.102.157.204 :8880
```



除了使用公共节点外，对于开发者还有更好的选择是，部署私有的全节点，该全节点可以部署在局域网内网和公网环境，但RPC信息不对外透露，实现了肚子使用的目的。

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
        "chainId": 2,
        "dpos": {
            "period": 2,
            "witnessesnum": 19,
            "witnessesUrl": [
                "/ip4/101.37.164.86/tcp/3001/ipfs/1kHBXzP5y3Um8gBmNBHGjY9DUFYUo53tCeS3V2mC4gHGF32",
                "/ip4/120.77.236.120/tcp/3001/ipfs/1kHN5NfhXZYcHMwxnz4Ca3RxYwiiFah3tJ9AZQifxK6AZBf",
                "/ip4/47.91.206.25/tcp/3001/ipfs/1kHK2aDrW5L73Y9ACRaVDAMqz8EtM6cidKHyprScchCzwvp",
                "/ip4/47.88.217.237/tcp/3001/ipfs/1kHG3X9YFWvyqUUDX7mxFf41nQs9oNvrfkTGHJL47hjibTd",
                "/ip4/47.74.69.8/tcp/3001/ipfs/1kHiZksMUYcnT886YtMfqiwdYctViJopD13cMwPFhbZq6mE",
                "/ip4/47.91.44.189/tcp/3001/ipfs/1kHkLnQ295z9s1YhBHvpZLedj2dV4RHSmhSAwBuLJpnvKud",
                "/ip4/47.74.20.46/tcp/3001/ipfs/1kHDULkXUzCCQJGZTvwpgGxRPiqA6Bo6ktkLK53qTkvsRZe",
                "/ip4/47.91.19.11/tcp/3001/ipfs/1kHQv3CmijvcaBUBP7yBjUJC78HFvNYCW2MAsvEUMqmd6Hb",
                "/ip4/47.254.20.76/tcp/3001/ipfs/1kHWShjbBNpbfvii77fwoFN6y7A9nQXS4QVQhoXN8ZgMjXq",
                "/ip4/47.90.213.105/tcp/3001/ipfs/1kHZcQBtuzQBDVYJtBNLu4z4W3Vh6u2XCHnoaqkNpG5hv8G",
                "/ip4/47.90.248.44/tcp/3001/ipfs/1kHVEheUZE9hxGhiWTsJT2Ft9Wh1R3m18w2UdKjjtDfuKQc",
                "/ip4/47.254.171.28/tcp/3001/ipfs/1kHWg38gjwi7gykp1YFDnmC2jvb3m6h6VEEfLK2SWMRWLpg",
                "/ip4/47.254.169.175/tcp/3001/ipfs/1kHZxoN95TW6aCDhGCzZnUryP3Q8LAYa3d4KSAWSynoiCgo",
                "/ip4/8.208.8.131/tcp/3001/ipfs/1kHKCciHA6m4MykwfhuuBPSUHUcJBREWKGofEnZ1XnqfHiR",
                "/ip4/47.91.87.133/tcp/3001/ipfs/1kHc9hvN7Ks3o1jKuCmuwBPebvCPk9tiakdxejU45zVdA9L",
                "/ip4/149.129.133.55/tcp/3001/ipfs/1kHGgriqM8zhz4Cu1yJfnaqruhBDPPZtFiWqHnuiTmWDWDE",
                "/ip4/47.90.213.34/tcp/3001/ipfs/1kHRfEFKFYZ2sqKyntfFio6kTgYZb6hgkQ2obDUt82R54Yb",
                "/ip4/47.93.191.135/tcp/3001/ipfs/1kHgSw4jUgpKCTs8pP7tibHAgBGTzaFz7bz3N9uKBWWbKwY",
                "/ip4/101.132.191.42/tcp/3001/ipfs/1kHKoXETwZvcUTimWwh4U7VnmsVDE3MtdA46X2k9diVChF5"
            ]
        }
    },
    "timestamp": "0x5b45b949",
    "extraData": "0x",
    "gasLimit": "0x47b760",
    "difficulty": "0x1",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "0xa0959738e3555c54577cca3c721b674c5c18072e": {
            "balance": "0x9b18ab5df7180b6b8000000"
        },
        "0x02f8d9c9bb81b3a81bf13d4ec8818be5918d3658": {
            "balance": "0x1363156bbee3016d70000000"
        }
    },
    "witnesses": [
        "0xb4e8dc96092363ec39b6fd310e7893de657610a2",
        "0xc3518890cf4b8e5006100a8a1be2471e593b0524",
        "0x716c9e26181ca2a01542aab700dd92d93710bef1",
        "0x048b1fb49c6613569ea67227fe8d0087f8abfe50",
        "0x17f61a055d4b3053f39885f43263b9ecc79c310f",
        "0xb8d77033711c31c68b67c1993229ebe1fdefaa71",
        "0x97360f3acd013088881e702ddee319e90e7082ae",
        "0x8925b3dcaab832c21c8f3239cca50891267c2fff",
        "0x0be4323cdd617f096a5b0673a786215db6c6fccd",
        "0xb0432eb09079f4a5a7fe4e8dd5879b14356e27c2",
        "0x10de3be73ebc768c4b479586bd5d9d5c9c0f8048",
        "0x00242458011be8674b6e228a739caadc76a33b9c",
        "0x0dbb536a9b4c3232bd6979ce70cebde11570f9d0",
        "0x685cbbea8fdcc237169bcfe8dc4571b327728b1a",
        "0xbbc0c8cba3a4ece493e9714aca670a76ffa65708",
        "0xd6a9f8b77b94fec580d6a060383a627611f4e775",
        "0x403c33a40f762931c79ae6c04492e5879db2df6c",
        "0xbc9b56058889474f1f36ebcbe84a8e89c9af4edc",
        "0xa529ded85425ed2fc65ab470a28496b4e9636f89"
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

第五步：使用公共全节点的p2p地址作为bootnode，启动私有节点：

```bash
gvnt --networkid 2 --datadir . --port 3001 --vntbootnode "/ip4/47.104.173.117/tcp/3001/ipfs/1kHHvQXh6VKJTNmKEBpny1kYohd78qCmBEicWs2a5WMkyV9" --syncmode full --rpc --rpcaddr 0.0.0.0 --rpcport 8888 --rpcapi="db,core,net,vnt,personal" console
```



成功执行以上5步，你应当已经连接上了VNT Hubble测试网，并且开始同步区块，同步情况可通过`core.syncing`命令查看。



