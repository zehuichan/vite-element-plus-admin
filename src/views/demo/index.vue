<template>
  <page-wrapper>
    <div class="table-wrapper">
      <api-select
        v-model="form.id"
        :api="getDicts"
        result-field="data"
        label-field="name"
        value-field="id"
      />
      <api-suggestion
        v-model:label="form.name"
        v-model:value="form.id"
        :options="data"
        label-field="name"
        value-field="id"
      />
      <code>{{ form}}</code>
    </div>
  </page-wrapper>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'

import { useSelection } from '@/components/Table'
import { useDropdown } from '@/hooks/web/useDropdown'

import { sleep } from '@/utils'
import { getDicts } from '@/api/dict.js'

defineOptions({ name: 'Demo' })

const tableRef = ref()
const loading = ref(false)
const data = ref([])
const options = ref([])
const form = ref({})

onMounted(async () => {
  loading.value = true
  await sleep(1000)
  data.value = Array.from({ length: 10 }).map((_, index) => ({
    id: `${index}`,
    name: `选项-${index}`,
  }))
  loading.value = false
})
</script>
