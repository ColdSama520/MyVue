<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 教师
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加班课学生</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="用户名" prop="id">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="学生姓名" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                      <el-form-item label="学生班级" prop="class">
                        <el-input v-model="form.class"></el-input>
                      </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                    <p class="login-tips">Tips : 密码默认为123456。</p>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
    name: "student_add",
    setup() {
        const rules = {
            id: [
                { required: true, message: "请输入学生学号", trigger: "blur" },
            ],
            name: [
            { required: true, message: "请输入学生姓名", trigger: "blur" },
            ],
            class: [
            { required: true, message: "请输入学生班级", trigger: "blur" },
          ],
        };
        const formRef = ref(null);
        const form = reactive({
            id: "",
            name: "",
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