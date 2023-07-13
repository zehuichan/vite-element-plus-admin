<template>
  <div class="app-container">
    <basic-form ref="formRef" :model="dataForm" :rules="rules">
      <field label="aaa" prop="a" :span="12">
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
      <el-button @click="submit">submit</el-button>
      <el-button @click="reset">reset</el-button>
    </tool-bar>
  </div>
</template>

<script setup>
import { computed, defineComponent, reactive, ref } from 'vue'

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
