<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 教师
        </el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>小组浏览</el-breadcrumb-item>
        <el-breadcrumb-item>小组详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchTable.student_id" placeholder="组长ID" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <el-table :data="group.groupData" border class="group" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="project_name" label="项目名"></el-table-column>
        <el-table-column prop="student_id" label="组长"></el-table-column>
        <el-table-column prop="student_member" label="组员"></el-table-column>
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
        <el-button type="primary" @click="handleRead">项目任务管理</el-button>
      </div>
    </div>
      <el-dialog title="编辑" v-model="editVisible" width="30%">
          <el-form label-width="70px">
              <el-form-item label="组长ID">
                  <el-input v-model="form.student_id"></el-input>
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
      name: "groupmessage",
      methods:{ //跳转页面
        handleRead(){
          this.$router.push({ path:'/projectmessage' })
        }
      },
      setup() {
        const router = useRouter();

        const group = reactive({
          groupData: []
        });
        const tableData = reactive({
          course_id: localStorage.getItem("c_message_id"),
        })
        // 获取表格数据
        const getData = () => {
          axios.get('http://localhost:9090/Group/CourseAllGroup', { params : tableData })
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


        const deleteData = reactive({
          course_id: localStorage.getItem("c_message_id"),
          student_id: "",
          group_id: "",
        })

      // 删除操作
      const handleDelete = (index) => {
          // 二次确认删除
          ElMessageBox.confirm("确定要删除吗？", "提示", {
              type: "warning",
          })
              .then(() => {
                deleteData.student_id = group.groupData[index].student_id;
                deleteData.group_id = group.groupData[index].group_id;
                axios.get('http://localhost:9090/SG/deleteSGByGroupId', { params : deleteData })
                    //成功返回
                    .then(response => {
                      console.log(response);
                      if(response.status === 200) {
                        axios.get('http://localhost:9090/Group/deleteGroupByGroupId', { params : deleteData })
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
        group_id: "",
        student_id: "",
      });
      let idx = -1;
      const handleEdit = (index, row) => {
          idx = index;
          form.group_id = group.groupData[index].group_id;
          editVisible.value = true;
      };
      const saveEdit = () => {
          editVisible.value = false;
        axios.get('http://localhost:9090/Group/updateGroup', {params: form})
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

        const searchTable = reactive({
          course_id: localStorage.getItem("c_message_id"),
          student_id: '',
        })

        const handleSearch = () => {
          if(searchTable.student_id === '')
            getData();
          else {
            axios.get('http://localhost:9090/Group/GroupCourseProjectById', {params: searchTable})
                //成功返回
                .then(response => {
                  console.log(response);
                  if (response.status === 200) {
                    if (response.data.length === 0) {
                      ElMessage.error("请输入该班课的组长ID");
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
        tableData,
        form,
        editVisible,
        searchTable,
        deleteData,
        handleDelete,
        handleEdit,
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
.group {
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
