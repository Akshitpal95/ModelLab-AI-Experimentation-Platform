# ModelLab — AI Experimentation Platform

**A full-stack machine-learning experimentation platform for exploring datasets, training regression models, evaluating predictions, and managing experiments.**

[![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-JavaScript-61DAFB?logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Scikit-learn](https://img.shields.io/badge/ML-Scikit--learn-F7931E?logo=scikitlearn)](https://scikit-learn.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)

**Repository:** [Akshitpal95/ModelLab-AI-Experimentation-Platform](https://github.com/Akshitpal95/ModelLab-AI-Experimentation-Platform)

---

## 1. Overview

ModelLab is a full-stack machine-learning experimentation platform developed to make the process of running, evaluating, comparing, and managing machine-learning experiments more accessible.

The platform brings together a React-based frontend, a Python backend powered by FastAPI, machine-learning algorithms from Scikit-learn, and MongoDB for experiment persistence.

The project currently focuses on regression workflows using experimental materials data, including the Matbench Experimental Band Gap dataset.

ModelLab is intended as an educational and technical exploration of machine-learning workflows and scientific software development. It is not presented as a validated scientific benchmark or a replacement for specialized materials-science simulation tools.

## 2. Project Objectives

The main objectives are to:

- Build an integrated environment for running machine-learning experiments.
- Explore numerical datasets used in scientific and materials-related applications.
- Implement and compare regression algorithms.
- Evaluate predictions using standard regression metrics.
- Visualize model predictions and feature importance.
- Store and retrieve experiment records.
- Provide an interface for reviewing previous experiments and their outputs.

## 3. Key Features

### Dataset and experiment workflows

- Work with a processed experimental band-gap dataset.
- Configure and execute regression experiments.
- Select supported machine-learning models.
- Review experiment information and outputs.

### Machine-learning models

Currently implemented:

- Linear Regression
- Random Forest Regressor

### Model evaluation

Model performance is evaluated using:

- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- Coefficient of Determination (R²)

### Visualizations

- Actual vs. Predicted comparison.
- Feature Importance visualization.
- Model performance comparison.

### Experiment management

- Save experiment records in MongoDB.
- Retrieve previously stored experiments.
- View experiment history.
- Search and filter experiment records.
- Review experiment information through the dashboard and history interface.

## 4. Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React, JavaScript, CSS |
| Frontend tooling | Vite |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Python, FastAPI |
| Machine learning | Scikit-learn |
| Data processing | Pandas, NumPy |
| Database | MongoDB Atlas |
| Database integration | PyMongo |
| Version control | Git and GitHub |

## 5. System Architecture

ModelLab follows a frontend-backend architecture in which the frontend communicates with the backend API, the backend executes machine-learning workflows, and experiment information is persisted in MongoDB.

```text
              USER
                |
                v
       REACT FRONTEND
                |
        API REQUESTS
                |
                v
        FASTAPI BACKEND
                |
        DATA PROCESSING
          Pandas / NumPy
                |
                v
       SCIKIT-LEARN MODELS
       /                 \
Linear Regression   Random Forest
       \                 /
                |
                v
       MODEL EVALUATION
          MAE / RMSE / R²
                |
          +-----+-----+
          |           |
          v           v
      MongoDB      API Response
      Storage          |
                       v
               REACT VISUALIZATION
```

### Architecture components

**Frontend:** Provides the user interface for interacting with datasets, experiments, model outputs, dashboards, and experiment history.

**Backend:** Handles API communication, data processing, experiment execution, and result preparation.

**Machine-learning layer:** Uses Scikit-learn to train regression models and evaluate their predictions.

**Database:** MongoDB stores experiment records so that users can retrieve and review previous runs.

## 6. Machine-Learning Workflow

The current experimental workflow can be summarized as follows:

1. Load the processed experimental dataset.
2. Prepare the numerical features and target variable.
3. Configure a regression experiment.
4. Select a supported regression algorithm.
5. Execute the model-training workflow.
6. Generate predictions.
7. Evaluate predictions using MAE, RMSE, and R².
8. Generate visualizations for model analysis.
9. Save experiment information.
10. Retrieve and review experiment history.

The platform currently demonstrates this workflow using Linear Regression and Random Forest Regressor.

## 7. Dataset Information

### Matbench Experimental Band Gap Dataset

ModelLab uses a processed dataset based on the Matbench Experimental Band Gap task.

| Property | Description |
|---|---|
| Dataset | Matbench Experimental Band Gap |
| Processed file | `matbench_expt_gap_featurized.csv` |
| Samples | 4,604 |
| Columns | 134 |
| Numerical input features | 132 |
| Target column | `gap expt` |
| Problem type | Regression |
| Target property | Experimental band gap |
| Target unit | Electron volts (eV) |

The target variable represents the experimental band-gap property.

The processed dataset is used to explore regression workflows and compare the behaviour of different machine-learning algorithms.

### Dataset preprocessing and validation

The processed dataset was inspected for common data-quality issues. The project documentation records that the inspected data contained no missing values, infinite values, or constant features.

The dataset used by ModelLab is a processed, featurized representation. It should not be confused with the original raw materials data or assumed to reproduce every preprocessing decision in the official Matbench benchmark.

### Dataset attribution

The dataset is associated with the Matbench benchmark and the experimental band-gap task.

Relevant references:

- Zhuo, Y., Mansouri Tehrani, A., & Brgoch, J. (2018). *Predicting the Band Gaps of Inorganic Solids by Machine Learning*. The Journal of Physical Chemistry Letters. https://doi.org/10.1021/acs.jpclett.8b00124
- Dunn, A., Wang, Q., Ganose, A., Dopp, D., & Jain, A. (2020). *Benchmarking Materials Property Prediction Methods: The Matbench Test Set and Automatminer Reference Algorithm*. npj Computational Materials. https://doi.org/10.1038/s41524-020-00406-3
- Matbench project: https://github.com/materialsproject/matbench

Please consult the original publications and dataset documentation for the complete scientific context and attribution requirements.

## 8. Installation and Setup

### Prerequisites

The following tools are needed to run the application:

- Python 3
- Node.js and npm
- Git
- MongoDB Atlas account or an appropriately configured MongoDB instance
- A code editor such as Visual Studio Code

### Clone the repository

```bash
git clone https://github.com/Akshitpal95/ModelLab-AI-Experimentation-Platform.git
cd ModelLab-AI-Experimentation-Platform
```

The repository contains separate `Front-end` and `Back-end` directories.

### Frontend setup

Navigate to the frontend directory:

```bash
cd Front-end
```

Install the project dependencies:

```bash
npm install
```

Start the Vite development server using the available development script:

```bash
npm run dev
```

The terminal will display the local development address.

For a production build, use:

```bash
npm run build
```

### Backend setup

Open another terminal and navigate to the backend directory:

```bash
cd Back-end
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Activate it on macOS or Linux:

```bash
source venv/bin/activate
```

Install the backend dependencies using the dependency manifest provided in the backend directory. For example, if the project contains `requirements.txt`:

```bash
pip install -r requirements.txt
```

Start the FastAPI application using the Uvicorn entry point corresponding to the backend's actual application module:

```bash
uvicorn <module>:app --reload
```

Replace `<module>` with the Python module containing the FastAPI application instance.

The API documentation is generally available at the `/docs` route when FastAPI's interactive documentation is enabled.

## 9. Environment Configuration

ModelLab uses MongoDB for experiment persistence and requires the backend to connect to the configured database.

Configure the database connection through the environment-variable name expected by the backend implementation.

Example configuration format:

```env
# Use the variable name expected by your backend.
# Store your MongoDB connection string here.
YOUR_DATABASE_CONNECTION_VARIABLE=your_mongodb_connection_string
```

**Security recommendations:**

- Never commit MongoDB connection strings or passwords.
- Never expose API keys or private configuration values.
- Keep local environment files out of version control.
- Use environment variables for sensitive configuration.
- Check `.gitignore` before committing changes.
- If a credential has been exposed, rotate it rather than simply deleting it from the latest commit.

The example above is illustrative; use the actual configuration variable expected by the backend.

## 10. API Information

FastAPI acts as the communication layer between the React frontend and the Python machine-learning backend.

The backend is responsible for receiving experiment requests, executing supported workflows, and returning results to the frontend.

The application includes API functionality for experiment execution and experiment-history retrieval.

FastAPI can provide interactive API documentation through:

```text
/docs
```

The exact API routes, request schemas, and response fields should be read from the running backend's API documentation and implementation.

## 11. Running Experiments

A typical experiment through the ModelLab interface involves:

1. Opening the application dashboard.
2. Navigating to the Experiment Studio.
3. Selecting a supported regression model.
4. Configuring and submitting an experiment.
5. Allowing the backend to execute the workflow.
6. Reviewing the evaluation metrics.
7. Examining the generated visualizations.
8. Opening the experiment history to review saved records.
9. Comparing available model results.

The currently supported regression algorithms are Linear Regression and Random Forest Regressor.

## 12. Example Outputs

ModelLab produces several types of experiment outputs.

**Evaluation metrics**

- MAE: Measures the average absolute difference between actual and predicted values.
- RMSE: Measures prediction error while giving greater weight to larger errors.
- R²: Describes how well the model explains variation in the target values relative to a baseline.

**Visual analysis**

- Actual vs. Predicted plots help examine the relationship between model predictions and observed values.
- Feature Importance charts provide a model-specific view of which input features contributed to a tree-based model's predictions.

**Experiment records**

Experiment information can be saved and retrieved through the experiment-history workflow.

No numerical performance scores are reported here because results depend on the experiment configuration and execution. The presence of evaluation metrics does not, by itself, establish that one algorithm is universally superior.

## 13. Limitations

The current version has several limitations:

- The implemented model selection is limited to Linear Regression and Random Forest Regressor.
- The project focuses on a particular processed experimental dataset.
- The current workflow does not establish generalization across all materials datasets.
- Feature-importance outputs are model-dependent and should not be interpreted as causal physical explanations.
- Complete experiment reproducibility would benefit from recording all preprocessing details, model hyperparameters, random seeds, software versions, and dataset versions.
- The platform is an experimentation and educational software project, not a validated production materials-discovery system.

## 14. Future Improvements

Potential future development directions include:

- Additional regression algorithms and model families.
- Reproducible experiment configurations and exportable experiment records.
- More comprehensive experiment metadata.
- Improved dataset management and versioning.
- Model interpretability and explainability tools.
- Small-data machine-learning workflows.
- Bayesian optimization for hyperparameter selection.
- Active-learning workflows for iterative data selection.
- Support for additional scientific and materials datasets.
- More detailed experiment reporting and comparison.

These are proposed extensions, not claims about features already implemented.

## 15. Acknowledgements

ModelLab builds upon the open-source Python and scientific-computing ecosystem.

Acknowledgements go to the developers and maintainers of:

- React
- FastAPI
- Scikit-learn
- Pandas
- NumPy
- MongoDB
- Recharts
- Matbench and the researchers behind the associated materials-informatics work

Please refer to the original projects and publications for their respective licensing and attribution terms.

## 16. License

No project-level license is specified in this README.

The licensing terms of ModelLab should be established separately by its author. The licenses of third-party libraries and the dataset should also be reviewed independently.

Until a project license is added to the repository, permissions for reuse, modification, and redistribution should not be assumed.

---

## Author

**Akshit Pal**

Bachelor of Computer Applications (BCA)  
Maharaja Agrasen Institute of Management Studies (MAIMS)  
Guru Gobind Singh Indraprastha University (GGSIPU)

GitHub: [@Akshitpal95](https://github.com/Akshitpal95)

---

*ModelLab is an independently developed project exploring the intersection of full-stack software development, machine learning, and scientific data workflows.*
