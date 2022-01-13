# Python 的基本数据类型——Dictionary（字典）

字典与列表一样，都是其它对象的容器。但它与列表又有许多不一样的地方。



我们还是从 **CRUD** 四个方面来学习字典的知识，CRUD 是四个单词的首字母，它们分别是：

* 创建（Create）
* 读取（Read）
* 更新（Update）
* 删除（Delete）


## 字典的创建（Create）

### 使用 `{}` 创建

字典是一组 **键值对** 的集合。

我们已经知道定义列表可以使用方括号 `[]`，元素之间用英文逗号分隔 `, `。

而字典的定义呢，则可以将用逗号 `,` 分隔的 **键值对** ，放到 `{}` 中，而 **键** 与 **值** 之间用冒号 `:` 分隔。语法如下：

```python
d = {
  key1: value1,
  key2: value2,
  #...
}
```


来看个实例：

```python
top_movie = {'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争' }
```

上面我们定义了一个名称为 `top_movie` 的字典，包含三个 **键值对**，分别是标题 （`title`），上映日期（`pub_date`）与类型（`type`）

还可以创建一个空字典

```python
d = {}  # 创建名为 d 的空字典
```

### 使用构造器 `dict()` 创建字典

我们还可以 Python 内置函数 `dict()` 来将包含 **键值对** 的内容转为字典。


```python
# 创建上述电影的字典
xs = [
  ('title', '长津湖'), 
  ('pub_date', '2021-09-30'),
  ('type', '战争')
]

top_movie = dict(xs)
# {'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争'}
```

甚至还可以这样来创建字典

```python
top_movie = dict(
    title='长津湖',
    pub_date='2021-09-30',
    type='战争'
)
```

> [!NOTE|style:flat]
> 使用上面这种方法，只有当键为字符串时，才可以。
> 也就是说，虽然数字、元组等也可以做为字典的键，但不能用这种方法来创建。

用 `dict()` 来创建一个空字典

```python
d = dict()  # 创建名为 d 的空字典
```



## 字典的读取（Read）

### 获取字典单个值

一旦创建了字典，我们就可以查看它的类型，读取它的内容。

```python
>>> top_movie = dict(
    title='长津湖',
    pub_date='2021-09-30',
    type='战争'
)
# 查看字典的类型
>>> type(top_movie)
<class 'dict'>
# 查看字典的内容
>>> top_movie
{'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争'}
```

或许你还记得，列表的元素可以通过 **索引** 来获取。我们看一下，那获取字典的元素，是否也与列表一样呢？

```python
# 尝试用索引来获取字典元素
>>> top_movie[0]
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
KeyError: 0
```

不难发现，这是行不通的。实际上，要获取字典的元素，与列表还是类似的，只是将 `[]` 中的 **索引** 换为字典的 **键**。

```python
>>> top_movie['title']
'长津湖'
>>> top_movie['type']
'战争'
```

如果我们想了解这部电影的演员 (actor) 有谁呢？

```python
>>> top_movie['actors']
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
KeyError: 'actors'
```

因为前面创建的字典中没有 `actors` 这个键及对应的值，所以 Python 会报错，也就是会抛出异常。




## 字典的更新修改（Update）

字典与列表一样，也是 **可变的**，可以很容易地修改它的元素。

### 向字典中添加条目

如果我们想给 `top_movie` 添加一些原先没有的条目呢，比如说，添加一个叫做 `actors` （演员表）来存放演员。(长津湖的演员有吴京、段奕宏等。)

```python
>>> top_movie['actors'] = ['吴京', '段奕宏']
>>> top_movie
{'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争', 'actors': ['吴京', '段奕宏']}
>>> top_movie['actors']
['吴京', '段奕宏']
```

通过直接给 `actors` 赋值就可以将原本不存在的键添加到字典中。而赋的值，则可以是任意类型，可以是整数、浮点数、字符串、布尔类型，也可以是其它复合数据类型，如这里的列表，也可以是元组，当然还可以是字典。

来看一个用整数做 **键** 的实例。

```python
>>> d = {0: 'a', 1: 'b', 2: 'c'}
>>> d
{0: 'a', 1: 'b', 2: 'c'}
>>> d[0]
'a'
>>> d[2]
'c'
```

看到这，你可能会觉得这与列表的 **索引** 很像呀，那是不是也可以用负索引呢？

```python
>>> d[-1]
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
KeyError: -1
>>> d[-2]
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
KeyError: -2
```

显然是不可以的。请思考一下原因是什么，再看一下解释呢？

%accordion%原因分析%accordion%

* 对于字典 `d` 来说 `d[0]` 中的 `0` 并不是 **索引**，而是字典的 **键**。它们只是看起来像，但却有本质上的区别。
* **索引** 是表示列表中元素是从 `0` 开始的顺序号
* **键** 则是字典中用于与 **值** 进行映射的唯一对象，它可以是具有 `__hash__()` 与 `__eq__()` 方法的任意对象。

> [!TIP|style:flat]
> 可以使用 `dir()` 查看对象所具有的方法
> 如：`dir('abc')` 或 `dir(5)`

%/accordion%


### 修改字典中的条目

对于演员表，前面是用简单的列表来表示的。假如我们想将每位演员的相关信息也一并存过来，怎么办呢？

可以直接将新的值赋给已经存在的 `actors` 即可修改原来的内容。

```python
top_movie['actors'] = [
    {
        'name': '吴京',
        'gender': '男',
        'birth_date': '1974-04-03',
        'city': '北京'
    },
    {
        'name': '段奕宏',
        'gender': '男',
        'birth_date': '1973-05-06',
        'city': '新疆'
    }
]
print(top_movie)
# {'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争', 'actors': [{'name': '吴京', 'gender': '男', 'birth_date': '1974-04-03', 'city': '北京'}, {'name': '段奕宏', 'gender': '男', 'birth_date': '1973-05-06', 'city': '新疆'}]}

print(top_movie['actors'])
# [{'name': '吴京', 'gender': '男', 'birth_date': '1974-04-03', 'city': '北京'}, {'name': '段奕宏', 'gender': '男', 'birth_date': '1973-05-06', 'city': '新疆'}]

print(top_movie['actors'][0])
# {'name': '吴京', 'gender': '男', 'birth_date': '1974-04-03', 'city': '北京'}

print(top_movie['actors'][0]['name'])
# 吴京
```



## 字典的删除（Delete）

### 删除字典条目

* 使用 `del` 语句来删除字典的条目

在 `del` 语句中指明要删除条目的 **键**，即可实现该条目的删除。但如果字典中没有这个 **键**，则会提示 `KeyError`。

```python
del top_movie['actors']
print(top_movie)
# {'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争'}

del top_movie['actors']
# KeyError: 'actors'
```


### 删除字典

可以直接用 `del` 跟上字典变量名来实现字典的删除。

```python
>>> top_movie
{'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争'}
>>> del top_movie
>>> top_movie
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
NameError: name 'top_movie' is not defined
```


## 最佳实践：创建可扩展的字典

在解决实际问题过程中，并不是一开始就知道字典的所有条目，而是先有一个空字典，而后再将其他条目逐渐添加进来的。

```python
>>> student = {}
>>> type(student)
<class 'dict'>
>>> student['name'] = '张三'
>>> student['age'] = 15
>>> student['gender'] = '男'
>>> student['Chinese'] = 85
>>> student['English'] = 90
>>> student['Math'] = 95
>>> student['hobbies'] = ['阅读', '篮球', '编程', '打游戏']

>>> student
# {'name': '张三', 'age': 15, 'gender': '男', 'Chinese': 85, 'English': 90, 'Math': 95, 'hobbies': ['阅读', '篮球', '编程', '打游戏']}
```

而当需要使用字典中某个条目的值时，就可以通过 **键** 来获取

```python
>>> student['name']
'张三'
>>> student['gender']
'男'
>>> student['hobbies']
['阅读', '篮球', '编程', '打游戏']
```

## 字典的限制

### 字典键的限制

字典的 **键** 几乎可以是任意类型的数据。

来看一下例子：

```python
>>> d = {'a': 1, 5: 2, 3.14: 3, True: 4}
>>> d
{'a': 1, 5: 2, 3.14: 3, True: 4}
```

从上面例子中可以看到，字符串、整数、浮点数与布尔值都可以做为字典的 **键**。

甚至可以把 Python 的内置对象用作 **键**，如类型与函数：

```python
>>> d = {str: 1, int: 2, float: 3, bool: 4}
>>> d
{<class 'str'>: 1, <class 'int'>: 2, <class 'float'>: 3, <class 'bool'>: 4}
>>> d[str]
1
>>> d = {bin: 1, hex: 2, oct: 3}
>>> d[hex]
2
```

但并不是说，对于字典的键没有限制，下面就有一些：

#### 重复的键是不允许的

给定的键只能在字典中出现一次

* 如果对已经存在的键赋值，则会修改原来的值，并不会再增添一个新的条目。

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d['a']
1
>>> d['a'] = 111
>>> d
{'a': 111, 'b': 2, 'c': 3}
```

* 如果在定义字典时，使用了重复的键，则后面的赋值会将前面的赋值替换掉

```python
>>> d = {'a': 1, 'b': 2, 'c': 3, 'b': 222}
>>> d
{'a': 1, 'b': 222, 'c': 3}
```

#### 字典的键必须是 **不可变** 类型 

> [!NOTE|style:flat]
> 所谓 **不可变**，在 Python 中指具有固定值的对象。 不可变对象包括数字、字符串和元组。 这样的对象是不能改变的。 如果存储了不同的值，则实际上是创建一个新对象。 它们在需要恒定哈希值的地方发挥重要作用，例如作为字典中的键。

既然元组也是不可变的，那它也就可以作为字典的 **键**：

```python
>>> d = {(1, 1): 'a', (2, 2): 'b', (3, 3): 'c'}
>>> d
{(1, 1): 'a', (2, 2): 'b', (3, 3): 'c'}
>>> d[(2, 2)]
'b'
```

那对于 **可变** 的列表或字典呢，则是不可以用作字典的 **键** 的。

```python
>>> d = {[1, 1]: 'a', [2, 2]: 'b', [3, 3]: 'c'}
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
TypeError: unhashable type: 'list'
```

**思考一下**

这里抛出类型错误 `TypeError` ，提示 `unhashable` 即不能够哈希，为什么呢？

提示：可以到前面的思考题中试着寻找答案。

### 字典值的限制

前面已经了解了对字典的 **键** 有一些限制，如不能重复，要不可变（即要能够哈希），那对于字典的 **值** 有什么限制吗？

答案是否定的。没有任何要求，即：

* 不限类型：只要是 Python 支持的类型，都可以用作字典的 **值**。
* 不限次数：可以出现一次，也可以无限次。


## 常用操作

### 字典可用的操作符

先回忆一下列表可用的操作符： `+`、`*` 与 `in` ，对于字典只有最后一个还可以用。


#### 成员判断：`in` 与 `not in`

```python
>>> top_movie = {
    'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争', 'actors': ['吴京', '段奕宏']
}
>>> 'title' in top_movie
True
>>> 'actors' not in top_movie
False
>>> 'director' in top_movie
False
>>> 'director' not in top_movie
True
```

### 列表常用函数

使用函数 `len()` 可以返回字典中条目（键值对）的数量。

```python
>>> top_movie = {
    'title': '长津湖', 'pub_date': '2021-09-30', 'type': '战争', 'actors': ['吴京', '段奕宏']
}
>>> len(top_movie)
4
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> len(d)
3
```

## 字典内置方法

### `d.clear()`

> 清空字典

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d
{'a': 1, 'b': 2, 'c': 3}
>>> d.clear()
>>> d
{}
```

### `d.get(key, default)`

> 如果 key 存在于 `d` 中，则返回对应的值；如果设置了默认值，当 key 不存在时，则返回默认值。

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> print(d.get('a'))   # 存在，返回对应的值
1
>>> print(d.get('w'))   # 不存在，返回 None
None
>>> print(d.get('w', -1))  # 不存在，返回设置的默认值, -1
-1
```

> [!TIP|style:flat]
> 如果 key 不存在，使用 `d[key]` 则会抛出 `KeyError`
> 而使用 `d.get(key)` 则是一种很干净且容易的方法，在 key 不存在时，也不会报错，此时可以使得程序不至于一下子就崩掉。但要注意设置默认值，否则会导致意想不到的错误。


### `d.keys()`、`d.values()` 与 `d.items()`

这三个放在一起来看，它们都会返回一个叫做 **dictionary view（字典视图）** 的 Python 对象。

> [!NOTE|style:flat]
> 字典视图，提供字典条目的动态视图，这意味着当字典更改时，视图会反映这些更改。 
> 要强制字典视图成为列表，请使用 `list(dictview)`。

#### `d.keys()`

> 获取字典所有的键，返回字典键视图

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d.keys()     
dict_keys(['a', 'b', 'c'])
>>> list(d.keys())  # 将字典键视图转为列表
['a', 'b', 'c']
```


#### `d.values()`

> 获取字典所有的键，返回字典键视图

```python
>>> d.values()   
dict_values([1, 2, 3])
>>> list(d.values())  # 将字典值视图转为列表
[1, 2, 3]
```

#### `d.items()`

> * 获取字典所有的条目，返回字典条目视图
> * 如果将字典条目视图转为列表，则列表元素为键值对，以元组形式存在

```python
>>> d.items()
dict_items([('a', 1), ('b', 2), ('c', 3)])
>>> list(d.items())   # 将字典条目视图转为列表
[('a', 1), ('b', 2), ('c', 3)]
```

### `d.pop(key, default)`

> * 如果 key 存在于字典中，则从字典中移除 key，并返回对应的值
> * 如果 key 在字典中不存在，则会抛出 `KeyError` 

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d.pop('a')
1
>>> d
{'b': 2, 'c': 3}
>>> d.pop('w')
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
KeyError: 'w'
>>> d.pop('w', -1)   # 设置默认值，处理 key 不存在
-1
>>> d
{'b': 2, 'c': 3}
```

### `d.popitem()`

> * 从字典中移除最后一个键值对
> * 如果字典为空，则会抛出 `KeyError`

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d
{'a': 1, 'b': 2, 'c': 3}
>>> d.popitem()
('c', 3)
>>> d
{'a': 1, 'b': 2}
>>> d.popitem()
('b', 2)
>>> d
{'a': 1}
>>> d.popitem()
('a', 1)
>>> d
{}
>>> d.popitem()
Traceback (most recent call last):
  File "<pyshell>", line 1, in <module>
KeyError: 'popitem(): dictionary is empty'
```

> [!NOTE|style:flat]
> 如果你的 Python 版本低于 3.6，则 `d.popitem()` 会返回一个随机的键值对。
> 因为早期版本的字典是无序的，而 3.6 及更高版本的 Python 中字典是有序的，其顺序为条目添加进去的顺序。

### `d.update()`

> 将其它字典或可迭代的键值对，合并到字典 `d` 中

* 合并其它字典

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d2 = {'d': 40, 'c': 30}
>>> d.update(d2)    # d2 中的值会替换 d 中的值
>>> d
{'a': 1, 'b': 2, 'c': 30, 'd': 40}
>>> d2.update(d)   # d 中的值会替换 d2 中的值
>>> d2
{'d': 40, 'c': 30, 'a': 1, 'b': 2}
```

* 可迭代的键值 

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d.update([('c', 50), ('e', 60)])
>>> d
{'a': 1, 'b': 2, 'c': 50, 'e': 60}
```

* 将要合并的值指定为关键字参数列表

```python
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> d.update(c=50, e=60)
>>> d
{'a': 1, 'b': 2, 'c': 50, 'e': 60}
```

### 最佳实践：列表的排序

在解决实际问题过程中，经常会遇到需要对字典进行排序的需求。字典没有内置的 `sort()` ，我们可以使用 Python 内置的 `sorted()` 方法来进行排序。

> [!NOTE|style:flat]
> 使用 `sorted()` 方法之后，返回的不再是字典，而是键、值或键值对的列表。

#### 对键进行排序

```python
>>> scores = {'Bob': 80, 'Jack': 85, 'Tom': 73, 'Stone': 68}
>>> sorted(scores)      # 升序
['Bob', 'Jack', 'Stone', 'Tom']
>>> sorted(scores, reverse=True)  # 降序
['Tom', 'Stone', 'Jack', 'Bob']
```


#### 对值进行排序

```python
>>> scores = {'Bob': 80, 'Jack': 85, 'Tom': 73, 'Stone': 68}
# 直接对值排序
>>> sorted(scores.values())
[68, 73, 80, 85]
>>> sorted(scores.values(), reverse=True)
[85, 80, 73, 68]

# 将键值对按值进行排序
>>> sorted(scores.items(), key=lambda x: x[1])
[('Stone', 68), ('Tom', 73), ('Bob', 80), ('Jack', 85)]
>>> sorted(scores.items(), key=lambda x: x[1], reverse=True)
[('Jack', 85), ('Bob', 80), ('Tom', 73), ('Stone', 68)]
```




## 总结

* 主要讲了字典的 **CRUD**，可根据这个框架来进行复习
* 字典的操作符： `in` 与 `not in`
* 字典常用函数：
  * `len()`
* 内置字典方法
  * `d.clear()`
  * `d.get(key, default)`
  * `d.keys()`、`d.values()` 与 `d.items()`
  * `d.pop(key, default)`
  * `d.popitem()`
  * `d.update()`  
* 字典的排序