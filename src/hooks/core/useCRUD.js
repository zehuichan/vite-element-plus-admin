import { computed, ref, unref } from 'vue'
import { initData } from '@/api/data'

export function useCRUD(config) {
  const { url, transform, immediate = true } = config || {}

  const loading = ref(true)
  const page = ref(1)
  const limit = ref(20)
  const total = ref(0)
  const params = ref({})
  const list = ref([])

  // 请求上传的表单 (为了方便处理搜索绑定的表单与请求所需表单存在差异的情况)
  const payload = computed(() => {
    const _query = transform ? transform(unref(params)) : params.value
    return Object.assign({}, _query, {
      page: page.value, // 请求的当前页字段
      limit: limit.value, // 请求的条数字段
    })
  })

  immediate && query()

  // 前置处理
  function beforeFunc() {

  }

  // 后置处理
  function afterFunc() {

  }

  async function query() {
    try {
      loading.value = true
      const res = await initData(url, payload.value)
      list.value = res.rows
      total.value = res.total
    } catch (e) {
      loading.value = false
    }
  }

  function refresh() {
    page.value = 1
    list.value = []
    query()
  }

  function createApi(api, data) {

  }

  function readApi(api, data) {

  }

  function updateApi(api, data) {

  }

  function deleteApi(api, data) {

  }

  return {
    loading,
    page,
    limit,
    params,
    total,
    list,

    query,
    refresh
  }
}
