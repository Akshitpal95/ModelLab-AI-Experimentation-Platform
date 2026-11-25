import json
import io

import pandas as pd
from fastapi import FastAPI, UploadFile, File, HTTPException, Form

from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel
from services.training_service import run_experiment

from pydantic import Field
from pymongo.errors import PyMongoError

from database import experiments_collection

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ModelLab API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExperimentRunRequest(BaseModel):
    model_name: str

class ExperimentCreate(BaseModel):
    dataset_name: str
    model_name: str
    target_column: str

    feature_count: int
    train_size: int
    test_size: int

    random_state: int = 42

    mae: float
    rmse: float
    r2_score: float

    model_params: dict = Field(default_factory=dict)

    feature_importance: Optional[dict[str, float]] = None



@app.get("/")
def home():
    return {
        "message": "Hii user, Welcome to ModelLab Backend!",
        "status": "Running"
    }



@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "project": "ModelLab"
    }



@app.post("/datasets/preview")
async def preview_dataset(file: UploadFile = File(...)):

    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported"
        )

    try:
        contents = await file.read()

        df = pd.read_csv(io.BytesIO(contents))

        preview = df.head(5)

        preview = preview.astype(object).where(
            pd.notna(preview), None
        )

        return {
            "filename": file.filename,
            "total_rows": len(df),
            "total_columns": len(df.columns),
            "columns": list(df.columns),

            "data_types": {
                column: str(dtype)
                for column, dtype in df.dtypes.items()
            },

            "missing_values": {
                column: int(count)
                for column, count in df.isnull().sum().items()
            },

            "preview": preview.to_dict(orient="records")
        }

    except (
        pd.errors.EmptyDataError,
        pd.errors.ParserError,
        UnicodeDecodeError
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid or unreadable CSV file"
        )




@app.post("/datasets/analyze")
async def analyze_dataset(file: UploadFile = File(...)):

    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported"
        )

    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        if df.empty or len(df.columns) == 0:
            raise HTTPException(
                status_code=400,
                detail="Dataset is empty"
            )

        
        total_rows = len(df)
        total_columns = len(df.columns)

        
        column_analysis = {}

        for col in df.columns:

            missing_count = int(df[col].isnull().sum())

            
            if pd.api.types.is_numeric_dtype(df[col]):
                column_type = "numerical"
            else:
                column_type = "categorical_or_text"

            column_analysis[col] = {
                "data_type": str(df[col].dtype),
                "column_type": column_type,
                "missing_values": missing_count,
                "missing_percentage": round(
                    (missing_count / total_rows) * 100, 2
                ),
                "unique_values": int(df[col].nunique())
            }

        
        numeric_stats = json.loads(
            df.select_dtypes(include="number")
            .describe()
            .to_json()
        )

        return {
            "filename": file.filename,
            "total_rows": total_rows,
            "total_columns": total_columns,
            "duplicate_rows": int(df.duplicated().sum()),
            "column_analysis": column_analysis,
            "numeric_statistics": numeric_stats
        }

    except HTTPException:
        raise

    except (
        pd.errors.EmptyDataError,
        pd.errors.ParserError,
        UnicodeDecodeError
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid or unreadable CSV file"
        )

@app.post("/datasets/select-target")
async def select_target(
    file: UploadFile = File(...),
    target_column: str = Form(...)
):
    try:
        # Read uploaded CSV
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        # Check whether selected column exists
        if target_column not in df.columns:
            raise HTTPException(
                status_code=400,
                detail="Selected target column does not exist."
            )

        # Target must be numerical for regression
        if not pd.api.types.is_numeric_dtype(df[target_column]):
            raise HTTPException(
                status_code=400,
                detail="Target column must be numerical."
            )

        # Separate features and target
        feature_columns = [
            column for column in df.columns
            if column != target_column
        ]

        return {
            "message": "Target selected successfully!",
            "filename": file.filename,
            "total_rows": len(df),
            "target_column": target_column,
            "target_type": str(df[target_column].dtype),
            "feature_columns": feature_columns,
            "target_preview": df[target_column].head(5).tolist()
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=400,
            detail=f"Error selecting target: {str(error)}"
        )

    




@app.post("/datasets/clean")
async def clean_dataset(file: UploadFile = File(...)):

    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported"
        )

    try:
        contents = await file.read()

        df = pd.read_csv(io.BytesIO(contents))

        original_rows = len(df)
        original_duplicates = int(df.duplicated().sum())

      
        df = df.drop_duplicates()

        
        numeric_columns = df.select_dtypes(
            include="number"
        ).columns

        for col in numeric_columns:

            median_value = df[col].median()

            if pd.notna(median_value):
                df[col] = df[col].fillna(median_value)

        
        other_columns = df.select_dtypes(
            exclude="number"
        ).columns

        for col in other_columns:

            mode_values = df[col].mode()

            if not mode_values.empty:
                df[col] = df[col].fillna(mode_values.iloc[0])

       
        cleaned_preview = json.loads(
            df.head(5).to_json(orient="records")
        )

        return {
            "message": "Dataset cleaned successfully",
            "original_rows": original_rows,
            "cleaned_rows": len(df),
            "duplicates_removed": original_duplicates,

            "remaining_missing_values": {
                col: int(count)
                for col, count in df.isnull().sum().items()
            },

            "cleaned_preview": cleaned_preview
        }

    except (
        pd.errors.EmptyDataError,
        pd.errors.ParserError,
        UnicodeDecodeError
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid or unreadable CSV file"
        )

@app.post("/experiments")
def save_experiment(experiment: ExperimentCreate):

    try:
        
        experiment_data = experiment.model_dump()

        
        experiment_data["created_at"] = datetime.now(timezone.utc)

        
        result = experiments_collection.insert_one(experiment_data)

        return {
            "message": "Experiment saved successfully!",
            "experiment_id": str(result.inserted_id),
            "dataset_name": experiment.dataset_name,
            "model_name": experiment.model_name,
            "created_at": experiment_data["created_at"].isoformat()
        }

    except PyMongoError as error:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(error)}"
        )
@app.get("/experiments")
def get_experiments():
    try:
        experiments = experiments_collection.find().sort("created_at", -1).limit(100)

        experiment_list = []

        for experiment in experiments:
            experiment["_id"] = str(experiment["_id"])

            if "created_at" in experiment:
                experiment["created_at"] = experiment["created_at"].isoformat()

            experiment_list.append(experiment)

        return {
            "total_experiments": len(experiment_list),
            "experiments": experiment_list
        }

    except PyMongoError as error:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(error)}"
        )

@app.post("/experiments/run")
def run_ml_experiment(request: ExperimentRunRequest):

    try:
        result = run_experiment(request.model_name)
        return result

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Experiment failed: {str(error)}"
        )