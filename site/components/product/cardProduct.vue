<template>
   
   <div class="p_product_card">
      
      <div class="p_product_image">
         <img :src="getImage + product.id + '/' + product.default_image.path" @load="setImageClass($event.target)" :class="imageSizeString" alt="">
      </div>
            
      <div class="p_product_body_header">
         <h2>{{ limitTitle(product.name, 40) }}</h2>
         
         <div class="p_product_body_info">
            <p class="p_product_price">R${{ formatValue(product.price) }}</p>
            <NuxtLink class="p_product_button" :to="'/produto/' + replaceSpaceToDash(product.name)">Ver Produto</NuxtLink>
         </div>
         
      </div>
      
   </div>
   
</template>

<script setup>

   const props = defineProps({
      product: {}
   });
   
   const config = useRuntimeConfig();
   
   const getImage = config.public.baseURL + '/getImage/';
   
   const {product} = props;   
   
   function formatValue(value) {
      let val = (value/1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
   
   function replaceSpaceToDash(name) {
      return name.replace(/\s/g, '-');
   };
   
</script>

<style scoped>


   .p_product_card {
      width: 310px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 10px;
      padding: 20px;
      transition: .3s;
      padding-bottom: 20px;
      background: white;
   }
   
   .p_product_card:hover {
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
   }
   
   .p_product_image {
      width: 100%;
      height: 270px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      position: relative;
   }
   
   .p_product_cart {
      width: 40px;
      height: 40px;
      padding: 8px;
      border-radius: 50%;
      background: #1b1b1b;
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: white;
      stroke: none;
      cursor: pointer;
      transition: .3s;
   }
   
   .p_product_cart:hover {
      background: #333333;
   }
   
   .h_full {
      height: 100%;
   }
   
   .w_full {
      width: 100%;
   }
   
   .p_product_body_header {
      margin-top: 15px;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between !important;
   }
   
   .p_product_body_header h2 {
      font-size: 14px;
      font-weight: 500;
      flex: 1;
      color: #000000;
      display: flex;
      text-align: start;
      margin-bottom: 10px;
   }
   
   .p_product_body_info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .p_product_price {
      font-size: 16px;
      margin-top: 6px;
      color: #1c1c1c;
      font-weight: bold;
   }
   
   .p_product_button {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 8px;
      background: #1c1c1c;
      color: white;
      font-size: 12px;
      cursor: pointer;
      transition: .3s;
   }
   
   .p_product_button:hover {
      background: #363636;
   }
   
   @media screen and (max-width: 550px) {
      
      .p_product_card {
         width: 100%;
      }
      
   }


</style>