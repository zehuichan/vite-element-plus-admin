export function createPlaceholderMessage(component) {
  if (component.includes('Input') || component.includes('Complete')) {
    return '请输入'
  }
  if (component.includes('Picker')) {
    return '请选择'
  }
  if (
    component.includes('Select') ||
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

