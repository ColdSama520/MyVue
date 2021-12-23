<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-peoplefill"></i> 学生
                </el-breadcrumb-item>
                <el-breadcrumb-item>班课查看</el-breadcrumb-item>
                <el-breadcrumb-item>项目详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="project_id" label="项目ID"></el-table-column>
                <el-table-column prop="project_name" label="项目名"></el-table-column>
                <el-table-column prop="project_introduction" label="项目内容介绍"></el-table-column>
                <el-table-column prop="project_number_limit" label="每组人数限制"></el-table-column>
                <el-table-column prop="project_instructions" label="其他说明"></el-table-column>
                <el-table-column prop="course_id" label="班课ID"></el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api";

export default {
      name: "projectmessage_student",
      methods:{ //跳转页面
      },
      setup() {
        const query = reactive({
          name: "",
        });
        const tableData = ref([]);
        // 获取表格数据
        const getData = () => {
          fetchData(query).then((res) => {
            tableData.value = res.list;
          });
        };
        getData();

    return {
        query,
        tableData,
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
