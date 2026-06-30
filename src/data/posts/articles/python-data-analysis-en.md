# Python Data Analysis: From Excel to Pandas

Python has become the preferred language for data analysis. This article introduces how to use Pandas for data analysis.

## 1. What is Data Analysis?

Data analysis is the process of collecting, cleaning, processing, and analyzing data to extract valuable insights.

## 2. Why Choose Python?

- **Simple and easy to learn**: Python syntax is intuitive
- **Rich ecosystem**: Pandas, NumPy, Matplotlib and more
- **Strong community support**: Find solutions to most problems easily

## 3. Getting Started with Pandas

### Installation
```bash
pip install pandas
```

### Import
```python
import pandas as pd
```

### Read Data
```python
# Read CSV file
df = pd.read_csv('data.csv')

# Read Excel file
df = pd.read_excel('data.xlsx')
```

## 4. Common Data Operations

### View Data
```python
df.head()     # View first 5 rows
df.info()     # View data info
df.describe() # View statistics
```

### Data Cleaning
```python
df.dropna()           # Remove missing values
df.fillna(value)      # Fill missing values
df.drop_duplicates()  # Remove duplicates
```

### Data Filtering
```python
df[df['column'] > 100]  # Filter rows
df[['col1', 'col2']]     # Select columns
```

### Data Grouping
```python
df.groupby('category').sum()  # Group by category
```

## 5. Data Visualization

```python
import matplotlib.pyplot as plt

df['column'].plot(kind='bar')
plt.show()
```

## Conclusion

Pandas makes data analysis simple and efficient. Start with basic operations and gradually tackle more complex analysis tasks.