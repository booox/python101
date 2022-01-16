# Python 中的元组（Tuple）

元组，在各方面与列表都完全一样，除了以下两点：

* 列表是将元素括在方括号 (**`[]`**) 里面，而元组是将元素括在小括号 (**`()`**) 里
* 列表是 **可变** 的，元组是 **不可变** 的


与列表一样，我们还是从 **CRUD** 四个方面来学习元组的知识，CRUD 是四个单词的首字母，它们分别是：

* 创建（Create）
* 读取（Read）
* 更新（Update）
* 删除（Delete）


## 元组的创建（Create）

### 使用 `()` 创建

定义元组使用小括号 `()`，元素之间用英文逗号分隔 `, `。

```python
# 空元组 
t = () 

# 只有一个元素的元组 
t = (3, ) 

# 多个元素的元组 
t = (3, 4, 5, 6, 'a', 'b', 'c')
```

> [!NOTE|style:flat]
> * 如果元组只有一个元素，定义时，可以直接使用 `t = 3,` 即在元素后面加一个 `,` 
> * 但如果只用括号括起来，并不会改变原来数据的类型


```python
>>> t = (3, )
>>> type(t)
<class 'tuple'>
>>> t = 3,
>>> type(t)
<class 'tuple'>
>>> t = (3)
>>> type(t)
<class 'int'>
>>> t = ('abc')
>>> type(t)
<class 'str'>
```


元组与列表一样，也可以嵌套，即元组中还可以包含元组，且没有层级的限制。

```python
t = (3, 4, (51, 52, 53), ('a', ('b1', 'b2')))
```

### 使用构造器 `tuple()` 创建

```python
# 创建一个空元组
t = tuple()

# 将字符串转换为元组
chars = tuple('Hello')
# ('H', 'e', 'l', 'l', 'o')

```


## 元组的读取（Read）

元组元素可以通过 **索引** 获取

### 读取单个元素

要获取元组中的单个元素，可以使用 `[元素索引]` 来获取。

> [!TIP|style:flat]
> 元组的索引，与前面学习过的字符串及列表的索引是一样的用法。
> 索引也是从 `0` 开始的。

来看下面这样一个元组：


```python
courses = ('语文', '数学', '体育', '英语', '编程', '音乐')

# 正向索引
print(courses[0]) # 语文
print(courses[2]) # 体育
print(courses[5]) # 音乐

# 负向索引
print(courses[-1]) # 音乐
print(courses[-2]) # 编程
print(courses[-6]) # 语文
```

### 获取多个元素

要从元组中获取多个连续的元素，可以使用 **元组切片**

> [!NOTE|style:flat]
> `a[m:n]` 返回索引为 `m` 到 `n` 的元素，但不包括索引为 `n` 的元素

```python
# 正索引切片
>>> courses[1:4]
('数学', '体育', '英语')

# 负索引切片
>>> courses[-5:-2]
('数学', '体育', '英语')

# 省略开始索引
>>> courses[:3]
('语文', '数学', '体育')
>>> courses[:-2]
('语文', '数学', '体育', '英语')


# 省略结束索引
>>> courses[3:]
('英语', '编程', '音乐')
>>> courses[-3:]
('英语', '编程', '音乐')

# 同时省略开始结束索引
>>> courses[::]
('语文', '数学', '体育', '英语', '编程', '音乐')


# 使用步长 
>>> courses[0:6:2]
('语文', '体育', '编程')
>>> courses[1:6:2]
('数学', '英语', '音乐')
>>> courses[-1:0:-2]
('音乐', '英语', '数学')
```

> [!TIP|style:flat]
> 要想让元组的元素颠倒顺序，方法很简单，使用 `元组[::-1]` 即可

```python
# 逆序 
>>> courses[::-1]
('音乐', '编程', '英语', '体育', '数学', '语文')
```

### 获取嵌套元组（多级元组）的元素

对于多级元组元素的获取，方法还是一样，继续使用 **索引**。

假设有这个一个元组：

```python
t = ('a', ('bb', 'cc'), 'd', ('ee', ('fff', 'ggg'), 'hh'), 'i')
```

不难发现 `t[0]`, `t[2]`, `t[-1]` 都是字符串，每个元素长度为 1

```python
print(t[0], t[2], t[-1])
# a d i
```

但 `t[1]`, `t[3]` 却是子元组：

```python
>>> t[1]
('bb', 'cc')
>>> t[3]
('ee', ('fff', 'ggg'), 'hh')
```

如果要获取子元组中的元素，只要在后面添加额外的索引

```python
>>> t[1]
('bb', 'cc')
>>> t[1][0]
'bb'
>>> t[1][1]
'cc'
>>> t[3]
('ee', ('fff', 'ggg'), 'hh')
>>> t[3][0]
'ee'
>>> t[3][1]
('fff', 'ggg')
>>> t[3][1][0]
'fff'
>>> t[3][1][1]
'ggg'
```

## 元组的更新修改（Update）

* 列表是 **可变的**，可以很容易地修改它的元素。
* 但元组是 **不可变的**，一定被定义，就无法修改它的元素

```python
>>> t = ('a', 'b', 'c', 'd')
>>> t[0]
'a'
>>> t[0] = 'w'    # 尝试修改元组的 0 号索引元素
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> t[1:3]      # 尝试修改元组索引为 1 到 3 之间（不包括 3 ）的元素
('b', 'c')
>>> t[1:3] = (1, 2)
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
```


## 元组的删除（Delete）

### 删除元组元素？

有多种可以删除 **列表** 元素的方法，如 `remove()`、`pop()`、`del` 等等

然而因为 **元组** 是不可以被修改的，所以这些操作都是无效的。

```python
>>> t = ('a', 'b', 'c', 'd')
>>> del t[0]
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
TypeError: 'tuple' object doesn't support item deletion
```

### 删除元组

当然，元组也是 Python 的一类对象，还是可以通过 `del` 语句来删除的。

```python
>>> t = ('a', 'b', 'c', 'd')
>>> t
('a', 'b', 'c', 'd')
>>> del t
>>> t
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
NameError: name 't' is not defined
```

## 为什么需要元组这个类型？

经过前面的学习，我们已经了解元组除了不可改变之外，与列表几乎一样。

那为什么还需要元组这种数据类型呢？或者说，元组适用于哪些场合呢？

有这样几点考虑：

* 速度比列表快
  * 对于内容相同的列表来说，元组的操作要比列表的操作快
  * 如果数据量较小，二者可能没有区别
* 防止数据被修改
  * 如果集合中的数据在整个程序生命周期内都保持不变，则使用元组可以防止意外修改
* 可以用作字典的键
  * 字典的键需要是不可变类型的对象，元组可以，但列表不可以

因为这些原因，所以有了元组这个数据类型。

试着去了解每种数据类型适合解决的问题，会让我们加深对语言的理解。


## 常用操作

### 元组操作符

#### `+` 合并元组

> 可以将两个元组通过 `+` 连接起来，成为新的元组

```python
>>> (1, 2, 3) + (4, 5)
(1, 2, 3, 4, 5)
```

#### `*` 重复元组元素

> 用法： `元组 * n` ，可以得到原来元组元素重复 `n` 次的新元组

```python
>>> (1, 2, 3) * 3
(1, 2, 3, 1, 2, 3, 1, 2, 3)
```

#### 成员判断：`in` 与 `not in`

```python
>>> t = ('a', 'b', 'c', 'd')
>>> 'a' in t
True
>>> 'a' not in t
False

>>> 'w' in t
False
>>> 'w' not in t
True
```

### 元组常用函数

```python
>>> t = (1, 2, 3, 4)
>>> len(t)  # 元组长度
4
>>> min(t)  # 元组中最小值
1
>>> max(t)  # 元组中最大值
4
>>> sum(t)  # 对元组求和
10
```


### 打包与解包

#### 打包

> 在定义元组，通常是将一个或多个对象，赋给一个对象。这有点像是将多个对象 **打成一个压缩包** 一样。

```python
>>> t = ('int', 'str', 'list', 'tuple')
```

#### 解包

> 将一个元组对象中包含的多个元素，分别赋给多个变量，这个过程有点像拆快递包裹一样。

```python
>>> t = ('int', 'str', 'list', 'tuple')
>>> (a, b, c, d) = t        # 带括号
>>> print([a, b, c, d])
['int', 'str', 'list', 'tuple']
>>> a, b, c, d = t          # 不带括号，效果一样，但可以少打两个字符 ^-^
>>> print([a, b, c, d])
['int', 'str', 'list', 'tuple']
```

> 解包时，左边元素的个数，元组中元素的个数要 **相等**，否则会报错

```python
>>> t = ('int', 'str', 'list', 'tuple')
>>> a, b, c = t             # 不能少
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
ValueError: too many values to unpack (expected 3)
>>> a, b, c, d, e = t       # 也不能多
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
ValueError: not enough values to unpack (expected 5, got 4)
>>> a, b, c, d = t          # 不多不少，刚刚好
```

> 其实，还有一种办法让解包时，左边的变量个数可以不等于元组的元素个数

```python
>>> a, b, c, d = t
>>> t = ('int', 'str', 'list', 'tuple')
>>> a, *b, c = t
>>> a
'int'
>>> b
['str', 'list']
>>> c
'tuple'

# 甚至还可以将不需要的元素放入 `_` 变量中
>>> a, *_, c = t
>>> a
'int'
>>> _
['str', 'list']
>>> c
'tuple'
```

> [!TIP|style:flat]
> 其实解包的操作，还可以用到其它可迭代对象上，如列表、字符串等等

```python
# 对列表解包
>>> a, b, c = [1, 2, 3]
>>> a
1
>>> c
3

# 对字符串解包
>>> x, y, z = 'abc'
>>> x
'a'
>>> z
'c'
```

> [!TIP|style:flat]
> 解包操作，还有一个重要的应用，就是 **交换变量值**。这个操作，在很多语言中，可能都需要先创建一个临时变量，再通过两次赋值才能完成。而利用解包操作，只需一条语句就可以完成，极其简洁高效。

```python
# 交换两个变量
>>> a = 3
>>> b = 5
>>> a, b = b, a
>>> a
5
>>> b
3

# 交换三个变量
>>> a = 3
>>> b = 4
>>> c = 5
>>> a, b, c = c, a, b
>>> a
5
>>> b
3
>>> c
4
```



### 元组的排序

元组因为不能修改，所以元组本身并没有 `sort()` 方法，但是可以使用 Python 内置的 `sorted()` 方法来对元组内元素排序，从而得到一个新的列表。


#### 使用 `sorted()` 方法

```python
>>> t = (1, 2, 3, 4)

# 没有 sort() 方法
>>> t.sort()
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
AttributeError: 'tuple' object has no attribute 'sort'


# 使用 Python 内置 sorted() 方法
>>> sorted(t)
[1, 2, 3, 4]
>>> sorted(t, reverse=True)
[4, 3, 2, 1]
>>> 
```


> [!NOTE|style:flat]
> Python 内置的 `sorted()` 方法并不会修改原元组，它会返回一个原元组排序后新的列表


## 总结

* 主要讲了元组的 **CRUD**，可根据这个框架来进行复习
* 元组常用函数：
    * `len()`
    * `min()`
    * `max()`
    * `sum()`
* 元组的常用操作
  * 操作符： `+`, `*`, `in`
  * 常用函数： `len()`, `min()`, `max()`, `sum()`
  * 打包与解包
* 元组的排序