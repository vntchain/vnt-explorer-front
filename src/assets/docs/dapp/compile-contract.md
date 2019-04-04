# Bottle

``Bottle``是开发``VNT``智能合约的命令行工具。
``Bottle``支持将c语言智能合约编译成``wasm``，提取``abi``文件，并将``wasm``和``abi``压缩及编码成``VNT``网络合约部署所需要的智能合约文件。

## 编译得到``bottle``命令

### Mac OS编译

将``bottle``代码clone到选择的目录

```bash
git clone https://github.com/vntchain/bottle
```

编译``bottle``需要[go](https://golang.org/)编译器

```bash
brew install go
```

然后使用以下命令编译得到``bottle``

```bash
cd bottle
make bottle
```

最后使用以下命令运行bottle

```bash
./build/bin/bottle
```

### Ubuntu 14.04及16.06编译

将``bottle``代码clone到选择的目录

```bash
git clone https://github.com/vntchain/bottle
```

编译``bottle``需要[go](https://golang.org/)编译器，``go``的安装请参考``go``的官方文档


然后使用以下命令编译得到``bottle``

```bash
cd bottle
make bottle
```

最后使用以下命令运行bottle

```bash
./build/bin/bottle
```


## 使用

### 编译智能合约代码

```bash
bottle compile -code <your contract path> -output <the path of your choosing to save the compiled contract file>
```
通过以上命令可以获得后缀名为``compress``的编译文件和后缀名为``abi``的abi文件，使用compress文件可以部署智能合约到``VNT``网络，通过abi文件可以访问``VNT``网络中的智能合约

### 智能合约代码纠错及提示

```bash
bottle hint -code <your contract path>
```

### Bottle命令
```bash
NAME:
   bottle - the bottle command line interface

   Copyright 2018-2019 The bottle Authors

USAGE:
   bottle [global options] command [command options] [arguments...]
   
VERSION:
   0.6.0-beta
   
COMMANDS:
   compile     Compile contract code to wasm and compress
   compress    Compress wasm and abi
   decompress  Deompress file into wasm and abi
   hint        Contract hint
   help, h     Shows a list of commands or help for one command
   
COMPILE OPTIONS:
  --code value  Specific a contract code path
  --include     Specific the head file directory need by contract
  --output      Specific a output directory path
  
COMPRESS OPTIONS:
  --wasm value  Specific a wasm path
  --abi value   Specific a abi path need by contract
  --output      Specific a output directory path
  
DECOMPRESS OPTIONS:
  --file value  Specific a compress file path to decompress
  --output      Specific a output directory path
  
HINT OPTIONS:
  --code value  Specific a contract code path
  
GLOBAL OPTIONS:
  --help, -h  show help
  

COPYRIGHT:
   Copyright 2018-2019 The bottle Authors
```


# VNT 智能合约插件 for vscode 

VNT 智能合约插件通过使用[Bottle](http://github.com/vntchain/bottle)来对智能合约进行语法纠错及提示

## 使用插件

插件依赖[Bottle](http://github.com/vntchain/bottle)命令，``bottle``的安装请参考该[文档](https://github.com/vntchain/bottle/blob/master/README.md)

安装完成bottle后，将bottle所在文件夹目录添加到环境变量的``PATH``中，配置完成后运行以下命令来确认配置成功

```bash
bottle help
```

## 下载及安装

在``vscode``插件市场搜索``vnt-contract-vscode``进行下载和安装
