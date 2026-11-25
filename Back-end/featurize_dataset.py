
import pandas as pd
import numpy as np

from pymatgen.core import Composition
from matminer.featurizers.composition import ElementProperty


df = pd.read_csv("matbench_expt_gap.csv")

print("Original dataset loaded!")
print("Total materials:", len(df))


featurizer = ElementProperty.from_preset("magpie")
feature_names = featurizer.feature_labels()

print("Features per material:", len(feature_names))


all_features = []
failed_rows = []

for index, formula in enumerate(df["composition"]):

    try:
        composition = Composition(formula)
        features = featurizer.featurize(composition)

        all_features.append(features)

    except Exception as error:
        
        all_features.append([np.nan] * len(feature_names))

        failed_rows.append({
            "row": index,
            "composition": formula,
            "error": str(error)
        })

    
    if (index + 1) % 500 == 0:
        print(f"Processed {index + 1}/{len(df)} materials")


feature_df = pd.DataFrame(
    all_features,
    columns=feature_names,
    index=df.index
)


final_df = pd.concat([df, feature_df], axis=1)


final_df.to_csv("matbench_expt_gap_featurized.csv", index=False)


print("\nFEATURIZATION COMPLETE")
print("----------------------")

print("Original materials:", len(df))
print("Final materials:", len(final_df))
print("Total columns:", len(final_df.columns))
print("Features generated per material:", len(feature_names))
print("Failed compositions:", len(failed_rows))

print(
    "Missing feature values:",
    int(feature_df.isna().sum().sum())
)


if failed_rows:
    pd.DataFrame(failed_rows).to_csv(
        "featurization_errors.csv",
        index=False
    )
    print("Error details saved to featurization_errors.csv")

print("\nSaved as: matbench_expt_gap_featurized.csv")
