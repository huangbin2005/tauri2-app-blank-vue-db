# tauri2-app-blank-vue-db



## 3、调整相关程序和配置

### 3.4 国际化
多种语言处理机制

### 3.3 处理托盘相关内容
todo

### 3.2 处理数据库相关内容
```
1、修改 src-tauri\src\lib.rs，设定数据库组件tauri_plugin_sql 导入到相关tauri相关使用。
2、修改 src-tauri\capabilities\default.json   设定相关应用的本机权限
3、修改 src-tauri\tauri.conf.json  注意相关配置
4、修改 src\App.vue， 追加数据库的处理和展示

btw，vite导入相关的

```


### 3.1 处理基础扩展组件相关内容
```
1、修改 package.json，相关vue、element的插件说明
2、修改 src-tauri/Cargo.toml 补充rust的相关插件，如sql、托盘
3、修改 src-tauri/tauri.conf.json 更新插件
```


## 2、补充各种运行环境
```
windows 应根据以下地址安装运行包
https://tauri.app/start/prerequisites/
安装 C++ Build Tools
https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/

安装 rust
winget install --id Rustlang.Rustup

node、npm、yarn暂略
```


## 1、创建一个初始化的工程；
```
yarn create tauri2-app-blank-vue-db
yarn install
```

## 0.初始化一个tauri2的工程







