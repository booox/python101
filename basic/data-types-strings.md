 Python 的基本数据类型——String（字符串）

## 学了本课，可以掌握 

* 字符串的定义及作用 
* 字符串的定义及作用 


## 字符串的定义

> [!NOTE|style:flat]
> 字符串(string) 是 Python 的一种基本对象，它是包含各种字符数据的序列。

如果说一个程序不处理字符数据，这几乎是不可能的。

### 字符串的定义

字符串，在单引号、双引号或三引号之间的内容全部为字符串的组成。

```python
s1 = '我是字符串'
s2 = "我也是字符串"
s3 = """
我还是字符串
而且，我还可以多行
"""
```

> [!DANGER|style:flat]
> 需要注意这里的引号是英文状态下，若是中文引号，则会报错

```python
s1 = '我是字符串‘
  File "<pyshell>", line 1
    s1 = '我是字符串‘
               ^
SyntaxError: EOL while scanning string literal
```

字符串中的字符数量没有限制，取决你机器的内存。字符串也可以为空字符串：

```python
s = ''
`` 进行转换时，参数要求为整数，需要将输入的数字转换为整数，可以使用 `int()``

### 字符串中要包含引号

如果要在字符串中包含引号，有两种方法：

```python
# 1. 里面错开
s = '培根说过："知识就是力量"'
s = "Someone said, 'you can you up, no can no bb'."

# 2. 使用转义字符
s = "培根说过：\"知识就是力量\""
s = 'Someone said, \'you can you up, no can no bb\'.'
```

### 转义字符

常见转义字符有：

|转义字符|含义|
|----|----|
|`\'`|`'`|
|`\"`|`"`|
|`\\`|`\`|
|`\n`|换行符|
|`\t`|制表符（相当于按一下 Tab 键） |


举例如下：

```python
print("a\tb")
a    b
print("a\nb")
a
b
```

### 原始字符串

原始字符串字面量以 `r` 或 `R` 开头，它不翻译字符串中的转义序列。

```python
print('foo\nbar')
foo
bar
print(r'foo\nbar')
foo\nbar

print('foo\\bar')
foo\bar
print(R'foo\\bar')
foo\\bar
```

### 任务一：练习示例

在 Thonny 中练习上面示例，理解在 Python 中如何定义字符串。


## 操作字符串

字符串有许多特有的操作符、方法与函数。

### 字符串的操作符

#### `+` 操作符

对于字符串来说，`+` 用于 **连接字符串**

```python
s = 'abc'
t = 'uvw'
s + t
'abcuvw'
'2021' + '年' + '12' + '月' + '08' + '日'
'2021年12月08日'
```


#### `*` 操作符

`*` 用于 **创建给定字符串的多个拷贝**

```python
s = '镇海加油！'
s * 5
'镇海加油！镇海加油！镇海加油！镇海加油！镇海加油！'
5 * s
'镇海加油！镇海加油！镇海加油！镇海加油！镇海加油！'
```

> [!TIP|style:flat]
> 试一下，如果将上面的数字换成 **负数** 或者 **小数** 会怎么样？


#### `in` 操作符

`in` 也叫 **成员判断符**，用于 **判断字符串是否存在另一个字符串里面**，如果在，返回 `True`，否则，返回 `False`。

```python
s = '中国宁波镇海'
'镇海' in s
True
'海曙' in s
False
```

还有一个 `not in` 操作符，用于 **判断字符串是否不存在另一个字符串里面**。

```python
'a' not in 'abc'
False
'x' not in 'abc'
True
```


### 内置字符串函数

|函数名称|描述|
|----|----|
|`str()`|返回指定对象的字符串表示|
|`chr()`|将给定整数转换为字符|
|`ord()`|将字符转为整数|
|`len()`|返回字符串的长度|

```python
# str()
str('a')
'a'
str(34)
'34'
str([1, 2, 3])
'[1, 2, 3]'
str({'a': 1, 'b': 2})
"{'a': 1, 'b': 2}"
str(3.14)
'3.14'

# ord() vs chr()
ord('a')
97
ord('z')
122
chr(97)
'a'
chr(122)
'z'

# len()
s = "人生苦短， 我用 Python"
len(s)
15
s = 'Life is short, You need Python.'
len(s)
31

```

### 任务二：打印 ASCII 码

ASCII 码表

<img src="../images/ASCii-table.jpg" target="_blank" style="width: 40%" />

#### 1. 打印出 ASCII 码表中可以打印的字符

打印效果如下：

<img src="../images/ascii-print.png" target="_blank" style="width: 40%" />

#### 2. 实现一个 ASCII 码转换的程序 

接受用户输入的一个字符、ASCII 码，输出对应的 ASCII 码及对应的字符。

实现效果如下：

```python
%Run 01.py
请输入一个字符：w
请输入一个 ASCII 码：120

w 对应的 ASCII 码为 119
120 对应的字符为 x
```

> [!TIP|style:flat]
> 使用 `chr()` 进行转换时，参数要求为整数，需要将输入的数字转换为整数，可以使用 `int()` 
