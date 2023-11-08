<template>
   
   <div class="product_page_body">
      
      <div class="product_page_container">
         
         <div class="product_page_image">
            <Carousel :autoplay="5000" id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
               <Slide v-for="slide in images" :key="slide">
                  <div class="carousel__item">
                     <img @load="setImageClass($event.target, slide)" :class="slide.isWFull ? 'w_full' : 'h_full'" :src="getImage + product.id + '/' + slide.path" >
                  </div>
               </Slide>
               
               <template #addons>
                  <navigation>
                     <template #next>
                        <icon class="navigation_slide_icon" name="ph:arrow-right-bold" />
                     </template>
                     <template #prev>
                        <icon class="navigation_slide_icon" name="ph:arrow-left-bold" />
                     </template>
                  </navigation>
               </template>
            </Carousel>
            <Carousel
               id="thumbnails"
               :items-to-show="4"
               :wrap-around="true"
               v-model="currentSlide"
               ref="carousel"
            >
               <Slide v-for="slide in images" :key="slide">
                  <div class="carousel__item carousel__item2" @click="slideTo(slide - 1)">
                     <img @load="setImageClass($event.target, slide)" :class="slide.isWFull ? 'w_full' : 'h_full'" :src="getImage + product.id + '/' + slide.path" >
                  </div>
               </Slide>
            </Carousel>
            
         </div>
         <div class="product_page_infos">
            
            <h2>{{ product.name }}</h2>
            <p class="product_page_description">{{ product.description }}</p>
            <p class="product_page_price">R${{ formatValue(product.price) }}</p>
            
            <div class="product_page_rating">
               <span>Avaliação: ({{ Math.round(product.rating * 2) / 2 }})</span>
               <template v-for="star in 5" :key="star">
                  <icon class="p_rating" :name="getStarIcon(star)" />
               </template>
            </div>
            
            <div class="product_page_actions">
               <button class="product_page_add_to_cart" @click="addToCart(product)">Comprar este Produto</button>
            </div>
            
         </div>
         
      </div>
      
   </div>
   
</template>

<script setup>

   import { useRoute } from 'vue-router'

   import 'vue3-carousel/dist/carousel.css'
   import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

   definePageMeta({
      layout: "store"
   });
   
   const cartStore = useCart();
   const {cart} = storeToRefs(cartStore);
   const {verifyCart} = cartStore;
   const {addToCart} = cartStore;
   const {isInCart} = storeToRefs(cartStore);
         
   const config = useRuntimeConfig();
   
   const getImage = config.public.baseURL + '/getImage/';
   
   const store = useProducts();
   
   const {product} = storeToRefs(store);
   
   function getStarIcon(starIndex) {
      // Aqui, você pode implementar a lógica para escolher entre as diferentes classes de ícones
      // com base na avaliação média ou pontuação
      // Por exemplo, para uma avaliação média de 3.5:
      const roundedRating = Math.round(product.value.rating * 2) / 2;
      
      if (roundedRating >= starIndex) {
        return 'ph:star-fill';
      } else if (roundedRating + 0.5 >= starIndex) {
        return 'ph:star-half-fill';
      } else {
        return 'ph:star';
      }
   };
   

   
   const currentSlide = ref(0);
   
   function slideTo(val) {
      currentSlide = val
   }
   
   const imageSizeString = ref('');
   
   const images = ref([]);
   
   const routers = useRoute()
   const productTitle = routers.params.produto.replace(/-/g, ' ');
   
   
   onMounted(async () => {
      await store.getProduct(routers.params.produto);
      
      product.value.images_to_page.forEach((element, index) => {
         images.value.push({
            path: element.path,
            isWFull: false
         });
      });

      verifyCart(product);
            

   });
   
   useHead({
      title: 'product.value.name',
      meta: [{ name: "description", content: "My amazing site." }],
   })
   
   function setImageClass(imageElement, imageContent) {
      const width = imageElement.naturalWidth;
      const height = imageElement.naturalHeight;
      
      if(width > height) {
         imageSizeString.value = 'h_full'
         imageContent.isWFull = false;
      } else {
         imageSizeString.value = 'w_full'
         imageContent.isWFull = true;
      }
      
   }
   
</script>

<style scoped>

   .product_page_body {
      width: 100%;
      margin-top: 170px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 200px;
   }
   
   .product_page_container {
      width: 1300px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      column-gap: 50px;
   }
   
   .product_page_image {
      width: 600px;
   }
   
   .product_page_infos {
      width: 500px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 20px;
   }
   
   .product_page_infos h2 {
      font-size: 30px;
      font-weight: 900;
      color: #1f1f1f;
   }
   
   .product_page_infos .product_page_description {
      font-size: 13px;
      font-weight: 300;
      color: #888888;
   }
   
   .product_page_infos .product_page_price {
      font-size: 20px;
      font-weight: 900;
      color: #2b2b2b;
   }
   
   .product_page_rating {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
   }
   
   .product_page_rating .p_rating {
      width: 13px;
      height: 13px;
      color: #171717;
   }
   
   .product_page_rating span {
      font-size: 12px;
      margin-right: 5px;
      font-weight: 500;
      color: #000000;
   }
   
   .product_page_actions {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 20px;
   }
   
   .product_page_quantity {
      display: flex;
      justify-content: flex-start;
      align-items: center;
   }
   
   .product_page_quantity span {
      font-size: 14px;
      color: #696969;
      margin-right: 20px;
   }
   
   .quantity_item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
   }
   

   
   .product_page_add_to_cart {
      flex: 1;
      padding: 13px;
      border-radius: 8px;
      background: #171717;
      color: white;
      cursor: pointer;
      transition: .3s;
   }
   
   .product_page_add_to_cart:hover {
      background: #2c2c2c;
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   /* carousel */
   
   
   

   .carousel__item {
      width: 600px !important;
      height: 600px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      overflow: hidden !important;
      border-radius: 20px !important;
   }
   
   .carousel__item2 {
      margin-top: 30px;
      width: 130px !important;
      height: 130px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      overflow: hidden !important;
   }
   
   .navigation_slide_icon {
      color: white;
      padding: 6px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(33, 33, 33, 0.717);
   }
   
   .h_full {
      height: 100% !important;
   }
   
   .w_full {
      width: 100% !important;
   }

</style>