<template>
  <div class="v-search">
    <el-form label-position="right" ref="form" :model="modelValue" :label-width="labelWidth">
      <el-row :gutter="20">
        <el-col :span="23">
          <el-col :span="6" v-for="item in opts">{{item}}{{labelWidth}}</el-col>
        </el-col>
        <el-col :span="1" class="text-right" v-if="options.length > threshold">
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
  import {defineComponent, computed, watch, ref} from 'vue'

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
        default: '80px'
      },
      remoteMethod: Function,
      loading: Boolean,
      // 阈值
      threshold: {
        type: [String, Number],
        default: 8
      }
    },
    emits: [
      'update:modelValue',
      'change',
      'search',
      'reset',
    ],
    setup(props, {emit}) {
      const ellipsis = ref(false)

      const opts = computed(() => {
        const tempArr = props.options.filter(item => !item.hidden)
        return tempArr.slice(0, ellipsis.value ? tempArr.length : props.threshold)
      })
      const icon = computed(() => ellipsis.value ? 'el-icon-arrow-up' : 'el-icon-arrow-down')

      const onSearch = () => {
        emit('update:modelValue', {...props.modelValue})
        emit('change', {...props.modelValue})
        emit('search', {...props.modelValue})
      }

      const onReset = () => {
        emit('update:modelValue', {...props.modelValue})
        emit('change', {...props.modelValue})
        emit('reset', {...props.modelValue})
      }

      return {
        ellipsis,
        opts,
        icon,
        onSearch,
        onReset
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