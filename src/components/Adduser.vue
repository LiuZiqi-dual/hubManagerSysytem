<template>
  <div class="adduser">
    <el-form ref="formUserData" :rules="rules" :model="formUserData" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formUserData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formUserData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmpwd">
        <el-input v-model="formUserData.confirmpwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formUserData.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model.number="formUserData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formUserData')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addUserdata } from '@/api/index.js'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formUserData.confirmpwd !== '') {
          this.$refs.formUserData.validateField('confirmpwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formUserData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formUserData: {
        username: '',
        password: '',
        confirmpwd: '',
        email: '',
        mobile: ''
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
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmpwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ],
        mobile: [
          {type: 'number', message: '电话必须为数字值'}
        ]
      }
    }
  },
  methods: {
    onSubmit (formUserData) {
      this.$refs[formUserData].validate((valid) => {
        if (valid) {
          // console.log(valid)
          // console.log(this.formUserData)
          addUserdata(this.formUserData)
          // var self = this
          // console.log(self)
            .then((res) => {
              var data = res.data
              if (data.meta.status === 201) {
                console.log(123)
                // 创建成功则弹窗
                this.$confirm('恭喜您，新用户添加成功！', '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回查看',
                  type: 'success'
                }).then(() => {
                  this.$refs[formUserData].resetFields()
                }).catch(() => {
                  this.$router.push({ name: 'usertable' })
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.adduser{
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  width: 60%;
  .el-form{
    width: 100%;
  }
}

</style>
