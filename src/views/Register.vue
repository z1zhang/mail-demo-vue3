<template>
  <div class="register">
    <el-form ref="form" :model="form" label-width="60px" size="mini">
      <el-form-item label="邮箱" class="em">
        <el-input style="width: 260px;padding-right:12px" v-model="form.email"/>
        <el-button type="primary" @click="getCode">
          <span v-show="show">发送验证码</span>
          <span v-show="!show">{{ count }} s后重发</span>
        </el-button>
      </el-form-item>
      <el-form-item label="验证码" class="cd">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">验证</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const TIME_COUNT = 60 // 设置一个全局的倒计时的时间
export default {
  name: "Register",
  data() {
    return {
      show: true,
      count: '',
      form: {
        email: this.email,
        code: this.code
      }
    };
  },
  methods: {
    getCode() {
      const regexMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!regexMail.test(this.form.email)) {
        this.$message.error('请输入正确的邮件地址')
      } else {
        this.axios.get("api/sendMail", {
          params: {
            receiver: this.form.email,
            checkCode: this.form.code
          }
        }).then(() => {
          this.$message.success('已发送验证码')
        }).catch(() => {
          this.$message.error('发送失败')
        });
        // 验证码倒计时
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    },
    submit() {
      const data = {
        email: this.email,
        code: this.code
      };
      this.axios.post("url", data).then(res => {
        if ((res.data.code = '')) {
          this.$message.error('验证码错误')
        } else {
          // this.$router.push({path: "/login"});
          this.$message.success('验证通过')
        }
      }).catch(() => {
        this.$message.error('请求超时，请检查网络连接')
      });
    }
    ,
  }
}
</script>

<style scoped>
.register {
  width: 435px;
  margin: 180px auto;
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
}
</style>