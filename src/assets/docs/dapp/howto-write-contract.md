# VNT智能合约

VNT中的智能合约可以基于C语言编写。智能合约中包含能够持久化数据的状态变量以及可以修改这些变量和访问这些变量的方法。

# 创建智能合约

创建智能合约之前，需要引入vntlib.h或者将vntlib.h的内容拷贝到智能合约的起始位置

[下载vntlib.h](https://github.com/vntchain/vnt-documentation/blob/master/smart-contract/vntlib.h)

```c
#include "vntlib.h"
```

# 构造函数

构造函数是必须的，一个智能合约只允许一个构造函数，构造函数允许传递参数，但是构造函数没有返回值。构造函数在整个合约运行周期中只会执行一次。构造函数通过关键字``constructor``进行声明，``constructor``后面为构造函数的名称，也是智能合约的名称

```c
#include "vntlib"

constructor ContractSample(){

}
```


# 状态变量

状态变量用于将数据持久化到链上，状态变量有``int32``,``int64``,``uint32``,``uint64``,``uint256``,``string``,``address``,``bool``等简单类型以及由这些简单类型构成的``mapping``,``array``,``struct``等复杂类型。
状态变量通过``KEY``关键字进行声明，不可变常量可以用const进行修饰，对于简单类型和由简单类型构成的``struct``类型，可以在声明的同时进行初始化赋值。
状态变量必须按照c语言中的全局变量进行声明。
简单状态变量的赋值与读取和c语言中的变量一致。

## 简单状态变量的声明及初始化

```c
//只声明
KEY int32 var1;
//声明并初始化
KEY int32 var2 = 1;
KEY const int32 var3;
KEY string var4;
KEY string var5 = "string";
KEY uint256 var6 = U256(1000000000000);
KEY address var7;
KEY address var8 = Address("0xaaa");
//多个相同类型变量的声明和赋值，可以在变量之间用逗号隔开
KEY int32 var9,var10;
KYE int32 var11 = 1,var12 = 2;
```

注意：

* 对``uint256``类型的赋值需要用关键字``U256``将数字进行转化。
* 对``address``类型的赋值需要用关键字``Address``将字符串进行转化。
* ``U256``与``U256From``的用法：``U256``可用于uint256类型**初始化和方法体内**的数字**常量**的转化，``U256From``只能用于**方法体内**的字符串**常量和变量**的转化
* ``Address``与``AddressFrom``的用法：``Address``可用于address类型**初始化和方法体内**的字符串**常量**的转化，``AddressFrom``只能用于**方法体内**的字符串**常量和变量**的转化


```c
KEY uint256 var1 = U256(1000000000000);
KEY address var82 = Address("0xaaa");

void functionbody(){
  string a ="0x1";
  string b = "10000";
  address addr1 = Address("0x1");
  address addr2 = AddressFrom("0x1");
  address addr2 = AddressFrom(a);

  uint256 addr1 = U256(1000);
  uint256 addr2 = U256From("100000");
  uint256 addr2 = U256From(b);

}

```

## ``struct``类型状态变量的定义，声明及初始化

``struct``类型的定义遵照c语言struct的定义规则

```c
struct S1{
     int32 a;
};
//只声明
KEY struct S1 var1;
//声明并初始化
KEY struct S1 var2 = {1};
//只声明
KEY struct {
    int32 a;
} var3;
//声明并初始化
KEY struct {
    int32 a;
} var4 = {1};

//使用typedef定义struct
typedef struct S2{
     int32 a;
} s2;
//只声明
KEY s2 var5;
//声明并初始化
KEY s2 var5 = {1};

```

```c
KEY struct {
  string str;
  address addr;
  uint256 u256;
  uint64 u64;
} s1 = {"teststringinstruct", Address("0xaaaaaa11"), U256(10000000000011),
        1000001};

KEY struct {
  string str;
  address addr;
  uint256 u256;
  uint64 u64;
  struct {
    string str;
    address addr;
    uint256 u256;
    uint64 u64;
  } s;
} s2 = {"teststringinstruct",
        Address("0xaaaaaa11"),
        U256(10000000000011),
        1000001,
        {"teststringinstructstruct", Address("0xaaaaaa1122"),
         U256(1000000000001122), 10000012}};
```

## ``array``类型状态变量的声明

``array``类型变量用于存储带有uint64的数字索引的任意类型的数据， ``array``拥有``index``,``value``,``length``三个元素，通过``length``为array设置长度，通过``index``和``value``的联合赋值将任意类型的``value``和索引``index``进行关联。``array``声明时参数为``value``的类型


```c
//array的声明；
KEY array(string) var1;

//array的赋值
var1.length = 1;
var1.index = 0;
var1.value = "value";

//array的取值
var1.index = 0;
string val = var1.value;

```

注意:
* 在``array``的第一次赋值之前必须先设置``array``的``length``
* 赋值和取值操作需要预先对``index``进行赋值，之后对``value``的赋值和取值操作才能与前面定义``index``相关联
* 对``index``的多次赋值，``value``只会和代码中最接近的``index``进行关联
* ``array``的``value``可以使用任意类型，因此``array``中嵌套``array``是可以的
* ``array``不支持在声明中进行初始化。

## ``mapping``类型状态变量的声明

``mapping``类型变量用于存储带有简单类型索引的任意类型的数据，``mapping``拥有``key``,``value``两个元素，通过``key``和``value``的联合赋值将任意类型的``value``和索引``key``进行关联。``mapping``声明时第一个参数为``key``的类型，第二个参数为``value``的类型

```c
//mapping的声明；
KEY mapping(int32,string) var1;

//mapping的赋值
var1.key = 0;
var1.value = "value";

//mapping的取值
var1.key = 0;
string val = var1.value;

```

注意:
* 赋值和取值操作需要预先对``key``进行赋值，之后对``value``的赋值和取值操作才能与前面定义``key``相关联
* 对``key``的多次赋值，``value``只会和代码中最接近的``key``进行关联
* ``mapping``的``value``可以使用任意类型，因此``mapping``中嵌套``mapping``是可以的
* ``mapping``不支持在声明中进行初始化。

## ``mapping``，``array``，``struct``的复合声明

``mapping``和``array``的``value``可以使用任意类型，``struct``中的变量可以使用任意类型，因此，可以对``mapping``，``array``，``struct``进行相互嵌套。

### ``array``嵌套``array``的声明

```c
KEY array(array(string)) var1;

//赋值
var1.length = 0;
var1.index = 0 ;
var1.value.length = 1;
var1.value.index = 0;
var1.value.value = "value";

//取值
var1.index = 0;
var1.value.index = 0;
string var = var1.value.value;
```

### ``array``嵌套``mapping``的声明

```c
//
KEY array(mapping(string,string)) var1;

//赋值
var1.length = 1;

var1.index = 0;
var1.value.key = "key";
var1.value.value = "value";

//取值
var1.index = 0;
var1.value.key = "key";
string var = var1.value.value;

```

### ``array``嵌套``struct``的声明

```c
//
KEY array(struct{
     int32 a;
     string b;
}) var1;

//赋值
var1.length = 1;

var1.index = 0;
var1.value.a = 1;
var1.value.b = "b";

//取值
var1.index = 0;
int32 a = var1.value.a;
string b = var1.value.b;

```

### ``mapping``嵌套``mapping``的声明

```c

KEY mapping(string,mapping(string,string)) var1;

//赋值
var1.key = "key1";
var1.value.key = "key2";
var1.value.value = "value";

//取值
var1.key = "key1";
var1.value.key = "key2";
string var = var1.value.value;

```

### ``mapping``嵌套``array``的声明

```c

KEY mapping(string,array(string)) var1;

//赋值
var1.key = "key";
var1.value.length = 1;
var1.value.index = 0;
var1.value.value = "value";

//取值
var1.key = "key";
var1.value.index = 0;
string var = var1.value.value;

```

### ``mapping``嵌套``struct``的声明

```c

KEY mapping(string,struct{
   int32 a;
   string b;
}) var1;

//赋值
var1.key = "key";
var1.value.a = 0;
var1.value.b = "b";

//取值
var1.key = "key";
int32 a = var1.value.a;
string b = var1.value.b;

```

### ``struct``嵌套``array``的声明

```c
KEY struct{
     int32 a;
     array(string) b;
} var1;

//赋值
var1.a = 1;

var1.b.length = 1;
var1.b.index = 0;
var1.b.value = "value";

//取值
int32 a1 = var1.a;

var1.b.index = 0;
string b1 = var1.b.value;

```

### ``struct``嵌套``mapping``的声明

```c
KEY struct{
     int32 a;
     mapping(string,string) b;
} var1;

//赋值
var1.a = 1;

var1.b.key = "key";
var1.b.value = "value";

//取值
int32 a1 = var1.a;

var1.b.key = "key";
string b1 = var1.b.value;

```

### ``struct``嵌套``struct``的声明

```c
KEY struct{
     int32 a;
     struct{
          int32 b;
          string c;
     } d;
} var1;

//赋值
var1.a = 1;

var1.d.b = 1;
var1.d.c = "value";

//取值
int32 a = var1.a;
int32 b = var1.d.b;
string c = var1.d.c;

```

### 多层嵌套

对于``mapping``，``array``，``struct``的多层嵌套，取值和赋值需要遵循：
* 在对``value``赋值和取值前，需要对``value``所在层之前的**所有层级中**的索引``key``或者``index``进行赋值，才能够取得或者为``value``赋值，
* 对于嵌套中的``array``,当第一次对``array``赋值前，需要对``array``的``length``进行设置，否则``array``的``length``为0

# 函数functions

智能合约通过函数``function``对状态变量进行访问与修改，和c语言一样，``function``可以有多个参数并且只有一个返回值。
``function``可以用``MUTABLE``或``UNMUTABLE``进行修饰，``MUTABLE``或``UNMUTABLE``需要写在``function``的前一行。被修饰的``function``为可被外部访问的，不被修饰的``function``为内部函数，不被外部访问

## 可被外部访问的函数

可被外部访问的`function`的参数类型和返回值类型是被限制的，当前只允许**简单类型**

* 输入参数类型：``int32``,``int64``,``uint32``,``uint64``,``uint256``,``string``,``address``,``bool``
* 返回值类型：``int32``,``int64``,``uint32``,``uint64``,``uint256``,``string``,``address``,``bool``和``void``
* 输入参数和返回值不支持指针，mapping，array，struct和其他自定义的类型

可被外部访问的`function`拥有4种类型，``MUTABLE``和``UNMUTBALE``,``Payable``和``Unpayable``

### ``MUTABLE``

被``MUTABLE``修饰的方法会改变状态，所以访问该方法需要发起一笔交易

### ``UNMUTBALE``

``UNMUTABLE``不会修改状态变量，因此不需要一笔交易来访问该方法



以下情形被视为会修改状态变量

* 状态变量的``write``操作
* 调用``event``
* 发送原生代币
* 跨合约调用``MUTABLE``的函数

***

### ``Payable``

``Payable``函数可以接收来自交易中的原生代币，使用符号``$``表示，``$``需要写在方法名的最前面

``Payable``函数的声明：

```c
MUTABLE
uint32 $testfunction1(int32 var1,string var2,address var3){

}
```

### ``Unpayable``

如果方法名的开头没有``$``符号，表示该方法为``Unpayable``的,禁止接收来自交易中的原生代币


``Unpayable``函数的声明：

```c
MUTABLE
uint32 testfunction1(int32 var1,string var2,address var3){

}

UNMUTABLE
uint32 testfunction2(int32 var1,string var2,address var3){

}
```

## 内部函数

内部函数遵循c语言函数的定义，不做任何限制。

# 事件EVENT

``EVENT``对``WAVM``的日志功能提供了抽象。应用程序可以通过客户端的``RPC``接口订阅和监听这些事件。
事件通过关键字``EVENT``进行声明，事件只需要声明方法名及参数，事件无返回值。
事件参数类型：``int32``,``int64``,``uint32``,``uint64``,``uint256``,``string``,``address``,``bool``
事件的参数可以被``indexed``进行修饰，被修饰的参数会被索引，``indexed``需要写在参数类型前面
事件的调用和C语言中方法的调用一样


```c
//声明
EVENT testEvent(indexed int32 var1,string var2);

//调用
testEvent(1,"string"）;

```

# 跨合约调用CALL

``CALL``提供了一种方式用于跨合约的访问，访问的对象为合约中**可被外部访问的函数**
``CALL``方法通过关键字``CALL``进行声明，``CALL``方法的定义规则为
* 第一个参数类型必须为结构体``CallParams``,结构体包含``address``,``vnt``,``gas``三个需要初始化的参数
* 第二个(如果有参数的话)及之后的参数为被调用合约中**可被外部访问的函数**的参数
* 返回值为被调用合约中**可被外部访问的函数**的返回值

```c
//contract a,用于被调用
MUTABLE
uint32 test(int32 var1,string var2){
    ...
}
```

```c
//contract b,调用contract a
//声明CALL
CALL uint32 test(CallParams params,int32 var1,string var2);
MUTABLE
uint32 testcall(){
     CallParams prams = {Address("0xaaaa"), U256(10000), 100000};
     uint32 res = test(prams, 1, "string");
     ...
}
```

# Fallback

``Fallback``是一个非必须实现的函数，若合约实现了``Fallback``函数，当执行合约的``Input Data``不正确或者为空时，``wavm``会进入``Fallback``函数执行，``Fallback``函数没有参数并且没有返回值

``Fallback``函数的声明

```c
_(){ //unpayable fallback
     ...
}

$_(){ //payable fallback
  ...
}

```

注意：

* 当一个合约中同时出现payable fallback和unpayable fallback时，只会执行unpayable fallback

# 附录：类型及标准库

一、基本类型
==========
布尔类型
----
``bool``:``true``和``false``两个常量。
支持的运算符：
*  ``!`` (逻辑否)
*  ``&&`` (逻辑与)
*  ``||`` (逻辑或)
*  ``==`` (相等)
*  ``!=`` (不等)

整型类型
-------
``int32`` / ``uint32`` / ``int64`` / ``uint64``


支持的运算符:

* 比较: ``<=``, ``<``, ``==``, ``!=``, ``>=``, ``>`` (等价于``BOOL``)
* 位运算: ``&``, ``|``, ``^`` (位与，位或，位异或)
* 算术运算符: ``+``, ``-``, ``*``, ``/``, ``%``, ``<<``, ``>>``

大数类型
-------
``uint256``:``uint256``类型常量需要关键字U256表示

``int256``:待实现

```c
uint256 u = U256(1000000000000000000);
```

支持的方法:

* ``uint256 U256_Add(uint256 x, uint256 y)`` 加法
* ``uint256 U256_Sub(uint256 x, uint256 y)`` 减法
* ``uint256 U256_Mul(uint256 x, uint256 y)`` 乘法
* ``uint256 U256_Div(uint256 x, uint256 y)`` 除法
* ``uint256 U256_Pow(uint256 x, uint256 y)`` 幂运算
* ``int32 U256_Cmp(uint256 x, uint256 y)`` 比较运算


字符串类型
-------------------
``string``:字符串类型必须用``""``双引号表示

```c
string str = "string";
```

地址类型
--------
``address``:``address``类型是字节长度为20的特殊字符串，需要用关键字``Address``表示

```c
address addr = Address("0xaaa");

```


二、类型转化
==========

| from\to | int32    | int64    | uint32    | uint64    | string     | address        | uint256        | bool    |
| ------- | -------- | -------- | --------- | --------- | ---------- | -------------- | -------------- | ------- |
| int32   |          | (int64)x | (uint32)x | (uint64)x | FromI64(x) |                | U256FromI64(x) | (bool)x |
| int64   | (int32)x |          | (uint32)x | (uint64)x | FromI64(x) |                | U256FromI64(x) | (bool)x |
| uint32  | (int32)x | (int64)x |           | (uint64)x | FromU64(x) |                | U256FromU64(x) | (bool)x |
| uint64  | (int32)x | (int64)x | (uint32)x |           | FromU64(x) |                | U256FromU64(x) | (bool)x |
| string  | ToI64(x) | ToI64(x) | ToU64(x)  | Tou64(x)  |            | AddressFrom(x) | U256From(x)    |
| address |          |          |           |           |            |                |                |
| uint256 |          |          |           |           | x          |                |                |
| bool    | (int32)x | (int64)x | (uint32)x | (uint64)x | FromI64(x) |                | U256FromI64(x) |


三、标准库方法

| 方法名                | 方法描述                                                                                          | 参数类型                                  | 返回值类型       | gas消耗                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| GetSender             | 获取交易发起者地址                                                                                |                                           | address          | 2 + 40                                                                                                                               |
| GetOrigin             | 获取交易最初的发起者地址                                                                          |                                           | address          | 2 + 40                                                                                                                               |
| GetValue              | 获取合约创建、调用时，同时发生的转账值                                                            |                                           | uint256          | 2 + 64                                                                                                                               |
| GetBalanceFromAddress | 获取某个地址的原生代币余额                                                                        | address addr                              | uint256          | 2 + 64                                                                                                                               |
| GetContractAddress    | 获取当前正在执行合约的地址                                                                        |                                           | address          | 2 + 40                                                                                                                               |
| GetBlockHash          | 根据区块高度获取区块hash，只能获取最新的256个区块，不包括当前区块                                 | uint64 blocknumber                        | string           | 20 + 64                                                                                                                              |
| GetBlockNumber        | 获取区块高度                                                                                      |                                           | uint64           | 2                                                                                                                                    |
| GetTimestamp          | 获取区块生成的时间戳                                                                              |                                           | uint64           | 2                                                                                                                                    |
| GetBlockProduser      | 获取区块生产者的地址                                                                              |                                           | address          | 2 + 40                                                                                                                               |
| SHA3                  | SHA3加密运算                                                                                      | string data                               | string           | 30 + 6 * size of string data                                                                                                         |
| Ecrecover             | 从签名的hash中恢复账号地址                                                                        | string hash, string v, string r, string s | string           | 3000 + 40                                                                                                                                |
| GetGas                | 获取剩余GAS                                                                                       |                                           | uint64           | 2                                                                                                                                    |
| GetGasLimit           | 获取当前交易的GasLimit                                                                            |                                           | uint64           | 2                                                                                                                                    |
| Assert                | 判断条件，如果失败则返回msg，交易失败并消耗完所有的gas。该函数通常用来调试，生产环境请使用require | bool condition, string msg                | void             | true : 2 ; false : all gas                                                                                                           |
| Revert                | 回滚交易，中断合约运行                                                                            | string msg                                | void             | 2  + 2 * size of string data                                                                                                         |
| Require               | 判断条件是否成立，如果失败则交易失败                                                              | bool condition, string msg                | void             | true : 0 ; false : 2  + 2 * size of string data                                                                                      |
| SendFromContract      | 合约向addr转账，转账金额为amount,转账失败会revert                                                 | (address addr, uint256 amount)            | void             | 2300                                                                                                                                 |
| TransferFromContract  | 合约向addr转账，转账金额为amount,转账失败返回false                                                | (address addr, uint256 amount)            | bool             | 2300                                                                                                                                 |
| FromI64               | 将int64的数值转化为字符串                                                                         | int64 value                               | string           | 2                                                                                                                                    |
| FromU64               | 将uint64的数值转化为字符串                                                                        | uint64 value                              | string           | 2                                                                                                                                    |
| ToI64                 | 将字符串转化为int64                                                                               | string value                              | int64            | 2                                                                                                                                    |
| ToU64                 | 将字符串转化为uint64                                                                              | string value                              | uint64           | 2                                                                                                                                    |
| Concat                | 连接两个字符串                                                                                    | string str1, string str2                  | string           | 2 * (size of str1 and str2)                                                                                                          |
| Equal                 | 判断两个字符串是否相等                                                                            | char *str1, char *str2                    | bool             | 2                                                                                                                                    |
| AddressFrom           | 将一个地址字符串转化成一个地址                                                                    | string addrStr                            | address          | 2 + 40                                                                                                                               |
| Pow                   | uint64位的Pow运算                                                                                 | uint64 x, uint64 y                        | uint64           | 50 * int((y bitlen + 7) / 8) + 2                                                                                                     |
| U256From              | string转成uint256                                                                                 | string x                                  | uint256          | 2 + 64                                                                                                                               |
| U256FromU64           | uint64转成uint256                                                                                 | uint64 x                                  | uint256          | 3 + 64                                                                                                                               |
| U256FromI64           | int64转成uint256                                                                                  | int64 x                                   | uint256          | 3 + 64                                                                                                                               |
| U256_Add              | uint256加法                                                                                       | uint256 x, uint256 y                      | uint256          | 3 + 64                                                                                                                               |
| U256_Sub              | uint256减法                                                                                       | uint256 x, uint256 y                      | uint256          | 3 + 64                                                                                                                               |
| U256_Mul              | uint256乘法                                                                                       | uint256 x, uint256 y                      | uint256          | 3 + 64                                                                                                                               |
| U256_Div              | uint256除法                                                                                       | uint256 x, uint256 y                      | uint256          | 3 + 64                                                                                                                               |
| U256_Pow              | uint256幂运算                                                                                     | uint256 x, uint256 y                      | uint256          | 50 * int((y bitlen + 7) / 8) + 2  + 64                                                                                               |
| U256_Shl              | uint256左移运算                                                                                   | uint256 value, uint256 shift              | uint256          | 3 + 64                                                                                                                               |
| U256_Shr              | uint256右移运算                                                                                   | uint256 value, uint256 shift              | uint256          | 3 + 64                                                                                                                               |
| U256_And              | uint256与运算                                                                                     | uint256 x, uint256 y                      | uint256          | 3 + 64                                                                                                                               |
| U256_Or               | uint256或运算                                                                                     | uint256 x, uint256 y                      | uint256          | 3 + 64                                                                                                                               |
| U256_Xor              | uint256异或运算                                                                                   | uint256 x, uint256 y                      | uint256          | 3 + 64                                                                                                                               |
| U256_Cmp              | uint256比较运算                                                                                   | uint256 x, uint256 y                      | int32            | 3                                                                                                                                    |
| PrintAddress          | 打印一个地址变量                                                                                  | string remark, address a                  | void             |                                                                                                                                      |
| PrintStr              | 打印一个字符串变量                                                                                | string remark, string s                   | void             |                                                                                                                                      |
| PrintUint64T          | 打印一个uint64数字                                                                                | string remark, uint64 num                 | void             |                                                                                                                                      |
| PrintUint32T          | 打印一个uint32数字                                                                                | string remark, uint32 num                 | void             |                                                                                                                                      |
| PrintInt64T           | 打印一个int64数字                                                                                 | string remark, int64 num                  | void             |                                                                                                                                      |
| PrintInt32T           | 打印一个int32数字                                                                                 | string remark, int32 num                  | void             |                                                                                                                                      |
| PrintUint256T         | 打印一个uint256数字                                                                               | string remark, uint256 num                | void             |                                                                                                                                      |
| EVENT                 | 事件                                                                                              | 可变参数                                  | void             | 375 + topics * 375 + data * 8                                                                                                        |
| CALL                  | 跨合约调用                                                                                        | 可变参数                                  | 规定的任意返回值 | 700 + (新地址：25000,老地址：0 ) + （value!=0 : 9000 , value=0 : 0） + 被调用方法的gas消耗 - （value!=0 : 赠送的2300 , value=0 : 0） |



四、链上数据存储与读取的gas消耗
==========================

存储
----

存储的gas计算分三种情况
1. 从0值到非0值，即新增数据，gas消耗20000
2. 从非0值到0值，即删除数据，gas退回15000，消耗5000
3. 从非0值到非0值，即改变数据，gas消耗5000               

读取
----
gas消耗200


五、复杂状态变量的多种处理方法
======================

对于一些复杂状态变量，比如``mapping(string,mapping(string,string))``的嵌套，在取值或者赋值时，通常使用下面的方式

```c
KEY mapping(string,mapping(string,string)) map;

//赋值
map.key = "testkey1";
map.value.key = "testkey2";
map.value.value = "testvalue";

//取值
map.key = "testkey1";
map.value.key = "testkey2";
string val = map.value.value;

```

或者

```c
typedef mapping(string,string) mapdef;
KEY mapping(string,mapdef) map;
//赋值
map.key = "testkey1";
KEY mapdef *tmpmap = &map.value; //临时变量
tmpmap->key = "testkey2";
tmpmap->value = "testvalue";

//取值
map.key = "testkey1";
KEY mapdef *tmpmap = &map.value; //临时变量
tmpmap->key = "testkey2";
string val = tmpmap->value;
```

对于``mapping``内嵌套结构体的情况

```c
typedef struct
{
  int32 a;
  int64 b;
  uint32 c;
  uint64 d;
  string e;
  address f;
  bool g;
  uint256 h;
} _s;

KEY mapping(string, _s) map_with_struct;
//赋值
map_with_struct.key = key;
map_with_struct.value.a = a;
map_with_struct.value.b = b;
map_with_struct.value.c = c;
map_with_struct.value.d = d;
map_with_struct.value.e = e;
map_with_struct.value.f = f;
map_with_struct.value.g = g;
map_with_struct.value.h = h;

//取值
map_with_struct.key = key;
int32 a = map_with_struct.value.a;
...
uint256 h = map_with_struct.value.h;

```

或者

```c
typedef struct
{
  int32 a;
  int64 b;
  uint32 c;
  uint64 d;
  string e;
  address f;
  bool g;
  uint256 h;
} _s;

//========赋值========
//对于有名称的结构体适用
KEY mapping(string, _s) map_with_struct;
map_with_struct.key = key;
KEY _s s; //临时变量
s.a = a;
s.b = b;
s.c = c;
s.d = d;
s.e = e;
s.f = f;
s.g = g;
s.h = h;
map_with_struct.value = s;

//对于匿名结构体及有名称的结构体都适用
map_with_struct.key = key;
KEY _s *s; //临时变量
s = &map_with_struct.value;
s->a = a;
s->b = b;
s->c = c;
s->d = d;
s->e = e;
s->f = f;
s->g = g;
s->h = h;
//========赋值========

//========取值========
//对于有名称的结构体适用
map_with_struct.key = key;
KEY _s S0 =  map_with_struct.value //临时变量
int32 a = s0.a;
...
uint256 h = s0.h;

//对于匿名结构体及有名称的结构体都适用
map_with_struct.key = key;
KEY _s *s0 = &map_with_struct.value; //临时变量
int32 a = s0->a;
...
uint256 h = s0->h;
//========取值========

```


注意：
* 以上几种不同方式的取值赋值同样适用于``array``及更复杂的组合类型
* 定义的临时变量都需要使用关键字``KEY``
* ``mapping``和``array``本质上是匿名结构体，只能使用通常方式和匿名结构体的方式进行取值和赋值


六、随机数
========

生成随机数在一个可验证的确定性系统是非常困难的，但又是必不可少的，比如博彩。
在对随机数的随机性要求不高的情况下，可以使用tx hash,nonce等区块链上的随机数据，但这里会有一些风险，超级节点是有能力影响这些数据的产生，进而影响随机数

七、SendFromContract,TransferFromContract,ContractCall
========================================

三个方法都能往一个地址上发送一定数量的vnt

SendFromContract
----------------

* 当执行失败时，执行revert
* 固定消耗2300gas,可防止重入攻击
* 应该在大多数情况下使用，因为这是发送vnt的最安全的方法

TransferFromContract
--------------------

* 当执行失败时，返回false
* 固定消耗2300gas,可防止重入攻击
* 在极少数的想要在合约中处理发送失败的情况下使用

``SendFromContract``和``TransferFromContract``发送vnt的地址如果是合约地址，该合约必须实现``payable``的``fallback``方法，否则会执行失败，同时，由于固定消耗2300gas，fallback方法内只能执行少量操作才不会使得gas超出

ContractCall
------------

* 当执行失败时，消耗完所有gas
* 不能安全防止重入攻击
* 在需要控制gas及需要访问其他合约中的方法的时候使用
