<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 教师
                </el-breadcrumb-item>
                <el-breadcrumb-item>案例管理</el-breadcrumb-item>
                <el-breadcrumb-item>案例浏览</el-breadcrumb-item>
                <el-breadcrumb-item>添加案例</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="Case" label-width="80px">
                    <el-form-item label="案例ID" prop="case_id">
                      <el-input v-model="Case.case_id"></el-input>
                    </el-form-item>
                    <el-form-item label="案例名称" prop="case_name">
                        <el-input v-model="Case.case_name"></el-input>
                    </el-form-item>
                    <el-form-item label="案例内容" prop="case_content">
                      <el-input v-model="Case.case_content"></el-input>
                    </el-form-item>
                    <el-form-item label="案例类型" prop="case_type">
                      <el-input v-model="Case.case_type"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                    <p class="login-tips">Tips : 案例默认添加到对应项目。</p>
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
    name: "case_add",
    setup() {
        const rules = {
            case_id: [
            { required: true, message: "请输入案例ID", trigger: "blur" },
            ],
            case_name: [
              { required: true, message: "请输入案例名称", trigger: "blur" },
            ],
            case_content: [
              { required: true, message: "请输入案例内容", trigger: "blur" },
            ],
            case_type: [
              { required: true, message: "请输入案例类型", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const Case = reactive({
          case_id: "",
          case_name: "",
          course_id: localStorage.getItem("c_message_id"),
          case_content: "",
          case_type: "",
          case_is_delete: "否",
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                  axios.get('http://localhost:9090/Case/addCaseAll', { params: Case })
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
            rules,
            formRef,
            Case,
            onSubmit,
            onReset,
        };
    },
};
</script>