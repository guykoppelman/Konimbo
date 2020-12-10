<template>
    <ul style="list-style-type: none">
    <li v-for="product in items" v-bind:key="product.store_category_title">
      <Item v-bind:product="product"/>
    </li>
    </ul>
</template>

<script>
import Item from './Item.vue';
export default {
  components: {
   Item,
  },
  name: 'ItemList',
  props:['items'],
}
</script>

<style scoped>

</style>