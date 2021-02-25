<template>
  <div class="v-components">
    <h1>业务组件</h1>
    <demo-card title="v-search">
      <v-search v-model="dataForm" :options="options">
        <template #tools>
          自定义额外插槽 #tools
        </template>
      </v-search>
    </demo-card>
    <demo-card title="v-search">
      <v-form v-model="dataForm" :options="options">
        <template #actions>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </template>
      </v-form>
    </demo-card>
  </div>
</template>

<script>
  // mixins
  import comp from './comp'

  export default {
    name: 'index',
    mixins: [comp],
    data() {
      return {
        options: [
          { label: 'Name', key: 'name', value: null, placeholder: 'Name', type: 'input' },
          { label: 'Age', key: 'age', value: null, placeholder: 'Age', type: 'input' },
          { label: 'Address', key: 'address', value: null, placeholder: 'Address', type: 'input' },
          { label: 'Tags', key: 'tags', value: null, placeholder: 'Address', type: 'input' },
          {
            label: 'Select',
            key: 'select',
            value: null,
            placeholder: 'Select',
            type: 'select',
            options: [
              { value: '3', label: '备选项' },
              { value: '6', label: '备选项' },
              { value: '9', label: '备选项' },
            ]
          },
          { label: 'Daterange', key: 'daterange', value: [], placeholder: 'Daterange', type: 'daterange' },
        ],
        dataForm: {
          Name: 'chenzehui'
        }
      }
    },
    methods: {
      onSearch(form) {

      }
    }
  }
</script>

<style lang="scss">
  @import './index.scss';
</style>