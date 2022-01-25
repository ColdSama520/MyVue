<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="用户名" prop="student_id">
                        <el-input v-model="form.student_id"></el-input>
                    </el-form-item>
                    <el-form-item label="学生姓名" prop="student_name">
                      <el-input v-model="form.student_name"></el-input>
                    </el-form-item>
                  <el-form-item label="联系方式" prop="student_phone">
                    <el-input v-model="form.student_phone"></el-input>
                  </el-form-item>
                  <el-form-item label="所属专业" prop="student_major">
                    <el-input v-model="form.student_major"></el-input>
                  </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                    <p class="login-tips">Tips : 密码默认为“123456”</p>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
    name: "user_student_change",
    setup() {
        const rules = {
          student_id: [
              { required: true, message: "请输入学生学号", trigger: "blur" },
          ],
          student_name: [
              { required: true, message: "请输入学生姓名", trigger: "blur" },
          ],
          student_phone: [
              { required: true, message: "请输入学生联系方式", trigger: "blur" },
          ],
          student_major: [
            { required: true, message: "请输入学生所属专业", trigger: "blur" },
          ],
        };
        const formRef = ref(null);
        const form = reactive({
          student_id: localStorage.getItem("ms_username"),
          student_name: "",
          student_phone: "",
          student_major: "",
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                  axios.get('http://localhost:9090/Student/updateStudentAll', { params: form })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if(response.status === 200) {
                          ElMessage.success("提交成功");
                          formRef.value.resetFields();
                        }
                        else{
                          ElMessage.error("提交失败");
                          return false;
                        }
                      })
                      //失败返回
                      .catch(error => {
                        ElMessage.error("提交失败");
                        console.log(error);
                        return false;
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
            form,
            onSubmit,
            onReset,
        };
    },
};
</script>