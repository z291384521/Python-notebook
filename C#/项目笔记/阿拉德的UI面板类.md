打开界面的流程

![image-20230324155104309](img/阿拉德的UI面板类/image-20230324155104309.png)

![image-20230324155109577](img/阿拉德的UI面板类/image-20230324155109577.png)



![image-20230324155022208](img/阿拉德的UI面板类/image-20230324155022208.png)





需要看的目标 所有父面板里面的异步加载方法

~~~c#
        private GameObject _loadResGameObject()
        {
            if (_isLoadFromPool())
            {
                Logger.LogProcessFormat("[ClientFrame] _loadResGameObject 从资源池子加载");
                return CGameObjectPool.instance.GetGameObject(GetPrefabPath(), enResourceType.UIPrefab, (uint)GameObjectPoolFlag.None);
            }
            else
            {
                Logger.LogProcessFormat("[ClientFrame] _loadResGameObject 直接加载");
                return AssetLoader.instance.LoadResAsGameObject(GetPrefabPath());
            }
        }
~~~













这个是控制面板类的

![image-20230324173707930](img/阿拉德的UI面板类/image-20230324173707930.png)

这是点击发送的给send绑定方法

![image-20230328180709186](img/阿拉德的UI面板类/image-20230328180709186.png)

这是一个城镇面板









父亲面板里面的内容如下

~~~c#
public void Update(float timeElapsed)
        {
            _OnUpdate(timeElapsed);
        }

        /// <summary>
        /// 重要设置预制体的方法
        /// </summary>
        /// <returns></returns>
        public virtual string GetPrefabPath()
        {
            return "";
        }

        /// <summary>
        /// 附加内容
        /// </summary>
        /// <returns></returns>
        protected virtual bool AttachContent()
        {
            return false;
        }
        /// <summary>
        /// 打开面板时候的方法
        /// </summary>
        protected virtual void _OnOpenFrame()
        {
        }

        void OnSceneLoadFinish(UIEvent uiEvent)
        {
            OnSceneLoadFinish();
        }
        /// <summary>
        /// 场景加载完成以后
        /// </summary>
        protected virtual void OnSceneLoadFinish()
        {

        }

        protected virtual void _OnDoTweenEnd()
        {
            frame.gameObject.SetActive(false);
        }
        /// <summary>
        /// 加载预制体的时候
        /// </summary>
        protected virtual void _OnLoadPrefabFinish()
        {

        }
        /// <summary>
        /// 关闭面板时候调用
        /// </summary>
        protected virtual void _OnCloseFrame()
        {

        }
        /// <summary>
        /// 虚方给子类重写在update里面调用
        /// </summary>
        /// <param name="timeElapsed"></param>
        protected virtual void _OnUpdate(float timeElapsed)
        {

        }
~~~





首先绑定一个 方法

![image-20230331153733019](img/阿拉德的UI面板类/image-20230331153733019.png)

![image-20230331153700413](img/阿拉德的UI面板类/image-20230331153700413.png)

方法如下

~~~c#
       
void _OnClickCallBack()
        {
            if(m_callback != null)
            {
                m_callback(gameObject, m_item);
            }
        }
~~~









点击右下角的提示 首先传递了一个委托





![image-20230331135621261](img/阿拉德的UI面板类/image-20230331135621261.png)





![image-20230331135531432](img/阿拉德的UI面板类/image-20230331135531432.png)

![image-20230331135642981](img/阿拉德的UI面板类/image-20230331135642981.png)

赋值程序

传递的方法

![image-20230331135720706](img/阿拉德的UI面板类/image-20230331135720706.png)



















登录界面

 "is_recommend": 0, 推荐 一个蓝色框 1打开

![image-20230403195011224](img/阿拉德的UI面板类/image-20230403195011224.png)





获得图像

通过公共面板来进行获得

![image-20230403203552560](img/阿拉德的UI面板类/image-20230403203552560.png)









通过设置这样 

![image-20230405112341654](img/阿拉德的UI面板类/image-20230405112341654.png)
