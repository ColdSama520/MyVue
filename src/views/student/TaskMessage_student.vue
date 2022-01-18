<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 学生
        </el-breadcrumb-item>
        <el-breadcrumb-item>项目任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目任务</el-breadcrumb-item>
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
        <el-table-column label="操作" width="370" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-link" @click="handleEdit(scope.$index, scope.row)">加入</el-button>
            <el-button type="text" icon="el-icon-close" @click="handleDelete(scope.$index, scope.row)">删除小组成员</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleChoose(scope.$index, scope.row)">选择项目</el-button>
          </template>
        </el-table-column>
      </el-table>
        <br>
    </div>
    <el-dialog title="信息" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        是否加入该小组
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog title="选择项目" v-model="editVisible1" width="30%">
      <el-form label-width="70px">
        <el-form-item label="项目ID">
          <el-input v-model="form1.project_id"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit1">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog title="删除小组成员" v-model="editVisible2" width="30%">
      <el-form label-width="70px">
        <el-form-item label="学生ID">
          <el-input v-model="form2.student_id"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit2">确 定</el-button>
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
      name: "taskmessage_student",
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

        const editVisible = ref(false);
        let form = reactive({
          group_id : "",
          student_id : "",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
          idx = index;
          form.group_id = group.groupData[index].group_id;
          form.student_id = localStorage.getItem("ms_username");
          editVisible.value = true;
        };
        const saveEdit = () => {
          editVisible.value = false;
          axios.get('http://localhost:9090/SG/HasGroupByStudentId', {params: form})
              //成功返回
              .then(response => {
                console.log(response);
                if (response.data === "") {
                  axios.get('http://localhost:9090/SG/HasGroupNumber', {params: form})
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.data === 1) {
                          axios.get('http://localhost:9090/SG/GroupAddNewStudent', {params: form})
                              //成功返回
                              .then(response => {
                                console.log(response);
                                if (response.status === 200) {
                                  ElMessage.success("加入成功！");
                                } else {
                                  return false;
                                }
                              })
                              //失败返回
                              .catch(error => {
                                console.log(error);
                                return false;
                              })
                        } else {
                          ElMessage.error("人数已满，不可以加入！");
                          return false;
                        }
                      })
                      //失败返回
                      .catch(error => {
                        console.log(error);
                        return false;
                      })
                } else {
                  ElMessage.error("不可以重复加入小组！！！");
                  return false;
                }
              })
              //失败返回
              .catch(error => {
                console.log(error);
                return false;
              })
        };

        // 表格编辑时弹窗和保存
        const editVisible2 = ref(false);
        let form2 = reactive({
          group_id: "",
          student_id: "",
        });
        let idx2 = -1;
        const handleDelete = (index, row) => {
          idx2 = index;
          form2.group_id = group.groupData[index].group_id;
          editVisible2.value = true;
        };
        const saveEdit2 = () => {
          editVisible2.value = false;
          axios.get('http://localhost:9090/Group/IsGroupHeader', {params: form2})
              //成功返回
              .then(response => {
                console.log(response);
                if (response.data === localStorage.getItem("ms_username")) {
                  axios.get('http://localhost:9090/SG/deleteSGStudentByID', {params: form2})
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                          ElMessage.success(`成员已删除!!!`);
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
                } else {
                  ElMessage.error("无权限!!!");
                  return false;
                }
              })
              //失败返回
              .catch(error => {
                console.log(error);
                return false;
              })
        };

        // 表格编辑时弹窗和保存
        const editVisible1 = ref(false);
        let form1 = reactive({
          project_id: "",
          student_id: "",
        });
        let idx1 = -1;
        const handleChoose = (index, row) => {
          idx1 = index;
          form1.student_id = group.groupData[index].student_id;
          editVisible1.value = true;
        };
        const saveEdit1 = () => {
          editVisible1.value = false;
          axios.get('http://localhost:9090/Group/updateGroupProject', {params: form1})
              //成功返回
              .then(response => {
                console.log(response);
                if (response.status === 200) {
                  ElMessage.success(`修改项目成功!!!`);
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
        group,
        searchTable,
        editVisible,
        form,
      editVisible1,
      form1,
      editVisible2,
      form2,
        handleSearch,
        handleEdit,
        saveEdit,
      saveEdit1,
      saveEdit2,
      handleChoose,
      handleDelete,
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
