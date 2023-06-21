import { getCurrentInstance, onMounted, shallowReactive, unref, watch } from 'vue'
import { isBoolean, isFunction } from '@/utils/is'

const BASIC_COL_LEN = 24

export function useAdvanced({ advanceState, emit, getProps, getSchema, formModel, defaultValueRef }) {

  const vm = getCurrentInstance()

  watch(
    [() => unref(getSchema), () => advanceState.isAdvanced],
    () => {
      const { showAdvancedButton } = unref(getProps)
      if (showAdvancedButton) {
        updateAdvanced()
      }
    }
  )

  function getAdvanced(itemCol, itemColSum = 0, isLastAction = false) {
    const mdWidth = itemCol.span || BASIC_COL_LEN

    itemColSum += mdWidth

    if (isLastAction) {
      advanceState.hideAdvanceBtn = false
      if (itemColSum <= BASIC_COL_LEN * 2) {
        // When less than or equal to 2 lines, the collapse and expand buttons are not displayed
        advanceState.hideAdvanceBtn = true
        advanceState.isAdvanced = true
      } else if (
        itemColSum > BASIC_COL_LEN * 2 &&
        itemColSum <= BASIC_COL_LEN * (unref(getProps).autoAdvancedLine || 3)
      ) {
        advanceState.hideAdvanceBtn = false
        // More than 3 lines collapsed by default
      } else if (!advanceState.isLoad) {
        advanceState.isLoad = true
        advanceState.isAdvanced = !advanceState.isAdvanced
      }
      return { isAdvanced: advanceState.isAdvanced, itemColSum }
    }
    if (itemColSum > BASIC_COL_LEN * (unref(getProps).alwaysShowLines || 1)) {
      return { isAdvanced: advanceState.isAdvanced, itemColSum }
    } else {
      // The first line is always displayed
      return { isAdvanced: true, itemColSum }
    }
  }

  const fieldsIsAdvancedMap = shallowReactive({})

  function updateAdvanced() {
    let itemColSum = 0
    let realItemColSum = 0
    const { baseColProps = {} } = unref(getProps)

    for (const schema of unref(getSchema)) {
      const { show, colProps } = schema
      let isShow = true

      if (isBoolean(show)) {
        isShow = show
      }

      if (isFunction(show)) {
        isShow = show({
          schema: schema,
          model: formModel,
          field: schema.field,
          values: {
            ...unref(defaultValueRef),
            ...formModel,
          },
        })
      }
      if (isShow && (colProps || baseColProps)) {
        const { itemColSum: sum, isAdvanced } = getAdvanced({ ...baseColProps, ...colProps }, itemColSum)

        itemColSum = sum || 0
        if (isAdvanced) {
          realItemColSum = itemColSum
        }
        fieldsIsAdvancedMap[schema.field] = isAdvanced
      }
    }

    // 确保页面发送更新
    vm?.proxy?.$forceUpdate()

    getAdvanced({ span: BASIC_COL_LEN }, itemColSum, true)

    emit('advanced-change')
  }

  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced
    emit('advanced-change')
  }

  onMounted(updateAdvanced)

  return {
    handleToggleAdvanced,
    fieldsIsAdvancedMap
  }
}