<template>
  <el-drawer
    class="drawer"
    v-bind="$attrs"
    :show-close="false"
    @close="closed"
    @closed="closed"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="drawer-header">
        <div :id="titleId" :class="titleClass">{{ $attrs.title }}</div>
        <div class="drawer-header__action">
          <div class="drawer-header__action-item drawer-header__action-close cursor-pointer" @click="close">
            <icon-park type="close" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <el-auto-resizer>
        <template #default="{ height }">
          <el-scrollbar :height="height">
            <slot />
          </el-scrollbar>
        </template>
      </el-auto-resizer>
    </template>
    <template #footer>
      <slot name="footer">
        <div class="flex flex-end">
          <el-button v-if="showCancelButton" text bg @click="cancel">{{ cancelButtonText }}</el-button>
          <el-button v-if="showConfirmButton" type="primary" text bg @click="confirm">
            {{ confirmButtonText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-drawer>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Drawer',
  inheritAttrs: false,
  props: {
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
  },
  emits: ['update:modelValue', 'cancel', 'confirm'],
  setup(props, { emit }) {

    function cancel() {
      emit('cancel')
    }

    function closed() {
      emit('update:modelValue', false)
    }

    function confirm() {
      emit('confirm')
    }

    return {
      cancel,
      closed,
      confirm
    }
  }
})
</script>

<style lang="scss">
.drawer {

  .el-drawer__header {
    margin-bottom: 0;
    padding: 0;
    border-bottom: 1px solid #e7e7e7;
  }

  .el-drawer__title {
    font-size: 14px;
    line-height: 24px;
    color: #000010;
    font-weight: 500;
  }

  .el-drawer__body {
    padding: 12px;
  }

  .el-drawer__footer {
    padding: 12px;
    border-top: 1px solid #e7e7e7;
  }
}

.drawer-header {
  position: relative;
  background: #f5f5f5;
  padding: 12px;
}

.drawer-header__action {
  position: absolute;
  right: 0;
  top: 0;
}

.drawer-header__action-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 25px;
  font-size: 13px;
  color: #4f4f4f;
  outline: none;
  transition: background-color .2s, color .2s;

  &:hover {
    background-color: #e2e2e2;
    color: #434343;
    text-decoration: none;
  }
}

.drawer-header__action-close {
  &:hover {
    background-color: #fb7373;
    color: #fff;
    text-decoration: none;
  }
}
</style>
