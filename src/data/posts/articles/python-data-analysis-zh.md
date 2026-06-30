# Python数据分析：从一个真实案例开始

很多Python数据分析教程的问题是：教你各种函数，但从不告诉你在真实工作中应该怎么用。

本文不讲废话，直接用一个**真实的销售数据分析案例**，带你走一遍从原始数据到有价值结论的完整流程。

---

## 一、问题背景

假设你是一家电商公司的运营，有一份CSV文件记录了上个月的订单数据。老板问你三个问题：

1. 上周的销售额是多少？
2. 哪个品类的利润最高？
3. 哪些商品需要考虑清仓？

在Excel里做这些操作不是不行，但数据量一大（几十万行）就很慢，而且操作步骤不可重复。这时候就需要Pandas。

---

## 二、准备：安装和数据导入

### 安装

```bash
pip install pandas openpyxl matplotlib
```

### 导入库

```python
import pandas as pd
import matplotlib.pyplot as plt
```

### 读取数据

```python
df = pd.read_csv('sales_data.csv')
```

读取之后，第一件事应该是查看数据长什么样：

```python
df.head()     # 看前5行，检查数据结构和示例
df.info()     # 看每列的类型、非空数量
df.describe() # 看数值列的统计摘要（均值、最大最小、分位数）
```

---

## 三、数据清洗：真实数据从来都不干净

真实工作中，80%的时间花在数据清洗上，而不是分析。这是最常见的坑：

### 常见问题1：缺失值

```python
df.isnull().sum()  # 检查每列有多少缺失值
```

对于缺失值的处理方式取决于业务场景：

- 价格缺失：用同类产品的平均价格填充
- 销量缺失：大概率是0，直接填0
- 非关键字段缺失：直接删除该行

### 常见问题2：数据类型不对

```python
df['订单日期'] = pd.to_datetime(df['订单日期'])  # 字符串转日期
df['价格'] = pd.to_numeric(df['价格'], errors='coerce')  # 强制转数字
```

### 常见问题3：重复数据

```python
df.drop_duplicates(inplace=True)
```

---

## 四、数据分析：回答老板的问题

### 问题1：上周的销售额是多少？

```python
# 先筛选出上周的数据
last_week = df[df['订单日期'] >= '2026-06-01']
last_week = last_week[last_week['订单日期'] < '2026-06-08']

# 计算总销售额
total_sales = (last_week['价格'] * last_week['销量']).sum()
print(f'上周总销售额：{total_sales:.2f}元')
```

### 问题2：哪个品类的利润最高？

```python
# 计算每单的利润
df['利润'] = (df['价格'] - df['成本']) * df['销量']

# 按品类汇总
category_profit = df.groupby('品类')['利润'].sum().sort_values(ascending=False)
print(category_profit)
```

### 问题3：哪些商品需要清仓？

清仓的判断标准：**过去30天销量低 + 库存量大**

```python
# 计算每个商品的最近30天总销量
recent_sales = df[df['订单日期'] >= '2026-06-01']
product_sales = recent_sales.groupby('商品名称')['销量'].sum()

# 找出低销量且高库存的商品
slow_movers = inventory_df[inventory_df['商品名称'].isin(
    product_sales[product_sales < 10].index
)]
slow_movers = slow_movers[slow_movers['库存量'] > 50]
print(slow_movers[['商品名称', '库存量']])
```

---

## 五、数据可视化：一张图胜过千句话

```python
# 每日销售额趋势
daily_sales = df.groupby('订单日期')['销售额'].sum()
daily_sales.plot(kind='line', figsize=(12, 4), title='每日销售额趋势')
plt.show()

# 各品类销售额占比
category_sales = df.groupby('品类')['销售额'].sum()
category_sales.plot(kind='pie', autopct='%1.1f%%', title='各品类销售额占比')
plt.show()
```

---

## 六、Excel 玩家迁移指南

| 你在Excel中这么做 | 在Pandas中这么做 |
|-----------------|-----------------|
| 打开文件 | `pd.read_excel('file.xlsx')` |
| 筛选 | `df[df['列名'] > 100]` |
| 排序 | `df.sort_values('列名')` |
| VLOOKUP | `df.merge(df2, on='关键列')` |
| 透视表 | `df.pivot_table(values='销售额', index='品类', aggfunc='sum')` |
| SUMIF | `df.groupby('品类')['销售额'].sum()` |

对比之后你会发现：学Pandas不是替代Excel，而是让你用代码来操作数据，步骤可重复、可追溯、可自动化。

---

## 七、推荐的学习路径

1. **第1天**：学会 `read_csv()`、`head()`、`info()`、`describe()`
2. **第3天**：学会筛选 `df[df['列'] > 条件]`
3. **第7天**：学会 `groupby()`、`merge()`
4. **第14天**：找一个自己的数据集（比如淘宝/京东导出的订单数据），完整做一遍清洗和分析

---

## 结语

数据分析的核心不是学会某个函数，而是**学会"从数据中找答案"的思维**。Pandas只是一个工具，真正值钱的是你提出问题的能力和解读结果的能力。

拿起一份真实数据，动手试一遍上面的案例，比看十篇教程都管用。
