<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 学生
        </el-breadcrumb-item>
        <el-breadcrumb-item>班课查看</el-breadcrumb-item>
        <el-breadcrumb-item>班课详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table>
        <el-table-column prop="student_id" label="学生ID"></el-table-column>
        <el-table-column prop="student_name" label="学生姓名"></el-table-column>
        <el-table-column prop="student_phone" label="联系方式"></el-table-column>
      </el-table>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="course_id" label="课程ID"></el-table-column>
        <el-table-column prop="course_name" label="课程名"></el-table-column>
        <el-table-column prop="course_start_year" label="开课日期"></el-table-column>
        <el-table-column prop="student_class" label="上课班级"></el-table-column>
        <el-table-column prop="date" label="上课人数"></el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api";

export default {
      name: "classmessage_student",
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
