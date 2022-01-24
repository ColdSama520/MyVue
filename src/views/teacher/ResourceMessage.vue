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
        <el-breadcrumb-item>资源查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="Resource.ResourceData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="resource_name" label="资源名称" ></el-table-column>
        <el-table-column prop="resource_type" label="资源类型" ></el-table-column>
        <el-table-column prop="resource_date" label="上传日期" ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
      name: "resourcemessage",
      methods:{ //跳转页面
      },
      setup() {
        const router = useRouter();

        const Resource = reactive({
          ResourceData: []
        });
        const tableData = reactive({
          case_id: localStorage.getItem("case_id"),
        })
        // 获取表格数据
        const getData = () => {
          axios.get('http://localhost:9090/Resource/ResourceCaseAll', { params : tableData })
              //成功返回
              .then(response => {
                console.log(response);
                if(response.status === 200) {
                  Resource.ResourceData = response.data;
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
          resource_id: "",
        })

      // 删除操作
      const handleDelete = (index) => {
          deleteData.resource_id = Resource.ResourceData[index].resource_id;
          // 二次确认删除
          ElMessageBox.confirm("确定要删除吗？", "提示", {
              type: "warning",
          })
              .then(() => {
                axios.get('http://localhost:9090/Resource/deleteResourceById', { params : deleteData })
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



    return {
        Resource,
        tableData,
        deleteData,
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
