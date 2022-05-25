
from importlib.resources import path
import json
import os
from filelock import FileLock
import yaml
import os
import sys
from datetime import datetime, timedelta, timezone
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
    #通过不断的减少 keys来读取
    return deep_get(d.get(keys[0]), keys[1:], default)

def deep_pop(d, keys, default=None):
    """
    模仿get的
    Pop value from dictionary safely, imitating deep_get().
    """
    if isinstance(keys, str):
        keys = keys.split('.')
    assert type(keys) is list
    if not isinstance(d, dict):
        return default
    if not keys:
        return default
    elif len(keys) == 1:
        return d.pop(keys[0], default)
    return deep_pop(d.get(keys[0]), keys[1:], default)

def deep_default(d, keys, value):
    """
    Set default value into dictionary safely, imitating deep_get().
    Value is set only when the dict doesn't contain such keys.
    对于没有的值赋value的值
    """
    if isinstance(keys, str):
        keys = keys.split('.')
    assert type(keys) is list
    if not keys:
        if d:
            return d
        else:
            return value
    if not isinstance(d, dict):
        d = {}
    d[keys[0]] = deep_default(d.get(keys[0], {}), keys[1:], value)
    return d

def deep_set(d, keys, value):
    """
    Set value into dictionary safely, imitating deep_get().
    """
    if isinstance(keys, str):
        keys = keys.split('.')
    assert type(keys) is list
    if not keys:
        return value
    if not isinstance(d, dict):
        d = {}
    #deep_set返回value来修改字典
    d[keys[0]] = deep_set(d.get(keys[0], {}), keys[1:], value)
    return d
 
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
            #通过不断的减少层数
            for child_path, child_value in deep_iter(value, depth=depth, current_depth=current_depth + 1):
                yield [key] + child_path, child_value
    else:
        yield [], data


def parse_value(value, data):
    """
    Convert a string to float, int, datetime, if possible.

    Args:
        value (str):
        data (dict):

    Returns:

    """
    if 'option' in data:
        if value not in data['option']:
            return data['value']
    if isinstance(value, str):
        if value == '':
            return None
        if value == 'true' or value == 'True':
            return True
        if value == 'false' or value == 'False':
            return False
        if '.' in value:
            try:
                return float(value)
            except ValueError:
                pass
        else:
            try:
                return int(value)
            except ValueError:
                pass
        try:
            return datetime.fromisoformat(value)
        except ValueError:
            pass

    return value
if __name__ == '__main__':
    os.chdir(os.path.dirname(__file__))
    ALAS_ARGS = read_file(r"args.json")
    # for path, d in deep_iter(ALAS_ARGS, depth=3):
    #     print(path,d)
    value=deep_get(ALAS_ARGS,'Alas.Emulator.Serial')
    print(value)
    value1=deep_set(ALAS_ARGS,'Alas.Emulator.Serial',value="")
    # print(value1)
    value=deep_get(ALAS_ARGS,'Alas.Emulator.Serial')
    print(value)
    value2=deep_default(ALAS_ARGS,'Alas.Emulator.Serial',value="zzzz11")
    # print(value2)
    value=deep_get(ALAS_ARGS,'Alas.Emulator.Serial')
    print(value)