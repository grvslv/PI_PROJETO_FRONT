<template>

   <div class="p_products">
      <div class="p_product_filter_container">
         <div class="p_product_filter">
            <icon class="p_filter_icon" name="ph:magnifying-glass" />
            <input v-model="searchText" type="text" placeholder="Pesquisar por Nome">
         </div>
      </div>
      
      <div class="p_product_container">
         
         <product-card-product
            v-for="item in filterProductByName"
            :key="item.id"
            :product="item"
         />
         
      </div>
   </div>
   
</template>

<script setup>

   definePageMeta({
      layout: "store"
   });
   
   const store = useProducts();
   const {products} = storeToRefs(store);
   
   const searchText = ref('');
   // CARALHO NAO USA INDEX PRA FILTRAR AS COISAS.!!!!
   const filterProductByName = computed(() => {
      if(searchText.value == '') {
         return products.value;
      }
      return products.value.filter((item) => {
         return item.name.toLowerCase().includes(searchText.value.toLowerCase())
      })
   });
   
   onMounted(async () => {
      await store.getProducts()
   });

   useHead({
      title: 'Store - Produtos',
   })

</script>

<style scoped>

   .p_products {
      margin-top: 150px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 200px;
      row-gap: 40px;
   }
   
   .p_product_filter_container {
      width: 1300px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
   }
   
   .p_product_filter {
      width: 300px;
      border: 1px solid #f4f4f4;
      border-radius: 8px;
      padding: 13px;
      display: flex;
      justify-items: flex-start;
      align-items: center;
      column-gap: 10px;
      background: white;
   }
   
   .p_filter_icon {
      width: 20px;
      height: 20px;
      color: #a2a2a2;
   }
   
   .p_product_filter input {
      flex: 1;
      height: 100%;
   }
   
   .p_product_filter input:focus .p_product_filter{
      border: 1px solid #696969;
   }
   
   
   
   .p_product_container {
      width: 1300px;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: wrap;
      column-gap: 20px;
      row-gap: 20px;
   }

</style>