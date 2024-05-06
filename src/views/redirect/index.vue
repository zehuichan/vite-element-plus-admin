<script lang="jsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()

    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      const _path = Array.isArray(path) ? path.join('/') : path
      router.replace({
        path: _path,
        query,
      })
    })

    return () => <div />
  },
})
</script>
