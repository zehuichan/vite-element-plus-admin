import { h, defineComponent, resolveComponent } from 'vue'

export default function useElIcon(icon, color = 'inherit', size) {
  console.log(h(icon))
  return defineComponent({
    render() {
      // return h(resolveComponent(icon))
      return h('el-icon', null, {
        default: () => h(icon)
      })
    }
  })
}
