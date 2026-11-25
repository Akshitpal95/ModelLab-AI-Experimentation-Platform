
import pandas as pd
from datetime import datetime, timezone

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from database import experiments_collection



df = pd.read_csv("matbench_expt_gap_featurized.csv")



X = df.drop(columns=["composition", "gap expt"])
y = df["gap expt"]



X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)



model = RandomForestRegressor(
    n_estimators=300,
    random_state=42,
    n_jobs=-1
)



model.fit(X_train, y_train)


y_pred = model.predict(X_test)



mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred) ** 0.5
r2 = r2_score(y_test, y_pred)



print("RANDOM FOREST RESULTS")
print("---------------------")

print("MAE:", mae)
print("RMSE:", rmse)
print("R2 Score:", r2)



feature_importance = {
    feature: float(importance)
    for feature, importance in zip(
        X.columns,
        model.feature_importances_
    )
}



experiment_data = {
    "dataset_name": "matbench_expt_gap_featurized.csv",
    "model_name": "Random Forest",
    "target_column": "gap expt33",

    "feature_count": int(X.shape[1]),
    "train_size": int(X_train.shape[0]),
    "test_size": int(X_test.shape[0]),

    "random_state": 42,

    "mae": float(mae),
    "rmse": float(rmse),
    "r2_score": float(r2),

    "model_params": {
        "n_estimators": 300,
        "random_state": 42,
        "n_jobs": -1
    },

    "feature_importance": feature_importance,

    "created_at": datetime.now(timezone.utc)
}



result = experiments_collection.insert_one(experiment_data)


print("\nEXPERIMENT SAVED SUCCESSFULLY!")
print("--------------------------------")
print("Experiment ID:", result.inserted_id)
print("Database: modellab")
print("Collection: experiments")



print("\nACTUAL VS PREDICTED")

results = pd.DataFrame({
    "Actual Band Gap": y_test.values[:10],
    "Predicted Band Gap": y_pred[:10]
})

print(results)
