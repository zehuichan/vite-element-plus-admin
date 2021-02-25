<template>
  <div class="v-search">
    <el-form label-position="right" :ref="setFormRef" :model="modelValue" :label-width="labelWidth">
      <el-row :gutter="24">
        <el-col :span="22">
          <el-col :span="6" v-for="item in opts" :key="item.key">
            <el-form-item :label="item.label" :prop="item.key">
              <template v-if="item.type === 'input'">
                <el-input
                  :modelValue="modelValue[item.key]"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                  clearable
                  @update:modelValue="inputChange(item.key, $event)"
                  style="width:100%"
                />
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
                  @update:modelValue="inputChange(item.key, $event)"
                  style="width:100%"
                >
                  <el-option label="全部" value="全部" @click.native="modelValue[item.key] = null"/>
                  <el-option
                    v-for="(sub, idx) in item.options"
                    :key="idx"
                    :value="sub.value"
                    :label="sub.label"
                  />
                </el-select>
              </template>
              <template v-if="item.type === 'daterange'">
                <el-date-picker
                  :modelValue="modelValue[item.key]"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @update:modelValue="inputChange(item.key, $event)"
                  style="width:100%; height:33px;"
                />
              </template>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="2" class="text-right" v-if="options.length > threshold">
          <el-button type="text" @click="ellipsis = !ellipsis">
            {{ellipsis ? '收起' : '展开'}}<i class="el-icon--right" :class="icon"/>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="base-form-tools clearfix">
      <div class="fl">
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="onReset">重置</el-button>
        <slot class="tools" name="tools"/>
      </div>
      <slot class="extra fr" name="extra"/>
    </div>
  </div>
</template>

<script>
  import {defineComponent, computed, watch, ref, nextTick} from 'vue'

  export default defineComponent({
    name: 'VSearch',
    props: {
      modelValue: {
        type: Object,
        default() {
          return {}
        },
      },
      options: {
        type: Array,
        default: () => [],
        required: true
      },
      labelWidth: {
        type: String,
        default: '105px'
      },
      remoteMethod: Function,
      loading: Boolean,
      // 阈值
      threshold: {
        type: [String, Number],
        default: 12
      }
    },
    emits: [
      'update:modelValue',
      'change',
      'search',
      'reset',
    ],
    setup(props, { emit }) {
      const form = ref()
      const setFormRef = (el) => {
        form.value = el
      }
      const ellipsis = ref(false)

      const opts = computed(() => {
        const tempArr = props.options.filter(item => !item.hidden)
        return tempArr.slice(0, ellipsis.value ? tempArr.length : props.threshold)
      })

      const icon = computed(() => ellipsis.value ? 'el-icon-arrow-up' : 'el-icon-arrow-down')

      watch(
        () => opts.value,
        (val) => {
          setDefaultValue()
        }
      )

      const onSearch = () => {
        emit('update:modelValue', { ...props.modelValue })
        emit('change', { ...props.modelValue })
        emit('search', { ...props.modelValue })
      }

      const onReset = () => {
        form.value?.resetFields()
        emit('update:modelValue', { ...props.modelValue })
        emit('change', { ...props.modelValue })
        emit('reset', { ...props.modelValue })
      }

      const setDefaultValue = () => {
        opts.value.forEach((item) => {
          // 1. 填充默认值
          props.modelValue[item.key] = props.modelValue[item.key]
          // 2. 映射回配置项
          item.value = props.modelValue[item.key]
        })
      }

      const inputChange = (key, event) => {
        emit('update:modelValue', { ...props.modelValue, [key]: event })
      }

      return {
        setFormRef,
        ellipsis,
        opts,
        icon,
        onSearch,
        onReset,
        inputChange
      }
    }
  })
</script>

<style lang="scss">
  .v-search {

    .base-form-tools {
      margin: 24px 24px 0;
    }
  }
</style>