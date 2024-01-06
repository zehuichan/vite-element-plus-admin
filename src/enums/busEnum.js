// todo
export function createFieldHelper(component, { field, label, ...rest }, componentProps, colProps) {
  return {
    field,
    component,
    label,
    colProps,
    componentProps,
    ...rest
  }
}

export function createSlotHelper(field, label, span) {
  return {
    field: field,
    component: 'Input',
    label: label,
    slot: field,
    colProps: {
      span: span
    }
  }
}
