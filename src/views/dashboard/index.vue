<template>
  <div class="app-container">
    <code>Dashboard</code>
  </div>
  <div class="box">
    <div class="list">
      <div class="item" v-for="item in 4" :key="item">
        <img class="default" src="./img_cgfhjd_1.png" alt="" />
        <img class="active" src="./img_cgfhjd_2.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss">
.box {
  margin: 16px 16px 0;
  height: 240px;
}

.list {
  width: 100%;
  display: flex;
}

.item {
  width: 300px;
  height: 240px;
  transition: all 0.3s;
  cursor: pointer;

  img {
    width: 100%;
    display: block;
  }

  .active {
    display: none;
  }

  &:hover {
    width: 360px;

    .default {
      display: none;
    }

    .active {
      display: block;
      margin-top: -40px;
    }
  }
}
</style>
