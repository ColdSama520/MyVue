<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 教师
        </el-breadcrumb-item>
        <el-breadcrumb-item>班课管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生浏览</el-breadcrumb-item>
        <el-breadcrumb-item>学生详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
            <el-input v-model="searchTable.student_id" placeholder="学生ID" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
        </div>
      <el-table :data="student.studentData" border class="student" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="student_id" label="学生学号"></el-table-column>
        <el-table-column prop="student_name" label="学生姓名"></el-table-column>
        <el-table-column prop="student_class" label="上课班级"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <el-dialog title="编辑" v-model="editVisible" width="30%">
          <el-form label-width="70px">
              <el-form-item label="用户名">
                  <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                  <el-input v-model="form.address"></el-input>
              </el-form-item>
          </el-form>
          <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
          </template>
      </el-dialog>

  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
    name: "studentmessage",
    methods:{ //跳转页面
    },
    setup() {
        const router = useRouter();

        const student = reactive({
          studentData: []
        });
          const tableData = reactive({
            course_id: localStorage.getItem("c_message_id"),
          })
        // 获取表格数据
        const getData = () => {
          axios.get('http://localhost:9090/Student/CourseAllStudent', { params : tableData })
              //成功返回
              .then(response => {
                console.log(response);
                if(response.status === 200) {
                  student.studentData = response.data;
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

        const deleteData = reactive({
            course_id: localStorage.getItem("c_message_id"),
            student_id: "",
        })
        // 删除操作
        const handleDelete = (index) => {
            deleteData.student_id = student.studentData[index].student_id;
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    axios.get('http://localhost:9090/SC/deleteStudent', { params : deleteData })
                        //成功返回
                        .then(response => {
                            console.log(response);
                            if(response.status === 200) {
                                ElMessage.success("删除成功");
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
                })
                .catch(() => {});
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            name: "",
            address: "",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

            const searchTable = reactive({
                course_id: tableData.course_id,
                student_id: '',
            })

            const handleSearch = () => {
                if(searchTable.student_id === '')
                    getData();
                else {
                    axios.get('http://localhost:9090/Student/CourseStudentById', {params: searchTable})
                        //成功返回
                        .then(response => {
                            console.log(response);
                            if (response.status === 200) {
                                if (response.data.length === 0) {
                                    ElMessage.error("请输入选择该班课的学生ID");
                                }else{
                                    student.studentData = response.data;
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
            student,
            tableData,
            form,
            editVisible,
            searchTable,
            deleteData,
            handleEdit,
            handleDelete,
            saveEdit,
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
.student {
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
