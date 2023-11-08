<template>
   
   <Transition name="slide-fade">
      <div class="sidebar_background" v-if="sidebarState">
            <div class="sidebar_container">
               
               <div class="sidebar_header">
                  <h2>Store</h2>
                  <icons-close @click="changeSidebarStatus(false)" />
               </div>
               
               <hr>
               
               <div class="sidebar_body">
                  
                  <NuxtLink class="sidebar_item" to="/">
                     <icons-home-icon-sidebar />
                     Início
                  </NuxtLink>
                  
                  <NuxtLink v-if="permission" class="sidebar_item" to="/usuarios">
                     <icons-user-icon-sidebar />
                     Usuários
                  </NuxtLink>
                  
                  <NuxtLink class="sidebar_item" to="/produtos">
                     <icons-product-icon-sidebar />
                     Produtos
                  </NuxtLink>
                  
                  <NuxtLink v-if="permission" class="sidebar_item" to="/pedidos">
                     <icons-request-icon-sidebar />
                     Pedidos
                  </NuxtLink>
                  
               </div>
            
            </div>   

      </div>
   </Transition>
   
</template>

<script setup>

   // validar permissao de usuario
   const permission = validateRole('Admin');

   const {changeSidebarStatus} = useSidebar();

   const store = useSidebar();
   const {sidebarState} = storeToRefs(store);
   

   
   const route = useRoute();
   
   watch(
      () => route.path,
      () => {
         changeSidebarStatus(false)
      },
   );

</script>

<style>

   .sidebar_background {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: #1414142f;
      backdrop-filter: blur(2px);
      transition: backdrop-filter .3s;
      z-index: 3;
   }
   
   .sidebar_container {
      width: 300px;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: #141414;
      border-right: 1px solid #1b1b1b;      
      z-index: 4;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
   }
   
   .sidebar_container .sidebar_header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
   
   .sidebar_container .sidebar_header h2 {
      font-size: 18px;
      font-weight: 500;
   }
   
   .sidebar_container hr {
      width: 100%;
      height: 2px;
      background: #1b1b1b;
   }
   
   .sidebar_container .sidebar_body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
   }
   
   .sidebar_container .sidebar_body .sidebar_item {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      border-radius: 8px;
      transition: .3s;
      font-size: 13px;
      font-weight: 400;
   }
   
   .sidebar_container .sidebar_body .sidebar_item svg {
      margin-right: 10px;
   }
   
   .sidebar_container .sidebar_body .sidebar_item:hover {
      background: #222222;
   }
   
   .sidebar_container .sidebar_body .router-link-active {
      background: #1f1f1f !important;
   }

   .sidebar_container .sidebar_body .router-link-active:hover {
      background: #1f1f1f !important;
   }
   
   /* slide */

   .slide-fade-enter-active .sidebar_container {
      transition: all 0.3s ease-out;
   }

   .slide-fade-leave-active .sidebar_container {
      transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
   }

   .slide-fade-enter-from .sidebar_container,
   .slide-fade-leave-to .sidebar_container {
      transform: translateX(-100px);
      opacity: 0;
   }

   @media screen and (max-width: 400px) {
      
      .sidebar_container {
         width: 100%;
      }
      
   }
   
   

</style>