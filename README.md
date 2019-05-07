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

## 运行

```bash
npm start
```
