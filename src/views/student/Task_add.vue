<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                  <i class="el-icon-lx-peoplefill"></i> 学生
                </el-breadcrumb-item>
              <el-breadcrumb-item>项目任务管理</el-breadcrumb-item>
              <el-breadcrumb-item>个人项目任务</el-breadcrumb-item>
              <el-breadcrumb-item>添加任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="task" label-width="80px">
                    <el-form-item label="任务名称" prop="task_name">
                      <el-input v-model="task.task_name"></el-input>
                    </el-form-item>
                    <el-form-item label="阶段类型" prop="task_stage_type">
                        <el-input v-model="task.task_stage_type" placeholder="策划型、开发型、文档型、测试型、部署型"></el-input>
                    </el-form-item>
                    <el-form-item label="任务详情" prop="task_details">
                      <el-input v-model="task.task_details"></el-input>
                    </el-form-item>
                    <el-form-item label="任务状态" prop="task_type">
                    <el-input v-model="task.task_type" placeholder="规划中、实施中、已完成"></el-input>
                    </el-form-item>
                  <el-upload
                      class="upload-demo"
                      drag
                      action="http://localhost:9090/File/upload"
                      multiple
                      :on-change="handle">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                    <p class="login-tips">Tips : 附件默认添加到对应任务。</p>
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
import {useRouter} from "vue-router";
export default {
    name: "task_add",
    setup() {
      const router = useRouter();

        const rules = {
          task_name: [
            { required: true, message: "请输入任务名称", trigger: "blur" },
          ],
          task_stage_type: [
            { required: true, message: "请输入阶段类型", trigger: "blur" },
            ],
          task_details: [
            { required: true, message: "请输入任务详情", trigger: "blur" },
            ],
          task_type: [
                { required: true, message: "请输入任务状态", trigger: "blur" },
            ],
        };

      const sj = reactive({
        timer: null,
        nowDate: '',
        nowTime: '',
      })

      const setNowTimes = () => {
        const myDate = new Date()
        console.log(myDate)
        const yy = String(myDate.getFullYear())
        const mm = myDate.getMonth() + 1
        const dd = String(
            myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
        )
        const hou = String(
            myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
        )
        const min = String(
            myDate.getMinutes() < 10
                ? '0' + myDate.getMinutes()
                : myDate.getMinutes()
        )
        const sec = String(
            myDate.getSeconds() < 10
                ? '0' + myDate.getSeconds()
                : myDate.getSeconds()
        )
        sj.nowDate = yy + '-' + mm + '-' + dd + ' '
        sj.nowTime = hou + ':' + min + ':' + sec
      }

        const formRef = ref(null);
        const task = reactive({
          task_id: '',
          task_name: '',
          task_stage_type: '',
          task_details: '',
          task_type: '',
          task_start_date: '',
          student_id: localStorage.getItem("ms_username"),
        });

      const Attachment = reactive({
        attachment_id: "",
        task_id: "",
        attachment_local: "",
        attachment_date: "",
      });
        // 提交
        const onSubmit = () => {

            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                  setNowTimes();
                  task.task_start_date = sj.nowDate + sj.nowTime;
                  task.task_id = "t" + Math.round(Math.random()*10) + localStorage.getItem("ms_username") + Math.round(Math.random()*10);
                  Attachment.attachment_id = "a" + "t" + Math.round(Math.random()*10) + localStorage.getItem("ms_username") + task.task_id;
                  Attachment.task_id = task.task_id;
                  axios.get('http://localhost:9090/Task/addTask', { params: task })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                          ElMessage.success("添加成功！！");
                          router.go(0);
                          // formRef.value.resetFields();
                          // router.push("/taskmessage_student");
                        }
                        else {
                          ElMessage.error("添加失败！！");
                          return false;
                        }
                      })
                  axios.get('http://localhost:9090/Attachment/addAttachment', { params: Attachment })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {

                        }
                        else {
                          ElMessage.error("添加失败！！");
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

      const handle = async (ev) => {
        console.log(ev);
        let file = ev.raw;
        Attachment.attachment_local = "C:/Users/13606/Desktop/UpLoad-cs/" + file.name;
        console.log(file.name);
        console.log(file.type);
        setNowTimes();
        Attachment.attachment_date = sj.nowDate + sj.nowTime;
      };

        return {
            rules,
            formRef,
          task,
            onSubmit,
            onReset,
          sj,
          setNowTimes,
          handle,
          Attachment,
        };
    },
};
</script>