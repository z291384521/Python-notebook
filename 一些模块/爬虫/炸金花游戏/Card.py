# 定义一个牌类，由牌面和花色初始化

class Card:

    def __init__(self, face="", color=""):
    # PRIORITY数组用于比较牌面值，花色，牌型的优先级
    # 豹子>顺金>顺子>对子>单张
        PRIORITY = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
            '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
            '梅花♣': 1, '方块♦': 2, '红心♥': 3, '黑桃♠': 4,
            '单张': 1, '对子': 2, '顺子': 3, '顺金': 4, '豹子': 5
            }
        self.face = face                # 牌面，字符串类型
        self.color = color              # 花色，字符串类型
        self.name = color + face        # 牌的完整名称
        self.prior1 = PRIORITY[face]     # 牌面对应的优先级
        self.prior2 = PRIORITY[color]     # 牌花色对应的优先级
    #重写大小比较方法 也可以对牌进行排序
    def __lt__(self, other):            # 此处重写Card类的'<'符号，先比较牌面，再比较花色，当调用sort函数时，其会自动采用该内置函数比较
        if self.prior1 == other.prior1:
            return self.prior2 <= other.prior2
        else:
            return self.prior1 < other.prior1    