<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-people"></i> 管理员
        </el-breadcrumb-item>
        <el-breadcrumb-item>查看教师信息</el-breadcrumb-item>
        <el-breadcrumb-item>详细信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="teacher.teacherData" border class="teacher">
        <el-table-column prop="teacher_id" label="教师ID"></el-table-column>
        <el-table-column prop="teacher_name" label="教师姓名"></el-table-column>
        <el-table-column prop="teacher_phone" label="联系方式"></el-table-column>
      </el-table>
      <el-table :data="course.courseData" border class="course" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="course_id" label="课程ID"></el-table-column>
        <el-table-column prop="course_name" label="课程名"></el-table-column>
        <el-table-column prop="course_start_year" label="开课日期"></el-table-column>
        <el-table-column prop="course_is_archive" label="是否归档">
          <template #default="scope">
            <el-tag :type="
                                scope.row.course_is_archive === '是'
                                    ? 'success'
                                    : scope.row.course_is_archive === '否'
                                    ? 'danger'
                                    : ''
                            ">{{scope.row.course_is_archive}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="student_class" label="上课班级"></el-table-column>
        <el-table-column prop="student_number" label="上课人数"></el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api/index";
import axios from "axios";

export default {
  name: "teachermessage",
  setup() {
    const teacher = reactive({
        teacherData: [{
            teacher_id: localStorage.getItem("tc_message_id"),
            teacher_name: localStorage.getItem("tc_message_name"),
            teacher_phone: localStorage.getItem("tc_message_phone"),
        }]
    });
    const course = reactive({
        courseData: []
    });
    const tableData = reactive({
        teacher_id: localStorage.getItem("tc_message_id"),
    })
    // 获取表格数据
    const getData = () => {
        axios.get('http://localhost:9090/Course/teacherCourse', { params : tableData })
            //成功返回
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    course.courseData = response.data;
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

    return {
        course,
        teacher,
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
.course {
  width: 100%;
  font-size: 14px;
}
.teacher {
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
