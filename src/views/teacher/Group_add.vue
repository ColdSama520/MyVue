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
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="组名" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="组长学号" prop="group_student_id">
                      <el-input v-model="form.group_student_id"></el-input>
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
export default {
    name: "group_add",
    setup() {
        const rules = {
            name: [
            { required: true, message: "请输入小组名称", trigger: "blur" },
            ],
            group_student_id: [
            { required: true, message: "请输入组长学号", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            group_student_id: "",
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