
import pandas as pd
import numpy as np


df = pd.read_csv("matbench_expt_gap_featurized.csv")


target = "gap expt"

feature_columns = [
    column for column in df.columns
    if column not in ["composition", target]
]

X = df[feature_columns]
y = df[target]

print("DATASET VALIDATION")
print("------------------")


print("Dataset shape:", df.shape)


print("\nMissing values:", int(df.isna().sum().sum()))


print("Infinite feature values:",
      int(np.isinf(X.select_dtypes(include=np.number)).sum().sum()))


constant_features = [
    column for column in X.columns
    if X[column].nunique() <= 1
]

print("Constant features:", len(constant_features))
print("Constant feature names:", constant_features)


print("\nTarget column:", target)
print("Target data type:", y.dtype)
print("Target missing values:", int(y.isna().sum()))
print("Target unique values:", y.nunique())


print("\nTARGET STATISTICS")
print(y.describe())

print("\nValidation checks completed!")
