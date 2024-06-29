<template>
  <el-dialog
    class="modal"
    v-bind="$attrs"
    :show-close="false"
    :fullscreen="state"
    :close-on-click-modal="false"
    append-to-body
    draggable
    @close="close"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="modal-header">
        <div :id="titleId" :class="titleClass">{{ $attrs.title }}</div>
        <div class="modal-header__action">
          <div v-if="state" class="modal-header__action-item cursor-pointer" @click="toggle()">
            <icon-park type="copy" />
          </div>
          <div v-else class="modal-header__action-item cursor-pointer" @click="toggle()">
            <icon-park type="full-screen" />
          </div>
          <div class="modal-header__action-item modal-header__action-close cursor-pointer" @click="close">
            <icon-park type="close" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <slot />
    </template>
    <template #footer v-if="showCancelButton || showConfirmButton">
      <slot name="footer">
        <div class="flex flex-end">
          <el-button v-if="showCancelButton" text bg @click="cancel">{{ cancelButtonText }}</el-button>
          <el-button v-if="showConfirmButton" type="primary" text bg @click="confirm">
            {{ confirmButtonText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useToggle } from '@vueuse/core'

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: {
    height: {
      type: [String, Number],
      default: ''
    },
    fullscreen: Boolean,
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
    // todo 占位
    const HEADER = 49
    const FOOTER = 49
    const PADDING = 24

    const state = ref(props.fullscreen)

    const toggle = useToggle(state)

    const scrollbarHeight = computed(() => {
      return state.value ? '' : props.height
    })

    function close() {
      emit('update:modelValue', false)
    }

    function cancel() {
      emit('cancel')
    }

    function confirm() {
      emit('confirm')
    }

    return {
      state,
      toggle,
      scrollbarHeight,
      close,
      cancel,
      confirm
    }
  }
})
</script>

<style lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  padding: 0;

  .el-dialog__header {
    padding: 0;
    border-bottom: 1px solid #e7e7e7;
    margin-right: 0;
  }

  .el-dialog__body {
    flex: 1;
    overflow: auto;
    padding: 12px;
  }

  .el-dialog__footer {
    padding: 12px;
    background: transparent;
    border-top: 1px solid #e7e7e7;
    line-height: 1;
  }

  .el-dialog__title {
    font-size: 14px;
    padding-left: 7px;
  }
}

.modal-header {
  position: relative;
  background: #f5f5f5;
  padding: 12px;
}

.modal-header__action {
  position: absolute;
  right: 0;
  top: 0;
}

.modal-header__action-item {
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

.modal-header__action-close {
  &:hover {
    background-color: #fb7373;
    color: #fff;
    text-decoration: none;
  }
}
</style>
