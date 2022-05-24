
from importlib.resources import path
import json
import os
from filelock import FileLock
import yaml
import os
import sys
#报错时所含有的环境变量
print(sys.path)



def read_file(file):
    """
    Read a file, support both .yaml and .json format.
    Return empty dict if file not exists.

    Args:
        file (str):

    Returns:
        dict, list:
    """
    # folder = os.path.dirname(file)
    # if not os.path.exists(folder):
    #     os.mkdir(folder)

    # if not os.path.exists(file):
    #     return {}

    _, ext = os.path.splitext(file)
    lock = FileLock(f"{file}.lock")
    with lock:
        print(f'read: {file}')
        if ext == '.yaml':
            with open(file, mode='r', encoding='utf-8') as f:
                s = f.read()
                data = list(yaml.safe_load_all(s))
                if len(data) == 1:
                    data = data[0]
                return data
        elif ext == '.json':
            with open(file, mode='r', encoding='utf-8') as f:
                s = f.read()
                return json.loads(s)
        else:
            print(f'Unsupported config file extension: {ext}')
            return {}







def deep_get(d, keys, default=None):
    """
    获得安全的值
    Get values in dictionary safely.
    https://stackoverflow.com/questions/25833613/safe-method-to-get-value-of-nested-dictionary

    Args:
        d (dict):
        keys (str, list): Such as `Scheduler.NextRun.value`
        default: Default return if key not found.

    Returns:

    """
    if isinstance(keys, str):
        keys = keys.split('.')
    assert type(keys) is list
    if d is None:
        return default
    if not keys:
        return d
    return deep_get(d.get(keys[0]), keys[1:], default)

def deep_iter(data, depth=0, current_depth=1):
    """
    Iter a dictionary safely.

    Args:
        data (dict):
        depth (int): Maximum depth to iter
        current_depth (int):

    Returns:
        list: Key path
        Any:
    """
    if isinstance(data, dict) \
            and (depth and current_depth <= depth):
        for key, value in data.items():
            for child_path, child_value in deep_iter(value, depth=depth, current_depth=current_depth + 1):
                yield [key] + child_path, child_value
    else:
        yield [], data


if __name__ == '__main__':
    os.chdir(r"F:\Python-notebook\alas分解\alas工具类对字典操作")
    print(os.getcwd())
    ALAS_ARGS = read_file(r"args.json")
    # for path, d in deep_iter(ALAS_ARGS, depth=4):
    #     print(path,d)
    deep_get(ALAS_ARGS,'Alas.Emulator.Serial')