<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-peoplefill"></i> 教师
        </el-breadcrumb-item>
        <el-breadcrumb-item>案例管理</el-breadcrumb-item>
        <el-breadcrumb-item>案例浏览</el-breadcrumb-item>
        <el-breadcrumb-item>案例详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchTable.case_name" placeholder="案例名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
      </div>
      <el-table :data="Case.caseData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="case_name" label="案例名称" ></el-table-column>
        <el-table-column prop="case_content" label="案例介绍" ></el-table-column>
        <el-table-column prop="case_type" label="案例类型" ></el-table-column>
        <el-table-column label="案例资源" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-more" @click="handleRead(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="270" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-upload2" @click="handleEdit(scope.$index, scope.row)">上传</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <el-dialog title="编辑" v-model="editVisible" width="30%">
          <el-form label-width="70px">
              <el-form-item label="案例介绍">
                  <el-input v-model="form.case_content"></el-input>
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
      name: "casemessage",
      methods:{ //跳转页面
      },
      setup() {
        const router = useRouter();

        const Case = reactive({
          caseData: []
        });
        const tableData = reactive({
          course_id: localStorage.getItem("c_message_id"),
        })
        // 获取表格数据
        const getData = () => {
          axios.get('http://localhost:9090/Case/CaseCourseAll', { params : tableData })
              //成功返回
              .then(response => {
                console.log(response);
                if(response.status === 200) {
                  Case.caseData = response.data;
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
          case_id: "",
        })

      // 删除操作
      const handleDelete = (index) => {
          deleteData.case_id = Case.caseData[index].case_id;
          // 二次确认删除
          ElMessageBox.confirm("确定要删除吗？", "提示", {
              type: "warning",
          })
              .then(() => {
                axios.get('http://localhost:9090/Case/deleteCaseById', { params : deleteData })
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
              })
              .catch(() => {});
      };

      // 表格编辑时弹窗和保存
      const editVisible = ref(false);
      let form = reactive({
          case_content: "",
          case_id: "",
      });
      let idx = -1;
      const handleEdit = (index, row) => {
          idx = index;
          form.case_id = Case.caseData[index].case_id;
          editVisible.value = true;
      };
      const saveEdit = () => {
          editVisible.value = false;
        axios.get('http://localhost:9090/Case/updateCaseById', {params: form})
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
          case_name: '',
        })

        const handleSearch = () => {
          if(searchTable.case_name === '')
            getData();
          else {
            axios.get('http://localhost:9090/Case/CaseCourseByName', {params: searchTable})
                //成功返回
                .then(response => {
                  console.log(response);
                  if (response.status === 200) {
                    if (response.data.length === 0) {
                      ElMessage.error("请输入该班课的案例名称");
                    }else{
                      Case.caseData = response.data;
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

          const handleRead = (index) => {
            localStorage.setItem("case_id", Case.caseData[index].case_id);
            router.push("/resourcemessage");
          }

    return {
        Case,
        tableData,
        form,
        editVisible,
        searchTable,
        deleteData,
        handleDelete,
        handleEdit,
        saveEdit,
        handleSearch,
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
