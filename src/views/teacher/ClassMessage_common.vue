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
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="handle-row">
        <el-button type="primary" @click="handleRead">添加班课</el-button>
      </div>
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

      // 删除操作
      const handleDelete = (index) => {
          // 二次确认删除
          ElMessageBox.confirm("确定要删除吗？", "提示", {
              type: "warning",
          })
              .then(() => {
                  ElMessage.success("删除成功");
                  tableData.value.splice(index, 1);
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

    return {
        query,
        tableData,
        form,
        editVisible,
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
