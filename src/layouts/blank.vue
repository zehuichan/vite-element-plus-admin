<script>
import { h } from 'vue'

export default {
  name: 'blank',
  setup(props, { slots }) {
    return () => h('router-view', props, slots)
  }
}
</script>
