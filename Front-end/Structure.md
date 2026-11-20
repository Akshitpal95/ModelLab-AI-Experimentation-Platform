FRONT END STRUCTURE FOR MODEL LAB PROJECT:
# ModelLab – Frontend Project Structure

```text
Front-end/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── ComparisonChart.jsx
│   │   ├── ComparisonChart.css
│   │   ├── DatasetCard.jsx
│   │   ├── DatasetCard.css
│   │   ├── DatasetPreview.jsx
│   │   ├── DatasetPreview.css
│   │   ├── DatasetStats.jsx
│   │   ├── DataTable.jsx
│   │   ├── Navbar.jsx
│   │   ├── navbar.css
│   │   ├── Sidebar.jsx
│   │   ├── sidebar.css
│   │   ├── RecentExperiments.jsx
│   │   ├── RecentExperiments.css
│   │   ├── StatCard.jsx
│   │   ├── statCard.css
│   │   ├── WelcomeBanner.jsx
│   │   └── WelcomeBanner.css
│   │
│   ├── data/
│   │   └── mockResults.js
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── DatasetExplorer.jsx
│   │   ├── DatasetExplorer.css
│   │   ├── ExperimentStudio.jsx
│   │   ├── ExperimentStudio.css
│   │   ├── ModelComparison.jsx
│   │   ├── ModelComparison.css
│   │   ├── ExperimentReport.jsx
│   │   ├── ExperimentReport.css
│   │   ├── ExperimentHistory.jsx
│   │   └── ExperimentHistory.css
│   │
│   ├── services/
│   │   └── experimentService.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
│
└── node_modules/ (installed dependencies – excluded from documentation)
```

The frontend currently contains six main pages:

1. Dashboard
2. Dataset Explorer
3. Experiment Studio
4. Model Comparison
5. Experiment Report
6. Experiment History

**Technology Stack:**
- React.js
- JavaScript (ES6+)
- Vite
- CSS3
- Recharts
- Lucide React


BACK END STRUCTURE FOR MODEL LAB PROJECT:

backend/
│
├── main.py
│
├── datasets/
│   └── dataset_loader.py
│
├── models/
│   ├── logistic_regression.py
│   └── decision_tree.py
│
├── evaluation/
│   └── metrics.py
│
├── experiments/
│   └── trainer.py
│
└── requirements.txt


