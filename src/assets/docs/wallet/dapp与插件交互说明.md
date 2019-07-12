# Dapp与插件交互
VNT浏览器钱包（chrome扩展）支持Dapp获取插件账号、对Dapp的交易签名等功能，Dapp开发者只需要添加少量的额外代码即可接入.

## 插件检测
第一次打开dapp网页， 需检测chrome浏览器是否已经安装了钱包插件

```js
if (typeof window.vnt !== 'undefined') { // chrome extension installed

    // Dapp UI render or Dapp related logic

} else { // chrome extension not installed

    // Dapp UI render or Dapp related logic

}
```


## 获取插件网络&监听网络变换
- 方法名：  
`window.vnt.getNetworkUrl(callback(err, result))`

- 返回值：
```js
{
    err: null,
    result: {url: url, chainId: chainId}
}
```

调用该接口会触发回调函数返回上述返回值， 并且会在插件侧注册一个监听网络变换的事件，当插件进行网络切换时，会再次触发上述回调函数


## 监听插件登出
- 方法名：  
`window.vnt.logout(callback(err, result))`

- 返回值：  
```js
{
    err: null,
    result: true
}
```

调用该接口会在插件侧注册一个监听插件登出的事件，当插件登出时，会触发回调函数返回上述返回值


## 获取授权
dapp在使用插件提供的vnt.js中的相关接口前需先获取插件授权(最好先确保插件已经解锁)

- 方法名：  
`window.vnt.requestAuthorization(callback(err, result))`

- 返回值： 
 
```js
1. 钱包未解锁

// 插件这边弹出登录界面
不做callback回调

2. 钱包解锁

- 用户确认授权： 

{
    err: null,
    result: true
}


- 用户拒绝授权： 

{
    err: Error("authorizationError: user denied."),
    result: null
}

```


## 插件支持的vnt.js接口(需先解锁，并获得授权)
### 获取当前地址
插件对该接口进行了修改，返回的是插件当前账号的地址, 并且会在插件侧注册一个监听地址变换的事件，当插件进行地址切换时，会再次触发上述回调函数

1.  `window.vnt.core.getCoinbase(callback(err, result)) | window.vnt.core.coinbase`

```js
// 异步模式
window.vnt.core.getCoinbase(callback(err, result)) {
    if (err) {
        // err logic
    } else {
        var curaddr = result
        // other logic
    }
}

// 同步模式
var curaddr = window.vnt.core.coinbase
```


2. `window.vnt.core.getAccounts(callback(err, result)) | window.vnt.core.accounts`

```js
// 异步模式
window.vnt.core.getAccounts(callback(err, result)) {
    if (err) {
        // err logic
    } else {
        var curaddr = result[0]
        // other logic
    }
}

// 同步模式
var curaddr = window.vnt.core.accounts[0]
```


### 发送交易
插件会用当前选定的地址对交易进行签名，并发送该交易到插件现在选定的网络上

`window.vnt.core.sendTransaction(tx, callback(err, result))`

```js
window.vnt.core.sendTransaction({
          from: from_address,
          to: to_address,
          gasPrice: 30000000000000,
          gasLimit: 4000000,
          data: data,
          value: vnt.toWei(value)
        },function(err,result){

            if (err) {
                // err logic
            } else {
                var txid = result
                // other logic
            }
            
        })

```

### 其他接口
除了上述经过修改的接口外, 钱包插件同时也支持vnt.js里的其他所有接口，因此可以使用全局的window.vnt来进行诸如余额查询、合约查询、事件监听等操作，具体请参考vnt.js的文档

- 余额查询

```js
window.vnt.core.getBalance(address,function(err, balance) {
})
```

- 合约查询

```js
const abi = `[{"name":"$Dice","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"testRandom","constant":true,"inputs":[],"outputs":[{"name":"output","type":"uint64","indexed":false}],"type":"function"},{"name":"GetTotalGameCount","constant":true,"inputs":[],"outputs":[{"name":"output","type":"uint64","indexed":false}],"type":"function"},{"name":"Withdraw","constant":false,"inputs":[{"name":"amount","type":"uint256","indexed":false}],"outputs":[],"type":"function"},{"name":"$DepositPool","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"GetOwner","constant":true,"inputs":[],"outputs":[{"name":"output","type":"address","indexed":false}],"type":"function"},{"name":"GetAmountFromAddress","constant":true,"inputs":[{"name":"addr","type":"address","indexed":false}],"outputs":[{"name":"output","type":"uint256","indexed":false}],"type":"function"},{"name":"GetWinAndLose","constant":true,"inputs":[],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"GetNickName","constant":true,"inputs":[],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"GetAmount","constant":true,"inputs":[],"outputs":[{"name":"output","type":"uint256","indexed":false}],"type":"function"},{"name":"GetPool","constant":true,"inputs":[],"outputs":[{"name":"output","type":"uint256","indexed":false}],"type":"function"},{"name":"WithdrawAll","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"WithdrawPool","constant":false,"inputs":[{"name":"amount","type":"uint256","indexed":false}],"outputs":[],"type":"function"},{"name":"WithdrawPoolAll","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"SetNickName","constant":false,"inputs":[{"name":"name","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"GetNickNameFromAddress","constant":true,"inputs":[{"name":"addr","type":"address","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"Bet","constant":false,"inputs":[{"name":"amount","type":"uint256","indexed":false},{"name":"bigger","type":"int32","indexed":false}],"outputs":[],"type":"function"},{"name":"$Deposit","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"GetFreeChips","constant":false,"inputs":[],"outputs":[],"type":"function"},{"name":"EVENT_TEST","anonymous":false,"inputs":[{"name":"test","type":"int64","indexed":false}],"type":"event"},{"name":"EVENT_BET","anonymous":false,"inputs":[{"name":"from","type":"address","indexed":true},{"name":"nickname","type":"string","indexed":false},{"name":"amount","type":"uint256","indexed":false},{"name":"bigger","type":"int32","indexed":false},{"name":"lottery","type":"uint64","indexed":false},{"name":"reward","type":"uint256","indexed":false}],"type":"event"},{"name":"EVENT_WITHDRAW","anonymous":false,"inputs":[{"name":"from","type":"address","indexed":true},{"name":"nickname","type":"string","indexed":false},{"name":"amount","type":"uint256","indexed":false}],"type":"event"},{"name":"EVENT_DEPOSIT","anonymous":false,"inputs":[{"name":"from","type":"address","indexed":true},{"name":"nickname","type":"string","indexed":false},{"name":"amount","type":"uint256","indexed":false}],"type":"event"},{"name":"EVENT_NICKNAME","anonymous":false,"inputs":[{"name":"from","type":"address","indexed":true},{"name":"nickName","type":"string","indexed":false}],"type":"event"},{"name":"EVENT_GETFREEVNT","anonymous":false,"inputs":[{"name":"from","type":"address","indexed":true},{"name":"got","type":"bool","indexed":false}],"type":"event"}]`;
var contract = window.vnt.core.contract(JSON.parse(abi));
var funcName = 'GetAmount';
var data = contract.packFunctionData(funcName);  
var options = {from: from, to: contractAddress, data: data, chainId: window.vnt.version.network};
window.vnt.core.call(options, function(err, res) {
});

```