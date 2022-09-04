<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      size="large"
    >
      <div class="title-container">
        <h3 class="title">System Login</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          clearable
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          show-password
          clearable
          @keyup.enter="login"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        size="large"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="login"
      >
        Login
      </el-button>

      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span>password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { validUsername } from '@/utils/validate'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const router = useRouter()

const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error('Please enter the correct user name'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}
const loginFormRef = ref()
const loginForm = reactive({
  username: 'admin',
  password: '111111'
})
const loginRules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})
const loading = ref(false)
const redirect = ref(undefined)

const login = async () => {
  try {
    loading.value = true
    const valid = await loginFormRef.value.validate()
    if (valid) {
      console.log('submit!')
      await userStore.login(loginForm)
      await router.push({ path: redirect.value || '/' })
      loading.value = false
    }
  } catch (error) {
    console.log('error submit!', error)
    loading.value = false
  }
}
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
