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
        <el-input v-model="searchTable.task_type" placeholder="规划中，实施中，已完成" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearchByType()">搜索</el-button>
      </div>
      <el-table :data="task.taskData" border class="course" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="task_name" label="任务名称"></el-table-column>
        <el-table-column prop="task_stage_type" label="阶段类型"></el-table-column>
        <el-table-column prop="task_details" label="任务详情"></el-table-column>
        <el-table-column prop="task_type" label="任务状态"></el-table-column>
        <el-table-column prop="task_score" label="任务评分"></el-table-column>
        <el-table-column prop="task_reviews" label="任务点评"></el-table-column>
        <el-table-column prop="task_score_date" label="修改时间"></el-table-column>
        <el-table-column label="操作" width="370" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-link" @click="handleEdit(scope.$index, scope.row)">教师评价</el-button>
          </template>
        </el-table-column>
      </el-table>
        <br>

    </div>
    <el-dialog title="教师点评" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="任务评分">
          <el-input v-model="form.task_score" placeholder="0-10分"></el-input>
        </el-form-item>
        <el-form-item label="任务点评">
          <el-input v-model="form.task_reviews" placeholder="随便写点？"></el-input>
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
          axios.get('http://localhost:9090/Task/TaskMessageByStudentId', { params: { student_id: localStorage.getItem("s_message_id") } })
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
          task_type: '',
          student_id: localStorage.getItem("s_message_id"),
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

        const handleSearchByType = () => {
          if(searchTable.task_type === '')
            getData();
          else {
            axios.get('http://localhost:9090/Task/TaskMessageSearchByTaskType', {params: searchTable})
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
          task_score: '',
          task_reviews: '',
          task_score_date: '',
        });
        let idx = -1;
        const handleEdit = (index, row) => {
          idx = index;
          form.task_id = task.taskData[index].task_id;
          setNowTimes()
          form.task_score_date = sj.nowDate + sj.nowTime;
          editVisible.value = true;
        };
        const saveEdit = () => {
          editVisible.value = false;
          axios.get('http://localhost:9090/Task/IsTaskTypeHasWorked', { params: form })
              //成功返回
              .then(response => {
                console.log(response);
                if (response.data === 1) {
                  axios.get('http://localhost:9090/Task/TaskMessageUpdateByTeacherR', {params: form})
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
                } else {
                  ElMessage.error("当前任务未完成，不能进行评分！！！");
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
      sj,
        task,
        searchTable,
        editVisible,
        form,
        handleSearch,
      handleSearchByType,
        handleEdit,
        saveEdit,
      setNowTimes,
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
