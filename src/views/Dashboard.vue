<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name" @click="ChangeMessage">{{ name }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>语言详情</span>
                        </div>
                    </template>
                    Vue
                    <el-progress :percentage="92.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="6.4" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="1.1"></el-progress>HTML
                    <el-progress :percentage="0.2" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1214</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">2000</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1004</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <template #header>
                        <div class="clearfix">
                            <span>待办事项</span>
                            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                        </div>
                    </template>

                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <div class="todo-item" :class="{
                                        'todo-item-del': scope.row.status,
                                    }">{{ scope.row.title }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { reactive } from "vue";
import {useRouter} from "vue-router";
export default {
    name: "dashboard",
    components: { Schart },
    setup() {
        const name = localStorage.getItem("ms_username");
        const role = localStorage.getItem("ms_role");
        const router = useRouter();

        const todoList = reactive([
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要写100行代码加几个bug吧",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: true,
            },
            {
                title: "今天要写100行代码加几个bug吧",
                status: true,
            },
        ]);

        const ChangeMessage = () => {
          if (role === "学生")
            router.push("/user_student_change");
          if (role === "教师")
            router.push("/user_teacher_change");
        }

        return {
            name,
            todoList,
            role,
            ChangeMessage,
        };
    },
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
