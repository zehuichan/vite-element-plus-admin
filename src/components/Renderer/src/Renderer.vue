<script lang="jsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Renderer',
  props: {
    render: {
      type: Function
    },
    data: {
      type: Object
    }
  },
  setup(props) {
    return () => <>{props.render(props.data)}</>
  }
})
</script>