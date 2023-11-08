<template>
   
   <div class="sponsor">
      <div class="sponsor_container">Boas-vindas à Store, seu e-commerce online.</div>
   </div>
   
   <header class="header">
      
      <div class="header_container">
         
         <div class="header_infos">
            <h2>Store</h2>
            <a href="/">Início</a>
            <a href="/produtos">Produtos</a>
         </div>
         
         <div class="header_actions">
            <icon class="header_icon_bars" name="ph:list-bold" />
            <NuxtLink class="header_cart_div" to="/carrinho">
               <icon class="header_icon_cart" name="ph:shopping-cart-bold" />
               <span class="header_cart_counter">{{ productsOnCart }}</span>
            </NuxtLink>
            
            
            <icon @click="changeModalState" class="header_icon" name="ph:user-bold" />
            <Transition name="fade">
               <div class="user_modal" v-if="modalState">
                  
                  <div v-if="!token" class="user_logout">
                     <NuxtLink class="modal_btn_login" to="/login">Fazer Login</NuxtLink>
                     <NuxtLink class="modal_btn_signin" to="/cadastro">Criar Conta</NuxtLink>
                  </div>
                  
                  <div v-if="token" class="user_login">
                     <button @click="userLogout">
                        Sair
                        <icon name="ph:sign-out-bold" class="logout_icon" />
                     </button>
                     <NuxtLink class="user_painel_btn" to="/admin">
                        Acessar Painel
                        <icon name="ph:cloud" />
                     </NuxtLink>

                  </div>
                  
               </div>
            </Transition>
         </div>
         
      </div>
      
   </header>
   
   <!-- <comp-loading /> -->
   
   <slot />
   
   
   
</template>

<script setup>


   const profileStore = useProfile();
   const {token} = storeToRefs(profileStore);
   
   
   const authStore = useAuth();
   const {userLogout} = authStore;

   const store = useUser();
   const {modalState} = storeToRefs(store);
   const {changeModalState} = store;
   
   
   const cartStore = useCart();
   const {productsOnCart} = storeToRefs(cartStore);
   
   onMounted(async () => {
      cartStore.verifyCart();
   });
   

</script>

<style scoped>

   .sponsor {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      position: absolute;
      top: 0;
      left: 0;
   }
   
   .sponsor_container {
      width: 100%;
      display: flex;
      padding: 10px;
      justify-content: center;
      align-items: center;
      background: #1a1a1a;
      color: white;
      font-weight: 400;
      font-size: 14px;
      border-radius: 4px;
   }

   .header {
      margin-top: -5px;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50px;
      left: 0;
      /* border-bottom: 1px solid #ededed; */
      /* box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05); */
   }
   
   .header_container {
      width: 1300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
   
   .header_infos {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 20px;
   }
   
   .header_infos h2 {
      font-size: 25px;
      color: #1a1a1a;
      margin-right: 30px;
      font-weight: 900;
   }
   
   .header_infos a {
      font-weight: 500;
      font-size: 14px;
      color: #343434;
      transition: .3s;
   }
   
   .header_infos a:hover {
      filter: brightness(3)
   }
   
   .header_actions {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
   }
   
   .header_icon {
      padding: 6px;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      transition: .3s;
      cursor: pointer;
      color: #515151;
   }
   
   .header_icon:hover {
      background: #e0e0e0;
   }
   
   .header_cart_div {
      padding: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
      transition: .3s;
      position: relative;
   }
   
   .header_cart_div:hover {
      background: #e0e0e0;
   }
   
   .header_cart_counter {
      width: 16px;
      height: 16px;
      font-size: 11px;
      border-radius: 50%;
      background: #d95c0f;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: -4px;
      left: 0;
   }
   
   .header_icon_cart {
      width: 19px;
      height: 19px;
      color: #515151;
   }
   
   .header_icon_bars {
      padding: 6px;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      transition: .3s;
      cursor: pointer;
      color: #515151;
      display: none !important;
   }
   
   .header_icon_bars:hover {
      background: #e0e0e0;
   }
   
   
   .user_modal {
      width: 200px;
      /* background: #f4f4f4; */
      /* box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1); */
      border: 1px solid #ededed;
      background: white;
      border-radius: 10px;
      padding: 15px;
      position: absolute;
      top: 40px;
      right: 0px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .user_modal h2 {
      font-size: 14px;
      color: #1a1a1a;
      margin-bottom: 20px;
   }
   
   .user_logout {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 15px;
   }
   
   .user_login {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 15px;
   }
   
   .user_login button {
      width: 100%;
      padding: 13px;
      border-radius: 10px;
      font-size: 13px;
      text-align: center;
      transition: .3s;
      background: #f1f1f1;
      color: rgb(38, 38, 38);
      cursor: pointer;
      font-weight: 600;
      transition: .3s;
   }
   
   .user_login button:hover {
      background: #cccccc;
   }
   
   .user_painel_btn {
      width: 100%;
      padding: 13px;
      border-radius: 10px;
      font-size: 13px;
      text-align: center;
      transition: .3s;
      background: #1a1a1a;
      color: white;
      cursor: pointer;
      transition: .3s;
   }
   
   .user_painel_btn:hover {
      background: #3f3f3f;
   }
   
   .user_logout a {
      width: 100%;
      padding: 13px;
      border-radius: 10px;
      font-size: 13px;
      text-align: center;
      transition: .3s;
   }
   
   .modal_btn_login {
      background: #1a1a1a;
      color: white;
   }
   
   .modal_btn_login:hover {
      background: #474747;
   }
   
   .modal_btn_signin {
      border: 1px solid #ededed;
      font-weight: 600;
      color: #1a1a1a;
   }
   
   .modal_btn_signin:hover {
      background: #eeeeee;
   }
   
   
   /* transition */
   
   .fade-enter-active {
      transition: all .3s;
   }

   .fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   }

   .fade-enter-from,
   .fade-leave-to {
      opacity: 1;
      opacity: 0;
   }

</style>