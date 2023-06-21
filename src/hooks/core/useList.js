import { ref, reactive } from 'vue'
import { noop } from '@/utils'

export function useList(opts) {
  const {
    searchForm = {},
    getListApi = noop
  } = opts

  const loading = ref(false)
  const tableData = ref([])

  const page = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0
  })

  async function getList() {
    const data = {
      ...page,
      ...searchForm
    }

    const res = await getListApi(data)
    tableData.value = res.data?.list || []
    page.total = res.data?.total || 0
  }
}