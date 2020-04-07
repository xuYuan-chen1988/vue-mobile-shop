# 02.vue-cms

## Project setup
```
npm install
```
### 这是一个移动web项目 基于vue 框架

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 用(传统方式)命令行 把修改过后的代码上传到码云？？？
1. git add .
2. git commit -m "提交信息"
3. git push 

## 制作首页app组件
1. 完成 header 区域，使用的是 vant 中的 nav-bar 组件
2. 制作底部的Tabbar 区域，使用的是vant 中的 tabbar组件
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为router-link

## 设置路由高亮

## 点击tab栏 展示对应的组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取数据，使用 axios
2. 使用 axios的  this.$http.get 获取数据
3. 获取到的数据，要保存到data身上
4. 使用v-for 循环渲染每一个item 项目

## 改造九宫格 区域的样式

## 改造新闻资讯 路由链接

## 新闻资讯 页面制作
1. 绘制界面
2. 使用 axios 获取数据
3. 渲染真实数据

## 实现新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项 改造为 router-link ，同时，在跳转的时候，应该提供唯一的id标识符
2. 创建一个新闻详情的组件页面，叫做NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址 和组件页面对应起来。

## 实现 新闻详情的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件 
1. 先 创建一个单独的comment.vue 组件模板
2. 在需要使用 comment 组件的页面中,先手动导入 comment组件
 + `import comment from './comment.vue'`
3. 在父组件中,使用 'components' 属性,将刚才导入的comment 组件注册为 自己的子组件
4. 将注册子组件时候的注册名称以标签的形式 在页面中 引用即可

## 实现点击加载更多评论的功能
1. 为加载更多按钮绑定点击事件,在事件中去请求下一页数据
2. 点击加载更多,让pageIndex++ ,然后重新调用 this.getComments() 方法 重新获取最新一页的数据
3. 为了防止 新数据覆盖老数据的情况,我们在点击加载更多的时候,每当获取到新数据 ,应该让老数据调用数组的 concat 方法,拼接上新数组


### 发表评论
1. 把文本框做一下双向数据绑定
2. 为发表按钮绑定一个事件
3. 效验内容(是否为空,空格等),不通过 toast 用户输入内容.
4. 效验通过axios 发送请求,把评论内容提交给服务器
5. 当发表评论 ok后,重新刷新列表,以查看最新的评论
 + 如果调用 getCommets 方法重新刷新评论列表的话,可能只能得到最后一页的评论,前几页的评论获取不到
 + 当评论成功后,在客户端手动拼接出一个最新的评论对象,然后调用数组的 unshift方法,追加到 data 中 comments 开头,这样就能完美实现刷新评论列表的需求

## 改造图片分享 按钮为路由的 链接并显示对于的组件页面

## 绘制图片列表组件页面结构并美化样式

1. 顶部的滑动条
2. 制作底部的图片列表






## 实现了 图片列表的懒加载 和样式美化

## 制作列表区域
1. 图片列表需要使用懒加载技术,我们可以使用vant 提供的现成的组件 van-image 自带懒加载技术

## 实现了点击图片，跳转到图片详情页面
1. 在改造li 或 router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素

## 实现图片详情页面的布局和美化，同时获取数据渲染页面

## 实现详情缩略图的功能 
1. 使用vant 中 Grid中自定义内容 和 ImagePreview 功能(需要在缩略图的标签中绑定点击事件,在点击事件里面调用ImagePreview 函数 )

## 绘制商品列表页面的基本结构并美化

## 尝试在手机上 去进行项目的预览和测试
1. 要保证 自己的手机可以正常运行
2. 要保证 手机和开发项目的电脑 处于同一个wifi 环境中,也就说手机可以访问到电脑的ip
3. 打开自己的项目中的 package.json 文件,在dev 脚本中,添加一个 --host 指令,把当前电脑的主机的 wifi ip地址,设置为--host的指令值:
 + 如何查看自己电脑所处wifi的ip 呢? 在cmd 终端中运行 'ipconfig', 查看无线网的ip地址

 ## 项目完成, webpack 打包, 如果前端项目不单独部署,放在后台的根目录下就好了
  + 如果前端项目单独部署(流量很大,静态资源和应用服务器分开),一般在 nginx 上部署(一般luinx系统上部署)
  + 最好开启gzip压缩 
  + ngrok: 如果是小项目 想共享给别人查看,自己电脑作为服务器,可以使用 ngrok 可以将本机作为映射为一个外网的web服务器
