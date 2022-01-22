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
                <el-form ref="formRef" :rules="rules" :model="student" label-width="80px">
                    <el-form-item label="用户名" prop="student_id">
                        <el-input v-model="student.student_id"></el-input>
                    </el-form-item>
                    <el-form-item label="学生姓名" prop="student_name">
                      <el-input v-model="student.student_name"></el-input>
                    </el-form-item>
                      <el-form-item label="学生班级" prop="student_class">
                        <el-input v-model="student.student_class"></el-input>
                      </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                    <p class="login-tips">Tips : 密码默认为123456。</p>
                </el-form>
            </div>
            <el-upload
                    action=""
                    :auto-upload="false"
                    accept=".xlsx, .xls"
                    :show-file-list="false"
                    :on-change="handle">
                <i class="el-icon-upload"></i>
              <el-button size="small" type="primary">选择Excel</el-button>
              <div slot="tip" class="el-upload__tip">只能上传 xlsx/xls 文件</div>
            </el-upload>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import {useRouter} from "vue-router";
import XLSX from 'xlsx'
import * as xlsx from "xlsx";
import { ElLoading } from "element-plus";

export default {
    name: "student_add",
  setup() {

        const router = useRouter();

        const rules = {
          student_id: [
                { required: true, message: "请输入学生学号", trigger: "blur" },
            ],
          student_name: [
            { required: true, message: "请输入学生姓名", trigger: "blur" },
            ],
          student_class: [
            { required: true, message: "请输入学生班级", trigger: "blur" },
          ],
        };
        const formRef = ref(null);
        const student = reactive({
          student_id: "",
          student_name: "",
          student_class: "",
        });
        const sc = reactive({
          sc_id: "",
          student_id: "",
          course_id: localStorage.getItem("c_message_id"),
          sc_is_delete: "否",
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
              sc.sc_id = student.student_id + localStorage.getItem("c_message_id");
              sc.student_id = student.student_id;
                if (valid) {
                  axios.get('http://localhost:9090/api/searchUser', { params: { user_id : student.student_id } })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                          if (response.data.length === 0) {
                            axios.get('http://localhost:9090/api/addStudent', { params: { user_id : student.student_id } })
                                //成功返回
                                .then(response => {
                                  console.log(response);
                                  if (response.status === 200) {
                                  }
                                  else {
                                    return false;
                                  }
                                })
                            axios.get('http://localhost:9090/Student/add', { params: student })
                                //成功返回
                                .then(response => {
                                  console.log(response);
                                  if (response.status === 200) {
                                  } else {
                                    return false;
                                  }
                                })
                          }else {
                            axios.get('http://localhost:9090/Student/updateStudent', { params: student })
                                //成功返回
                                .then(response => {
                                  console.log(response);
                                  if (response.status === 200) {
                                  } else {
                                    return false;
                                  }
                                })
                          }
                        }
                        else {
                          return false;
                        }
                      })
                  axios.get('http://localhost:9090/api/searchUser', { params: { user_id : student.student_id } })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                          axios.get('http://localhost:9090/SC/add', { params: sc })
                              //成功返回
                              .then(response => {
                                console.log(response);
                                if (response.status === 200) {
                                  ElMessage.success("添加成功!");
                                  formRef.value.resetFields();
                                } else {
                                  return false;
                                }
                              })
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

    const character = reactive({
      user_id: {
        text: "学号",
        type: "string",
      },
      student_id: {
        text: "学号",
        type: "string",
      },
      student_name: {
        text: "姓名",
        type: "string",
      },
      student_sex: {
        text: "性别",
        type: "string",
      },
      student_class: {
        text: "班级名称",
        type: "string",
      },
    });

    const handle = async (ev) => {
      console.log(ev);
      let file = ev.raw;
      if(!file) {
        return;
      }

      let loadingInstance = ElLoading.service({
        text: "Darling, Wait a minute!",
        background: "rgba(0,0,0,.5)",
      });

      await delay(3000);

      //有file文件，读取Excel，转换为json
      let data = await readFile(file);
      let workbook = xlsx.read(data, {type:"binary"});
      console.log(workbook);
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(worksheet);
      console.log(data);

      //读取数据转换为可以传送给服务器的数据（学号：user_id / student_id  姓名：student_name    性别：student_sex   班级名称：student_class    ）
      let arr = [];
      data.forEach(item => {
        let obj = {};
        for (let key in character){
          if(!character.hasOwnProperty(key)) break;
          let v = character[key],
              text = v.text,
              type = v.type;
          v = item[text] || "";
          type === "string" ? (v = String(v)) : null;
          obj[key] = v;
        }
        arr.push(obj);
      });
      console.log(arr);

      loadingInstance.close();

      if (arr.length <= 0) {
        ElMessage.error("Darling, 请选择带有数据的Excel文件哟！！！");
        return;
      }
      else {
        arr.forEach(item => {

          // console.log(item);

          // axios.get('http://localhost:9090/Student/addStudentByExcel', { params: item })
          //     //成功返回
          //     .then(response => {
          //       console.log(response);
          //       if (response.status === 200) {
          //         // ElMessage.success("导入成功！！！");
          //       }
          //       else {
          //         return false;
          //       }
          //     })


          axios.get('http://localhost:9090/api/searchUser', { params: { user_id : item.student_id } })
              //成功返回
              .then(response => {
                console.log(response);
                if (response.status === 200) {
                  if (response.data.length === 0) {
                    axios.get('http://localhost:9090/api/addStudent', { params: { user_id : item.student_id } })
                        //成功返回
                        .then(response => {
                          console.log(response);
                          if (response.status === 200) {
                          }
                          else {
                            return false;
                          }
                        })
                    axios.get('http://localhost:9090/Student/addStudentByExcel', { params: item })
                        //成功返回
                        .then(response => {
                          console.log(response);
                          if (response.status === 200) {
                          } else {
                            return false;
                          }
                        })
                  }else {
                    axios.get('http://localhost:9090/Student/updateStudent', { params: item })
                        //成功返回
                        .then(response => {
                          console.log(response);
                          if (response.status === 200) {
                          } else {
                            return false;
                          }
                        })
                  }
                }
                else {
                  return false;
                }
              })
          axios.get('http://localhost:9090/api/searchUser', { params: { user_id : item.student_id } })
              //成功返回
              .then(response => {
                console.log(response);
                if (response.status === 200) {
                  axios.get('http://localhost:9090/SC/add', { params: {
                      sc_id: item.student_id + localStorage.getItem("c_message_id"),
                      student_id: item.student_id,
                      course_id: localStorage.getItem("c_message_id"),
                      sc_is_delete: '否',
                    } })
                      //成功返回
                      .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                        } else {
                          return false;
                        }
                      })
                } else {
                  return false;
                }
              })

        });

        ElMessage.success("导入成功！！！");

      }
    };

    const readFile = (file) => {
      return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = ev => {
          resolve(ev.target.result);
        };
      });
    };

    const delay = (interval = 0) => {
      return new Promise(resolve => {
        let timer = setTimeout(_ => {
          clearTimeout(timer);
          resolve();
        }, interval);
      });
    };

    return {
            rules,
            formRef,
            student,
            sc,
            onSubmit,
            onReset,
      handle,
      readFile,
      character,
      delay,
        };
    },
};
</script>