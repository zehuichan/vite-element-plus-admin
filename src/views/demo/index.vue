<template>
  <div class="app-container">
    <basic-form ref="formRef" :model="dataForm" :rules="rules">
      <field label="aaa" prop="a">
        <el-input v-model="dataForm.a" />
      </field>
      <field label="bbb" prop="b">
        <el-input v-model="dataForm.b" />
      </field>
      <field label="ccc" prop="c">
        <el-input v-model="dataForm.c" />
      </field>
    </basic-form>
    <tool-bar justify="end">
      <el-button text bg @click="reset">reset</el-button>
      <el-button type="primary" text bg @click="submit">submit</el-button>
    </tool-bar>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref(null)
const dataForm = reactive({
  a: null,
  b: null,
  c: null
})
const rules = reactive({
  a: [{ required: true }],
  b: [{ required: true }],
  c: [{ required: true }],
})

const submit = async () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      alert(1)
    }
  })
}
const reset = () => {
  formRef.value.resetFields()
}
</script>
