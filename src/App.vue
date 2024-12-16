<script setup lang="ts">
import { invoke } from "@tauri-apps/api/core";

import { onMounted, ref, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Search,
  Plus,
  Delete,
  DCaret,
  Refresh,
  ArrowDown,
  Finished,
} from "@element-plus/icons-vue";
import Mock from "mockjs";
import Database from "@tauri-apps/plugin-sql";

import { fetch } from '@tauri-apps/plugin-http';
import { check } from '@tauri-apps/plugin-updater'
import { relaunch } from '@tauri-apps/plugin-process'


const editformVisible = ref(false);
const editformTitle = ref("新增");
const editformRef = ref(null);

const isLoading = ref(false);
const tableSize = ref("small");
const previewList = ref([]);
const selectRows = ref([]);
const editformObj = ref({
  username: "",
  role: "",
  email: "",
  image: [],
});
const greetMsg = ref("");
const name = ref("");

// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//   greetMsg.value = await invoke("greet", { name: name.value });
// }

let multipleTables = Mock.mock({
  total: 100,
  currentPage: 1,
  "list|15": [
    {
      id: "@id",
      username: "@cname",
      hitNum: "@integer(1000,10000)",
      "role|1": ["admin", "dev", "test", "saler", "merchant", "trader"],
      "operate|+1": [
        "表格",
        "表单",
        "个人中心",
        "用户管理",
        "修改密码",
        "订单编辑",
        "订单删除",
      ],
      switch: "@boolean",
      percent: "@integer(30, 90)",
      email: "@email()",
      ip: "@ip()",
      "account|+1": [
        "admin",
        "test",
        "dev",
        "saler",
        "dealer",
        "merchant",
        "trader",
      ]    },
  ],
});

// 查询数据库数据
const fetchDBData = async () => {
  fetchData();
};
// 查询数据库数据
const fetchData = async () => {
  isLoading.value = true
  console.log(isLoading);
  const db = await Database.load("sqlite:Chinook.db");
  const result= await db.select(
    "select id,name as username,email from Employee"
  );
    console.log(multipleTables.list);

    multipleTables.list = result;
    console.log(result);
    console.log(multipleTables.list);
    isLoading.value = false
    console.log(isLoading);

};

// 插入数据库数据
const insertData = async (editformObj_value) => {
  const db = await Database.load("sqlite:Chinook.db");
  const result = await db.execute(
    "INSERT into Employee ( name,email) VALUES ($1, $2)",
    [editformObj_value.username, editformObj_value.email]
  );
  fetchData();

  // console.log(editformObj_value)
  // console.log("insert ok")
};
// 删除数据库数据
const delData = async (editformObj_value_id) => {
  const db = await Database.load("sqlite:Chinook.db");
  const result = await db.execute("delete from Employee where id = $1", [
    editformObj_value_id,
  ]);
  fetchData();
  // console.log(editformObj_value)
  // console.log("insert ok")
};
// 选中行
const handleSelectionRows = (val) => {
  selectRows.value = val
}
// 刷新
const handleLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
}
// 新增/编辑
const handleAddEdit = (row) => {
  editformVisible.value = true;
  editformTitle.value = "新增";
};
const handleReset = () => {
  editformObj.value = {
    username: "",
    role: "",
    email: "",
    image: [],
  };
  editformRef.value.resetFields();
};
const editformRules = ref({
  username: [
    { required: true, message: "请输入用户名", trigger: ["blur", "input"] },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
  ],
  email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
});
const handleSubmit = () => {
  editformRef.value.validate((valid) => {
    if (valid) {
      editformVisible.value = false;
      //此处处理数据新增
      let testa = {};
      testa.username = editformObj.value.username;
      testa.email = editformObj.value.email;
      insertData(testa);
      console.log(editformObj.value);
      // ElMessage.success("数据保存成功！");
      handleReset();
    } else {
      ElMessage.error("验证失败，请填写完整信息");
      return false;
    }
  });
};


// 调用远程接口
const getRemote =  () => {
  fetch('https://www.guancha.cn/', {
  method: 'GET',
}).then(response=>{
  console.log(response.status); 
  console.log(response.statusText); 
  console.log(response); 
})

};

const checkVersion=async ()=>{
  console.log("-------1----")
  const update = await check();
  console.log("--------2---")

  if (update) {
    console.log(
      `found update ${update.version} from ${update.date} with notes ${update.body}`
    );
    let downloaded = 0;
    let contentLength = 0;
    // alternatively we could also call update.download() and update.install() separately
    await update.downloadAndInstall((event) => {
      switch (event.event) {
        case 'Started':
          contentLength = event.data.contentLength;
          console.log(`started downloading ${event.data.contentLength} bytes`);
          break;
        case 'Progress':
          downloaded += event.data.chunkLength;
          console.log(`downloaded ${downloaded} from ${contentLength}`);
          break;
        case 'Finished':
          console.log('download finished');
          break;
      }
    });

    console.log('update installed');
    await relaunch();
  }
}



</script>

<template>
  <main class="container">
    <el-drawer
      v-model="editformVisible"
      :title="editformTitle"
      @close="handleReset"
    >
      <template #default>
        <el-form
          ref="editformRef"
          :model="editformObj"
          :rules="editformRules"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model.trim="editformObj.username"
              autocomplete="off"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model.trim="editformObj.email"
              autocomplete="off"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="success" :icon="Finished" @click="handleSubmit">保存</el-button
          >
        </div>
      </template>
    </el-drawer>   
    <el-button type="success"  round @click="handleAddEdit">新增</el-button>
    <el-button type="success" round @click="fetchDBData">查询数据库</el-button>
    <el-button type="success" round @click="getRemote">查询远端</el-button>
    <el-button type="success" round @click="checkVersion">检查更新</el-button>

    <!-- 表格 -->
    <el-table
      :data="multipleTables.list"
      row-key="id"
      stripe
      border
      :size="tableSize"
      @selection-change="handleSelectionRows"
      max-height="450"
      :header-cell-style="{ background: '#f6f6f6' }"
    >
      <el-table-column type="selection" fixed align="center"></el-table-column>
      <!-- <el-table-column label="序号" prop="id"></el-table-column> -->
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>

      
    </el-table>
  </main>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

.row {
  display: flex;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

input,
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}
button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

input,
button {
  outline: none;
}

#greet-input {
  margin-right: 5px;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  a:hover {
    color: #24c8db;
  }

  input,
  button {
    color: #ffffff;
    background-color: #0f0f0f98;
  }
  button:active {
    background-color: #0f0f0f69;
  }
}
</style>
