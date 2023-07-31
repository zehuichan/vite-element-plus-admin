import {
  ElAutocomplete,
  ElCascader,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimeSelect,
  ElTimePicker,
  ElDatePicker,
  ElDivider
} from 'element-plus'
import ApiRadioGroup from './components/ApiRadioGroup.vue'
import ApiSelect from './components/ApiSelect.vue'

// todo 自定义表单组件在这里也要新增配置
import { Segmented } from '@/components/Segmented'
import { Desc } from '@/components/Desc'

const componentMap = new Map()

componentMap.set('Input', ElInput)
componentMap.set('InputNumber', ElInputNumber)
componentMap.set('Autocomplete', ElAutocomplete)

componentMap.set('Select', ElSelect)
componentMap.set('Cascader', ElCascader)

componentMap.set('Switch', ElSwitch)
componentMap.set('Slider', ElSlider)

componentMap.set('TimeSelect', ElTimeSelect)
componentMap.set('TimePicker', ElTimePicker)
componentMap.set('DatePicker', ElDatePicker)

componentMap.set('Upload', 'el-upload')
componentMap.set('Rate', 'el-rate')
componentMap.set('ColorPicker', 'el-color-picker')

componentMap.set('Divider', ElDivider)

componentMap.set('ApiRadioGroup', ApiRadioGroup)
componentMap.set('ApiSelect', ApiSelect)

componentMap.set('Segmented', Segmented)
componentMap.set('Desc', Desc)

export function add(compName, component) {
  componentMap.set(compName, component)
}

export function del(compName) {
  componentMap.delete(compName)
}

export { componentMap }
