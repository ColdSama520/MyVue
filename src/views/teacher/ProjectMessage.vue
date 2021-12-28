<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 教师
        </el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目浏览</el-breadcrumb-item>
        <el-breadcrumb-item>项目详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
<!--      <div class="handle-box">-->
<!--        <el-input v-model="searchTable.student_id" placeholder="学生ID" class="handle-input mr10"></el-input>-->
<!--        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>-->
<!--      </div>-->
      <el-table :data="project.projectData" border class="project" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="project_id" label="项目ID"></el-table-column>
        <el-table-column prop="project_name" label="项目名"></el-table-column>
        <el-table-column prop="project_introduction" label="项目内容介绍"></el-table-column>
        <el-table-column prop="project_number_limit" label="每组人数限制"></el-table-column>
        <el-table-column prop="project_instructions" label="其他说明"></el-table-column>
        <el-table-column prop="course_id" label="班课ID"></el-table-column>
        <el-table-column prop="group_number" label="选做组数"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <br>
      <div class="handle-row">
        <el-button type="primary" @click="handleRead">小组管理</el-button>
      </div>
    </div>
      <el-dialog title="编辑" v-model="editVisible" width="30%">
          <el-form label-width="80px">
              <el-form-item label="项目内容" >
                  <el-input v-model="form.project_introduction"></el-input>
              </el-form-item>
              <el-form-item label="每组人数" >
                  <el-input v-model="form.project_number_limit"></el-input>
              </el-form-item>
              <el-form-item label="其他说明">
                <el-input v-model="form.project_instructions"></el-input>
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
import {useRouter} from "vue-router";
import axios from "axios";

export default {
      name: "projectmessage",
      methods:{ //跳转页面
        handleRead(){
          this.$router.push({ path:'/groupmessage' })
        }
      },
      setup() {
        const router = useRouter();

        const project = reactive({
          projectData: []
        });
        const tableData = reactive({
          course_id: localStorage.getItem("c_message_id"),
        })
        // 获取表格数据
        const getData = () => {
          axios.get('http://localhost:9090/Project/ProjectGroup', { params : tableData })
              //成功返回
              .then(response => {
                console.log(response);
                if(response.status === 200) {
                  project.projectData = response.data;
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
          project_id: "",
        })

      // 删除操作
      const handleDelete = (index) => {
          // 二次确认删除
          ElMessageBox.confirm("确定要删除吗？", "提示", {
              type: "warning",
          })
              .then(() => {
                deleteData.project_id = project.projectData[index].project_id;
                  axios.get('http://localhost:9090/Group/deleteGroup', { params : deleteData })
                      //成功返回
                      .then(response => {
                          console.log(response);
                          if(response.status === 200) {
                              axios.get('http://localhost:9090/Project/deleteProject', { params : deleteData })
                                  //成功返回
                                  .then(response => {
                                      console.log(response);
                                      if(response.status === 200) {
                                          ElMessage.success("删除成功");
                                          router.go(0);
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
        project_id: "",
        project_introduction: "",
        project_number_limit: "",
        project_instructions: "",
      });

      let idx = -1;
      const handleEdit = (index, row) => {
          idx = index;
          form.project_id = project.projectData[index].project_id;
          editVisible.value = true;
      };
      const saveEdit = () => {
          editVisible.value = false;
        axios.get('http://localhost:9090/Project/updateProject', {params: form})
            //成功返回
            .then(response => {
              console.log(response);
              if (response.status === 200) {
                  ElMessage.success(`修改第 ${idx + 1} 行成功`);
                  router.go(0);
              } else {
                return false;
              }
            })
            //失败返回
            .catch(error => {
              console.log(error);
              return false;
            })
      };

    return {
        project,
        tableData,
        form,
        editVisible,
        deleteData,
        handleDelete,
        handleEdit,
        saveEdit,
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
.project {
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
