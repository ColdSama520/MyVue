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
                    <p class="login-tips">Tips : 案例默认添加到对应项目。</p>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import {ElLoading, ElMessage} from "element-plus";
import axios from "axios";
import router from "../../router";
import * as xlsx from "xlsx";
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
        const Case = reactive({
          case_id: "",
          case_name: "",
          course_id: localStorage.getItem("c_message_id"),
          case_content: "",
          case_type: "",
          case_is_delete: "否",
        });

      const Resource = reactive({
        resource_id: "",
        case_id: "",
        resource_name: "",
        resource_type: "",
        resource_local: "",
        resource_date: "",
      });

        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                  Resource.resource_id = "r" + Math.round(Math.random()*10) + localStorage.getItem("ms_username") + Math.round(Math.random()*10) + Case.case_id;
                  Resource.case_id = Case.case_id;
                  axios.get('http://localhost:9090/Case/addCaseAll', { params: Case })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                        }
                        else {
                          return false;
                        }
                      })
                  axios.get('http://localhost:9090/Resource/addResource', { params: Resource })
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

      const handle = async (ev) => {
        console.log(ev);
        let file = ev.raw;
        Resource.resource_name = file.name;
        Resource.resource_local = "C:/Users/13606/Desktop/UpLoad-cs/" + file.name;
        console.log(file.name);
        if (file.type === "image/jpeg")
          Resource.resource_type = "图片";
        if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
          Resource.resource_type = "表格";
        if (file.type === "")
          Resource.resource_type = "文档";
        if (file.type === "video/mp4")
          Resource.resource_type = "视频";
        console.log(file.type);
        console.log(Resource.resource_type);
        setNowTimes();
        Resource.resource_date = sj.nowDate + sj.nowTime;
      };

        return {
          sj,
            rules,
            formRef,
            Case,
          Resource,
            onSubmit,
            onReset,
          handle,
          setNowTimes,
        };
    },
};
</script>