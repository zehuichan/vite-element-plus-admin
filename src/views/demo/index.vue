<template>
  <page-wrapper>
    <div class="table-container">
      <vc-search
        :schemas="getSearchSchemas()"
      />
    </div>
  </page-wrapper>
</template>

<script setup>

import { createFieldHelper } from '@/enums/busEnum'

const getSearchSchemas = () => {
  return [
    createFieldHelper('Input', { field: 'nameZh', label: 'name' }),
    createFieldHelper('Input', { field: 'a', label: 'a' }),
    createFieldHelper('Input', { field: 'b', label: 'b' }),
    createFieldHelper('Input', { field: 'c', label: 'c' }),
    createFieldHelper('Input', { field: 'd', label: 'd' }),
    createFieldHelper('Input', { field: 'e', label: 'e' }),
    createFieldHelper('Input', { field: 'f', label: 'f' }),
    createFieldHelper('Input', { field: 'g', label: 'g' }),
    createFieldHelper('Input', { field: 'h', label: 'h' }),
    createFieldHelper('Input', { field: 'i', label: 'i' }),
  ]
}
</script>
