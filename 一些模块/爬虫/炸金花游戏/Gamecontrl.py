from .Card import *
import Player
import random
#配置类 
# 分别定义全局变量：牌面值，花色，牌型，玩家姓名
FACES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
COLORS = ['黑桃♠', '红心♥', '方块♦', '梅花♣']
TYPE = ['豹子', '顺金', '顺子', '对子', '单张']
NAMES = ['#Player1', '#Player2', '#Player3', '#Player4', '#Player5']
# 牌组列表初始化为空，玩家组列表初始化为空
CARD_GROUP = list()
PLAYERS = list()
# 功能：初始化52张的扑克牌列表，即生成一副完整的牌，然后初始化玩家列表
def init():
    CARD_GROUP.clear()  # 清空牌组列表
    for f in FACES:  # 遍历牌面值
        for c in COLORS:  # 遍历花色
            CARD_GROUP.append(Card(f, c))  # 添加扑克牌
    for name in NAMES:  # 初始化玩家列表
        PLAYERS.append(Player(name))  # 添加玩家
# 功能：实现发牌
def deal():
    # 因为每人需要发三张牌，所以用三次循环实现
    # 模拟随机发牌过程：每次随机抽取一张牌，然后从列表移除
    circle = 3
    for i in range(circle):
        print('第{0}轮发牌：'.format((i + 1)), end='\t')
        for p in PLAYERS:
            temp = random.choice(CARD_GROUP)        # 随机抽牌
            CARD_GROUP.remove(temp)                 # 从牌组移除这张牌
            p.card.append(temp)                     # 将牌加入玩家的card列表里面
            print(temp.name, end='\t\t')            # 打印牌名称



init()
deal()