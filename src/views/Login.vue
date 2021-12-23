<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="user_id">
                    <el-input v-model="param.user_id" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="user_pwd">
                    <el-input type="password" placeholder="password" v-model="param.user_pwd"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 千万不要忘记密码哟。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const param = reactive({
        user_id: "",
        user_pwd: "",
    });

    const rules = {
      user_id: [
          {
              required: true,
              message: "请输入用户名",
              trigger: "blur",
          },
      ],
      user_pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
      ],
    };
    const login = ref(null);
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          // login.axios.post('api/login',param).then(res=>{
          //   console.log(res)
          //   if(res.data === 200){
          //     alert('登陆成功');
          //   }
          //   else{
          //     alert('登陆失败');
          //   }
          // })
          axios.get('http://localhost:9090/api/login', { params: param })
              //成功返回
              .then(response => {
                console.log(response);
                if(response.data === 200) {
                  ElMessage.success("登录成功");
                  localStorage.setItem("ms_username", param.user_id);
                  router.push("/");
                }
                else{
                  ElMessage.error("登录失败");
                  return false;
                }
              })
              //失败返回
              .catch(error => {
                console.log(error);
                return false;
              })
        } else {
          return false;
        }
      });
    };

      const store = useStore();
      store.commit("clearTags");

      return {
          param,
          rules,
          login,
          submitForm,
      };
  },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>