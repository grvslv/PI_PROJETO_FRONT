<template>
   
   <div class="card_list_item">
      <div class="c_l_image">
         <img :src="getImage + product.id + '/' + product.default_image.path" @load="setImageClass($event.target)" :class="imageSizeString" alt="">
      </div>
      <div class="c_l_info">
         <h2 @click="console.log(imageSizeString)">{{ product.name }}</h2>
         <span>R${{ formatValue(product.price) }}</span>
      </div>
      <div class="c_l_actions">
         <div class="qt_box" @click="updateItem(product, false)">
            <icon class="qt_item" name="ph:minus-bold" />
         </div>
         <div class="qt_box qt_box_p">
            <p class="qt_item">{{ product.counter }}</p>
         </div>
         <div class="qt_box" @click="updateItem(product, true)">
            <icon class="qt_item" name="ph:plus-bold" />
         </div>
         <div class="qt_box mg_left" @click="removeItem(product)">
            <icon class="qt_item" name="ph:x-bold" />
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
   
   const cartStore = useCart();
   const {removeItem} = cartStore;
   const {updateItem} = cartStore;

</script>


<style scoped>

   .card_list_item {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.05);
      column-gap: 15px;
      transition: .3s;
   }
   
   .card_list_item:hover {
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.09);
   }
   
   .c_l_image {
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 8px;
   }
   
   .h_full {
      height: 100% !important;
   }
   
   .w_full {
      width: 100% !important;
   }
   
   .c_l_info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      flex: 1;
   }
   
   .c_l_info h2 {
      font-size: 15px;
      font-weight: 500;
      color: #7a7a7a;
   }
   
   .c_l_info span {
      font-size: 15px;
      font-weight: 600;
      color: #454545;
      margin-top: 5px;
   }
   
   .c_l_actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      column-gap: 2px;
   }
   
   .qt_box {
      width: 30px;
      height: 30px;
      /* border: 1px solid #eeeeee; */
      background: rgb(249, 249, 249);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-align: center;
   }
   
   .qt_box:hover {
      background: rgb(243, 243, 243);
   }
   
   .qt_box p {
      margin: 0;
      padding: 0;
      font-size: 13px;
      color: #606060 !important;
      font-weight: 500;
   }
   
   .qt_box_p {
      cursor: unset !important;
   }
   
   .qt_box .qt_item {
      width: 14px !important;
      height: 14px !important;
      color: #7a7a7a;
   }
   
   .mg_left {
      margin-left: 15px;
   }
   

</style>