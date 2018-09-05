<template>
  <div class='login'>
    <!-- LOGO -->
    <!-- <img src="../assets/pornhub.png" alt="LOGO" class="logo"> -->
    <div class="container">
      <!-- 头像 -->
      <div class="avatar">
      </div>
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type='password' prefix-icon="myicon myicon-key"></el-input>
        </el-form-item>
        <el-form-item class="verify">
          <verify @isVerified="getVerified"></verify>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn" :disabled="checkForm">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/index.js'
import verify from '@/components/Verify.vue'
import { message } from '@/components/Message.js'
export default {
  components: {
    verify
  },
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 18,
            message: '长度请限制在3~18个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 18,
            message: '长度请限制在3~18个字符',
            trigger: 'blur'
          }
        ]
      },
      isVerified: false
    }
  },
  computed: {
    checkForm () {
      console.log(this.isVerified)

      if (
        this.isVerified === false ||
        Object.keys(this.ruleForm.username).length <= 3 ||
        Object.keys(this.ruleForm.password).length <= 3
      ) {
        console.log(123)
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getVerified (data) {
      this.isVerified = data
    },
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // console.log(valid)
          // console.log(this.ruleForm)
          login(this.ruleForm).then(res => {
            var self = this
            if (res.data.meta.status === 200) {
              this.$router.push({ name: 'home' })
              console.log(this)
              message({obj: self, msg: '恭喜您，登录成功', type: 'success'})
            } else {
              console.log('err')
              message({obj: self, msg: '登录失败！请检查账号密码', type: 'error'})
            }
          })
        } else {
          console.log('error')
        }
      })
    },
    resetForm (ruleForm) {}
  }
}
</script>

<style lang='scss' scoped>
// 语言为scss
.verify {
  height: 60px;
  margin-bottom: 0;
}
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("./assets/Coworking_Table.jpg");
  // opacity: .8;
  background-size: cover;
  // background-color: #000;
  .logo {
    position: absolute;
    top: 0px;
    left: 50%;
    margin-left: -200px;
    width: 400px;
    margin-top: 72px;
    margin-bottom: 60px;
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    border-radius: 8px;
    // margin-top: 0;
    background: white;
    // z-index: 999;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
      background-image: url("./assets/anonym.png");
      background-size: cover;
    }
    .login-btn {
      font-size: 18px;
      color: #000;
      font-weight: 900;
      // border: 1px solid #FE9900;
      // background-color: #FE9900 !important;
      width: 100%;
    }
  }
}
</style>
