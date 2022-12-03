var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
 * @Author: FLK
 * @Date: 2020-10-22 16:03:37
 * @LastEditTime: 2020-10-29 11:38:34
 * @LastEditors: FLK
 * @Description:
 * @FilePath: \GameApp2-YY\src\web\core\net\GameByteArray.ts
 * @symbol_custom_string_obkoro1: 可以输入预定的版权声明、个性签名、空行等
 */
var app;
(function (app) {
    var GameByteArray = (function (_super) {
        __extends(GameByteArray, _super);
        function GameByteArray() {
            var _this = _super.call(this) || this;
            _this.DT_VOID = 0;
            _this.DT_SMALL = 1;
            _this.DT_USMALL = 2;
            _this.DT_SHORT = 3;
            _this.DT_USHORT = 4;
            _this.DT_INT = 5;
            _this.DT_UINT = 6;
            _this.DT_FLOAT = 7;
            _this.endian = egret.Endian.LITTLE_ENDIAN;
            return _this;
        }
        GameByteArray.prototype.readString = function () {
            var s = this.readUTF();
            this.position += 1;
            return s;
        };
        // 对于协议中要读取8字节Int64的字段，分两种情况：如果不需要加减等运算的字段，比如handle，
        // 用readDouble函数读取，如果是需要运算的数字类型，比如金币等，用readNumber读取
        // 返回uint64类型的readInt64以后不要使用了,已经使用的地方慢慢修改过来
        GameByteArray.prototype.readNumber = function () {
            var i64 = new app.uint64(this);
            var str = i64.toString();
            return +str;
        };
        // 对应readnumer
        GameByteArray.prototype.writeNumber = function (val) {
            if (!val) {
                val = 0;
            }
            var i64 = app.uint64.stringToUint64(val.toString());
            this.writeInt64(i64);
        };
        GameByteArray.prototype.writeInt64 = function (bigInt) {
            this.writeUnsignedInt(bigInt._lowUint);
            this.writeUnsignedInt(bigInt._highUint);
        };
        GameByteArray.prototype.writeString = function (value) {
            this.writeUTF(value);
            this.writeByte(0);
        };
        GameByteArray.prototype.writeCmd = function (id, subId) {
            this.writeByte(id);
            this.writeByte(subId);
            // DefaultMgr.ins().post_Sent(id,subId);
        };
        GameByteArray.prototype.readInts = function (count) {
            var result = [];
            for (var i = 0; i < count; i++) {
                result.push(this.readInt());
            }
            return result;
        };
        GameByteArray.prototype.writeInts = function () {
            var nums = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                nums[_i] = arguments[_i];
            }
            for (var _a = 0, nums_1 = nums; _a < nums_1.length; _a++) {
                var i = nums_1[_a];
                this.writeInt(i);
            }
        };
        GameByteArray.prototype.readNumeric = function (type) {
            switch (type) {
                case this.DT_SMALL:
                    return (this.readByte());
                case this.DT_USMALL:
                    return (this.readUnsignedByte());
                case this.DT_SHORT:
                    return (this.readShort());
                case this.DT_USHORT:
                    return (this.readUnsignedShort());
                case this.DT_INT:
                    return (this.readInt());
                case this.DT_UINT:
                    return (this.readUnsignedInt());
                case this.DT_FLOAT:
                    return (this.readFloat());
                default:
                    return (0);
            }
        };
        return GameByteArray;
    }(egret.ByteArray));
    app.GameByteArray = GameByteArray;
    __reflect(GameByteArray.prototype, "app.GameByteArray");
})(app || (app = {}));
/**
 * Created by yangsong on 15-1-14.
 * Sound基类
 */
var app;
(function (app) {
    var BaseSound = (function () {
        /**
         * 构造函数
         */
        function BaseSound() {
            this._cache = {};
            this._loadingCache = new Array();
            app.TimerManager.ins().doTimer(1 * 60 * 1000, 0, this.dealSoundTimer, this);
        }
        /**
         * 处理音乐文件的清理
         */
        BaseSound.prototype.dealSoundTimer = function () {
            var currTime = egret.getTimer();
            var keys = Object.keys(this._cache);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (!this.checkCanClear(key))
                    continue;
                if (currTime - this._cache[key] >= app.SoundManager.CLEAR_TIME) {
                    //debug.log(key + "已clear")
                    delete this._cache[key];
                    RES.destroyRes(key);
                }
            }
        };
        /**
         * 获取Sound
         * @param key
         * @returns {egret.Sound}
         */
        BaseSound.prototype.getSound = function (key) {
            var sound = RES.getRes(key);
            if (sound) {
                if (this._cache[key]) {
                    this._cache[key] = egret.getTimer();
                }
            }
            else {
                if (this._loadingCache.indexOf(key) != -1) {
                    return null;
                }
                this._loadingCache.push(key);
                RES.getResAsync(key, this.onResourceLoadComplete, this);
            }
            return sound;
        };
        /**
         * 资源加载完成
         * @param event
         */
        BaseSound.prototype.onResourceLoadComplete = function (data, key) {
            var index = this._loadingCache.indexOf(key);
            if (index != -1) {
                this._loadingCache.splice(index, 1);
                this._cache[key] = egret.getTimer();
                this.loadedPlay(key);
            }
        };
        /**
         * 资源加载完成后处理播放，子类重写
         * @param key
         */
        BaseSound.prototype.loadedPlay = function (key) {
        };
        /**
         * 检测一个文件是否要清除，子类重写
         * @param key
         * @returns {boolean}
         */
        BaseSound.prototype.checkCanClear = function (key) {
            return true;
        };
        return BaseSound;
    }());
    app.BaseSound = BaseSound;
    __reflect(BaseSound.prototype, "app.BaseSound");
})(app || (app = {}));
/**
 * Created by yangsong on 2014/11/22.
 * 对象池类
 */
var app;
(function (app) {
    var ObjectPool = (function () {
        /**
         * 构造函数
         */
        function ObjectPool() {
            this._objs = new Array();
        }
        /**
         * 放回一个对象
         * @param obj
         */
        ObjectPool.prototype.pushObj = function (obj) {
            this._objs.push(obj);
        };
        /**
         * 取出一个对象
         * @returns {*}
         */
        ObjectPool.prototype.popObj = function () {
            if (this._objs.length > 0) {
                return this._objs.pop();
            }
            else {
                return null;
            }
        };
        /**
         * 清除所有缓存对象
         */
        ObjectPool.prototype.clear = function () {
            while (this._objs.length > 0) {
                this._objs.pop();
            }
        };
        /**
         * 取出一个对象
         * @param classZ Class
         * @return Object
         *
         */
        ObjectPool.pop = function (refKey) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!ObjectPool._content[refKey]) {
                ObjectPool._content[refKey] = [];
            }
            var list = ObjectPool._content[refKey];
            if (list.length) {
                var i = list.pop();
                if (i['init']) {
                    i['init']();
                }
                //if (refKey == "CharMonster") {
                //	debug.log("取一个CharMonster:" + i.hashCode);
                //}
                return i;
            }
            else {
                var classZ = egret.getDefinitionByName(refKey);
                var argsLen = args.length;
                var obj = void 0;
                if (argsLen == 0) {
                    obj = new classZ();
                }
                else if (argsLen == 1) {
                    obj = new classZ(args[0]);
                }
                else if (argsLen == 2) {
                    obj = new classZ(args[0], args[1]);
                }
                else if (argsLen == 3) {
                    obj = new classZ(args[0], args[1], args[2]);
                }
                else if (argsLen == 4) {
                    obj = new classZ(args[0], args[1], args[2], args[3]);
                }
                else if (argsLen == 5) {
                    obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
                }
                obj.ObjectPoolKey = refKey;
                return obj;
            }
        };
        /**
         * 取出一个对象
         * @param refKey Class
         * @param extraKey 标识值
         * @returns {any}
         */
        ObjectPool.popWithExtraKey = function (refKey, extraKey) {
            if (!ObjectPool._content[refKey]) {
                ObjectPool._content[refKey] = [];
            }
            var obj;
            var list = ObjectPool._content[refKey];
            if (list.length) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].extraKey == extraKey) {
                        obj = list[i];
                        list.splice(i, 1);
                        break;
                    }
                }
            }
            if (!obj) {
                var classZ = egret.getDefinitionByName(refKey);
                obj = new classZ(extraKey);
                obj.extraKey = extraKey;
                obj.ObjectPoolKey = refKey;
            }
            return obj;
        };
        /**
         * 放入一个对象
         * @param obj
         *
         */
        ObjectPool.push = function (obj) {
            if (obj == null) {
                return false;
            }
            var refKey = obj.ObjectPoolKey;
            //保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
            if (!ObjectPool._content[refKey] || ObjectPool._content[refKey].indexOf(obj) > -1) {
                return false;
            }
            if (obj['clear']) {
                obj['clear']();
            }
            ObjectPool._content[refKey].push(obj);
            //if (refKey == "CharMonster") {
            //	debug.log("放一个CharMonster" + obj.hashCode);
            //}
            return true;
        };
        /**
         * 清除所有对象
         */
        ObjectPool.clear = function () {
            ObjectPool._content = {};
        };
        /**
         * 清除某一类对象
         * @param classZ Class
         * @param clearFuncName 清除对象需要执行的函数
         */
        ObjectPool.clearClass = function (refKey, clearFuncName) {
            if (clearFuncName === void 0) { clearFuncName = null; }
            var list = ObjectPool._content[refKey];
            while (list && list.length) {
                var obj = list.pop();
                if (clearFuncName) {
                    obj[clearFuncName]();
                }
                obj = null;
            }
            ObjectPool._content[refKey] = null;
            delete ObjectPool._content[refKey];
        };
        /**
         * 缓存中对象统一执行一个函数
         * @param classZ Class
         * @param dealFuncName 要执行的函数名称
         */
        ObjectPool.dealFunc = function (refKey, dealFuncName) {
            var list = ObjectPool._content[refKey];
            if (list == null) {
                return;
            }
            var i = 0;
            var len = list.length;
            for (i; i < len; i++) {
                list[i][dealFuncName]();
            }
        };
        /**
         * 清空Obj对象
         * @param obj Object
         */
        ObjectPool.wipe = function (obj) {
            if (obj) {
                for (var p in obj) {
                    if (obj.hasOwnProperty(p))
                        delete obj[p];
                }
            }
        };
        ObjectPool._content = {};
        return ObjectPool;
    }());
    app.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "app.ObjectPool");
})(app || (app = {}));
/**
 * A*寻路实现类
 * 阅读此代码必须具备A*算法的理论知识
 * @author WynnLam
 *
 */
var gamelib;
(function (gamelib) {
    var AStar = (function () {
        /**
        * 格子检测函数
        * @param listener  检测函数
        * @param thisObj  回调函数的this引用
        */
        function AStar(listener, thisObj) {
            this.m_ASMapCells = []; //网格地图格子列表，格子的访问索引为：y * Width + x
            this.m_nMarkTag = 0; //寻路优化成员，免去循环初始化所有节点的开销
            this.listener = listener;
            this.thisObj = this.thisObj;
        }
        /**
         * 从地图中初始化
         * @param map
         *
         */
        AStar.prototype.initFromMap = function (map) {
            var nOldCount = 0;
            if (this.m_ASMapCells)
                nOldCount = this.m_ASMapCells.length;
            else
                this.m_ASMapCells = [];
            this.m_nWidth = map.maxX;
            this.m_nHeight = map.maxY;
            //如果现有数组的格子数量少于新数量则扩展数组
            var nNewCount = this.m_nWidth * this.m_nHeight;
            if (nNewCount > this.m_ASMapCells.length)
                this.m_ASMapCells.length = nNewCount;
            for (var i = nOldCount; i < nNewCount; ++i) {
                this.m_ASMapCells[i] = new ASMapCell;
            }
            //初始化每个坐标格子
            var x, y, idx;
            var cell;
            idx = 0;
            for (x = 0; x < this.m_nWidth; ++x) {
                for (y = 0; y < this.m_nHeight; ++y) {
                    cell = this.m_ASMapCells[idx];
                    cell.X = x;
                    cell.Y = y;
                    cell.CanNotMove = map.grids[idx]; //!map.isWalkableTile(x, y);
                    idx++;
                }
            }
        };
        /**
         * 寻路
         * @param fromX 起始坐标X
         * @param fromY 起始坐标Y
         * @param targetX 目的地坐标X
         * @param targetY 目的地坐标Y
         * @return 路径点数组
         *
         */
        AStar.prototype.getPatch = function (fromX, fromY, targetX, targetY) {
            if (fromX == targetX && fromY == targetY)
                return [];
            if (fromX < 0 || fromX >= this.m_nWidth || fromY < 0 || fromY >= this.m_nHeight)
                return [];
            if (targetX < 0 || targetX >= this.m_nWidth || targetY < 0 || targetY >= this.m_nHeight)
                return [];
            // let ac: ASMapCell = this.m_ASMapCells[targetY * this.m_nWidth + targetX];
            var ac = this.m_ASMapCells[targetX * this.m_nHeight + targetY];
            if (!ac || !ac.CanNotMove) {
                return [];
            }
            this.reset(fromX, fromY);
            var boPathFound = false;
            var nCurX = fromX;
            var nCurY = fromY;
            // let curCell: ASMapCell = this.m_ASMapCells[nCurY * this.m_nWidth + nCurX];
            var curCell = this.m_ASMapCells[nCurX * this.m_nHeight + nCurY];
            curCell.GCost = 0;
            curCell.LastX = -1;
            curCell.LastY = -1;
            curCell.X = nCurX;
            curCell.Y = nCurY;
            curCell.MarkTag = this.m_nMarkTag;
            curCell.HCost = (Math.abs(targetX - fromX) + Math.abs(targetY - fromY)) * 10;
            var i;
            var nX, nY;
            var cell;
            while (true) {
                if (nCurX == targetX && nCurY == targetY) {
                    boPathFound = true;
                    break;
                }
                if (curCell.State != ASMapCell.CSCLOSE) {
                    this.closeCell(curCell);
                }
                // 
                //遍历当前位置周围的8个格子
                for (i = 0; i < 8; ++i) {
                    nX = nCurX + AStar.NEIGHBORPOS_X_VALUES[i];
                    nY = nCurY + AStar.NEIGHBORPOS_Y_VALUES[i];
                    if (nX < 0 || nX >= this.m_nWidth || nY < 0 || nY >= this.m_nHeight)
                        continue;
                    // cell = this.m_ASMapCells[nY * this.m_nWidth + nX];
                    cell = this.m_ASMapCells[nX * this.m_nHeight + nY];
                    if (!cell.CanNotMove) {
                        continue;
                    }
                    if ((nX != targetX || nY != targetY)) {
                        //挂机自动绕开
                        if (!this.listener.call(this.thisObj, { x: nX, y: nY })) {
                            continue;
                        }
                    }
                    // if (PlyaerRoleAI.ins().isOpen && ) {
                    // 	if (EntityMgr.ins().checkWalkable(nX, nY) || EntityMgr.ins().getTeleport(nX, nY)) {
                    // 		continue;
                    // 	}
                    // }
                    // if (EntityMgr.ins().getTeleport(nX, nY)) {
                    // 	continue;
                    // }
                    //cell.MarkTag与当前的m_nMarkTag不同，也视为是未开启状态
                    if (cell.MarkTag != this.m_nMarkTag || cell.State == ASMapCell.CSNONE) {
                        cell.MarkTag = this.m_nMarkTag;
                        cell.LastX = nCurX;
                        cell.LastY = nCurY;
                        cell.btDir = i;
                        cell.GCost = curCell.GCost + AStar.AS_MOVECOST[i & 1];
                        cell.HCost = (Math.abs(targetX - nX) + Math.abs(targetY - nY)) * 10;
                        this.openCell(cell);
                    }
                    else if (cell.State == ASMapCell.CSOPEN) {
                        if (cell.GCost > curCell.GCost + AStar.AS_MOVECOST[i & 1]) {
                            cell.LastX = nCurX;
                            cell.LastY = nCurY;
                            cell.btDir = i;
                            cell.GCost = curCell.GCost + AStar.AS_MOVECOST[i & 1];
                            this.reopenCell(cell);
                        }
                    }
                }
                curCell = this.m_LastOpenCell;
                if (curCell == null)
                    break;
                nCurX = curCell.X;
                nCurY = curCell.Y;
            }
            if (boPathFound) {
                var Result = [];
                // let gridNode: TrajectoryNode = ObjectPool.pop("app.TrajectoryNode");
                // gridNode.init(curCell.X, curCell.Y, curCell.btDir);
                Result.push(curCell);
                while (true) {
                    // curCell = this.m_ASMapCells[curCell.LastY * this.m_nWidth + curCell.LastX];
                    curCell = this.m_ASMapCells[curCell.LastX * this.m_nHeight + curCell.LastY];
                    // let gridNode: TrajectoryNode = ObjectPool.pop("app.TrajectoryNode");
                    // gridNode.init(curCell.X, curCell.Y, curCell.btDir);
                    Result.push(curCell);
                    if ((curCell.LastX <= 0 && curCell.LastY <= 0) || curCell.MarkTag != this.m_nMarkTag) {
                        break;
                    }
                }
                return Result;
            }
            return [];
        };
        /**
             * 寻路开始的时候重置起点数据
             * @param cX
             * @param cY
             *
             */
        AStar.prototype.reset = function (cX, cY) {
            // let cell: ASMapCell = this.m_ASMapCells[cY * this.m_nWidth + cX];
            var cell = this.m_ASMapCells[cX * this.m_nHeight + cY];
            cell.LastX = 0;
            cell.LastY = 0;
            cell.HCost = 0;
            cell.GCost = 0;
            cell.FValue = 0;
            cell.State = 0;
            cell.Prev = null;
            cell.Next = null;
            cell.btDir = 0;
            this.m_LastOpenCell = null;
            this.m_nMarkTag = this.m_nMarkTag + 1;
        };
        /**
         * 关闭指定的格子
         * @param cell
         *
         */
        AStar.prototype.closeCell = function (cell) {
            //如果格子已经开启则进行路径链表的移除操作
            if (cell.State == ASMapCell.CSOPEN) {
                if (cell.Prev)
                    cell.Prev.Next = cell.Next;
                if (cell.Next)
                    cell.Next.Prev = cell.Prev;
                if (cell == this.m_LastOpenCell)
                    this.m_LastOpenCell = cell.Prev;
            }
            cell.State = ASMapCell.CSCLOSE;
        };
        /**
         * 开启指定的格子
         * @param cell
         *
         */
        AStar.prototype.openCell = function (cell) {
            cell.State = ASMapCell.CSOPEN;
            var nFValue = cell.HCost + cell.GCost;
            cell.FValue = nFValue;
            var lastCell = this.m_LastOpenCell;
            if (!lastCell) {
                this.m_LastOpenCell = cell;
                cell.Prev = null;
                cell.Next = null;
            }
            else {
                //开启格子的时候在已开启的格子链表中按移动估价值进行排序
                while (lastCell.FValue < nFValue) {
                    if (lastCell.Prev == null) {
                        lastCell.Prev = cell;
                        cell.Prev = null;
                        cell.Next = lastCell;
                        return;
                    }
                    lastCell = lastCell.Prev;
                }
                //添加到当前开启格子链表的末尾
                cell.Prev = lastCell;
                if (lastCell.Next) {
                    cell.Next = lastCell.Next;
                    lastCell.Next.Prev = cell;
                    lastCell.Next = cell;
                }
                else {
                    cell.Next = null;
                    lastCell.Next = cell;
                    this.m_LastOpenCell = cell;
                }
            }
        };
        /**
         * 重新开启指定的格子更新移动估价值并重新再已开启格子链表中排序
         * @param cell
         *
         */
        AStar.prototype.reopenCell = function (cell) {
            var nFValue = cell.HCost + cell.GCost;
            cell.FValue = nFValue;
            var nextCell = cell.Next;
            if (nextCell && nextCell.FValue > nFValue) {
                do {
                    nextCell = nextCell.Next;
                } while (nextCell && nextCell.FValue > nFValue);
                if (cell.Prev)
                    cell.Prev.Next = cell.Next;
                if (cell.Next)
                    cell.Next.Prev = cell.Prev;
                if (nextCell) {
                    cell.Next = nextCell;
                    if (nextCell.Prev) {
                        cell.Prev = nextCell.Prev;
                        nextCell.Prev.Next = cell;
                    }
                    else
                        cell.Prev = null;
                    nextCell.Prev = cell;
                }
                else {
                    cell.Prev = this.m_LastOpenCell;
                    cell.Next = null;
                    this.m_LastOpenCell.Next = cell;
                    this.m_LastOpenCell = cell;
                }
            }
        };
        /**
         * 判断指定的格子是否可移动
         * @param x 格子x坐标
         * @param y 格子y坐标
         * @return
         *
         */
        AStar.prototype.ishidden = function (x, y) {
            if (x < 0 || x >= this.m_nWidth || y < 0 || y >= this.m_nHeight) {
                return false;
            }
            else {
                if (this.m_ASMapCells[x * this.m_nHeight + y]) {
                    return this.m_ASMapCells[x * this.m_nHeight + y].CanNotMove == 3;
                }
            }
            return false;
        };
        /**
         * 判断指定的格子是否可移动
         * @param x 格子x坐标
         * @param y 格子y坐标
         * @return
         *
         */
        AStar.prototype.isWalkableTile = function (x, y) {
            if (x < 0 || x >= this.m_nWidth || y < 0 || y >= this.m_nHeight) {
                return false;
            }
            else {
                if (this.m_ASMapCells[x * this.m_nHeight + y]) {
                    return this.m_ASMapCells[x * this.m_nHeight + y].CanNotMove > 0;
                }
            }
            return false;
        };
        /**
         * 寻路算法有关的常量定义
         *
         */
        AStar.RMOVECOST = 14; //倾斜方向的移动耗费
        AStar.DMOVECOST = 10; //直线方向的移动耗费
        AStar.AS_MOVECOST = [AStar.DMOVECOST, AStar.RMOVECOST];
        // 7	0   1
        // 6		2
        // 5	4   3
        AStar.NEIGHBORPOS_X_VALUES = [0, 1, 1, 1, 0, -1, -1, -1]; //用于快速计算临近坐标值的优化数据
        AStar.NEIGHBORPOS_Y_VALUES = [-1, -1, 0, 1, 1, 1, 0, -1]; //用于快速计算临近坐标值的优化数据
        return AStar;
    }());
    gamelib.AStar = AStar;
    __reflect(AStar.prototype, "gamelib.AStar");
    /**
     * A*寻路类地图中的坐标格子
     * 同时也作为寻路搜索过程中的路径点链表节点
     * 格子在寻路对象将按照链表的方式依据移动估价值进行排序
     * @author Miros
     *
     */
    var ASMapCell = (function () {
        function ASMapCell() {
        }
        /**
         * 格子状态值定义
         *
         */
        ASMapCell.CSNONE = 0; //未处理的格子
        ASMapCell.CSOPEN = 1; //格子已经开启
        ASMapCell.CSCLOSE = 2; //格子已经关闭
        return ASMapCell;
    }());
    gamelib.ASMapCell = ASMapCell;
    __reflect(ASMapCell.prototype, "gamelib.ASMapCell");
})(gamelib || (gamelib = {}));
/**
 * Created by yangsong on 15-1-20.
 */
var gamelib;
(function (gamelib) {
    var DeviceUtils = (function () {
        function DeviceUtils() {
        }
        Object.defineProperty(DeviceUtils, "IsHtml5", {
            /**
             * 当前是否Html5版本
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsNative", {
            /**
             * 当前是否是Native版本
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsMobile", {
            /**
             * 是否是在手机上
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return egret.Capabilities.isMobile || window['gameIsWeb'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsIOS", {
            /**
             * 是否是在手机上
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return egret.Capabilities.os == "iOS";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsIpad", {
            /**
             * 是否是ipad
             */
            get: function () {
                if (DeviceUtils.IsMobile) {
                    var ua = navigator.userAgent;
                    var isAndroid = /(?:Android)/.test(ua);
                    var isFireFox = /(?:Firefox)/.test(ua);
                    var isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
                    return isTablet;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsPC", {
            /**
             * 是否是在PC上
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return !egret.Capabilities.isMobile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsQQBrowser", {
            /**
             * 是否是QQ浏览器
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsIEBrowser", {
            /**
             * 是否是IE浏览器
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsFirefoxBrowser", {
            /**
             * 是否是Firefox浏览器
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsChromeBrowser", {
            /**
             * 是否是Chrome浏览器
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsSafariBrowser", {
            /**
             * 是否是Safari浏览器
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceUtils, "IsOperaBrowser", {
            /**
             * 是否是Opera浏览器
             * @returns {boolean}
             * @constructor
             */
            get: function () {
                return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
            },
            enumerable: true,
            configurable: true
        });
        return DeviceUtils;
    }());
    gamelib.DeviceUtils = DeviceUtils;
    __reflect(DeviceUtils.prototype, "gamelib.DeviceUtils");
})(gamelib || (gamelib = {}));
/**
 * Created by hrz on 2017/8/25.
 */
var gamelib;
(function (gamelib) {
    var FixUtil = (function () {
        function FixUtil() {
        }
        /** 启动心跳 */
        FixUtil.startUpHeartbeat = function () {
            var requestAnimationFrame = function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
            var onTick = function () {
                FixUtil.heartbeatTime = egret.getTimer();
                //  requestAnimationFrame(onTick);
                egret.ticker.update();
            };
            if (FixUtil.isTimeout > 5) {
                FixUtil.isTimeout = 10;
                //    requestAnimationFrame(onTick);
                onTick();
            }
            FixUtil.isTimeout++;
            // this.stopUpHeartbeat();
            // FixUtil.isTimeout = true;
            // window['onTickFuncton'] = function (): void {
            // 	if (FixUtil.timeoutId) {
            // 		clearTimeout(FixUtil.timeoutId);
            // 		FixUtil.timeoutId = 0;
            // 	}
            // 	FixUtil.heartbeatTime = egret.getTimer();
            // 	if (FixUtil.isTimeout) {
            // 		egret.ticker.update();
            // 		requestAnimationFrame();
            // 	}
            // }
            // var onTick = function (): void {
            // 	if (FixUtil.timeoutId) {
            // 		clearTimeout(FixUtil.timeoutId);
            // 		FixUtil.timeoutId = 0;
            // 	}
            // 	FixUtil.heartbeatTime = egret.getTimer();
            // 	if (FixUtil.isTimeout) {
            // 		egret.ticker.update();
            // 		requestAnimationFrame();
            // 	}
            // }
            // var requestAnimationFrame = function () {
            // 	FixUtil.timeoutId = window.setTimeout(window['onTickFuncton'], 1000 / 60);
            // }
            // FixUtil.heartbeatTime = egret.getTimer();
            // if (!FixUtil.timeoutId) {
            // 	requestAnimationFrame();
            // }
            // onTick()
        };
        /** 暂停心跳 */
        FixUtil.stopUpHeartbeat = function () {
            FixUtil.isTimeout = 0;
            FixUtil.heartbeatTime = egret.getTimer();
            // if (FixUtil.timeoutId) {
            // 	clearTimeout(FixUtil.timeoutId);
            // 	FixUtil.timeoutId = 0;
            // }
        };
        FixUtil.fixAll = function () {
            //----------------------------------以下代码慎改---------------------
            //-------------------------资源移除
            egret.BitmapData.$removeDisplayObject = function (displayObject, bitmapData) {
                if (!bitmapData) {
                    return;
                }
                var hashCode = bitmapData.hashCode;
                if (!hashCode) {
                    return;
                }
                if (!egret.BitmapData['_displayList'][hashCode]) {
                    return;
                }
                var tempList = egret.BitmapData['_displayList'][hashCode];
                var index = tempList.indexOf(displayObject);
                if (index >= 0) {
                    tempList.splice(index, 1);
                }
                if (tempList.length == 0) {
                    gamelib.os.RM.disposeResTime(hashCode);
                }
            };
            var __tempCache = {};
            /**
             * 打印图片所占内存
             * @version Egret 5.2
             * @platform Web,Native
             * @language zh_CN
             */
            function profile() {
                RES.config.config.fileSystem.profile();
                console.log(__tempCache);
                //todo 
                var totalImageSize = 0;
                for (var key in __tempCache) {
                    var img = __tempCache[key];
                    if (img instanceof egret.Texture) {
                        totalImageSize += img.$bitmapWidth * img.$bitmapHeight * 4;
                    }
                }
                console.log("gpu size : " + (totalImageSize / 1024).toFixed(3) + "kb");
            }
            if (!gamelib.DeviceUtils.IsMobile) {
                RES.profile = profile;
                /**
                * @internal
                */
                RES.host = {
                    state: {},
                    get resourceConfig() {
                        return RES.config;
                    },
                    load: function (r, processorName) {
                        var processor = typeof processorName == 'string' ? RES.processor._map[processorName] : processorName;
                        return RES.queue["loadResource"](r, processor);
                    },
                    unload: function (r) { return RES.queue.unloadResource(r); },
                    save: function (resource, data) {
                        RES.host.state[resource.root + resource.name] = 2;
                        delete resource.promise;
                        __tempCache[resource.root + resource.name] = data;
                    },
                    get: function (resource) {
                        return __tempCache[resource.root + resource.name];
                    },
                    remove: function (resource) {
                        delete RES.host.state[resource.root + resource.name];
                        delete __tempCache[resource.root + resource.name];
                    }
                };
            }
            RES['getAnalyzers'] = function () {
                return __tempCache;
            };
            RES['getTreeTexture'] = function () {
                var hashCode;
                var keyAry = [];
                for (var key in __tempCache) {
                    var img = __tempCache[key];
                    if (img instanceof egret.Texture) {
                        if (img.bitmapData && img.bitmapData.hashCode) {
                            hashCode = img.bitmapData.hashCode;
                            var tempList = egret.BitmapData['_displayList'][hashCode];
                            if (!tempList || tempList.length == 0) {
                                keyAry.push(key);
                            }
                        }
                    }
                    else if (img instanceof egret.SpriteSheet) {
                        if (img.$texture && img.$texture.bitmapData && img.$texture.bitmapData.hashCode) {
                            var tempList = egret.BitmapData['_displayList'][hashCode];
                            if (!tempList || tempList.length == 0) {
                                keyAry.push(key);
                            }
                        }
                    }
                }
                return keyAry;
            };
            // RES['getSpriteSheet'] = function (key: number): egret.SpriteSheet {
            // 	let img = __tempCache[key];
            // 	if (img instanceof egret.SpriteSheet) {
            // 	}
            // 	return null;
            // }
            RES['getTextureData'] = function (key) {
                var img = __tempCache[key];
                if (img instanceof egret.Texture) {
                    if (img.bitmapData && img.bitmapData.hashCode) {
                        var hashCode = img.bitmapData.hashCode;
                        var tempList = egret.BitmapData['_displayList'][hashCode];
                        if (!tempList || tempList.length == 0) {
                            return img;
                        }
                    }
                }
                return null;
            };
            RES['removeTempCache'] = function (key) {
                delete RES.host.state[key];
                delete __tempCache[key];
            };
            if (!gamelib.DeviceUtils.IsMobile) {
                //-------------------------截取输入框事件-------------
                var onTouchMove_1 = egret.DisplayObject.prototype.$dispatchPropagationEvent;
                egret.DisplayObject.prototype.$dispatchPropagationEvent = function (event, list, targetIndex) {
                    if (event.type == egret.FocusEvent.FOCUS_IN) {
                        gamelib.os.KeyBoard.isInput = true;
                    }
                    else if (event.type == egret.FocusEvent.FOCUS_OUT) {
                        gamelib.os.KeyBoard.isInput = false;
                    }
                    return onTouchMove_1(event, list, targetIndex);
                };
            }
            window["heartbeatFunction"] = function () {
                FixUtil.stopUpHeartbeat();
                FixUtil.heartbeatTime = egret.getTimer();
            };
            //-------------------------伪心跳-------------
            // egret.lifecycle.addLifecycleListener((context) => {
            // 	// custom lifecycle plugin
            // })
            // let requestAnimationFrame = function (callback) {
            // 	if (isFake) {
            // 		timeoutId = window.setTimeout(callback, 1000 / 60);
            // 	}
            // };
            // let isFake = false;
            // let isOnPause = false;
            // let timeoutId = 0;
            // function onTick(): void {
            // 	requestAnimationFrame(onTick);
            // 	egret.ticker.update();
            // }
            // /**
            //  * 切换到后台
            //  */
            // egret.lifecycle.onPause = () => {
            // 	isOnPause = true;
            // 	clearTimeout(timeoutId);
            // 	timeoutId = window.setTimeout(() => {
            // 		if (isOnPause) {
            // 			egret.startTick(callBack, this);
            // 			timeoutId = window.setTimeout(() => {
            // 				egret.stopTick(callBack, this);
            // 				if (isOnPause) {
            // 					isFake = true;
            // 					requestAnimationFrame(onTick);
            // 				}
            // 			}, 2000);
            // 		}
            // 	}, 2000);
            // }
            // /**恢复心跳 */
            // egret.lifecycle.onResume = () => {
            // 	clearTimeout(timeoutId);
            // 	isOnPause = isFake = false;
            // }
            // function callBack(time: number) {
            // 	clearTimeout(timeoutId);
            // 	egret.stopTick(callBack, this);
            // 	isOnPause = isFake = false;
            // 	return false;
            // }
        };
        FixUtil.resourceRoot = "";
        /** 心跳时间 */
        FixUtil.heartbeatTime = 0;
        FixUtil.timeoutId = 0;
        FixUtil.isTimeout = 0;
        return FixUtil;
    }());
    gamelib.FixUtil = FixUtil;
    __reflect(FixUtil.prototype, "gamelib.FixUtil");
})(gamelib || (gamelib = {}));
var app;
(function (app) {
    var AgeWin = (function (_super) {
        __extends(AgeWin, _super);
        function AgeWin() {
            var _this = _super.call(this) || this;
            var exml = "\n         <e:Skin class=\"AgeViewSkin\" width=\"912\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:app=\"app.*\" xmlns:w=\"http://ns.egret.com/wing\" height=\"530\">\n\t<e:Rect top=\"0\" left=\"0\" right=\"0\" bottom=\"0\" alpha=\"0.3\"/>\n\t<e:Group horizontalCenter=\"0\" verticalCenter=\"0\" width=\"910\" height=\"530\">\n\t\t<e:Image scaleX=\"1\" scaleY=\"1\" scale9Grid=\"74,80,634,486\" source=\"com_bg_kuang_5_png\" x=\"0\" y=\"0\" anchorOffsetY=\"0\" height=\"526\"/>\n\t\t<e:Image smoothing=\"false\" width=\"864\" source=\"com_bg_kuang_6_png\" scale9Grid=\"17,19,2,4\" x=\"23\" height=\"438\" y=\"57\" anchorOffsetX=\"0\" anchorOffsetY=\"0\"/>\n\t\t<e:Scroller width=\"862\" height=\"355\" x=\"24\" y=\"70\" anchorOffsetX=\"0\" anchorOffsetY=\"0\">\n\t\t\t<e:Group>\n\t\t\t\t<e:Label id=\"textLab\" text=\"1\u3001\u672C\u6E38\u620F\u662F\u4E00\u6B3E\u73A9\u6CD5\u7B80\u5355\u7684\u89D2\u8272\u626E\u6F14\u7C7B\u6E38\u620F\uFF0C\u9002\u7528\u4E8E\u5E74\u6EE116\u5468\u5C81\u53CA\u4EE5\u4E0A\u7684\u7528\u6237\uFF0C\u5EFA\u8BAE\u672A\u6210\u5E74\u4EBA\u5728\u5BB6\u957F\u7684\u76D1\u62A4\u4E0B\u4F7F\u7528\u6E38\u620F\u4EA7\u54C1\u3002 \n2\u3001\u672C\u6E38\u620F\u57FA\u4E8E\u67B6\u7A7A\u7684\u6545\u4E8B\u80CC\u666F\u548C\u5E7B\u60F3\u4E16\u754C\u89C2\uFF0C\u6E38\u620F\u4E2D\u7684\u89D2\u8272\u5747\u4E3A\u865A\u6784\uFF0C\u4E0D\u4F1A\u4E0E\u73B0\u5B9E\u76F8\u6DF7\u6DC6\u3002\u6E38\u620F\u662F\u4E00\u6B3E\u5927\u578B\u591A\u4EBA\u5728\u7EBF\u5BF9\u6218ARPG\u6E38\u620F\uFF0C\u5236\u4F5C\u7CBE\u7F8E\u3001\u73A9\u6CD5\u4E30\u5BCC\u3002\u5267\u60C5\u7B80\u5355\u4E14\u79EF\u6781\u5411\u4E0A\uFF0C\u6CA1\u6709\u57FA\u4E8E\u771F\u5B9E\u5386\u53F2\u548C\u73B0\u5B9E\u4E8B\u4EF6\u6539\u7F16\u5185\u5BB9\u3002\u6E38\u620F\u62E5\u6709\u591A\u6837\u7684PVE\u6D3B\u52A8\u526F\u672C\u548C\u7D27\u5F20\u523A\u6FC0\u7684PVP\u5BF9\u6297\u73A9\u6CD5\uFF0C\u5305\u542B\u89D2\u8272\u517B\u6210\u3001\u8DE8\u670D\u7ADE\u6280\u7B49\uFF0C\u9700\u8981\u6295\u5165\u4E00\u5B9A\u7684\u65F6\u95F4\u548C\u7CBE\u529B\u3002\u6E38\u620F\u4E2D\u6709\u57FA\u4E8E\u6587\u5B57\u7684\u964C\u751F\u4EBA\u793E\u4EA4\u7CFB\u7EDF\uFF0C\u4F46\u793E\u4EA4\u7CFB\u7EDF\u7684\u7BA1\u7406\u9075\u5FAA\u76F8\u5173\u6CD5\u5F8B\u6CD5\u89C4\u3002 \n3\u3001\u672C\u6E38\u620F\u4E2D\u6709\u7528\u6237\u5B9E\u540D\u8BA4\u8BC1\u7CFB\u7EDF\uFF0C\u8BA4\u8BC1\u4E3A\u672A\u6210\u5E74\u4EBA\u7684\u7528\u6237\u5C06\u63A5\u53D7\u4EE5\u4E0B\u7BA1\u7406\uFF1A\n\u6E38\u620F\u4E2D\u90E8\u5206\u73A9\u6CD5\u548C\u9053\u5177\u9700\u8981\u4ED8\u8D39\u3002\u672A\u6EE112\u5468\u5C81\u7684\u7528\u6237\u4E0D\u80FD\u4ED8\u8D39\uFF1B12\u5468\u5C81\u4EE5\u4E0A\u672A\u6EE116\u5468\u5C81\u7684\u7528\u6237\uFF0C\u5355\u6B21\u5145\u503C\u91D1\u989D\u4E0D\u5F97\u8D85\u8FC750\u5143\u4EBA\u6C11\u5E01\uFF0C\u6BCF\u6708\u5145\u503C\u91D1\u989D\u7D2F\u8BA1\u4E0D\u5F97\u8D85\u8FC7200\u5143\u4EBA\u6C11\u5E01\uFF1B16\u5468\u5C81\u4EE5\u4E0A\u7684\u672A\u6210\u5E74\u7528\u6237\uFF0C\u5355\u6B21\u5145\u503C\u91D1\u989D\u4E0D\u5F97\u8D85\u8FC7100\u5143\u4EBA\u6C11\u5E01\uFF0C\u6BCF\u6708\u5145\u503C\u91D1\u989D\u7D2F\u8BA1\u4E0D\u5F97\u8D85\u8FC7400\u5143\u4EBA\u6C11\u5E01\u3002\n\u672A\u6210\u5E74\u4EBA\u8D26\u53F7\uFF0C\u4EC5\u53EF\u5728\u5468\u4E94\u3001\u5468\u516D\u3001\u5468\u65E5\u548C\u6CD5\u5B9A\u8282\u5047\u65E5\u6BCF\u65E520\u65F6\u81F321\u65F6\u8FDB\u884C\u6E38\u620F\uFF0C\u5176\u4ED6\u65F6\u95F4\u5747\u65E0\u6CD5\u8FDB\u884C\u6E38\u620F\u3002\n4\u3001\u6E38\u620F\u4E2D\u73A9\u5BB6\u9700\u8981\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u6765\u8FDB\u884C\u64CD\u4F5C\uFF0C\u63A7\u5236\u89D2\u8272\u5BF9\u6E38\u620F\u4E8B\u4EF6\u505A\u51FA\u5FEB\u901F\u53CD\u5E94\uFF0C\u6709\u52A9\u4E8E\u953B\u70BC\u73A9\u5BB6\u7684\u601D\u7EF4\u80FD\u529B\u3001\u624B\u773C\u534F\u8C03\u80FD\u529B\u4E0E\u5FEB\u901F\u53CD\u5E94\u80FD\u529B\u3002\u6E38\u620F\u4E3B\u8981\u73A9\u6CD5\u4E3APVE\u6D3B\u52A8\u548CPVP\u7ADE\u6280\uFF0C\u53EF\u4EE5\u953B\u70BC\u73A9\u5BB6\u7684\u6C9F\u901A\u80FD\u529B\u3001\u56E2\u961F\u534F\u4F5C\u80FD\u529B\u548C\u5927\u5C40\u89C2\u3002\" size=\"24\" stroke=\"2\" textColor=\"0xe5ddcf\" width=\"830\" lineSpacing=\"10\" y=\"3\" x=\"16\" anchorOffsetX=\"0\" anchorOffsetY=\"0\"/>\n\t\t\t</e:Group>\n\t\t</e:Scroller>\n\t\t<e:Label id=\"txt_name\" size=\"24\" stroke=\"2\" scaleX=\"1\" scaleY=\"1\" touchEnabled=\"false\" top=\"17\" horizontalCenter=\"0\" textColor=\"0xE5DDCF\" text=\"\u9002\u9F84\u63D0\u793A\"/>\n\t\t<e:Button id=\"btn_close\" label=\"\" width=\"60\" scaleX=\"1.2\" scaleY=\"1.2\" x=\"889\" y=\"-9\">\n\t\t\t<e:skinName>\n\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image width=\"100%\" height=\"100%\" source=\"btn_guanbi3\" source.down=\"btn_guanbi4\" source.disabled=\"btn_guanbi4\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t</e:Button>\n\t\t<e:Button id=\"sureBtn\" label=\"\u786E \u5B9A\" width=\"109\" height=\"44\" scaleX=\"1\" scaleY=\"1\" horizontalCenter=\"0.5\" bottom=\"47\">\n\t\t\t<e:skinName>\n\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"tips_btn\" source.down=\"tips_btn\" source.disabled=\"tips_btn\" scaleX.down=\"0.95\" scaleY.down=\"0.95\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\" size=\"20\" stroke=\"2\" textColor=\"0xe5ddcf\"/>\n\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t</e:Button>\n\t</e:Group>\n</e:Skin>\n            ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "AgeViewSkin";
            _this.horizontalCenter = _this.verticalCenter = 0;
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
        }
        AgeWin.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        AgeWin.prototype.initUI = function () {
            this.textLab.textFlow = new egret.HtmlTextParser().parser("1、本游戏是一款玩法简单的角色扮演类游戏，适用于年满16周岁及以上的用户，建议未成年人在家长的监护下使用游戏产品。 \n2、本游戏基于架空的故事背景和幻想世界观，游戏中的角色均为虚构，不会与现实相混淆。游戏是一款大型多人在线对战ARPG游戏，制作精美、玩法丰富。剧情简单且积极向上，没有基于真实历史和现实事件改编内容。游戏拥有多样的PVE活动副本和紧张刺激的PVP对抗玩法，包含角色养成、跨服竞技等，需要投入一定的时间和精力。游戏中有基于文字的陌生人社交系统，但社交系统的管理遵循相关法律法规。 \n3、本游戏中有用户实名认证系统，认证为未成年人的用户将接受以下管理：\n游戏中部分玩法和道具需要付费。未满12周岁的用户不能付费；12周岁以上未满16周岁的用户，单次充值金额不得超过50元人民币，每月充值金额累计不得超过200元人民币；16周岁以上的未成年用户，单次充值金额不得超过100元人民币，每月充值金额累计不得超过400元人民币。\n未成年人账号，仅可在周五、周六、周日和法定节假日每日20时至21时进行游戏，其他时间均无法进行游戏。\n4、游戏中玩家需要根据实际情况来进行操作，控制角色对游戏事件做出快速反应，有助于锻炼玩家的思维能力、手眼协调能力与快速反应能力。游戏主要玩法为PVE活动和PVP竞技，可以锻炼玩家的沟通能力、团队协作能力和大局观。");
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        AgeWin.prototype.onClick = function (e) {
            this.removeView();
        };
        AgeWin.prototype.removeView = function () {
            this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
                Main.ageView = null;
            }
        };
        return AgeWin;
    }(eui.Component));
    app.AgeWin = AgeWin;
    __reflect(AgeWin.prototype, "app.AgeWin");
})(app || (app = {}));
var app;
(function (app) {
    /**
     * 游戏参数信息
     */
    var GameParameter = (function () {
        function GameParameter() {
            this._gameLogo = "";
            this._gameLoadImg = "";
            this._gameLoginImg = "";
            this._game = "";
            this._isShowGongGao = false;
            this._isAutoShowGongGao = false;
            this._publicRes = "";
            this._gameVersion = "";
            this._gameAppVersion = "";
        }
        Object.defineProperty(GameParameter.prototype, "userInfo", {
            /**
             * 玩家账号信息
             */
            get: function () {
                return this._userInfo;
            },
            /**
             * 玩家账号信息
             */
            set: function (v) {
                this._userInfo = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "loginType", {
            /** 登录类型 0：测试 1：正式 */
            get: function () {
                return this._loginType;
            },
            /** 登录类型 0：测试 1：正式 */
            set: function (v) {
                this._loginType = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "gameLogo", {
            /** 游戏Logo */
            get: function () {
                return this._gameLogo;
            },
            /** 游戏Logo */
            set: function (v) {
                this._gameLogo = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "gameLoadImg", {
            /** 游戏加载背景 */
            get: function () {
                return this._gameLoadImg;
            },
            /** 游戏加载背景 */
            set: function (v) {
                this._gameLoadImg = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "gameLoginImg", {
            /** 游戏选服背景 */
            get: function () {
                return this._gameLoginImg;
            },
            /** 游戏选服背景 */
            set: function (v) {
                this._gameLoginImg = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "game", {
            /** 游戏编号 */
            get: function () {
                return this._game;
            },
            /** 游戏编号 */
            set: function (v) {
                this._game = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "pf", {
            /**
             * 平台名称
             */
            get: function () {
                return this._pf;
            },
            /**
             * 平台名称
             */
            set: function (v) {
                this._pf = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "pfID", {
            /**
             * 平台id
             */
            get: function () {
                return this._pfID;
            },
            /**
             * 平台id
             */
            set: function (v) {
                this._pfID = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "serviceListdUrl", {
            /**
             * 服务列表地址
             */
            get: function () {
                return this._serviceListdUrl;
            },
            /**
             * 服务列表地址
             */
            set: function (v) {
                this._serviceListdUrl = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "setServiceListdUrl", {
            /**
             * 保存最近登录
             */
            get: function () {
                return this._setServiceListdUrl;
            },
            /**
             * 保存最近登录
             */
            set: function (v) {
                this._setServiceListdUrl = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "checkUrl", {
            /**
             * 登录验证接口
             */
            get: function () {
                return this._checkUrl;
            },
            /**
             * 登录验证接口
             */
            set: function (v) {
                this._checkUrl = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "payUrl", {
            /**
             * 充值接口
             */
            get: function () {
                return this._payUrl;
            },
            /**
             * 充值接口
             */
            set: function (v) {
                this._payUrl = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "orderUrl", {
            /**
             * 订单号
             */
            get: function () {
                return this._orderUrl;
            },
            /**
             * 订单号
             */
            set: function (v) {
                this._orderUrl = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "payNotice", {
            /**
             * 支付回调
             */
            get: function () {
                return this._payNotice;
            },
            /**
             * 支付回调
             */
            set: function (v) {
                this._payNotice = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "gongGaoUrl", {
            /**
             * 公告信息
             */
            get: function () {
                return this._gongGaoUrl;
            },
            /**
             * 公告信息
             */
            set: function (v) {
                this._gongGaoUrl = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "isReport", {
            /**
             * 是否上报后台
             */
            get: function () {
                return this._isReport;
            },
            /**
             * 是否上报后台
             */
            set: function (v) {
                this._isReport = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "isShowGongGao", {
            /**
             * 是否显示公告按钮
             */
            get: function () {
                return this._isShowGongGao;
            },
            /**
             * 是否显示公告按钮
             */
            set: function (v) {
                this._isShowGongGao = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "isAutoShowGongGao", {
            /**
             * 是否自动弹出公告
             */
            get: function () {
                return this._isAutoShowGongGao;
            },
            /**
             * 是否自动弹出公告
             */
            set: function (v) {
                this._isAutoShowGongGao = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "reportURL", {
            /**
             * 上报后台地址
             */
            get: function () {
                return this._reportURL;
            },
            /**
             * 上报后台地址
             */
            set: function (v) {
                this._reportURL = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "reportURLPF", {
            /**
             * 上报渠道地址
             */
            get: function () {
                return this._reportURLPF;
            },
            /**
             * 是否上报渠道
             */
            set: function (v) {
                this._reportURLPF = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "isReportPF", {
            /**
             * 是否上报渠道
             */
            get: function () {
                return this._isReportPF;
            },
            /**
             * 是否上报渠道
             */
            set: function (v) {
                this._isReportPF = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "isDisablePay", {
            /**
             * 是否关闭充值
             */
            get: function () {
                return this._isDisablePay;
            },
            /**
             * 是否关闭充值
             */
            set: function (v) {
                this._isDisablePay = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "extraParame", {
            /**
             * 附加参数
             */
            get: function () {
                return this._extraParame;
            },
            /**
             * 附加参数
             */
            set: function (v) {
                this._extraParame = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "publicRes", {
            /** 公用资源 */
            get: function () {
                return this._publicRes;
            },
            /** 公用资源 */
            set: function (v) {
                this._publicRes = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "gameVersion", {
            /** 应用版本 */
            get: function () {
                return this._gameVersion;
            },
            /** 应用版本 */
            set: function (v) {
                this._gameVersion = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameParameter.prototype, "gameAppVersion", {
            /** 游戏版本 */
            get: function () {
                return this._gameAppVersion;
            },
            /** 游戏版本 */
            set: function (v) {
                this._gameAppVersion = v;
            },
            enumerable: true,
            configurable: true
        });
        return GameParameter;
    }());
    app.GameParameter = GameParameter;
    __reflect(GameParameter.prototype, "app.GameParameter");
})(app || (app = {}));
var app;
(function (app) {
    /**
     * 游戏socket接口
     *
     */
    var GameSocket = (function () {
        function GameSocket() {
            this._isAddGameApp = false;
            this.isNewRole = false;
            this._socketStatus = 0;
            this._lastReceiveTime = 0;
            this.pid = 0;
            /**
             * 服务器协议处理注册表
             * 格式
             * PACK_HANDLER[sysId][msgId] = [fun,funThisObj]
             */
            this.PACK_HANDLER = [];
            this._serverId = 0;
            this._originalSrvid = 0;
            this._user = "";
            this._pwd = "";
            this._automaticLink = true;
            this._isDoTimer = true;
            this.errorCode = ["",
                "名称无效，名称中包含非法字符或长度不合法",
                "玩家的状态不是进入游戏状态",
                "数据服务器返回错误",
                "角色名称重复",
                "当前区服注册已经关闭，请前往新区注册！",
                "角色名中含有特殊字符，无法使用"
            ];
            this.myRoleInfo = {};
            this.selectRolId = 0;
            this.accountId = 0;
            this.countNum = -1;
            this.createSign = false;
            this.newSocket();
            this.recvPack = new app.GameByteArray();
            this._packets = [];
        }
        Object.defineProperty(GameSocket.prototype, "isAddGameApp", {
            get: function () {
                return this._isAddGameApp;
            },
            set: function (b) {
                this._isAddGameApp = b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSocket.prototype, "automaticLink", {
            get: function () {
                return this._automaticLink;
            },
            set: function (b) {
                this._automaticLink = b;
            },
            enumerable: true,
            configurable: true
        });
        GameSocket.ins = function () {
            if (!GameSocket._ins) {
                GameSocket._ins = new GameSocket();
            }
            return GameSocket._ins;
        };
        GameSocket.prototype.getSocket = function () {
            return this.socket_;
        };
        GameSocket.prototype.newSocket = function () {
            if (this.socket_) {
                this.socket_.removeEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
                this.socket_.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
                this.socket_.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
                this.socket_.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
            }
            this.socket_ = new egret.WebSocket;
            this.socket_.type = egret.WebSocket.TYPE_BINARY;
            this.socket_.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
            this.socket_.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket_.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
            this.socket_.addEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
        };
        /**
         * 发送到服务器
         * @param bytes
         */
        GameSocket.prototype.sendToServer = function (bytes) {
            this.send(bytes);
            this.recycleByte(bytes);
        };
        Object.defineProperty(GameSocket.prototype, "isDoTimer", {
            get: function () {
                return this._isDoTimer;
            },
            set: function (b) {
                this._isDoTimer = b;
            },
            enumerable: true,
            configurable: true
        });
        GameSocket.prototype.connectError = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (GameSocket.IsCrossService) {
                GameSocket.IsCrossService = false;
                //关闭
                // let kfMgr: any = egret.getDefinitionByName("app.KFManager");
                // if(kfMgr){
                // 	kfMgr.ins().closeKfLoading();
                // }
            }
            if (Main.showTipsPhone) {
                Main.showTipsPhone("正在连接服务器");
            }
            // console.log("连接异常！ip:" + this._host + " port:" + this._port);
            //上报-失败
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.LINK_SERVER_FAIL, {}, null, false);
            if (this._isDoTimer) {
                var tms = app.TimerManager.ins();
                tms.remove(this.reLogin, this);
                tms.doTimer(5000, 1, this.reLogin, this);
            }
        };
        GameSocket.prototype.connect = function (host, port) {
            this.updateStatus(GameSocket.STATUS_CONNECTING);
            this._host = host;
            this._port = port;
            //上报
            if (window["wx"] || location.protocol.indexOf("https:") != -1) {
                this.socket_.connectByUrl("wss://" + host + ":" + port);
            }
            else {
                this.socket_.connect(host, port);
            }
            // this.socket_.connect("49.234.141.99" , 9111);
        };
        GameSocket.prototype.close = function () {
            this.updateStatus(GameSocket.STATUS_DISCONNECT);
            if (this.socket_) {
                this.socket_.removeEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
                this.socket_.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
                this.socket_.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
                this.socket_.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
            }
            // debug.log("close socket！ip:" + this._host + " port:" + this._port);
            this.socket_.close();
        };
        GameSocket.prototype.logoutClose = function () {
            this.close();
            this.initMyRoleInfo();
            this.socket_ = null;
            this.newSocket();
            var MFRoleMgr = egret.getDefinitionByName("app.MFRoleMgr");
            if (MFRoleMgr) {
                MFRoleMgr.ins().initMyRoleInfo();
            }
        };
        GameSocket.prototype.send = function (message) {
            if (this._socketStatus == GameSocket.STATUS_COMMUNICATION) {
                this.sendPack(message);
                return true;
            }
            else {
                // debug.log("发送数据时没和服务连接或者未进入通信状态");
                return false;
            }
        };
        GameSocket.prototype.onSocketConnected = function (e) {
            //上报-连接成功
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.LINK_SERVER_SUCCESS, {}, null, false);
            // debug.log("Socket connected！ip:" + this._host + " port:" + this._port);
            console.log("Socket connected！ip:" + this._host + " port:" + this._port);
            app.TimerManager.ins().remove(this.reLogin, this);
            this.updateStatus(GameSocket.STATUS_CHECKING);
            var bytes = new app.GameByteArray;
            // bytes.writeUnsignedInt(Encrypt.getSelfSalt());
            bytes.writeUnsignedInt(GameSocket.FIRST_KEY);
            this.socket_.writeBytes(bytes);
            this.socket_.flush();
            this.onConnected();
        };
        // private big: number = 0;
        // private small: number = 0;
        // private mid: number = 0;
        GameSocket.prototype.onSocketRead = function (e) {
            // console.log("数据通信:" + this._host + " port:" + this._port);
            // 检验阶段
            if (this._socketStatus < GameSocket.STATUS_COMMUNICATION) {
                this.sendKeyToServer();
                return;
            }
            var bytesCache = this.recvPack;
            // 记录接收数据包时间
            this._lastReceiveTime = egret.getTimer();
            if (this._lastReceiveTime - gamelib.FixUtil.heartbeatTime > 80) {
                gamelib.FixUtil.startUpHeartbeat();
            }
            // 将收到的字节流写入到存储接收到服务器数据包的字节流
            this.socket_.readBytes(bytesCache, bytesCache.length);
            if (bytesCache.position == bytesCache.length) {
                return;
            }
            var tag = bytesCache.readUnsignedShort();
            if (tag != this._salt)
                return;
            this.processRecvPacket(bytesCache);
            bytesCache.clear();
        };
        GameSocket.prototype.sendKeyToServer = function () {
            console.log("接收到服务器发来的密钥");
            var pack = new app.GameByteArray;
            this.socket_.readBytes(pack);
            pack.position = 0;
            // this._salt = pack.readUnsignedInt();
            this._salt = pack.readUnsignedShort();
            // 进入通信状态
            this.updateStatus(GameSocket.STATUS_COMMUNICATION);
        };
        GameSocket.prototype.onSocketClose = function (e) {
            if (GameSocket.IsCrossService) {
                GameSocket.IsCrossService = false;
                //关闭
                // let kfMgr: any = egret.getDefinitionByName("app.KFManager");
                // if(kfMgr){
                // 	kfMgr.ins().closeKfLoading();
                // }
            }
            //上报-断开
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.LINK_SERVER_CLOSE, {}, null, false);
            // console.log("与服务器的连接断开了！ip:" + this._host + " port:" + this._port);
            if (Main.showTipsPhone) {
                Main.showTipsPhone("正在连接服务器");
            }
            this.updateStatus(GameSocket.STATUS_DISCONNECT);
            if (this._automaticLink) {
                this.showLoading();
                // this.onClose();
                if (this._isDoTimer) {
                    var tms = app.TimerManager.ins();
                    tms.remove(this.reLogin, this);
                    tms.doTimer(5000, 1, this.reLogin, this);
                }
            }
        };
        GameSocket.prototype.reLogin = function () {
            GameSocket.IsCrossService = false;
            if (this._isDoTimer) {
                this.updateStatus(GameSocket.STATUS_DISCONNECT);
                this.close();
                this.newSocket();
                this.login(this._user, this._pwd, this._serverId, this._host, this._port, app.LocationProperty.originalSrvid);
            }
        };
        GameSocket.prototype.updateStatus = function (status) {
            if (this._socketStatus != status) {
                var old = this._socketStatus;
                this._socketStatus = status;
                this.onFinishCheck(status, old);
            }
        };
        GameSocket.prototype.onFinishCheck = function (newStatus, oldStatus) {
            if (newStatus == GameSocket.STATUS_COMMUNICATION) {
                // debug.log("与服务器建立通信成功！ip:" + this._host + " port:" + this._port);
                if (GameSocket.IsCrossService) {
                    this.KfsendCheckAccount(this._kFRoleId, this._KFServerId);
                }
                else {
                    this.sendCheckAccount(this._user, this._pwd);
                }
            }
            else if (newStatus == GameSocket.STATUS_DISCONNECT) {
                // TODO: output error message
            }
        };
        Object.defineProperty(GameSocket.prototype, "host", {
            get: function () {
                return this._host;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSocket.prototype, "port", {
            get: function () {
                return this._port;
            },
            enumerable: true,
            configurable: true
        });
        GameSocket.prototype.sendCheckAccount = function (user, pwd) {
            var bytes = this.getBytes();
            bytes.writeCmd(255, 1);
            bytes.writeString(user);
            bytes.writeString(pwd);
            bytes.writeInt(this._serverId);
            bytes.writeInt(this._serverId);
            // bytes.writeInt(this._originalSrvid);
            this.sendToServer(bytes);
        };
        GameSocket.prototype.KfsendCheckAccount = function (roleId, serverID) {
            var bytes = this.getBytes();
            bytes.writeCmd(255, 9);
            bytes.writeUnsignedInt(roleId);
            bytes.writeUnsignedInt(serverID);
            // bytes.writeInt(this._originalSrvid);
            this.sendToServer(bytes);
        };
        GameSocket.prototype.login = function (user, pwd, serverID, ip, port, originalSrvid) {
            if (originalSrvid === void 0) { originalSrvid = 0; }
            this._isDoTimer = true;
            this.updateStatus(GameSocket.STATUS_DISCONNECT);
            this._user = user;
            this._pwd = pwd;
            this._serverId = serverID;
            this._originalSrvid = originalSrvid;
            if (ip.split(":")[1] && ip.split(":")[1].length)
                port = parseInt(ip.split(":")[1]);
            if (!this.socket_.connected) {
                this.connect(ip, port);
            }
            else {
                this.sendCheckAccount(user, pwd);
            }
        };
        GameSocket.prototype.processRecvPacket = function (packet) {
            var sysId = packet.readUnsignedByte();
            var msgId = packet.readUnsignedByte();
            this.dispatch(sysId, msgId, packet);
        };
        Object.defineProperty(GameSocket.prototype, "openDay", {
            //开服天数
            get: function () {
                return this._openDay;
            },
            set: function (openDay) {
                this._openDay = openDay;
            },
            enumerable: true,
            configurable: true
        });
        GameSocket.prototype.getMyRoleInfo = function () {
            var ary = [];
            for (var key in this.myRoleInfo) {
                this.myRoleInfo[key].select = false;
                ary.push(this.myRoleInfo[key]);
            }
            return ary;
        };
        GameSocket.prototype.setMyRoleInfoLevel = function (level) {
            if (this.myRoleInfo[app.LocationProperty.roleId]) {
                this.myRoleInfo[app.LocationProperty.roleId].level = level;
            }
        };
        GameSocket.prototype.setMyRoleInfoZsLevel = function (zsLevel) {
            if (this.myRoleInfo[app.LocationProperty.roleId]) {
                this.myRoleInfo[app.LocationProperty.roleId].zsLevel = zsLevel;
            }
        };
        GameSocket.prototype.setMyRoleInfoGuildName = function (str) {
            if (this.myRoleInfo[app.LocationProperty.roleId]) {
                this.myRoleInfo[app.LocationProperty.roleId].guildName = str;
            }
        };
        GameSocket.prototype.initMyRoleInfo = function () {
            app.ObjectPool.wipe(this.myRoleInfo);
            this.accountId = 0;
            this.selectRolId = 0;
            this.createSign = false;
            this.countNum = -1;
        };
        GameSocket.prototype.setMyRoleInfoName = function (str) {
            if (this.myRoleInfo[app.LocationProperty.roleId]) {
                this.myRoleInfo[app.LocationProperty.roleId].name = str;
            }
        };
        /** 派发协议 */
        GameSocket.prototype.dispatch = function (sysId, msgId, byte) {
            var defaultMgr = egret.getDefinitionByName("app.DefaultMgr");
            if (this._isAddGameApp && defaultMgr) {
                defaultMgr.ins().post_Get(sysId, msgId);
            }
            else {
                if (sysId == 255) {
                    var result = void 0;
                    switch (msgId) {
                        case 1://返回错误
                            var code = byte.readByte();
                            if (this.errorCode[Math.abs(code)]) {
                                if (Main.showTipsPhone) {
                                    Main.showTipsPhone(this.errorCode[Math.abs(code)]);
                                }
                            }
                            else {
                                if (Math.abs(code) == 17) {
                                    if (Main.showTipsPhone) {
                                        Main.showTipsPhone("该账号已被禁止登录！");
                                    }
                                }
                                else if (Math.abs(code) == 18) {
                                    if (Main.showTipsPhone) {
                                        Main.showTipsPhone("当前区服注册已经关闭，请前往新区注册！");
                                    }
                                }
                                else {
                                    if (Main.showTipsPhone) {
                                        Main.showTipsPhone("未知错误:" + code);
                                    }
                                }
                            }
                            return;
                        case 2://下发角色列表
                            this._openDay = byte.readUnsignedInt();
                            var isCreate = byte.readByte();
                            this.accountId = byte.readInt();
                            var count = byte.readByte();
                            if (count) {
                                var info;
                                var banName = ""; //被禁用的角色名
                                for (var i = 0; i < count; i++) {
                                    info = new app.SimplePlayerInfo();
                                    info.read(byte);
                                    if (!this.selectRolId) {
                                        this.selectRolId = info.id;
                                    }
                                    this.myRoleInfo[info.id] = info;
                                }
                                if (this.createSign) {
                                    this.createSign = false;
                                    app.ReportDataMgr.ins().reporting(app.ReportDataEnum.CREATE_ROLE_SUCCESS, {}, {
                                        roleId: info.id, roleName: info.name, level: 0, sex: info.sex,
                                        job: info.job, guildName: info.guildName, zsLevel: 0, serverId: app.LocationProperty.srvid,
                                        serverName: app.LocationProperty.srvname
                                    }, false);
                                    app.ReportDataMgr.ins().reporting(app.ReportDataEnum.UPDATE_LEVEL, {}, {
                                        roleId: info.id, roleName: info.name, level: 1, prelevel: 1, sex: info.sex,
                                        job: info.job, guildName: info.guildName, zsLevel: 0, serverId: app.LocationProperty.srvid,
                                        serverName: app.LocationProperty.srvname
                                    }, false);
                                    if (Main.gameParameter.pfID == 10007 && Main.gameParameter.loginType && gamelib.DeviceUtils.IsNative) {
                                        Main.Native_adJustData({ type: 2 });
                                    }
                                }
                                if (gamelib.DeviceUtils.IsMobile) {
                                    Main.newPhoneLoadingView();
                                }
                                else {
                                    window["newLoadingView"]();
                                }
                            }
                            else {
                                //判断是否禁止注册
                                if (app.LocationProperty.isForbidRegister) {
                                    Main.switchServer();
                                }
                                else {
                                    if (isCreate) {
                                        // window["newCreateView"]();
                                        Main.newCreateView();
                                    }
                                    else {
                                        // window["switchServer"]();
                                        Main.switchServer();
                                    }
                                }
                            }
                            return;
                        case 3://创建角色返回结果
                            var roleId = byte.readInt();
                            result = byte.readByte();
                            if (result) {
                                if (this.errorCode[Math.abs(result)]) {
                                    if (Main.showTipsPhone) {
                                        Main.showTipsPhone(this.errorCode[Math.abs(result)]);
                                    }
                                }
                                else {
                                    if (Main.showTipsPhone) {
                                        Main.showTipsPhone("未知错误:" + result);
                                    }
                                }
                            }
                            else {
                                var bytes = this.getBytes();
                                bytes.writeCmd(255, 3);
                                this.sendToServer(bytes);
                            }
                            return;
                        case 5://随机名称
                            result = byte.readByte();
                            var name_1 = "";
                            if (result == 0) {
                                var sex = byte.readByte();
                                name_1 = byte.readUTF();
                            }
                            if (Main.createRoleView) {
                                Main.createRoleView.setName(name_1);
                            }
                            return;
                    }
                }
            }
            if (!this.PACK_HANDLER[sysId] || !this.PACK_HANDLER[sysId][msgId]) {
                // debug.log("未处理服务器协议：" + sysId + "-" + msgId);
                return;
            }
            // debug.log("处理服务器协议：" + sysId + "-" + msgId);
            var arr = this.PACK_HANDLER[sysId][msgId];
            arr[0].call(arr[1], byte);
        };
        /**
         * 回收bytes对象
         * @param byte
         */
        GameSocket.prototype.recycleByte = function (byte) {
            byte.clear();
            app.ObjectPool.push(byte);
        };
        /**
         * 从对象池获取一个bytes对象
         */
        GameSocket.prototype.getBytes = function () {
            var pack = app.ObjectPool.pop('app.GameByteArray');
            pack.clear();
            // pack.writeUnsignedInt(this._salt);
            pack.writeUnsignedShort(this._salt);
            pack.writeUnsignedInt(this.pid++);
            return pack;
        };
        /**
         * 注册一个服务器发送到客户端的消息处理
         * @param msgId
         * @param fun
         * @param thisObj
         */
        GameSocket.prototype.registerSTCFunc = function (sysId, msgId, fun, sysClass) {
            if (!this.PACK_HANDLER[sysId]) {
                this.PACK_HANDLER[sysId] = [];
            }
            else if (this.PACK_HANDLER[sysId][msgId]) {
                // debug.error(`重复注册协议接口${sysId}-${msgId}`);
                return;
            }
            this.PACK_HANDLER[sysId][msgId] = [fun, sysClass];
        };
        GameSocket.prototype.onClose = function () {
            this.reLogin();
        };
        GameSocket.prototype.showLoading = function () {
            var loadingView = egret.getDefinitionByName("app.LoadingView");
            if (loadingView) {
                loadingView.ins().showLoading();
            }
        };
        GameSocket.prototype.onConnected = function () {
            var loadingView = egret.getDefinitionByName("app.LoadingView");
            if (loadingView) {
                loadingView.ins().hideLoading();
            }
        };
        GameSocket.prototype.sendPack = function (pack) {
            if (pack == null || pack.length == 0) {
                throw new egret.error("创建客户端数据包时数据不能为空！");
            }
            this.socket_.writeBytes(pack);
        };
        /**
         * 连接服务器
         */
        GameSocket.prototype.connectServer = function () {
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.LINK_SERVER, {}, null, false);
            this.login(app.LocationProperty.openID, app.LocationProperty.password, app.LocationProperty.srvid, app.LocationProperty.serverIP, app.LocationProperty.serverPort, app.LocationProperty.originalSrvid);
        };
        GameSocket.prototype.switchConnectServer = function () {
            app.LocationProperty.Param = app.LocationProperty.newestServer;
            //保存最近登陆
            this._user = app.LocationProperty.openID;
            this._pwd = app.LocationProperty.password;
            this._serverId = app.LocationProperty.srvid;
            this._originalSrvid = app.LocationProperty.originalSrvid;
            var ip = app.LocationProperty.serverIP;
            var port = app.LocationProperty.serverPort;
            if (ip.split(":")[1] && ip.split(":")[1].length) {
                port = parseInt(ip.split(":")[1]);
            }
            this._host = ip;
            this._port = port;
            this._isDoTimer = true;
            this.reLogin();
            var httpReq = new egret.HttpRequest();
            httpReq.responseType = egret.HttpResponseType.TEXT;
            httpReq.open(Main.gameParameter.setServiceListdUrl + "?account=" + app.LocationProperty.openID + "&srvid=" + app.LocationProperty.originalSrvid, egret.HttpMethod.GET);
            httpReq.send();
        };
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
        GameSocket.prototype.s_255_4 = function (pName, token, advID, pSex, pJob) {
            if (pSex === void 0) { pSex = 0; }
            if (pJob === void 0) { pJob = 0; }
            // if (!this._count) {
            // this.selectRolId = 0;
            this.createSign = true;
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.CLICK_CREATE_ROLE, {}, {
                uid: app.LocationProperty.openID,
                roleId: 0,
                serverName: app.LocationProperty.srvname
            }, false);
            var bytes = this.getBytes();
            bytes.writeCmd(255, 4);
            bytes.writeString(pName);
            bytes.writeByte(pSex);
            bytes.writeByte(pJob);
            bytes.writeByte(0); //头像
            bytes.writeByte(0); //阵营
            bytes.writeString(""); //运营商渠道
            bytes.writeInt(0); //运营商广告
            this.sendToServer(bytes);
        };
        /**
         * 角色随机名字
         */
        GameSocket.prototype.s_255_6 = function (sex) {
            var bytes = this.getBytes();
            bytes.writeCmd(255, 6);
            bytes.writeByte(sex);
            this.sendToServer(bytes);
        };
        /**
         * 心跳
         */
        GameSocket.prototype.s_255_88 = function () {
            console.log("发送心跳.....");
            var bytes = this.getBytes();
            bytes.writeCmd(255, 88);
            this.sendToServer(bytes);
        };
        GameSocket.prototype.heartbeatPak = function (type) {
            app.TimerManager.ins().remove(this.s_255_88, this);
            if (type) {
                app.TimerManager.ins().doTimer(2000, 0, this.s_255_88, this);
            }
        };
        GameSocket.prototype.logon = function () {
            if (this._socketStatus == GameSocket.STATUS_COMMUNICATION) {
                this._isAddGameApp = true;
                var rolid = this.selectRolId;
                var accountId = this.accountId;
                var defaultMgr = egret.getDefinitionByName("app.DefaultMgr");
                if (defaultMgr) {
                    defaultMgr.ins().s_0_1(accountId, rolid);
                }
                this.heartbeatPak(0);
            }
            else {
                this.reLogin();
            }
        };
        /**
         * 跨服登录
         */
        GameSocket.prototype.KFLogin = function (roleId, serverID, ip, port, originalSrvid) {
            if (originalSrvid === void 0) { originalSrvid = 0; }
            this.close();
            this.newSocket();
            GameSocket.IsCrossService = true;
            this._kFRoleId = roleId;
            this._KFServerId = serverID;
            this._KFOriginalSrvid = originalSrvid;
            if (ip.split(":")[1] && ip.split(":")[1].length)
                port = parseInt(ip.split(":")[1]);
            //开始连接跨服服务器
            this.updateStatus(GameSocket.STATUS_CONNECTING);
            if (window["wx"] || location.protocol.indexOf("https:") != -1) {
                this.socket_.connectByUrl("wss://" + ip + ":" + port);
            }
            else {
                this.socket_.connect(ip, port);
            }
        };
        GameSocket.FIRST_KEY = 0xCA0FFFFF; // 约定的信息头
        // public static DEFAULT_CRC_KEY: number = 0x765D; // 默认包头校验
        // public static HEAD_SIZE: number = 8; // 最小通信封包字节长度
        /**
         * 是否跨服中
         */
        GameSocket.IsCrossService = false;
        /** 连接中 */
        GameSocket.STATUS_CONNECTING = 1;
        /** 检验中 */
        GameSocket.STATUS_CHECKING = 2;
        /** 连接生效 */
        GameSocket.STATUS_COMMUNICATION = 3;
        /** 关闭连接 */
        GameSocket.STATUS_DISCONNECT = 4;
        GameSocket.CLASSNAME = egret.getQualifiedClassName(app.GameByteArray);
        return GameSocket;
    }());
    app.GameSocket = GameSocket;
    __reflect(GameSocket.prototype, "app.GameSocket");
})(app || (app = {}));
/**
 * Created by yangsong on 15-1-26.
 * 键盘工具类
 */
var gamelib;
(function (gamelib) {
    var KeyboardUtils = (function () {
        /**
         * 构造函数
         */
        function KeyboardUtils() {
            this.isInput = false;
            this.key_ups = new Array();
            this.key_downs = new Array();
            if (!gamelib.DeviceUtils.IsMobile) {
                var self_1 = this;
                document.addEventListener("keyup", function (e) {
                    if (self_1.isInput && e["keyCode"] != gamelib.KeyCode.KC_ENTER) {
                        return;
                    }
                    for (var i = 0, len = self_1.key_ups.length; i < len; i++) {
                        if (self_1.key_ups[i]) {
                            var func = self_1.key_ups[i][0];
                            var target = self_1.key_ups[i][1];
                            if (target) {
                                func.call(target, e["keyCode"]);
                            }
                            else {
                                func(e["keyCode"]);
                            }
                        }
                    }
                });
                document.addEventListener("keydown", function (e) {
                    if (self_1.isInput && e["keyCode"] != gamelib.KeyCode.KC_ENTER) {
                        return;
                    }
                    for (var i = 0, len = self_1.key_downs.length; i < len; i++) {
                        if (self_1.key_downs[i]) {
                            var func = self_1.key_downs[i][0];
                            var target = self_1.key_downs[i][1];
                            if (target) {
                                func.call(target, e["keyCode"]);
                            }
                            else {
                                func(e["keyCode"]);
                            }
                        }
                    }
                });
            }
        }
        KeyboardUtils.ins = function () {
            var Class = this;
            if (!Class._instance) {
                Class._instance = new Class();
            }
            return Class._instance;
        };
        /**
         * 添加KeyUp事件
         * @param callback 回调函数
         * @param target 回调函数对应的对象
         */
        KeyboardUtils.prototype.addKeyUp = function (callback, target) {
            this.key_ups.push([callback, target]);
        };
        /**
         * 添加KeyDown事件
         * @param callback 回调函数
         * @param target 回调函数对应的对象
         */
        KeyboardUtils.prototype.addKeyDown = function (callback, target) {
            this.key_downs.push([callback, target]);
        };
        /**
         * 移除KeyUp事件
         * @param callback 回调函数
         * @param target 回调函数对应的对象
         */
        KeyboardUtils.prototype.removeKeyUp = function (callback, target) {
            for (var i = 0; i < this.key_ups.length; i++) {
                if (this.key_ups[i]) {
                    if (this.key_ups[i][0] == callback && this.key_ups[i][1] == target) {
                        this.key_ups.splice(i, 1);
                        i--;
                    }
                }
            }
        };
        /**
         * 移除KeyDown事件
         * @param callback 回调函数
         * @param target 回调函数对应的对象
         */
        KeyboardUtils.prototype.removeKeyDown = function (callback, target) {
            for (var i = 0; i < this.key_downs.length; i++) {
                if (this.key_downs[i][0] == callback && this.key_downs[i][1] == target) {
                    this.key_downs.splice(i, 1);
                    i--;
                }
            }
        };
        return KeyboardUtils;
    }());
    gamelib.KeyboardUtils = KeyboardUtils;
    __reflect(KeyboardUtils.prototype, "gamelib.KeyboardUtils");
})(gamelib || (gamelib = {}));
/**
 * keycode枚举
 * @author Maliu
 */
var gamelib;
(function (gamelib) {
    var KeyCode = (function () {
        function KeyCode() {
        }
        /* 主键盘区的数字 */
        KeyCode.KC_1 = 49;
        KeyCode.KC_2 = 50;
        KeyCode.KC_3 = 51;
        KeyCode.KC_4 = 52;
        KeyCode.KC_5 = 53;
        KeyCode.KC_6 = 54;
        KeyCode.KC_7 = 55;
        KeyCode.KC_8 = 56;
        KeyCode.KC_9 = 57;
        KeyCode.KC_0 = 48;
        /* 字母键 */
        KeyCode.KC_A = 65;
        KeyCode.KC_B = 66;
        KeyCode.KC_C = 67;
        KeyCode.KC_D = 68;
        KeyCode.KC_E = 69;
        KeyCode.KC_F = 70;
        KeyCode.KC_G = 71;
        KeyCode.KC_H = 72;
        KeyCode.KC_I = 73;
        KeyCode.KC_J = 74;
        KeyCode.KC_K = 75;
        KeyCode.KC_L = 76;
        KeyCode.KC_M = 77;
        KeyCode.KC_N = 78;
        KeyCode.KC_O = 79;
        KeyCode.KC_P = 80;
        KeyCode.KC_Q = 81;
        KeyCode.KC_R = 82;
        KeyCode.KC_S = 83;
        KeyCode.KC_T = 84;
        KeyCode.KC_U = 85;
        KeyCode.KC_V = 86;
        KeyCode.KC_W = 87;
        KeyCode.KC_X = 88;
        KeyCode.KC_Y = 89;
        KeyCode.KC_Z = 90;
        /* F功能区 */
        KeyCode.KC_F1 = 112;
        KeyCode.KC_F2 = 113;
        KeyCode.KC_F3 = 114;
        KeyCode.KC_F4 = 115;
        KeyCode.KC_F5 = 116;
        KeyCode.KC_F6 = 117;
        KeyCode.KC_F7 = 118;
        KeyCode.KC_F8 = 119;
        KeyCode.KC_F9 = 120;
        KeyCode.KC_F10 = 121;
        KeyCode.KC_F11 = 122;
        KeyCode.KC_F12 = 123;
        KeyCode.KC_F13 = 124;
        KeyCode.KC_F14 = 125;
        KeyCode.KC_F15 = 126;
        /* 数字小键盘区 */
        KeyCode.KC_NUMPAD_0 = 96;
        KeyCode.KC_NUMPAD_1 = 97;
        KeyCode.KC_NUMPAD_2 = 98;
        KeyCode.KC_NUMPAD_3 = 99;
        KeyCode.KC_NUMPAD_4 = 100;
        KeyCode.KC_NUMPAD_5 = 101;
        KeyCode.KC_NUMPAD_6 = 102;
        KeyCode.KC_NUMPAD_7 = 103;
        KeyCode.KC_NUMPAD_8 = 104;
        KeyCode.KC_NUMPAD_9 = 105;
        KeyCode.KC_NUMPAD_MULTIPLY = 106; //*
        KeyCode.KC_NUMPAD_ADD = 107; //+
        KeyCode.KC_NUMPAD_ENTER = 108; //enter
        KeyCode.KC_NUMPAD_SUBTRACT = 109; //-
        KeyCode.KC_NUMPAD_DECIMAL = 110; //.
        KeyCode.KC_NUMPAD_DIVIDE = 111; ///
        /* 主键盘功能键 */
        KeyCode.KC_BACKSPACE = 8; //backspace 退格键
        KeyCode.KC_TAB = 9; //tab 换行键
        KeyCode.KC_ENTER = 13; //main ENTER 回车键（主键盘区）
        KeyCode.KC_SHIFT = 16; //shift 
        KeyCode.KC_Alt = 18; //alt 
        KeyCode.KC_CONTROL = 17; //ctrl
        KeyCode.KC_ESCAPE = 27; //esc
        KeyCode.KC_SPACE = 32; //space 空格键
        KeyCode.KC_WINDOWS = 91; //windows
        KeyCode.KC_MENU = 93; //menu
        /* 三个锁定键 */
        KeyCode.KC_CAPS_LOCK = 20; //caps lock
        KeyCode.KC_NUM_LOCK = 144; //num lock
        KeyCode.KC_SCROLL_LOCK = 145; //scroll lock
        /* 功能键 */
        KeyCode.KC_PAUSE = 19; //pause / break
        KeyCode.KC_PAGE_UP = 33; //page up
        KeyCode.KC_PAGE_DOWN = 34; //page down
        KeyCode.KC_END = 35; //end
        KeyCode.KC_HOME = 36; //home
        KeyCode.KC_INSERT = 45; //insert
        KeyCode.KC_DELETE = 46; //delete
        /* 方向键 */
        KeyCode.KC_LEFT = 37; //left arrow
        KeyCode.KC_UP = 38; //up arrow
        KeyCode.KC_RIGHT = 39; //right arrow
        KeyCode.KC_DOWN = 40; //down arrow
        /* 标点符号 */
        KeyCode.KC_SEMICOLON_COLON = 186; //;:
        KeyCode.KC_EQUAL_PLUS = 187; //=+
        KeyCode.KC_MINUS_UNDERLINE = 189; //-_
        KeyCode.KC_SLASH_QUESTIONMARK = 191; // /?
        KeyCode.KC_SPECIALCOMMA_EARTHWORM = 192; //`~
        KeyCode.KC_LEFT_BRACKET_BRACE = 219; //[{
        KeyCode.KC_BACKSLASH_VERTICALBAR = 220; //\|
        KeyCode.KC_RIGHT_BRACKET_BRACE = 221; //]}
        KeyCode.KC_QUOTE = 222; //'"
        KeyCode.KC_COMMA = 188; //,<
        KeyCode.KC_PERIOD = 190; //.>
        return KeyCode;
    }());
    gamelib.KeyCode = KeyCode;
    __reflect(KeyCode.prototype, "gamelib.KeyCode");
})(gamelib || (gamelib = {}));
var gamelib;
(function (gamelib) {
    var os = (function () {
        function os() {
        }
        /** 启动库 */
        os.startUp = function () {
            gamelib.FixUtil.fixAll();
            os.RM = gamelib.ResourceManager.ins();
            os.KeyBoard = gamelib.KeyboardUtils.ins();
        };
        return os;
    }());
    gamelib.os = os;
    __reflect(os.prototype, "gamelib.os");
})(gamelib || (gamelib = {}));
var app;
(function (app) {
    var ListButton = (function (_super) {
        __extends(ListButton, _super);
        function ListButton() {
            var _this = _super.call(this) || this;
            var exml = "\n        <e:Skin class=\"MainLoginListBtnSkin\" xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" >\n\t<e:Image source=\"login_yeqian_1\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t<e:Image source=\"login_yeqian_2\" visible.down=\"false\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t<e:Label id=\"bgText\" text=\"\u6700\u8FD1\u767B\u5F55\" size=\"20\" horizontalCenter=\"0\" verticalCenter=\"-1\" stroke=\"2\" textColor=\"0xe5ddcf\"/>\n</e:Skin>\n        ";
            EXML.parse(exml);
            _this.skinName = "MainLoginListBtnSkin";
            return _this;
        }
        ListButton.prototype.dataChanged = function () {
            // if (this.dataInfo == null) {
            //     this.width = 190;
            //     this.height = 59;
            //     this.bgImg = new eui.Image("login_yeqian_1");
            //     this.addChild(this.bgImg);
            //     this.bgText = new eui.Label();
            //     this.bgText.size = 22;
            //     this.bgText.bold = true;
            //     this.bgText.stroke = 1;
            //     this.bgText.strokeColor = 0x000000;
            //     this.bgText.horizontalCenter = 0;
            //     this.bgText.verticalCenter = -2;
            //     this.bgText.textColor = 0xffffff;
            //     this.addChild(this.bgText);
            // }
            this.dataInfo = this.data;
            if (this.data['isSelect'] == 0) {
                // this.bgImg.source = "login_yeqian_2";
                this.bgText.textColor = 0xeedfcd;
            }
            else {
                // this.bgImg.source = "login_yeqian_1";
                this.bgText.textColor = 0xffffff;
            }
            this.bgText.text = this.dataInfo['name'];
        };
        return ListButton;
    }(eui.ItemRenderer));
    app.ListButton = ListButton;
    __reflect(ListButton.prototype, "app.ListButton");
})(app || (app = {}));
var app;
(function (app) {
    var LocationProperty = (function () {
        function LocationProperty() {
        }
        LocationProperty.init = function () {
            // this.urlParam = {};
            // let str: string = window['paraUrl'];
            // if (str) {
            // 	let whIndex: number = str.indexOf("?");
            // 	if (whIndex != -1) {
            // 		let param: string[] = str.slice(whIndex + 1).split("&");
            // 		let strArr: string[];
            // 		for (let i: number = 0; i < param.length; i++) {
            // 			strArr = param[i].split("=");
            // 			this.urlParam[strArr[0]] = strArr[1];
            // 		}
            // 	}
            // }
        };
        Object.defineProperty(LocationProperty, "Param", {
            set: function (param) {
                if (param) {
                    this.urlParam = param;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "newestServer", {
            get: function () {
                return this._newestServer;
            },
            set: function (param) {
                this._newestServer = param;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "recommendServer", {
            get: function () {
                return this._recommendServer;
            },
            set: function (param) {
                this._recommendServer = param;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "resAdd", {
            get: function () {
                return this.urlParam['hosts'] || "";
                // return "http://192.168.201.191:8081/"
            },
            set: function (str) {
                this.urlParam['hosts'] = str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "openID", {
            get: function () {
                return this.urlParam['user'] + "";
            },
            set: function (str) {
                this.urlParam['user'] = str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "srvid", {
            get: function () {
                return parseInt(this.urlParam['srvid']);
            },
            set: function (v) {
                this.urlParam['srvid'] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "originalSrvid", {
            get: function () {
                return parseInt(this.urlParam['originalSrvid'] || this.urlParam['srvid']);
            },
            set: function (v) {
                this.urlParam['originalSrvid'] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "srvname", {
            get: function () {
                return this.urlParam['serverName'] || this.srvid + "";
            },
            set: function (str) {
                this.urlParam['serverName'] = str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "serverAlias", {
            get: function () {
                return this.urlParam['serverAlias'] || this.srvid + "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "serverIP", {
            get: function () {
                return this.urlParam['srvaddr'];
            },
            set: function (str) {
                this.urlParam['srvaddr'] = str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "serverPort", {
            get: function () {
                return this.urlParam['srvport'] || 9001;
            },
            set: function (v) {
                this.urlParam['srvport'] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "roleId", {
            get: function () {
                return this.urlParam['roleId'];
            },
            set: function (v) {
                this.urlParam['roleId'] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "password", {
            get: function () {
                return this.urlParam['spverify'] || "e10adc3949ba59abbe56e057f20f883e";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "openKey", {
            get: function () {
                return this.urlParam['openkey'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "zoneId", {
            /** //安卓：1， iOS：2 */
            get: function () {
                return this.urlParam['zoneid'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "serverID", {
            //srvid和服后的id
            //serverid和服前的id
            get: function () {
                return this.urlParam['serverid'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "ID", {
            /**
             *序号id
             */
            get: function () {
                return this.urlParam['ID'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "appid", {
            get: function () {
                return this.urlParam['appid'] || "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "app_openid", {
            get: function () {
                return this.urlParam['app_openid'] || "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "isSubscribe", {
            get: function () {
                return this.urlParam['isSubscribe'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "nickName", {
            get: function () {
                var str = this.urlParam['nickName'] || "";
                try {
                    return str.length ? decodeURIComponent(str) : str;
                }
                catch (e) {
                    return str;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "callUrl", {
            get: function () {
                var str = this.urlParam['callUrl'] || "";
                return str.length ? decodeURIComponent(str) : str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "gifi", {
            get: function () {
                return this.urlParam['gifi'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "roleCount", {
            get: function () {
                return parseInt(this.urlParam['roleCount']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "isnew", {
            get: function () {
                return parseInt(this.urlParam['isnew']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "login_ip", {
            get: function () {
                return this.urlParam['login_ip'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "is_attention", {
            get: function () {
                return this.urlParam['is_attention'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "isShowShare", {
            get: function () {
                return window['isShowShare'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "v", {
            get: function () {
                return parseInt(this.urlParam['v']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "isYelloVip", {
            get: function () {
                return parseInt(this.urlParam['isYelloVip']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "isYelloYearVip", {
            get: function () {
                return parseInt(this.urlParam['isYelloYearVip']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "yelloVipLevel", {
            get: function () {
                return parseInt(this.urlParam['yelloVipLevel']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "isYelloHighVip", {
            get: function () {
                return parseInt(this.urlParam['isYelloHighVip']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "logurl", {
            get: function () {
                return decodeURIComponent(this.urlParam['logurl']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "isFirstLoad", {
            get: function () {
                return !LocationProperty.isLocation && LocationProperty.roleCount == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "loadurl", {
            get: function () {
                return decodeURIComponent(this.urlParam['loadurl']);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "pfid", {
            get: function () {
                return this.urlParam['pfid'] || "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "pf", {
            get: function () {
                return this.urlParam['pf'] || "";
            },
            enumerable: true,
            configurable: true
        });
        LocationProperty.isCanLogin = function () {
            return this.openID != null &&
                this.password != null &&
                this.srvid != null &&
                this.serverIP != null &&
                this.serverPort != null;
        };
        Object.defineProperty(LocationProperty, "isForbidRegister", {
            get: function () {
                return +this.urlParam['isForbidRegister'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocationProperty, "isLocation", {
            /**
             * 是否内网
             */
            get: function () {
                return location.href.indexOf("192.168.201") >= 0
                    || location.href.indexOf("127.0.0.1") >= 0
                    || location.href.indexOf("localhost") >= 0
                    || location.href.indexOf("cq.api.com") >= 0
                    || location.href.indexOf("10.10.1") >= 0
                    || location.href.indexOf("10.10.4") >= 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置加载进度 & 描述
         */
        LocationProperty.setLoadProgress = function (n, str) {
            Main.phoneLoadingView.showLoadProgress(n, str);
            // callJsFunction({type:"showLoadProgress",progress:n, des:str});
        };
        LocationProperty.urlParam = {};
        return LocationProperty;
    }());
    app.LocationProperty = LocationProperty;
    __reflect(LocationProperty.prototype, "app.LocationProperty");
    /**
     * 分享成功返回
     */
    function shareCallback() {
        // UserTips.ins().showTips(LanguageUtils.language_Error_tips_6);
        // PfActivity.ins().sendWeiXinInviteGift();
        // ViewManager.ins().close(YqWin);
    }
    /**
     * 是否关注 -1关闭 0未关注 1已关注
     * @param code
     */
    function isFocusCallback(code) {
        // PfActivity.ins().postGuanZhu(+code);
    }
    /**
     * 是否开启分享 -1关闭 其他开启
     * @param code
     */
    function isShareCallback(code) {
        // PfActivity.ins().postShare(+code);
    }
})(app || (app = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.log("手机版本:进入主界面");
        Main.main_instance = this;
        Main.gameParameter = new app.GameParameter();
        if (gamelib.DeviceUtils.IsMobile) {
            window["phoneSwitchAccountSuccess"] = this.phoneSwitchAccountSuccess.bind(this);
            window["phoneLogout"] = this.phoneLogout.bind(this);
            window["createH5ServerView"] = this.createH5ServerView.bind(this);
            if (gamelib.DeviceUtils.IsHtml5) {
                Main.gameParameter.userInfo = {};
                Main.gameParameter.loginType = window['loginType'];
                Main.gameParameter.gameLogo = window['gameLogo'];
                Main.gameParameter.game = window['game'];
                Main.gameParameter.pf = window['pf'];
                Main.gameParameter.pfID = window['pfID'];
                Main.gameParameter.serviceListdUrl = window['serviceListdUrl'];
                Main.gameParameter.setServiceListdUrl = window['setServiceListdUrl'];
                Main.gameParameter.isReport = window['isReport'];
                Main.gameParameter.isReportPF = window['isReportPF'];
                Main.gameParameter.isDisablePay = window['isDisablePay'];
                Main.gameParameter.reportURL = window['reportUrl'];
                Main.gameParameter.payUrl = window['payUrl'];
                Main.gameParameter.reportURLPF = window['reportURLPF'];
                Main.gameParameter.orderUrl = window["orderUrl"];
                Main.gameParameter.payNotice = window["payNotice"];
                Main.gameParameter.gameLoadImg = window["gameLoadImg"];
                Main.gameParameter.gameLoginImg = window["gameLoginImg"];
                Main.gameParameter.gongGaoUrl = window["gongGaoUrl"];
                Main.gameParameter.isShowGongGao = window["isShowGongGao"];
                Main.gameParameter.isAutoShowGongGao = window["isAutoShowGongGao"];
                Main.gameParameter.userInfo = window['userInfo'];
                Main.gameParameter.publicRes = window['publicRes'];
                if (Main.gameParameter.publicRes && Main.gameParameter.publicRes != "") {
                    ResDirEnum.RES_DIR = Main.gameParameter.publicRes + ResDirEnum.RES_DIR;
                    ResDirEnum.MAP_DIR = Main.gameParameter.publicRes + ResDirEnum.MAP_DIR;
                    ResDirEnum.Init();
                }
            }
            else {
                this.setExternalInterfaces();
                ResDirEnum.RES_DIR = ResDirEnum.RES_DIR_Android;
                ResDirEnum.MAP_DIR = ResDirEnum.MAP_DIR_Android;
                ResDirEnum.RES_DIR_BLOOD = ResDirEnum.RES_DIR + "blood/";
                ResDirEnum.RES_DIR_BODY = ResDirEnum.RES_DIR + "body/";
                ResDirEnum.RES_DIR_BODY_SUIT = ResDirEnum.RES_DIR + "bodysuit/";
                ResDirEnum.RES_DIR_BODY_EFF = ResDirEnum.RES_DIR + "bodyeff/";
                ResDirEnum.RES_DIR_EFF = ResDirEnum.RES_DIR + "eff/";
                ResDirEnum.RES_DIR_WIMGEFF = ResDirEnum.RES_DIR + "weaponimgeff/";
                ResDirEnum.RES_DIR_TITLE = ResDirEnum.RES_DIR + "title/";
                ResDirEnum.RES_DIR_MONSTER = ResDirEnum.RES_DIR + "monster/";
                ResDirEnum.RES_DIR_SKILL = ResDirEnum.RES_DIR + "skill/";
                ResDirEnum.RES_DIR_WEAPON = ResDirEnum.RES_DIR + "weapon/";
                ResDirEnum.RES_DIR_WEAPONEFF = ResDirEnum.RES_DIR + "weaponeff/";
                ResDirEnum.RES_DIR_HAIR = ResDirEnum.RES_DIR + "hair/";
                ResDirEnum.RES_DIR_TELEPORT = ResDirEnum.RES_DIR + "teleport/";
                ResDirEnum.RES_DIR_NPC = ResDirEnum.RES_DIR + "npc/";
                ResDirEnum.RES_DIR_CREATE = ResDirEnum.RES_DIR + "create/";
                ResDirEnum.RES_DIR_WORSHIP = ResDirEnum.RES_DIR + "Worship/";
                ResDirEnum.RES_DIR_PET = ResDirEnum.RES_DIR + "pet/";
                ResDirEnum.RES_DIR_PETEXTERIOR = ResDirEnum.RES_DIR + "petexterior/";
                //资源地址打印
                console.log("res:" + ResDirEnum.RES_DIR);
                console.log("map:" + ResDirEnum.MAP_DIR);
                //1.初始化数据，游戏的url地址，账号下信息
                Main.gameParameter.userInfo = {};
                if (true) {
                    Main.gameParameter.pfID = 0;
                }
                else {
                    Main.gameParameter.pfID = window['phonepfId'];
                    if (window['gameAppVersion']) {
                        Main.gameParameter.gameAppVersion = window['gameAppVersion'];
                    }
                }
                if (Main.gameParameter.pfID == 10007) {
                    window['isTraditional'] = true;
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO4";
                    Main.gameParameter.game = "DDCQ";
                    Main.gameParameter.reportURL = "https://bxcqpush.freetop1.com";
                    Main.gameParameter.reportURLPF = "https://bxcqpush.freetop1.com/lcelnow/role.php";
                    Main.gameParameter.pf = "F1";
                    Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.serviceListdUrl = "https://devops.freetop1.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://devops.freetop1.com/Service/GetServerList.php";
                    Main.gameParameter.gongGaoUrl = "https://bxcqht.freetop1.com/lcelnow/select/find-notice"; //公告Url
                    // Main.gameParameter.checkUrl = "https://bxcqpush.freetop1.com/lcelnow/login.php";
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10003) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "lOG_Honghu";
                    Main.gameParameter.game = "DDCQ";
                    Main.gameParameter.reportURL = "https://bxcqpush.191game.com";
                    Main.gameParameter.pf = "honghu";
                    Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.serviceListdUrl = "https://devops.191game.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://devops.191game.com/Service/GetServerList.php";
                    // Main.gameParameter.checkUrl = "https://bxcqpush.191game.com/login-redfox.php";
                    Main.gameParameter.gongGaoUrl = "https://bxcqht.191game.com/redfox/select/find-notice?platform=honghu"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = false;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10010) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.pf = "gameCat";
                    //测试服
                    // Main.gameParameter.loginType = false;
                    // Main.gameParameter.pf = "gameCattest";
                    Main.gameParameter.gameLoadImg = "loadingGameCat";
                    Main.gameParameter.gameLoginImg = "loginGameCat";
                    // Main.gameParameter.gameLogo = "";
                    Main.gameParameter.game = "DDCQ";
                    Main.gameParameter.reportURL = "https://fireguildpush.bigrnet.com";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.serviceListdUrl = "https://fireguilddevops.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://fireguilddevops.bigrnet.com/Service/GetServerList.php";
                    // Main.gameParameter.orderUrl = "https://fireguildht.bigrnet.com/gamecat/order/index";//订单URL
                    Main.gameParameter.orderUrl = "https://fireguilddevops.bigrnet.com/order/order.php";
                    Main.gameParameter.payNotice = "https://fireguildht.bigrnet.com/gamecat/order/notice";
                    Main.gameParameter.checkUrl = "https://fireguildht.bigrnet.com/gamecat/user";
                    Main.gameParameter.gongGaoUrl = "https://fireguildht.bigrnet.com/gamecat/select/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10024) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.pf = "gamecatnztl";
                    //测试服
                    // Main.gameParameter.loginType = false;
                    // Main.gameParameter.pf = "gameCattest";
                    Main.gameParameter.gameLoadImg = "loadingGameCat";
                    Main.gameParameter.gameLoginImg = "loginGameCat";
                    Main.gameParameter.game = "DDCQ";
                    Main.gameParameter.reportURL = "http://yxmreport.bigrnet.com/";
                    Main.gameParameter.serviceListdUrl = "https://yxmrepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://yxmrepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://yxmrepeat.bigrnet.com/order/order.php";
                    Main.gameParameter.payNotice = "https://yxmht.bigrnet.com/gamecatnztl/order/notice";
                    Main.gameParameter.checkUrl = "https://yxmht.bigrnet.com/gamecatnztl/user/index";
                    Main.gameParameter.gongGaoUrl = "https://yxmht.bigrnet.com/gamecatnztl/select/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10011) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "";
                    Main.gameParameter.game = "huowu";
                    Main.gameParameter.reportURL = "https://huowuupload.bigrnet.com/";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "huowu";
                    Main.gameParameter.serviceListdUrl = "https://huowuzhuanfa.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://huowuzhuanfa.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://huowuht.bigrnet.com/mai/order"; //订单URL
                    Main.gameParameter.payNotice = "https://huowuht.bigrnet.com/mai/order/notice";
                    Main.gameParameter.checkUrl = "https://huowuht.bigrnet.com/mai/user";
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                    Main.gameParameter.gongGaoUrl = "https://huowuht.bigrnet.com/mai/select/find-notices"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                }
                else if (Main.gameParameter.pfID == 10012) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO12";
                    Main.gameParameter.gameLoginImg = "mp_xfjm_nztl";
                    Main.gameParameter.game = "DDCQ";
                    Main.gameParameter.reportURL = "https://newupload.bigrnet.com";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "quickbt";
                    Main.gameParameter.serviceListdUrl = "https://newzhuanfa.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://newzhuanfa.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://newhoutai.bigrnet.com/quick/order/index"; //订单URL
                    Main.gameParameter.payNotice = "https://newhoutai.bigrnet.com/quick/order/notice";
                    Main.gameParameter.checkUrl = "https://newhoutai.bigrnet.com/quick/user/index";
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                    Main.gameParameter.gongGaoUrl = "https://newhoutai.bigrnet.com/quick/user/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                }
                else if (Main.gameParameter.pfID == 10013) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO6";
                    Main.gameParameter.game = "DDCQ";
                    Main.gameParameter.reportURL = "https://suhaiupload.bigrnet.com/";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "suhai";
                    Main.gameParameter.serviceListdUrl = "https://suhaizhuanfa.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://suhaizhuanfa.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://suhaiht.bigrnet.com/suhai/order/index"; //订单URL
                    // Main.gameParameter.payNotice = "https://newhoutai.bigrnet.com/quick/order/notice";
                    // Main.gameParameter.checkUrl = "https://newhoutai.bigrnet.com/quick/user/index";
                    Main.gameParameter.gongGaoUrl = "https://suhaiht.bigrnet.com/suhai/select/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10025) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO7";
                    Main.gameParameter.game = "gametd";
                    Main.gameParameter.gameLoadImg = "tdloadimg";
                    Main.gameParameter.gameLoginImg = "tdlogin";
                    Main.gameParameter.reportURL = "https://tudoureport.bigrnet.com/";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "gametd";
                    Main.gameParameter.serviceListdUrl = "https://tudourepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://tudourepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://tudouht.bigrnet.com/tudou/order/index"; //订单URL
                    Main.gameParameter.payNotice = "https://tudouht.bigrnet.com/tudou/order/exchange";
                    Main.gameParameter.checkUrl = "https://tudouht.bigrnet.com/tudou/user/login";
                    Main.gameParameter.gongGaoUrl = "https://tudouht.bigrnet.com/tudou/user/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10029) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO8";
                    Main.gameParameter.game = "potatobxsc";
                    Main.gameParameter.gameLoadImg = "tdbxscloadimg";
                    Main.gameParameter.gameLoginImg = "tdbxscloginimg";
                    Main.gameParameter.reportURL = "https://tudoureport.bigrnet.com/";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "potatobxsc";
                    Main.gameParameter.serviceListdUrl = "https://tudourepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://tudourepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://tudouht.bigrnet.com/tudoup/order/index"; //订单URL
                    Main.gameParameter.checkUrl = "https://tudouht.bigrnet.com/tudoup/user/login";
                    Main.gameParameter.gongGaoUrl = "https://tudouht.bigrnet.com/tudoup/user/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10035) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO10";
                    Main.gameParameter.game = "xiaoqi";
                    window['verification'] = "https://xiaoqiht.bigrnet.com/xiaoqi/send/check-chat";
                    // Main.gameParameter.gameLoadImg = "tdbyloadimg";
                    // Main.gameParameter.gameLoginImg = "tdlogin";
                    Main.gameParameter.reportURL = "https://xiaoqireport.bigrnet.com/";
                    Main.gameParameter.payUrl = "https://xiaoqiht.bigrnet.com/xiaoqi/order/get-sign";
                    Main.gameParameter.pf = "xiaoqi";
                    Main.gameParameter.serviceListdUrl = "https://xiaoqirepeat.bigrnet.com//Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://xiaoqirepeat.bigrnet.com//Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://xiaoqiht.bigrnet.com/xiaoqi/order/index"; //订单URL
                    Main.gameParameter.checkUrl = "https://xiaoqiht.bigrnet.com/xiaoqi/user/user-login";
                    Main.gameParameter.gongGaoUrl = "https://xiaoqiht.bigrnet.com/xiaoqi/user/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10038) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO9";
                    Main.gameParameter.game = "potatoby";
                    Main.gameParameter.gameLoadImg = "tdbyloadimg";
                    Main.gameParameter.gameLoginImg = "tdlogin";
                    Main.gameParameter.reportURL = "https://tdbayereport.bigrnet.com/";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "potatoby";
                    Main.gameParameter.serviceListdUrl = "https://tdbayerepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://tdbayerepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://tdbayeht.bigrnet.com/tudouthree/order/index"; //订单URL
                    Main.gameParameter.payNotice = "https://tdbayeht.bigrnet.com/tudouthree/order/exchange";
                    Main.gameParameter.checkUrl = "https://tdbayeht.bigrnet.com/tudouthree/user/login";
                    Main.gameParameter.gongGaoUrl = "https://tdbayeht.bigrnet.com/tudouthree/user/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10039) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO11";
                    Main.gameParameter.game = "potatoxlby";
                    Main.gameParameter.gameLoadImg = "tdxlbyloadimg";
                    Main.gameParameter.gameLoginImg = "tdbxscloginimg";
                    Main.gameParameter.reportURL = "https://tdbayereport.bigrnet.com/";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "potatoxlby";
                    Main.gameParameter.serviceListdUrl = "https://tdbayerepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://tdbayerepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://tdbayeht.bigrnet.com/tudoushunhuo/order/index"; //订单URL
                    Main.gameParameter.payNotice = "https://tdbayeht.bigrnet.com/tudoushunhuo/order/exchange";
                    Main.gameParameter.checkUrl = "https://tdbayeht.bigrnet.com/tudoushunhuo/user/login";
                    Main.gameParameter.gongGaoUrl = "https://tdbayeht.bigrnet.com/tudoushunhuo/user/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else if (Main.gameParameter.pfID == 10041) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "";
                    Main.gameParameter.game = "shengma";
                    // Main.gameParameter.gameLoadImg = "tdxlbyloadimg";
                    Main.gameParameter.gameLoginImg = "mp_xfjm_nztl";
                    Main.gameParameter.reportURL = "http://yxmreport.bigrnet.com/";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "shengma";
                    Main.gameParameter.serviceListdUrl = "https://yxmrepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://yxmrepeat.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://yxmht.bigrnet.com/shengma/order/index"; //订单URL
                    Main.gameParameter.payNotice = "https://yxmht.bigrnet.com/shengma/order/notice";
                    Main.gameParameter.checkUrl = "https://yxmht.bigrnet.com/shengma/user/index";
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                    Main.gameParameter.gongGaoUrl = "https://yxmht.bigrnet.com/shengma/user/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                }
                else if (Main.gameParameter.pfID == 10046) {
                    Main.gameParameter.loginType = true;
                    Main.gameParameter.gameLogo = "LOGO13";
                    Main.gameParameter.game = "huoyan";
                    // Main.gameParameter.gameLoadImg = "tdxlbyloadimg";
                    Main.gameParameter.gameLoginImg = "mp_xfjm_nztl";
                    Main.gameParameter.reportURL = "https://suhaiupload.bigrnet.com/";
                    // Main.gameParameter.payUrl = "https://bxcqht.freetop1.com/lcelnow/notice/getsign";
                    Main.gameParameter.pf = "huoyan";
                    Main.gameParameter.serviceListdUrl = "https://suhaizhuanfa.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "https://suhaizhuanfa.bigrnet.com/Service/GetServerList.php";
                    Main.gameParameter.orderUrl = "https://suhaiht.bigrnet.com/huoyan/order/index"; //订单URL
                    // Main.gameParameter.payNotice = "https://tdbayeht.bigrnet.com/tudoushunhuo/order/exchange";
                    Main.gameParameter.checkUrl = "https://suhaiht.bigrnet.com/huoyan/user/index";
                    Main.gameParameter.gongGaoUrl = "https://suhaiht.bigrnet.com/huoyan/select/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isReport = true;
                    Main.gameParameter.isReportPF = true;
                    Main.gameParameter.isDisablePay = false;
                }
                else {
                    Main.gameParameter.loginType = false;
                    Main.gameParameter.gameLogo = "LOGO3";
                    Main.gameParameter.game = "test";
                    Main.gameParameter.pf = "interflowtest";
                    Main.gameParameter.serviceListdUrl = "http://fgtest.bigrnet.com/H5CQ/develop/Service/GetServerList.php";
                    Main.gameParameter.setServiceListdUrl = "http://fgtest.bigrnet.com/H5CQ/develop/Service/GetServerList.php";
                    Main.gameParameter.isReport = false;
                    Main.gameParameter.isReportPF = false;
                    Main.gameParameter.gongGaoUrl = "http://fugametestht.bigrnet.com/test/select/find-notice"; //公告Url
                    Main.gameParameter.isShowGongGao = true;
                    Main.gameParameter.isAutoShowGongGao = true;
                    Main.gameParameter.isDisablePay = false;
                }
            }
        }
        else {
            // window['showGame'] = this.remLogin.bind(this);
            window["onLogoutPC"] = this.onLogoutPC.bind(this);
            window["logoutPCInfo"] = this.logoutPCInfo.bind(this);
            window["newLoadingView"] = this.newLoadingView.bind(this);
            //1.初始化数据，游戏的url地址，账号下信息
            Main.gameParameter.loginType = window['loginType'];
            Main.gameParameter.gameLogo = window['gameLogo'];
            Main.gameParameter.game = window['game'];
            Main.gameParameter.pf = window['pf'];
            Main.gameParameter.pfID = window['pfID'];
            Main.gameParameter.serviceListdUrl = window['serviceListdUrl'];
            Main.gameParameter.setServiceListdUrl = window['setServiceListdUrl'];
            Main.gameParameter.isReport = window['isReport'];
            Main.gameParameter.isReportPF = window['isReportPF'];
            Main.gameParameter.isDisablePay = window['isDisablePay'];
            Main.gameParameter.reportURL = window['reportUrl'];
            Main.gameParameter.reportURLPF = window['reportURLPF'];
            Main.gameParameter.payUrl = window['payUrl'];
            Main.gameParameter.orderUrl = window["orderUrl"];
            Main.gameParameter.payNotice = window["payNotice"];
            Main.gameParameter.gameLoadImg = window["gameLoadImg"];
            Main.gameParameter.gameLoginImg = window["gameLoginImg"];
            Main.gameParameter.gongGaoUrl = window["gongGaoUrl"];
            Main.gameParameter.isShowGongGao = window["isShowGongGao"];
            Main.gameParameter.isAutoShowGongGao = window["isAutoShowGongGao"];
            Main.gameParameter.publicRes = window['publicRes'];
            if (Main.gameParameter.publicRes && Main.gameParameter.publicRes != "") {
                ResDirEnum.RES_DIR = Main.gameParameter.publicRes + ResDirEnum.RES_DIR;
                ResDirEnum.MAP_DIR = Main.gameParameter.publicRes + ResDirEnum.MAP_DIR;
                ResDirEnum.Init();
            }
            /****** 测试------------------------------- */
            // Main.gameParameter.loginType = false;
            // Main.gameParameter.gameLogo = "LOGO3";
            // Main.gameParameter.game = "DDCQ";
            // Main.gameParameter.pf = "test";
            // Main.gameParameter.pfID = 10004;
            // Main.gameParameter.serviceListdUrl = "http://fgtest.bigrnet.com/H5CQ/develop/Service/GetServerList.php";
            // Main.gameParameter.setServiceListdUrl = "http://fgtest.bigrnet.com/H5CQ/develop/Service/GetServerList.php";
            // Main.gameParameter.isReport = false;
            // Main.gameParameter.isReportPF = false;
            // Main.gameParameter.isDisablePay = false;
            // window['userInfo'] = { uid: "121371", server: "h8" };
            /************* ------------------------------------ */
            Main.gameParameter.userInfo = window['userInfo'];
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onViewResize, this);
            this.onViewResize();
        }
        app.ReportDataMgr.ins().reporting(app.ReportDataEnum.LOGIN_VIEW, {}, null, false);
        //设置跨域访问资源
        egret.ImageLoader.crossOrigin = "anonymous";
        // egret.TextField.default_fontFamily = "SimHei";
        // window['reqEnterGameFunction'] = this.reqEnterGame.bind(this);
        // egret.TextField.default_fontFamily = window['fontFamily'];
        // RES.setMaxLoadingThread(8);
        // RES.setMaxRetryTimes(6);
        //inject the custom material parser
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        if (!true) {
            if (!gamelib.DeviceUtils.IsNative) {
                ResDirEnum.RES_RESOURCE = ResDirEnum.RES_RESPUBLISH;
                if (document.getElementById('egret-fps-panel')) {
                    document.getElementById('egret-fps-panel').style.visibility = "hidden";
                }
            }
        }
        Main.tipsLab = new eui.Label();
        Main.tipsLab.size = 23;
        Main.tipsLab.textColor = 0xffffff;
        Main.tipsLab.touchEnabled = false;
        Main.tipsLab.stroke = 1;
        Main.tipsLab.strokeColor = 0x000000;
        // this.addChildAt(Main.tipsLab, 100);
        gamelib.os.startUp();
        gamelib.os.RM.resResource = ResDirEnum.RES_RESOURCE;
        gamelib.os.RM.resMovieClip = ResDirEnum.RES_DIR;
        if (window['phoneH5']) {
            this.runGamePhoneH5().catch(function (e) {
                console.log(e);
            });
        }
        else if (gamelib.DeviceUtils.IsMobile) {
            if (gamelib.DeviceUtils.IsNative) {
                this.runGamePhone().catch(function (e) {
                    console.log(e);
                });
            }
            else {
                this.runGamePhone().catch(function (e) {
                    console.log(e);
                });
            }
        }
        else {
            this.runGame().catch(function (e) {
                console.log(e);
            });
        }
    };
    Main.showGongGaoView = function () {
        if (!Main.gongGaoView) {
            Main.gongGaoView = new app.MainGongGaoWin();
            Main.main_instance.addChild(Main.gongGaoView);
        }
    };
    Main.showAgeoView = function () {
        if (!Main.ageView) {
            Main.ageView = new app.AgeWin();
            Main.main_instance.addChild(Main.ageView);
        }
    };
    //游戏猫--没有区服列表的时候 需要弹窗
    Main.startServerTips = function (value) {
        var startServerTipsView = new app.MainStartServerTipsView();
        startServerTipsView.setTipsLab(value);
        Main.main_instance.addChild(startServerTipsView);
    };
    /**手机版H5退出 */
    Main.prototype.phoneLogout = function () {
        Main.onLogout("");
    };
    /**quick手机版切换账号成功 */
    Main.prototype.phoneSwitchAccountSuccess = function () {
        Main.copyUerInfo();
        //关掉所有界面，断开网络连接
        var gSocket = egret.getDefinitionByName("app.GameSocket");
        if (gSocket) {
            gSocket.ins().isDoTimer = false;
            gSocket.ins().isAddGameApp = false;
            gSocket.ins().logoutClose();
        }
        var dMgr = egret.getDefinitionByName("app.DefaultMgr");
        if (dMgr) {
            dMgr.ins().clearMap();
        }
        var sceneMgr = egret.getDefinitionByName("app.SceneManager");
        if (sceneMgr) {
            sceneMgr.ins().clear();
        }
        if (Main.phoneLoadingView) {
            Main.phoneLoadingView.removeView();
            Main.phoneLoadingView = null;
        }
        Main.createServerView();
    };
    /**
     * 登出
     */
    Main.onLogout = function (info) {
        Main.gameParameter.userInfo = {};
        //关掉所有界面，断开网络连接
        var gSocket = egret.getDefinitionByName("app.GameSocket");
        if (gSocket) {
            gSocket.ins().isDoTimer = false;
            gSocket.ins().isAddGameApp = false;
            gSocket.ins().logoutClose();
        }
        var dMgr = egret.getDefinitionByName("app.DefaultMgr");
        if (dMgr) {
            dMgr.ins().clearMap();
        }
        var sceneMgr = egret.getDefinitionByName("app.SceneManager");
        if (sceneMgr) {
            sceneMgr.ins().clear();
        }
        if (Main.phoneLoadingView) {
            Main.phoneLoadingView.removeView();
            Main.phoneLoadingView = null;
        }
        //1.移除登录,创角界面
        if (Main.phoneLoginView) {
            Main.phoneLoginView.removeView();
            Main.phoneLoginView = null;
        }
        if (window['phoneH5']) {
            Main.main_instance.createPhoneH5View();
        }
        else {
            //重新调用登陆
            if ((gamelib.DeviceUtils.IsMobile && Main.gameParameter.pfID != 10041) || (info && info == "68hwan")) {
                Main.main_instance.createPhoneView();
            }
            else {
                Main.main_instance.createView();
            }
        }
    };
    /**
     * 登出
     */
    Main.prototype.onLogoutPC = function () {
        // Main.gameParameter.userInfo = null;
        //关掉所有界面，断开网络连接
        egret.MainContext.instance.stage.touchEnabled = egret.MainContext.instance.stage.touchChildren = false;
        var gSocket = egret.getDefinitionByName("app.GameSocket");
        if (gSocket) {
            gSocket.ins().isDoTimer = false;
            gSocket.ins().isAddGameApp = false;
            gSocket.ins().logoutClose();
        }
        var dMgr = egret.getDefinitionByName("app.DefaultMgr");
        if (dMgr) {
            dMgr.ins().clearMap();
        }
        if (Main.phoneLoadingView) {
            Main.phoneLoadingView.removeView();
            Main.phoneLoadingView = null;
        }
        // this.createView()
        if (window['onClickFucntion']) {
            window['onClickFucntion']();
        }
    };
    Main.prototype.logoutPCInfo = function () {
        Main.copyUerInfo();
        var sceneMgr = egret.getDefinitionByName("app.SceneManager");
        if (sceneMgr) {
            sceneMgr.ins().clear();
        }
        egret.MainContext.instance.stage.touchEnabled = egret.MainContext.instance.stage.touchChildren = true;
        this.createView();
    };
    Main.prototype.onViewResize = function () {
        var mainDiv = document.getElementById("mainDiv");
        if (mainDiv) {
            var screenRect = mainDiv.getBoundingClientRect();
            var boundingClientWidth = screenRect.width;
            if (boundingClientWidth < 1600) {
                if (egret.MainContext.instance.stage.scaleMode != egret.StageScaleMode.FIXED_WIDTH) {
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                    egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
                }
            }
            else {
                if (egret.MainContext.instance.stage.scaleMode != egret.StageScaleMode.NO_SCALE) {
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
                    egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
                }
            }
        }
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.loadConfig(ResDirEnum.RES_RESOURCE + "default.res.json?v=" + new Date().getTime(), ResDirEnum.RES_RESOURCE)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createView()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serverListInfo;
            return __generator(this, function (_a) {
                //自己选择区服
                if (window['selectServer']) {
                    if (window['removeLogDiv']) {
                        window['removeLogDiv']();
                    }
                    if (!Main.phoneLoginView) {
                        Main.phoneLoginView = new app.MainLoginView();
                        window['selectView'] = Main.phoneLoginView;
                        this.addChild(Main.phoneLoginView);
                    }
                }
                serverListInfo = new app.ServerListInfo();
                serverListInfo.getServerInfo();
                return [2 /*return*/];
            });
        });
    };
    Main.newCreateView = function () {
        Main.heartbeatPak(1);
        if (gamelib.DeviceUtils.IsNative) {
            if (!Main.createRoleView) {
                Main.createRoleView = new app.PhoneCreateRoleView();
            }
        }
        else {
            if (!Main.createRoleView) {
                Main.createRoleView = new app.MainCreateRoleView();
            }
            if (window['removeLogDiv']) {
                window['removeLogDiv']();
            }
        }
        Main.main_instance.addChildAt(Main.createRoleView, 0);
        if (Main.phoneLoginView) {
            Main.phoneLoginView.removeView();
            Main.phoneLoginView = null;
            window['selectView'] = null;
        }
    };
    Main.switchServer = function () {
        Main.heartbeatPak(1);
        if (!gamelib.DeviceUtils.IsNative) {
            if (window['removeLogDiv']) {
                window['removeLogDiv']();
            }
        }
        var mainNewServerView = new app.MainNewServerView();
        Main.main_instance.addChild(mainNewServerView);
    };
    Main.prototype.newLoadingView = function () {
        Main.heartbeatPak(1);
        if (window['selectServer'] && Main.phoneLoginView) {
            Main.phoneLoginView.removeView();
            Main.phoneLoginView = null;
            window['selectView'] = null;
        }
        if (window['removeLogDiv']) {
            window['removeLogDiv']();
        }
        if (!Main.phoneLoadingView) {
            Main.phoneLoadingView = new app.MainLoadingView();
            this.addChild(Main.phoneLoadingView);
        }
        if (Main.createRoleView) {
            Main.createRoleView.close();
        }
        if (Main.ageView) {
            if (Main.ageView.parent) {
                Main.ageView.parent.removeChild(Main.ageView);
            }
            Main.ageView = null;
        }
        Main.createRoleView = null;
        var self = this;
        if (true) {
            self.gameStartUp();
        }
        else {
            var classZ = egret.getDefinitionByName("app.GameApp");
            if (classZ) {
                self.gameStartUp();
            }
            else {
                Main.phoneLoadingView.showLoadProgress(35, "正在穿上布衣……");
                window['loadScript'](window['gameAppJS'], function () {
                    Main.phoneLoadingView.showLoadProgress(40, "正在穿上布衣……");
                    self.gameStartUp();
                });
            }
        }
    };
    Main.heartbeatPak = function (type) {
        var gameSocke = app.GameSocket.ins();
        gameSocke.heartbeatPak(type);
    };
    Main.prototype.gameStartUp = function () {
        if (Main.tipsLab.parent) {
            Main.tipsLab.parent.removeChild(Main.tipsLab);
        }
        Main.phoneLoadingView.showLoadProgress(48, "正在穿上布衣……");
        var classZ = egret.getDefinitionByName("app.GameApp");
        if (classZ) {
            classZ.ins().startUp(this);
        }
        else {
            Main.phoneLoadingView.showLoadProgress(49, "主程序加载失败,请检查网络,刷新游戏");
            //主程序加载失败
            if (Main.showTipsPhone) {
                Main.showTipsPhone("主程序加载失败");
            }
        }
    };
    Main.remLogin = function () {
        if (Main.phoneLoadingView) {
            Main.phoneLoadingView.removeView();
            Main.phoneLoadingView = null;
        }
        Main.phoneLoadingView = null;
        Main.showTipsPhone = null;
    };
    /** --------------------手机版本----------------------------- */
    Main.prototype.runGamePhone = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("main:手机测版 runGamePhone");
                        return [4 /*yield*/, RES.loadConfig(ResDirEnum.RES_RESOURCE + "phonedefault.res.json?v=" + new Date().getTime(), ResDirEnum.RES_RESOURCE)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createPhoneView()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /***手机版H5 */
    Main.prototype.runGamePhoneH5 = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("main:手机测版 runGamePhoneH5");
                        return [4 /*yield*/, RES.loadConfig(ResDirEnum.RES_RESOURCE + "phonedefault.res.json?v=" + new Date().getTime(), ResDirEnum.RES_RESOURCE)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createPhoneH5View()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.showTipsPhone = function (str) {
        Main.tipsLab.visible = true;
        Main.tipsLab.text = str;
        Main.tipsLab.verticalCenter = -100;
        Main.tipsLab.horizontalCenter = 0;
        Main.tipsLab.alpha = 1;
        Main.main_instance.addChild(Main.tipsLab);
        egret.Tween.removeTweens(Main.tipsLab);
        var t = egret.Tween.get(Main.tipsLab);
        t.to({ verticalCenter: -100 }, 500).to({ alpha: 0, verticalCenter: -300 }, 1000).call(function () {
            Main.tipsLab.visible = false;
            egret.Tween.removeTweens(Main.tipsLab);
        });
    };
    /**
     * 复制用户信息
     */
    Main.copyUerInfo = function () {
        Main.gameParameter.userInfo = window['userInfo'];
    };
    /**
     * 创建手机登录界面
     */
    Main.prototype.createPhoneView = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //1.2 账号信息
                if (Main.gameParameter.loginType) {
                    if (gamelib.DeviceUtils.IsNative) {
                        //红狐 游戏猫 火舞 quick 谡海 怒战屠龙 土豆 土豆-冰雪沙城 土豆-霸业 小七 土豆-修罗霸业 火炎
                        if (Main.gameParameter.pfID == 10003 || Main.gameParameter.pfID == 10010 || Main.gameParameter.pfID == 10011 || Main.gameParameter.pfID == 10012
                            || Main.gameParameter.pfID == 10013 || Main.gameParameter.pfID == 10024 || Main.gameParameter.pfID == 10025 || Main.gameParameter.pfID == 10029
                            || Main.gameParameter.pfID == 10038 || Main.gameParameter.pfID == 10035 || Main.gameParameter.pfID == 10039
                            || Main.gameParameter.pfID == 10041 || Main.gameParameter.pfID == 10046) {
                            Main.Native_initializationSDK({});
                        }
                        else {
                            this.createLoginView();
                        }
                    }
                    else {
                        if (Main.gameParameter.userInfo) {
                            Main.createServerView();
                        }
                        else {
                            if (Main.gameParameter.pfID == 10010) {
                                Main.signInView = new app.SignInView();
                                this.addChildAt(Main.signInView, 0);
                                //调用登陆
                                if (window['onClickFucntion']) {
                                    window['onClickFucntion']();
                                }
                            }
                            else {
                                Main.createServerView();
                            }
                        }
                    }
                }
                else {
                    Main.signInView = new app.SignInView();
                    this.addChildAt(Main.signInView, 0);
                    console.log(egret.Capabilities.runtimeType);
                    console.log("main:手机测试版本" + gamelib.DeviceUtils.IsNative);
                    egret.ExternalInterface.call("hideLoadingView", "");
                }
                if (gamelib.DeviceUtils.IsHtml5) {
                    if (window['removeLogDiv']) {
                        window['removeLogDiv']();
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.createPhoneH5View = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (Main.gameParameter.loginType) {
                    Main.signInView = new app.SignInViewH5();
                    this.addChildAt(Main.signInView, 0);
                }
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.createH5ServerView = function () {
        Main.copyUerInfo();
        Main.createServerView();
    };
    /**
     * 创建登录界面
     */
    Main.prototype.createLoginView = function () {
        if (!Main.signInView) {
            Main.signInView = new app.PhoneMainLoginView();
            this.addChildAt(Main.signInView, 0);
            Main.signInView.initUI();
        }
    };
    Main.createServerView = function () {
        if (Main.signInView) {
            Main.signInView.removeView();
            Main.signInView = null;
        }
        if (window['removeLogDiv']) {
            window['removeLogDiv']();
        }
        if (!Main.phoneLoginView) {
            Main.phoneLoginView = new app.PhoneLoginView();
            Main.main_instance.addChild(Main.phoneLoginView);
        }
        if (Main.gameParameter.pfID == 10003 && gamelib.DeviceUtils.IsIOS) {
            if (Main.phoneLoginView) {
                Main.phoneLoginView.setSwitchAccount();
            }
        }
        var serverListInfo = new app.PhoneServerListInfo();
        serverListInfo.getServerInfo();
        if (window['NativeObj'] && window['NativeObj']['hideLoadingView']) {
            window['NativeObj'].hideLoadingView();
        }
    };
    /**
     * 创建加载界面
     */
    Main.newPhoneLoadingView = function () {
        //1.移除登录,创角界面
        if (Main.phoneLoginView) {
            Main.phoneLoginView.removeView();
            Main.phoneLoginView = null;
        }
        if (Main.createRoleView) {
            Main.createRoleView.close();
            Main.createRoleView = null;
        }
        //2.创建加载界面
        Main.phoneLoadingView = new app.PhoneLoadingView();
        Main.main_instance['addChild'](Main.phoneLoadingView);
        if (Main.tipsLab.parent) {
            Main.tipsLab.parent.removeChild(Main.tipsLab);
        }
        Main.phoneLoadingView.showLoadProgress(35, "正在穿上布衣……");
        if (gamelib.DeviceUtils.IsHtml5) {
            if (true) {
                Main.startGameApp();
            }
            else {
                Main.phoneLoadingView.showLoadProgress(35, "正在穿上布衣……");
                var classZ = egret.getDefinitionByName("app.GameApp");
                if (classZ) {
                    Main.startGameApp();
                }
                else {
                    window['loadScript'](window['gameAppJS'], function () {
                        Main.phoneLoadingView.showLoadProgress(40, "正在穿上布衣……");
                        Main.startGameApp();
                    });
                }
            }
        }
        else {
            Main.startGameApp();
        }
    };
    Main.startGameApp = function () {
        if (Main.ageView) {
            if (Main.ageView.parent) {
                Main.ageView.parent.removeChild(Main.ageView);
            }
            Main.ageView = null;
        }
        Main.phoneLoadingView.showLoadProgress(48, "正在穿上布衣……");
        var classZ = egret.getDefinitionByName("app.GameApp");
        if (classZ) {
            classZ.ins().startUp(Main.main_instance);
        }
        else {
            Main.phoneLoadingView.showLoadProgress(49, "主程序加载失败,请检查网络,刷新游戏");
        }
    };
    /** 调用接收原生接口------------------------------------------- */
    Main.prototype.setExternalInterfaces = function () {
        //SDK初始化结果
        var self = this;
        egret.ExternalInterface.addCallback("onInitializeComplete", function (msg) {
            console.log("SDK初始化结果：");
            console.log(msg);
            try {
                var resultObj = JSON.parse(msg);
                if (+resultObj['code'] > 0) {
                    //SDK初始化失败
                }
                else {
                    if (resultObj['gameVersion']) {
                        Main.gameParameter.gameVersion = resultObj['gameVersion'] + "";
                    }
                    self.createLoginView();
                }
            }
            catch (error) {
                console.log("账号信息错1！");
            }
        });
        //接收账号信息
        egret.ExternalInterface.addCallback("onUserInfo", function (msg) {
            console.log("账户信息：");
            console.log(msg);
            try {
                Main.gameParameter.userInfo = {};
                //关掉所有界面，断开网络连接
                var gSocket = egret.getDefinitionByName("app.GameSocket");
                if (gSocket) {
                    gSocket.ins().isDoTimer = false;
                    gSocket.ins().isAddGameApp = false;
                    gSocket.ins().logoutClose();
                }
                var dMgr = egret.getDefinitionByName("app.DefaultMgr");
                if (dMgr) {
                    dMgr.ins().clearMap();
                }
                var sceneMgr = egret.getDefinitionByName("app.SceneManager");
                if (sceneMgr) {
                    sceneMgr.ins().clear();
                }
                if (Main.phoneLoadingView) {
                    Main.phoneLoadingView.removeView();
                    Main.phoneLoadingView = null;
                }
                var userInfo = JSON.parse(msg);
                var isHF1758 = false;
                if (+userInfo['hfId'] == 1758) {
                    isHF1758 = true;
                    Main.gameParameter.checkUrl = "https://tudouht.bigrnet.com/tudout/user/login";
                }
                else if (userInfo['channelID'] == "68hwan") {
                    isHF1758 = true;
                    Main.gameParameter.checkUrl = "https://yxmht.bigrnet.com/shengmahf/user/index";
                }
                Main.gameParameter.userInfo = userInfo;
                if (Main.gameParameter.checkUrl && Main.gameParameter.pfID != 10010) {
                    var checkData = "?";
                    for (var key in userInfo) {
                        checkData += (key + "=" + userInfo[key] + "&");
                    }
                    console.log("aaaaaaaaaa" + checkData);
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            try {
                                var obj = JSON.parse(xhr.responseText);
                                //验证成功
                                if (obj && obj['code'] == "success") {
                                    console.log("验证角色信息通过了");
                                    if (obj['data'] && (Main.gameParameter.pfID == 10029 || isHF1758 || Main.gameParameter.pfID == 10035 || Main.gameParameter.pfID == 10039 || Main.gameParameter.pfID == 10046)) {
                                        Main.gameParameter.userInfo['uid'] = obj['data'];
                                        console.log("角色信息" + JSON.stringify(Main.gameParameter.userInfo));
                                    }
                                    Main.createServerView();
                                }
                                else {
                                    // alert("账号验证失败，请重新登录");
                                    if (Main && Main.showTipsPhone) {
                                        Main.showTipsPhone("账号验证失败，请重新登录");
                                    }
                                }
                            }
                            catch (error) {
                                // alert("账号验证失败，请重新登录");
                                if (Main && Main.showTipsPhone) {
                                    Main.showTipsPhone("账号验证失败，请重新登录");
                                }
                            }
                        }
                    };
                    xhr.open("GET", Main.gameParameter.checkUrl + checkData + "time=" + new Date().getTime(), true); //提交get请求到服务器
                    xhr.send(null);
                }
                else {
                    Main.createServerView();
                }
            }
            catch (error) {
                console.log("账号信息错3！");
            }
        });
        //支付结果
        egret.ExternalInterface.addCallback("onPayResult", function (msg) {
            console.log("支付结果：");
            console.log(msg);
        });
        //登出
        egret.ExternalInterface.addCallback("onLogout", function (msg) {
            console.log("登出：");
            console.log(msg);
            Main.onLogout(msg);
        });
        //返回未成年信息
        egret.ExternalInterface.addCallback("onMinor", function (msg) {
            // [0：未设置，1：年龄小于8岁，2:8岁<=年龄<16岁，3:16<=年龄<18岁，4年龄>=18岁]
            console.log(msg);
        });
    };
    /**
    * 原生版本登录
    */
    Main.Native_onClickLogin = function (signInINfo) {
        signInINfo['loginType'] = Main.gameParameter.loginType ? 1 : 0;
        var signInINfoStr = JSON.stringify(signInINfo);
        console.log("main:手机测试版本 onClickLogin");
        egret.ExternalInterface.call("onClickLogin", signInINfoStr);
    };
    /**
    * 原生版本支付
    */
    Main.Native_onClickPay = function (orderInfo) {
        console.log("main:手机测试版本 Native_onClickPay");
        var orderInfoStr = JSON.stringify(orderInfo);
        egret.ExternalInterface.call("onClickPay", orderInfoStr);
    };
    /**
    * 重启
    */
    Main.Native_RestartApp = function (signInINfo) {
        signInINfo['loginType'] = Main.gameParameter.loginType ? 1 : 0;
        var signInINfoStr = JSON.stringify(signInINfo);
        console.log("main:手机测试版本 restartApp");
        egret.ExternalInterface.call("restartApp", signInINfoStr);
    };
    /**
    * 原生版本初始化SDK
    */
    Main.Native_initializationSDK = function (signInINfo) {
        signInINfo['loginType'] = Main.gameParameter.loginType ? 1 : 0;
        var signInINfoStr = JSON.stringify(signInINfo);
        console.log("main:手机测试版本 initializationSDK");
        egret.ExternalInterface.call("initializationSDK", signInINfoStr);
    };
    /**
     * 游戏猫
    * 原生版本上报玩家信息
    */
    Main.Native_reportPlayerData = function (signInINfo) {
        var signInINfoStr = JSON.stringify(signInINfo);
        console.log("main:上报 reportInfo");
        egret.ExternalInterface.call("reportInfo", signInINfoStr);
    };
    /**
     * F1
    * 原生版本埋点
    */
    Main.Native_adJustData = function (signInINfo) {
        var signInINfoStr = JSON.stringify(signInINfo);
        console.log("main:F1埋点 adJustData");
        egret.ExternalInterface.call("adJustData", signInINfoStr);
    };
    /**
    * 原生版本复制
    */
    Main.Native_onCopy = function (message) {
        console.log("main:手机版本复制 @onCopy");
        egret.ExternalInterface.call("@onCopy", message);
    };
    /**
    * 原生版本打开手机浏览器
    */
    Main.Native_openURL = function (message) {
        console.log("main:手机原生打开网址 openUrl");
        egret.ExternalInterface.call("@openUrl", message);
    };
    /**
    * 红狐IOS切换账号
    */
    Main.Native_honghuSwitchAccount = function (message) {
        console.log("main:手机原生打开网址 switchAccount");
        egret.ExternalInterface.call("@hhSwitchAccount", message);
    };
    //公告界面
    Main.gongGaoView = null;
    //18+ 提示界面
    Main.ageView = null;
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var app;
(function (app) {
    var MainCreateRoleView = (function (_super) {
        __extends(MainCreateRoleView, _super);
        function MainCreateRoleView() {
            var _this = _super.call(this) || this;
            _this._selectJob = 0;
            _this._selectSex = 0;
            _this.isAutoEnter = false;
            _this.roleData = null;
            _this.roleTexture = null;
            _this.mcName = "";
            _this.roleMcFactory = new egret.MovieClipDataFactory();
            _this.autoCreateStr = "";
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.CREATE_ROLE_VIEW, {}, null, false);
            var btnSKin = "\n            <e:Skin class=\"BtnCreateSkin\" states=\"up,down,disabled,selected\" minHeight=\"25\" minWidth=\"25\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\" height=\"100\" width=\"73\">\n\t        <e:Image id=\"iconDisplay\" alpha.disabled=\"0.5\"\n\t         x.down=\"0.5\" y.down=\"1\"  scaleX.down=\"0.55\" scaleY.down=\"0.55\" pixelHitTest=\"true\" source=\"login_nv_1\" horizontalCenter.selected=\"0\" verticalCenter=\"-10.5\" horizontalCenter=\"0\" scaleX=\"0.6\" scaleY=\"0.6\" source.selected=\"login_zs_2\"/>\n            <e:Image id=\"selected\" pixelHitTest=\"true\" horizontalCenter=\"0\" includeIn=\"selected\" verticalCenter=\"-10.5\" scaleX=\"0.6\" scaleY=\"0.6\" source=\"\"/>\n            <e:Rect width=\"100%\" height=\"100%\" y=\"0\" fillAlpha=\"0\" strokeAlpha=\"0\" fillColor=\"0xffffff\" touchEnabled=\"true\" includeIn=\"disabled\"/>\n            <e:Label id=\"labelDisplay\" text=\"\u6218\u58EB\" y=\"75.34\"  horizontalCenter=\"1\" textColor.up=\"0xdfbd9e\" textColor.selected=\"0xd48129\" size=\"20\" stroke=\"2\" bold=\"true\" textColor=\"0xe5ddcf\"/>\n            <e:Image source=\"login_xuanzhong\" width=\"81\" height=\"80\" x.disabled=\"-10.1\" x.down=\"-10.1\" x.up=\"-10.1\" y.disabled=\"-9.5\" y.down=\"-9.5\" y.up=\"-9.5\" touchEnabled=\"false\" visible.up=\"false\" visible.down=\"false\" visible.disabled=\"false\"  scale9Grid=\"19,19,2,2\" horizontalCenter=\"0\" verticalCenter=\"-10\" horizontalCenter.selected=\"0\"/>\n            </e:Skin>\n            ";
            _this.jobBtn = EXML.parse(btnSKin);
            var exml = "\n            <e:Skin class=\"MainCreateRoleSkin\" xmlns:e=\"http://ns.egret.com/eui\"  >\n\t        <e:Rect width=\"100%\" height=\"100%\" fillAlpha=\"1\"/>\n\t        <e:Group id=\"group\" width=\"1344\" height=\"840\" horizontalCenter=\"0\" verticalCenter=\"0\">\n            <e:Image id=\"bgImg\" source=\"login_bg2_jpg\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n            <e:Label id=\"timeLab\" text=\"\" size=\"22\" textColor=\"0x28ee01\" x=\"530\" y=\"677\" width=\"300\" textAlign=\"center\"/>\n            <e:Group id=\"roleGrp\" y=\"583.33\" x=\"482\" scaleX=\"0.9\" scaleY=\"0.9\"/>\n            <e:Rect id=\"rect\" width=\"60\" height=\"70\" y=\"414\" x=\"447\" visible=\"false\"/>\n            <e:Group x=\"769\" y=\"360\">\n            <e:Button id=\"job1\" label=\"\u6218\u58EB\" icon=\"login_zs_2\" skinName=\"BtnCreateSkin\"/>\n            <e:Button id=\"job2\" label=\"\u6CD5\u5E08\" icon=\"login_fs_2\" skinName=\"BtnCreateSkin\" x=\"135.52\" y=\"-1\"/>\n            <e:Button id=\"job3\" label=\"\u9053\u58EB\" icon=\"login_ds_2\" skinName=\"BtnCreateSkin\" x=\"283.49\" y=\"-1\"/>\n            <e:layout>\n                <e:HorizontalLayout gap=\"4\"/>\n            </e:layout>\n            </e:Group>\n            <e:Group x=\"802\" y=\"501\">\n            <e:Button id=\"boy\" label=\"\u7537\" icon=\"login_nan_2\" skinName=\"BtnCreateSkin\" x=\"2\"/>\n            <e:Button id=\"girl\" label=\"\u5973\" icon=\"login_nv_2\" skinName=\"BtnCreateSkin\" x=\"149\"/>\n            <e:layout>\n                <e:HorizontalLayout gap=\"8\"/>\n            </e:layout>\n            </e:Group>\n            <e:Group x=\"577\" y=\"697.67\" width=\"208\" height=\"90\">\n            <e:Button id=\"createBtn\"  icon=\"login_btn\" x=\"0\" scaleX=\"0.7\" scaleY=\"0.7\">\n                <e:skinName>\n                    <e:Skin states=\"up,down,disabled\">\n                    <e:Image id=\"iconDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\" scaleX.down=\"0.98\" scaleY.down=\"0.98\"/>\n                    <e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n                    </e:Skin>\n                </e:skinName>\n            </e:Button>\n            </e:Group>\n            <e:Group id=\"createMcGrp\" x=\"680\" y=\"744\" touchEnabled=\"false\" touchChildren=\"false\" touchThrough=\"false\"/>\n            <e:Button id=\"diceBtn\" icon=\"login_suiji\"  x=\"974\" y=\"265\" scaleX=\"1.2\" scaleY=\"1.2\">\n                <e:skinName>\n                    <e:Skin states=\"up,down,disabled\">\n                    <e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"login_suiji\" source.down=\"login_suiji\" scaleX.down=\"0.98\" scaleY.down=\"0.98\"/>\n                    <e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n                    </e:Skin>\n                </e:skinName>\n            </e:Button>\n            <e:EditableText id=\"nameInput\" width=\"172\" text=\"\" x=\"793\" y=\"272\" size=\"24\" textAlign=\"center\" verticalAlign=\"middle\"/>\n            </e:Group>\n            </e:Skin>\n             ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "MainCreateRoleSkin";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.job1['selected'].source = "login_zs_1";
            _this.job2['selected'].source = "login_fs_1";
            _this.job3['selected'].source = "login_ds_1";
            _this.boy['selected'].source = "login_nan_1";
            _this.girl['selected'].source = "login_nv_1";
            _this.setViewSize();
            return _this;
        }
        MainCreateRoleView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        /**
         * 创建按钮动画
         */
        MainCreateRoleView.prototype.createBtnMC = function () {
            var createdata = RES.getRes(ResDirEnum.RES_DIR + "create/create_anniu_json?v=7");
            var createtxtr = RES.getRes(ResDirEnum.RES_DIR + "create/create_anniu_png?v=7");
            var jsonData = null;
            var textureData = null;
            var self = this;
            var createMcFactory = new egret.MovieClipDataFactory();
            this.createMc = new egret.MovieClip();
            this.createMc.touchEnabled = false;
            this.createMcGrp.addChild(this.createMc);
            var craeteFunction = function () {
                if (jsonData && textureData) {
                    // var createMcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(jsonData, textureData);
                    createMcFactory.clearCache();
                    createMcFactory.mcDataSet = jsonData;
                    createMcFactory.texture = textureData;
                    self.createMc.movieClipData = createMcFactory.generateMovieClipData("create_anniu");
                    self.createMc.gotoAndPlay(1, -1);
                }
            };
            RES.getResByUrl(ResDirEnum.RES_DIR + "eff/create_anniu.json?v=7", function (data, url) {
                if (data) {
                    jsonData = data;
                    craeteFunction();
                }
            }, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl(ResDirEnum.RES_DIR + "eff/create_anniu.png?v=7", function (data, url) {
                if (data) {
                    textureData = data;
                    craeteFunction();
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        /**
         * 创建人物模型模型
         */
        MainCreateRoleView.prototype.createRoleMC = function (mcName) {
            this.mcName = mcName;
            this.roleData = null;
            this.roleTexture = null;
            RES.getResByUrl(ResDirEnum.RES_DIR + "create/" + this.mcName + ".json?v=7", this.compFuncJson, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl(ResDirEnum.RES_DIR + "create/" + this.mcName + ".png?v=7", this.compFuncPng, this, RES.ResourceItem.TYPE_IMAGE);
        };
        MainCreateRoleView.prototype.compFuncJson = function (data, url) {
            if (data && url && url.indexOf(this.mcName) != -1) {
                this.roleData = data;
                this.createBody();
            }
        };
        MainCreateRoleView.prototype.compFuncPng = function (data, url) {
            if (data && url && url.indexOf(this.mcName) != -1) {
                this.roleTexture = data;
                this.createBody();
            }
        };
        MainCreateRoleView.prototype.createBody = function () {
            if (this.roleData && this.roleTexture) {
                this.roleMcFactory.mcDataSet = this.roleData;
                this.roleMcFactory.texture = this.roleTexture;
                this.roleMc.movieClipData = this.roleMcFactory.generateMovieClipData(this.mcName);
                this.roleMc.gotoAndPlay(1, -1);
            }
        };
        MainCreateRoleView.prototype.initUI = function () {
            this.autoCreateStr = "秒后自动创建";
            this.createBtn.icon = "login_btn";
            if (window['isTraditional']) {
                this.bgImg.source = "login_bg1_jpg";
                this.createBtn.icon = "login_btn1";
                this.job1.label = "戰士";
                this.job2.label = "法師";
                this.job3.label = "道士";
                this.autoCreateStr = "秒後自動創建";
            }
            this.selectJob = 1;
            this.selectSex = 0;
            this.roleMc = new egret.MovieClip();
            this.roleMc.touchEnabled = false;
            this.roleMc.scaleX = this.roleMc.scaleY = 1.4;
            this.roleGrp.addChild(this.roleMc);
            this.createBtnMC();
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.setViewSize, this);
            this.job1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.job2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.job3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.boy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.girl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.diceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            var str = app.LocationProperty.nickName;
            if (str == "null" || str == "") {
                app.GameSocket.ins().s_255_6(this._selectSex);
            }
            else {
                this.setName(str);
            }
            // this.observe(GameApp.ins().postPerLoadProgress, this.perloadProgress);
            // this.observe(OtherMgr.ins().post_qqHallTextFiltering, this.qqHallSendCreate);
            this.nameInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.nameInput.maxChars = 7;
            if (!gamelib.DeviceUtils.IsMobile) {
                this.openTime = egret.getTimer() + 30 * 1000;
                this.updateTiem();
                if (this.timer) {
                    this.timer.stop();
                    this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateTiem, this);
                }
                this.timer = new egret.Timer(1000, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateTiem, this);
                this.timer.start();
            }
            // TimerManager.ins().removeAll(this);
            // TimerManager.ins().doTimer(1000, 0, this.updateTiem, this);
            // if (!param[0]) {
            //     ReportMgr.reporting(ReportEnum.CREATE_ROLE_VIEW, {}, {
            //         uid: LocationProperty.openID,
            //         roleId: LocationProperty.roleId,
            //         serverName: LocationProperty.srvname
            //     }, false);
            // }
        };
        MainCreateRoleView.prototype.updateTiem = function () {
            var s = Math.ceil((this.openTime - egret.getTimer()) / 1000);
            this.timeLab.text = "" + Math.max(s, 0) + this.autoCreateStr;
            if (s <= 0) {
                this.isAutoEnter = true;
                this.sendCreateRole();
            }
        };
        MainCreateRoleView.prototype.createRuselt = function (result) {
            //角色名重复
            if (Math.abs(result) == 6) {
                // MFRoleMgr.ins().s_255_6(this._selectSex);
            }
        };
        MainCreateRoleView.prototype.perloadProgress = function (arr) {
            var loaded = arr[0], total = arr[1];
            // this.loadText.text = `正在进入游戏（${Math.ceil((loaded / total) * 100)}%）`;
        };
        MainCreateRoleView.prototype.setViewSize = function () {
            var sh = egret.MainContext.instance.stage.stageHeight;
            if (sh < this.group.height) {
                this.group.scaleX = this.group.scaleY = sh / this.group.height;
            }
            else {
                this.group.scaleX = this.group.scaleY = 1;
            }
        };
        MainCreateRoleView.prototype.close = function () {
            var param = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                param[_i] = arguments[_i];
            }
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.setViewSize, this);
            this.job1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.job2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.job3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.boy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.girl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.diceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.nameInput.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            // this.roleMc.destroy();
            if (this.createMc) {
                this.createMc.stop();
                this.createMc = null;
            }
            this.roleMc = null;
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateTiem, this);
            }
            // this.selectMc.destroy();
            if (this.parent) {
                this.parent.removeChild(this);
            }
            app.GameSocket.ins().isNewRole = true;
            // TimerManager.ins().removeAll(this);
            // SoundManager.ins().stopBg();
            // this.removeObserve();
        };
        MainCreateRoleView.prototype.qqHallSendCreate = function (strInfo) {
            if (strInfo.type == 1) {
                if (strInfo.isLegal == 0) {
                    app.GameSocket.ins().s_255_4(strInfo.Msg, "", 0, this.curSex(), this.curJob());
                }
                else {
                    if (Main.showTipsPhone) {
                        Main.showTipsPhone("输入的文字不合法");
                    }
                }
            }
        };
        MainCreateRoleView.prototype.sendCreateRole = function () {
            // TimerManager.ins().removeAll(this);
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateTiem, this);
            }
            // if (window["serverOpenDay"]) {
            //     if (GameSocket.ins().openDay >= window["serverOpenDay"]) {
            //         if (Main.showTipsPhone) {
            //             Main.showTipsPhone("当前区服注册已经关闭，请前往新区注册！");
            //         }
            //         return;
            //     }
            // }
            var str = this.nameInput.text.replace(/\s/g, "");
            if (str.length) {
                var sendStr = this.nameInput.text;
                if (Main.gameParameter.pfID == 10006) {
                    this.qqHallTextFiltering(this.nameInput.text, 1);
                }
                else {
                    app.GameSocket.ins().s_255_4(this.nameInput.text, "", 0, this.curSex(), this.curJob());
                }
            }
            else {
                if (Main.showTipsPhone) {
                    Main.showTipsPhone("角色名不能为空！");
                }
            }
        };
        /**
        * QQ大厅文本敏感词验证
        */
        MainCreateRoleView.prototype.qqHallTextFiltering = function (str, type) {
            var checkInfo = "openid=" + Main.gameParameter.userInfo['openid'] + "&openkey=" + Main.gameParameter.userInfo['openkey'] + "&pf=" + Main.gameParameter.userInfo['pf'] + "&format=&msg=" + str + "&type=" + type;
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    //验证成功
                    if (obj && obj['ret'] == 0) {
                        self.qqHallSendCreate({ isLegal: obj['text_result_list_'][0]['check_ret_'], type: type, Msg: obj['text_result_list_'][0]['result_text_'] });
                    }
                    else {
                        if (Main.showTipsPhone) {
                            Main.showTipsPhone("输入的文字不合法");
                        }
                    }
                }
            };
            xhr.open("GET", window['textFiltering'] + checkInfo, true); //提交get请求到服务器
            xhr.send(null);
        };
        MainCreateRoleView.prototype.onClick = function (e) {
            switch (e.currentTarget) {
                case this.createBtn:
                    // ReportData.getIns().report("clickstart",ReportData.LOAD);
                    // ReportMgr.reporting(ReportEnum.ONCLICK_CREATE, {}, {
                    //     uid: LocationProperty.openID,
                    //     roleId: 0,
                    //     serverName: LocationProperty.srvname
                    // }, false);
                    this.sendCreateRole();
                    // SoundManager.ins().createPlayEffect(SoundUtil.VIEW_LEVEL);
                    break;
                case this.diceBtn:
                    // SoundManager.ins().createPlayEffect(SoundUtil.VIEW_LEVEL);
                    app.GameSocket.ins().s_255_6(this._selectSex);
                case this.nameInput:
                    break;
                case this.boy:
                    // SoundManager.ins().createPlayEffect(SoundUtil.VIEW_LEVEL);
                    this.selectSex = 0;
                    break;
                case this.girl:
                    // SoundManager.ins().createPlayEffect(SoundUtil.VIEW_LEVEL);
                    this.selectSex = 1;
                    break;
                case this.job1:
                    // SoundManager.ins().createPlayEffect(SoundUtil.VIEW_LEVEL);
                    this.selectJob = 1;
                    break;
                case this.job2:
                    // SoundManager.ins().createPlayEffect(SoundUtil.VIEW_LEVEL);
                    this.selectJob = 2;
                    break;
                case this.job3:
                    // SoundManager.ins().createPlayEffect(SoundUtil.VIEW_LEVEL);
                    this.selectJob = 3;
                    break;
            }
            // TimerManager.ins().remove(this.updateTiem, this);
            // TimerManager.ins().doTimer(30000, 1, this.updateTiem, this);
            // this.timeLab.text = ``;
            // SoundManager.ins().touchBg();
        };
        Object.defineProperty(MainCreateRoleView.prototype, "selectJob", {
            set: function (jobIndex) {
                this._selectJob = jobIndex;
                this.updateRole();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainCreateRoleView.prototype, "selectSex", {
            set: function (sexIndex) {
                this._selectSex = sexIndex;
                this.updateRole();
            },
            enumerable: true,
            configurable: true
        });
        MainCreateRoleView.prototype.updateRole = function () {
            var job = this.curJob();
            var sex = this.curSex();
            if (10021 == Main.gameParameter.pfID) {
                this.rect.visible = job == 1 && sex == 1;
            }
            this.createRoleMC("create_" + job + "_" + sex);
            for (var i = 1; i <= 3; i++)
                this["job" + i].currentState = "up";
            this["job" + job].currentState = "selected";
            if (sex == 0) {
                this.boy.currentState = "selected";
                this.girl.currentState = "up";
            }
            else {
                this.girl.currentState = "selected";
                this.boy.currentState = "up";
            }
        };
        MainCreateRoleView.prototype.setName = function (str) {
            this.nameInput.text = str;
            if (this.isAutoEnter)
                this.sendCreateRole();
        };
        MainCreateRoleView.prototype.curJob = function () {
            return this._selectJob;
        };
        MainCreateRoleView.prototype.curSex = function () {
            return this._selectSex;
        };
        return MainCreateRoleView;
    }(eui.Component));
    app.MainCreateRoleView = MainCreateRoleView;
    __reflect(MainCreateRoleView.prototype, "app.MainCreateRoleView");
})(app || (app = {}));
var app;
(function (app) {
    var MainGongGaoItemView = (function (_super) {
        __extends(MainGongGaoItemView, _super);
        function MainGongGaoItemView() {
            var _this = _super.call(this) || this;
            var exml = "\n            <e:Skin class=\"GongGaoTabSkin\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\" states=\"up,down\" >\n\t<e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"tab_01_2\"/>\n\t<e:Image horizontalCenter=\"0\" verticalCenter=\"0\" visible.up=\"false\" source=\"tab_01_1\"/>\n\t<e:Label id=\"label\" text=\"\u57FA  \u7840\" textColor=\"0xF0C896\" size=\"22\" horizontalCenter=\"0\" verticalCenter=\"0\" stroke=\"2\" textColor.down=\"0xe5ddcf\"/>\n</e:Skin>\n            ";
            EXML.parse(exml);
            _this.skinName = "GongGaoTabSkin";
            return _this;
        }
        MainGongGaoItemView.prototype.dataChanged = function () {
            if (this.data) {
                this.label.text = this.data.title;
            }
        };
        return MainGongGaoItemView;
    }(eui.ItemRenderer));
    app.MainGongGaoItemView = MainGongGaoItemView;
    __reflect(MainGongGaoItemView.prototype, "app.MainGongGaoItemView");
})(app || (app = {}));
var app;
(function (app) {
    var MainGongGaoWin = (function (_super) {
        __extends(MainGongGaoWin, _super);
        function MainGongGaoWin() {
            var _this = _super.call(this) || this;
            _this.gongGaoData = [];
            var exml = "\n            <e:Skin class=\"MainGongGaoViewSkin\" width=\"912\" height=\"646\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:app=\"app.*\" xmlns:w=\"http://ns.egret.com/wing\">\n\t<e:Group>\n\t\t<e:Image scaleX=\"1\" scaleY=\"1\" scale9Grid=\"74,80,634,486\" source=\"com_bg_kuang_5_png\" x=\"0\" y=\"0\"/>\n\t\t<e:Image smoothing=\"false\" width=\"157\" source=\"com_bg_kuang_6_png\" scale9Grid=\"17,19,2,4\" x=\"23\" height=\"560\" y=\"56\"/>\n\t\t<e:Image x=\"185\" y=\"56\" source=\"com_bg_kuang_6_png\" height=\"486\" width=\"702\"/>\n\t</e:Group>\n\t<e:Button id=\"btn_close\" label=\"\" width=\"60\" scaleX=\"1.2\" scaleY=\"1.2\" x=\"889\" y=\"-9\">\n\t\t<e:skinName>\n\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t<e:Image width=\"100%\" height=\"100%\" source=\"btn_guanbi3\" source.down=\"btn_guanbi4\" source.disabled=\"btn_guanbi4\"/>\n\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t</e:Skin>\n\t\t</e:skinName>\n\t</e:Button>\n\t<e:Label id=\"txt_name\" size=\"26\" stroke=\"2\" scaleX=\"1\" scaleY=\"1\" touchEnabled=\"false\" top=\"17\" horizontalCenter=\"0\" textColor=\"0xE5DDCF\" text=\"\u7CFB\u7EDF\u516C\u544A\"/>\n\t<e:TabBar id=\"tab\" x=\"28\" y=\"61\">\n\t\t<e:layout>\n\t\t<e:VerticalLayout horizontalAlign=\"center\" gap=\"-3\"/>\n\t\t</e:layout>\n\t</e:TabBar>\n\t<e:Group height=\"560\" x=\"185\" y=\"56\" width=\"700\" touchEnabled=\"false\">\n\t\t<e:Scroller id=\"gongGaoScroller\" width=\"644\" height=\"452\" x=\"30\" y=\"22\">\n\t\t\t<e:Group>\n\t\t\t\t<e:Label id=\"textLab\" text=\"\" size=\"24\" stroke=\"2\" textColor=\"0xe5ddcf\" width=\"644\" lineSpacing=\"10\" scaleX=\"1\" scaleY=\"1\" y=\"2\"/>\n\t\t\t</e:Group>\n\t\t</e:Scroller>\n\t\t<e:Button id=\"sureBtn\" label=\"\u786E \u5B9A\" y=\"500\" x=\"273\" width=\"109\" height=\"44\" scaleX=\"1\" scaleY=\"1\">\n\t\t\t<e:skinName>\n\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"tips_btn\" source.down=\"tips_btn\" source.disabled=\"tips_btn\" scaleX.down=\"0.95\" scaleY.down=\"0.95\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\" size=\"20\" stroke=\"2\" textColor=\"0xe5ddcf\"/>\n\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t</e:Button>\n\t</e:Group>\n</e:Skin>\n            ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "MainGongGaoViewSkin";
            _this.horizontalCenter = _this.verticalCenter = 0;
            return _this;
        }
        MainGongGaoWin.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        MainGongGaoWin.prototype.initUI = function () {
            this.gongGaoData = [];
            this.tab.itemRenderer = app.MainGongGaoItemView;
            this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.tab.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
            var self = this;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    try {
                        self.gongGaoData = JSON.parse(xhr.responseText);
                        self.updateTabInfo();
                    }
                    catch (error) {
                        console.log("主界面公告返回失败");
                    }
                    //验证成功
                    // if (xhr.responseText == "success") {
                    // } else {
                    // }
                }
            };
            xhr.open("GET", Main.gameParameter.gongGaoUrl + "?platform=" + Main.gameParameter.game + "&v=" + new Date().getTime(), true); //提交get请求到服务器
            xhr.send(null);
            this.gongGaoScroller.viewport.scrollV = 0;
            if (this.gongGaoScroller && this.gongGaoScroller.verticalScrollBar) {
                this.gongGaoScroller.verticalScrollBar.autoVisibility = false;
                this.gongGaoScroller.verticalScrollBar.visible = false;
            }
        };
        MainGongGaoWin.prototype.onClick = function (e) {
            switch (e.currentTarget) {
                case this.sureBtn:
                    app.SoundUtil.ins().playMonster("anniu2_mp3");
                    this.removeView();
                    break;
                case this.btn_close:
                    app.SoundUtil.ins().playMonster("anniu2_mp3");
                    this.removeView();
                    break;
            }
        };
        MainGongGaoWin.prototype.updateTabInfo = function () {
            if (this.gongGaoData.length > 0) {
                this.tab.dataProvider = new eui.ArrayCollection(this.gongGaoData);
                this.tab.selectedIndex = 0;
                this.updateGongGaoText();
            }
        };
        MainGongGaoWin.prototype.onChange = function (e) {
            this.gongGaoScroller.viewport.scrollV = 0;
            this.updateGongGaoText();
        };
        MainGongGaoWin.prototype.updateGongGaoText = function () {
            if (this.gongGaoData.length > 0) {
                var item = this.tab.dataProvider.getItemAt(this.tab.selectedIndex);
                if (item && item['text']) {
                    this.textLab.textFlow = new egret.HtmlTextParser().parser(item['text']);
                }
            }
        };
        MainGongGaoWin.prototype.removeView = function () {
            this.gongGaoData = [];
            this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.tab.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
            if (this.parent) {
                this.parent.removeChild(this);
                Main.gongGaoView = null;
            }
        };
        return MainGongGaoWin;
    }(eui.Component));
    app.MainGongGaoWin = MainGongGaoWin;
    __reflect(MainGongGaoWin.prototype, "app.MainGongGaoWin");
})(app || (app = {}));
var app;
(function (app) {
    var MainLoadingView = (function (_super) {
        __extends(MainLoadingView, _super);
        function MainLoadingView() {
            var _this = _super.call(this) || this;
            var exml = "\n        <e:Skin class=\"loadingview\"  width=\"1344\" height=\"840\" xmlns:e=\"http://ns.egret.com/eui\">\n\t    <e:Image id=\"BgImg\" horizontalCenter=\"0\" verticalCenter=\"0\" source=\"mp_jzjm_png\" scaleX=\"1\" scaleY=\"1\"/>\n\t    <e:Group width=\"919\" height=\"136\" bottom=\"104\" horizontalCenter=\"0.5\" touchEnabled=\"false\">\n\t\t<e:Image source=\"login_jdt_t\" bottom=\"45\" horizontalCenter=\"0\" scaleX=\"0.7\" scaleY=\"0.7\" x=\"16\" y=\"79\"/>\n\t\t<e:Rect id=\"rect\" width=\"879\" height=\"14\" fillColor=\"0x140500\" bottom=\"45\" y=\"78\" right=\"20\"/>\n\t\t<e:Image source=\"login_jdt_k\" bottom=\"39\" horizontalCenter=\"0\" scaleX=\"0.7\" scaleY=\"0.7\" x=\"11\" y=\"75\"/>\n\t\t<e:Label id=\"lodingDesc\" text=\"\u6B63\u5728\u8FDB\u5165\u6E38\u620F\" bottom=\"9\" horizontalCenter=\"0\" size=\"27\" textColor=\"0xe5ddcf\" stroke=\"2\" x=\"378\" y=\"101\" />\n\t\t<e:Image id=\"firstLoadImg\" source=\"login_wenzi3\" bottom=\"68\" horizontalCenter=\"0\" x=\"25\" y=\"3\" />\n\t\t<e:Image id=\"reloadImg\" source=\"login_wenzi1\" bottom=\"12\" horizontalCenter=\"337\" x=\"645\" y=\"97\" />\n\t    </e:Group>\n\t<e:Group left=\"0\" right=\"0\" bottom=\"21\">\n\t\t<e:Image id=\"version1\" source=\"zjt4_png\" horizontalCenter=\"0\" scaleX=\"0.75\" scaleY=\"0.75\" top=\"0\"/>\n\t\t<e:Image id=\"version2\" scaleX=\"0.8\" scaleY=\"0.8\" source=\"zjt8_png\" horizontalCenter=\"0\" y=\"23\"/>\n\t</e:Group>\n        </e:Skin>\n            ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "loadingview";
            _this.left = _this.right = _this.top = _this.bottom = 0;
            return _this;
        }
        MainLoadingView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.BgImg.source = Main.gameParameter.gameLoadImg ? Main.gameParameter.gameLoadImg + "_png" : "mp_jzjm_png";
            //确实需求：现在的资质和健康游戏公告是全版本都需要显示  （盛趣只显示健康游戏公告，不显示资质,F1和17comi什么都不显示） 跟卢伟龙确认过需求的
            this.version1.visible = this.version2.visible = true;
            if (Main.gameParameter.pfID == 10002) {
                //盛趣只展示健康游戏公告
                this.version2.visible = false;
            }
            else if (Main.gameParameter.pfID == 10007 || Main.gameParameter.pfID == 10008) {
                this.version1.visible = this.version2.visible = false;
            }
            else if (Main.gameParameter.pfID == 10021) {
                this.version2.source = "zjt8_png";
            }
            else if (Main.gameParameter.pfID == 10041 || Main.gameParameter.pfID == 10039 || Main.gameParameter.pfID == 10046) {
                this.version1.visible = false;
                this.version2.source = "zjt11_png";
            }
            if (window['isTraditional']) {
                this.BgImg.source = "mp_jzjm2_png";
                this.reloadImg.source = "login_wenzi4";
                this.firstLoadImg.source = "login_wenzi5";
            }
            this.reloadImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reloadFunction, this);
        };
        MainLoadingView.prototype.reloadFunction = function () {
            location.reload();
        };
        MainLoadingView.prototype.showLoadProgress = function (progress, des) {
            this.rect.width = (100 - Number(progress)) / 100 * 879;
            this.lodingDesc.text = des + "..." + progress + "%";
        };
        MainLoadingView.prototype.removeView = function () {
            this.reloadImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reloadFunction, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return MainLoadingView;
    }(eui.Component));
    app.MainLoadingView = MainLoadingView;
    __reflect(MainLoadingView.prototype, "app.MainLoadingView");
})(app || (app = {}));
var app;
(function (app) {
    var MainLoginView = (function (_super) {
        __extends(MainLoginView, _super);
        function MainLoginView() {
            var _this = _super.call(this) || this;
            var exml = "\n           <e:Skin class=\"MainLoginViewSkin\" width=\"1344\" height=\"840\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Group width=\"1344\" height=\"840\" horizontalCenter=\"0\" verticalCenter=\"0\">\n\t\t<e:Image id=\"gameLoginBg\" horizontalCenter=\"0\" verticalCenter=\"0\" scaleX=\"1\" scaleY=\"1\" source=\"mp_xfjm_png\"/>\n\t\t<e:Image id=\"gameLogo\" source=\"LOGO3_png\" horizontalCenter=\"0\" top=\"114\" x=\"400\" y=\"114\" scaleX=\"1\" scaleY=\"1\"/>\n\t\t<e:Group id=\"enterGrp\" horizontalCenter=\"1\" anchorOffsetY=\"0\" height=\"193\" touchEnabled=\"false\" verticalCenter=\"160\" x=\"480\" y=\"520\" scaleX=\"1\" scaleY=\"1\">\n\t\t\t<e:Image source=\"login_bt_2\" x=\"0\"/>\n\t\t\t<e:Image id=\"selectServerImg\" source=\"login_bt_1\" x=\"231\" y=\"3\"/>\n\t\t\t<e:Image id=\"serverTypeImg\" x=\"19.96\" y=\"15.96\" source=\"login_dian_1\"/>\n\t\t\t<e:Label id=\"serverName\" text=\"\u83B7\u53D6\u533A\u670D\u5217\u8868\u2026\u2026\" textColor=\"0xe5ddcf\" stroke=\"2\" size=\"22\" verticalCenter=\"-68\" horizontalCenter=\"-65\"/>\n\t\t\t<e:Label id=\"serverSelect\" text=\"\u533A\u670D\u9009\u62E9\" textColor=\"0xE5DDCF\" stroke=\"2\" size=\"22\" verticalCenter=\"-68\" horizontalCenter=\"117\" touchEnabled=\"false\"/>\n\t\t\t<e:Button id=\"enterBtn\" icon=\"login_jinru\" horizontalCenter=\"0\" bottom=\"0\">\n\t\t\t<e:skinName>\n\t\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image id=\"iconDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\" scaleY.down=\"0.98\" scaleX.down=\"0.98\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t\t</e:Button>\n\t\t</e:Group>\n\t\t<e:Group id=\"serverGrp\" horizontalCenter=\"0\" verticalCenter=\"0\" x=\"263\" y=\"154\" scaleX=\"1\" scaleY=\"1\" visible=\"false\">\n\t\t\t<e:Image source=\"login_bg3\"/>\n\t\t\t<e:Image id=\"serverSelectImg\" source=\"login_xzqf\" horizontalCenter=\"0\" top=\"19\"/>\n\t\t\t<e:Scroller height=\"386\" x=\"37\" y=\"68\" width=\"181\">\n\t\t\t<e:List id=\"btnList\" x=\"26.67\">\n\t\t\t\t<e:layout>\n\t\t\t\t<e:VerticalLayout gap=\"-3\"/>\n\t\t\t\t</e:layout>\n\t\t\t</e:List>\n\t\t\t</e:Scroller>\n\t\t\t<e:Scroller width=\"527\" height=\"368\" x=\"243\" y=\"79\">\n\t\t\t<e:List id=\"serverList\">\n\t\t\t\t<e:layout>\n\t\t\t\t<e:TileLayout horizontalGap=\"1\" requestedColumnCount=\"3\"/>\n\t\t\t\t</e:layout>\n\t\t\t</e:List>\n\t\t\t</e:Scroller>\n\t\t\t<e:Button id=\"closeBtn\" label=\"\" y=\"24\" right=\"21\" scaleX=\"1.3\" scaleY=\"1.3\">\n\t\t\t<e:skinName>\n\t\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"Login_guanbi\" source.down=\"Login_guanbi\" scaleY.down=\"0.98\" scaleX.down=\"0.98\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t\t</e:Button>\n\t\t\t<e:Image x=\"146\" y=\"481\" source=\"login_dian_1\"/>\n\t\t\t<e:Image x=\"345\" y=\"481\" source=\"login_dian_3\"/>\n\t\t\t<e:Image x=\"532\" y=\"481\" source=\"login_dian_2\"/>\n\t\t\t<e:Label id=\"serverTypeLab0\" text=\"\u987A \u7545\" x=\"199\" y=\"480\" textColor=\"0x28ee01\" size=\"23\" stroke=\"2\"/>\n\t\t\t<e:Label id=\"serverTypeLab1\" text=\"\u7EF4 \u62A4\" x=\"395\" y=\"480\" size=\"23\" textColor=\"0x807b73\" stroke=\"2\"/>\n\t\t\t<e:Label id=\"serverTypeLab2\" text=\"\u7206 \u6EE1\" x=\"590\" y=\"480\" size=\"23\" textColor=\"0xe50000\" stroke=\"2\"/>\n\t\t</e:Group>\n        <e:Button id=\"gongGaoBtn\" icon=\"main_gonggaoBtn_png\" horizontalCenter=\"533\" verticalCenter=\"-306\" visible=\"false\">\n\t\t\t<e:skinName>\n\t\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"main_gonggaoBtn_png\" source.down=\"main_gonggaoBtn_png\" source.disabled=\"main_gonggaoBtn_png\" scaleY.down=\"0.98\" scaleX.down=\"0.98\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t</e:Button>\n\t</e:Group>\n    <e:Image id=\"ageButton\" visible=\"false\" source=\"ageButton_png\" right=\"20\" bottom=\"20\"/>\n</e:Skin>\n            ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "MainLoginViewSkin";
            _this.left = _this.right = _this.top = _this.bottom = 0;
            return _this;
        }
        MainLoginView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        MainLoginView.prototype.initUI = function () {
            this.enterGrp.visible = true;
            this.serverGrp.visible = false;
            this.ageButton.visible = Main.gameParameter.pfID == 10010 || Main.gameParameter.pfID == 10024;
            this.gameLoginBg.source = Main.gameParameter.gameLoginImg ? Main.gameParameter.gameLoginImg + "_png" : "mp_xfjm_png";
            this.gameLogo.source = Main.gameParameter.gameLogo ? Main.gameParameter.gameLogo + "_png" : "";
            this.btnList.itemRenderer = app.ListButton;
            this.serverList.itemRenderer = app.ServerItem;
            this.selectServerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickLeftList, this);
            this.serverList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickRightList, this);
            this.gongGaoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.ageButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.gongGaoBtn.visible = Main.gameParameter.isShowGongGao ? true : false;
            this.enterBtn.icon = "login_jinru";
            if (Main.gameParameter.pfID == 10041) {
                this.enterGrp.verticalCenter = 160;
            }
            if (window['isTraditional']) {
                this.serverSelect.text = "區服選擇";
                this.serverTypeLab0.text = "順 暢";
                this.serverTypeLab1.text = "維 護";
                this.serverTypeLab2.text = "爆 滿";
                this.enterBtn.icon = "login_jinru1";
                this.serverSelectImg.source = "login_xzqf1";
            }
            if (Main.gameParameter.isAutoShowGongGao) {
                Main.showGongGaoView();
            }
        };
        MainLoginView.prototype.onClick = function (e) {
            switch (e.currentTarget) {
                case this.selectServerImg:
                    this.serverGrp.visible = true;
                    this.enterGrp.visible = false;
                    break;
                case this.enterBtn:
                    //调用登录
                    app.LocationProperty.Param = this.curServerData;
                    app.GameSocket.ins().connectServer();
                    //保存最近登陆
                    var httpReq = new egret.HttpRequest();
                    httpReq.responseType = egret.HttpResponseType.TEXT;
                    httpReq.open(Main.gameParameter.setServiceListdUrl + "?account=" + app.LocationProperty.openID + "&srvid=" + app.LocationProperty.originalSrvid, egret.HttpMethod.GET);
                    httpReq.send();
                    break;
                case this.closeBtn:
                    this.serverGrp.visible = false;
                    this.enterGrp.visible = true;
                    break;
                case this.gongGaoBtn:
                    Main.showGongGaoView();
                    break;
                case this.ageButton://提示
                    Main.showAgeoView();
                    break;
            }
        };
        MainLoginView.prototype.updateInfo = function (arr, curServerInfo) {
            this.btnList.selectedIndex = 0;
            this.curServerData = curServerInfo;
            this.curServerData['user'] = Main.gameParameter.userInfo['uid'];
            if (!this.curServerData['originalSrvid']) {
                this.curServerData['originalSrvid'] = this.curServerData.srvid;
            }
            app.LocationProperty.Param = this.curServerData;
            this.btnList.dataProvider = new eui.ArrayCollection(arr);
            var item = this.btnList.dataProvider.getItemAt(this.btnList.selectedIndex);
            if (item && item.serverlist) {
                this.serverList.dataProvider = new eui.ArrayCollection(item.serverlist);
            }
            this.setServerName();
        };
        MainLoginView.prototype.setNewServer = function (serverData) {
            this.curServerData = serverData;
            this.setServerName();
        };
        //区服页签切换
        MainLoginView.prototype.onClickLeftList = function (e) {
            var item = this.btnList.dataProvider.getItemAt(this.btnList.selectedIndex);
            if (item && item.serverlist) {
                this.serverList.dataProvider = new eui.ArrayCollection(item.serverlist);
            }
        };
        //区服信息选择
        MainLoginView.prototype.onClickRightList = function (e) {
            this.curServerData = e.item;
            this.curServerData['user'] = Main.gameParameter.userInfo['uid'];
            if (!this.curServerData['originalSrvid']) {
                this.curServerData['originalSrvid'] = this.curServerData.srvid;
            }
            this.setServerName();
            this.serverGrp.visible = false;
            this.enterGrp.visible = true;
        };
        MainLoginView.prototype.setServerName = function () {
            if (this.curServerData) {
                this.serverName.text = this.curServerData.serverName;
                this.serverTypeImg.source = +this.curServerData.type != 4 ? "login_dian_" + (+this.curServerData.type) : "login_dian_1";
                app.ReportDataMgr.ins().reporting(app.ReportDataEnum.SELECT_SERVICE, {}, null, false); //上报选择服务器
            }
        };
        MainLoginView.prototype.removeView = function () {
            this.selectServerImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickLeftList, this);
            this.serverList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickRightList, this);
            this.gongGaoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.ageButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return MainLoginView;
    }(eui.Component));
    app.MainLoginView = MainLoginView;
    __reflect(MainLoginView.prototype, "app.MainLoginView");
})(app || (app = {}));
var app;
(function (app) {
    var MainNewServerView = (function (_super) {
        __extends(MainNewServerView, _super);
        function MainNewServerView() {
            var _this = _super.call(this) || this;
            var exml = "\n            <e:Skin class=\"mainNewServerSkin\" xmlns:e=\"http://ns.egret.com/eui\">\n            <e:Group top=\"0\" left=\"0\" bottom=\"0\" right=\"0\" />\n            <e:Group width=\"426\" height=\"301\" horizontalCenter=\"0\" verticalCenter=\"0\" >\n            <e:Image source=\"bg_tipstc2_png\"/>\n            <e:Label size=\"24\" stroke=\"2\" touchEnabled=\"false\" top=\"17\" horizontalCenter=\"0\" textColor=\"0xE5DDCF\" text=\"\u63D0 \u793A\"/>\n            <e:Label text=\"\u8BE5\u533A\u670D\u6CE8\u518C\u5DF2\u5173\u95ED\uFF0C\u662F\u5426\u524D\u5F80\u6700\u65B0\u533A\u670D\u4F53\u9A8C\uFF1F\" lineSpacing=\"10\" width=\"338\" size=\"22\" textColor=\"0xe5ddcf\" horizontalCenter=\"0\" verticalCenter=\"-18\" textAlign=\"center\"/>\n            <e:Button id=\"btnClose\" label=\"\u786E\u5B9A\" bottom=\"17\" x=\"150\" width=\"109\" height=\"44\">\n            <e:skinName>\n            <e:Skin states=\"up,down,disabled\" xmlns:app=\"app.*\">\n            <e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"tips_btn\" source.down=\"tips_btn\" source.disabled=\"tips_btn\" scaleX.down=\"0.95\" scaleY.down=\"0.95\"/>\n            <e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\" size=\"20\" textColor=\"0xf0c896\" stroke=\"2\"/>\n            </e:Skin>\n            </e:skinName>\n            </e:Button>\n            </e:Group>\n            </e:Skin>\n            ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "mainNewServerSkin";
            _this.verticalCenter = _this.horizontalCenter = 0;
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
            // this.left = this.right = this.top = this.bottom = 0;
        }
        MainNewServerView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        //跳转新服
        MainNewServerView.prototype.onClick = function () {
            this.closeView();
        };
        MainNewServerView.prototype.closeView = function () {
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
                // if (Main.gameParameter.pfID == 10006 || Main.gameParameter.pfID == 10001) {
                //    return;
                // }
                if (gamelib.DeviceUtils.IsMobile) {
                    var gSocket = egret.getDefinitionByName("app.GameSocket");
                    if (gSocket) {
                        gSocket.ins().isDoTimer = false;
                        gSocket.ins().isAddGameApp = false;
                        gSocket.ins().logoutClose();
                    }
                    Main.phoneLoginView.setNewServer(app.LocationProperty.recommendServer);
                }
                else {
                    if (window['selectServer']) {
                        var gSocket = egret.getDefinitionByName("app.GameSocket");
                        if (gSocket) {
                            gSocket.ins().isDoTimer = false;
                            gSocket.ins().isAddGameApp = false;
                            gSocket.ins().logoutClose();
                        }
                        Main.phoneLoginView.setNewServer(app.LocationProperty.recommendServer);
                    }
                    else {
                        app.GameSocket.ins().switchConnectServer();
                    }
                }
            }
        };
        return MainNewServerView;
    }(eui.Component));
    app.MainNewServerView = MainNewServerView;
    __reflect(MainNewServerView.prototype, "app.MainNewServerView");
})(app || (app = {}));
var app;
(function (app) {
    var MainStartServerTipsView = (function (_super) {
        __extends(MainStartServerTipsView, _super);
        function MainStartServerTipsView() {
            var _this = _super.call(this) || this;
            var exml = "\n            <e:Skin class=\"mainStartServerTipsSkin\" xmlns:e=\"http://ns.egret.com/eui\">\n            <e:Rect id=\"rect\" left=\"0\" right=\"0\" top=\"0\" bottom=\"0\" fillAlpha=\"0.3\"/>\n            <e:Group width=\"426\" height=\"301\" horizontalCenter=\"0\" verticalCenter=\"0\" >\n            <e:Image source=\"bg_tipstc2_png\"/>\n            <e:Label size=\"24\" stroke=\"2\" touchEnabled=\"false\" top=\"17\" horizontalCenter=\"0\" textColor=\"0xE5DDCF\" text=\"\u63D0 \u793A\"/>\n            <e:Label id=\"tipsLab\" text=\"\u8BE5\u533A\u670D\u6CE8\u518C\u5DF2\u5173\u95ED\uFF0C\u662F\u5426\u524D\u5F80\u6700\u65B0\u533A\u670D\u4F53\u9A8C\uFF1F\" width=\"338\" size=\"22\" textColor=\"0xe5ddcf\" horizontalCenter=\"0\" verticalCenter=\"-18\" textAlign=\"center\"/>\n            </e:Group>\n            </e:Skin>\n            ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "mainStartServerTipsSkin";
            // this.verticalCenter = this.horizontalCenter = 0;
            _this.left = _this.right = _this.top = _this.bottom = 0;
            return _this;
        }
        MainStartServerTipsView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        MainStartServerTipsView.prototype.setTipsLab = function (value) {
            this.tipsLab.text = value;
        };
        MainStartServerTipsView.prototype.closeView = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return MainStartServerTipsView;
    }(eui.Component));
    app.MainStartServerTipsView = MainStartServerTipsView;
    __reflect(MainStartServerTipsView.prototype, "app.MainStartServerTipsView");
})(app || (app = {}));
/**
 * Created by zhangac on 2016/11/23.
 */
var app;
(function (app) {
    var Algorithm = (function () {
        function Algorithm() {
        }
        Algorithm.sortAsc = function (b1, b2) {
            if (b1 < b2)
                return -1;
            else if (b1 > b2)
                return 1;
            else
                return 0;
        };
        /**
     * 根据obj1 obj2的attr属性排序
     * 不传attr的时候直接根据obj1，obj2比较大小
     * @param obj1
     * @param obj2
     * @param attr
     */
        Algorithm.sortAscAttr = function (obj1, obj2, attr) {
            var result;
            if (attr == undefined) {
                result = Algorithm.sortAsc(obj1, obj2);
            }
            else {
                var attr1 = obj1[attr];
                var attr2 = obj2[attr];
                if (attr1 < attr2) {
                    result = -1;
                }
                else if (attr1 > attr2) {
                    result = 1;
                }
                else {
                    result = 0;
                }
            }
            return result;
        };
        Algorithm.sortDesc = function (b1, b2) {
            if (b1 > b2)
                return -1;
            else if (b1 < b2)
                return 1;
            else
                return 0;
        };
        /**
         * 根据obj1 obj2的attr属性排序
         * 不传attr的时候直接根据obj1，obj2比较大小
         * @param obj1
         * @param obj2
         * @param attr
         */
        Algorithm.sortDescAttr = function (obj1, obj2, attr) {
            var result;
            if (attr == undefined) {
                result = Algorithm.sortDesc(obj1, obj2);
            }
            else {
                var attr1 = obj1[attr];
                var attr2 = obj2[attr];
                if (attr1 > attr2) {
                    result = -1;
                }
                else if (attr1 < attr2) {
                    result = 1;
                }
                else {
                    result = 0;
                }
            }
            return result;
        };
        //二分查找
        //tab 要检索的表
        // item 要搜索的玩意儿
        // binFunc 用于比较的函数，当纯数字tab时该参数可以为空，默认检索到的位置是最后的插入位置
        Algorithm.binSearch = function (tab, item, binFunc) {
            if (binFunc === void 0) { binFunc = null; }
            if (!tab || tab.length == 0)
                return 0;
            if (!binFunc)
                binFunc = Algorithm.sortAsc;
            var low = 0;
            var high = tab.length - 1;
            while (low <= high) {
                var mid = (high + low) >> 1;
                var val = tab[mid];
                if (binFunc(val, item) <= 0) {
                    low = mid + 1;
                }
                else {
                    high = mid - 1;
                }
            }
            return low;
        };
        Algorithm.test = function () {
            var arr = [];
            var MAX = 10;
            for (var i = 0; i < MAX; i++) {
                var r = Math.floor(Math.random() * 100000);
                var index = Algorithm.binSearch(arr, r);
                arr.splice(index, 0, r);
            }
            if (arr.length != MAX)
                // debug.log(`test fail!count is ${arr.length}, except:${MAX}`);
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var val = arr_1[_i];
                    // debug.log(val);
                }
            for (var i = 0; i < arr.length - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    // debug.log(`test fail!index:${i}`);
                    break;
                }
            }
        };
        return Algorithm;
    }());
    app.Algorithm = Algorithm;
    __reflect(Algorithm.prototype, "app.Algorithm");
})(app || (app = {}));
var app;
(function (app) {
    /**
     * 手机版 创建据角色
     */
    var PhoneCreateRoleView = (function (_super) {
        __extends(PhoneCreateRoleView, _super);
        function PhoneCreateRoleView() {
            var _this = _super.call(this) || this;
            _this._selectJob = 0;
            _this._selectSex = 0;
            _this.isAutoEnter = false;
            _this.roleData = null;
            _this.roleTexture = null;
            _this.mcName = "";
            _this.roleMcFactory = new egret.MovieClipDataFactory();
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.CREATE_ROLE_VIEW, {}, null, false);
            var btnSKin = "\n            <e:Skin class=\"PhoneBtnCreate2Skin\" states=\"up,down,disabled,selected\" minHeight=\"25\" minWidth=\"25\"\n        xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\" height=\"100\" width=\"73\">\n         <e:Image id=\"iconDisplay\" alpha.disabled=\"0.5\" x.down=\"0.5\" y.down=\"1\" scaleX.down=\"0.55\" scaleY.down=\"0.55\"\n             pixelHitTest=\"true\" source=\"login_nv_1\" horizontalCenter.selected=\"0\" verticalCenter=\"-10.5\"\n             horizontalCenter=\"0\" scaleX=\"0.6\" scaleY=\"0.6\" source.selected=\"login_zs_2\" />\n          <e:Image id=\"selected\" pixelHitTest=\"true\" horizontalCenter=\"0\" includeIn=\"selected\" verticalCenter=\"-10.5\"\n             scaleX=\"0.6\" scaleY=\"0.6\" source=\"\" />\n           <e:Rect width=\"100%\" height=\"100%\" y=\"0\" fillAlpha=\"0\" strokeAlpha=\"0\" fillColor=\"0xffffff\" touchEnabled=\"true\"\n            includeIn=\"disabled\" />\n          <e:Label id=\"labelDisplay\" text=\"\u6218\u58EB\" y=\"75.34\" horizontalCenter=\"1\" textColor.up=\"0xdfbd9e\"\n             textColor.selected=\"0xd48129\" size=\"20\" stroke=\"2\" bold=\"true\" textColor=\"0xe5ddcf\" />\n         <e:Image source=\"login_xuanzhong\" width=\"81\" height=\"80\" x.disabled=\"-10.1\" x.down=\"-10.1\" x.up=\"-10.1\"\n             y.disabled=\"-9.5\" y.down=\"-9.5\" y.up=\"-9.5\" touchEnabled=\"false\" visible.up=\"false\" visible.down=\"false\"\n             visible.disabled=\"false\" scale9Grid=\"19,19,2,2\" horizontalCenter=\"0\" verticalCenter=\"-10\"\n             horizontalCenter.selected=\"0\" />\n           </e:Skin>\n            ";
            _this.jobBtn = EXML.parse(btnSKin);
            var exml = "\n            <e:Skin class=\"PhoneCreateRole2Skin\" xmlns:e=\"http://ns.egret.com/eui\"   width=\"1344\" height=\"750\">\n\t        <e:Rect width=\"100%\" height=\"100%\" fillAlpha=\"1\"/>\n\t        <e:Group id=\"group\" width=\"1344\" height=\"750\" horizontalCenter=\"0\" verticalCenter=\"0\">\n            <e:Image id=\"bgImg\" horizontalCenter=\"-1\" verticalCenter=\"0\" source=\"mp_login_bg_png\"/>\n            <e:Label id=\"timeLab\" text=\"\" size=\"22\" textColor=\"0x28ee01\" x=\"530\" y=\"677\" width=\"300\" textAlign=\"center\"/>\n            <e:Group id=\"roleGrp\" y=\"583.33\" x=\"482\" scaleX=\"0.9\" scaleY=\"0.9\"/>\n            <e:Group x=\"769\" y=\"360\">\n            <e:Button id=\"job1\" label=\"\u6218\u58EB\" icon=\"login_zs_2\" skinName=\"PhoneBtnCreate2Skin\"/>\n            <e:Button id=\"job2\" label=\"\u6CD5\u5E08\" icon=\"login_fs_2\" skinName=\"PhoneBtnCreate2Skin\" x=\"135\" y=\"-1\"/>\n            <e:Button id=\"job3\" label=\"\u9053\u58EB\" icon=\"login_ds_2\" skinName=\"PhoneBtnCreate2Skin\" x=\"283\" y=\"-1\"/>\n            <e:layout>\n                <e:HorizontalLayout gap=\"4\"/>\n            </e:layout>\n            </e:Group>\n            <e:Group x=\"802\" y=\"501\">\n            <e:Button id=\"boy\" label=\"\u7537\" icon=\"login_nan_2\" skinName=\"PhoneBtnCreate2Skin\" x=\"2\"/>\n            <e:Button id=\"girl\" label=\"\u5973\" icon=\"login_nv_2\" skinName=\"PhoneBtnCreate2Skin\" x=\"149\"/>\n            <e:layout>\n                <e:HorizontalLayout gap=\"8\"/>\n            </e:layout>\n            </e:Group>\n            <e:Group x=\"577\" y=\"651.67\" width=\"208\" height=\"90\">\n            <e:Button id=\"createBtn\"  icon=\"login_btn\" x=\"0\" scaleX=\"0.7\" scaleY=\"0.7\">\n                <e:skinName>\n                    <e:Skin states=\"up,down,disabled\">\n                    <e:Image id=\"iconDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\" scaleX.down=\"0.98\" scaleY.down=\"0.98\"/>\n                    <e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n                    </e:Skin>\n                </e:skinName>\n            </e:Button>\n            </e:Group>\n            <e:Group id=\"createMcGrp\" x=\"680\" y=\"697\" touchEnabled=\"false\" touchChildren=\"false\" touchThrough=\"false\"/>\n            <e:Button id=\"diceBtn\" icon=\"login_suiji\"  x=\"974\" y=\"265\" scaleX=\"1.2\" scaleY=\"1.2\">\n                <e:skinName>\n                    <e:Skin states=\"up,down,disabled\">\n                    <e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"login_suiji\" source.down=\"login_suiji\" scaleX.down=\"0.98\" scaleY.down=\"0.98\"/>\n                    <e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n                    </e:Skin>\n                </e:skinName>\n            </e:Button>\n            <e:EditableText id=\"nameInput\" width=\"172\" text=\"\" x=\"793\" y=\"272\" size=\"24\" textAlign=\"center\" verticalAlign=\"middle\"/>\n            </e:Group>\n            </e:Skin>\n             ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "PhoneCreateRole2Skin";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.job1['selected'].source = "login_zs_1";
            _this.job2['selected'].source = "login_fs_1";
            _this.job3['selected'].source = "login_ds_1";
            _this.boy['selected'].source = "login_nan_1";
            _this.girl['selected'].source = "login_nv_1";
            return _this;
        }
        PhoneCreateRoleView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
            app.SoundManager.ins().playBg("chuangjian_mp3");
        };
        /**
         * 创建按钮动画
         */
        PhoneCreateRoleView.prototype.createBtnMC = function () {
            var createdata = RES.getRes(ResDirEnum.RES_DIR + "create/create_anniu_json?v=7");
            var createtxtr = RES.getRes(ResDirEnum.RES_DIR + "create/create_anniu_png?v=7");
            var jsonData = null;
            var textureData = null;
            var self = this;
            var createMcFactory = new egret.MovieClipDataFactory();
            this.createMc = new egret.MovieClip();
            this.createMc.touchEnabled = false;
            this.createMcGrp.addChild(this.createMc);
            var craeteFunction = function () {
                if (jsonData && textureData) {
                    // var createMcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(jsonData, textureData);
                    createMcFactory.clearCache();
                    createMcFactory.mcDataSet = jsonData;
                    createMcFactory.texture = textureData;
                    self.createMc.movieClipData = createMcFactory.generateMovieClipData("create_anniu");
                    self.createMc.gotoAndPlay(1, -1);
                }
            };
            RES.getResByUrl(ResDirEnum.RES_DIR + "eff/create_anniu.json?v=7", function (data, url) {
                if (data) {
                    jsonData = data;
                    craeteFunction();
                }
            }, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl(ResDirEnum.RES_DIR + "eff/create_anniu.png?v=7", function (data, url) {
                if (data) {
                    textureData = data;
                    craeteFunction();
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        /**
         * 创建人物模型模型
         */
        PhoneCreateRoleView.prototype.createRoleMC = function (mcName) {
            this.mcName = mcName;
            this.roleData = null;
            this.roleTexture = null;
            RES.getResByUrl(ResDirEnum.RES_DIR + "create/" + this.mcName + ".json?v=7", this.compFuncJson, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl(ResDirEnum.RES_DIR + "create/" + this.mcName + ".png?v=7", this.compFuncPng, this, RES.ResourceItem.TYPE_IMAGE);
        };
        PhoneCreateRoleView.prototype.compFuncJson = function (data, url) {
            if (data && url && url.indexOf(this.mcName) != -1) {
                this.roleData = data;
                this.createBody();
            }
        };
        PhoneCreateRoleView.prototype.compFuncPng = function (data, url) {
            if (data && url && url.indexOf(this.mcName) != -1) {
                this.roleTexture = data;
                this.createBody();
            }
        };
        PhoneCreateRoleView.prototype.createBody = function () {
            if (this.roleData && this.roleTexture) {
                this.roleMcFactory.mcDataSet = this.roleData;
                this.roleMcFactory.texture = this.roleTexture;
                this.roleMc.movieClipData = this.roleMcFactory.generateMovieClipData(this.mcName);
                this.roleMc.gotoAndPlay(1, -1);
            }
        };
        // private autoCreateStr: string = "";
        PhoneCreateRoleView.prototype.initUI = function () {
            // this.autoCreateStr = "秒后自动创建";
            this.createBtn.icon = "login_btn";
            this.selectJob = 1;
            this.selectSex = 0;
            this.roleMc = new egret.MovieClip();
            this.roleMc.touchEnabled = false;
            this.roleMc.scaleX = this.roleMc.scaleY = 1.4;
            this.roleGrp.addChild(this.roleMc);
            this.createBtnMC();
            this.job1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.job2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.job3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.boy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.girl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.diceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            var str = app.LocationProperty.nickName;
            if (str == "null" || str == "") {
                app.GameSocket.ins().s_255_6(this._selectSex);
            }
            else {
                this.setName(str);
            }
            // this.openTime = egret.getTimer() + 30 * 1000;
            this.nameInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.nameInput.maxChars = 7;
            // this.updateTiem();
            // if (this.timer) {
            // 	this.timer.stop();
            // 	this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateTiem, this);
            // }
            // this.timer = new egret.Timer(1000, 0);
            // this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateTiem, this);
            // this.timer.start();
        };
        // private timer: egret.Timer;
        // private updateTiem(): void {
        // 	let s = Math.ceil((this.openTime - egret.getTimer()) / 1000);
        // 	this.timeLab.text = `${Math.max(s, 0)}${this.autoCreateStr}`;
        // 	if (s <= 0) {
        // 		this.isAutoEnter = true;
        // 		this.sendCreateRole();
        // 	}
        // }
        PhoneCreateRoleView.prototype.close = function () {
            var param = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                param[_i] = arguments[_i];
            }
            this.job1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.job2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.job3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.boy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.girl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.diceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.nameInput.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.createMc) {
                this.createMc.stop();
                this.createMc = null;
            }
            this.roleMc = null;
            // if (this.timer) {
            // 	this.timer.stop();
            // 	this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateTiem, this);
            // }
            if (this.parent) {
                this.parent.removeChild(this);
            }
            app.GameSocket.ins().isNewRole = true;
        };
        PhoneCreateRoleView.prototype.qqHallSendCreate = function (strInfo) {
            if (strInfo.type == 1) {
                if (strInfo.isLegal == 0) {
                    app.GameSocket.ins().s_255_4(strInfo.Msg, "", 0, this.curSex(), this.curJob());
                }
                else {
                    if (Main.showTipsPhone) {
                        Main.showTipsPhone("输入的文字不合法");
                    }
                }
            }
        };
        PhoneCreateRoleView.prototype.sendCreateRole = function () {
            // if (this.timer) {
            // 	this.timer.stop();
            // 	this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateTiem, this);
            // }
            var str = this.nameInput.text.replace(/\s/g, "");
            if (str.length) {
                var sendStr = this.nameInput.text;
                if (Main.gameParameter.pfID == 10006) {
                    this.qqHallTextFiltering(this.nameInput.text, 1);
                }
                else {
                    app.GameSocket.ins().s_255_4(this.nameInput.text, "", 0, this.curSex(), this.curJob());
                }
            }
            else {
                if (Main.showTipsPhone) {
                    Main.showTipsPhone("角色名不能为空！");
                }
            }
        };
        /**
        * QQ大厅文本敏感词验证
        */
        PhoneCreateRoleView.prototype.qqHallTextFiltering = function (str, type) {
            var checkInfo = "openid=" + Main.gameParameter.userInfo['openid'] + "&openkey=" + Main.gameParameter.userInfo['openkey'] + "&pf=" + Main.gameParameter.userInfo['pf'] + "&format=&msg=" + str + "&type=" + type;
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    //验证成功
                    if (obj && obj['ret'] == 0) {
                        self.qqHallSendCreate({ isLegal: obj['text_result_list_'][0]['check_ret_'], type: type, Msg: obj['text_result_list_'][0]['result_text_'] });
                    }
                    else {
                        if (Main.showTipsPhone) {
                            Main.showTipsPhone("输入的文字不合法");
                        }
                    }
                }
            };
            xhr.open("GET", window['textFiltering'] + checkInfo, true); //提交get请求到服务器
            xhr.send(null);
        };
        PhoneCreateRoleView.prototype.onClick = function (e) {
            app.SoundUtil.ins().playMonster("anniu2_mp3");
            switch (e.currentTarget) {
                case this.createBtn:
                    this.sendCreateRole();
                    break;
                case this.diceBtn:
                    app.GameSocket.ins().s_255_6(this._selectSex);
                case this.nameInput:
                    break;
                case this.boy:
                    this.selectSex = 0;
                    break;
                case this.girl:
                    this.selectSex = 1;
                    break;
                case this.job1:
                    this.selectJob = 1;
                    break;
                case this.job2:
                    this.selectJob = 2;
                    break;
                case this.job3:
                    this.selectJob = 3;
                    break;
            }
        };
        Object.defineProperty(PhoneCreateRoleView.prototype, "selectJob", {
            set: function (jobIndex) {
                this._selectJob = jobIndex;
                this.updateRole();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PhoneCreateRoleView.prototype, "selectSex", {
            set: function (sexIndex) {
                this._selectSex = sexIndex;
                this.updateRole();
            },
            enumerable: true,
            configurable: true
        });
        PhoneCreateRoleView.prototype.updateRole = function () {
            var job = this.curJob();
            var sex = this.curSex();
            this.createRoleMC("create_" + job + "_" + sex);
            for (var i = 1; i <= 3; i++)
                this["job" + i].currentState = "up";
            this["job" + job].currentState = "selected";
            if (sex == 0) {
                this.boy.currentState = "selected";
                this.girl.currentState = "up";
            }
            else {
                this.girl.currentState = "selected";
                this.boy.currentState = "up";
            }
        };
        PhoneCreateRoleView.prototype.setName = function (str) {
            this.nameInput.text = str;
            if (this.isAutoEnter)
                this.sendCreateRole();
        };
        PhoneCreateRoleView.prototype.curJob = function () {
            return this._selectJob;
        };
        PhoneCreateRoleView.prototype.curSex = function () {
            return this._selectSex;
        };
        return PhoneCreateRoleView;
    }(eui.Component));
    app.PhoneCreateRoleView = PhoneCreateRoleView;
    __reflect(PhoneCreateRoleView.prototype, "app.PhoneCreateRoleView");
})(app || (app = {}));
var app;
(function (app) {
    var PhoneLoadingView = (function (_super) {
        __extends(PhoneLoadingView, _super);
        function PhoneLoadingView() {
            var _this = _super.call(this) || this;
            var exml = "\n      <e:Skin class=\"PhoneLoading2Skin\" width=\"1344\" height=\"750\" xmlns:e=\"http://ns.egret.com/eui\">\n      <e:Group horizontalCenter=\"0\" verticalCenter=\"0\" width=\"1344\" height=\"750\">\n      <e:Image id=\"BgImg\" horizontalCenter=\"0\" verticalCenter=\"0\" source=\"mp_jzjm_png\"/>\n\t    <e:Group id=\"loadGrp\" width=\"919\" height=\"136\" bottom=\"90\" horizontalCenter=\"0.5\" touchEnabled=\"false\">\n\t\t<e:Image source=\"login_jdt_t\" bottom=\"45\" horizontalCenter=\"0\" scaleX=\"0.7\" scaleY=\"0.7\" x=\"16\" y=\"79\"/>\n\t\t<e:Rect id=\"rect\" width=\"879\" height=\"14\" fillColor=\"0x140500\" bottom=\"45\" y=\"78\" right=\"20\"/>\n\t\t<e:Image source=\"login_jdt_k\" bottom=\"39\" horizontalCenter=\"0\" scaleX=\"0.7\" scaleY=\"0.7\" x=\"11\" y=\"75\"/>\n\t\t<e:Label id=\"lodingDesc\" text=\"\u6B63\u5728\u8FDB\u5165\u6E38\u620F\" bottom=\"9\" horizontalCenter=\"0\" size=\"27\" textColor=\"0xe5ddcf\" stroke=\"2\" x=\"378\" y=\"101\" />\n\t\t<e:Image id=\"firstLoadImg\" source=\"login_wenzi3\" bottom=\"68\" horizontalCenter=\"0\" x=\"25\" y=\"3\" />\n\t\t<e:Image id=\"reloadImg\" source=\"login_wenzi1\" bottom=\"12\" horizontalCenter=\"337\" x=\"645\" y=\"97\" />\n\t    </e:Group>\n        <e:Image id=\"version1\" source=\"zjt4_png\" bottom=\"53\" scaleX=\"0.75\" scaleY=\"0.75\" horizontalCenter=\"0\" visible=\"false\"/>\n        <e:Image id=\"version2\" bottom=\"7\" scaleX=\"0.75\" scaleY=\"0.75\" horizontalCenter=\"0\" source=\"zjt11_png\" visible=\"false\"/>\n      </e:Group>\n      </e:Skin>\n            ";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "PhoneLoading2Skin";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
        }
        PhoneLoadingView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.BgImg.source = Main.gameParameter.gameLoadImg ? Main.gameParameter.gameLoadImg + "_png" : "mp_jzjm_png";
            app.SoundManager.ins().stopBg();
            //确实需求：默认是怒斩屠龙版号 现在的资质和健康游戏公告是全版本都需要显示  （盛趣只显示健康游戏公告，不显示资质，F1和17comi什么都不显示） 跟卢伟龙确认过需求的
            this.version1.visible = false;
            this.version2.visible = true;
            if (Main.gameParameter.pfID == 10002) {
                //盛趣只展示健康游戏公告
                this.version2.visible = false;
            }
            else if (Main.gameParameter.pfID == 10007 || Main.gameParameter.pfID == 10008 || Main.gameParameter.pfID == 10035) {
                this.version1.visible = this.version2.visible = false;
            }
            if (window['isTraditional']) {
                this.BgImg.source = "mp_jzjm2_png";
                this.reloadImg.source = "login_wenzi4";
                this.firstLoadImg.source = "login_wenzi5";
            }
            this.reloadImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reloadFunction, this);
        };
        PhoneLoadingView.prototype.reloadFunction = function () {
            location.reload();
        };
        PhoneLoadingView.prototype.showLoadProgress = function (progress, des) {
            this.rect.width = (100 - Number(progress)) / 100 * 879;
            this.lodingDesc.text = des + "..." + progress + "%";
        };
        PhoneLoadingView.prototype.removeView = function () {
            this.reloadImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reloadFunction, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PhoneLoadingView;
    }(eui.Component));
    app.PhoneLoadingView = PhoneLoadingView;
    __reflect(PhoneLoadingView.prototype, "app.PhoneLoadingView");
})(app || (app = {}));
var app;
(function (app) {
    var PhoneLoginView = (function (_super) {
        __extends(PhoneLoginView, _super);
        function PhoneLoginView() {
            var _this = _super.call(this) || this;
            _this.httpNum = 0;
            var exml = "<e:Skin class=\"PhoneLoginView2Skin\" width=\"1334\" height=\"750\" xmlns:e=\"http://ns.egret.com/eui\">\n        <e:Group width=\"1334\" height=\"750\" horizontalCenter=\"0\" verticalCenter=\"0\">\n\t\t<e:Image id=\"gameLoginBg\" x=\"0\" y=\"0\" scaleX=\"1\" scaleY=\"1\" source=\"mp_xfjm_png\"/>\n\t\t<e:Image id=\"gameLogo\" source=\"LOGO3_png\" horizontalCenter=\"0\" top=\"114\" x=\"400\" y=\"114\" scaleX=\"1\" scaleY=\"1\"/>\n\t\t<e:Group id=\"enterGrp\" horizontalCenter=\"1\" anchorOffsetY=\"0\" height=\"193\" touchEnabled=\"false\" verticalCenter=\"160\" x=\"480\" y=\"520\" scaleX=\"1\" scaleY=\"1\">\n\t\t\t<e:Image source=\"login_bt_2\" x=\"0\"/>\n\t\t\t<e:Image id=\"selectServerImg\" source=\"login_bt_1\" x=\"231\" y=\"3\"/>\n\t\t\t<e:Image id=\"serverTypeImg\" x=\"19.96\" y=\"15.96\" source=\"login_dian_1\"/>\n\t\t\t<e:Label id=\"serverName\" text=\"\u83B7\u53D6\u533A\u670D\u5217\u8868\u2026\u2026\" textColor=\"0xe5ddcf\" stroke=\"2\" size=\"22\" verticalCenter=\"-68\" horizontalCenter=\"-65\"/>\n\t\t\t<e:Label id=\"serverSelect\" text=\"\u533A\u670D\u9009\u62E9\" textColor=\"0xE5DDCF\" stroke=\"2\" size=\"22\" verticalCenter=\"-68\" horizontalCenter=\"117\" touchEnabled=\"false\"/>\n\t\t\t<e:Button id=\"enterBtn\" icon=\"login_jinru\" horizontalCenter=\"0\" bottom=\"0\">\n\t\t\t<e:skinName>\n\t\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image id=\"iconDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\" scaleY.down=\"0.98\" scaleX.down=\"0.98\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t\t</e:Button>\n\t\t</e:Group>\n        <e:Group id=\"privacyGrp\" y=\"617\" horizontalCenter=\"0\">\n\t\t\t<e:CheckBox id=\"userPrivacy\" label=\"CheckBox\" skinName=\"CheckBox2\"/>\n\t\t\t<e:Label text=\"\u5DF2\u8BE6\u7EC6\u9605\u8BFB\u5E76\u540C\u610F\" size=\"20\" scaleX=\"1\" scaleY=\"1\" textColor=\"0xe5ddcf\"/>\n\t\t\t<e:Label id=\"userLab\" text=\"\u7528\u6237\u534F\u8BAE\" x=\"160\" y=\"10\" size=\"20\" textColor=\"0x00ff1e\"/>\n\t\t\t<e:Label text=\"\u548C\" x=\"170\" y=\"20\" size=\"20\" textColor=\"0xe5ddcf\"/>\n\t\t\t<e:Label id=\"privacyLab\" text=\"\u9690\u79C1\u653F\u7B56\" x=\"180\" y=\"30\" size=\"20\" textColor=\"0x00ff1e\"/>\n\t\t\t<e:layout>\n\t\t\t\t<e:HorizontalLayout horizontalAlign=\"center\" verticalAlign=\"middle\" gap=\"1\"/>\n\t\t\t</e:layout>\n\t\t</e:Group>\n\t\t<e:Group id=\"serverGrp\" horizontalCenter=\"0\" verticalCenter=\"0\" x=\"263\" y=\"135\" scaleX=\"1\" scaleY=\"1\" visible=\"false\">\n\t\t\t<e:Image source=\"login_bg3\"/>\n\t\t\t<e:Image id=\"serverSelectImg\" source=\"login_xzqf\" horizontalCenter=\"0\" top=\"19\"/>\n\t\t\t<e:Scroller height=\"386\" x=\"37\" y=\"68\" width=\"181\">\n\t\t\t<e:List id=\"btnList\" x=\"26.67\">\n\t\t\t\t<e:layout>\n\t\t\t\t<e:VerticalLayout gap=\"-3\"/>\n\t\t\t\t</e:layout>\n\t\t\t</e:List>\n\t\t\t</e:Scroller>\n\t\t\t<e:Scroller width=\"527\" height=\"368\" x=\"243\" y=\"79\">\n\t\t\t<e:List id=\"serverList\">\n\t\t\t\t<e:layout>\n\t\t\t\t<e:TileLayout horizontalGap=\"1\" requestedColumnCount=\"3\"/>\n\t\t\t\t</e:layout>\n\t\t\t</e:List>\n\t\t\t</e:Scroller>\n\t\t\t<e:Button id=\"closeBtn\" label=\"\" y=\"24\" right=\"21\" scaleX=\"1.3\" scaleY=\"1.3\">\n\t\t\t<e:skinName>\n\t\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"Login_guanbi\" source.down=\"Login_guanbi\" scaleY.down=\"0.98\" scaleX.down=\"0.98\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t\t</e:Button>\n\t\t\t<e:Image x=\"146\" y=\"481\" source=\"login_dian_1\"/>\n\t\t\t<e:Image x=\"345\" y=\"481\" source=\"login_dian_3\"/>\n\t\t\t<e:Image x=\"532\" y=\"481\" source=\"login_dian_2\"/>\n\t\t\t<e:Label id=\"serverTypeLab0\" text=\"\u987A \u7545\" x=\"199\" y=\"480\" textColor=\"0x28ee01\" size=\"23\" stroke=\"2\"/>\n\t\t\t<e:Label id=\"serverTypeLab1\" text=\"\u7EF4 \u62A4\" x=\"395\" y=\"480\" size=\"23\" textColor=\"0x807b73\" stroke=\"2\"/>\n\t\t\t<e:Label id=\"serverTypeLab2\" text=\"\u7206 \u6EE1\" x=\"590\" y=\"480\" size=\"23\" textColor=\"0xe50000\" stroke=\"2\"/>\n\t\t</e:Group>\n         <e:Button id=\"gongGaoBtn\" icon=\"main_gonggaoBtn_png\" horizontalCenter=\"533\" verticalCenter=\"-306\" visible=\"false\">\n\t\t\t<e:skinName>\n\t\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t<e:Image horizontalCenter=\"0\" verticalCenter=\"0\" source=\"main_gonggaoBtn_png\" source.down=\"main_gonggaoBtn_png\" source.disabled=\"main_gonggaoBtn_png\" scaleY.down=\"0.98\" scaleX.down=\"0.98\"/>\n\t\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t\t</e:Skin>\n\t\t\t</e:skinName>\n\t\t</e:Button>\n        <e:Group id=\"switchAccountGrp\" touchChildren=\"false\" top=\"116\" left=\"109\" visible=\"false\">\n\t\t\t\t<e:Image scaleX=\"1\" scaleY=\"1\" source=\"login_bt_1\"/>\n\t\t\t\t<e:Label text=\"\u5207\u6362\u8D26\u53F7\" size=\"22\" horizontalCenter=\"0\" verticalCenter=\"0\" textColor=\"0xe5ddcf\" stroke=\"1\"/>\n\t\t</e:Group>\n\t\t<e:Label id=\"versionLab\"  size=\"23\" touchEnabled=\"false\" textColor=\"0xedd7a3\" lineSpacing=\"10\" top=\"45\" left=\"109\"/>\n        <e:Group  id=\"shuangbeiGrp\" horizontalCenter=\"0\" bottom=\"9\" visible=\"false\">\n\t\t\t<e:Image id=\"version1\" scaleX=\"0.7\" scaleY=\"0.7\" horizontalCenter=\"0\" source=\"zjt4_png\"/>\n\t\t\t<e:Image id=\"version2\" y=\"25\" scaleX=\"0.7\" scaleY=\"0.7\" source=\"zjt8_png\" horizontalCenter=\"0\"/>\n\t\t</e:Group>\n\t</e:Group>\n    <e:Image id=\"ageButton\" visible=\"false\" source=\"ageButton_png\" right=\"20\" bottom=\"20\"/>\n</e:Skin>";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "PhoneLoginView2Skin";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
            // this.left = this.right = this.top = this.bottom = 0;
        }
        PhoneLoginView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        PhoneLoginView.prototype.initUI = function () {
            this.privacyGrp.visible = this.shuangbeiGrp.visible = this.switchAccountGrp.visible = false;
            if (gamelib.DeviceUtils.IsNative) {
                app.SoundManager.ins().playBg("xuanze_mp3");
            }
            else {
                if (gamelib.DeviceUtils.IsIOS) {
                    egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
                }
                else {
                    app.SoundManager.ins().playBg("xuanze_mp3");
                }
            }
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.SELECT_SERVICE, {}, null, false); //上报选择服务器
            this.ageButton.visible = true; //Main.gameParameter.pfID == 10010 || Main.gameParameter.pfID == 10024;
            this.enterGrp.visible = true;
            this.serverGrp.visible = false;
            this.gameLoginBg.source = Main.gameParameter.gameLoginImg ? Main.gameParameter.gameLoginImg + "_png" : "mp_xfjm_png";
            this.gameLogo.source = Main.gameParameter.gameLogo ? Main.gameParameter.gameLogo + "_png" : "";
            this.btnList.itemRenderer = app.ListButton;
            this.serverList.itemRenderer = app.ServerItem;
            this.gongGaoBtn.visible = Main.gameParameter.isShowGongGao ? true : false;
            this.selectServerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickLeftList, this);
            this.serverList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickRightList, this);
            this.gongGaoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.ageButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.userLab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.privacyLab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.userPrivacy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.switchAccountGrp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.enterBtn.icon = "login_jinru";
            if (window['isTraditional']) {
                this.serverSelect.text = "區服選擇";
                this.serverTypeLab0.text = "順 暢";
                this.serverTypeLab1.text = "維 護";
                this.serverTypeLab2.text = "爆 滿";
                this.enterBtn.icon = "login_jinru1";
                this.serverSelectImg.source = "login_xzqf1";
            }
            if (Main.gameParameter.isAutoShowGongGao) {
                Main.showGongGaoView();
            }
            if (Main.gameParameter.pfID == 10035) {
                this.gameLogo.top = 94;
                this.enterGrp.verticalCenter = 137;
                this.privacyGrp.visible = this.shuangbeiGrp.visible = true;
                this.version2.visible = false;
                this.version1.source = "zjt10_png ";
                var getData = egret.localStorage.getItem("userCheckBox");
                if (getData && getData == "1") {
                    this.userPrivacy.selected = true;
                }
                else {
                    this.userPrivacy.selected = false;
                }
            }
            var versionStr = "";
            if (Main.gameParameter.gameVersion && Main.gameParameter.gameVersion != "") {
                versionStr = "应用版本:v" + Main.gameParameter.gameVersion;
            }
            if (Main.gameParameter.gameAppVersion && Main.gameParameter.gameAppVersion != "") {
                versionStr += "\n游戏版本:v" + Main.gameParameter.gameAppVersion;
            }
            this.versionLab.text = versionStr;
        };
        PhoneLoginView.prototype.stageClick = function () {
            // egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            app.SoundUtil.ins().playMonster("anniu2_mp3");
            app.SoundManager.ins().playBg("xuanze_mp3");
        };
        PhoneLoginView.prototype.onClick = function (e) {
            switch (e.currentTarget) {
                case this.selectServerImg://选服
                    app.SoundUtil.ins().playMonster("anniu2_mp3");
                    this.serverGrp.visible = true;
                    this.enterGrp.visible = false;
                    break;
                case this.enterBtn://进入游戏
                    if (Main.gameParameter.pfID == 10035) {
                        var getData = egret.localStorage.getItem("userCheckBox");
                        if (!getData || getData == "0") {
                            Main.showTipsPhone("请先勾选用户协议和隐私政策");
                            return;
                        }
                    }
                    app.SoundUtil.ins().playMonster("anniu2_mp3");
                    //调用登录
                    if (this.curServerData) {
                        app.LocationProperty.Param = this.curServerData;
                        app.GameSocket.ins().connectServer();
                        //保存最近登陆
                        var httpReq = new egret.HttpRequest();
                        httpReq.responseType = egret.HttpResponseType.TEXT;
                        httpReq.open(Main.gameParameter.setServiceListdUrl + "?account=" + app.LocationProperty.openID + "&srvid=" + app.LocationProperty.originalSrvid, egret.HttpMethod.GET);
                        httpReq.send();
                    }
                    break;
                case this.closeBtn:
                    app.SoundUtil.ins().playMonster("anniu2_mp3");
                    this.serverGrp.visible = false;
                    this.enterGrp.visible = true;
                    break;
                case this.gongGaoBtn:
                    app.SoundUtil.ins().playMonster("anniu2_mp3");
                    Main.showGongGaoView();
                    break;
                case this.ageButton://提示
                    app.SoundUtil.ins().playMonster("anniu2_mp3");
                    Main.showAgeoView();
                    break;
                case this.userLab:
                    Main.Native_openURL("http://www.bigrnet.com/tiejiazs.html");
                    break;
                case this.privacyLab:
                    Main.Native_openURL("http://www.bigrnet.com/tiejiazs.html");
                    break;
                case this.userPrivacy:
                    egret.localStorage.setItem("userCheckBox", this.userPrivacy.selected ? "1" : "0");
                    break;
                case this.switchAccountGrp:
                    Main.Native_honghuSwitchAccount("1");
                    break;
            }
        };
        PhoneLoginView.prototype.updateInfo = function (arr, curServerInfo) {
            this.btnList.selectedIndex = 0;
            this.curServerData = curServerInfo;
            this.curServerData['user'] = Main.gameParameter.userInfo['uid'];
            if (!this.curServerData['originalSrvid']) {
                this.curServerData['originalSrvid'] = this.curServerData.srvid;
            }
            this.btnList.dataProvider = new eui.ArrayCollection(arr);
            var item = this.btnList.dataProvider.getItemAt(this.btnList.selectedIndex);
            if (item && item.serverlist) {
                this.serverList.dataProvider = new eui.ArrayCollection(item.serverlist.reverse());
            }
            this.setServerName();
        };
        //区服页签切换
        PhoneLoginView.prototype.onClickLeftList = function (e) {
            app.SoundUtil.ins().playMonster("anniu2_mp3");
            var item = this.btnList.dataProvider.getItemAt(this.btnList.selectedIndex);
            if (item && item.serverlist) {
                this.serverList.dataProvider = new eui.ArrayCollection(item.serverlist.slice().reverse());
            }
        };
        //区服信息选择
        PhoneLoginView.prototype.onClickRightList = function (e) {
            app.SoundUtil.ins().playMonster("anniu2_mp3");
            this.curServerData = e.item;
            this.curServerData['user'] = Main.gameParameter.userInfo['uid'];
            if (!this.curServerData['originalSrvid']) {
                this.curServerData['originalSrvid'] = this.curServerData.srvid;
            }
            app.LocationProperty.Param = this.curServerData;
            this.setServerName();
            this.serverGrp.visible = false;
            this.enterGrp.visible = true;
        };
        //红狐IOS切换账号
        PhoneLoginView.prototype.setSwitchAccount = function () {
            this.switchAccountGrp.visible = true;
            console.log("红狐切换账号");
        };
        PhoneLoginView.prototype.setServerName = function () {
            if (this.curServerData) {
                if (this.curServerData['isNew']) {
                    this.serverName.textFlow = [
                        { text: "  " + this.curServerData['serverName'] },
                        { text: "(新)", style: { "textColor": 0x28ee01 } }
                    ];
                }
                else {
                    this.serverName.text = this.curServerData['serverName'];
                }
                this.serverTypeImg.source = +this.curServerData.type != 4 ? "login_dian_" + (+this.curServerData.type) : "login_dian_1";
                app.ReportDataMgr.ins().reporting(app.ReportDataEnum.SELECT_SERVICE, {}, null, false); //上报选择服务器
            }
        };
        PhoneLoginView.prototype.setNewServer = function (serverData) {
            this.curServerData = serverData;
            this.setServerName();
        };
        PhoneLoginView.prototype.removeView = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            this.selectServerImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickLeftList, this);
            this.serverList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickRightList, this);
            this.gongGaoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.ageButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.userLab.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.privacyLab.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.userPrivacy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.switchAccountGrp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PhoneLoginView;
    }(eui.Component));
    app.PhoneLoginView = PhoneLoginView;
    __reflect(PhoneLoginView.prototype, "app.PhoneLoginView");
})(app || (app = {}));
var app;
(function (app) {
    /**
     * 手机登录界面
     */
    var PhoneMainLoginView = (function (_super) {
        __extends(PhoneMainLoginView, _super);
        function PhoneMainLoginView() {
            var _this = _super.call(this) || this;
            var exml = "<e:Skin class=\"PhoneMainLoginSkin\" width=\"1334\" height=\"750\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\">\n\t\t\t\t\t<e:Image id=\"bgImg\" source=\"mp_xfjm_png\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t\t\t<e:Rect id=\"rect\" width=\"300\" height=\"30\" y=\"372\" horizontalCenter=\"0\" fillColor=\"0xffffff\"/>\n\t\t\t\t\t<e:EditableText id=\"input\" width=\"300\" restrict = \"a-z0-9\" text=\"\" y=\"372\" maxChars=\"10\" height=\"30\" horizontalCenter=\"0\" backgroundColor=\"0xffffff\" borderColor=\"0xf2f9f9\" promptColor=\"0x000000\" textColor=\"0x000000\" strokeColor=\"0xfcf7f7\" background=\"true\"  prompt=\"user\"/>\n\t\t\t\t\t<e:Button id=\"signInButton\"  width=\"143\" height=\"62\" icon=\"mp_login_btn2_png\" bottom=\"274\" horizontalCenter=\"0.5\">\n\t\t\t\t\t\t<e:skinName>\n\t\t\t\t\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t\t\t<e:Image id=\"iconDisplay\"  verticalCenter=\"0\" horizontalCenter=\"0\" scaleX.down=\"0.9\" scaleY.down=\"0.9\"/>\n\t\t\t\t\t\t\t</e:Skin>\n\t\t\t\t\t\t</e:skinName>\n\t\t\t\t\t</e:Button>\n\t\t\t\t</e:Skin>";
            EXML.parse(exml);
            _this.skinName = "PhoneMainLoginSkin";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
        }
        PhoneMainLoginView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        PhoneMainLoginView.prototype.initUI = function () {
            this.bgImg.source = Main.gameParameter.gameLoadImg ? Main.gameParameter.gameLoadImg + "_png" : "mp_xfjm_png";
            if (gamelib.DeviceUtils.IsIOS) {
                egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            }
            else {
                app.SoundManager.ins().playBg("xuanze_mp3");
            }
            if (Main.gameParameter.loginType) {
                this.rect.visible = false;
                this.input.visible = false;
                this.signInButton.visible = false;
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
            else {
                egret.ExternalInterface.call("hideLoadingView", "");
                this.signInButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                var signInUID = egret.localStorage.getItem("signInUID");
                if (signInUID && signInUID.length) {
                    this.input.text = signInUID;
                }
            }
            this.signInButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        PhoneMainLoginView.prototype.onEnterFrame = function () {
            console.log("main:手机测试版本 PhoneMainLoginView");
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            Main.Native_onClickLogin({});
            if (Main.gameParameter.pfID != 10003 && Main.gameParameter.pfID != 10010 && Main.gameParameter.pfID != 10011 && Main.gameParameter.pfID != 10012
                && Main.gameParameter.pfID != 10024 && Main.gameParameter.pfID != 10025 && Main.gameParameter.pfID != 10029 && Main.gameParameter.pfID != 10038
                && Main.gameParameter.pfID != 10039) {
                this.signInButton.visible = true;
            }
        };
        PhoneMainLoginView.prototype.onClick = function () {
            if (Main.gameParameter.loginType) {
                Main.Native_onClickLogin({});
            }
            else {
                if (this.input.text.length) {
                    egret.localStorage.setItem("signInUID", this.input.text);
                    Main.Native_onClickLogin({ uid: this.input.text });
                }
            }
        };
        PhoneMainLoginView.prototype.stageClick = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            app.SoundManager.ins().playBg("xuanze_mp3");
        };
        PhoneMainLoginView.prototype.removeView = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            this.signInButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PhoneMainLoginView;
    }(eui.Component));
    app.PhoneMainLoginView = PhoneMainLoginView;
    __reflect(PhoneMainLoginView.prototype, "app.PhoneMainLoginView");
})(app || (app = {}));
var app;
(function (app) {
    var PhoneServerListInfo = (function () {
        function PhoneServerListInfo() {
            this.httpNum = 0;
            this.serverArr = [];
            this.leftStrArr = [];
        }
        PhoneServerListInfo.prototype.getServerInfo = function () {
            //拉取服务器列表
            if (this.httpReq) {
                this.httpReq.removeEventListener(egret.Event.COMPLETE, this.getServiceComp, this);
                this.httpReq.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.getServiceErr, this);
            }
            this.httpReq = new egret.HttpRequest();
            this.httpReq.addEventListener(egret.Event.COMPLETE, this.getServiceComp, this);
            this.httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.getServiceErr, this);
            this.httpReq.open(Main.gameParameter.serviceListdUrl + "?account=" + Main.gameParameter.userInfo['uid'] + "&pf=" + Main.gameParameter.pf + "&t=" + egret.getTimer(), egret.HttpMethod.GET);
            this.httpReq.send();
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            }
            this.timer = new egret.Timer(5000, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.httpNum += 1;
        };
        /**
         * 服务器列表拉取次数检测
         */
        PhoneServerListInfo.prototype.timerComFunc = function () {
            if (Main && Main.showTipsPhone) {
                Main.showTipsPhone("正在拉取服务器");
            }
            this.getServerInfo();
        };
        //拉取成功
        PhoneServerListInfo.prototype.getServiceComp = function (e) {
            //  window['getServiceErr'](1);
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.GET_SERVER_LIST, { result: 1 }, null, false);
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.httpNum = 0;
            this.serverArr = [];
            this.leftStrArr = [];
            var tmppLoader = e.target;
            if (tmppLoader.response == null || tmppLoader.response == 0 || tmppLoader.response == "") {
                if (Main && Main.showTipsPhone) {
                    Main.showTipsPhone("暂无服务器！");
                }
                return;
            }
            var data = {};
            try {
                data = JSON.parse(tmppLoader.response);
            }
            catch (error) {
                alert("服务器请求超时，请退出游戏重新打开！");
            }
            var serverList = [];
            var len = 0;
            if (data.serverlist) {
                len = data.serverlist.length;
            }
            //获取最新服务器
            var serData;
            for (var i = len - 1; i >= 0; i--) {
                serData = data.serverlist[i];
                if (serData['serverlist']) {
                    for (var k = serData.serverlist.length - 1; k >= 0; k--) {
                        app.LocationProperty.newestServer = serData.serverlist[k];
                        app.LocationProperty.newestServer['user'] = Main.gameParameter.userInfo['uid'];
                        if (!app.LocationProperty.newestServer['originalSrvid']) {
                            app.LocationProperty.newestServer['originalSrvid'] = app.LocationProperty.newestServer.srvid;
                        }
                        break;
                    }
                }
            }
            //自己选择区服
            var arr = [];
            var loginObj = [];
            var loginAry = []; //最近登录服务器
            for (var i = 0; i < len; i++) {
                serData = data.serverlist[i];
                if (serData['serverlist'] && serData['serverlist'].length > 0) {
                    arr.push(serData);
                    if (data.login && data.login.length > 0) {
                        for (var k = 0; k < serData.serverlist.length; k++) {
                            if (data.login.indexOf(serData.serverlist[k]['originalSrvid'] + "") != -1) {
                                loginObj[serData.serverlist[k]['originalSrvid'] + ""] = serData.serverlist[k];
                            }
                        }
                    }
                }
            }
            if (arr.length > 0) {
                //获取最新服务器
                var newAry = null;
                var serverlist = arr[arr.length - 1]['serverlist'];
                if (serverlist && serverlist.length) {
                    serverlist[serverlist.length - 1]['isNew'] = true;
                    newAry = [PhoneServerListInfo.copyDataHandler(serverlist[serverlist.length - 1])];
                    app.LocationProperty.recommendServer = PhoneServerListInfo.copyDataHandler(newAry[0]);
                }
                if (data.login && data.login.length > 0) {
                    for (var i = 0; i < data.login.length; i++) {
                        if (loginObj[data.login[i]]) {
                            loginAry.push(loginObj[data.login[i]]);
                        }
                    }
                }
                if (loginAry.length > 0) {
                    Main.phoneLoginView.updateInfo(arr, loginAry[0]);
                    loginAry = loginAry.reverse();
                    arr = arr.reverse();
                    arr.unshift({ name: "最近登录", serverlist: loginAry });
                    if (newAry) {
                        arr.unshift({ name: "推荐新服", serverlist: newAry });
                    }
                }
                else {
                    var serItem = null;
                    for (var i = len - 1; i >= 0; i--) {
                        serData = data.serverlist[i];
                        for (var p = serData.serverlist.length - 1; p >= 0; p--) {
                            if (serData.serverlist[p].type != 3 || serData.serverlist[p].type != 4) {
                                serItem = serData.serverlist[p];
                                break;
                            }
                        }
                        if (serItem) {
                            break;
                        }
                    }
                    if (serItem) {
                        arr = arr.reverse();
                        if (newAry) {
                            arr.unshift({ name: "推荐新服", serverlist: newAry });
                        }
                        Main.phoneLoginView.updateInfo(arr, serItem);
                    }
                }
            }
            else {
                if (Main.gameParameter.pfID == 10010) {
                    Main.startServerTips("【先遣1服】将于8月19日14点正式开服，敬请期待。");
                }
            }
        };
        /**
         * 深度复制
         * @param _data
         */
        PhoneServerListInfo.copyDataHandler = function (obj) {
            var newObj;
            if (obj instanceof Array) {
                newObj = [];
            }
            else if (obj instanceof Object) {
                newObj = {};
            }
            else {
                return obj;
            }
            var keys = Object.keys(obj);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                newObj[key] = this.copyDataHandler(obj[key]);
            }
            return newObj;
        };
        PhoneServerListInfo.prototype.getServiceErr = function () {
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.GET_SERVER_LIST, { result: 0 }, null, false);
            // if (this.parent['getServerResult']) {
            //     this.parent['getServerResult'](0);
            // }
            // window['getServiceErr'](0);
        };
        PhoneServerListInfo.prototype.onClickRightList = function (e) {
            this.selectSerInfo = e.item;
            if (this.selectSerInfo) {
                window['selectInfo'](this.selectSerInfo);
            }
        };
        PhoneServerListInfo.prototype.onButtonClick = function () {
            if (this.selectSerInfo == null) {
                // alert("请选择服务器！");
                if (Main && Main.showTipsPhone) {
                    Main.showTipsPhone("请选择服务器！");
                }
                return;
            }
            window['onClickLogin'](this.selectSerInfo);
        };
        return PhoneServerListInfo;
    }());
    app.PhoneServerListInfo = PhoneServerListInfo;
    __reflect(PhoneServerListInfo.prototype, "app.PhoneServerListInfo");
})(app || (app = {}));
var __reflect = this && this.__reflect || function (t, r, h) { t.__class__ = r, h ? h.push(r) : h = [r], t.__types__ = t.__types__ ? h.concat(t.__types__) : h; }, md5 = function () { function t() { this.hexcase = 0, this.b64pad = ""; } return t.prototype.hex_md5 = function (t) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t))); }, t.prototype.b64_md5 = function (t) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t))); }, t.prototype.any_md5 = function (t, r) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)), r); }, t.prototype.hex_hmac_md5 = function (t, r) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r))); }, t.prototype.b64_hmac_md5 = function (t, r) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r))); }, t.prototype.any_hmac_md5 = function (t, r, h) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r)), h); }, t.prototype.md5_vm_test = function () { return "900150983cd24fb0d6963f7d28e17f72" == this.hex_md5("abc").toLowerCase(); }, t.prototype.rstr_md5 = function (t) { return this.binl2rstr(this.binl_md5(this.rstr2binl(t), 8 * t.length)); }, t.prototype.rstr_hmac_md5 = function (t, r) { var h = this.rstr2binl(t); h.length > 16 && (h = this.binl_md5(h, 8 * t.length)); for (var i = Array(16), s = Array(16), _ = 0; 16 > _; _++)
    i[_] = 909522486 ^ h[_], s[_] = 1549556828 ^ h[_]; var d = this.binl_md5(i.concat(this.rstr2binl(r)), 512 + 8 * r.length); return this.binl2rstr(this.binl_md5(s.concat(d), 640)); }, t.prototype.rstr2hex = function (t) { try {
    this.hexcase;
}
catch (r) {
    this.hexcase = 0;
} for (var h, i = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", s = "", _ = 0; _ < t.length; _++)
    h = t.charCodeAt(_), s += i.charAt(h >>> 4 & 15) + i.charAt(15 & h); return s; }, t.prototype.rstr2b64 = function (t) { try {
    this.b64pad;
}
catch (r) {
    this.b64pad = "";
} for (var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = "", s = t.length, _ = 0; s > _; _ += 3)
    for (var d = t.charCodeAt(_) << 16 | (s > _ + 1 ? t.charCodeAt(_ + 1) << 8 : 0) | (s > _ + 2 ? t.charCodeAt(_ + 2) : 0), n = 0; 4 > n; n++)
        i += 8 * _ + 6 * n > 8 * t.length ? this.b64pad : h.charAt(d >>> 6 * (3 - n) & 63); return i; }, t.prototype.rstr2any = function (t, r) { var h, i, s, _, d, n = r.length, e = Array(Math.ceil(t.length / 2)); for (h = 0; h < e.length; h++)
    e[h] = t.charCodeAt(2 * h) << 8 | t.charCodeAt(2 * h + 1); var o = Math.ceil(8 * t.length / (Math.log(r.length) / Math.log(2))), m = Array(o); for (i = 0; o > i; i++) {
    for (d = Array(), _ = 0, h = 0; h < e.length; h++)
        _ = (_ << 16) + e[h], s = Math.floor(_ / n), _ -= s * n, (d.length > 0 || s > 0) && (d[d.length] = s);
    m[i] = _, e = d;
} var f = ""; for (h = m.length - 1; h >= 0; h--)
    f += r.charAt(m[h]); return f; }, t.prototype.str2rstr_utf8 = function (t) { for (var r, h, i = "", s = -1; ++s < t.length;)
    r = t.charCodeAt(s), h = s + 1 < t.length ? t.charCodeAt(s + 1) : 0, r >= 55296 && 56319 >= r && h >= 56320 && 57343 >= h && (r = 65536 + ((1023 & r) << 10) + (1023 & h), s++), 127 >= r ? i += String.fromCharCode(r) : 2047 >= r ? i += String.fromCharCode(192 | r >>> 6 & 31, 128 | 63 & r) : 65535 >= r ? i += String.fromCharCode(224 | r >>> 12 & 15, 128 | r >>> 6 & 63, 128 | 63 & r) : 2097151 >= r && (i += String.fromCharCode(240 | r >>> 18 & 7, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | 63 & r)); return i; }, t.prototype.str2rstr_utf16le = function (t) { for (var r = "", h = 0; h < t.length; h++)
    r += String.fromCharCode(255 & t.charCodeAt(h), t.charCodeAt(h) >>> 8 & 255); return r; }, t.prototype.str2rstr_utf16be = function (t) { for (var r = "", h = 0; h < t.length; h++)
    r += String.fromCharCode(t.charCodeAt(h) >>> 8 & 255, 255 & t.charCodeAt(h)); return r; }, t.prototype.rstr2binl = function (t) { for (var r = Array(t.length >> 2), h = 0; h < r.length; h++)
    r[h] = 0; for (var h = 0; h < 8 * t.length; h += 8)
    r[h >> 5] |= (255 & t.charCodeAt(h / 8)) << h % 32; return r; }, t.prototype.binl2rstr = function (t) { for (var r = "", h = 0; h < 32 * t.length; h += 8)
    r += String.fromCharCode(t[h >> 5] >>> h % 32 & 255); return r; }, t.prototype.binl_md5 = function (t, r) { t[r >> 5] |= 128 << r % 32, t[(r + 64 >>> 9 << 4) + 14] = r; for (var h = 1732584193, i = -271733879, s = -1732584194, _ = 271733878, d = 0; d < t.length; d += 16) {
    var n = h, e = i, o = s, m = _;
    h = this.md5_ff(h, i, s, _, t[d + 0], 7, -680876936), _ = this.md5_ff(_, h, i, s, t[d + 1], 12, -389564586), s = this.md5_ff(s, _, h, i, t[d + 2], 17, 606105819), i = this.md5_ff(i, s, _, h, t[d + 3], 22, -1044525330), h = this.md5_ff(h, i, s, _, t[d + 4], 7, -176418897), _ = this.md5_ff(_, h, i, s, t[d + 5], 12, 1200080426), s = this.md5_ff(s, _, h, i, t[d + 6], 17, -1473231341), i = this.md5_ff(i, s, _, h, t[d + 7], 22, -45705983), h = this.md5_ff(h, i, s, _, t[d + 8], 7, 1770035416), _ = this.md5_ff(_, h, i, s, t[d + 9], 12, -1958414417), s = this.md5_ff(s, _, h, i, t[d + 10], 17, -42063), i = this.md5_ff(i, s, _, h, t[d + 11], 22, -1990404162), h = this.md5_ff(h, i, s, _, t[d + 12], 7, 1804603682), _ = this.md5_ff(_, h, i, s, t[d + 13], 12, -40341101), s = this.md5_ff(s, _, h, i, t[d + 14], 17, -1502002290), i = this.md5_ff(i, s, _, h, t[d + 15], 22, 1236535329), h = this.md5_gg(h, i, s, _, t[d + 1], 5, -165796510), _ = this.md5_gg(_, h, i, s, t[d + 6], 9, -1069501632), s = this.md5_gg(s, _, h, i, t[d + 11], 14, 643717713), i = this.md5_gg(i, s, _, h, t[d + 0], 20, -373897302), h = this.md5_gg(h, i, s, _, t[d + 5], 5, -701558691), _ = this.md5_gg(_, h, i, s, t[d + 10], 9, 38016083), s = this.md5_gg(s, _, h, i, t[d + 15], 14, -660478335), i = this.md5_gg(i, s, _, h, t[d + 4], 20, -405537848), h = this.md5_gg(h, i, s, _, t[d + 9], 5, 568446438), _ = this.md5_gg(_, h, i, s, t[d + 14], 9, -1019803690), s = this.md5_gg(s, _, h, i, t[d + 3], 14, -187363961), i = this.md5_gg(i, s, _, h, t[d + 8], 20, 1163531501), h = this.md5_gg(h, i, s, _, t[d + 13], 5, -1444681467), _ = this.md5_gg(_, h, i, s, t[d + 2], 9, -51403784), s = this.md5_gg(s, _, h, i, t[d + 7], 14, 1735328473), i = this.md5_gg(i, s, _, h, t[d + 12], 20, -1926607734), h = this.md5_hh(h, i, s, _, t[d + 5], 4, -378558), _ = this.md5_hh(_, h, i, s, t[d + 8], 11, -2022574463), s = this.md5_hh(s, _, h, i, t[d + 11], 16, 1839030562), i = this.md5_hh(i, s, _, h, t[d + 14], 23, -35309556), h = this.md5_hh(h, i, s, _, t[d + 1], 4, -1530992060), _ = this.md5_hh(_, h, i, s, t[d + 4], 11, 1272893353), s = this.md5_hh(s, _, h, i, t[d + 7], 16, -155497632), i = this.md5_hh(i, s, _, h, t[d + 10], 23, -1094730640), h = this.md5_hh(h, i, s, _, t[d + 13], 4, 681279174), _ = this.md5_hh(_, h, i, s, t[d + 0], 11, -358537222), s = this.md5_hh(s, _, h, i, t[d + 3], 16, -722521979), i = this.md5_hh(i, s, _, h, t[d + 6], 23, 76029189), h = this.md5_hh(h, i, s, _, t[d + 9], 4, -640364487), _ = this.md5_hh(_, h, i, s, t[d + 12], 11, -421815835), s = this.md5_hh(s, _, h, i, t[d + 15], 16, 530742520), i = this.md5_hh(i, s, _, h, t[d + 2], 23, -995338651), h = this.md5_ii(h, i, s, _, t[d + 0], 6, -198630844), _ = this.md5_ii(_, h, i, s, t[d + 7], 10, 1126891415), s = this.md5_ii(s, _, h, i, t[d + 14], 15, -1416354905), i = this.md5_ii(i, s, _, h, t[d + 5], 21, -57434055), h = this.md5_ii(h, i, s, _, t[d + 12], 6, 1700485571), _ = this.md5_ii(_, h, i, s, t[d + 3], 10, -1894986606), s = this.md5_ii(s, _, h, i, t[d + 10], 15, -1051523), i = this.md5_ii(i, s, _, h, t[d + 1], 21, -2054922799), h = this.md5_ii(h, i, s, _, t[d + 8], 6, 1873313359), _ = this.md5_ii(_, h, i, s, t[d + 15], 10, -30611744), s = this.md5_ii(s, _, h, i, t[d + 6], 15, -1560198380), i = this.md5_ii(i, s, _, h, t[d + 13], 21, 1309151649), h = this.md5_ii(h, i, s, _, t[d + 4], 6, -145523070), _ = this.md5_ii(_, h, i, s, t[d + 11], 10, -1120210379), s = this.md5_ii(s, _, h, i, t[d + 2], 15, 718787259), i = this.md5_ii(i, s, _, h, t[d + 9], 21, -343485551), h = this.safe_add(h, n), i = this.safe_add(i, e), s = this.safe_add(s, o), _ = this.safe_add(_, m);
} return [h, i, s, _]; }, t.prototype.md5_cmn = function (t, r, h, i, s, _) { return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(r, t), this.safe_add(i, _)), s), h); }, t.prototype.md5_ff = function (t, r, h, i, s, _, d) { return this.md5_cmn(r & h | ~r & i, t, r, s, _, d); }, t.prototype.md5_gg = function (t, r, h, i, s, _, d) { return this.md5_cmn(r & i | h & ~i, t, r, s, _, d); }, t.prototype.md5_hh = function (t, r, h, i, s, _, d) { return this.md5_cmn(r ^ h ^ i, t, r, s, _, d); }, t.prototype.md5_ii = function (t, r, h, i, s, _, d) { return this.md5_cmn(h ^ (r | ~i), t, r, s, _, d); }, t.prototype.safe_add = function (t, r) { var h = (65535 & t) + (65535 & r), i = (t >> 16) + (r >> 16) + (h >> 16); return i << 16 | 65535 & h; }, t.prototype.bit_rol = function (t, r) { return t << r | t >>> 32 - r; }, t; }();
__reflect(md5.prototype, "md5");
var app;
(function (app) {
    var ReportDataEnum;
    (function (ReportDataEnum) {
        // --------1 - 1000 登录相关--------
        /** 进入游戏登录界面 */
        ReportDataEnum[ReportDataEnum["LOGIN_VIEW"] = 1] = "LOGIN_VIEW";
        /** 选择服务器 */
        ReportDataEnum[ReportDataEnum["SELECT_SERVICE"] = 2] = "SELECT_SERVICE";
        /** 点击登陆 */
        ReportDataEnum[ReportDataEnum["CLICK_LOGIN"] = 3] = "CLICK_LOGIN";
        /** 登录成功 */
        ReportDataEnum[ReportDataEnum["LOGIN_SUCCESS"] = 4] = "LOGIN_SUCCESS";
        /** 连接服务器 */
        ReportDataEnum[ReportDataEnum["LINK_SERVER"] = 5] = "LINK_SERVER";
        /** 连接服务器成功 */
        ReportDataEnum[ReportDataEnum["LINK_SERVER_SUCCESS"] = 6] = "LINK_SERVER_SUCCESS";
        /** 连接服务器失败 */
        ReportDataEnum[ReportDataEnum["LINK_SERVER_FAIL"] = 7] = "LINK_SERVER_FAIL";
        /** 服务区断开 */
        ReportDataEnum[ReportDataEnum["LINK_SERVER_CLOSE"] = 8] = "LINK_SERVER_CLOSE";
        /** 切换角色 */
        ReportDataEnum[ReportDataEnum["SWITCH_ROLE"] = 9] = "SWITCH_ROLE";
        /** 进入创建界面 */
        ReportDataEnum[ReportDataEnum["CREATE_ROLE_VIEW"] = 10] = "CREATE_ROLE_VIEW";
        /** 创角 */
        ReportDataEnum[ReportDataEnum["CLICK_CREATE_ROLE"] = 11] = "CLICK_CREATE_ROLE";
        /** 角色创建成功 */
        ReportDataEnum[ReportDataEnum["CREATE_ROLE_SUCCESS"] = 12] = "CREATE_ROLE_SUCCESS";
        /** 获取服务器 */
        ReportDataEnum[ReportDataEnum["GET_SERVER_LIST"] = 13] = "GET_SERVER_LIST";
        /** 聊天上报 */
        ReportDataEnum[ReportDataEnum["Chat"] = 15] = "Chat";
        /** 验证账号 */
        ReportDataEnum[ReportDataEnum["UserCheck"] = 16] = "UserCheck";
        /** 点击创角 */
        ReportDataEnum[ReportDataEnum["ONCLICK_CREATE"] = 17] = "ONCLICK_CREATE";
        /** 点击欢迎页 */
        ReportDataEnum[ReportDataEnum["ONCLICK_WELCOME"] = 18] = "ONCLICK_WELCOME";
        /**到达出生点 进入主界面 */
        ReportDataEnum[ReportDataEnum["ENTERMAIN"] = 19] = "ENTERMAIN";
        /**完成首个任务 */
        ReportDataEnum[ReportDataEnum["COMPLETETASK"] = 20] = "COMPLETETASK";
        /** 微端下载 */
        ReportDataEnum[ReportDataEnum["MICROTERMS_DOWNLOAD"] = 21] = "MICROTERMS_DOWNLOAD";
        /** 欢迎确定 */
        ReportDataEnum[ReportDataEnum["ONCLICK_WELCOME2"] = 22] = "ONCLICK_WELCOME2";
        /** 获取角色列表成功*/
        ReportDataEnum[ReportDataEnum["GET_ROLE_LIST"] = 23] = "GET_ROLE_LIST";
        /** 加载主程序成功*/
        ReportDataEnum[ReportDataEnum["LOAD_GAMEAPP"] = 24] = "LOAD_GAMEAPP";
        //--------1001 - 2000 属性变化相关----------
        /** 等级变化 */
        ReportDataEnum[ReportDataEnum["UPDATE_LEVEL"] = 1000] = "UPDATE_LEVEL";
        /** 战力变化 */
        ReportDataEnum[ReportDataEnum["UPDATE_POWER"] = 1001] = "UPDATE_POWER";
        /** 角色改名 */
        ReportDataEnum[ReportDataEnum["CHANGE_NAME"] = 1002] = "CHANGE_NAME";
        //--------2001 - 3000 支付相关--------
        /** 点击支付 */
        ReportDataEnum[ReportDataEnum["CLICK_PAY"] = 2001] = "CLICK_PAY";
        //错误
        ReportDataEnum[ReportDataEnum["ERROR"] = 9999] = "ERROR";
        // ------ 加载游戏上报-----
        /** 收到平台账号 */
        ReportDataEnum[ReportDataEnum["Report_10000"] = 10000] = "Report_10000";
        /** 签名验证 */
        ReportDataEnum[ReportDataEnum["Report_10001"] = 10001] = "Report_10001";
    })(ReportDataEnum = app.ReportDataEnum || (app.ReportDataEnum = {}));
    /**
     * 信息上报
     */
    var ReportDataMgr = (function () {
        function ReportDataMgr() {
            this.msgAry = [];
            this.jobAry = ["", "战士", "法师", "道士"];
        }
        ReportDataMgr.ins = function () {
            this._ins = this._ins || new ReportDataMgr();
            return this._ins;
        };
        /**
         * 打点上报
         * @param type {ReportDataEnum} 上报类型
         * @param info {Object} 具体上报信息
         * @param param {Object} 额外参数
         * @param isReport 是否延迟上报，默认延迟
         */
        ReportDataMgr.prototype.reporting = function (type, info, param, isReport) {
            if (info === void 0) { info = null; }
            if (param === void 0) { param = null; }
            if (isReport === void 0) { isReport = true; }
            if (app.GameSocket.IsCrossService) {
                if (type != ReportDataEnum.Chat) {
                    return;
                }
            }
            egret.log("reporttype:" + type);
            if (Main.gameParameter.isReport) {
                var loginType = window['loginWay'] ? 1 : 0;
                var msgInfo = {
                    type: type, counter: Main.gameParameter.pfID, env: Main.gameParameter.game + "|" + loginType + "",
                    time: Date.parse(new Date().toString()) / 1000
                };
                msgInfo['sign'] = new md5().hex_md5(type + msgInfo.env + msgInfo.time + Main.gameParameter.pfID + "ddcqweb");
                var classZ = egret.getDefinitionByName("app.EntityMgr");
                var lProperty = egret.getDefinitionByName("app.LocationProperty");
                var mapInfo = egret.getDefinitionByName("app.GameMap");
                var vipData = egret.getDefinitionByName("app.VipData");
                if (info && classZ) {
                    var player = classZ.ins().getPayer;
                    if (player && player.propSet) {
                        info['roleName'] = player.propSet.getName(); //角色名称	
                        info['level'] = player.propSet.getLevel(); //等级
                        info['zsLevel'] = player.propSet.getZSLevel(); //转生等级
                        info['sex'] = player.propSet.getSex(); //性别
                        info['job'] = player.propSet.getAP_JOB(); //职业
                        info['guildName'] = player.propSet.getGuildName(); //工会名字
                        info['moneyNums'] = player.propSet.getNotBindYuanBao(); //剩余元宝
                        // info['vipLv'] = player.propSet.getVipState();//VIP
                        info['guildID'] = player.propSet.getGuildId(); //工会ID
                        info['roleCreateTime'] = player.propSet.getRoleCreateTime(); //角色创建时间
                        // info['roleId'] = lProperty.openID;//
                    }
                    if (lProperty) {
                        info['uid'] = lProperty.openID; //账号ID
                        info['roleId'] = lProperty.roleId; //角色ID
                        info['serverId'] = lProperty.srvid; //服务器Id
                        info['serverName'] = lProperty.srvname; //服务器名称
                        info['serverOriginaId'] = lProperty.originalSrvid; //服务器Id(合服前)
                    }
                    if (mapInfo) {
                        info['mapID'] = mapInfo.mapID; //地图ID
                    }
                    if (vipData) {
                        //不直接使用玩家身上的vip状态，使用转化后的vip等级
                        info['vipLv'] = vipData.ins().getMyVipLv();
                    }
                }
                else {
                    info = {};
                }
                info['uid'] = Main.gameParameter.userInfo['uid'];
                if (info['roleId'] == undefined) {
                    info['roleId'] = "";
                }
                info['serverAlias'] = Main.gameParameter.userInfo['server'] ? Main.gameParameter.userInfo['server'] : lProperty ? lProperty.serverAlias : ""; //渠道服务器别名
                if (param) {
                    for (var key in param) {
                        info[key] = param[key];
                    }
                }
                //上报给平台
                if (Main.gameParameter.isReportPF) {
                    msgInfo['data'] = info;
                    if (gamelib.DeviceUtils.IsNative) {
                        this.ReportingFunction(msgInfo);
                    }
                    else {
                        window['ReportingFunction'](msgInfo);
                    }
                }
                if (info && !gamelib.DeviceUtils.IsNative && Main.gameParameter.pfID != 10046) {
                    for (var key in info) {
                        info[key] = encodeURIComponent(info[key]);
                    }
                }
                msgInfo['data'] = info;
                var str = JSON.stringify(msgInfo);
                this.msgAry.push(str);
                msgInfo = null;
                this.callbackFun();
            }
        };
        ReportDataMgr.prototype.callbackFun = function () {
            if (!this.httpReq) {
                if (this.msgAry.length) {
                    var msg = this.msgAry.shift();
                    this.httpReq = new egret.HttpRequest();
                    this.httpReq.addEventListener(egret.Event.COMPLETE, this.getServiceComp, this);
                    this.httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.getServiceComp, this);
                    this.httpReq.open(Main.gameParameter.reportURL + "?msg=" + msg, egret.HttpMethod.GET);
                    this.httpReq.send();
                    app.TimerManager.ins().doTimer(5000, 1, this.getServiceComp, this);
                }
            }
        };
        ReportDataMgr.prototype.getServiceComp = function (e) {
            app.TimerManager.ins().remove(this.getServiceComp, this);
            this.httpReq.removeEventListener(egret.Event.COMPLETE, this.getServiceComp, this);
            this.httpReq.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.getServiceComp, this);
            this.httpReq = null;
            this.callbackFun();
        };
        ReportDataMgr.prototype.ReportingFunction = function (msg) {
            if (msg) {
                if (Main.gameParameter.pfID == 10007) {
                    if (msg['type'] == 12) {
                        var createTime = this.format_2();
                        var msgInfo = "?user_id=" + msg['data']['uid'] +
                            "&game_id=60" +
                            "&server_id=" + msg['data']['serverId'] +
                            "&role_id=" + msg.data['roleId'] +
                            "&role_name=" + msg.data['roleName'] +
                            "&create_date=" + createTime +
                            "&ts=" + Date.parse(new Date().toString()) / 1000;
                        var httpReq = new egret.HttpRequest();
                        httpReq.open(Main.gameParameter.reportURLPF + msgInfo, egret.HttpMethod.GET);
                        httpReq.send();
                    }
                }
                else if (Main.gameParameter.pfID == 10010 || Main.gameParameter.pfID == 10024) {
                    if (msg['type'] == 12 || msg['type'] == 4 || msg['type'] == 1000) {
                        var vipLevel = this.getVipLv(msg['data']['vipLv']);
                        var jobStr = msg['data']['job'] == 1 ? "战士" : msg['data']['job'] == 2 ? "法师" : "道士";
                        Main.Native_reportPlayerData({
                            dataType: msg['type'],
                            serverID: msg['data']['serverId'],
                            serverName: msg['data']['serverName'],
                            roleID: msg['data']['roleId'],
                            roleName: msg['data']['roleName'],
                            roleLevel: msg['data']['level'],
                            moneyNum: msg['data']['moneyNums'],
                            roleCreateTime: msg['data']['roleCreateTime'] ? Math.floor(msg['data']['roleCreateTime'] / 1000) : "",
                            roleLevelUpTime: Math.floor(new Date().getTime() / 1000),
                            vip: vipLevel,
                            roleCareer: jobStr
                        });
                    }
                }
                else {
                    if (msg['type'] == 2 || msg['type'] == 12 || msg['type'] == 4 || msg['type'] == 1000) {
                        var vipLevel = this.getVipLv(msg['data']['vipLv']);
                        var playerData = {
                            dataType: msg['type'],
                            moneyNum: msg['data']['moneyNums'] ? msg['data']['moneyNums'] : 0,
                            guildID: msg['data']['guildID'] ? msg['data']['guildID'] : 0,
                            guildName: msg['data']['guildName'] ? msg['data']['guildName'] : "",
                            roleCreateTime: msg['data']['roleCreateTime'] ? Math.floor(msg['data']['roleCreateTime'] / 1000) : "0",
                            roleID: msg['data']['roleId'],
                            roleId: msg['data']['roleId'],
                            roleName: msg['data']['roleName'] ? msg['data']['roleName'] : "",
                            roleLevel: msg['data']['level'] ? msg['data']['level'] : 1,
                            roleLevelUpTime: Math.floor(new Date().getTime() / 1000),
                            zsLevel: msg['data']['zsLevel'] ? msg['data']['zsLevel'] : 0,
                            uid: msg['data']['uid'],
                            serverID: msg['data']['serverId'],
                            serverName: msg['data']['serverName'],
                            serverOriginaId: msg['data']['serverOriginaId'],
                            vip: vipLevel,
                            roleSex: msg['data']['sex'] ? "女" : msg['data']['sex'] == 0 ? "男" : "",
                            professionId: msg['data']['job'] ? msg['data']['job'] : 0,
                            profession: msg['data']['job'] ? this.jobAry[msg['data']['job']] : ""
                        };
                        if (Main.gameParameter.pfID == 10011) {
                            // let zs = player.propSet.getZSLevel()
                            if (playerData.zsLevel) {
                                playerData.roleLevel = (playerData.zsLevel * 1000) + playerData.roleLevel; //等级
                            }
                        }
                        else if (Main.gameParameter.pfID == 10041) {
                            playerData.serverID = msg['data']['serverOriginaId'] % 10000;
                        }
                        else if (Main.gameParameter.pfID == 10012 || Main.gameParameter.pfID == 10041) {
                            if (playerData.dataType == 4) {
                                playerData.dataType = 1000;
                            }
                        }
                        else if (Main.gameParameter.pfID == 10046) {
                            playerData.serverOriginaId = msg['data']['serverOriginaId'] % 1000;
                        }
                        Main.Native_reportPlayerData(playerData);
                    }
                }
            }
        };
        ReportDataMgr.prototype.format_2 = function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1; //返回的月份从0-11；
            var day = date.getDate();
            var hours = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            return year + "-" + formatTimeNum(month) + "-" + formatTimeNum(day) + " " + formatTimeNum(hours) + ":" + formatTimeNum(minute) + ":" + formatTimeNum(second);
        };
        ReportDataMgr.prototype.getVipLv = function (lv) {
            var vipLv = 0;
            if (lv) {
                for (var i = 4; i < 10; i++) {
                    var state = (lv >> (i - 1)) & 1;
                    if (state) {
                        vipLv = i - 3;
                    }
                }
            }
            return vipLv;
        };
        return ReportDataMgr;
    }());
    app.ReportDataMgr = ReportDataMgr;
    __reflect(ReportDataMgr.prototype, "app.ReportDataMgr");
    function formatTimeNum(t, k) {
        if (k === void 0) { k = 1; }
        return t >= 10 ? t.toString() : (k == 0 ? t.toString() : "0" + t);
    }
})(app || (app = {}));
/*
 * @Author: FLK
 * @Date: 2020-10-22 16:03:38
 * @LastEditTime: 2020-11-02 14:29:05
 * @LastEditors: FLK
 * @Description:
 * @FilePath: \GameApp2-YY\src\web\res\ResDirEnum.ts
 * @symbol_custom_string_obkoro1: 可以输入预定的版权声明、个性签名、空行等
 */
var ResDirEnum = (function () {
    function ResDirEnum() {
    }
    ResDirEnum.Init = function () {
        ResDirEnum.RES_DIR_BLOOD = ResDirEnum.RES_DIR + "blood/";
        ResDirEnum.RES_DIR_BODY = ResDirEnum.RES_DIR + "body/";
        ResDirEnum.RES_DIR_BODY_SUIT = ResDirEnum.RES_DIR + "bodysuit/";
        ResDirEnum.RES_DIR_BODY_EFF = ResDirEnum.RES_DIR + "bodyeff/";
        ResDirEnum.RES_DIR_EFF = ResDirEnum.RES_DIR + "eff/";
        ResDirEnum.RES_DIR_WIMGEFF = ResDirEnum.RES_DIR + "weaponimgeff/";
        ResDirEnum.RES_DIR_TITLE = ResDirEnum.RES_DIR + "title/";
        ResDirEnum.RES_DIR_MONSTER = ResDirEnum.RES_DIR + "monster/";
        ResDirEnum.RES_DIR_SKILL = ResDirEnum.RES_DIR + "skill/";
        ResDirEnum.RES_DIR_WEAPON = ResDirEnum.RES_DIR + "weapon/";
        ResDirEnum.RES_DIR_WEAPONEFF = ResDirEnum.RES_DIR + "weaponeff/";
        ResDirEnum.RES_DIR_HAIR = ResDirEnum.RES_DIR + "hair/";
        ResDirEnum.RES_DIR_TELEPORT = ResDirEnum.RES_DIR + "teleport/";
        ResDirEnum.RES_DIR_NPC = ResDirEnum.RES_DIR + "npc/";
        ResDirEnum.RES_DIR_CREATE = ResDirEnum.RES_DIR + "create/";
        ResDirEnum.RES_DIR_WORSHIP = ResDirEnum.RES_DIR + "Worship/";
        ResDirEnum.RES_DIR_PET = ResDirEnum.RES_DIR + "pet/";
        ResDirEnum.RES_DIR_PETEXTERIOR = ResDirEnum.RES_DIR + "petexterior/";
    };
    ResDirEnum.RES_ROOT = "";
    ResDirEnum.RES_RESOURCE = "resource/";
    ResDirEnum.RES_RESPUBLISH = "resource_Publish/";
    ResDirEnum.RES_DIR = "res/";
    ResDirEnum.RES_DIR_Android = "resource/assets/res/";
    ResDirEnum.MAP_DIR = "map/";
    ResDirEnum.MAP_DIR_Android = "resource/assets/map/";
    ResDirEnum.RES_DIR_BLOOD = ResDirEnum.RES_DIR + "blood/";
    ResDirEnum.RES_DIR_BODY = ResDirEnum.RES_DIR + "body/";
    ResDirEnum.RES_DIR_BODY_SUIT = ResDirEnum.RES_DIR + "bodysuit/";
    ResDirEnum.RES_DIR_BODY_EFF = ResDirEnum.RES_DIR + "bodyeff/";
    ResDirEnum.RES_DIR_EFF = ResDirEnum.RES_DIR + "eff/";
    ResDirEnum.RES_DIR_WIMGEFF = ResDirEnum.RES_DIR + "weaponimgeff/";
    ResDirEnum.RES_DIR_TITLE = ResDirEnum.RES_DIR + "title/";
    ResDirEnum.RES_DIR_MONSTER = ResDirEnum.RES_DIR + "monster/";
    ResDirEnum.RES_DIR_SKILL = ResDirEnum.RES_DIR + "skill/";
    ResDirEnum.RES_DIR_WEAPON = ResDirEnum.RES_DIR + "weapon/";
    ResDirEnum.RES_DIR_WEAPONEFF = ResDirEnum.RES_DIR + "weaponeff/";
    ResDirEnum.RES_DIR_HAIR = ResDirEnum.RES_DIR + "hair/";
    ResDirEnum.RES_DIR_TELEPORT = ResDirEnum.RES_DIR + "teleport/";
    ResDirEnum.RES_DIR_NPC = ResDirEnum.RES_DIR + "npc/";
    ResDirEnum.RES_DIR_CREATE = ResDirEnum.RES_DIR + "create/";
    ResDirEnum.RES_DIR_WORSHIP = ResDirEnum.RES_DIR + "Worship/";
    ResDirEnum.RES_DIR_PET = ResDirEnum.RES_DIR + "pet/";
    ResDirEnum.RES_DIR_PETEXTERIOR = ResDirEnum.RES_DIR + "petexterior/";
    return ResDirEnum;
}());
__reflect(ResDirEnum.prototype, "ResDirEnum");
var gamelib;
(function (gamelib) {
    var ResourceManager = (function () {
        function ResourceManager() {
            this.displayList = egret.createMap();
            this.resDisTime = {};
            this.isFirstEnter = false;
            /** UI 资源失效时间 */
            this._clearWin = 30000;
            /** 动画资源失效时间 */
            this._clearRes = 30000;
            /**
             * 地图超时时间
             */
            this._iscardMapTime = 10000;
            /** UI资源根目录 */
            this._resResource = "resource/";
            /** 动画资源根目录 */
            this._resMovieClip = "res/";
            /** 过滤动画 */
            this._filterMoviceResource = " ";
        }
        Object.defineProperty(ResourceManager.prototype, "clearWin", {
            get: function () {
                return this._clearWin;
            },
            set: function (time) {
                this._clearWin = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "clearRes", {
            get: function () {
                return this._clearRes;
            },
            set: function (time) {
                this._clearRes = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "iscardMapTime", {
            get: function () {
                return this._iscardMapTime;
            },
            set: function (time) {
                this._iscardMapTime = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "resResource", {
            get: function () {
                return this._resResource;
            },
            set: function (resource) {
                this._resResource = resource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "resMovieClip", {
            get: function () {
                return this._resMovieClip;
            },
            set: function (resource) {
                this._resMovieClip = resource;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "filterMoviceResource", {
            get: function () {
                return this._filterMoviceResource;
            },
            set: function (resource) {
                this._filterMoviceResource = resource;
            },
            enumerable: true,
            configurable: true
        });
        ResourceManager.ins = function () {
            var Class = this;
            if (!Class._instance) {
                Class._instance = new Class();
            }
            return Class._instance;
        };
        /** 清理地图数据 */
        ResourceManager.prototype.createMap = function (mapName) {
            var baseAnalyzer = RES['getAnalyzers']();
            var file;
            var img;
            for (var key in baseAnalyzer) {
                img = baseAnalyzer[key];
                if (img instanceof egret.Texture) {
                    if (key.indexOf(mapName) != -1) {
                        file = RES.getResourceInfo(key);
                        if (file) {
                            RES.host.unload(file);
                        }
                    }
                }
            }
        };
        /** 清理地图数据 */
        ResourceManager.prototype.createDiscardMap = function (mapName) {
            var baseAnalyzer = RES['getAnalyzers']();
            var file;
            var hashCode;
            var img;
            var t = egret.getTimer();
            for (var key in baseAnalyzer) {
                if (key.indexOf(mapName) != -1) {
                    img = baseAnalyzer[key];
                    if (img instanceof egret.Texture) {
                        if (img.bitmapData && img.bitmapData.hashCode) {
                            hashCode = img.bitmapData.hashCode;
                            var tempList = egret.BitmapData['_displayList'][hashCode];
                            if (!tempList || tempList.length == 0) {
                                if (this.resDisTime[hashCode] && (t - this.resDisTime[hashCode]) > this._iscardMapTime) {
                                    if (file) {
                                        file = RES.getResourceInfo(key);
                                        delete this.resDisTime[hashCode];
                                        RES.host.unload(file);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            baseAnalyzer = null;
        };
        /**
         * 清理UI资源
         */
        ResourceManager.prototype.destroyWin = function () {
            var baseAnalyzer = RES['getAnalyzers']();
            var file;
            var hashCode;
            var img;
            var tempList;
            var t = egret.getTimer();
            for (var key in baseAnalyzer) {
                if (key.indexOf(this.resResource) != -1) {
                    img = baseAnalyzer[key];
                    if (img instanceof egret.SpriteSheet) {
                        if (img.$texture && img.$texture.bitmapData && img.$texture.bitmapData.hashCode) {
                            hashCode = img.$texture.bitmapData.hashCode;
                            tempList = egret.BitmapData['_displayList'][hashCode];
                            if (!tempList || tempList.length == 0) {
                                if (this.resDisTime[hashCode] && (t - this.resDisTime[hashCode]) > this._clearWin) {
                                    delete this.resDisTime[hashCode];
                                    key = key.replace(this._resResource, "");
                                    RES.destroyRes(key);
                                }
                            }
                        }
                    }
                    else if (img instanceof egret.Texture) {
                        if (img.bitmapData && img.bitmapData.hashCode) {
                            hashCode = img.bitmapData.hashCode;
                            tempList = egret.BitmapData['_displayList'][hashCode];
                            if (!tempList || tempList.length == 0) {
                                if (this.resDisTime[hashCode] && (t - this.resDisTime[hashCode]) > this._clearWin) {
                                    file = RES.getResourceInfo(key);
                                    if (file) {
                                        delete this.resDisTime[hashCode];
                                        RES.host.unload(file);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // for (let key in baseAnalyzer) {
            // 	if (key.indexOf(this._resResource) != -1) {
            // 		img = baseAnalyzer[key];
            // 		if (img instanceof egret.SpriteSheet) {
            // 			if (img.$texture && img.$texture.bitmapData && img.$texture.bitmapData.hashCode) {
            // 				hashCode = img.$texture.bitmapData.hashCode;
            // 				tempList = egret.BitmapData['_displayList'][hashCode];
            // 				if (!tempList || tempList.length == 0) {
            // 					if (this.resDisTime[hashCode] && (t - this.resDisTime[hashCode]) > this._clearWin) {
            // 						delete this.resDisTime[hashCode];
            // 						key = key.replace(this._resResource, "");
            // 						RES.destroyRes(key);
            // 					}
            // 				}
            // 			}
            // 		} else if (img instanceof egret.Texture) {
            // 			if (img.bitmapData && img.bitmapData.hashCode) {
            // 				hashCode = img.bitmapData.hashCode;
            // 				tempList = egret.BitmapData['_displayList'][hashCode];
            // 				if (!tempList || tempList.length == 0) {
            // 					if (this.resDisTime[hashCode] && (t - this.resDisTime[hashCode]) > this._clearRes) {
            // 						key = key.replace(this._resResource, "");
            // 						if (key.indexOf('/') == -1 && RES.destroyRes(key)) {
            // 							delete this.resDisTime[hashCode];
            // 						}
            // 					}
            // 				}
            // 			}
            // 		}
            // 	}
            // 	// if (egret.getTimer() - t > 300) {
            // 	// 	break;
            // 	// }
            // }
            baseAnalyzer = null;
        };
        /**
         * 清理动画资源
         */
        ResourceManager.prototype.destroyRes = function () {
            var t = egret.getTimer();
            var baseAnalyzer = RES['getAnalyzers']();
            var hashCode;
            var img;
            var file;
            for (var key in baseAnalyzer) {
                img = baseAnalyzer[key];
                if (img instanceof egret.Texture) {
                    if (key.indexOf(this._resMovieClip) != -1 && key.indexOf(this._filterMoviceResource) < 0) {
                        if (img.bitmapData && img.bitmapData.hashCode) {
                            hashCode = img.bitmapData.hashCode;
                            var arr = this.displayList[hashCode];
                            if (!arr || !arr.length) {
                                if (!this.resDisTime[hashCode])
                                    continue;
                                if ((t - this.resDisTime[hashCode]) > this._clearRes) {
                                    file = RES.getResourceInfo(key);
                                    if (file) {
                                        delete this.displayList[hashCode];
                                        delete this.resDisTime[hashCode];
                                        RES.host.unload(file);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            baseAnalyzer = null;
        };
        ResourceManager.prototype.deleteDisplay = function (hashCode) {
            delete this.displayList[hashCode];
        };
        ResourceManager.prototype.getDisplay = function (hashCode) {
            return this.displayList[hashCode];
        };
        ResourceManager.prototype.addDisplay = function (hashCode, ds) {
            return this.displayList[hashCode] = ds;
        };
        ResourceManager.prototype.disposeResTime = function (hashCode) {
            this.resDisTime[hashCode] = egret.getTimer();
        };
        ResourceManager.prototype.delResTime = function (hashCode) {
            delete this.resDisTime[hashCode];
        };
        return ResourceManager;
    }());
    gamelib.ResourceManager = ResourceManager;
    __reflect(ResourceManager.prototype, "gamelib.ResourceManager");
})(gamelib || (gamelib = {}));
var app;
(function (app) {
    var ServerItem = (function (_super) {
        __extends(ServerItem, _super);
        function ServerItem() {
            var _this = _super.call(this) || this;
            var exml = "\n        <e:Skin class=\"MainLoginServerListInfoSkin\" xmlns:e=\"http://ns.egret.com/eui\" >\n\t<e:Image source=\"login_qfbg\"/>\n\t<e:Image id=\"imgState\" x=\"12.32\" source=\"login_dian_1\" verticalCenter=\"-2\"/>\n\t<e:Label id=\"serverText\" text=\"\" textColor=\"0xe5ddcf\" stroke=\"2\" size=\"21\" verticalCenter=\"-1.5\" horizontalCenter=\"7\"/>\n</e:Skin>\n        ";
            EXML.parse(exml);
            _this.skinName = "MainLoginServerListInfoSkin";
            return _this;
        }
        ServerItem.prototype.dataChanged = function () {
            // if (this.dataInfo == null) {
            //     this.width = 174;
            //     this.height = 48;
            //     this.imgBg = new eui.Image("login_qfbg");
            //     this.addChild(this.imgBg);
            //     this.imgState = new eui.Image("login_dian_2");
            //     this.imgState.scaleX = 0.8;
            //     this.imgState.scaleY = 0.8;
            //     this.imgState.left = 14;
            //     this.imgState.verticalCenter = -1;
            //     this.addChild(this.imgState);
            //     this.serverText = new eui.Label();
            //     this.serverText.size = 18;
            //     this.serverText.left = 40;
            //     this.serverText.verticalCenter = 0;
            //     this.serverText.stroke = 1;
            //     this.serverText.strokeColor = 0x000000;
            //     this.serverText.textColor = 0xffffff;
            //     this.addChild(this.serverText);
            //     this.isTuiJian = new eui.Image("login_tuijian");
            //     this.isTuiJian.right = 0;
            //     this.addChild(this.isTuiJian);
            // }
            this.dataInfo = this.data;
            this.imgState.source = +this.data['type'] != 4 ? "login_dian_" + (+this.data['type']) : "login_dian_1";
            this.serverText.text = this.data['serverName'];
            if (this.data['isNew']) {
                this.serverText.textFlow = [
                    { text: "  " + this.data['serverName'] },
                    { text: "(新)", style: { "textColor": 0x28ee01 } }
                ];
            }
            else {
                this.serverText.text = this.data['serverName'];
            }
        };
        return ServerItem;
    }(eui.ItemRenderer));
    app.ServerItem = ServerItem;
    __reflect(ServerItem.prototype, "app.ServerItem");
})(app || (app = {}));
var app;
(function (app) {
    var ServerListInfo = (function () {
        function ServerListInfo() {
            this.httpNum = 0;
            this.serverArr = [];
            this.leftStrArr = [];
        }
        ServerListInfo.prototype.getServerInfo = function () {
            //拉取服务器列表
            if (this.httpReq) {
                this.httpReq.removeEventListener(egret.Event.COMPLETE, this.getServiceComp, this);
                this.httpReq.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.getServiceErr, this);
            }
            this.httpReq = new egret.HttpRequest();
            this.httpReq.addEventListener(egret.Event.COMPLETE, this.getServiceComp, this);
            this.httpReq.addEventListener(egret.IOErrorEvent.IO_ERROR, this.getServiceErr, this);
            if (Main.gameParameter.loginType) {
                this.httpReq.open(Main.gameParameter.serviceListdUrl + "?account=" + Main.gameParameter.userInfo['uid'] + "&pf=" + Main.gameParameter.pf + "&t=" + egret.getTimer(), egret.HttpMethod.GET);
            }
            else {
                this.httpReq.open(Main.gameParameter.serviceListdUrl + "?account=" + Main.gameParameter.userInfo['uid'] + "&pf=" + Main.gameParameter.pf + "&t=" + egret.getTimer(), egret.HttpMethod.GET);
            }
            this.httpReq.send();
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            }
            this.timer = new egret.Timer(5000, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.httpNum += 1;
        };
        /**
         * 服务器列表拉取次数检测
         */
        ServerListInfo.prototype.timerComFunc = function () {
            if (Main && Main.showTipsPhone) {
                Main.showTipsPhone("正在拉取服务器");
            }
            this.getServerInfo();
            // if (this.httpNum <= 3) {
            //     this.getServerInfo();
            // } else {
            // }
        };
        //拉取成功
        ServerListInfo.prototype.getServiceComp = function (e) {
            //  window['getServiceErr'](1);
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.GET_SERVER_LIST, { result: 1 }, null, false);
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.httpNum = 0;
            this.serverArr = [];
            this.leftStrArr = [];
            var tmppLoader = e.target;
            if (tmppLoader.response == null || tmppLoader.response == 0 || tmppLoader.response == "") {
                if (Main && Main.showTipsPhone) {
                    Main.showTipsPhone("暂无服务器！");
                }
                return;
            }
            var data = {};
            try {
                data = JSON.parse(tmppLoader.response);
            }
            catch (error) {
                alert("服务器请求超时，请退出游戏重新打开！");
            }
            var serverList = [];
            var len = 0;
            if (data.serverlist) {
                len = data.serverlist.length;
            }
            //获取最新服务器
            var serData;
            for (var i = len - 1; i >= 0; i--) {
                serData = data.serverlist[i];
                if (serData['serverlist']) {
                    for (var k = serData.serverlist.length - 1; k >= 0; k--) {
                        app.LocationProperty.newestServer = serData.serverlist[k];
                        app.LocationProperty.newestServer['user'] = Main.gameParameter.userInfo['uid'];
                        if (!app.LocationProperty.newestServer['originalSrvid']) {
                            app.LocationProperty.newestServer['originalSrvid'] = app.LocationProperty.newestServer.srvid;
                        }
                        break;
                    }
                }
            }
            //自己选择区服
            if (window['selectServer']) {
                var arr = [];
                var loginObj = [];
                var loginAry = []; //最近登录服务器
                for (var i = 0; i < len; i++) {
                    serData = data.serverlist[i];
                    if (serData['serverlist'] && serData['serverlist'].length > 0) {
                        arr.push(serData);
                        if (data.login && data.login.length > 0) {
                            for (var k = 0; k < serData.serverlist.length; k++) {
                                if (data.login.indexOf(serData.serverlist[k]['originalSrvid'] + "") != -1) {
                                    // loginAry.push(serData.serverlist[k]);
                                    loginObj[serData.serverlist[k]['originalSrvid'] + ""] = serData.serverlist[k];
                                }
                            }
                        }
                    }
                }
                if (arr.length > 0) {
                    //获取最新服务器
                    var newAry = null;
                    var serverlist = arr[arr.length - 1]['serverlist'];
                    if (serverlist && serverlist.length) {
                        serverlist[serverlist.length - 1]['isNew'] = true;
                        newAry = [app.PhoneServerListInfo.copyDataHandler(serverlist[serverlist.length - 1])];
                        app.LocationProperty.recommendServer = app.PhoneServerListInfo.copyDataHandler(newAry[0]);
                    }
                    if (data.login && data.login.length > 0) {
                        for (var i = 0; i < data.login.length; i++) {
                            if (loginObj[data.login[i]]) {
                                loginAry.push(loginObj[data.login[i]]);
                            }
                        }
                    }
                    if (window['selectView']) {
                        if (loginAry.length > 0) {
                            window['selectView'].updateInfo(arr, loginAry[0]);
                            loginAry = loginAry.reverse();
                            arr = arr.reverse();
                            arr.unshift({ name: "最近登录", serverlist: loginAry });
                            if (newAry) {
                                arr.unshift({ name: "推荐新服", serverlist: newAry });
                            }
                        }
                        else {
                            var serItem = null;
                            for (var i = len - 1; i >= 0; i--) {
                                serData = data.serverlist[i];
                                for (var p = serData.serverlist.length - 1; p >= 0; p--) {
                                    if (serData.serverlist[p].type != 3 || serData.serverlist[p].type != 4) {
                                        serItem = serData.serverlist[p];
                                        break;
                                    }
                                }
                                if (serItem) {
                                    break;
                                }
                            }
                            if (serItem) {
                                arr = arr.reverse();
                                if (newAry) {
                                    arr.unshift({ name: "推荐新服", serverlist: newAry });
                                }
                                window['selectView'].updateInfo(arr, serItem);
                            }
                        }
                    }
                }
                else {
                    if (Main.gameParameter.pfID == 10010) {
                        Main.startServerTips("【先遣1服】将于8月19日14点正式开服，敬请期待。");
                    }
                }
                return;
            }
            else {
                // newestServer
                var serItem = null;
                for (var i = 0; i < len; i++) {
                    serData = data.serverlist[i];
                    if (serData['serverlist']) {
                        for (var k = 0; k < serData.serverlist.length; k++) {
                            serItem = serData.serverlist[k];
                            var isHaveServer = window["serverType"] ? serItem.originalSrvid == Main.gameParameter.userInfo['server'] : serItem.serverAlias == Main.gameParameter.userInfo['server'];
                            if (isHaveServer) {
                                serItem['user'] = Main.gameParameter.userInfo['uid'];
                                if (!serItem['originalSrvid']) {
                                    serItem['originalSrvid'] = serItem.srvid;
                                }
                                app.LocationProperty.Param = serItem;
                                //调用登录
                                app.GameSocket.ins().connectServer();
                                return;
                            }
                        }
                    }
                }
            }
            if (Main && Main.showTipsPhone) {
                Main.showTipsPhone("区服信息错误！");
            }
        };
        ServerListInfo.prototype.getServiceErr = function () {
            app.ReportDataMgr.ins().reporting(app.ReportDataEnum.GET_SERVER_LIST, { result: 0 }, null, false);
            // if (this.parent['getServerResult']) {
            //     this.parent['getServerResult'](0);
            // }
            // window['getServiceErr'](0);
        };
        ServerListInfo.prototype.onClickRightList = function (e) {
            this.selectSerInfo = e.item;
            if (this.selectSerInfo) {
                window['selectInfo'](this.selectSerInfo);
            }
        };
        ServerListInfo.prototype.onButtonClick = function () {
            if (this.selectSerInfo == null) {
                // alert("请选择服务器！");
                if (Main && Main.showTipsPhone) {
                    Main.showTipsPhone("请选择服务器！");
                }
                return;
            }
            window['onClickLogin'](this.selectSerInfo);
        };
        return ServerListInfo;
    }());
    app.ServerListInfo = ServerListInfo;
    __reflect(ServerListInfo.prototype, "app.ServerListInfo");
})(app || (app = {}));
var app;
(function (app) {
    /**
     * 测试版本登录
     */
    var SignInView = (function (_super) {
        __extends(SignInView, _super);
        function SignInView() {
            var _this = _super.call(this) || this;
            var exml = "<e:Skin class=\"PhoneTestSkin2\" width=\"1334\" height=\"750\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Image  source=\"mp_xfjm_png\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t<e:Rect id=\"rect\" width=\"300\" height=\"30\" y=\"252\" horizontalCenter=\"0\" fillColor=\"0xffffff\"/>\n    <e:EditableText id=\"input\" width=\"300\" restrict = \"A-Za-z0-9\" text=\"\" y=\"252\" maxChars=\"10\" height=\"30\" horizontalCenter=\"0\" backgroundColor=\"0xffffff\" borderColor=\"0xf2f9f9\" promptColor=\"0x000000\" textColor=\"0x000000\" strokeColor=\"0xfcf7f7\" background=\"true\"  prompt=\"\u8BF7\u8F93\u5165\u8D26\u53F7\"/>\n\t<e:Button id=\"signInButton\" label=\"\u767B  \u5F55\" height=\"50\" anchorOffsetX=\"0\" width=\"124\" horizontalCenter=\"0\" y=\"300\">\n\t\t<e:skinName>\n\t\t\t<e:Skin states=\"up,down,disabled\">\n            <e:Rect fillColor=\"0x0d7f93\" width=\"100%\" height=\"100%\"/>\n\t\t\t<e:Image width=\"100%\" height=\"100%\" />\n\t\t\t<e:Label id=\"labelDisplay\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t\t</e:Skin>\n\t\t</e:skinName>\n\t</e:Button>\n</e:Skin>";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "PhoneTestSkin2";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
            // this.left = this.right = this.top = this.bottom = 0;
        }
        SignInView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        SignInView.prototype.initUI = function () {
            if (gamelib.DeviceUtils.IsIOS) {
                egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            }
            else {
                app.SoundManager.ins().playBg("xuanze_mp3");
            }
            if (Main.gameParameter.loginType) {
                this.signInButton.visible = false;
                this.input.visible = false;
                this.rect.visible = false;
            }
            else {
                this.signInButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                var signInUID = egret.localStorage.getItem("signInUID");
                if (signInUID && signInUID.length) {
                    this.input.text = signInUID;
                }
            }
        };
        SignInView.prototype.stageClick = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            app.SoundManager.ins().playBg("xuanze_mp3");
        };
        SignInView.prototype.onClick = function (e) {
            if (this.input.text.length) {
                egret.localStorage.setItem("signInUID", this.input.text);
                var userInfo = { uid: this.input.text };
                Main.gameParameter.userInfo = userInfo;
                Main.createServerView();
            }
        };
        SignInView.prototype.removeView = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            this.signInButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return SignInView;
    }(eui.Component));
    app.SignInView = SignInView;
    __reflect(SignInView.prototype, "app.SignInView");
})(app || (app = {}));
var app;
(function (app) {
    /**
     * 测试版本登录
     */
    var SignInViewH5 = (function (_super) {
        __extends(SignInViewH5, _super);
        function SignInViewH5() {
            var _this = _super.call(this) || this;
            var exml = "<e:Skin class=\"PhoneTestSkinH5\" width=\"1334\" height=\"750\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Image  source=\"mp_xfjm_png\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t<e:Button id=\"signInButton\"  width=\"143\" height=\"62\" icon=\"mp_login_btn2_png\" bottom=\"274\" horizontalCenter=\"0.5\">\n\t\t\t\t\t\t<e:skinName>\n\t\t\t\t\t\t\t<e:Skin states=\"up,down,disabled\">\n\t\t\t\t\t\t<e:Image id=\"iconDisplay\"  verticalCenter=\"0\" horizontalCenter=\"0\" scaleX.down=\"0.9\" scaleY.down=\"0.9\"/>\n\t\t\t\t\t\t\t</e:Skin>\n\t\t\t\t\t\t</e:skinName>\n\t\t\t\t\t</e:Button>\n</e:Skin>";
            _this.clazz = EXML.parse(exml);
            _this.skinName = "PhoneTestSkinH5";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
            // this.left = this.right = this.top = this.bottom = 0;
        }
        SignInViewH5.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        SignInViewH5.prototype.initUI = function () {
            if (gamelib.DeviceUtils.IsIOS) {
                egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            }
            else {
                app.SoundManager.ins().playBg("xuanze_mp3");
            }
            this.signInButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onClick(null);
        };
        SignInViewH5.prototype.stageClick = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            app.SoundManager.ins().playBg("xuanze_mp3");
        };
        SignInViewH5.prototype.onClick = function (e) {
            if (window['loginFunction']) {
                window['loginFunction']();
            }
        };
        SignInViewH5.prototype.removeView = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClick, this);
            this.signInButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return SignInViewH5;
    }(eui.Component));
    app.SignInViewH5 = SignInViewH5;
    __reflect(SignInViewH5.prototype, "app.SignInViewH5");
})(app || (app = {}));
var app;
(function (app) {
    var SimplePlayerInfo = (function () {
        function SimplePlayerInfo() {
            this.select = false;
        }
        SimplePlayerInfo.prototype.read = function (bytes) {
            if (!bytes)
                return;
            this.id = bytes.readUnsignedInt();
            this.name = bytes.readString();
            this.faceId = bytes.readUnsignedByte();
            this.sex = bytes.readByte();
            // this.level = bytes.readUnsignedByte();
            this.level = bytes.readShort();
            if (this.level < 1)
                this.level = 1;
            this.zsLevel = bytes.readShort();
            this.job = bytes.readByte();
            bytes.readByte(); //原本的阵营位
            this.isBan = ((bytes.readByte() & 0x1) > 0);
            this.guildName = bytes.readString();
        };
        return SimplePlayerInfo;
    }());
    app.SimplePlayerInfo = SimplePlayerInfo;
    __reflect(SimplePlayerInfo.prototype, "app.SimplePlayerInfo");
})(app || (app = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
/**
 * Created by yangsong on 2014/11/23.
 * Timer管理器
 */
var app;
(function (app) {
    var TimerManager = (function () {
        /**
         * 构造函数
         */
        function TimerManager() {
            this.currHandler = null;
            this._handlers = [];
            this.nexthandles = null;
            this._currTime = egret.getTimer();
            this._currFrame = 0;
            egret.startTick(this.onEnterFrame, this);
        }
        TimerManager.ins = function () {
            var Class = this;
            if (!Class._instance) {
                Class._instance = new Class();
            }
            return Class._instance;
        };
        TimerManager.prototype.getFrameId = function () {
            return this._currFrame;
        };
        TimerManager.prototype.getCurrTime = function () {
            return this._currTime;
        };
        // 从大到小排序
        TimerManager.binFunc = function (b1, b2) {
            if (b1.exeTime > b2.exeTime)
                return -1;
            else if (b1.exeTime < b2.exeTime)
                return 1;
            else
                return 0;
        };
        TimerManager.DeleteHandle = function (handler) {
            handler.clear();
            app.ObjectPool.push(handler);
        };
        /**
         * 每帧执行函数
         * @param frameTime
         */
        TimerManager.prototype.onEnterFrame = function (time) {
            this._currFrame++;
            this._currTime = egret.getTimer();
            var currTime = 0;
            // process the nextlist first
            var nexthandles = this.nexthandles;
            this.nexthandles = null;
            if (nexthandles && nexthandles.length > 0) {
                for (var _i = 0, nexthandles_1 = nexthandles; _i < nexthandles_1.length; _i++) {
                    var handler_1 = nexthandles_1[_i];
                    handler_1.method.call(handler_1.methodObj);
                    TimerManager.DeleteHandle(handler_1);
                }
                nexthandles = null;
            }
            if (this._handlers.length <= 0)
                return false;
            var handler = this._handlers[this._handlers.length - 1];
            while (handler.exeTime <= this._currTime) {
                this.currHandler = handler = this._handlers.pop();
                handler.method.call(handler.methodObj);
                currTime = egret.getTimer();
                handler.exeTime = currTime + handler.delay;
                var repeat = handler.forever;
                if (!repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                        repeat = true;
                    }
                    else {
                        if (handler.onFinish) {
                            handler.onFinish.apply(handler.finishObj);
                        }
                    }
                }
                if (repeat) {
                    var index = app.Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
                    this._handlers.splice(index, 0, handler);
                }
                else {
                    TimerManager.DeleteHandle(handler);
                }
                if (currTime - this._currTime > 5)
                    break;
                if (this._handlers.length <= 0)
                    break;
                else
                    handler = this._handlers[this._handlers.length - 1];
            }
            this.currHandler = null;
            return false;
        };
        TimerManager.prototype.create = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
            if (delay < 0 || repeat < 0 || method == null) {
                return;
            }
            var handler = app.ObjectPool.pop("app.TimerHandler");
            handler.forever = repeat == 0;
            handler.repeatCount = repeat;
            handler.delay = delay;
            handler.method = method;
            handler.methodObj = methodObj;
            handler.onFinish = onFinish;
            handler.finishObj = fobj;
            handler.exeTime = startTime + this._currTime;
            // this._handlers.push(handler);
            var index = app.Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
            this._handlers.splice(index, 0, handler);
        };
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
        TimerManager.prototype.doTimer = function (delay, repeat, method, methodObj, onFinish, fobj) {
            if (onFinish === void 0) { onFinish = null; }
            if (fobj === void 0) { fobj = null; }
            this.create(delay, delay, repeat, method, methodObj, onFinish, fobj);
        };
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
        TimerManager.prototype.doTimerDelay = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
            if (onFinish === void 0) { onFinish = null; }
            if (fobj === void 0) { fobj = null; }
            this.create(startTime, delay, repeat, method, methodObj, onFinish, fobj);
        };
        // 下一帧执行，且只执行一次
        TimerManager.prototype.doNext = function (method, methodObj) {
            var handler = app.ObjectPool.pop("app.TimerHandler");
            handler.method = method;
            handler.methodObj = methodObj;
            if (!this.nexthandles)
                this.nexthandles = [];
            this.nexthandles.push(handler);
        };
        /**
         * 清理
         * @param method 要移除的函数
         * @param methodObj 要移除的函数对应的对象
         */
        TimerManager.prototype.remove = function (method, methodObj) {
            var currHandler = this.currHandler;
            if (currHandler && currHandler.method == method &&
                currHandler.methodObj == methodObj) {
                currHandler.forever = false;
                currHandler.repeatCount = 0;
            }
            for (var i = this._handlers.length - 1; i >= 0; i--) {
                var handler = this._handlers[i];
                if (handler.method == method && handler.methodObj == methodObj) {
                    this._handlers.splice(i, 1);
                    TimerManager.DeleteHandle(handler);
                }
            }
        };
        /**
         * 清理
         * @param methodObj 要移除的函数对应的对象
         */
        TimerManager.prototype.removeAll = function (methodObj) {
            var currHandler = this.currHandler;
            if (currHandler && currHandler.methodObj == methodObj) {
                currHandler.forever = false;
                currHandler.repeatCount = 0;
            }
            for (var i = this._handlers.length - 1; i >= 0; i--) {
                var handler = this._handlers[i];
                if (handler.methodObj == methodObj) {
                    this._handlers.splice(i, 1);
                    TimerManager.DeleteHandle(handler);
                }
            }
        };
        /**
         * 检测是否已经存在
         * @param method
         * @param methodObj
         *
         */
        TimerManager.prototype.isExists = function (method, methodObj) {
            for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.method == method && handler.methodObj == methodObj) {
                    return true;
                }
            }
            return false;
        };
        return TimerManager;
    }());
    app.TimerManager = TimerManager;
    __reflect(TimerManager.prototype, "app.TimerManager");
    var TimerHandler = (function () {
        function TimerHandler() {
            /**执行间隔*/
            this.delay = 0;
            /**是否重复执行*/
            this.forever = false;
            /**重复执行次数*/
            this.repeatCount = 0;
            /**执行时间*/
            this.exeTime = 0;
        }
        /**清理*/
        TimerHandler.prototype.clear = function () {
            this.method = null;
            this.methodObj = null;
            this.onFinish = null;
            this.finishObj = null;
            this.forever = false;
        };
        return TimerHandler;
    }());
    app.TimerHandler = TimerHandler;
    __reflect(TimerHandler.prototype, "app.TimerHandler");
})(app || (app = {}));
var app;
(function (app) {
    var uint64 = (function () {
        function uint64(v) {
            this._lowUint = 0;
            this._highUint = 0;
            this.value = v;
        }
        uint64.prototype.isEqual = function (target) {
            if (!target)
                return false;
            return this._lowUint == target._lowUint && this._highUint == target._highUint;
        };
        uint64.prototype.isGreaterThan = function (target) {
            if (target instanceof uint64)
                return this._highUint > target._highUint || (this._highUint == target._highUint && this._lowUint > target._lowUint);
            else {
                var u64 = new uint64();
                if (typeof target == 'string') {
                    u64.value = target;
                    return this.isGreaterThanOrEqual(u64);
                }
                if (typeof target == 'number') {
                    u64.value = target.toString();
                    return this.isGreaterThanOrEqual(u64);
                }
            }
        };
        uint64.prototype.isGreaterThanOrEqual = function (target) {
            if (target instanceof uint64)
                return this._highUint > target._highUint || (this._highUint == target._highUint && this._lowUint >= target._lowUint);
            else {
                var u64 = new uint64();
                if (typeof target == 'string') {
                    u64.value = target;
                    return this.isGreaterThanOrEqual(u64);
                }
                if (typeof target == 'number') {
                    u64.value = target.toString();
                    return this.isGreaterThanOrEqual(u64);
                }
            }
        };
        Object.defineProperty(uint64.prototype, "isZero", {
            get: function () {
                return this._lowUint == 0 && this._highUint == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(uint64.prototype, "isGreaterThanZero", {
            /** 是否大于0 */
            get: function () {
                return this._lowUint > 0 || this._highUint > 0;
            },
            enumerable: true,
            configurable: true
        });
        uint64.prototype.writeByte = function (b) {
            b.writeUnsignedInt(this._lowUint);
            b.writeUnsignedInt(this._highUint);
        };
        uint64.prototype.setValue = function (lowerUint, higherUint) {
            if (lowerUint === void 0) { lowerUint = 0; }
            if (higherUint === void 0) { higherUint = 0; }
            this._lowUint = lowerUint;
            this._highUint = higherUint;
        };
        Object.defineProperty(uint64.prototype, "value", {
            set: function (v) {
                if (v instanceof egret.ByteArray) {
                    this._lowUint = v.readUnsignedInt();
                    this._highUint = v.readUnsignedInt();
                }
                else if (typeof v == 'string') {
                    uint64.stringToUint64(v, 10, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(uint64.prototype, "valueByString", {
            set: function (value) {
                var num = 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 左移运算
         * @param num
         * @return
         */
        uint64.prototype.leftMove = function (num, result) {
            if (result === void 0) { result = null; }
            result = result || this;
            var bitMask = uint64.LeftMoveMask[num];
            var lowUintMaskNum = bitMask & this._lowUint;
            lowUintMaskNum = lowUintMaskNum >>> (32 - num);
            result._lowUint = this._lowUint << num;
            result._highUint = this._highUint << num;
            result._highUint = result._highUint | lowUintMaskNum;
        };
        /**
         *加法
         * @param value
         * @param result
         */
        uint64.prototype.add = function (value, result) {
            if (result === void 0) { result = null; }
            result = result || this;
            var num = this._lowUint + value._lowUint;
            result._highUint = this._highUint + value._highUint;
            if (num >= uint64.MaxLowUint) {
                result._highUint++;
                result._lowUint = num - uint64.MaxLowUint;
            }
            else {
                result._lowUint = num;
            }
        };
        /** 减法 */
        uint64.prototype.subtraction = function (value, result) {
            if (result === void 0) { result = null; }
            result = result || this;
            var num = this._lowUint - value._lowUint;
            result._highUint = this._highUint - value._highUint;
            if (num < 0) {
                result._highUint--;
                result._lowUint = num + uint64.MaxLowUint;
            }
            else {
                result._lowUint = num;
            }
        };
        /**
         * @param value
         * 注意value值不可过大，否则会计算错误
         */
        uint64.prototype.scale = function (value, result) {
            if (result === void 0) { result = null; }
            result = result || this;
            var num = this._lowUint * value;
            result._highUint = this._highUint * value;
            result._highUint += Math.floor(Math.abs(num / uint64.MaxLowUint));
            result._lowUint = num % uint64.MaxLowUint;
        };
        uint64.prototype.toString = function (radix) {
            if (radix === void 0) { radix = 10; }
            var result = "";
            var lowUint = this._lowUint;
            var highUint = this._highUint;
            var highRemain;
            var lowRemain;
            var tempNum;
            while (highUint != 0 || lowUint != 0) {
                highRemain = (highUint % radix);
                tempNum = highRemain * uint64.MaxLowUint + lowUint;
                lowRemain = tempNum % radix;
                result = lowRemain + result;
                highUint = (highUint - highRemain) / radix;
                lowUint = (tempNum - lowRemain) / radix;
            }
            return result.length ? result : "0";
        };
        /**
         *根据字符串导出成64位数据结构
         * @param value
         * @return
         */
        uint64.stringToUint64 = function (value, radix, result) {
            if (radix === void 0) { radix = 10; }
            if (result === void 0) { result = null; }
            result = result || new uint64;
            var lowUint = 0;
            var highUint = 0;
            var tempNum;
            var len = value.length;
            var char;
            for (var i = 0; i < len; i++) {
                char = parseInt(value.charAt(i));
                tempNum = lowUint * radix + char;
                highUint = highUint * radix + Math.floor(tempNum / uint64.MaxLowUint);
                lowUint = tempNum % uint64.MaxLowUint;
            }
            result.setValue(lowUint, highUint);
            return result;
        };
        uint64.LeftMoveMask = [0,
            0x80000000, 0x40000000, 0x20000000, 0x10000000,
            0x08000000, 0x04000000, 0x02000000, 0x01000000,
            0x00800000, 0x00400000, 0x00200000, 0x00100000,
            0x00080000, 0x00040000, 0x00020000, 0x00010000,
            0x00008000, 0x00004000, 0x00002000, 0x00001000,
            0x00000800, 0x00000400, 0x00000200, 0x00000100,
            0x00000080, 0x00000040, 0x00000020, 0x00000010,
            0x00000008, 0x00000004, 0x00000002, 0x00000001,
        ];
        uint64.MaxLowUint = 0xffffffff + 1;
        return uint64;
    }());
    app.uint64 = uint64;
    __reflect(uint64.prototype, "app.uint64");
})(app || (app = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//	 * Redistributions of source code must retain the above copyright
//	   notice, this list of conditions and the following disclaimer.
//	 * Redistributions in binary form must reproduce the above copyright
//	   notice, this list of conditions and the following disclaimer in the
//	   documentation and/or other materials provided with the distribution.
//	 * Neither the name of the Egret nor the
//	   names of its contributors may be used to endorse or promote products
//	   derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
/**
 * Created by yangsong on 15-1-14.
 * 背景音乐类
 */
var app;
(function (app) {
    var SoundBg = (function (_super) {
        __extends(SoundBg, _super);
        /**
         * 构造函数
         */
        function SoundBg() {
            var _this = _super.call(this) || this;
            _this._currBg = "";
            return _this;
        }
        /**
         * 停止当前音乐
         */
        SoundBg.prototype.stop = function () {
            if (this._currSoundChannel) {
                this.removeSoundChannel(this._currSoundChannel);
            }
            this._currSoundChannel = null;
            this._currSound = null;
            this._currBg = "";
        };
        /**
         * 播放某个音乐
         * @param effectName
         */
        SoundBg.prototype.play = function (effectName) {
            if (this._currBg == effectName)
                return;
            this.stop();
            this._currBg = effectName;
            var sound = this.getSound(effectName);
            if (sound) {
                this.playSound(sound);
            }
        };
        //主要是解决ios不播放的bug
        SoundBg.prototype.touchPlay = function () {
            if (this._currSoundChannel && this._currSound) {
                var pos = this._currSoundChannel.position;
                this.removeSoundChannel(this._currSoundChannel);
                this._currSoundChannel = this._currSound.play(pos, 1);
                this.addSoundChannel(this._currSoundChannel);
            }
        };
        /**
         * 播放
         * @param sound
         */
        SoundBg.prototype.playSound = function (sound) {
            this._currSound = sound;
            this._currSoundChannel = this._currSound.play(0, 1);
            this.addSoundChannel(this._currSoundChannel);
        };
        SoundBg.prototype.onSoundComplete = function () {
            if (this._currSoundChannel)
                this.removeSoundChannel(this._currSoundChannel);
            this.playSound(this._currSound);
        };
        SoundBg.prototype.addSoundChannel = function (channel) {
            channel.volume = this._volume;
            channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        };
        SoundBg.prototype.removeSoundChannel = function (channel) {
            channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            channel.stop();
        };
        /**
         * 设置音量
         * @param volume
         */
        SoundBg.prototype.setVolume = function (volume) {
            this._volume = volume;
            if (this._currSoundChannel) {
                this._currSoundChannel.volume = this._volume;
            }
        };
        /**
         * 资源加载完成后处理播放
         * @param key
         */
        SoundBg.prototype.loadedPlay = function (key) {
            if (this._currBg == key) {
                var sound = RES.getRes(key);
                //避免音频解码失败报错
                if (!sound) {
                    return;
                }
                this.playSound(sound);
            }
        };
        /**
         * 检测一个文件是否要清除
         * @param key
         * @returns {boolean}
         */
        SoundBg.prototype.checkCanClear = function (key) {
            return this._currBg != key;
        };
        return SoundBg;
    }(app.BaseSound));
    app.SoundBg = SoundBg;
    __reflect(SoundBg.prototype, "app.SoundBg");
})(app || (app = {}));
/**
 * Created by yangsong on 15-1-14.
 * 音效类
 */
var app;
(function (app) {
    var SoundEffects = (function (_super) {
        __extends(SoundEffects, _super);
        /**
         * 构造函数
         */
        function SoundEffects() {
            return _super.call(this) || this;
        }
        /**
         * 播放一个音效
         * @param effectName
         */
        SoundEffects.prototype.play = function (effectName) {
            var sound = this.getSound(effectName);
            if (sound) {
                this.playSound(sound);
            }
        };
        /**
         * 播放
         * @param sound
         */
        SoundEffects.prototype.playSound = function (sound) {
            var channel = sound.play(0, 1);
            channel.volume = this._volume;
        };
        /**
         * 设置音量
         * @param volume
         */
        SoundEffects.prototype.setVolume = function (volume) {
            this._volume = volume;
        };
        /**
         * 资源加载完成后处理播放
         * @param key
         */
        SoundEffects.prototype.loadedPlay = function (key) {
            var sound = RES.getRes(key);
            //避免音频解码失败报错
            if (!sound) {
                return;
            }
            this.playSound(sound);
        };
        return SoundEffects;
    }(app.BaseSound));
    app.SoundEffects = SoundEffects;
    __reflect(SoundEffects.prototype, "app.SoundEffects");
})(app || (app = {}));
/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
var app;
(function (app) {
    var SoundManager = (function () {
        /**
         * 构造函数
         */
        function SoundManager() {
            this.bgOn = true;
            this.effectOn = true;
            this.bgVolume = 0.5;
            this.effectVolume = 0.5;
            this.bg = new app.SoundBg();
            this.bg.setVolume(this.bgVolume);
            this.effect = new app.SoundEffects();
            this.effect.setVolume(this.effectVolume);
        }
        SoundManager.ins = function () {
            var Class = this;
            if (!Class._instance) {
                Class._instance = new Class();
            }
            return Class._instance;
        };
        /**
         * 播放音效
         * @param effectName
         */
        SoundManager.prototype.playEffect = function (effectName) {
            if (!this.effectOn)
                return;
            this.effect.play(effectName);
        };
        /**
         * 创角界面播放音效
         * @param effectName
         */
        SoundManager.prototype.createPlayEffect = function (effectName) {
            this.effect.play(effectName);
        };
        /**
         * 播放背景音乐
         * @param key
         */
        SoundManager.prototype.playBg = function (bgName) {
            this.currBg = bgName;
            if (!this.bgOn)
                return;
            this.bg.play(bgName);
        };
        /**
         * 创角界面背景音乐
         * @param key
         */
        SoundManager.prototype.createplayBg = function (bgName) {
            this.currBg = bgName;
            this.bg.play(bgName);
        };
        /**
         * 停止背景音乐
         */
        SoundManager.prototype.stopBg = function () {
            this.bg.stop();
        };
        //点击播放
        SoundManager.prototype.touchBg = function () {
            if (egret.Capabilities.isMobile && egret.Capabilities.os == 'iOS') {
                this.bg.touchPlay();
            }
        };
        /**
         * 设置音效是否开启
         * @param $isOn
         */
        SoundManager.prototype.setEffectOn = function ($isOn) {
            this.effectOn = $isOn;
        };
        /**
         * 设置背景音乐是否开启
         * @param $isOn
         */
        SoundManager.prototype.setBgOn = function ($isOn) {
            this.bgOn = $isOn;
            if (!this.bgOn) {
                this.stopBg();
            }
            else {
                if (this.currBg) {
                    this.playBg(this.currBg);
                }
            }
        };
        /**
         * 设置背景音乐音量
         * @param volume
         */
        SoundManager.prototype.setBgVolume = function (volume) {
            volume = Math.min(volume, 1);
            volume = Math.max(volume, 0);
            this.bgVolume = volume;
            this.bg.setVolume(this.bgVolume);
        };
        /**
         * 获取背景音乐音量
         * @returns {number}
         */
        SoundManager.prototype.getBgVolume = function () {
            return this.bgVolume;
        };
        /**
         * 设置音效音量
         * @param volume
         */
        SoundManager.prototype.setEffectVolume = function (volume) {
            volume = Math.min(volume, 1);
            volume = Math.max(volume, 0);
            this.effectVolume = volume;
            this.effect.setVolume(this.effectVolume);
        };
        /**
         * 获取音效音量
         * @returns {number}
         */
        SoundManager.prototype.getEffectVolume = function () {
            return this.effectVolume;
        };
        /**
         * 音乐文件清理时间
         * @type {number}
         */
        SoundManager.CLEAR_TIME = 3 * 60 * 1000;
        return SoundManager;
    }());
    app.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "app.SoundManager");
})(app || (app = {}));
var app;
(function (app) {
    /**
     * Created by hrz on 2017/7/19.
     */
    var SoundUtil = (function () {
        function SoundUtil() {
            this._delayTime = 0;
            this._delayStartTime = 0;
            /** 移动 */
            this._runTimeGap = 300;
            this._runTimeStart = 0;
            /** 攻击 */
            this._ackTimeGap = 300;
            this._ackTimeGapTimeStart = 0;
            /** 受击 */
            this._hitTimeGap = 300;
            this._hitTimeStart = 0;
            this._hit2TimeStart = 0;
            /** 死亡 */
            this._dieTimeGap = 400;
            this._dieTimeStart = 0;
            this._die2TimeStart = 0;
            this.monsterSound = {};
        }
        SoundUtil.ins = function () {
            var Class = this;
            if (!Class._instance) {
                Class._instance = new Class();
            }
            return Class._instance;
        };
        SoundUtil.prototype.playRunSound = function () {
            if (egret.getTimer() - this._runTimeStart >= this._runTimeGap) {
                this._runTimeStart = egret.getTimer();
                app.SoundManager.ins().playEffect(SoundUtil.RUN);
            }
        };
        SoundUtil.prototype.playRun = function () {
            if (egret.getTimer() - this._runTimeStart > this._runTimeGap + 100) {
                this.playRunSound();
            }
            if (!app.TimerManager.ins().isExists(this.playRunSound, this)) {
                app.TimerManager.ins().doTimer(this._runTimeGap, 0, this.playRunSound, this);
            }
        };
        SoundUtil.prototype.stopRun = function () {
            app.TimerManager.ins().remove(this.playRunSound, this);
        };
        SoundUtil.prototype.playEffect = function (effectName) {
            if (egret.getTimer() - this._delayStartTime < this._delayTime) {
                return;
            }
            app.SoundManager.ins().playEffect(effectName);
        };
        SoundUtil.prototype.delayTime = function (time) {
            this._delayTime = time;
            this._delayStartTime = egret.getTimer();
        };
        /**
         * 攻击音效
         */
        SoundUtil.prototype.playAck = function () {
            if (egret.getTimer() - this._ackTimeGapTimeStart > this._ackTimeGap) {
                this._ackTimeGapTimeStart = egret.getTimer();
                app.SoundManager.ins().playEffect(SoundUtil.ACK);
            }
        };
        /**
         * 男受击
         */
        SoundUtil.prototype.playManHit = function () {
            if (egret.getTimer() - this._hitTimeStart > this._hitTimeGap) {
                this._hitTimeStart = egret.getTimer();
                app.SoundManager.ins().playEffect(SoundUtil.MAN_HIT);
            }
        };
        /**
         * 女受击
         */
        SoundUtil.prototype.playWoManHit = function () {
            if (egret.getTimer() - this._hit2TimeStart > this._hitTimeGap) {
                this._hit2TimeStart = egret.getTimer();
                app.SoundManager.ins().playEffect(SoundUtil.WOMAN_HIT);
            }
        };
        /**
         * 男死亡
         */
        SoundUtil.prototype.playManDie = function () {
            if (egret.getTimer() - this._dieTimeStart > this._dieTimeGap) {
                this._dieTimeStart = egret.getTimer();
                app.SoundManager.ins().playEffect(SoundUtil.MAN_DIE);
            }
        };
        /**
         * 女死亡
         */
        SoundUtil.prototype.playWoManDie = function () {
            if (egret.getTimer() - this._die2TimeStart > this._dieTimeGap) {
                this._die2TimeStart = egret.getTimer();
                app.SoundManager.ins().playEffect(SoundUtil.WOMAN_DIE);
            }
        };
        /**
         * 播放怪物音效
         */
        SoundUtil.prototype.playMonster = function (soundName) {
            if (!this.monsterSound[soundName] || this.monsterSound[soundName] < egret.getTimer()) {
                this.monsterSound[soundName] = egret.getTimer() + 500;
                app.SoundManager.ins().playEffect(soundName);
            }
        };
        //跑动音效
        SoundUtil.RUN = "yidong_mp3";
        //普通攻击
        SoundUtil.ACK = "gongji_mp3";
        //男受击
        SoundUtil.MAN_HIT = "nanshouji_mp3";
        //女受击
        SoundUtil.WOMAN_HIT = "nvshouji_mp3";
        //男死亡
        SoundUtil.MAN_DIE = "nansiwang_mp3";
        //女死亡
        SoundUtil.WOMAN_DIE = "nvsiwang_mp3";
        //窗口打开关闭音效
        SoundUtil.WINDOW = "chuansonglikai_mp3";
        //任务完成与接受音效
        SoundUtil.TASK = "longlin_b_renwu_mp3";
        //玩家升级音效
        SoundUtil.LEVEL_UP = "longlin_b_shengji_mp3";
        //传送场景
        SoundUtil.SCENE = "longlin_a_zyz_mp3";
        //穿戴装备
        SoundUtil.EQUIP = "longlin_a_chuandai_mp3";
        //创建角色成功
        SoundUtil.CREATE_ROLE = "longlin_a_chuangjue_mp3";
        //强化
        SoundUtil.FORGE = "longlin_a_qianghua_mp3";
        //熔炼
        SoundUtil.SMELT = "longlin_b_ronglian_mp3";
        //技能升级
        SoundUtil.SKILL_UP = "longlin_b_jineng_mp3";
        //打开、关闭、返回界面的按钮
        SoundUtil.VIEW = "anniu1_mp3";
        //一级、二级架构选择按钮
        SoundUtil.VIEW_LEVEL = "anniu2_mp3";
        //UI内部其他按钮
        SoundUtil.VIEW_INSIDE = "anniu3_mp3";
        //锻造按钮的声音
        SoundUtil.FORGING = "duanzao~1_mp3";
        //金币相关拾取、增加、点击等
        SoundUtil.GOLD = "jinbizengjia_mp3";
        //药品相关拾取、增加、点击等
        SoundUtil.DRUGS = "heyao_mp3";
        //升级
        SoundUtil.UPGRADE = "shengji~1_mp3";
        //戒指点击、穿戴等
        SoundUtil.RING = "zhuangjiezhi_mp3";
        //其他装备点击、穿戴等
        SoundUtil.OTHER_EQUIP = "zhuangsanjian_mp3";
        //手镯点击、穿戴等
        SoundUtil.BRACELET = "zhuangshouzhuo_mp3";
        //武器点击、穿戴等
        SoundUtil.ARMS = "zhuangwuqi_mp3";
        //项链点击、穿戴等
        SoundUtil.NECKLACE = "zhuangxianglian_mp3";
        //衣服点击、穿戴等
        SoundUtil.CLOTHES = "zhuangyifu_mp3";
        SoundUtil.STRENGTHEN = "duanzao~1_mp3";
        SoundUtil.WINDOW_OPEN = false;
        return SoundUtil;
    }());
    app.SoundUtil = SoundUtil;
    __reflect(SoundUtil.prototype, "app.SoundUtil");
})(app || (app = {}));
