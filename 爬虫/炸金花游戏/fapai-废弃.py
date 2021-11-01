import random
import operator
#创建扑克牌形式 格式为 ['♥', 'A'], ['♥', '2'], ['♥', '3'], ['♥', '4'], ['♥', '5']等
def auto():
    pokers=[]
    poker=[]
    for i in ['♥','♠','♦','♣']:
        for j in ['14','2','3','4','5','6','7','8','9','10','11','12','13']:
            poker.append(i)
            poker.append(j)
            pokers.append(poker)
            poker=[]
    random.shuffle(poker)
    #shuffle() 方法将序列的所有元素随机排序。可以进行洗牌程序
    return pokers
poker=auto()
#抽卡 存储玩家的抽卡列表
def fapai(self,poker):
    li={}
    for k in ['player1','player2','player3','player4','player5']:
        b=random.sample(poker,3) 
        #提出抽取的牌数
        for i in b:
            poker.remove(i)
        li.setdefault(k,b)
    return  li
playlist =  fapai(poker)   
#判断玩家牌数类型
