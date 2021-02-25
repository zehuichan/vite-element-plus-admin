<template>
  <el-form class="v-form" ref="form" :model="modelValue" v-bind="$attrs">
    <el-form-item
      v-for="item in _options"
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
          @update:modelValue="$_inputChange(item, $event)"
          style="width:100%"
        />
      </template>
      <template v-if="item.type === 'textarea'">
        <el-input
          type="textarea"
          :modelValue="value[item.key]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          clearable
          :maxlength="item.maxlength || 200"
          :show-word-limit="item.showWordLimit"
          :autosize="item.autosize || { minRows: 5}"
          resize="none"
          @update:modelValue="$_inputChange(item, $event)"
          style="width:100%"
        />
      </template>
      <template v-if="item.type === 'radio'">
        <el-radio-group :modelValue="modelValue[item.key]" @update:modelValue="$_inputChange(item, $event)">
          <el-radio
            v-for="(sub, idx) in item.options"
            :key="idx"
            :label="sub.value"
          >
            {{sub.label}}
          </el-radio>
        </el-radio-group>
      </template>
      <template v-if="item.type === 'checkbox'">
        <el-checkbox-group :modelValue="modelValue[item.key]" @update:modelValue="$_inputChange(item, $event)">
          <el-checkbox
            v-for="(sub, idx) in item.options"
            :key="idx"
            :label="sub.label"
            :name="sub.value"
          />
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
          @update:modelValue="$_inputChange(item, $event)"
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
          :format="item.format || undefined"
          @update:modelValue="$_inputChange(item, $event)"
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
          :default-time="item.defaultTime || ['00:00:00', '23:59:59']"
          @update:modelValue="$_inputChange(item, $event)"
          style="width:100%; height:33px;"
        />
      </template>
      <template v-if="item.type === 'datetime'">
        <el-date-picker
          :modelValue="modelValue[item.key]"
          type="datetime"
          :placeholder="item.placeholder"
          @update:modelValue="$_inputChange(item, $event)"
          style="width:100%; height:33px;"
        />
      </template>
      <slot :scope="item" :name="item.key"/>
    </el-form-item>
  </el-form>
</template>

<script>
  // utils
  import {formatNumber} from '../utils/formate-number'

  export default {
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
    computed: {
      _options() {
        return this.options.filter(item => !item.hidden)
      }
    },
    created() {
      this.$_setDefaultValue()
    },
    methods: {
      $_setDefaultValue() {
        this._options.forEach((item) => {
          // 1. 填充默认值
          // 2. 映射回配置项
          item.value = this.modelValue[item.key] = this.modelValue[item.key] || item.value
        })
      },
      $_inputChange({ type, key }, event) {
        switch (type) {
          case 'digit': // 正整数
            this.$emit('update:modelValue', { ...this.modelValue, [key]: formatNumber(event, false) })
            break
          case 'number': // 数字
            this.$emit('update:modelValue', { ...this.modelValue, [key]: formatNumber(event) })
            break
          default:
            this.$emit('update:modelValue', { ...this.modelValue, [key]: event })
            break
        }
      },
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
  }
</script>

<style lang="scss" scoped>
  .v-form {

  }
</style>
