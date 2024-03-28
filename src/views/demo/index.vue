<template>
  <page-wrapper>
    <div class="table-wrapper">
      <vc-table
        name="name"
        adaptive
        :columns="columns"
        :data="data"
      />
    </div>
  </page-wrapper>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const columns = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '地址', prop: 'address' }
]
const data = ref([])
onMounted(() => {
  console.log('mounted')
  data.value = [
    { name: '张三', age: 18, address: '北京' },
    { name: '李四', age: 20, address: '上海' },
    { name: '王五', age: 22, address: '广州' },
    { name: '赵六', age: 24, address: '深圳' },
    { name: '孙七', age: 26, address: '杭州' },
    { name: '周八', age: 28, address: '南京' },
    { name: '吴九', age: 30, address: '苏州' },
    { name: '郑十', age: 32, address: '成都' },
    { name: '钱十一', age: 34, address: '重庆' },
    { name: '马十二', age: 36, address: '武汉' },
    { name: '陈十三', age: 38, address: '西安' },
    { name: '杨十四', age: 40, address: '长沙' },
    { name: '黄十五', age: 42, address: '郑州' },
    { name: '吕十六', age: 44, address: '青岛' },
    { name: '徐十七', age: 46, address: '济南' },
    { name: '胡十八', age: 48, address: '石家庄' },
    { name: '朱十九', age: 50, address: '太原' },
    { name: '秦二十', age: 52, address: '呼和浩特' },
    { name: '尤二十一', age: 54, address: '银川' },
    { name: '许二十二', age: 56, address: '西宁' },
    { name: '何二十三', age: 58, address: '拉萨' },
    { name: '吕二十四', age: 60, address: '乌鲁木齐' },
    { name: '施二十五', age: 62, address: '香港' },
    { name: '张二十六', age: 64, address: '澳门' },
    { name: '李二十七', age: 66, address: '台北' },
    { name: '王二十八', age: 68, address: '新加坡' },
    { name: '赵二十九', age: 70, address: '吉隆坡' },
    { name: '孙三十', age: 72, address: '曼谷' },
    { name: '周三十一', age: 74, address: '雅加达' },
    { name: '吴三十二', age: 76, address: '胡志明市' },
  ]
})
</script>
