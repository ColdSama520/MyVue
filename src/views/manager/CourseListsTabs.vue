<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 管理员
                </el-breadcrumb-item>
                <el-breadcrumb-item>查看课程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <div class="container">
        <el-tabs v-model="message">
          <el-tab-pane :label="`班课信息(${state.course.length})`" name="first">
            <el-table :data="state.course" :show-header="false" style="width: 100%">
              <el-table-column>
                <template #default="scope">
                  <span class="message-title">{{scope.row.course_name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="180"></el-table-column>
              <el-table-column width="120">
                <template #default="scope">
                  <el-button size="small" @click="handleRead(handleRead(scope.$index))">详细信息</el-button>
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
  name: "courseliststabs",
  methods:{ //跳转页面
    handleRead(){
      this.$router.push({ path:'/coursemessage'  })
    }
  },
  setup() {
    const route = useRouter();
    axios.get('http://localhost:9090/Course/all')
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

    const handleRead = (index) => { //跳转页面
      localStorage.setItem("course_id", state.course[index].course_id);
      route.push({ path:'/coursemessage'  })
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

