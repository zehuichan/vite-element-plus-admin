<template>
  <el-popover>
    <template #reference>
      <div class="basic-layout-navbar-action__item">
        <icon name="Bell" />
      </div>
    </template>
    <template #default>
      <div class="notification-list" v-if="list.length > 0">
        <div class="item" v-for="item in list" :key="item.id">
          <el-badge :is-dot="item.status === 0">
            <div class="title">{{ item.type }}</div>
            <div class="desc">{item.desc}</div>
          </el-badge>
        </div>
      </div>
      <div v-else class="no-data">
        <div class="description">暂无数据</div>
      </div>
    </template>
  </el-popover>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Notification',
  setup() {
    const list = ref([])

    return {
      list
    }
  }
})
</script>

<style lang="scss">
.notification-list {
  .item {
    padding: 5px 16px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    margin-bottom: 4px;
    color: #333;
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
  }

  .desc {
    color: #8c8c8c;
    font-size: 12px;
    line-height: 22px;
  }
}

.no-data {
  display: flex;
  justify-content: center;
  font-size: 12px;
}
</style>
