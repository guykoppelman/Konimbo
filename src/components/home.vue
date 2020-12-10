<template>
<div id="app" class="grid">

    <div class="categories">
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <label class="sr-only" for="cats">Categoies: </label>
      <b-form-select id="cats" v-model="selected"  :options="categories"  v-on:change="filter" title="ss"> <!--  :options="categories" -->       
      </b-form-select>
        </b-input-group>
    </div>
    <div class="search">
        <b-input-group prepend="" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="inline-form-input-query" placeholder="Searce" v-model="query"></b-form-input>
          <b-button variant="outline-dark" v-on:click="search">search...</b-button>
        </b-input-group>
    </div>

    <div class="content"><ItemList :items="items"/></div>
</div>
</template>

<script>
import ItemList from './ItemList.vue'
export default {
  name: 'App',
  components: {
  ItemList
  },
  data () {
    return{
      selected: {},
      items: [],
      filtered: [],
      categories: [],
      query: ''
    }
  },
  async mounted() {
  // GET request using fetch with async/await
  const response = await fetch("https://app.konimbo.co.il/api/v2?storeId=5596&token=f6666e751b7fbe2cd5167fec753318469dea6caa161558c1d8a77b2369e3809b361b3003784c7346&groupName=group1&modelName=item");
  const data = await response.json();
  this.items = data;
  this.filtered = data;


  data.forEach(element => {
        if(!this.categories.find(i=> i.value == element.store_category_id)){
          this.categories.push({value:element.store_category_id, text: element.store_category.title_he})
        }
  });
  this.categories.push({value:-1, text: "All"});
  },
  computed:{

  },

  methods:{
        filter : function (){
        if(this.selected == -1){
          this.items = this.filtered;
          return;
        }
        this.items = this.filtered
        var arr =  this.items.filter((item)=>{
          return item.store_category_id  == this.selected;
        });
        this.items = arr;
  },
      search : function(){
        var s = this.query.trim().toLowerCase();
        if(s == 'all'){
          this.items = this.filtered;
          return;
        }
        this.items = this.filtered;
        var arr = this.items.filter(item=>{
              if(item.title.includes(s) || item.price == s || item.store_category.title_he.includes(s)){
                return item;
              }
        });
        this.items= arr;
      }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /*grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));*/
  grid-gap: 10px;
}
.categories {
grid-row: 1/2;
grid-column: 1/2;
height: 60px;
padding: 5px;
}
.search {
grid-row: 1/2;
grid-column: 2/3;
height: 60px;
padding: 5px;
}
.content{
  grid-row: 2/3;
  grid-column: 1/3;
}

#app{
  border: solid 1px #e8e8e8;
	font-family: 'Roboto', sans-serif;
	padding: 10px 7px;
	margin-bottom: 15px;
	outline: none;
}
</style>