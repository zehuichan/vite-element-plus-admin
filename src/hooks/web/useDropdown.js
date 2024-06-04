import { reactive } from 'vue'

export function useDropdown() {

  const dropdownRef = reactive({
    show: false,
    row: null,
    customEvent: null,
    axis: { x: 0, y: 0 },
  })

  const createDropdown = (options) => {
    const { row = {}, event } = options || {}
    dropdownRef.show = true
    dropdownRef.row = row
    dropdownRef.customEvent = event
    dropdownRef.axis = { x: event.clientX, y: event.clientY }
  }

  return {
    dropdownRef,
    createDropdown
  }
}
