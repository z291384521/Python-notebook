# PEP484写法
# python3.5以上
if __name__ == "__main__":
    num : int = 100
    print(num)

    num_list:int = [1,2,3,4]
    print(num_list)

    message : str = "hello"
    print(message)

    is_login:bool = True
    print(is_login)
    #->后面是返回值得类型
    def add(num1:int,num2:int)-> int:
        return num1+num2