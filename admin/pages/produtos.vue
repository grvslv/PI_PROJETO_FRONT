<template>
   
   <div class="product_body">
      
      <div class="product_body_filter">
         <icons-user-icon-filter />
         <input @keyup="getProductsByName()" v-model="filterByName" type="text" placeholder="Filtrar por Nome">
      </div>
      
      <div class="product_container">
         
         <product-card-product
            v-for="(product, index) in products.data"
            :key="index"
            :product="product"
         />
         
      </div>
      
   </div>
   
   <div class="product_pagination">
      
      <button
         :disabled="currentPage == 1"
         :class="currentPage == 1 ? 'pag_disabled' : ''"
         @click="changePage(currentPage + -1)"
      ><icon name="heroicons:arrow-left-20-solid" class="pag_icon" /></button>
      <button
         v-for="page in lastPage"
         :key="page"
         @click="changePage(page)"
         :class="currentPage == page ? 'pag_selected' : ''"
         :disabled="currentPage == page"
      >{{ page }}</button>
      <button
      :disabled="currentPage == lastPage"
         :class="currentPage == lastPage ? 'pag_disabled' : ''"
         @click="changePage(currentPage + 1)"
      ><icon name="heroicons:arrow-right-20-solid" class="pag_icon"  /></button>
      
   </div>
   
   <product-form-new-product />
   <product-form-edit-product />
   
   <button @click="store.changeFormState(true)" v-if="permission" class="btn_new_product">
      <icon name="heroicons:plus" class="btn_new_product_icon" />
      Novo Produto
   </button>
   
   <alert-product-modal />
   
</template>

<script setup>

   definePageMeta({
      layout: "dashboard",
      middleware: "auth"
   });
   
   const permission = validateRole('Admin');
   
   const store = useProducts();
   const {filterByName} = storeToRefs(store);
   const {products} = storeToRefs(store);
   
   const {lastPage} = storeToRefs(store);
   const {currentPage} = storeToRefs(store);
   
   onMounted(async () => {
      await store.getProducts(currentPage)
   });

   async function changePage(offset) {
      await store.getProducts(offset);
   }
   
   async function getProductsByName() {
      await store.getProducts(currentPage);
   }



</script>

<style>

   .product_body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 40px;
      row-gap: 30px;
   }
   
   .product_body_filter {
      width: 300px;
      height: 43px;
      background: none;
      border: 1px solid #1b1b1b;
      border-radius: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      column-gap: 5px;
   }
   
   .product_body_filter input {
      flex: 1;
      height: 100%;
      background: none;
   }
   
   .product_container {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: wrap;
      row-gap: 20px;
      column-gap: 20px;
   }
   
   .product_pagination {
      width: 100%;
      padding: 40px;
      row-gap: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 10px;
      padding-bottom: 200px;
   }
   
   .product_pagination button {
      width: 40px;
      height: 40px;
      border: 1px solid #212121;
      background: none;
      color: white;
      font-size: 14px;
      cursor: pointer;
      border-radius: 6px;
      transition: .3s;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .product_pagination span {
      width: 40px;
      height: 40px;
      border: 1px solid #212121;
      background: none;
      color: white;
      font-size: 14px;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .product_pagination button:hover {
      background: #212121;
      transform: scale(1.1);
   }
   
   .product_pagination .pag_selected {
      background: #212121;
      transform: scale(1.1);
   }
   
   .product_pagination .pag_disabled {
      border: 1px solid #1c1c1c;
      background: none;
      color: rgb(143, 143, 143);
      cursor: unset;
   }
   
   .product_pagination .pag_disabled:hover {
      background: none;
      transform: none;
   }
   
   .btn_new_product {
      position: fixed;
      bottom: 30px !important;
      right: 20px !important;
      padding: 13px 25px;
      border-radius: 8px;
      background: #224cc1;
      cursor: pointer;
      transition: .3s;
      font-size: 13px;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 10px;
   }
   
   .btn_new_product_icon {
      font-size: 20px;
   }
   
   .btn_new_product:hover {
      filter: brightness(1.2);
   }
   
   @media screen and (max-width: 550px) {
      
      .product_body {
         padding: 10px;
      }
      
      .product_body_filter {
         width: 100%;
      }
      
   }

</style>