var AtlasResourceManager = (function () {
    function AtlasResourceManager(width, height, gridSize, maxTexNum) {
        this._currentAtlasCount = 0;
        this._maxAtlaserCount = 0;
        this._width = 0;
        this._height = 0;
        this._gridSize = 0;
        this._gridNumX = 0;
        this._gridNumY = 0;
        this._init = false;
        this._curAtlasIndex = 0;
        this._setAtlasParam = false;
        this._atlaserArray = null;
        this._needGC = false;
        this._setAtlasParam = true;
        this._width = width;
        this._height = height;
        this._gridSize = gridSize;
        this._maxAtlaserCount = maxTexNum;
        this._gridNumX = width / gridSize;
        this._gridNumY = height / gridSize;
        this._curAtlasIndex = 0;
        this._atlaserArray = [];
    }

    __class(AtlasResourceManager, 'laya.webgl.atlas.AtlasResourceManager');
    var __proto = AtlasResourceManager.prototype;
    __proto.setAtlasParam = function (width, height, gridSize, maxTexNum) {
        if (this._setAtlasParam == true) {
            AtlasResourceManager._sid_ = 0;
            this._width = width;
            this._height = height;
            this._gridSize = gridSize;
            this._maxAtlaserCount = maxTexNum;
            this._gridNumX = width / gridSize;
            this._gridNumY = height / gridSize;
            this._curAtlasIndex = 0;
            this.freeAll();
            return true;
        } else {
            console.log("设置大图合集参数错误，只能在开始页面设置各种参数");
            throw-1;
            return false;
        }
        return false;
    }

    //添加 图片到大图集
    __proto.pushData = function (texture) {
        var bitmap = texture.bitmap;
        var nWebGLImageIndex = -1;
        var curAtlas = null;
        var i = 0, n = 0, altasIndex = 0;
        for (i = 0, n = this._atlaserArray.length; i < n; i++) {
            altasIndex = (this._curAtlasIndex + i) % n;
            curAtlas = this._atlaserArray[altasIndex];
            nWebGLImageIndex = curAtlas.findBitmapIsExist(bitmap);
            if (nWebGLImageIndex != -1) {
                break;
            }
        }
        if (nWebGLImageIndex != -1) {
            var offset = curAtlas.InAtlasWebGLImagesOffsetValue[nWebGLImageIndex];
            offsetX = offset[0];
            offsetY = offset[1];
            curAtlas.addToAtlas(texture, offsetX, offsetY);
            return true;
        } else {
            var tex = texture;
            this._setAtlasParam = false;
            var bFound = false;
            var nImageGridX = (Math.ceil((texture.bitmap.width + 2) / this._gridSize));
            var nImageGridY = (Math.ceil((texture.bitmap.height + 2) / this._gridSize));
            var bSuccess = false;
            for (var k = 0; k < 2; k++) {
                var maxAtlaserCount = this._maxAtlaserCount;
                for (i = 0; i < maxAtlaserCount; i++) {
                    altasIndex = (this._curAtlasIndex + i) % maxAtlaserCount;
                    (this._atlaserArray.length - 1 >= altasIndex) || (this._atlaserArray.push(new Atlaser(this._gridNumX, this._gridNumY, this._width, this._height, AtlasResourceManager._sid_++)));
                    var atlas = this._atlaserArray[altasIndex];
                    var offsetX = 0, offsetY = 0;
                    var fillInfo = atlas.addTex(1, nImageGridX, nImageGridY);
                    if (fillInfo.ret) {
                        offsetX = fillInfo.x * this._gridSize + 1;
                        offsetY = fillInfo.y * this._gridSize + 1;
                        bitmap.lock = true;
                        atlas.addToAtlasTexture((bitmap), offsetX, offsetY);
                        atlas.addToAtlas(texture, offsetX, offsetY);
                        bSuccess = true;
                        this._curAtlasIndex = altasIndex;
                        break;
                    }
                }
                if (bSuccess)
                    break;
                this._atlaserArray.push(new Atlaser(this._gridNumX, this._gridNumY, this._width, this._height, AtlasResourceManager._sid_++));
                this._needGC = true;
                this.garbageCollection();
                this._curAtlasIndex = this._atlaserArray.length - 1;
            }
            if (!bSuccess) {
                console.log(">>>AtlasManager pushData error");
            }
            return bSuccess;
        }
    }

    __proto.addToAtlas = function (tex) {
        laya.webgl.atlas.AtlasResourceManager.instance.pushData(tex);
    }

    /**
     *回收大图合集,不建议手动调用
     *@return
     */
    __proto.garbageCollection = function () {
        if (this._needGC === true) {
            var n = this._atlaserArray.length - this._maxAtlaserCount;
            for (var i = 0; i < n; i++) {
                this._atlaserArray[i].dispose();
                console.log("AtlasResourceManager:Dispose the inner Atlas。");
            }
            console.log(">>>>altas garbageCollection =" + n);
            this._atlaserArray.splice(0, n);
            this._needGC = false;
        }
        return true;
    }

    __proto.freeAll = function () {
        for (var i = 0, n = this._atlaserArray.length; i < n; i++) {
            this._atlaserArray[i].dispose();
        }
        this._atlaserArray.length = 0;
        this._curAtlasIndex = 0;
    }

    __proto.getAtlaserCount = function () {
        return this._atlaserArray.length;
    }

    __proto.getAtlaserByIndex = function (index) {
        return this._atlaserArray[index];
    }

    __getset(1, AtlasResourceManager, 'instance', function () {
        if (!AtlasResourceManager._Instance) {
            AtlasResourceManager._Instance = new AtlasResourceManager(laya.webgl.atlas.AtlasResourceManager.atlasTextureWidth, laya.webgl.atlas.AtlasResourceManager.atlasTextureHeight,/*CLASS CONST:laya.webgl.atlas.AtlasResourceManager.gridSize*/16, laya.webgl.atlas.AtlasResourceManager.maxTextureCount);
        }
        return AtlasResourceManager._Instance;
    });

    __getset(1, AtlasResourceManager, 'enabled', function () {
        return Config.atlasEnable;
    });

    __getset(1, AtlasResourceManager, 'atlasLimitWidth', function () {
        return AtlasResourceManager._atlasLimitWidth;
    }, function (value) {
        AtlasResourceManager._atlasLimitWidth = value;
    });

    __getset(1, AtlasResourceManager, 'atlasLimitHeight', function () {
        return AtlasResourceManager._atlasLimitHeight;
    }, function (value) {
        AtlasResourceManager._atlasLimitHeight = value;
    });

    AtlasResourceManager._enable = function () {
        Config.atlasEnable = true;
    }

    AtlasResourceManager._disable = function () {
        Config.atlasEnable = false;
    }

    AtlasResourceManager.__init__ = function () {
        AtlasResourceManager.atlasTextureWidth = 2048;
        AtlasResourceManager.atlasTextureHeight = 2048;
        AtlasResourceManager.maxTextureCount = 6;
        AtlasResourceManager.atlasLimitWidth = 64;
        AtlasResourceManager.atlasLimitHeight = 64;
    }

    AtlasResourceManager._atlasLimitWidth = 0;
    AtlasResourceManager._atlasLimitHeight = 0;
    AtlasResourceManager.gridSize = 16;
    AtlasResourceManager.atlasTextureWidth = 0;
    AtlasResourceManager.atlasTextureHeight = 0;
    AtlasResourceManager.maxTextureCount = 0;
    AtlasResourceManager._atlasRestore = 0;
    AtlasResourceManager.BOARDER_TYPE_NO = 0;
    AtlasResourceManager.BOARDER_TYPE_RIGHT = 1;
    AtlasResourceManager.BOARDER_TYPE_LEFT = 2;
    AtlasResourceManager.BOARDER_TYPE_BOTTOM = 4;
    AtlasResourceManager.BOARDER_TYPE_TOP = 8;
    AtlasResourceManager.BOARDER_TYPE_ALL = 15;
    AtlasResourceManager._sid_ = 0;
    AtlasResourceManager._Instance = null;
    return AtlasResourceManager;
})()