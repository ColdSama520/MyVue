<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 学生
        </el-breadcrumb-item>
        <el-breadcrumb-item>案例管理</el-breadcrumb-item>
        <el-breadcrumb-item>案例浏览</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchTable.case_name" placeholder="案例名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <el-table :data="Case.caseData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="case_name" label="案例名称" ></el-table-column>
        <el-table-column prop="case_content" label="案例介绍" ></el-table-column>
        <el-table-column prop="case_type" label="案例类型" ></el-table-column>
        <el-table-column label="案例资源" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-more" @click="handleRead(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
      name: "casemessage_student",
      methods:{ //跳转页面
      },
      setup() {
        const router = useRouter();

        const Case = reactive({
          caseData: []
        });
        const tableData = reactive({
          course_id: localStorage.getItem("c_message_id"),
        })
        // 获取表格数据
        const getData = () => {
          axios.get('http://localhost:9090/Case/CaseCourseAll', { params : tableData })
              //成功返回
              .then(response => {
                console.log(response);
                if(response.status === 200) {
                  Case.caseData = response.data;
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
          course_id: localStorage.getItem("c_message_id"),
          case_name: '',
        })

        const handleSearch = () => {
          if(searchTable.case_name === '')
            getData();
          else {
            axios.get('http://localhost:9090/Case/CaseCourseByName', {params: searchTable})
                //成功返回
                .then(response => {
                  console.log(response);
                  if (response.status === 200) {
                    if (response.data.length === 0) {
                      ElMessage.error("请输入该班课的案例名称");
                    }else{
                      Case.caseData = response.data;
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

          const handleRead = (index) => {
            localStorage.setItem("case_id", Case.caseData[index].case_id);
            router.push("/resourcemessage_student");
          }

    return {
        Case,
        tableData,
        searchTable,
        handleSearch,
        handleRead,
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
.table {
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
