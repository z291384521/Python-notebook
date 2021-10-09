import os
import multiprocessing


def copy_file(q, file_name, old_folder_name, new_folder_name):
    """完成文件的复制"""
    # print("======>模拟copy文件：从%s--->到%s 文件名是:%s" % (old_folder_name, new_folder_name, file_name))
    old_f = open(old_folder_name + "/" + file_name, "rb")
    content = old_f.read()
    old_f.close()

    new_f = open(new_folder_name + "/" + file_name, "wb")
    new_f.write(content)
    new_f.close()

    # 如果拷贝完了文件，那么就向队列中写入一个消息，表示已经完成
    q.put(file_name)

def main():
    # 1. 获取用户要copy的文件夹的名字
    old_folder_name = input("请输入要copy的文件夹的名字：")
    # 2. 创建一个新的文件夹
    try:
        new_folder_name = old_folder_name + "[复件]"
        os.mkdir(new_folder_name)
    except:
        pass
    # 3 获取文件夹的所有的待copy的文件名字 listdir()
    file_names = os.listdir(old_folder_name)
    #os.listdir() 方法用于返回指定的文件夹包含的文件或文件夹的名字的列表。

if __name__ == "__main__":
    main()
