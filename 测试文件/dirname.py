
import os
print(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')) \
            .replace(r'\\', '/').replace('\\', '/').replace('\"', '"'))


try:
    from win32com.client import GetObject
except ModuleNotFoundError:
    print('pywin32 not installed, skip')

wmi = GetObject('winmgmts:')
processes = wmi.InstancesOf('Win32_Process')
def iter_process_by_name():
    for p in processes:
        executable_path = p.Properties_["ExecutablePath"].Value
        process_name = p.Properties_("Name").Value
        process_id = p.Properties_["ProcessID"].Value
        # print(executable_path,process_name,process_id)
        # 
        yield executable_path, process_name, process_id


for row in iter_process_by_name():
    print(' '.join(map(str, row)))
    print(row)
    print("*"*50)