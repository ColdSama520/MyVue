<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <i class="el-icon-lx-peoplefill"></i> 教师
              </el-breadcrumb-item>
              <el-breadcrumb-item>案例管理</el-breadcrumb-item>
              <el-breadcrumb-item>案例浏览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <div class="container">
        <el-tabs v-model="message">
          <el-tab-pane :label="`班课信息(${state.course.length})`" name="first">
            <el-table :data="state.course" :show-header="false" style="width: 100%">
              <el-table-column>
                <template #default="scope">
                  <span class="message-title" @click="handleMessage(scope.$index)">{{scope.row.course_name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="180">2020-10-04</el-table-column>
              <el-table-column width="120">
                <template #default="scope">
                  <el-button size="small" @click="handleRead(scope.$index)">添加案例</el-button>
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
import {useRouter} from "vue-router";
import axios from "axios";
export default {
  name: "classliststabs_case",
  methods:{ //跳转页面
  },
  setup() {
    const router = useRouter();
    const tableData = reactive({
      teacher_id: localStorage.getItem("ms_username"),
    })

    axios.get('http://localhost:9090/Course/CourseTeacherCommon', { params : tableData })
        //成功返回
        .then(response => {
          console.log(response);
          if(response.status === 200) {
            state.course = response.data;
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
      course: []
    });

    const handleMessage = (index) => {
      localStorage.setItem("c_message_id", state.course[index].course_id);
      router.push({ path:'/casemessage'  })
    }

    const handleRead = (index) => {
      localStorage.setItem("c_message_id", state.course[index].course_id);
      router.push({ path:'/case_add'  })
    }



    return {
      message,
      state,
      tableData,
      handleMessage,
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

