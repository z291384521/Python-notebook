
from importlib.resources import path
import json
import os
from filelock import FileLock
import yaml


def filepath_args(filename='args'):
    print(f"./{filename}.json")
    return f'./{filename}.json'
def read_file(file):
    """
    Read a file, support both .yaml and .json format.
    Return empty dict if file not exists.

    Args:
        file (str):

    Returns:
        dict, list:
    """
    folder = os.path.dirname(file)
    if not os.path.exists(folder):
        os.mkdir(folder)

    if not os.path.exists(file):
        return {}

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

if __name__ == '__main__':
    # os.chdir(r"F:\Python-notebook\alas分解\alas工具类对字典操作")
    path= os.getcwd()
    print(path)
    os.chdir(path)
    ALAS_ARGS = read_file(filepath_args("args"))
    print(ALAS_ARGS)