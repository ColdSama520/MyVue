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
                <el-form ref="formRef" :rules="rules" :model="course" label-width="80px">
                    <el-form-item label="课程ID" prop="course_id">
                      <el-input v-model="course.course_id"></el-input>
                    </el-form-item>
                    <el-form-item label="课程名称" prop="course_name">
                      <el-input v-model="course.course_name"></el-input>
                    </el-form-item>
                  <el-form-item label="开课年份" prop="course_start_year">
                    <el-input v-model="course.course_start_year"></el-input>
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
import axios from "axios";
import { useRouter } from "vue-router";
export default {
    name: "classmessage_common_add",
    setup() {
        const router = useRouter();

        const rules = {
            course_id: [
              {
                required: true, message: "请输入班课ID", trigger: "blur"
              }
            ],
            course_name: [
            { required: true, message: "请输入班课名称", trigger: "blur" },
            ],
            course_start_year: [
              { required: true, message: "请输入开课日期", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const course = reactive({
          course_id: "",
          course_name: "",
          course_start_year: "",
          course_is_archive: "否",
          teacher_id: localStorage.getItem("ms_username"),
        });
        // 提交
        const onSubmit = () => {
            let flag = 1;
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                  axios.get('http://localhost:9090/Course/IsHasCourse', { params : course })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if(response.status === 200) {
                          if(response.data.length === 1) {
                            flag = 0;
                            ElMessage.error("请填写正确课程ID");
                            formRef.value.resetFields();
                          }
                        }
                        else{
                          return false;
                        }
                      })
                  axios.get('http://localhost:9090/Course/addCourseCommon', {params: course})
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                          ElMessage.success("添加课程成功！请输入或导入学生！");
                          router.push("/student_add");
                        } else {
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
            course,
            onSubmit,
            onReset,
        };
    },
};
</script>