export function createPlaceholderMessage(component) {
  if (component.includes('Input') || component.includes('ApiSuggestion')) {
    return '请填写'
  }
  if (
    component.includes('Select') ||
    component.includes('ApiSelect') ||
    component.includes('ApiTreeSelect') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch') ||
    component.includes('Segmented')
  ) {
    return '请选择'
  }
  return ''
}

const DATE_TYPE = ['DatePicker', 'TimePicker', 'TimeSelect']

function genType() {
  return [...DATE_TYPE, 'RangePicker']
}

export const dateItemType = genType()

export const simpleComponents = ['Divider', 'AppTitle', 'BasicTitle']

export function isIncludeSimpleComponents(component) {
  return simpleComponents.includes(component || '')
}

export const defaultValueComponents = ['Input', 'InputPassword', 'InputSearch', 'InputTextArea']

