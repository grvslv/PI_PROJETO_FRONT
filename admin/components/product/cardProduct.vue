<template>
   
   <div class="p_product_card">
      
      <div class="p_product_image">
         <img :src="getImage + product.id + '/' + product.default_image.path" @load="setImageClass($event.target)" :class="imageSizeString" alt="">
         <div v-if="permission" @click="changeModalState(true, product.id)" class="p_product_badge" :class="product.isActive ? 'p_b_active' : 'p_b_disabled'">Status: {{ product.isActive ? 'Ativo' : 'Inativo' }}</div>
         <div v-else class="p_product_badge" :class="product.isActive ? 'p_b_active' : 'p_b_disabled'">Status: {{ product.isActive ? 'Ativo' : 'Inativo' }}</div>
         
         <div class="p_product_price">R${{ formatValue(product.price) }}</div>
         <div class="p_product_stock">Quantidade: {{ product.stock }}</div>
         <div class="p_product_code">Código: {{ product.id }}</div>
         
      </div>
            
      <div class="p_product_body_header">
         <h2>{{ limitTitle(product.name, 57) }}</h2>
      </div>
      
      <div class="p_product_manage">
         
         <icon name="heroicons:arrow-top-right-on-square-20-solid" class="p_icon"/>
         <icon @click="openEditForm(product.id)" name="carbon:edit" class="p_icon" />
         
      </div>
      
   </div>
   
</template>

<script setup>

   const props = defineProps({
      product: {}
   });
   
   const config = useRuntimeConfig();
   
   const getImage = config.public.baseURL + '/getImage/';
   
   const store = useProducts();
   
   const {product} = props;
   
   const {changeModalState} = store;
   
   const permission = validateRole('Admin');

   function formatValue(value) {
      let val = (value/1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   }
   
   async function changeProductStatus (id) {
      
      await store.changeProductStatus(id)
      product.isActive = !product.isActive;
      
   }
   
   const imageSizeString = ref('');
   
   function setImageClass(imageElement) {
      const width = imageElement.naturalWidth;
      const height = imageElement.naturalHeight;       
      
      if(width > height) {
         imageSizeString.value = 'h_full'
      } else {
         imageSizeString.value = 'w_full'
      }
   }
   
   function limitTitle (string = '', limit = 0) {  
      if(string.length > limit) {
         return string.substring(0, limit) + '...';
      } else {
         return string.substring(0, limit)
      }
   }
   
   function openEditForm(id) {
      
      store.getProductToUpdate(id)
      
   }
   
   

</script>

<style scoped>

   .p_product_card {
      width: 220px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #1b1b1b;
   }
   
   .p_product_image {
      width: 100%;
      height: 200px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      position: relative;
   }
   
   .h_full {
      height: 100%;
   }
   
   .w_full {
      width: 100%;
   }
   
   .p_product_badge {
      padding: 4px 10px;
      color: white;
      position: absolute;
      bottom: 10px;
      font-weight: 500;
      left: 10px;
      border-radius: 6px;
      z-index: 1;
      font-size: 11px;
      cursor: pointer;
   }
   
   .p_product_stock {
      padding: 4px 10px;
      color: white;
      background: #1919199d;
      position: absolute;
      top: 35px;
      left: 10px;
      font-weight: 500;
      border-radius: 6px;
      z-index: 1;
      font-size: 11px;
   }
   
   .p_product_code {
      padding: 4px 10px;
      color: white;
      background: #1919199d;
      position: absolute;
      top: 60px;
      left: 10px;
      font-weight: 500;
      border-radius: 6px;
      z-index: 1;
      font-size: 11px;
   }
   
   .p_product_price {
      padding: 4px 10px;
      color: #ffffff;
      background: #042d1b9d;
      position: absolute;
      top: 10px;
      left: 10px;
      font-weight: 500;
      border-radius: 6px;
      z-index: 1;
      font-size: 11px;
   }
   
   .p_b_active {
      background: #076f48c7;
   }
   
   .p_b_disabled {
      background: #500505c7;
   }
   
   .p_product_body_header {
      margin-top: 15px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
   }
   
   .p_product_body_header h2 {
      font-size: 13px;
      font-weight: 500;
      flex: 1;
      color: #e6e6e6;
      display: flex;
      text-align: start;
   }
   
   .p_product_manage {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 5px;
   }
   
   .p_product_manage .p_icon {
      font-size: 27px;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      transition: .3s;
      color: red !important;
   }
   
   .p_product_manage .p_icon:hover {
      background: #1b1b1b;
   }
   
   @media screen and (max-width: 550px) {
      
      .p_product_card {
         width: 100%;
      }
      
   }


</style>