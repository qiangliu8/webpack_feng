### commit log
借助cz-cli实现规范化commit log<br/>
借助husky与validate-commit-msg实现commit msg的正确性校验
* 全局安装cz-cli
```
npm install -g commitizen
```
* 进入本地项目仓库，初始化npm（如有必要），添加.gitignore（如有必要）
```
cd /path/to/repo
npm init
#填写信息
```
* 安装husky（如有必要）
```
npm install husky --save-dev
```
* 安装validate-commit-msg
```
npm install -g validate-commit-msg
```
* 修改package.json配置commitmsg钩子
```
// Edit package.json
{
  "scripts": {
    "commitmsg": "validate-commit-msg",
    "...": "..."
  }
}
```
* 初始化cz adapter
```
commitizen init cz-conventional-changelog --save-dev --save-exact
```
* 使用git cz或者git-cz 代替 git commit命令，会交互式完成git commit log
```
➜  workflow git:(master) ✗ vim README.md
➜  workflow git:(master) ✗ git add README.md
➜  workflow git:(master) ✗ git cz
/Users/yedai/Work/workflow
/Users/yedai/Work/workflow
cz-cli@2.9.6, cz-conventional-changelog@2.0.0


Line 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.

? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  test:     Adding missing tests or correcting existing tests
(Move up and down to reveal more choices)
```
#### windows下安装踩过的坑：
可能会报：Cannot find module find-parent-dir，本地install一下就好：cnpm install find-parent-dir；<br>
需要在cmd中提交（git cz），git bash、Cywin中都不行；

### 运行与部署
* 安装依赖
```
npm install 
```
* 开发环境运行
> \# serve with hot reload at localhost:9004
```
npm run dev
```
* 开发环境预览
> \# chrome浏览器默认最小字号12px，但页面iphone6模式下html字号为10px，会出现显示不准确问题

chrome上预览需要修改最小字号设置`设置 -> 外观&自定义字体 -> 最小字号&拉到最左边`
<br>
chrome扩展程序`二维码(QR码)生成器(QR Code Generator)`

* 线上环境编译
> \# build for production with minification
```
npm run build-for-tester 测试环境
npm run build-for-demo 预上线环境
npm run build-for-prod 生产环境
```
> \# build for production and view the bundle analyzer report
可使用测试环境编译命令查看打包情况
```
npm run build-for-tester --report
```

### 目录结构
``` text
.
├── build   // 构建
│   ├── build.js    // 线上打包脚本
│   ├── check-versions.js    // 所需环境版本检测
│   ├── dev-client.js    // 开发环境热加载配置
│   ├── dev-server.js    // 开发环境打包&启动服务配置
│   ├── utils.js
│   ├── webpack.base.config.js    // 开发&线上环境公用webpack配置
│   ├── webpack.dev.config.js    // 开发环境webpack配置
│   └── webpack.prod.config.js    // 线上（测试|预上线|生产）环境webpack配置
├── config
│   ├── index.js    // webpack相关配置参数
│   ├── dev.env.js
│   └── prod.evn.js
├── dist    // 线上环境打包后的文件存放位置
├── node_modules
├── proxy    // http代理配置
├── routes
│   └── index.js    // 路由配置
├── src
│   ├── assets
│   │   └── images    // 图片资源
│   ├── config
│   │       ├── env-dev.js     // 开发环境变量
│   │       ├── env-tester.js    // 测试环境变量
│   │       ├── env-demo.js    // 预上线环境变量
│   │       └── env-prod.js    // 生成环境变量
│   ├── api      // 接口（不应包含任何逻辑）
│   ├── services    // 封装接口调用逻辑
│   ├── constant    // 项目常量
│   ├── components    // 公用组件
│   │   └── ui    // 无状态UI组件
│   │       └── index.js      // 统一导出
│   ├── pages    // 存放页面
│   │   └── home
│   │       ├── index.scss    // 页面样式文件
│   │       └── index.js      // 页面
│   ├── styles
│   │   ├── common.scss    // 公用全局样式
│   │   ├── variable.scss    // 全局样式变量
│   │   └── theme.less    // 重写antd主题样式
│   ├── utils
│   │   ├── http.js    // 封装http请求方法
│   │   └── error.js    // 统一错误处理工具
│   └── main.js   // 入口文件
├── static  // 直接拷贝的静态资源
├── index.html   // 页面模板
├── .balelrc
├── .eslintignore
├── .eslintrc.js
└── package.json
```

### 编码规范
#### 1. 命名
* 文件夹 使用 中划线命名法
* React组件 使用 pascal命名法（如果组件文件夹中只有一个组件，应该使用index.js作为文件名 并且使用文件夹名称的pascal命名作为组件名。如果有多个组件，应该使用在index.js中统一导出。），其中页面组件统一以XxxPage形式命名。
* Store中的action-types 使用 全部大写的下划线命名法
* Store中的action 使用 camel命名法
* 路由 使用 全小写的中划线命名法
* CSS变量 使用 全小写的中划线命名法
#### 2. JS中import组织规则
按照React相关库、第三方库、第三方UI组件、自定义UI组件、自定义模块（如service、api等）、自定义常量、页面scss样式的顺序引入，且上述不同类型间空一行方便阅读。
#### 3. CSS样式
* 通用样式写在common.scss文件中
* 变量定义在variable.scss文件中，且组件变量的变量命名规范为${组件}-{属性}-{场景}-{状态}-{大小}-{反色}
* 页面结构应为
  ```html
  <div className="page">
    /* 头部 */
    <div className="container">
      /* 中间可滚动的内容 */
      <div></div>
    </div>
    /* 底部 */
  </div>
  ```
* 页面自有样式写在此页面文件夹内，以index.scss命名。为防止样式污染，样式均包裹在页面同名class内。
<br>例如：home页面，组件名为HomePage，其render函数中最外层元素为`<div className="page home-page"></div>`，即其页面中样式都应写在`.page.home-page { }`内。
* 单位默认全部使用rem，如确有需求使用px为单位，请使用大写PX避免被自动转为rem。
#### 4. 接口请求相关
> 项目中已经基于axios二次封装了相关请求方法`http.request`，且对接口的错误响应做了统一的包装处理。业务中调用相关方法请求时，对请求错误大部分只需捕获异常并交由封装好的`error.showErrorMsg`方法处理即可。
* api文件中，应只关注请求的url、请求方法及请求参数（对应后台提供的接口文档），不可包含任何业务逻辑
* 对接口调用有组合、参数处理、响应结果处理的操作，都应在service文件中处理。且外部都是调用service提供的方法进行接口请求，而不是直接调用api。
* 请求发生异常时，`http.request`方法会抛出异常，我们只需在`catch`相关异常，将异常参数`e`交由`error.showErrorMsg`方法处理，`error.showErrorMsg`会根据包装后的错误状态码做出相应动作。参见 utils/error.js
#### 5. 组件封装
组件一般分为两类，UI组件以及容器组件。在项目中，我们在此基础上，将页面从容器组件中独立出来，区别于其他容器组件看待。
* 页面组件：放置在 pages 中的页面同名文件夹。其中JS和样式文件都已index命名。
* UI组件：显示的内容由外部输入决定，其只负责页面的渲染（UI组件以组件名命名文件夹，统一放在 components/ui 文件夹下，且由 index.js 统一导出）。
* 容器组件：只负责业务逻辑和数据的处理（以组件名命名文件夹，统一放在components文件夹下）。
#### 6. Action <> Store，业务逻辑处理
##### 需求
统一处理业务逻辑，尤其是异步的处理。
##### 选择
[redux-saga](https://redux-saga-in-chinese.js.org/): 用于管理 action，处理异步逻辑。可测试、可 mock、声明式的指令。
##### 可选
redux-thunk, redux-promise 等: 相对原始的异步方案，适用于更简单的场景。在 action 需要组合、取消等操作时，会不好处理。
##### saga 入门
在 saga 之前，你可能会在 action creator 里处理业务逻辑，虽然能跑通，但是给人感觉很混乱且难以测试。比如：
``` javascript
// action creator with thunking
function createRequest () {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_STUFF' });
    someApiCall(function(response) {
      // some processing
      dispatch({ type: 'RECEIVE_STUFF' });
    });
  };
}
```
然后组件里可能这样：
``` javascript
function onHandlePress () {
  this.props.dispatch({ type: 'SHOW_WAITING_MODAL' });
  this.props.dispatch(createRequest());
}
```
这样通过 redux state 和 reducer 把所有的事情串联到起来。

但问题是：
> Code is everywhere.

通过 saga，你只需要触发一个 action 
``` javascript
function onHandlePress () {
  // createRequest 触发 action `BEGIN_REQUEST`
  this.props.dispatch(createRequest());
}
```
然后所有后续的操作都通过 saga 来管理。
``` javascript
function *hello() {
  // 等待 action `BEGIN_REQUEST`
  yield take('BEGIN_REQUEST');
  // dispatch action `SHOW_WAITING_MODAL`
  yield put({ type: 'SHOW_WAITING_MODAL' });
  // 发布异步请求
  const response = yield call(myApiFunctionThatWrapsFetch);
  // dispatch action `PRELOAD_IMAGES`, 附上 response 信息
  yield put({ type: 'PRELOAD_IMAGES', response.images });
  // dispatch action `HIDE_WAITING_MODAL`
  yield put({ type: 'HIDE_WAITING_MODAL' });
}
```
可以看出，调整之后的代码有几个优点：
* 所有业务代码都存于 saga 中，不再散落在各处
* 全同步执行，就算逻辑再复杂，看起来也不会乱
#### 7. Store持久化
> 因为页面刷新会导致store中的数据丢失，这不是我们想要的结果，所以我们需要将store中的数据持久化到本地，防止刷新页面带来的一系列问题，这样做也在一定程度解决了页面后退，数据无法保留的问题。但何时使用缓存中的数据、何时不使用，就需要我们自己进行维护。

这里我们选用的是`redux-persist`实现数据持久化。项目中已配置相关内容，只需知道数据会被缓存即可，除一处简单配置需要处理，无需再关心其他内容。<br>
```javascript
// 当新增了Reducer，只需在main.js中插入相关Reducer即可完成持久化配置
const persistedReducer = persistReducer(persistConfig, combineReducers(Object.assign(
  {},
  {app: appReducer},
  {home: homeReducer},
  /**
   * 在此处插入
   */
  {router: routerReducer}
)))
```
#### 8. 简化项目
> 此脚手架适合中等及以上复杂度的项目，对于一些需求简单或者业务较少的项目，就显得过于臃肿。此时就需要我们在此脚手架基础上进行删减，下面将说明如何精简脚手架。
##### 移除`redux-saga`及`react-router-redux`<br>
* main.js 中删除下列被注释的代码
```javascript
// const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, combineReducers(Object.assign(
  {},
  {app: appReducer},
  {home: homeReducer},
  // {router: routerReducer}
)))
const store = createStore(
  persistedReducer, 
  applyMiddleware(
    middleware, 
    // sagaMiddleware
  )
)
const persistor = persistStore(store)
// sagaMiddleware.run(rootSaga)

/**
 * 框架
 */
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <!-- <App history={history} /> -->
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
```
* pages/App.js中修改下列代码
```javascript
class App extends React.Component {
  // static propTypes = {
  //   history: PropTypes.object,
  // }

  render () {
    return (
      <BrowserRouter>
      <!-- <ConnectedRouter history={this.props.history}> -->
        <Route path="/" component={RouteConfig} />
      <!-- </ConnectedRouter> -->
      </BrowserRouter>
    )
  }
}
```
* 删除store/sagas文件夹及不再使用的引用
* 页面中不可再使用`react-router-redux`
##### 移除`redux`及`redux-persist`<br>
* main.js 中删除下列被注释的代码
```javascript
// const persistedReducer = persistReducer(persistConfig, combineReducers(Object.assign(
//   {},
//   {app: appReducer},
//   {home: homeReducer}
// )))
// const store = createStore(
//   persistedReducer, 
//   applyMiddleware(
//     middleware
//   )
// )
// const persistor = persistStore(store)

/**
 * 框架
 */
ReactDOM.render(
  <!--<Provider store={store}> -->
    <!--<PersistGate loading={null} persistor={persistor}> -->
      <App />
    <!--</PersistGate> -->
  <!--</Provider> -->,
  document.getElementById('app')
)
```
* 删除store文件夹及不再使用的引用
* 页面中不可再使用`react-redux`
> 此时，项目为`react + react-router4 + antd-mobiled`的最简组合。