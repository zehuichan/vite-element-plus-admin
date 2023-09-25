# vite-element-plus-admin

实验性用管理后台模板

## 技术栈

1. vue@3.x + pinia + vue-router@4.x
2. axios@latest
3. vueuse@latest
4. element-plus@latest
5. unocss@latest

目前 `element-plus` 使用完整导入

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Element-Plus](https://element-plus.org/zh-CN/) - ui 基本使用

## 起步

- 安装依赖

```bash
cd [project]

npm install
```

- 运行

```bash
npm run dev
```

## 提测流程

1. 各自开发分支合并代码到 dev
2. jenkins 点击发布

## 发版流程

1. 各自开发分支合并代码到 dev
2. dev -> master
3. master -> npm run release
4. jenkins 点击发布

## 目录结构

```
├─build # 编译相关
├─mock # 数据模拟
├─public
│
└─src
    │  App.vue
    │  main.js
    │
    ├─api # api接口
    ├─assets  # 图片、视频、音频、字体等资源
    │  ├─images
    │  ├─logo
    │  └─styles
    │
    ├─components # 组件库
    ├─enums # 前端枚举
    ├─hooks # 钩子函数
    ├─install # 指令、插件
    │  ├─directives
    │  └─plugins
    │
    ├─layouts # 骨架
    │  ├─blank
    │  └─default
    │
    ├─router # 路由
    │
    ├─settings # 设置
    │
    ├─store # store
    │
    ├─utils # 工具方法
    │
    └─views # 页面
```

## GIT 相关

- master 主干
- dev 测试
- dev-xxx 对应到各个前端人员

## 常见问题

### 首先有任何报错，最简单的方法是把报错信息复制到浏览器里面搜索一下！！！

- [Google 点我](https://www.google.com/)
- [百度点我](https://www.baidu.com/)

## 致谢

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)
- [ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro)
- [naive-ui-admin](https://github.com/jekip/naive-ui-admin)
- [element-pro-components](https://github.com/tolking/element-pro-components) 
