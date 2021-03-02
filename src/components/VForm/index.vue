<template>
  <el-form class="v-form" :ref="setFormRef" :model="modelValue" v-bind="$attrs">
    <el-form-item
      v-for="item in opts"
      :key="item.key"
      :label="item.label"
      :prop="item.key"
      :rules="item.rules"
    >
      <template v-if="['input', 'digit', 'number'].includes(item.type)">
        <el-input
          :modelValue="modelValue[item.key]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          clearable
          @update:modelValue="inputChange(item, $event)"
          style="width:100%"
        />
      </template>
      <template v-if="item.type === 'textarea'">
        <el-input
          type="textarea"
          :modelValue="modelValue[item.key]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          clearable
          :maxlength="item.maxlength || 200"
          :show-word-limit="item.showWordLimit"
          :autosize="item.autosize || { minRows: 5}"
          resize="none"
          @update:modelValue="inputChange(item, $event)"
          style="width:100%"
        />
      </template>
      <template v-if="item.type === 'radio'">
        <el-radio-group :modelValue="modelValue[item.key]" @update:modelValue="inputChange(item, $event)">
          {{item.options}}
        </el-radio-group>
      </template>
      <template v-if="item.type === 'checkbox'">
        <el-checkbox-group :modelValue="modelValue[item.key]" @update:modelValue="inputChange(item, $event)">
          {{item.options}}
        </el-checkbox-group>
      </template>
      <template v-if="item.type === 'select'">
        <el-select
          :modelValue="modelValue[item.key]"
          :multiple="item.multiple"
          :collapse-tags="item.multiple"
          :filterable="item.remote"
          :remote="item.remote"
          :reserve-keyword="item.remote"
          :remote-method="remoteMethod"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :loading="loading"
          clearable
          @update:modelValue="inputChange(item, $event)"
          style="width:100%"
        >
          <el-option
            v-for="(sub, idx) in item.options"
            :key="idx"
            :value="sub.value"
            :label="sub.label"
          />
        </el-select>
      </template>
      <template v-if="['date', 'week', 'month', 'year', 'dates'].includes(item.type)">
        <el-date-picker
          :modelValue="modelValue[item.key]"
          :type="item.type"
          :placeholder="item.placeholder"
          @update:modelValue="inputChange(item, $event)"
          style="width:100%; height:33px;"
        />
      </template>
      <template v-if="item.type === 'daterange'">
        <el-date-picker
          :modelValue="modelValue[item.key]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @update:modelValue="inputChange(item, $event)"
          style="width:100%; height:33px;"
        />
      </template>
      <template v-if="item.type === 'datetime'">
        <el-date-picker
          :modelValue="modelValue[item.key]"
          type="datetime"
          :placeholder="item.placeholder"
          @update:modelValue="inputChange(item, $event)"
          style="width:100%; height:33px;"
        />
      </template>
      <slot :scope="item" :name="item.key"/>
    </el-form-item>
  </el-form>
</template>

<script>
  // vue
  import {defineComponent, computed, watch, ref} from 'vue'
  // hooks
  import useExpose from '@/hooks/use-expose'
  // utils
  import {formatNumber} from '../utils/formate-number'

  export default defineComponent({
    name: 'VForm',
    props: {
      modelValue: {
        type: Object,
        default: () => {
          return {}
        }
      },
      options: {
        type: Array,
        default: () => [],
        required: true
      },
      remoteMethod: Function,
      loading: Boolean,
      test: String
    },
    emits: [
      'update:modelValue',
    ],
    setup(props, { emit }) {
      const form = ref()
      const setFormRef = (el) => {
        form.value = el
      }

      const opts = computed(() => {
        return props.options.filter(item => !item.hidden)
      })


      watch(
        () => opts.value,
        (val) => {
          setDefaultValue()
        }
      )

      const setDefaultValue = () => {
        opts.value.forEach((item) => {
          // 1. 填充默认值
          props.modelValue[item.key] = props.modelValue[item.key]
          // 2. 映射回配置项
          item.value = props.modelValue[item.key]
        })
      }

      const inputChange = ({ type, key }, event) => {
        switch (type) {
          case 'digit': // 正整数
            emit('update:modelValue', { ...props.modelValue, [key]: formatNumber(event, false) })
            break
          case 'number': // 数字
            emit('update:modelValue', { ...props.modelValue, [key]: formatNumber(event) })
            break
          default:
            emit('update:modelValue', { ...props.modelValue, [key]: event })
            break
        }
      }

      return {
        setFormRef,
        opts,
        inputChange
      }
    },
    methods: {
      // v-form api
      validate(cb) {
        return this.$refs.form.validate(cb)
      },
      validateField(props, cb) {
        return this.$refs.form.validateField(props, cb)
      },
      resetFields() {
        return this.$refs.form.resetFields()
      },
      clearValidate(props, cb) {
        return this.$refs.form.clearValidate(props, cb)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .v-form {

  }
</style>
