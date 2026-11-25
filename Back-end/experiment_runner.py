
import pandas as pd
from datetime import datetime, timezone

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from database import experiments_collection



print("\nMODELLAB EXPERIMENT RUNNER")
print("--------------------------")
print("1. Linear Regression")
print("2. Random Forest")

choice = input("\nSelect a model (1 or 2): ").strip()



if choice == "1":

    model = LinearRegression()
    model_name = "Linear Regression"

elif choice == "2":

    model = RandomForestRegressor(
        n_estimators=300,
        random_state=42,
        n_jobs=-1
    )
    model_name = "Random Forest"

else:
    raise ValueError("Invalid selection. Choose 1 or 2.")



df = pd.read_csv("matbench_expt_gap_featurized.csv")

X = df.drop(columns=["composition", "gap expt"])
y = df["gap expt"]



X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)



print(f"\nTraining {model_name}...")

model.fit(X_train, y_train)



y_pred = model.predict(X_test)



mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred) ** 0.5
r2 = r2_score(y_test, y_pred)



print("\nEXPERIMENT RESULTS")
print("------------------")
print("Model:", model_name)
print("MAE:", mae)
print("RMSE:", rmse)
print("R2 Score:", r2)



feature_importance = None

if hasattr(model, "feature_importances_"):

    feature_importance = {
        feature: float(importance)
        for feature, importance in zip(
            X.columns,
            model.feature_importances_
        )
    }



experiment_data = {
    "dataset_name": "matbench_expt_gap_featurized.csv",
    "model_name": model_name,
    "target_column": "gap expt",

    "feature_count": int(X.shape[1]),
    "train_size": int(X_train.shape[0]),
    "test_size": int(X_test.shape[0]),

    "random_state": 42,

    "mae": float(mae),
    "rmse": float(rmse),
    "r2_score": float(r2),

    "model_params": model.get_params(),

    "feature_importance": feature_importance,

    "created_at": datetime.now(timezone.utc)
}



result = experiments_collection.insert_one(experiment_data)


print("\nEXPERIMENT SAVED SUCCESSFULLY!")
print("--------------------------------")
print("Experiment ID:", result.inserted_id)
print("Model:", model_name)
print("Database: modellab")



print("\nACTUAL VS PREDICTED")

results = pd.DataFrame({
    "Actual Band Gap": y_test.values[:10],
    "Predicted Band Gap": y_pred[:10]
})

print(results)
