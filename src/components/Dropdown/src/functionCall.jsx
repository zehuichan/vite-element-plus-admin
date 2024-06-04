import { ref, watch, getCurrentInstance } from 'vue'

import { mountComponent } from '@/utils'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

let instance

function initInstance() {
  const { instace, unmount } = mountComponent({
    setup() {
      const show = ref(false)

      return () => <Dropdown onUpdate:show={show.value} />

    }
  })

  return instance
}
