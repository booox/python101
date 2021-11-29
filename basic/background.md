# 背景及绘制第一颗星 

## 主要目录

* 给窗口设置背景
* 在窗口中绘制一颗五角星

## 预备知识

```python
import turtle

t = turtle.Turtle()  # 创建海龟实例

t.color("yellow")  # 设置颜色

t.begin_fill()   # 开始填充
for i in range(5):
    t.forward(30)
    t.left(144)   # 五角星转动角度
t.end_fill()     # 填充结束

```



