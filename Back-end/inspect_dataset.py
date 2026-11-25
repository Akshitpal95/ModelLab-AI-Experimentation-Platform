
import json

with open("matbench_expt_gap.json", "r", encoding="utf-8") as file:
    dataset = json.load(file)


columns = dataset["columns"]


records = dataset["data"]

print("Total records:", len(records))
print("Total columns:", len(columns))

print("\nColumn names:")
for column in columns:
    print("-", column)

print("\nFirst 3 records:")

for record in records[:3]:
    print(dict(zip(columns, record)))
