
import pandas as pd
from sklearn.model_selection import train_test_split

# Load the featurized dataset
df = pd.read_csv("matbench_expt_gap_featurized.csv")

# Separate input features (X) and target (y)
X = df.drop(columns=["composition", "gap expt"])
y = df["gap expt"]

# Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Display split results
print("DATASET SPLIT RESULTS")
print("---------------------")
print("Original features:", X.shape)
print("Original target:", y.shape)

print("\nTraining features:", X_train.shape)
print("Testing features:", X_test.shape)

print("\nTraining target:", y_train.shape)
print("Testing target:", y_test.shape)
