<template>
  <el-popover popper-class="app-locale-picker">
    <template #reference>
      <div :class="$attrs.class">
        <icon-park name="translate" />
      </div>
    </template>
    <template #default>
      <div
        class="app-locale-picker-item"
        :class="{'is-active': selected == item.event}"
        v-for="item in localeList"
        @click="handleCommand(item.event)"
      >
        {{ item.text }}
      </div>
    </template>
  </el-popover>
</template>

<script>
import { defineComponent, ref, unref } from 'vue'
import { localeList } from '@/settings/localeSetting'
import { useLocale } from '@/install/locales/useLocale'

export default defineComponent({
  name: 'AppLocalePicker',
  props: {
    reload: Boolean
  },
  setup(props) {
    const { changeLocale, getLocale } = useLocale()

    const selected = ref(unref(getLocale))

    async function toggleLocale(lang) {
      await changeLocale(lang)
      selected.value = lang
      props.reload && location.reload()
    }

    function handleCommand(command) {
      if (unref(getLocale) === command) {
        return
      }
      toggleLocale(command)
    }

    return {
      localeList,
      selected,
      handleCommand
    }
  }
})
</script>

<style lang="scss">
.el-popover.app-locale-picker {
  padding: 5px 0;

  .app-locale-picker-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    list-style: none;
    line-height: 22px;
    padding: 5px 16px;
    margin: 0;
    font-size: var(--el-font-size-base);
    color: var(--el-text-color-regular);
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: #f5f5f5;
    }

    &.is-active {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
