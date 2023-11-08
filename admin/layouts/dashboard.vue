<template>
   
   <header class="l_header">
      
      <icon @click="changeSidebarStatus(true)" name="heroicons:bars-3-center-left" class="icone_header_bars" />
      
      <!-- <icons-bars  /> -->
      
      
      <icons-logout @click="logout()" />
      
   </header>

   <slot />
   
   <sidebar />
   
</template>

<script setup>

   const store = useSidebar();
   const { changeSidebarStatus } = useSidebar();
   const {sidebarState} = storeToRefs(store);
   
   const {userLogout} = useAuth();
   const router = useRouter();
   
   const logout = () => {
      userLogout();
   };

</script>

<style>

   .l_header {
      width: 100%;
      height: 60px;
      padding: 0px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1b1b1b;
      z-index: 2;
   }
   
   .icone_header_bars {
      font-size: 40px;
      color: white;
      padding: 5px;
      transition: .3s;
      cursor: pointer;
      border-radius: 5px;
   }
   
   .icone_header_bars:hover {
      background: #1f1f1f;
   }
   
   @media screen and (max-width: 550px) {
      
      .l_header {
         padding: 10px;
      }
      
   }

</style>