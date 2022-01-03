<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 教师
        </el-breadcrumb-item>
        <el-breadcrumb-item>项目任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>小组管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchTable.group_id" placeholder="小组ID" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <el-table :data="group.groupData" border class="course" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="group_id" label="小组ID"></el-table-column>
        <el-table-column prop="group_name" label="小组名"></el-table-column>
        <el-table-column prop="student_id" label="组长ID"></el-table-column>
        <el-table-column prop="project_id" label="项目ID"></el-table-column>
      </el-table>
        <br>
    </div>


  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
      name: "groupmessage_student",
      methods:{ //跳转页面
        handleRead(){
          this.$router.push({ path:'/classmessage_common_add' })
        }
      },
      setup() {

        const router = useRouter();

        const group = reactive({
          groupData: []
        })

        // 获取表格数据
        const getData = () => {
          axios.get('http://localhost:9090/Group/CourseGroupAllNo')
              //成功返回
              .then(response => {
                console.log(response);
                if(response.status === 200) {
                  group.groupData = response.data;
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
        };
        getData();

        const searchTable = reactive({
          group_id: '',
        })

        const handleSearch = () => {
          if(searchTable.group_id === '')
            getData();
          else {
            axios.get('http://localhost:9090/Group/CourseGroupSearch', {params: searchTable})
                //成功返回
                .then(response => {
                  console.log(response);
                  if (response.status === 200) {
                    if (response.data.length === 0) {
                      ElMessage.error("请输入小组ID");
                    }else{
                      group.groupData = response.data;
                    }
                  } else {
                    return false;
                  }
                })
                //失败返回
                .catch(error => {
                  console.log(error);
                  return false;
                })
          }
        };

    return {
        group,
        searchTable,
        handleSearch,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.teacher {
  width: 100%;
  font-size: 14px;
}
.course {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
