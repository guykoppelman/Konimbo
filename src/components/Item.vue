<template>


<div>

<h2>{{product.title}}</h2>
<div>
    <p>Price: {{product.price}}</p> <img height="100.px" :src="product.image.url"/>  
</div>
<router-link :to="'/details/' + product.id">Go to product</router-link>

</div>
</template>


<script>
import router from '../router'
export default {
    name: "Item",
    props: ['product'],
}

</script>


<style scoped>
.img{
    width:50px
}
.images{
    display: grid;
    grid-column: auto;
}


</style>