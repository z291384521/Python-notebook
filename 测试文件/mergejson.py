

import json
from jsonmerge import merge

# 读取文件数据
with open(r"测试文件\old.json", "r") as f:
    row_old_data = json.load(f)

with open(r"测试文件\new.json", "r") as f:
    row_new_data = json.load(f)

result = merge(row_old_data, row_new_data)

with open("imageSetRule.json", "w") as outfile:
    json.dump(result, outfile)
