<template>
  <div class="app-container">
    <code>Documentation</code>
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" alt="" />
    </template>
  </div>
  <div class="app-container">
    <el-button @click="fireVueError">点击触发vue错误</el-button>
    <el-button @click="fireResourceError">点击触发资源加载错误</el-button>
    <el-button @click="fireAjaxError">点击触发ajax错误</el-button>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="type" label="类型" width="90">
        <template #default="scope">
          <el-tag :type="filterColor(scope.row.type)" disable-transitions>
            {{ scope.row.type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="URL"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column prop="time" label="时间" width="160" />
      <el-table-column
        prop="file"
        label="文件"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="Name"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="message"
        label="错误信息"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column prop="stack" label="stack信息" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useErrorLogStore } from '@/store'
import { fireErrorApi } from '@/api'

export default defineComponent({
  name: 'Documentation',
  setup() {
    const errorLogStore = useErrorLogStore()

    const imgList = ref([])
    const data = computed(() => errorLogStore.getErrorLogInfoList)

    function filterColor(val) {
      return {
        vue: 'success',
        script: 'default',
        resource: 'info',
        ajax: 'danger',
        promise: 'warning'
      }[val]
    }

    function fireVueError() {
      throw new Error('fire vue error!')
    }

    function fireResourceError() {
      imgList.value.push(`${new Date().getTime()}.png`)
    }

    async function fireAjaxError() {
      await fireErrorApi()
    }

    return {
      imgList,
      data,
      filterColor,
      fireVueError,
      fireResourceError,
      fireAjaxError
    }
  }
})
</script>
