# 项目

## 技术栈

1. vue@3.x + pinia + vue-router@4.x
2. axios
3. vueuse@latest
4. element-plus@latest

目前 element-plus 使用完整导入

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

## 一些代码规范

1. 所有新页面、组件必须使用 setup 语法，避免 vue2.7、vue3 切换带来的心智压力
2. 遵从自上而下规则，即：引入在前 -> Store 相关 -> Router 相关 -> 变量定义 -> hooks -> computed -> watch -> function -> 生命周期
3. 接口调用必须在 onMounted 生命周期执行
4. 使用 let、const 定义变量
5. 使用 function name()定义函数

一些例子

```js
export default {
  name: 'name',
  props: {},
  emits: [],
  setup(props, { attrs, emit, expose, slots }) {
    // Store相关
    const xxxStore = useXxxStore()

    // Router相关
    const router = useRouter()
    const route = useRoute()

    // 变量定义
    const string = ref('')
    const boolean = ref(false)
    const dataForm = ref({})

    // computed
    const userInfo = computed(() => userStore.getUserInfo)
    // or
    const datetime = computed({
      get() {
        return xxx
      },
      set(val) {
        // do something
      }
    })

    // watch
    watch(
      () => boolean.value,
      (val) => {
        // do something
      }
    )

    // function
    function xxx() {
      // do something
    }

    // 生命周期
    onMounted(() => {
      // do something
    })
  }
}
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
│
├─mock # 数据模拟
│
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
