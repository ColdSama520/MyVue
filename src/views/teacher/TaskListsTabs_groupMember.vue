<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <i class="el-icon-lx-peoplefill"></i> 教师
              </el-breadcrumb-item>
              <el-breadcrumb-item>项目任务管理-小组成员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
              <el-tab-pane :label="`班课信息(${state.sg.length})`" name="first">
                <el-table :data="state.sg" :show-header="false" style="width: 100%">
                  <el-table-column>
                    <template #default="scope">
                      <span class="message-title" @click="handleMessage(scope.$index)">{{scope.row.student_name}}</span>
                    </template>
                  </el-table-column>
                      <el-table-column prop="date" width="180">2020-10-04</el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
export default {
    name: "taskliststabs_groupmember",
    methods:{ //跳转页面
    },
    setup() {
      const router = useRouter();
      const tableData = reactive({
          group_id: localStorage.getItem("g_message_id"),
      })
        axios.get('http://localhost:9090/SG/selectGroupMemberByGroupId', { params : tableData })
          //成功返回
          .then(response => {
            console.log(response);
            if(response.status === 200) {
              state.sg = response.data;
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
        sg: []
      });

      const handleMessage = (index) => {
        localStorage.setItem("s_message_id", state.sg[index].student_id);
        router.push({ path:'/taskmessage_teacher'  })
      }

        return {
          message,
          state,
          tableData,
          handleMessage,
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

