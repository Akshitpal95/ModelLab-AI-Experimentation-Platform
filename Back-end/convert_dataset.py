
import json
import pandas as pd


with open("matbench_expt_gap.json", "r", encoding="utf-8") as file:
    dataset = json.load(file)

df = pd.DataFrame(
    dataset["data"],
    columns=dataset["columns"]
)


df.to_csv("matbench_expt_gap.csv", index=False)

print("Conversion successful!")
print("Total records:", len(df))
print("Columns:", list(df.columns))
