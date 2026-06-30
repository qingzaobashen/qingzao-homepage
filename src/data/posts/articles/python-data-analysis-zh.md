# Python数据分析入门：从Excel到Pandas

Python已成为数据分析的首选语言。本文介绍如何使用Pandas进行数据分析。

## 一、为什么选择 Python？

1. 免费开源
2. 生态丰富
3. 易于学习
4. 功能强大

## 二、Pandas 简介

Pandas 是 Python 的核心数据分析库，提供高性能、易用的数据结构和数据分析工具。

## 三、Pandas 核心数据结构

### 1. Series
一维数组，类似于Excel的一列。

### 2. DataFrame
二维表格，类似于Excel的工作表。

## 四、常用操作

### 1. 读取数据
```python
import pandas as pd
df = pd.read_csv('data.csv')
```

### 2. 查看数据
```python
df.head()  # 查看前5行
df.info()  # 查看数据信息
```

### 3. 数据清洗
- 处理缺失值
- 删除重复值
- 数据类型转换

### 4. 数据分析
- 描述性统计
- 分组聚合
- 数据透视表

## 五、从 Excel 到 Pandas

| Excel操作 | Pandas代码 |
|---------|-----------|
| 打开文件 | pd.read_excel() |
| 筛选数据 | df[df['列'] > 10] |
| 排序 | df.sort_values() |
| 透视表 | df.pivot_table() |

## 六、实战案例

分析销售数据，找出销售趋势和热门产品。

## 结语

Python + Pandas 是数据分析的强力组合。掌握Pandas，能让你高效处理和分析数据。