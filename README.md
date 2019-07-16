# VNT Explorer 前端运行指南
## 下载代码

```bash
git clone https://github.com/vntchain/vnt-explorer-front.git
```

## 安装 npm
- [Get npm](https://www.npmjs.com/get-npm)
## 安装依赖

```bash
npm install
```

## 配置环境变量
- `./env` 文件

  ```
  REACT_APP_API_DEV=#开发环境后端地址
  REACT_APP_API_PROD=#生产环境后端地址
  ```

- `./constants/config.js`

  ```js
  export const rpc = // VNT 网络节点的 rpc 地址
  export const chainId = // VNT 网络的 chain ID
  ```

## 修改主网测试网

- `./env` 文件
  ```js
    REACT_APP_NET= // mainnet testnet 
  ```
- `src/assets/_base.scss`文件
  ```js
    $net: // testnet mainnet
  ```

## 运行

```bash
npm start
```

## 部署

步骤：

* 项目地址更新最新代码

```bash
git pull
```

* 编译代码,并去除js map文件

```bash
npm run build
rm build/static/js/*.map
```

* 复制build内容到部署地址

```bash
cp -r <origin path> <target path>
```

* 重启nginx

```bash
nginx -s reload
```
