<script lang="jsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Highlighter',
  props: {
    keyword: String
  },
  setup(props, { slots }) {
    const { keyword } = props

    const children = slots.default?.()
    if (!keyword) return () => children
    if (children.length > 1) return () => children

    // 支持多个匹配高亮
    const parts = children[0].children.split(keyword)
    // 未匹配到
    if (parts.length < 2) return () => children

    const lastPart = parts.pop()

    return () => (
      <span class="highlighter">
        {
          parts.reduce((acc, part, index) => {
            acc.push(part)
            acc.push(<span key={index} class="matched">{keyword}</span>)
            return acc
          }, [])
        }
        {lastPart}
      </span>
    )
  }
})
</script>

<style lang="scss">
.highlighter {
  .matched {
    color: var(--el-color-primary);
  }
}
</style>
