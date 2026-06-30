# Python Data Analysis: Start with a Real Case Study

The problem with most Python data analysis tutorials: they teach you every function, but never show you how to use them in real work.

This article cuts the fluff. We'll work through a **real sales data analysis case** from raw data to valuable conclusions.

---

## Case Background

You're a data analyst at an e-commerce company. The boss gives you a year of sales data and asks three questions:

1. Which product categories grew the most?
2. What drives customer repurchase?
3. Can we predict next quarter's sales?

Let's use Python to find the answers.

---

## 1. Data Preparation

First, import the necessary libraries:

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Read data
df = pd.read_csv('sales_data_2025.csv')

# Quick look at the data
print(df.shape)
print(df.info())
print(df.head())
```

### What You'll See in Real Data

The output usually reveals a mess:
- Missing values in some columns
- Wrong data types (dates stored as strings)
- Negative quantities (returns)

Don't panic — this is totally normal. Real-world data is always dirty.

### Clean It Up

```python
# Convert date column
df['order_date'] = pd.to_datetime(df['order_date'])

# Handle missing values
df['customer_age'].fillna(df['customer_age'].median(), inplace=True)

# Remove returns (negative quantities)
df = df[df['quantity'] > 0]

# Add useful columns
df['order_month'] = df['order_date'].dt.to_period('M')
df['revenue'] = df['quantity'] * df['unit_price']
```

**Pro tip**: Make copies of your data before cleaning. When you inevitably make a mistake, you'll thank yourself. I learned this the hard way after ruining a dataset three times in one afternoon.

---

## 2. Exploratory Data Analysis

Now let's understand the data.

### Monthly Revenue Trend

```python
monthly_revenue = df.groupby('order_month')['revenue'].sum()

plt.figure(figsize=(12, 6))
monthly_revenue.plot(kind='line', marker='o')
plt.title('Monthly Revenue Trend')
plt.xlabel('Month')
plt.ylabel('Revenue')
plt.grid(True, alpha=0.3)
plt.show()
```

### What We Found

- Revenue grows overall
- Significant spike in June (618 promotion)
- Dip in February (Chinese New Year, low orders)
- Clear seasonal pattern: spikes around promotions, dips during holidays

### Category Analysis

```python
category_revenue = df.groupby(['order_month', 'category'])['revenue'].sum().unstack()

category_revenue.plot(kind='area', stacked=True, figsize=(12, 6))
plt.title('Revenue by Category')
plt.xlabel('Month')
plt.ylabel('Revenue')
plt.legend(title='Category')
plt.show()
```

**Key finding**: Home appliances account for the largest share at 45%, but **growth rate is slowing**. Beauty products account for only 20%, but **growing at 8% month over month**.

This tells us where to focus: beauty is the growth story, home appliances are the cash cow. Different strategies for each.

---

## 3. Customer Repurchase Analysis

```python
# Calculate each customer's purchase frequency
customer_frequency = df.groupby('customer_id')['order_id'].nunique()

# Divide into segments
def segment_customer(freq):
    if freq == 1:
        return 'One-time'
    elif freq <= 3:
        return 'Low frequency (2-3 times)'
    elif freq <= 6:
        return 'Medium frequency (4-6 times)'
    else:
        return 'High frequency (7+ times)'

customer_segments = customer_frequency.apply(segment_customer)
segment_distribution = customer_segments.value_counts()

# Plot
plt.figure(figsize=(8, 8))
segment_distribution.plot(kind='pie', autopct='%1.1f%%')
plt.title('Customer Purchase Frequency Distribution')
plt.ylabel('')
plt.show()
```

### What the Numbers Tell Us

55% of customers only buy once. But the top 15% of high-frequency customers contribute 60% of total revenue.

This is the **Pareto principle in action** — 20% of customers drive 80% of revenue. If we can convert just 10% of one-time buyers into repeat customers, revenue jumps significantly.

### Factors That Drive Repurchase

```python
# Compare first purchase experience between repurchasers and non-repurchasers
repurchase_behavior = df.groupby('customer_id').apply(
    lambda x: 'Repurchased' if len(x) > 1 else 'One-time'
).reset_index(name='behavior')

# Merge with customer data
customer_data = df.groupby('customer_id').agg({
    'revenue': 'sum',
    'order_date': 'min',
    'category': lambda x: x.mode()[0] if not x.mode().empty else 'Unknown'
}).reset_index()

customer_analysis = customer_data.merge(repurchase_behavior, on='customer_id')
```

**Key factors found**:
- Customers who buy **beauty products** have 40% higher repurchase rate than home appliance buyers
- Customers whose first order **exceeded 200元** have 25% higher repurchase rate
- Customers who used a **coupon** on their first order have repurchase rates 15% lower (coupon-seekers churn)

---

## 4. Simple Sales Prediction

```python
from sklearn.linear_model import LinearRegression

# Prepare features
monthly_data = monthly_revenue.reset_index()
monthly_data['month_num'] = range(len(monthly_data))
monthly_data['month_sin'] = np.sin(2 * np.pi * monthly_data['month_num'] / 12)
monthly_data['month_cos'] = np.cos(2 * np.pi * monthly_data['month_num'] / 12)

# Train model
X = monthly_data[['month_num', 'month_sin', 'month_cos']]
y = monthly_data['revenue']

model = LinearRegression()
model.fit(X, y)

# Predict next 3 months
future_months = pd.DataFrame({
    'month_num': range(12, 15),
    'month_sin': np.sin(2 * np.pi * np.array([12, 13, 14]) / 12),
    'month_cos': np.cos(2 * np.pi * np.array([12, 13, 14]) / 12)
})

predictions = model.predict(future_months)
print('Next quarter predicted revenue:', predictions)
```

**Result**: The model predicts 8% QoQ growth for next quarter, primarily driven by the beauty category.

---

## 5. Actionable Recommendations

Based on the data analysis, here's what you can actually do:

1. **Beauty category** gets more resources — it's the growth engine
2. **First order over 200元** is a leading indicator of repurchase — consider free shipping thresholds or product bundles to push new customers past this point
3. **Coupon optimization** — reduce blanket discount coupons and switch to tiered discounts based on order value
4. **Targeted reactivation** — email one-time buyers from 3+ months ago with personalized product recommendations

---

## Complete Workflow Summary

```
Problem Definition → Data Collection → Data Cleaning →
Exploratory Analysis → Statistical Modeling → Insights →
Actionable Recommendations → Track Results → Iterate
```

Each step takes 80% of the time of the previous step. Cleaning takes the longest. If you spend 80% of your time on data cleaning, welcome to the real world of data analysis.

---

## Conclusion

The hardest part of data analysis isn't the code. It's not the algorithms. It's **asking the right questions** and **turning results into decisions**.

The most brilliant analysis is worthless if nobody acts on it. Always start with the question: "What decision will this analysis inform?"
