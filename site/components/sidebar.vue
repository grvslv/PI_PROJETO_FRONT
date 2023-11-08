<template>
   
   <Transition name="slide-fade">
      <div class="sidebar_background" v-if="sidebarState">
            <div class="sidebar_container">
               
               <div class="sidebar_header">
                  <h2>Painel</h2>
                  <icon name="ph:x-bold" class="icon_close_sidebar" @click="changeSidebarStatus(false)" />
               </div>
               
               <hr>
               
               <div class="sidebar_body">
                  
                  <NuxtLink class="sidebar_item" to="/admin">
                     Início
                  </NuxtLink>
                  
                  <NuxtLink class="sidebar_item" to="/admin/perfil">
                     Perfil
                  </NuxtLink>
                  
                  <NuxtLink class="sidebar_item" to="/admin/pedidos">
                     Pedidos
                  </NuxtLink>
                  
               </div>
            
            </div>   

      </div>
   </Transition>
   
</template>

<script setup>

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
      background-color: #dfdfdf2f;
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
      background: #ffffff;
      border-right: 1px solid #f4f4f4;      
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
   
   .icon_close_sidebar {
      font-size: 32px;
      color: rgb(103, 103, 103);
      padding: 5px;
      transition: .3s;
      cursor: pointer;
      border-radius: 5px;
   }
   
   .icon_close_sidebar:hover {
      background: #f3f3f3;
   }
   
   .sidebar_container .sidebar_header h2 {
      font-size: 18px;
      font-weight: 500;
   }
   
   .sidebar_container hr {
      width: 100%;
      height: 1px;
      background: #f2f2f2;
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
      font-size: 14px;
      font-weight: 500;
      color: #242424;
   }
      
   .sidebar_container .sidebar_body .sidebar_item:hover {
      background: #f2f2f2;
   }
   
   .sidebar_container .sidebar_body .router-link-active {
      background: #eeeeee !important;
   }

   .sidebar_container .sidebar_body .router-link-active:hover {
      background: #dddddd;
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