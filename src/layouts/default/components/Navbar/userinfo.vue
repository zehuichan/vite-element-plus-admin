<template>
  <el-dropdown class="basic-layout-navbar-action__item avatar-container">
    <div class="avatar-wrapper">
      <el-avatar :src="getUserInfo?.avatar" class="user-avatar" />
      <span class="user-name">{{ getUserInfo?.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="user-dropdown">
        <el-dropdown-item icon="Warning">帮助</el-dropdown-item>
        <el-dropdown-item icon="User">个人中心</el-dropdown-item>
        <el-dropdown-item icon="Setting">个人设置</el-dropdown-item>
        <el-dropdown-item icon="SwitchButton" divided @click="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  name: 'Userinfo',
  setup() {
    const userStore = useUserStore()

    const route = useRoute()
    const router = useRouter()

    const getUserInfo = computed(() => userStore.getUserInfo || {})

    function logout() {
      userStore.logout()
      router.push('/login?redirect=' + route.fullPath)
    }

    return {
      getUserInfo,
      logout
    }
  }
})
</script>

<style lang="scss">
.avatar-container {
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;

  .avatar-wrapper {
    display: flex;
    align-items: center;
  }

  .user-avatar {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }

  .user-name {
    font-size: 12px;
  }
}
</style>
