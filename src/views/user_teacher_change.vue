<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="用户名" prop="teacher_id">
                        <el-input v-model="form.teacher_id"></el-input>
                    </el-form-item>
                    <el-form-item label="教师姓名" prop="teacher_name">
                      <el-input v-model="form.teacher_name"></el-input>
                    </el-form-item>
                  <el-form-item label="联系方式" prop="teacher_phone">
                    <el-input v-model="form.teacher_phone"></el-input>
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
    name: "user_teacher_change",
    setup() {
        const rules = {
          teacher_id: [
              { required: true, message: "请输入教师工号", trigger: "blur" },
          ],
          teacher_name: [
              { required: true, message: "请输入教师姓名", trigger: "blur" },
          ],
          teacher_phone: [
              { required: true, message: "请输入教师联系方式", trigger: "blur" },
          ],
        };
        const formRef = ref(null);
        const form = reactive({
          teacher_id: localStorage.getItem("ms_username"),
          teacher_name: "",
          teacher_phone: "",
        });
        const param = reactive({
          teacher_id: localStorage.getItem("ms_username"),
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                  axios.get('http://localhost:9090/Teacher/updateTeacher', { params: form })
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
            param,
            onSubmit,
            onReset,
        };
    },
};
</script>