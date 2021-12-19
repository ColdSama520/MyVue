<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 教师
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加班课</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="课程名称" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  <el-form-item label="开课年份" prop="phone">
                    <el-input v-model="form.date"></el-input>
                  </el-form-item>
                  <el-form-item label="学生班级" prop="id">
                    <el-input v-model="form.class"></el-input>
                  </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                    <p class="login-tips">Tips : 授课教师默认为当前教师，课程属性为正常班课。</p>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
    name: "classmessage_common_add",
    setup() {
        const rules = {
            name: [
            { required: true, message: "请输入班课名称", trigger: "blur" },
            ],
            date: [
              { required: true, message: "请输入开课日期", trigger: "blur" },
            ],
            class: [
            { required: true, message: "请输入开课班级", trigger: "blur" },
          ],
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            date: "",
            class: "",
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                    console.log(form);
                    ElMessage.success("提交成功！");
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
            form,
            onSubmit,
            onReset,
        };
    },
};
</script>