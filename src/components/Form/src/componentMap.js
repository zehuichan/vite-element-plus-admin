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

import ApiSelect from './components/ApiSelect.vue'
import ApiRadioGroup from './components/ApiRadioGroup.vue'
import ApiTabs from './components/ApiTabs.vue'
import ApiCheckbox from './components/ApiCheckbox.vue'
import ApiCheckTag from './components/ApiCheckTag.vue'
import ApiSuggestion from './components/ApiSuggestion.vue'
import Field from './components/Field.vue'
import Desc from './components/Desc.vue'

// todo 自定义表单组件在这里也要新增配置

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

// 自定义表单组件在这里也要新增配置
componentMap.set('ApiSelect', ApiSelect)
componentMap.set('ApiRadioGroup', ApiRadioGroup)
componentMap.set('ApiTabs', ApiTabs)
componentMap.set('ApiCheckbox', ApiCheckbox)
componentMap.set('ApiCheckTag', ApiCheckTag)
componentMap.set('ApiSuggestion', ApiSuggestion)
componentMap.set('Field', Field)
componentMap.set('Desc', Desc)

// 自定义表单组件在这里也要新增配置

export function add(compName, component) {
  componentMap.set(compName, component)
}

export function del(compName) {
  componentMap.delete(compName)
}

export { componentMap }
