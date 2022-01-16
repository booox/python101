# Python 字典键不存在，如何处理？

当我们在 Python 中使用字典来处理问题时，经常会遇到 `KeyError` ，也就是键不存在的情况。而这很可能导致程序报错，停止运行了。那如何轻松优雅地处理这个问题呢？

Python `collections` 库中的 `defaultdict` 类型就是为了处理这类问题而生的。

## Python 字典如何处理不存在的键

先来看一下，在 Python 中，常规字典如何处理 `KeyError` 问题的，通常至少有 4 种处理方法：

* 使用 `.get()`
* 使用 `.setdefault()`
* 使用条件判断 `if key in dict` 
* 使用异常处理 `try...except...`

### 使用 `d.get()`

语法：

```python
d.get(key[, default])
```

> * 如果 key 存在 `d` 中，返回 key 对应的值，否则返回 `default`。如果 `default` 没有指定，则默认返回 `None`。 

> [!NOTE|style:flat]
> 在本中，变量 `d` 为定义好的字典

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d['a']
1
>>> d['d']   # 获取不存在的键 'd`，抛出异常
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
KeyError: 'd'
>>> d.get('d', -1)   # 设置了默认值，返回默认值 -1
-1
>>> print(d.get('d'))  # 未设置默认值，默认返回 None
None
```


### 使用 `d.setdefault(key[, default])`

> * 如果 key 存在于 `d` 中，返回 key 对应的值
> * 如果 key 不存在于 `d` 中，将 key 插入到 `d` 中，对应值设置为 `default`。并返回 `default`，如果 `default` 没有指定，则默认返回 `None`。 

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d.setdefault('c')      # 'c' 存在于字典 d 中，返回对应的值
3
>>> d.setdefault('d', -1)  # 因为 'd' 不存在于字典 d 中，将 'd' 插入，对应值为 -1，并返回 -1
-1
>>> d
{'a': 1, 'b': 2, 'c': 3, 'd': -1}
>>> d.setdefault('e')  # 因为 'e' 不存在于字典 d 中，且没有设置默认值，于是将 'e' 插入，对应值为 None，返回值为 None
>>> d
{'a': 1, 'b': 2, 'c': 3, 'd': -1, 'e': None}
```

### 使用条件判断 `if key in d` 

> 字典的成员操作符 `in` 来判断给定的键是否存在于字典中，可以通过 `if` 语句来判断，并根据结果进行相应的处理。

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> if 'e' in d:
    print(f"e -> {d['e']}")
else:
    d['e'] = -1
    
>>> d
{'a': 1, 'b': 2, 'c': 3, 'e': -1}
```


### 使用异常处理 `try...except...` 

> 我们还可以通过异常捕捉来处理这个问题。当试图访问不存在的键时，`try...except...` 就会捕捉到 `KeyError` ，而后在 `except` 语句就可以将 key 添加到字典中，并赋给相应的值。

```python
d = {'a': 1, 'b': 2, 'c': 3}

try:
    print(d['e'])
except KeyError:
    d['e'] = -1

print(d)
# {'a': 1, 'b': 2, 'c': 3, 'e': -1}

```

这四种方法，都可以处理 `KeyError` 的问题，但由于这种问题经常会遇到，所以在 Python 的内置模块 `collections` 中提供了 `defauldict` 类型专门处理这个问题。也就是本节的主要内容。



## 理解 Python 的 `defaultdict` 类型

### `defaultdict` 是干什么的？

> * Python 的 `collections` 库中的 `defaultdict` 类型就是为用来处理字典中缺失键这个问题而生的。
> * `defaultdict` 是 Python 中 `dict` 的一个子类。

```python
>>> from collections import defaultdict
>>> issubclass(defaultdict, dict)
True
>>> help(defaultdict)  # 查看 defaultdict 的帮助信息
Help on class defaultdict in module collections:

class defaultdict(builtins.dict)
 |  defaultdict(default_factory[, ...]) --> dict with default factory

 |  Data descriptors defined here:
 |  
 |  default_factory
 |      Factory for default value called by __missing__().

 |  Methods inherited from builtins.dict:
 |  
 |  __contains__(self, key, /)
 |      True if the dictionary has the specified key, else False.
 |  Class methods inherited from builtins.dict:
 |  
 |  fromkeys(iterable, value=None, /) from builtins.type
 |      Create a new dictionary with keys from iterable and values set to value. 
```

从帮助信息可以看出 `defaultdict` 继承了 `dict` 许多的实例方法及类方法。

再来看一下 *cpython\Lib\collections\__init__.py*

```python
# ...\cpython\Lib\collections\__init__.py
'''This module implements specialized container datatypes providing
alternatives to Python's general purpose built-in containers, dict,
list, set, and tuple.

* namedtuple   factory function for creating tuple subclasses with named fields
* deque        list-like container with fast appends and pops on either end
* ChainMap     dict-like class for creating a single view of multiple mappings
* Counter      dict subclass for counting hashable objects
* OrderedDict  dict subclass that remembers the order entries were added
* defaultdict  dict subclass that calls a factory function to supply missing values
* UserDict     wrapper around dictionary objects for easier dict subclassing
* UserList     wrapper around list objects for easier list subclassing
* UserString   wrapper around string objects for easier string subclassing

'''
```

可以看到 `defaultdict`, `OrderedDict` 与 `Counter` 都是 `dict` 的子类，它们分别完成特定的用途。

* Counter: 字典子类，一条语句完成计数
* OrderedDict: 字典子类，让字典有序
* defaultdict: 字典子类，处理缺失键


> [!NOTE|style:flat]
> 虽然自 Python 3.6 及以上，字典已经是有序的了，也就是字典中条目的顺序，就是条目插入的顺序。
> 但是，`OrderedDict` 还是有其存在的价值的，如保持向下兼容，还有一些好用的方法如 `.move_to_end()` 等等。


### 创建 `defaultdict`

要创建 `defaultdict` 类型，要传入一个可被调用的对象。

> [!TIP|style:flat]
> 判断一个对象是否可以调用，可以使用内置函数 `callable(obj)`

```python
>>> callable(list)
True
>>> callable(list())
False
```


#### 传入 `int`

> 将 `int` 作为参数传递，会将整数 `0` 设置为不存在键所对应值的默认值。

```python
import collections

dd = collections.defaultdict(int)
print(dd)
# defaultdict(int, {})

dd['a']  # 访问不存在的键
print(dd)
# defaultdict(<class 'int'>, {'a': 0})

dd['b'] += 1  # 修改不存在的键
print(dd)
# defaultdict(<class 'int'>, {'a': 0, 'b': 1})
```

> [!NOTE|style:flat]
> 需要注意的是，使用 `defaultdict`，传入的是 **函数对象**，它一定要是可以调用的，如 `int`, `str`, `list`, `tuple` 等。但不能将 **调用的函数** 传入，比如 `int()`，则会报错：

```python
>>> import collections
>>> dd = collections.defaultdict(int())
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
TypeError: first argument must be callable or None
```

#### 传入 `str`

> 将 `str` 作为参数传递，会将空字符串 `''` 设置为不存在键所对应值的默认值。

```python
import collections

dd = collections.defaultdict(str)
print(dd)
# defaultdict(int, {})

dd['a']  # 访问不存在的键
print(dd)
# defaultdict(<class 'str'>, {'a': ''})

dd['b'] = '##'  # 修改不存在的键
print(dd)
# defaultdict(<class 'str'>, {'a': '', 'b': '##'})
```

#### 传入 `list`

> 将 `list` 作为参数传递，会将空列表 `[]` 设置为不存在键所对应值的默认值。

```python
dd = collections.defaultdict(list)
print(dd) 
# defaultdict(list, {})

# 像普通字典一样，添加一个条目到 dd 中，('a', 1)
dd['a'] = 1
print(dd)  
# defaultdict(<class 'list'>, {'a': 1})

# 访问不存在的键
dd['c']
print(dd)
# defaultdict(<class 'list'>, {'a': 1, 'c': []})

# 修改不存在的键
dd['e'].append(100)
print(dd)
# defaultdict(<class 'list'>, {'a': 1, 'c': [], 'e': [100]})
```

#### 传入自定义函数

> 在前面我们已经学习过将 `int`、`str`、`list` 等 Python 内置的函数对象做为 `defaultdict` 的参数传入。同样，还可以将自定义的函数对象做为参数传入。

```python
import collections

def default_score():
    return 80


dd = collections.defaultdict(default_score)
print(dd)
# defaultdict(<function default_score at 0x000002F3F6D96828>, {}) 后面略

# 像普通字典一样增添条目
dd['张三'] = 75
print(dd)
# {'张三': 75}

# 访问不存在的键
dd['李四'] 
print(dd)
# {'张三': 75, '李四': 80}

# 修改不存在的键
dd['王五'] -= 1
dd['赵六'] += 1
print(dd)
# {'张三': 75, '李四': 80, '王五': 79, '赵六': 81}
```

#### 传入匿名函数

> 上述自定义函数，还可以通过匿名函数 `lambda` 传入

```python
import collections

dd = collections.defaultdict(lambda : 80)
print(dd)
# defaultdict(<function <lambda> at 0x000002F3F6D96EE8>, {}) 后面略

# 像普通字典一样增添条目
dd['张三'] = 75
print(dd)
# {'张三': 75}

# 访问不存在的键
dd['李四'] 
print(dd)
# {'张三': 75, '李四': 80}

# 修改不存在的键
dd['王五'] -= 1
dd['赵六'] += 1
print(dd)
# {'张三': 75, '李四': 80, '王五': 79, '赵六': 81}
```

**思考**

1. 如何创建一个 `defaultdict`，默认值为 `Hello`？
2. 如何不使用 `def` 创建一个 `defaultdict`，默认值为 `100`？




## 最佳实践：`defaultdict` 的典型应用

在 Python 的字典使用过程中，有时需要将可变的内置集合类型（如列表 `list`、字典 `dict` 或集合 `set`） 用作字典的值。在这种情况下，就需要在使用之前先做 **初始化**，否则就会提示 `KeyError`。

使用 `defaultdict` 可以很方便地解决下面三类问题：

* **分组**
* **计数**
* **累加**


### 将数据分组

> 现有 2021 年一季度城市GDP前 15 名的数据，请按省份对城市进行分组

这里就可以给 `defaultdict` 传入 `list` 做为参数来实现。

```python
import collections

cities = [['上海', '上海市'],
 ['北京', '北京市'],
 ['深圳', '广东省'],
 ['广州', '广东省'],
 ['重庆', '重庆市'],
 ['苏州', '江苏省'],
 ['成都', '四川省'],
 ['杭州', '浙江省'],
 ['南京', '江苏省'],
 ['武汉', '湖北省'],
 ['天津', '天津市'],
 ['宁波', '浙江省'],
 ['长沙', '湖南省'],
 ['青岛', '山东省'],
 ['无锡', '江苏省']]

dd = collections.defaultdict(list)
for city, province in cities:
    dd[province].append(city)
    
print(dd)
# defaultdict(<class 'list'>, {
  # '上海市': ['上海'], 
  # '北京市': ['北京'], 
  # '广东省': ['深圳', '广州'], 
  # '重庆市': ['重庆'], 
  # '江苏省': ['苏州', '南京', '无锡'], 
  # '四川省': ['成都'], 
  # '浙江省': ['杭州', '宁波'], 
  # '湖北省': ['武汉'], 
  # '天津市': ['天津'], 
  # '湖南省': ['长沙'], 
  # '山东省': ['青岛']})
```

* 这里 `dd = collections.defaultdict(list)` 先创建一个默认值为 `list` 的 `defaultdict`
* 接着：`dd[province].append(city)` 为省份创建键，并初始化一个空列表，而后将城市添加到列表中


### 对数组分组，且只保留不重复项

> 如果数据存在重复项，则可以通过传入 `set` 集合来去重

有学生名册如下，里面存在一些重复项：

```python
students = [
    ('A 班', '张三'),
    ('B 班', '李四'),
    ('A 班', '张三'),
    ('B 班', '王五'),
    ('B 班', '李四'),
    ('C 班', '赵六'),
    ('C 班', '赵六'),
    ('B 班', '王五'),
]
```

可以利用 `set` 中元素不可重复的特性来实现 **去重** 与分组的目的。

```python
unique_students = collections.defaultdict(set)
for cls, stu in students:
    unique_students[cls].add(stu)

print(unique_students)
# defaultdict(<class 'set'>, {
  # 'A 班': {'张三'}, 
  # 'B 班': {'王五', '李四'}, 
  # 'C 班': {'赵六'}})
```


### 对数据计数

> 有时，需要统计项目出现的频率，如：字符串中各字母出现的次数、文章中各单词的词频，或男女的人数等等，也可以利用 `defaultdict` 来解决。


* 统计男女人数

```python
students = [
('屈桂兰', '女'),
('阮桂英', '女'),
('杜刚', '男'),
('陈丹丹', '女'),
('任宇', '男'),
('曾婷婷', '女'),
('王雷', '男'),    
('汪淑兰', '女'), 
]

dd = collections.defaultdict(int)
for _, gender in students:
    dd[gender] += 1
    
print(dd)  
# defaultdict(<class 'int'>, {'女': 5, '男': 3})
```

> [!TIP|style:flat]
> 在循环变量中，如果某个变量在循环体中不会被用到，可以用 `_` 来命名。



* 统计字母出现次数

```python
s = 'hello'
dd = collections.defaultdict(int)
for c in s:
    dd[c] += 1
    
print(dd)
# defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 2, 'o': 1})
```

> [!TIP|style:flat]
> 对于计数这类问题，还有更简便的方法，那就是使用 `collections.Counter` 来处理。

```python
s = 'hello'
cnt = collections.Counter(s)
print(cnt)
# Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1})
```

### 对数据求和

> 对数据求和，与 **计数** 类似

对如下销售数据各品类进行求和：

```python
sales = [
    ('手机', 2800.0),
    ('电视机', 4300.0),
    ('手机', 3200.0),
    ('冰箱', 6500.0),
    ('洗衣机', 2800.0),
    ('冰箱', 3000.0),
    ('手机', 1900.0),
    ('电视机', 5300.0),
    ('手机', 1500.0),
]
```

与 **计数** 类似，传入 `int` 创建一个 `defaultdict`

```python
dd = collections.defaultdict(int)
for product, price in sales:
    dd[product] += price

for product in dd:
    print(f"{product}：{dd[product]}")

# 手机：9400.0
# 电视机：9600.0
# 冰箱：9500.0
# 洗衣机：2800.0
```


## 进一步了解 `defaultdict`

### `defaultdict` 与 `dict` 

前面说过，`defaultdict` 是 `dict` 的子类，那前者与后者具体有什么区别，又多了哪些方法或属性呢？

```python
# dict 有的方法， defaultdict 都有了
set(dir(dict)) - set(dir(collections.defaultdict))
# set()

# defaultdict 比 dict 多了哪些
set(dir(collections.defaultdict)) - set(dir(dict))
# {'__copy__', '__missing__', 'default_factory'}
```

那这多出的三个都有什么用呢？

|方法或属性|用途|备注|
|----|----|----|
|`__copy__`|用于复制|方法|
|`__missing__`|当使用 `dd[key]` 访问键时，会调用 `__getitem__()` 来获取键对应的值 <br />当键不存在时，就调用 `__missing__(key)`|方法|
|`default_factory`|当 `__missing__()` 被调用时，就会找 `default_factory` 中保存的可调用对象，为不存在的键自动提供默认值|实例属性|


### `defaultdict.default_factory`

当创建 `defaultdict` 时，传入的第一个参数，就会被赋给 **实例属性** `default_factory`，这个参数必须是 **可调用的**。

* `default_factory` 默认为 None

如果在创建 `default_factory` 时没有指明可调用的对象，则默认为 `None`。 这里新创建的 `dd` 就相当于普通的字典，当访问不存在的 **键** 时，会报 `KeyError`。

```python
>>> import collections
>>> dd = collections.defaultdict()
>>> dd
defaultdict(None, {})
>>> dd['a']
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
KeyError: 'a'
```

* 传入不可调用对象


创建 `defaultdict` 时，如果传入的是不可调用的对象，如数字、字符串，则会提示 `TypeError`

```python
>>> dd = collections.defaultdict(0)
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
TypeError: first argument must be callable or None
>>> dd = collections.defaultdict('hi')
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
TypeError: first argument must be callable or None
```

* 查看 `default_factory`

```python
>>> dd = collections.defaultdict(list)
>>> dd
defaultdict(<class 'list'>, {})
>>> dd.default_factory
<class 'list'>
>>> dd.default_factory()
[]
>>> dd['a']
[]
>>> dd
defaultdict(<class 'list'>, {'a': []})
>>> dd['b'].append(1)
>>> dd
defaultdict(<class 'list'>, {'a': [], 'b': [1]})
```

* 修改 `default_factory`

```python
>>> dd.default_factory = str
>>> dd
defaultdict(<class 'str'>, {'a': [], 'b': [1]})
>>> dd['c']
''
>>> dd['e'] += 'vv'
>>> dd
defaultdict(<class 'str'>, {'a': [], 'b': [1], 'c': '', 'e': 'vv'})
```

### `defaultdict` 适用于哪些情况？

前面我们已经了解了 `defaultdict` 一些重要的操作方法及特性，那什么时候使用 `defaultdict` 呢？

当有下面情况时，优先考虑使用 `defaultdict`：

* 如果程序中字典应用比较普遍，且需要经常使用 **不存在的键**
* 如果字典条目需要用常量的默认值来进行 **初始化**
* 如果程序依赖字典来完成诸如聚合、累积、计数或分组等操作，且性能也是需要考虑的
