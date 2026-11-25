import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor


df = pd.read_csv("matbench_expt_gap_featurized.csv")


X = df.drop(columns=["composition", "gap expt"])
y = df["gap expt"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


model = RandomForestRegressor(
    n_estimators=300,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)


importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})


importance = importance.sort_values(
    by="Importance",
    ascending=False
)

top_features = importance.head(15)

print("\nTOP 15 IMPORTANT FEATURES")
print("-------------------------")
print(top_features.to_string(index=False))


plt.figure(figsize=(10, 7))

plt.barh(
    top_features["Feature"],
    top_features["Importance"]
)

plt.xlabel("Feature Importance")
plt.ylabel("Material Descriptors")
plt.title("Top 15 Feature Importances - Random Forest")

plt.gca().invert_yaxis()
plt.tight_layout()

plt.savefig("feature_importance.png", dpi=300)

print("\nGraph saved as feature_importance.png")

plt.show()