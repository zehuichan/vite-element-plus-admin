import { isBoolean, isFunction } from '@/utils/is'

export function useFormStates() {

  const getDisable = computed(() => {
    const { disabled: globDisabled } = props.formProps;
    const { dynamicDisabled } = props.schema;
    const { disabled: itemDisabled = false } = unref(getComponentsProps);
    let disabled = !!globDisabled || itemDisabled;
    if (isBoolean(dynamicDisabled)) {
      disabled = dynamicDisabled;
    }
    if (isFunction(dynamicDisabled)) {
      disabled = dynamicDisabled(unref(getValues));
    }
    return disabled;
  });

  const getReadonly = computed(() => {
    const { readonly: globReadonly } = props.formProps;
    const { dynamicReadonly } = props.schema;
    const { readonly: itemReadonly = false } = unref(getComponentsProps);
    let readonly = globReadonly || itemReadonly;
    if (isBoolean(dynamicReadonly)) {
      readonly = dynamicReadonly;
    }
    if (isFunction(dynamicReadonly)) {
      readonly = dynamicReadonly(unref(getValues));
    }
    return readonly;
  });
}
