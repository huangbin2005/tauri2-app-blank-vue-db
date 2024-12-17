# tauri2-app-blank-vue-db
是个白板程序，验证一下tauri的各种功能的可用性，不含业务代码，没有版权问题。


## 3、调整相关程序和配置

### 3.9 本地数据加密处理机制（以及相关逃生处理机制）
逃生，例如加密后，忘记密码可以恢复和还原的处理机制

### 3.8 linux处理机制（国产化环境执行处理）


### 3.7 文件处理方法

#### 3.7.1 本地文件处理（存储、删除、管理等）
```
yarn run tauri add fs
src-tauri\tauri.conf.json
src-tauri\capabilities\default.json 权限管理非常重要
```

#### 3.7.2 文件上下传（互联网文件上下行处理）
```
yarn run tauri add upload 增加插件
src-tauri\capabilities\default.json 权限处理
src\App.vue，具体上下行处理
```
todo 由于暂时没有上传接口，暂时还未测试验证

### 3.6 升级处理

参考 https://tauri.app/plugin/updater/
```
1、
yarn run tauri add updater
yarn run tauri add process
2、修改 src-tauri\tauri.conf.json
----处理以上2步应该可以可以不影响应用启动

3、修改 src-tauri\capabilities\desktop.json 文件
    补充权限相关配置

4、制作密钥和服务端
yarn tauri signer generate -w ~/.tauri/tabvdapp.key
password:1234567890
linux:
export TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
# optionally also add a password
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
windows:（注意有带着$）
$env:TAURI_SIGNING_PRIVATE_KEY="D:\source\tauri-app\tauri2-app-blank-vue-db\~\.tauri\tabvdapp.key"
<# optionally also add a password #>
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD="1234567890"

更新src-tauri\tauri.conf.json
    "createUpdaterArtifacts": true,
    updater.pubkey 的内容

yarn tauri build    


5、制作升级包和更新服务端
  yarn run  tauri build
  src-tauri/tauri.conf.json 中的 endpoints
  目前暂时用github中的处理机制，实际业务可以用自己的服务器进行管理相关应用的升级方法
https://github.com/user/repo/releases/latest/download/latest.json
https://api.github.com/repos/huangbin2005/tauri2-app-blank-vue-db/releases/latest
https://github.com/huangbin2005/tauri2-app-blank-vue-db/releases/latest/download/latest.json

手工创建了json文件
latest.json 手工上传到git上

联动src-tauri\tauri.conf.json中的配置地址，应该就可以

src-tauri\capabilities\default.json 中的访问地址权限需要加上
src-tauri\src\lib.rs 中加上plugin

6、代码中开展检查和升级方法处理


```


### 3.5 远程服务调用
```
参考  https://tauri.app/plugin/http-client/
1、 npm run tauri add http
2、 修改src-tauri/capabilities/default.json
3、 在vue中调用相关地址
  fetch('https://www.guancha.cn/', {
  method: 'GET',
}).then(response=>{
  console.log(response.status); 
  console.log(response.statusText); 
  console.log(response); 
})

```

### 3.4 国际化
多种语言处理机制,应是vue的功能与能力，暂时不急
todo

### 3.3 处理托盘相关内容
todo，不是核心紧急功能，暂时不急

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







