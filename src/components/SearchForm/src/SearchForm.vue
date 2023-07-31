<template>
  <div class="search-form">
    <div class="search-form__content">
      <schema-form ref="formRef" auto-submit-on-enter show-advanced-button @register="register" @enter="handelQuery">
        <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </schema-form>
    </div>
    <div class="search-form__tools flex-center">
      <slot name="tools" />
      <div class="flex-grow"></div>
      <div>
        <slot name="extra" />
        <el-button @click="handelReset">
          <template #icon>
            <icon-park name="refresh" />
          </template>
          重置
        </el-button>
        <el-button type="primary" @click="handelQuery">
          <template #icon>
            <icon-park name="search" />
          </template>
          查询
        </el-button>
        <el-button v-if="!advanceState.hideAdvanceBtn" text bg @click="handleToggleAdvanced">
          <div class="mr-4px">{{ advanceState.isAdvanced ? '收起' : '展开' }}</div>
          <icon-park :name="advanceState.isAdvanced ? 'up' : 'down'" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, unref } from 'vue'
import { useForm } from '@/components/SchemaForm'

export default defineComponent({
  name: 'SearchForm',
  props: {
    schemas: {
      type: Array,
      default: () => []
    },
  },
  emits: ['search', 'reset'],
  setup(props, { emit }) {
    const formRef = ref(null)

    const [register, { getFieldsValue, resetFields, handleToggleAdvanced }] = useForm({
      schemas: props.schemas,
    })

    const advanceState = computed(() => unref(formRef)?.advanceState || {})

    const handelReset = () => {
      resetFields()
      const data = getFieldsValue()
      emit('reset', data)
    }

    const handelQuery = () => {
      const data = getFieldsValue()
      emit('search', data)
    }

    return {
      formRef,
      advanceState,
      register,
      handelReset,
      handelQuery,
      handleToggleAdvanced,
    }
  }
})
</script>

<style lang="scss">
.search-form {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 12px;
  border-radius: 2px;

  .search-form__content {
  }

  .search-form__tools {
  }
}
</style>