<template>
  <div>
    <div class="app-container">
      <code>Dashboard</code>
    </div>
    <div class="app-container">
      <div>
        <el-button @click="setProps({ size: 'default' })">更改Size</el-button>
        <el-button @click="setProps({ size: 'small' })">更改Size</el-button>
        <el-button @click="setProps({ size: 'large' })">更改Size</el-button>
        <el-button @click="setProps({ disabled: true })">禁用表单</el-button>
        <el-button @click="setProps({ disabled: false })">解除禁用</el-button>
      </div>
      <v-form ref="formElRef" :schemas="schemas" v-model="dataForm"> </v-form>
      <code>{{ dataForm }}</code>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    },
    required: true
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8
    }
  }
]

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const formElRef = ref(null)
    const dataForm = reactive({
      field1: '123',
      field2: '123',
      field3: '123'
    })

    return {
      formElRef,
      schemas,
      dataForm,
      setProps(props) {
        const formEl = formElRef.value
        if (!formEl) return
        formEl.setProps(props)
      }
    }
  }
})
</script>

<style lang="scss">
.app-container {
  padding: 16px;
  margin: 16px 16px 0;
  background-color: #fff;
}
</style>
