import {
  ElAutocomplete,
  ElCascader,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimeSelect
} from 'element-plus'
import ApiRadioGroup from './components/ApiRadioGroup.vue'
import ApiSelect from './components/ApiSelect.vue'

const componentMap = new Map()

componentMap.set('Input', ElInput)
componentMap.set('InputNumber', ElInputNumber)
componentMap.set('Autocomplete', ElAutocomplete)

componentMap.set('Select', ElSelect)
componentMap.set('Cascader', ElCascader)

componentMap.set('Switch', ElSwitch)
componentMap.set('Slider', ElSlider)

componentMap.set('TimeSelect', ElTimeSelect)
componentMap.set('TimePicker', 'el-time-picker')
componentMap.set('DatePicker', 'el-date-picker')

componentMap.set('Upload', 'el-upload')
componentMap.set('Rate', 'el-rate')
componentMap.set('ColorPicker', 'el-color-picker')

componentMap.set('Divider', 'el-divider')

componentMap.set('ApiRadioGroup', ApiRadioGroup)
componentMap.set('ApiSelect', ApiSelect)

export function add(compName, component) {
  componentMap.set(compName, component)
}

export function del(compName) {
  componentMap.delete(compName)
}

export { componentMap }
