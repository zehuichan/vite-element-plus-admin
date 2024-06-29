<template>
  <el-tooltip
    :visible="visible"
    effect="light"
    placement="bottom-start"
  >
    <template #default>
      <el-input ref="inputRef" class="field" v-bind="$attrs" @dblclick="handleDoubleClick" />
    </template>
    <template #content>
      <el-input
        ref="textareaRef"
        class="field-textarea"
        v-bind="$attrs"
        type="textarea"
        clearable
        :autosize="{minRows: 4}"
        @blur="visible=false"
        :style="{width:minWidth}"
      />
    </template>
  </el-tooltip>
</template>

<script setup>
import { onMounted, ref, nextTick, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const inputRef = ref()
const textareaRef = ref()
const visible = ref(false)
const minWidth = ref('')

const handleDoubleClick = (event) => {
  visible.value = true
}

function updateMinWidth() {
  minWidth.value = `${inputRef.value.ref?.offsetWidth}px`
}

watch(() => visible.value, () => {
  nextTick(() => {
    visible.value && textareaRef.value.focus()
  })
})

onMounted(() => {
  updateMinWidth()
  useResizeObserver(inputRef.value.ref, updateMinWidth)
})
</script>

<style lang="scss">
.field {
}

.field-textarea {

}
</style>
