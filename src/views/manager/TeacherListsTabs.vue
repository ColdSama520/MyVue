<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 管理员
                </el-breadcrumb-item>
                <el-breadcrumb-item>查看教师信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`教师信息(${state.teacher.length})`" name="first">
                    <el-table :data="state.teacher" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template #default="scope">
                                <span class="message-title">{{scope.row.teacher_name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180">2020-10-04</el-table-column>
                        <el-table-column width="120">
                            <template #default="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">详细信息</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {ElMessage} from "element-plus";
export default {
    name: "TeacherListsTabs",
    methods:{
    },
    setup() {
        const route = useRouter();
        axios.get('http://localhost:9090/Teacher/all')
            //成功返回
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    state.teacher = response.data;
                }
                else{
                    return false;
                }
            })
            //失败返回
            .catch(error => {
                console.log(error);
                return false;
            })
        const message = ref("first");
        const state = reactive({
            teacher: []
        });

        const handleRead = (index) => { //跳转页面
            localStorage.setItem("tc_message_id", state.teacher[index].teacher_id);
            localStorage.setItem("tc_message_name", state.teacher[index].teacher_name);
            localStorage.setItem("tc_message_phone", state.teacher[index].teacher_phone);
            route.push({ path:'/teachermessage'  })
        }


        return {
            message,
            state,
            handleRead,
        };
    },
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>

