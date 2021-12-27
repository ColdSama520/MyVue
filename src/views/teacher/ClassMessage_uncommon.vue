<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 教师
        </el-breadcrumb-item>
        <el-breadcrumb-item>班课管理</el-breadcrumb-item>
        <el-breadcrumb-item>归档班课</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchTable.course_id" placeholder="课程ID" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <el-table :data="teacher.teacherData" border class="teacher" ref="multipleTable" header-cell-class-name="table-header">
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
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-switch
                style="display: block"
                v-model="scope.row.course_is_archive"
                active-color="#ff4949"
                inactive-color="#13ce66"
                active-text="归档"
                inactive-text="正常"
                active-value="是"
                inactive-value="否"
                @change="updateArchive(scope.row.course_id)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <br>
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
import {useRouter} from "vue-router";
import axios from "axios";
import {useStore} from "vuex";

export default {
  name: "classmessage_uncommon",
  setup() {
    const router = useRouter();

    const teacher = reactive({
      teacherData: []
    })
    const course = reactive({
      courseData: []
    });
    const tableData = reactive({
      teacher_id: localStorage.getItem("ms_username"),
    })

    // 获取表格数据
    const getData = () => {
      axios.get('http://localhost:9090/Teacher/search', { params : tableData })
          //成功返回
          .then(response => {
            console.log(response);
            if(response.status === 200) {
              teacher.teacherData = response.data;
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
      axios.get('http://localhost:9090/Course/CourseUnCommon', { params : tableData })
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

    const store = useStore();
    const updateArchive = (id) => {
      axios.get('http://localhost:9090/Course/updateCommon', { params : {course_id: id} })
          //成功返回
          .then(response => {
            console.log(response);
              ElMessageBox.confirm("确定要取消归档吗？", "提示", {
                  type: "warning",
              })
                  .then(() => {
                      if (response.status === 200) {
                          ElMessage.success("修改成功");
                          store.commit("clearTags");
                          router.push('/classmessage_common')
                      } else {
                          return false;
                      }
                  })
                  .catch(() => {
                      axios.get('http://localhost:9090/Course/updateUnCommon', { params : {course_id: id} })
                          //成功返回
                          .then(response => {
                              console.log(response);
                              if(response.status === 200) {
                                  router.go(0)
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
                  });
          })
          //失败返回
          .catch(error => {
            console.log(error);
            return false;
          })
    }

    const searchTable = reactive({
      course_id: '',
      teacher_id: tableData.teacher_id,
    })

    const handleSearch = () => {
      if(searchTable.course_id === '')
        getData();
      else {
        axios.get('http://localhost:9090/Course/CourseUnCommonMessage', {params: searchTable})
            //成功返回
            .then(response => {
              console.log(response);
              if (response.status === 200) {
                if (response.data.length === 0) {
                  ElMessage.error("请输入该教师所教授科目ID");
                }else{
                  course.courseData = response.data;
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
      teacher,
      course,
      tableData,
      searchTable,
      updateArchive,
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
