<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 教师
        </el-breadcrumb-item>
        <el-breadcrumb-item>项目任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>成员项目任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchTable.task_name" placeholder="任务名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <el-table :data="task.taskData" border class="course" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="task_name" label="任务名称"></el-table-column>
        <el-table-column prop="task_stage_type" label="阶段类型"></el-table-column>
        <el-table-column prop="task_details" label="任务详情"></el-table-column>
        <el-table-column prop="task_type" label="任务状态"></el-table-column>
        <el-table-column label="操作" width="370" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-link" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" icon="el-icon-close" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <br>
      <el-button type="primary" icon="el-icon-plus" @click="handleRead()">添加新任务</el-button>
    </div>
    <el-dialog title="信息修改" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="任务名称">
          <el-input v-model="form.task_name"></el-input>
        </el-form-item>
        <el-form-item label="阶段类型">
          <el-input v-model="form.task_stage_type" placeholder="策划型、开发型、文档型、测试型、部署型"></el-input>
        </el-form-item>
        <el-form-item label="任务详情">
          <el-input v-model="form.task_details"></el-input>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-input v-model="form.task_type" placeholder="规划中、实施中、已完成"></el-input>
        </el-form-item>
<!--        <el-form-item label="修改时间">-->
<!--          <el-input v-model="form.task_alter_date" ></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog title="删除" v-model="editVisible2" width="30%">
      <el-form label-width="70px">
        是否删除该任务
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
      name: "taskmessage_teacher",
      methods:{ //跳转页面

      },
      setup() {

        const router = useRouter();

        const task = reactive({
          taskData: []
        })

        const sj = reactive({
          timer: null,
          nowDate: '',
          nowTime: '',
        })

        const setNowTimes = () => {
          const myDate = new Date()
          console.log(myDate)
          const yy = String(myDate.getFullYear())
          const mm = myDate.getMonth() + 1
          const dd = String(
              myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
          )
          const hou = String(
              myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
          )
          const min = String(
              myDate.getMinutes() < 10
                  ? '0' + myDate.getMinutes()
                  : myDate.getMinutes()
          )
          const sec = String(
              myDate.getSeconds() < 10
                  ? '0' + myDate.getSeconds()
                  : myDate.getSeconds()
          )
          sj.nowDate = yy + '-' + mm + '-' + dd + ' '
          sj.nowTime = hou + ':' + min + ':' + sec
        }

        // 获取表格数据
        const getData = () => {
          axios.get('http://localhost:9090/Task/TaskMessageByStudentId', { params: { student_id: localStorage.getItem("ms_username") } })
              //成功返回
              .then(response => {
                console.log(response);
                if(response.status === 200) {
                  task.taskData = response.data;
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
          task_name: '',
          student_id: localStorage.getItem("ms_username"),
        })

        const handleSearch = () => {
          if(searchTable.task_name === '')
            getData();
          else {
            axios.get('http://localhost:9090/Task/TaskMessageSearchByTaskName', {params: searchTable})
                //成功返回
                .then(response => {
                  console.log(response);
                  if (response.status === 200) {
                    if (response.data.length === 0) {
                      ElMessage.error("请输入任务名称");
                    }else{
                      task.taskData = response.data;
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
          task_id: '',
          task_name: '',
          task_stage_type: '',
          task_details: '',
          task_type: '',
          task_alter_date: '',
        });
        let idx = -1;
        const handleEdit = (index, row) => {
          idx = index;
          setNowTimes();
          form.task_id = task.taskData[index].task_id;
          form.task_name = task.taskData[index].task_name;
          form.task_stage_type = task.taskData[index].task_stage_type;
          form.task_details = task.taskData[index].task_details;
          form.task_type = task.taskData[index].task_type;
          form.task_alter_date = sj.nowDate + sj.nowTime;
          editVisible.value = true;
        };
        const saveEdit = () => {
          editVisible.value = false;
          axios.get('http://localhost:9090/Task/TaskMessageUpdateById', {params: form})
              //成功返回
              .then(response => {
                console.log(response);
                if (response.status === 200) {
                  ElMessage.success("修改成功!!!");
                  router.go(0);
                } else {
                  ElMessage.error("修改失败！！！");
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
          task_id: "",
        });
        let idx2 = -1;
        const handleDelete = (index, row) => {
          idx2 = index;
          form2.task_id = task.taskData[index].task_id;
          editVisible2.value = true;
        };
        const saveEdit2 = () => {
          editVisible2.value = false;
          axios.get('http://localhost:9090/Task/deleteTaskById', {params: form2})
              //成功返回
              .then(response => {
                console.log(response);
                if (response.status === 200) {
                  ElMessage.success("删除成功!!!");
                  router.go(0);
                } else {
                  ElMessage.error("删除失败!!!");
                  return false;
                }
              })
              //失败返回
              .catch(error => {
                console.log(error);
                return false;
              })
        };
        const handleRead = () => {
          router.push("/task_add");
        }


    return {
      sj,
        task,
        searchTable,
        editVisible,
        form,
      editVisible2,
      form2,
        handleSearch,
        handleEdit,
        saveEdit,
      saveEdit2,
      handleDelete,
      setNowTimes,
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
