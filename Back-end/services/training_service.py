
import pandas as pd
from datetime import datetime, timezone
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from database import experiments_collection


def run_experiment(model_name: str):

    
    dataset_path = (
        Path(__file__).resolve().parent.parent
        / "matbench_expt_gap_featurized.csv"
    )

    df = pd.read_csv(dataset_path)

    X = df.drop(columns=["composition", "gap expt"])
    y = df["gap expt"]

    
    if model_name == "Linear Regression":
        model = LinearRegression()

    elif model_name == "Random Forest":
        model = RandomForestRegressor(
            n_estimators=300,
            random_state=42,
            n_jobs=-1
        )

    else:
        raise ValueError("Unsupported model selected.")

    
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    
    model.fit(X_train, y_train)

    
    y_pred = model.predict(X_test)

    
    mae = mean_absolute_error(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred) ** 0.5
    r2 = r2_score(y_test, y_pred)

    
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
        "dataset_name": dataset_path.name,
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

    
    return {
        "message": "Experiment completed successfully!",
        "experiment_id": str(result.inserted_id),
        "model_name": model_name,
        "metrics": {
            "mae": float(mae),
            "rmse": float(rmse),
            "r2_score": float(r2)
        },
        "dataset": {
            "name": dataset_path.name,
            "total_rows": int(len(df)),
            "feature_count": int(X.shape[1]),
            "train_size": int(len(X_train)),
            "test_size": int(len(X_test))
        },
        "feature_importance": (
            dict(
                sorted(
                    feature_importance.items(),
                    key=lambda item: item[1],
                    reverse=True
                )[:15]
            )
            if feature_importance else None
        ),
        "predictions": [
            {
                "actual": float(actual),
                "predicted": float(predicted)
            }
            for actual, predicted in zip(
                y_test.values[:20],
                y_pred[:20]
            )
        ]
    }
