# 定义一个Player类,由玩家姓名初始化
class Player:
    PRIORITY = {'单张': 1, '对子': 2, '顺子': 3, '顺金': 4, '豹子': 5
        }
    def __init__(self, name=""):
        self.card = list()      # 玩家拥有的牌存储在card里面，元素类型为Card
        self.name = name        # 玩家姓名
        self.type = ''          # 牌型
        self.winner = False     # 标志，记录该玩家是否是最后的赢家
        self.pair = 0           # 记录第一张对子牌的索引，默认为0 判断相同对子下那张单牌最大
        self.duizhi = 0         #对子的大小
        self.dange = 0          #单个的大小是对子就单个 单个就是最大值
        self.weight = 0         #权重大小
    def info(self):
        print(self.name, end='\t')          # 输出玩家姓名
        for c in self.card:                 # 输出牌面
            print(c.name, end='\t')
        print("\n")
    #判断我牌中的类型
    def judge_type(self):
        self.card.sort(reverse=True)        # 对玩家的牌按照优先级从大到小排序
        cards = self.card
        #3张一样豹子
        if cards[0].prior1 == cards[1].prior1 and cards[0].prior1 == cards[2].prior1:
            self.type = '豹子'
        #大小排序过相间为2顺金
        elif cards[1].prior1-cards[0].prior1 == 1 and cards[2].prior1-cards[1].prior1 == 1:
            if cards[0].prior2 == cards[1].prior2 and cards[0].prior2 == cards[2].prior2:
                self.type = '顺金'
            else:
                self.type = '顺子'
        elif cards[0].prior1 == cards[1].prior1:
            self.type = '对子'
            self.duizhi = cards[0].prior1 
            self.dange = cards[2].prior1 
        elif cards[1].prior1 == cards[2].prior1:        # 排序过后，若出现对子牌，那么它们必定连在一起，所以其实索引0和2不用比较
            self.type = '对子'
            self.pair = 1
            self.duizhi = cards[1].prior1 
            self.dange = cards[0].prior1 
        else:
            self.type = '单张'
            self.dange = cards[0].prior1
    #计算权重
    def calculate_weight(self):
        if(self.type=='豹子'):
            self.weight =  10000 + self.card.prior1
        elif(self.type=='顺金'):
            self.weight =  8000 + self.card.prior1+self.card.prior2+self.card.prior3
        elif(self.type=='顺子'):
            self.weight =  6000 + self.card.prior1+self.card.prior2+self.card.prior3
        elif(self.type=='对子'):
            self.weight =  4000 + self.duizhi*2*20+self.dange
        elif(self.type=='单张'):
            self.weight =  self.dange*10+self.card[0].prior2
            pass
        #重写大小比较方法 也可以对牌进行排序
    
    def __lt__(self, other):           
         #用于权重比较
            return self.weight < other.weight    