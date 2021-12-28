<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 教师
                </el-breadcrumb-item>
                <el-breadcrumb-item>项目管理</el-breadcrumb-item>
                <el-breadcrumb-item>项目浏览</el-breadcrumb-item>
                <el-breadcrumb-item>添加项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="group" label-width="80px">
                    <el-form-item label="小组ID" prop="group_id">
                      <el-input v-model="group.group_id"></el-input>
                    </el-form-item>
                    <el-form-item label="项目ID">
                      <el-select v-model="group.project_id" placeholder="请选择" >
                        <el-option v-for="item in region.regionData"
                                   :key="item.label"
                                   :label="item.label"
                                   :value="item.label"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="组名" prop="group_name">
                        <el-input v-model="group.group_name"></el-input>
                    </el-form-item>
                    <el-form-item label="组长学号" prop="student_id">
                      <el-input v-model="group.student_id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                    <p class="login-tips">Tips : 小组默认添加到对应项目。</p>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import router from "../../router";
export default {
    name: "group_add",
    setup() {
        const rules = {
          group_id: [
            { required: true, message: "请输入小组ID", trigger: "blur" },
            ],
          // region: [
          //   { required: true, message: "请选择项目ID", trigger: "blur" },
          // ],
          group_name: [
            { required: true, message: "请输入小组名称", trigger: "blur" },
          ],
          student_id: [
            { required: true, message: "请输入组长学号", trigger: "blur" },
            ],
        };
        const formRef = ref(null);

        const region = reactive({
          regionData: [],
        });

        const group = reactive({
            group_id: "",
            group_name: "",
            student_id: "",
            project_id: "",
        });

      const option = reactive({
        course_id: localStorage.getItem("c_message_id"),
      });
      axios.get('http://localhost:9090/Project/CourseProjectIdAll', { params: option })
          //成功返回
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              region.regionData = response.data;
            }
            else {
              return false;
            }
          })

        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                  axios.get('http://localhost:9090/Group/addGroupAll', { params: group })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                          ElMessage.success("添加成功!");
                          router.go(0);
                        }
                        else {
                          return false;
                        }
                      })
                } else {
                    return false;
                }
            });
        };
        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };

        return {
            region,
            option,
            rules,
            formRef,
            group,
            onSubmit,
            onReset,
        };
    },
};
</script>