declare module app {
    class GameByteArray extends egret.ByteArray {
        private DT_VOID;
        private DT_SMALL;
        private DT_USMALL;
        private DT_SHORT;
        private DT_USHORT;
        private DT_INT;
        private DT_UINT;
        private DT_FLOAT;
        constructor();
        readString(): string;
        readNumber(): number;
        writeNumber(val: number): void;
        writeInt64(bigInt: uint64): void;
        writeString(value: string): void;
        writeCmd(id: number, subId: number): void;
        readInts(count: number): number[];
        writeInts(...nums: number[]): void;
        readNumeric(type: number): number;
    }
}
/**
 * Created by yangsong on 15-1-14.
 * Sound基类
 */
declare module app {
    class BaseSound {
        _cache: any;
        _loadingCache: Array<string>;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 处理音乐文件的清理
         */
        private dealSoundTimer();
        /**
         * 获取Sound
         * @param key
         * @returns {egret.Sound}
         */
        getSound(key: string): egret.Sound;
        /**
         * 资源加载完成
         * @param event
         */
        private onResourceLoadComplete(data, key);
        /**
         * 资源加载完成后处理播放，子类重写
         * @param key
         */
        loadedPlay(key: string): void;
        /**
         * 检测一个文件是否要清除，子类重写
         * @param key
         * @returns {boolean}
         */
        checkCanClear(key: string): boolean;
    }
}
/**
 * Created by yangsong on 2014/11/22.
 * 对象池类
 */
declare module app {
    class ObjectPool {
        private static _content;
        private _objs;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 放回一个对象
         * @param obj
         */
        pushObj(obj: any): void;
        /**
         * 取出一个对象
         * @returns {*}
         */
        popObj(): any;
        /**
         * 清除所有缓存对象
         */
        clear(): void;
        /**
         * 取出一个对象
         * @param classZ Class
         * @return Object
         *
         */
        static pop(refKey: string, ...args: any[]): any;
        /**
         * 取出一个对象
         * @param refKey Class
         * @param extraKey 标识值
         * @returns {any}
         */
        static popWithExtraKey(refKey: string, extraKey: any): any;
        /**
         * 放入一个对象
         * @param obj
         *
         */
        static push(obj: any): boolean;
        /**
         * 清除所有对象
         */
        static clear(): void;
        /**
         * 清除某一类对象
         * @param classZ Class
         * @param clearFuncName 清除对象需要执行的函数
         */
        static clearClass(refKey: string, clearFuncName?: string): void;
        /**
         * 缓存中对象统一执行一个函数
         * @param classZ Class
         * @param dealFuncName 要执行的函数名称
         */
        static dealFunc(refKey: string, dealFuncName: string): void;
        /**
         * 清空Obj对象
         * @param obj Object
         */
        static wipe(obj: any): void;
    }
}
/**
 * A*寻路实现类
 * 阅读此代码必须具备A*算法的理论知识
 * @author WynnLam
 *
 */
declare module gamelib {
    class AStar {
        /**
         * 寻路算法有关的常量定义
         *
         */
        static RMOVECOST: number;
        static DMOVECOST: number;
        static AS_MOVECOST: any[];
        static NEIGHBORPOS_X_VALUES: number[];
        static NEIGHBORPOS_Y_VALUES: number[];
        /**
         * 类成员定义
         */
        private m_LastOpenCell;
        private m_ASMapCells;
        private m_nWidth;
        private m_nHeight;
        private m_nMarkTag;
        private listener;
        private thisObj;
        /**
        * 格子检测函数
        * @param listener  检测函数
        * @param thisObj  回调函数的this引用
        */
        constructor(listener: Function, thisObj: any);
        /**
         * 从地图中初始化
         * @param map
         *
         */
        initFromMap(map: any): void;
        /**
         * 寻路
         * @param fromX 起始坐标X
         * @param fromY 起始坐标Y
         * @param targetX 目的地坐标X
         * @param targetY 目的地坐标Y
         * @return 路径点数组
         *
         */
        getPatch(fromX: number, fromY: number, targetX: number, targetY: number): any;
        /**
             * 寻路开始的时候重置起点数据
             * @param cX
             * @param cY
             *
             */
        private reset(cX, cY);
        /**
         * 关闭指定的格子
         * @param cell
         *
         */
        private closeCell(cell);
        /**
         * 开启指定的格子
         * @param cell
         *
         */
        private openCell(cell);
        /**
         * 重新开启指定的格子更新移动估价值并重新再已开启格子链表中排序
         * @param cell
         *
         */
        private reopenCell(cell);
        /**
         * 判断指定的格子是否可移动
         * @param x 格子x坐标
         * @param y 格子y坐标
         * @return
         *
         */
        ishidden(x: number, y: number): boolean;
        /**
         * 判断指定的格子是否可移动
         * @param x 格子x坐标
         * @param y 格子y坐标
         * @return
         *
         */
        isWalkableTile(x: number, y: number): boolean;
    }
    /**
     * A*寻路类地图中的坐标格子
     * 同时也作为寻路搜索过程中的路径点链表节点
     * 格子在寻路对象将按照链表的方式依据移动估价值进行排序
     * @author Miros
     *
     */
    class ASMapCell {
        /**
         * 格子状态值定义
         *
         */
        static CSNONE: number;
        static CSOPEN: number;
        static CSCLOSE: number;
        X: number;
        Y: number;
        CanNotMove: number;
        MarkTag: number;
        /**
         * 寻路计算过程中的相关参数
         */
        LastX: number;
        LastY: number;
        HCost: number;
        GCost: number;
        FValue: number;
        State: number;
        Prev: ASMapCell;
        Next: ASMapCell;
        btDir: number;
    }
}
/**
 * Created by yangsong on 15-1-20.
 */
declare module gamelib {
    class DeviceUtils {
        /**
         * 当前是否Html5版本
         * @returns {boolean}
         * @constructor
         */
        static readonly IsHtml5: boolean;
        /**
         * 当前是否是Native版本
         * @returns {boolean}
         * @constructor
         */
        static readonly IsNative: boolean;
        /**
         * 是否是在手机上
         * @returns {boolean}
         * @constructor
         */
        static readonly IsMobile: boolean;
        /**
         * 是否是在手机上
         * @returns {boolean}
         * @constructor
         */
        static readonly IsIOS: boolean;
        /**
         * 是否是ipad
         */
        static readonly IsIpad: boolean;
        /**
         * 是否是在PC上
         * @returns {boolean}
         * @constructor
         */
        static readonly IsPC: boolean;
        /**
         * 是否是QQ浏览器
         * @returns {boolean}
         * @constructor
         */
        static readonly IsQQBrowser: boolean;
        /**
         * 是否是IE浏览器
         * @returns {boolean}
         * @constructor
         */
        static readonly IsIEBrowser: boolean;
        /**
         * 是否是Firefox浏览器
         * @returns {boolean}
         * @constructor
         */
        static readonly IsFirefoxBrowser: boolean;
        /**
         * 是否是Chrome浏览器
         * @returns {boolean}
         * @constructor
         */
        static readonly IsChromeBrowser: boolean;
        /**
         * 是否是Safari浏览器
         * @returns {boolean}
         * @constructor
         */
        static readonly IsSafariBrowser: boolean;
        /**
         * 是否是Opera浏览器
         * @returns {boolean}
         * @constructor
         */
        static readonly IsOperaBrowser: boolean;
    }
}
/**
 * Created by hrz on 2017/8/25.
 */
declare module gamelib {
    class FixUtil {
        static resourceRoot: string;
        /** 心跳时间 */
        static heartbeatTime: number;
        static timeoutId: number;
        static isTimeout: number;
        /** 启动心跳 */
        static startUpHeartbeat(): void;
        /** 暂停心跳 */
        static stopUpHeartbeat(): void;
        static fixAll(): void;
    }
}
declare module app {
    class AgeWin extends eui.Component {
        constructor();
        private clazz;
        private btn_close;
        private sureBtn;
        private textLab;
        protected childrenCreated(): void;
        private initUI();
        private onClick(e);
        removeView(): void;
    }
}
declare module app {
    /**
     * 游戏参数信息
     */
    class GameParameter {
        constructor();
        private _userInfo;
        /**
         * 玩家账号信息
         */
        /**
         * 玩家账号信息
         */
        userInfo: any;
        private _loginType;
        /** 登录类型 0：测试 1：正式 */
        /** 登录类型 0：测试 1：正式 */
        loginType: boolean;
        private _gameLogo;
        /** 游戏Logo */
        /** 游戏Logo */
        gameLogo: string;
        private _gameLoadImg;
        /** 游戏加载背景 */
        /** 游戏加载背景 */
        gameLoadImg: string;
        private _gameLoginImg;
        /** 游戏选服背景 */
        /** 游戏选服背景 */
        gameLoginImg: string;
        private _game;
        /** 游戏编号 */
        /** 游戏编号 */
        game: string;
        private _pf;
        /**
         * 平台名称
         */
        /**
         * 平台名称
         */
        pf: string;
        private _pfID;
        /**
         * 平台id
         */
        /**
         * 平台id
         */
        pfID: number;
        private _serviceListdUrl;
        /**
         * 服务列表地址
         */
        /**
         * 服务列表地址
         */
        serviceListdUrl: string;
        private _setServiceListdUrl;
        /**
         * 保存最近登录
         */
        /**
         * 保存最近登录
         */
        setServiceListdUrl: string;
        private _checkUrl;
        /**
         * 登录验证接口
         */
        /**
         * 登录验证接口
         */
        checkUrl: string;
        private _payUrl;
        /**
         * 充值接口
         */
        /**
         * 充值接口
         */
        payUrl: string;
        private _orderUrl;
        /**
         * 订单号
         */
        /**
         * 订单号
         */
        orderUrl: string;
        private _payNotice;
        /**
         * 支付回调
         */
        /**
         * 支付回调
         */
        payNotice: string;
        private _gongGaoUrl;
        /**
         * 公告信息
         */
        /**
         * 公告信息
         */
        gongGaoUrl: string;
        private _isReport;
        /**
         * 是否上报后台
         */
        /**
         * 是否上报后台
         */
        isReport: boolean;
        private _isShowGongGao;
        /**
         * 是否显示公告按钮
         */
        /**
         * 是否显示公告按钮
         */
        isShowGongGao: boolean;
        private _isAutoShowGongGao;
        /**
         * 是否自动弹出公告
         */
        /**
         * 是否自动弹出公告
         */
        isAutoShowGongGao: boolean;
        private _reportURL;
        /**
         * 上报后台地址
         */
        /**
         * 上报后台地址
         */
        reportURL: string;
        private _reportURLPF;
        /**
         * 上报渠道地址
         */
        /**
         * 是否上报渠道
         */
        reportURLPF: string;
        private _isReportPF;
        /**
         * 是否上报渠道
         */
        /**
         * 是否上报渠道
         */
        isReportPF: boolean;
        private _isDisablePay;
        /**
         * 是否关闭充值
         */
        /**
         * 是否关闭充值
         */
        isDisablePay: boolean;
        private _extraParame;
        /**
         * 附加参数
         */
        /**
         * 附加参数
         */
        extraParame: any;
        private _publicRes;
        /** 公用资源 */
        /** 公用资源 */
        publicRes: string;
        private _gameVersion;
        /** 应用版本 */
        /** 应用版本 */
        gameVersion: string;
        private _gameAppVersion;
        /** 游戏版本 */
        /** 游戏版本 */
        gameAppVersion: string;
    }
}
declare module app {
    /**
     * 游戏socket接口
     *
     */
    class GameSocket {
        private socket_;
        static FIRST_KEY: number;
        /**
         * 是否跨服中
         */
        static IsCrossService: boolean;
        /** 连接中 */
        static STATUS_CONNECTING: number;
        /** 检验中 */
        static STATUS_CHECKING: number;
        /** 连接生效 */
        static STATUS_COMMUNICATION: number;
        /** 关闭连接 */
        static STATUS_DISCONNECT: number;
        private _isAddGameApp;
        isAddGameApp: boolean;
        isNewRole: boolean;
        _host: string;
        _port: number;
        private _socketStatus;
        private _packets;
        private _lastReceiveTime;
        private recvPack;
        private pid;
        private _salt;
        /**
         * 服务器协议处理注册表
         * 格式
         * PACK_HANDLER[sysId][msgId] = [fun,funThisObj]
         */
        PACK_HANDLER: any[];
        static CLASSNAME: string;
        static _ins: GameSocket;
        _serverId: number;
        _originalSrvid: number;
        _user: string;
        _pwd: string;
        private _automaticLink;
        automaticLink: boolean;
        static ins(): GameSocket;
        constructor();
        getSocket(): egret.WebSocket;
        newSocket(): void;
        /**
         * 发送到服务器
         * @param bytes
         */
        sendToServer(bytes: GameByteArray): void;
        private _isDoTimer;
        isDoTimer: boolean;
        private connectError(...p);
        connect(host: string, port: number): void;
        close(): void;
        logoutClose(): void;
        send(message: egret.ByteArray): boolean;
        private onSocketConnected(e);
        private onSocketRead(e);
        private sendKeyToServer();
        private onSocketClose(e);
        reLogin(): void;
        private updateStatus(status);
        onFinishCheck(newStatus: number, oldStatus: number): void;
        readonly host: string;
        readonly port: number;
        sendCheckAccount(user: string, pwd: string): void;
        KfsendCheckAccount(roleId: number, serverID: number): void;
        login(user: string, pwd: string, serverID: number, ip: string, port: number, originalSrvid?: number): void;
        protected processRecvPacket(packet: GameByteArray): void;
        private errorCode;
        private _openDay;
        openDay: number;
        private myRoleInfo;
        getMyRoleInfo(): Array<SimplePlayerInfo>;
        setMyRoleInfoLevel(level: number): void;
        setMyRoleInfoZsLevel(zsLevel: number): void;
        setMyRoleInfoGuildName(str: string): void;
        initMyRoleInfo(): void;
        selectRolId: number;
        accountId: number;
        private countNum;
        private createSign;
        setMyRoleInfoName(str: string): void;
        /** 派发协议 */
        private dispatch(sysId, msgId, byte);
        /**
         * 回收bytes对象
         * @param byte
         */
        recycleByte(byte: GameByteArray): void;
        /**
         * 从对象池获取一个bytes对象
         */
        getBytes(): GameByteArray;
        /**
         * 注册一个服务器发送到客户端的消息处理
         * @param msgId
         * @param fun
         * @param thisObj
         */
        registerSTCFunc(sysId: number, msgId: number, fun: (bytes: GameByteArray) => void, sysClass: any): void;
        onClose(): void;
        showLoading(): void;
        onConnected(): void;
        sendPack(pack: egret.ByteArray): void;
        /**
         * 连接服务器
         */
        connectServer(): void;
        switchConnectServer(): void;
        /**
         * 发送创建角色请求
         * @param pName 名称
         * @param pSex 性别
         * @param pJob 职业编号
         * @param pFace 头像编号
         * @param camp 阵营编号
         * @param autoEnterGame 创建成功是否自动进入游戏
         *
         */
        s_255_4(pName: string, token: string, advID: number, pSex?: number, pJob?: number): void;
        /**
         * 角色随机名字
         */
        s_255_6(sex: number): void;
        /**
         * 心跳
         */
        s_255_88(): void;
        heartbeatPak(type: any): void;
        logon(): void;
        private _kFRoleId;
        private _KFServerId;
        private _KFOriginalSrvid;
        /**
         * 跨服登录
         */
        KFLogin(roleId: number, serverID: number, ip: string, port: number, originalSrvid?: number): void;
    }
}
/**
 * Created by yangsong on 15-1-26.
 * 键盘工具类
 */
declare module gamelib {
    class KeyboardUtils {
        private key_ups;
        private key_downs;
        isInput: boolean;
        /**
         * 构造函数
         */
        constructor();
        static ins(): KeyboardUtils;
        /**
         * 添加KeyUp事件
         * @param callback 回调函数
         * @param target 回调函数对应的对象
         */
        addKeyUp(callback: Function, target: any): void;
        /**
         * 添加KeyDown事件
         * @param callback 回调函数
         * @param target 回调函数对应的对象
         */
        addKeyDown(callback: Function, target: any): void;
        /**
         * 移除KeyUp事件
         * @param callback 回调函数
         * @param target 回调函数对应的对象
         */
        removeKeyUp(callback: Function, target: any): void;
        /**
         * 移除KeyDown事件
         * @param callback 回调函数
         * @param target 回调函数对应的对象
         */
        removeKeyDown(callback: Function, target: any): void;
    }
}
/**
 * keycode枚举
 * @author Maliu
 */
declare module gamelib {
    class KeyCode {
        static KC_1: number;
        static KC_2: number;
        static KC_3: number;
        static KC_4: number;
        static KC_5: number;
        static KC_6: number;
        static KC_7: number;
        static KC_8: number;
        static KC_9: number;
        static KC_0: number;
        static KC_A: number;
        static KC_B: number;
        static KC_C: number;
        static KC_D: number;
        static KC_E: number;
        static KC_F: number;
        static KC_G: number;
        static KC_H: number;
        static KC_I: number;
        static KC_J: number;
        static KC_K: number;
        static KC_L: number;
        static KC_M: number;
        static KC_N: number;
        static KC_O: number;
        static KC_P: number;
        static KC_Q: number;
        static KC_R: number;
        static KC_S: number;
        static KC_T: number;
        static KC_U: number;
        static KC_V: number;
        static KC_W: number;
        static KC_X: number;
        static KC_Y: number;
        static KC_Z: number;
        static KC_F1: number;
        static KC_F2: number;
        static KC_F3: number;
        static KC_F4: number;
        static KC_F5: number;
        static KC_F6: number;
        static KC_F7: number;
        static KC_F8: number;
        static KC_F9: number;
        static KC_F10: number;
        static KC_F11: number;
        static KC_F12: number;
        static KC_F13: number;
        static KC_F14: number;
        static KC_F15: number;
        static KC_NUMPAD_0: number;
        static KC_NUMPAD_1: number;
        static KC_NUMPAD_2: number;
        static KC_NUMPAD_3: number;
        static KC_NUMPAD_4: number;
        static KC_NUMPAD_5: number;
        static KC_NUMPAD_6: number;
        static KC_NUMPAD_7: number;
        static KC_NUMPAD_8: number;
        static KC_NUMPAD_9: number;
        static KC_NUMPAD_MULTIPLY: number;
        static KC_NUMPAD_ADD: number;
        static KC_NUMPAD_ENTER: number;
        static KC_NUMPAD_SUBTRACT: number;
        static KC_NUMPAD_DECIMAL: number;
        static KC_NUMPAD_DIVIDE: number;
        static KC_BACKSPACE: number;
        static KC_TAB: number;
        static KC_ENTER: number;
        static KC_SHIFT: number;
        static KC_Alt: number;
        static KC_CONTROL: number;
        static KC_ESCAPE: number;
        static KC_SPACE: number;
        static KC_WINDOWS: number;
        static KC_MENU: number;
        static KC_CAPS_LOCK: number;
        static KC_NUM_LOCK: number;
        static KC_SCROLL_LOCK: number;
        static KC_PAUSE: number;
        static KC_PAGE_UP: number;
        static KC_PAGE_DOWN: number;
        static KC_END: number;
        static KC_HOME: number;
        static KC_INSERT: number;
        static KC_DELETE: number;
        static KC_LEFT: number;
        static KC_UP: number;
        static KC_RIGHT: number;
        static KC_DOWN: number;
        static KC_SEMICOLON_COLON: number;
        static KC_EQUAL_PLUS: number;
        static KC_MINUS_UNDERLINE: number;
        static KC_SLASH_QUESTIONMARK: number;
        static KC_SPECIALCOMMA_EARTHWORM: number;
        static KC_LEFT_BRACKET_BRACE: number;
        static KC_BACKSLASH_VERTICALBAR: number;
        static KC_RIGHT_BRACKET_BRACE: number;
        static KC_QUOTE: number;
        static KC_COMMA: number;
        static KC_PERIOD: number;
    }
}
declare module gamelib {
    class os {
        static RM: ResourceManager;
        static KeyBoard: KeyboardUtils;
        /** 启动库 */
        static startUp(): void;
    }
}
declare module app {
    class ListButton extends eui.ItemRenderer {
        bgText: eui.Label;
        private dataInfo;
        constructor();
        dataChanged(): void;
    }
}
declare function callJsFunction(msg: any): any;
declare module app {
    class LocationProperty {
        private static urlParam;
        static init(): void;
        static Param: any;
        private static _newestServer;
        static newestServer: any;
        private static _recommendServer;
        static recommendServer: any;
        static resAdd: string;
        static openID: string;
        static srvid: number;
        static originalSrvid: number;
        static srvname: string;
        static readonly serverAlias: string;
        static serverIP: string;
        static serverPort: number;
        static roleId: number;
        static readonly password: string;
        static readonly openKey: string;
        /** //安卓：1， iOS：2 */
        static readonly zoneId: number;
        static readonly serverID: string;
        /**
         *序号id
         */
        static readonly ID: string;
        static readonly appid: string;
        static readonly app_openid: string;
        static readonly isSubscribe: string;
        static readonly nickName: string;
        static readonly callUrl: string;
        static readonly gifi: string;
        static readonly roleCount: number;
        static readonly isnew: number;
        static readonly login_ip: string;
        static readonly is_attention: string;
        static readonly isShowShare: boolean;
        static readonly v: number;
        static readonly isYelloVip: number;
        static readonly isYelloYearVip: number;
        static readonly yelloVipLevel: number;
        static readonly isYelloHighVip: number;
        static readonly logurl: string;
        static readonly isFirstLoad: boolean;
        static readonly loadurl: string;
        static readonly pfid: string;
        static readonly pf: string;
        static isCanLogin(): boolean;
        static readonly isForbidRegister: number;
        /**
         * 是否内网
         */
        static readonly isLocation: boolean;
        /**
         * 设置加载进度 & 描述
         */
        static setLoadProgress(n: number, str: string): void;
    }
}
declare class Main extends eui.UILayer {
    protected createChildren(): void;
    static gongGaoView: any;
    static showGongGaoView(): void;
    static ageView: any;
    static showAgeoView(): void;
    static startServerTips(value: any): void;
    /**手机版H5退出 */
    phoneLogout(): void;
    /**quick手机版切换账号成功 */
    phoneSwitchAccountSuccess(): void;
    /**
     * 登出
     */
    static onLogout(info: any): void;
    /**
     * 登出
     */
    onLogoutPC(): void;
    logoutPCInfo(): void;
    private onViewResize();
    private curLoginView;
    private runGame();
    private createView();
    static createRoleView: any;
    static newCreateView(): void;
    static switchServer(): void;
    private newLoadingView();
    static heartbeatPak(type: any): void;
    gameStartUp(): void;
    static remLogin(): void;
    static tipsLab: eui.Label;
    /** --------------------手机版本----------------------------- */
    private runGamePhone();
    /***手机版H5 */
    private runGamePhoneH5();
    static showTipsPhone(str: string): void;
    /**
     * 复制用户信息
     */
    static copyUerInfo(): void;
    static gameParameter: app.GameParameter;
    /**
     * 创建手机登录界面
     */
    private createPhoneView();
    private createPhoneH5View();
    createH5ServerView(): void;
    /**
     * 创建登录界面
     */
    private createLoginView();
    static signInView: any;
    static phoneLoginView: any;
    static createServerView(): void;
    static main_instance: Main;
    static phoneLoadingView: any;
    /**
     * 创建加载界面
     */
    static newPhoneLoadingView(): void;
    static startGameApp(): void;
    /** 调用接收原生接口------------------------------------------- */
    private setExternalInterfaces();
    /**
    * 原生版本登录
    */
    static Native_onClickLogin(signInINfo: Object): void;
    /**
    * 原生版本支付
    */
    static Native_onClickPay(orderInfo: Object): void;
    /**
    * 重启
    */
    static Native_RestartApp(signInINfo: Object): void;
    /**
    * 原生版本初始化SDK
    */
    static Native_initializationSDK(signInINfo: Object): void;
    /**
     * 游戏猫
    * 原生版本上报玩家信息
    */
    static Native_reportPlayerData(signInINfo: Object): void;
    /**
     * F1
    * 原生版本埋点
    */
    static Native_adJustData(signInINfo: Object): void;
    /**
    * 原生版本复制
    */
    static Native_onCopy(message: string): void;
    /**
    * 原生版本打开手机浏览器
    */
    static Native_openURL(message: string): void;
    /**
    * 红狐IOS切换账号
    */
    static Native_honghuSwitchAccount(message: string): void;
}
declare module app {
    class MainCreateRoleView extends eui.Component {
        constructor();
        private nameInput;
        private createBtn;
        private diceBtn;
        private job1;
        private job2;
        private job3;
        private boy;
        private girl;
        private roleGrp;
        private roleMc;
        private bgImg;
        private rect;
        private _selectJob;
        private _selectSex;
        private role;
        timeLab: eui.Label;
        private openTime;
        private isAutoEnter;
        private createMcGrp;
        private createMc;
        private group;
        protected childrenCreated(): void;
        /**
         * 创建按钮动画
         */
        private createBtnMC();
        private roleData;
        private roleTexture;
        private mcName;
        private roleMcFactory;
        /**
         * 创建人物模型模型
         */
        private createRoleMC(mcName);
        private compFuncJson(data, url);
        private compFuncPng(data, url);
        private createBody();
        private clazz;
        private jobBtn;
        private autoCreateStr;
        initUI(): void;
        private timer;
        private updateTiem();
        private createRuselt(result);
        private perloadProgress(arr);
        private setViewSize();
        close(...param: any[]): void;
        private qqHallSendCreate(strInfo);
        private sendCreateRole();
        /**
        * QQ大厅文本敏感词验证
        */
        qqHallTextFiltering(str: string, type: number): void;
        private onClick(e);
        private selectJob;
        private selectSex;
        private updateRole();
        setName(str: string): void;
        private curJob();
        private curSex();
    }
}
declare module app {
    class MainGongGaoItemView extends eui.ItemRenderer {
        constructor();
        private label;
        dataChanged(): void;
    }
}
declare module app {
    class MainGongGaoWin extends eui.Component {
        constructor();
        private clazz;
        private btn_close;
        private txt_name;
        private tab;
        private textLab;
        private sureBtn;
        private gongGaoScroller;
        private gongGaoData;
        protected childrenCreated(): void;
        private initUI();
        private onClick(e);
        private updateTabInfo();
        private onChange(e);
        private updateGongGaoText();
        removeView(): void;
    }
}
declare module app {
    class MainLoadingView extends eui.Component {
        constructor();
        private clazz;
        private rect;
        private lodingDesc;
        private reloadImg;
        private BgImg;
        private firstLoadImg;
        private version1;
        private version2;
        protected childrenCreated(): void;
        private reloadFunction();
        showLoadProgress(progress: any, des: any): void;
        removeView(): void;
    }
}
declare module app {
    class MainLoginView extends eui.Component {
        constructor();
        private clazz;
        private gameLoginBg;
        private gameLogo;
        private enterGrp;
        private serverGrp;
        private selectServerImg;
        private serverTypeImg;
        private serverName;
        private serverSelect;
        private enterBtn;
        private btnList;
        private serverList;
        private serverSelectImg;
        private closeBtn;
        private serverTypeLab0;
        private serverTypeLab1;
        private serverTypeLab2;
        private gongGaoBtn;
        private ageButton;
        protected childrenCreated(): void;
        private initUI();
        private onClick(e);
        private curServerData;
        updateInfo(arr: any, curServerInfo: any): void;
        setNewServer(serverData: any): void;
        private onClickLeftList(e);
        private onClickRightList(e);
        private setServerName();
        removeView(): void;
    }
}
declare module app {
    class MainNewServerView extends eui.Component {
        private clazz;
        private btnClose;
        constructor();
        protected childrenCreated(): void;
        private onClick();
        private closeView();
    }
}
declare module app {
    class MainStartServerTipsView extends eui.Component {
        private clazz;
        private tipsLab;
        constructor();
        protected childrenCreated(): void;
        setTipsLab(value: string): void;
        private closeView();
    }
}
/**
 * Created by zhangac on 2016/11/23.
 */
declare module app {
    class Algorithm {
        static sortAsc(b1: any, b2: any): number;
        /**
     * 根据obj1 obj2的attr属性排序
     * 不传attr的时候直接根据obj1，obj2比较大小
     * @param obj1
     * @param obj2
     * @param attr
     */
        static sortAscAttr(obj1: any, obj2: any, attr?: string): number;
        static sortDesc(b1: any, b2: any): number;
        /**
         * 根据obj1 obj2的attr属性排序
         * 不传attr的时候直接根据obj1，obj2比较大小
         * @param obj1
         * @param obj2
         * @param attr
         */
        static sortDescAttr(obj1: any, obj2: any, attr?: string): number;
        static binSearch(tab: any[], item: any, binFunc?: Function): number;
        static test(): void;
    }
}
declare module app {
    /**
     * 手机版 创建据角色
     */
    class PhoneCreateRoleView extends eui.Component {
        constructor();
        private nameInput;
        private createBtn;
        private diceBtn;
        private job1;
        private job2;
        private job3;
        private boy;
        private girl;
        private roleGrp;
        private roleMc;
        private bgImg;
        private _selectJob;
        private _selectSex;
        private role;
        timeLab: eui.Label;
        private openTime;
        private isAutoEnter;
        private createMcGrp;
        private createMc;
        private group;
        protected childrenCreated(): void;
        /**
         * 创建按钮动画
         */
        private createBtnMC();
        private roleData;
        private roleTexture;
        private mcName;
        private roleMcFactory;
        /**
         * 创建人物模型模型
         */
        private createRoleMC(mcName);
        private compFuncJson(data, url);
        private compFuncPng(data, url);
        private createBody();
        private clazz;
        private jobBtn;
        initUI(): void;
        close(...param: any[]): void;
        private qqHallSendCreate(strInfo);
        private sendCreateRole();
        /**
        * QQ大厅文本敏感词验证
        */
        qqHallTextFiltering(str: string, type: number): void;
        private onClick(e);
        private selectJob;
        private selectSex;
        private updateRole();
        setName(str: string): void;
        private curJob();
        private curSex();
    }
}
declare module app {
    class PhoneLoadingView extends eui.Component {
        constructor();
        private clazz;
        private rect;
        private lodingDesc;
        private reloadImg;
        private BgImg;
        private firstLoadImg;
        private version1;
        private version2;
        private loadGrp;
        protected childrenCreated(): void;
        private reloadFunction();
        showLoadProgress(progress: any, des: any): void;
        removeView(): void;
    }
}
declare module app {
    class PhoneLoginView extends eui.Component {
        constructor();
        private clazz;
        private gameLoginBg;
        private gameLogo;
        private enterGrp;
        private serverGrp;
        private selectServerImg;
        private serverTypeImg;
        private serverName;
        private serverSelect;
        private enterBtn;
        private btnList;
        private serverList;
        private serverSelectImg;
        private closeBtn;
        private serverTypeLab0;
        private serverTypeLab1;
        private serverTypeLab2;
        private httpReq;
        private timer;
        private httpNum;
        private selectSerInfo;
        private gongGaoBtn;
        private ageButton;
        private userPrivacy;
        private privacyGrp;
        private userLab;
        private privacyLab;
        private switchAccountGrp;
        private versionLab;
        private shuangbeiGrp;
        private version1;
        private version2;
        protected childrenCreated(): void;
        private initUI();
        private stageClick();
        private onClick(e);
        private curServerData;
        updateInfo(arr: any, curServerInfo: any): void;
        private onClickLeftList(e);
        private onClickRightList(e);
        setSwitchAccount(): void;
        private setServerName();
        setNewServer(serverData: any): void;
        removeView(): void;
    }
}
declare module app {
    /**
     * 手机登录界面
     */
    class PhoneMainLoginView extends eui.Component {
        constructor();
        private bgImg;
        private rect;
        private input;
        private signInButton;
        protected childrenCreated(): void;
        initUI(): void;
        private onEnterFrame();
        private onClick();
        private stageClick();
        removeView(): void;
    }
}
declare module app {
    class PhoneServerListInfo {
        private httpReq;
        private timer;
        private httpNum;
        private selectSerInfo;
        constructor();
        getServerInfo(): void;
        /**
         * 服务器列表拉取次数检测
         */
        private timerComFunc();
        serverArr: any[];
        leftStrArr: any[];
        private getServiceComp(e);
        /**
         * 深度复制
         * @param _data
         */
        static copyDataHandler(obj: any): any;
        private getServiceErr();
        private onClickRightList(e);
        onButtonClick(): void;
    }
}
declare var __reflect: any, md5: () => void;
declare module app {
    enum ReportDataEnum {
        /** 进入游戏登录界面 */
        LOGIN_VIEW = 1,
        /** 选择服务器 */
        SELECT_SERVICE = 2,
        /** 点击登陆 */
        CLICK_LOGIN = 3,
        /** 登录成功 */
        LOGIN_SUCCESS = 4,
        /** 连接服务器 */
        LINK_SERVER = 5,
        /** 连接服务器成功 */
        LINK_SERVER_SUCCESS = 6,
        /** 连接服务器失败 */
        LINK_SERVER_FAIL = 7,
        /** 服务区断开 */
        LINK_SERVER_CLOSE = 8,
        /** 切换角色 */
        SWITCH_ROLE = 9,
        /** 进入创建界面 */
        CREATE_ROLE_VIEW = 10,
        /** 创角 */
        CLICK_CREATE_ROLE = 11,
        /** 角色创建成功 */
        CREATE_ROLE_SUCCESS = 12,
        /** 获取服务器 */
        GET_SERVER_LIST = 13,
        /** 聊天上报 */
        Chat = 15,
        /** 验证账号 */
        UserCheck = 16,
        /** 点击创角 */
        ONCLICK_CREATE = 17,
        /** 点击欢迎页 */
        ONCLICK_WELCOME = 18,
        /**到达出生点 进入主界面 */
        ENTERMAIN = 19,
        /**完成首个任务 */
        COMPLETETASK = 20,
        /** 微端下载 */
        MICROTERMS_DOWNLOAD = 21,
        /** 欢迎确定 */
        ONCLICK_WELCOME2 = 22,
        /** 获取角色列表成功*/
        GET_ROLE_LIST = 23,
        /** 加载主程序成功*/
        LOAD_GAMEAPP = 24,
        /** 等级变化 */
        UPDATE_LEVEL = 1000,
        /** 战力变化 */
        UPDATE_POWER = 1001,
        /** 角色改名 */
        CHANGE_NAME = 1002,
        /** 点击支付 */
        CLICK_PAY = 2001,
        ERROR = 9999,
        /** 收到平台账号 */
        Report_10000 = 10000,
        /** 签名验证 */
        Report_10001 = 10001,
    }
    /**
     * 信息上报
     */
    class ReportDataMgr {
        constructor();
        private static _ins;
        static ins(): ReportDataMgr;
        private updateTime;
        private msgAry;
        /**
         * 打点上报
         * @param type {ReportDataEnum} 上报类型
         * @param info {Object} 具体上报信息
         * @param param {Object} 额外参数
         * @param isReport 是否延迟上报，默认延迟
         */
        reporting(type: ReportDataEnum, info?: any, param?: any, isReport?: boolean): void;
        private httpReq;
        private callbackFun();
        private getServiceComp(e);
        private jobAry;
        private ReportingFunction(msg);
        private format_2();
        getVipLv(lv: any): number;
    }
}
declare class ResDirEnum {
    static RES_ROOT: string;
    static RES_RESOURCE: string;
    static RES_RESPUBLISH: string;
    static RES_DIR: string;
    static RES_DIR_Android: string;
    static MAP_DIR: string;
    static MAP_DIR_Android: string;
    static RES_DIR_BLOOD: string;
    static RES_DIR_BODY: string;
    static RES_DIR_BODY_SUIT: string;
    static RES_DIR_BODY_EFF: string;
    static RES_DIR_EFF: string;
    static RES_DIR_WIMGEFF: string;
    static RES_DIR_TITLE: string;
    static RES_DIR_MONSTER: string;
    static RES_DIR_SKILL: string;
    static RES_DIR_WEAPON: string;
    static RES_DIR_WEAPONEFF: string;
    static RES_DIR_HAIR: string;
    static RES_DIR_TELEPORT: string;
    static RES_DIR_NPC: string;
    static RES_DIR_CREATE: string;
    static RES_DIR_WORSHIP: string;
    static RES_DIR_PET: string;
    static RES_DIR_PETEXTERIOR: string;
    static Init(): void;
}
declare module gamelib {
    class ResourceManager {
        constructor();
        private displayList;
        private resDisTime;
        private isFirstEnter;
        /** UI 资源失效时间 */
        private _clearWin;
        clearWin: number;
        /** 动画资源失效时间 */
        private _clearRes;
        clearRes: number;
        /**
         * 地图超时时间
         */
        private _iscardMapTime;
        iscardMapTime: number;
        /** UI资源根目录 */
        private _resResource;
        resResource: string;
        /** 动画资源根目录 */
        private _resMovieClip;
        resMovieClip: string;
        /** 过滤动画 */
        private _filterMoviceResource;
        filterMoviceResource: string;
        static ins(): ResourceManager;
        /** 清理地图数据 */
        createMap(mapName: any): void;
        /** 清理地图数据 */
        createDiscardMap(mapName: any): void;
        /**
         * 清理UI资源
         */
        destroyWin(): void;
        /**
         * 清理动画资源
         */
        destroyRes(): void;
        deleteDisplay(hashCode: any): void;
        getDisplay(hashCode: any): egret.DisplayObject[];
        addDisplay(hashCode: any, ds: any): any;
        disposeResTime(hashCode: number): void;
        delResTime(hashCode: number): void;
    }
}
declare module app {
    class ServerItem extends eui.ItemRenderer {
        imgState: eui.Image;
        serverText: eui.Label;
        private dataInfo;
        constructor();
        dataChanged(): void;
    }
}
declare module app {
    class ServerListInfo {
        private httpReq;
        private timer;
        private httpNum;
        private selectSerInfo;
        constructor();
        getServerInfo(): void;
        /**
         * 服务器列表拉取次数检测
         */
        private timerComFunc();
        serverArr: any[];
        leftStrArr: any[];
        private getServiceComp(e);
        private getServiceErr();
        private onClickRightList(e);
        onButtonClick(): void;
    }
}
declare module app {
    /**
     * 测试版本登录
     */
    class SignInView extends eui.Component {
        constructor();
        private clazz;
        private signInButton;
        private input;
        private rect;
        protected childrenCreated(): void;
        private initUI();
        private stageClick();
        private onClick(e);
        removeView(): void;
    }
}
declare module app {
    /**
     * 测试版本登录
     */
    class SignInViewH5 extends eui.Component {
        constructor();
        private clazz;
        private signInButton;
        protected childrenCreated(): void;
        private initUI();
        private stageClick();
        private onClick(e);
        removeView(): void;
    }
}
declare module app {
    class SimplePlayerInfo {
        constructor();
        name: string;
        guildName: string;
        faceId: number;
        level: number;
        zsLevel: number;
        job: number;
        id: number;
        sex: number;
        isBan: Boolean;
        select: Boolean;
        read(bytes: GameByteArray): void;
    }
}
declare class ThemeAdapter implements eui.IThemeAdapter {
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void;
}
declare var generateEUI: {
    paths: string[];
    skins: any;
};
declare var generateEUI2: {
    paths: string[];
    skins: any;
};
declare var generateJSON: {
    paths: string[];
    skins: any;
};
/**
 * Created by yangsong on 2014/11/23.
 * Timer管理器
 */
declare module app {
    class TimerManager {
        private _handlers;
        private _currTime;
        private _currFrame;
        private currHandler;
        private nexthandles;
        /**
         * 构造函数
         */
        constructor();
        static ins(): TimerManager;
        getFrameId(): number;
        getCurrTime(): number;
        static binFunc(b1: TimerHandler, b2: TimerHandler): number;
        private static DeleteHandle(handler);
        /**
         * 每帧执行函数
         * @param frameTime
         */
        private onEnterFrame(time);
        private create(startTime, delay, repeat, method, methodObj, onFinish, fobj);
        /**
         *
         * 定时执行
         * @param delay 执行间隔:毫秒
         * @param repeat 执行次数, 0为无限次
         * @param method 执行函数
         * @param methodObj 执行函数所属对象
         * @param onFinish 完成执行函数
         * @param fobj 完成执行函数所属对象
         * @param remove 是否删除已经存在的
         *
         */
        doTimer(delay: number, repeat: number, method: Function, methodObj: any, onFinish?: Function, fobj?: any): void;
        /**
         *
         * 定时执行
         * @param startTime 延迟多久第一次执行
         * @param delay 执行间隔:毫秒
         * @param repeat 执行次数, 0为无限次
         * @param method 执行函数
         * @param methodObj 执行函数所属对象
         * @param onFinish 完成执行函数
         * @param fobj 完成执行函数所属对象
         * @param remove 是否删除已经存在的
         *
         */
        doTimerDelay(startTime: number, delay: number, repeat: number, method: Function, methodObj: any, onFinish?: Function, fobj?: any): void;
        doNext(method: Function, methodObj: any): void;
        /**
         * 清理
         * @param method 要移除的函数
         * @param methodObj 要移除的函数对应的对象
         */
        remove(method: Function, methodObj: any): void;
        /**
         * 清理
         * @param methodObj 要移除的函数对应的对象
         */
        removeAll(methodObj: any): void;
        /**
         * 检测是否已经存在
         * @param method
         * @param methodObj
         *
         */
        isExists(method: Function, methodObj: any): boolean;
    }
    class TimerHandler {
        /**执行间隔*/
        delay: number;
        /**是否重复执行*/
        forever: boolean;
        /**重复执行次数*/
        repeatCount: number;
        /**执行时间*/
        exeTime: number;
        /**处理函数*/
        method: Function;
        /**处理函数所属对象*/
        methodObj: any;
        /**完成处理函数*/
        onFinish: Function;
        /**完成处理函数所属对象*/
        finishObj: any;
        /**清理*/
        clear(): void;
    }
}
declare module app {
    class uint64 {
        static LeftMoveMask: number[];
        static MaxLowUint: number;
        _lowUint: number;
        _highUint: number;
        constructor(v?: any);
        isEqual(target: uint64): boolean;
        isGreaterThan(target: any): boolean;
        isGreaterThanOrEqual(target: any): boolean;
        readonly isZero: boolean;
        /** 是否大于0 */
        readonly isGreaterThanZero: boolean;
        writeByte(b: egret.ByteArray): void;
        setValue(lowerUint?: number, higherUint?: number): void;
        value: any;
        valueByString: String;
        /**
         * 左移运算
         * @param num
         * @return
         */
        leftMove(num: number, result?: uint64): void;
        /**
         *加法
         * @param value
         * @param result
         */
        add(value: uint64, result?: uint64): void;
        /** 减法 */
        subtraction(value: uint64, result?: uint64): void;
        /**
         * @param value
         * 注意value值不可过大，否则会计算错误
         */
        scale(value: number, result?: uint64): void;
        toString(radix?: number): string;
        /**
         *根据字符串导出成64位数据结构
         * @param value
         * @return
         */
        static stringToUint64(value: string, radix?: number, result?: uint64): uint64;
    }
}
declare class AssetAdapter implements eui.IAssetAdapter {
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    getAsset(source: string, compFunc: Function, thisObject: any): void;
}
/**
 * Created by yangsong on 15-1-14.
 * 背景音乐类
 */
declare module app {
    class SoundBg extends BaseSound {
        private _currBg;
        private _currSound;
        private _currSoundChannel;
        private _volume;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 停止当前音乐
         */
        stop(): void;
        /**
         * 播放某个音乐
         * @param effectName
         */
        play(effectName: string): void;
        touchPlay(): void;
        /**
         * 播放
         * @param sound
         */
        private playSound(sound);
        private onSoundComplete();
        private addSoundChannel(channel);
        private removeSoundChannel(channel);
        /**
         * 设置音量
         * @param volume
         */
        setVolume(volume: number): void;
        /**
         * 资源加载完成后处理播放
         * @param key
         */
        loadedPlay(key: string): void;
        /**
         * 检测一个文件是否要清除
         * @param key
         * @returns {boolean}
         */
        checkCanClear(key: string): boolean;
    }
}
/**
 * Created by yangsong on 15-1-14.
 * 音效类
 */
declare module app {
    class SoundEffects extends BaseSound {
        private _volume;
        /**
         * 构造函数
         */
        constructor();
        /**
         * 播放一个音效
         * @param effectName
         */
        play(effectName: string): void;
        /**
         * 播放
         * @param sound
         */
        private playSound(sound);
        /**
         * 设置音量
         * @param volume
         */
        setVolume(volume: number): void;
        /**
         * 资源加载完成后处理播放
         * @param key
         */
        loadedPlay(key: string): void;
    }
}
/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
declare module app {
    class SoundManager {
        /**
         * 音乐文件清理时间
         * @type {number}
         */
        static CLEAR_TIME: number;
        private effect;
        private bg;
        private effectOn;
        private bgOn;
        private currBg;
        private bgVolume;
        private effectVolume;
        /**
         * 构造函数
         */
        constructor();
        static ins(): SoundManager;
        /**
         * 播放音效
         * @param effectName
         */
        playEffect(effectName: string): void;
        /**
         * 创角界面播放音效
         * @param effectName
         */
        createPlayEffect(effectName: string): void;
        /**
         * 播放背景音乐
         * @param key
         */
        playBg(bgName: string): void;
        /**
         * 创角界面背景音乐
         * @param key
         */
        createplayBg(bgName: string): void;
        /**
         * 停止背景音乐
         */
        stopBg(): void;
        touchBg(): void;
        /**
         * 设置音效是否开启
         * @param $isOn
         */
        setEffectOn($isOn: boolean): void;
        /**
         * 设置背景音乐是否开启
         * @param $isOn
         */
        setBgOn($isOn: boolean): void;
        /**
         * 设置背景音乐音量
         * @param volume
         */
        setBgVolume(volume: number): void;
        /**
         * 获取背景音乐音量
         * @returns {number}
         */
        getBgVolume(): number;
        /**
         * 设置音效音量
         * @param volume
         */
        setEffectVolume(volume: number): void;
        /**
         * 获取音效音量
         * @returns {number}
         */
        getEffectVolume(): number;
    }
}
declare module app {
    /**
     * Created by hrz on 2017/7/19.
     */
    class SoundUtil {
        static RUN: string;
        static ACK: string;
        static MAN_HIT: string;
        static WOMAN_HIT: string;
        static MAN_DIE: string;
        static WOMAN_DIE: string;
        static WINDOW: string;
        static TASK: string;
        static LEVEL_UP: string;
        static SCENE: string;
        static EQUIP: string;
        static CREATE_ROLE: string;
        static FORGE: string;
        static SMELT: string;
        static SKILL_UP: string;
        static VIEW: string;
        static VIEW_LEVEL: string;
        static VIEW_INSIDE: string;
        static FORGING: string;
        static GOLD: string;
        static DRUGS: string;
        static UPGRADE: string;
        static RING: string;
        static OTHER_EQUIP: string;
        static BRACELET: string;
        static ARMS: string;
        static NECKLACE: string;
        static CLOTHES: string;
        static STRENGTHEN: string;
        static WINDOW_OPEN: boolean;
        static ins(): SoundUtil;
        private _delayTime;
        private _delayStartTime;
        /** 移动 */
        private _runTimeGap;
        private _runTimeStart;
        /** 攻击 */
        private _ackTimeGap;
        private _ackTimeGapTimeStart;
        /** 受击 */
        private _hitTimeGap;
        private _hitTimeStart;
        private _hit2TimeStart;
        /** 死亡 */
        private _dieTimeGap;
        private _dieTimeStart;
        private _die2TimeStart;
        private playRunSound();
        playRun(): void;
        stopRun(): void;
        playEffect(effectName: any): void;
        delayTime(time: number): void;
        /**
         * 攻击音效
         */
        playAck(): void;
        /**
         * 男受击
         */
        playManHit(): void;
        /**
         * 女受击
         */
        playWoManHit(): void;
        /**
         * 男死亡
         */
        playManDie(): void;
        /**
         * 女死亡
         */
        playWoManDie(): void;
        private monsterSound;
        /**
         * 播放怪物音效
         */
        playMonster(soundName: string): void;
    }
}
