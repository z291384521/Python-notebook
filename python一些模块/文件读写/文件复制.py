import os
old_path = "test.txt"
new_path = "复制的test.txt"

def copyfile(old_path,new_path):
    old = open(old_path,"rb")
    olddata=old.read()
    new = open(new_path,"wb")
    new.write(olddata)
    old.close()
    new.close()
    pass

def main():
    copyfile(old_path,new_path)

if __name__ == "__main__":
    main()