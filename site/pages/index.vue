<template>
   
   <div class="index">
      
      <div class="index_container">
         <div class="index_infos">
            <h2>STORE, O SEU E-COMMERCE ONLINE</h2>
            <template v-if="!token">
               <p>Não tem uma conta?</p>
               <NuxtLink class="index_btn_signin" to="/cadastro">Cadastrar</NuxtLink>
               <p>Já possui uma conta?</p>
               <NuxtLink class="index_btn_login" to="/login">Login</NuxtLink>
            </template>
         </div>
      </div>
      
      <NuxtLink class="index_to_products" to="/produtos">Ver Produtos</NuxtLink>
      
   </div>

</template>

<script setup>

   definePageMeta({
      layout: "store"
   });

   const profileStore = useProfile();
   const {token} = storeToRefs(profileStore);
   
   useHead({
      title: 'Store - Início',
   })

</script>

<style scoped>

   .index {
      margin-top: 150px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 200px;
   }
   
   .index_container {
      width: 1300px;
      height: 450px;
      background: #1A1A1A;
      /* background: url('../static/wave.svg'); */
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }
   
   .index_infos {
      width: 1300px;
      height: 450px;
      border-radius: 20px;
      background: url('../static/wave.svg');
      background-position: top;
      background-size: cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }
   
   .index_infos h2 {
      font-size: 40px;
      color: #fff;
      margin-bottom: 20px;
   }
   
   .index_infos p {
      font-size: 16px;
      color: #e1e1e1;
      font-weight: 300;
      margin-bottom: 10px;
   }
   
   .index_btn_signin {
      width: 200px;
      padding: 13px;
      background: rgb(255, 255, 255);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      margin-bottom: 30px;
      color: rgb(0, 0, 0);
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: .3s;
   }
   
   .index_btn_signin:hover {
      background: #dddddd;
   }
   
   
   .index_btn_login {
      width: 200px;
      padding: 13px;
      background: rgb(20, 216, 141);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      margin-bottom: 30px;
      color: rgb(4, 41, 26);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: .3s;
   }
   
   .index_btn_login:hover {
      background: rgb(16, 182, 118);
   }
   
   .index_to_products {
      width: 200px;
      padding: 13px;
      background: #1A1A1A;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      margin-bottom: 30px;
      color: rgb(255, 255, 255);
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      transition: .3s;
      margin-top: 40px;
   }

</style>