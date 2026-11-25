
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


df = pd.read_csv("matbench_expt_gap_featurized.csv")


X = df.drop(columns=["composition", "gap expt"])
y = df["gap expt"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


models = {
    "Linear Regression": LinearRegression(),
    "Random Forest": RandomForestRegressor(
        n_estimators=300,
        random_state=42,
        n_jobs=-1
    )
}


predictions = {}
evaluation_results = []


for name, model in models.items():

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    predictions[name] = y_pred

    mae = mean_absolute_error(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred) ** 0.5
    r2 = r2_score(y_test, y_pred)

    evaluation_results.append({
        "Model": name,
        "MAE": mae,
        "RMSE": rmse,
        "R2 Score": r2
    })


comparison = pd.DataFrame(evaluation_results)

print("\nMODEL COMPARISON")
print("----------------")
print(comparison.to_string(index=False))


fig, axes = plt.subplots(1, 2, figsize=(13, 5))

all_values = [
    y_test.min(),
    y_test.max(),
    *predictions["Linear Regression"],
    *predictions["Random Forest"]
]

lower_limit = min(all_values)
upper_limit = max(all_values)

for ax, (name, y_pred) in zip(axes, predictions.items()):

    ax.scatter(y_test, y_pred, alpha=0.5)

  
    ax.plot(
        [lower_limit, upper_limit],
        [lower_limit, upper_limit],
        linestyle="--"
    )

    ax.set_title(name)
    ax.set_xlabel("Actual Band Gap (eV)")
    ax.set_ylabel("Predicted Band Gap (eV)")

    ax.set_xlim(lower_limit, upper_limit)
    ax.set_ylim(lower_limit, upper_limit)

    ax.grid(True, alpha=0.3)

plt.suptitle("Actual vs Predicted Band Gap")
plt.tight_layout()


plt.savefig("actual_vs_predicted.png", dpi=300)

print("\nGraph saved as actual_vs_predicted.png")

plt.show()
