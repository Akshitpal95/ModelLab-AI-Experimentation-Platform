
from pymatgen.core import Composition
from matminer.featurizers.composition import ElementProperty


formula = "Ag0.5Ge1Pb1.75S4"


composition = Composition(formula)


featurizer = ElementProperty.from_preset("magpie")

features = featurizer.featurize(composition)


feature_names = featurizer.feature_labels()

print("Original formula:", formula)
print("Total numerical features:", len(features))

print("\nFirst 10 generated features:")

for name, value in zip(feature_names[:10], features[:10]):
    print(f"{name}: {value}")
