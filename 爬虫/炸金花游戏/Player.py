# 定义一个Player类,由玩家姓名初始化
class Player:
    def __init__(self, name=""):
        self.card = list()      # 玩家拥有的牌存储在card里面，元素类型为Card
        self.name = name        # 玩家姓名
        self.type = ''          # 牌型
        self.winner = False     # 标志，记录该玩家是否是最后的赢家
#        self.pair = 0           # 记录第一张对子牌的索引，默认为0