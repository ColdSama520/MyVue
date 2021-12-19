<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 教师
        </el-breadcrumb-item>
        <el-breadcrumb-item>班课管理</el-breadcrumb-item>
        <el-breadcrumb-item>正常班课</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table>
        <el-table-column prop="teacher_id" label="教师ID"></el-table-column>
        <el-table-column prop="teacher_name" label="教师姓名"></el-table-column>
        <el-table-column prop="teacher_phone" label="联系方式"></el-table-column>
      </el-table>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="course_id" label="课程ID"></el-table-column>
        <el-table-column prop="course_name" label="课程名"></el-table-column>
        <el-table-column prop="course_start_year" label="开课日期"></el-table-column>
        <el-table-column prop="course_is_archive" label="是否归档">
          <template #default="scope">
            <el-tag :type="
                                scope.row.state === '成功'
                                    ? 'success'
                                    : scope.row.state === '失败'
                                    ? 'danger'
                                    : ''
                            ">归档</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="student_class" label="上课班级"></el-table-column>
        <el-table-column prop="date" label="上课人数"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="handle-row">
        <el-button type="primary" @click="handleRead">添加班课</el-button>
      </div>
    </div>


  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api";

export default {
  name: "classmessage_common",
  methods:{ //跳转页面
    handleRead(){
      this.$router.push({ path:'/classmessage_common_add' })
    }
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
