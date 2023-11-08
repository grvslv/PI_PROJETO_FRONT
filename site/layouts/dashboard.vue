<template>
   
   <header class="l_header">
      
      <icon @click="changeSidebarStatus(true)" name="heroicons:bars-3-center-left" class="icone_header_bars" />
      
      <!-- <icons-bars  /> -->
      
      
      <icon name="ph:sign-out" class="logout_icon_sidebar" @click="logout()" />
      
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
      border-bottom: 1px solid #eeeeee;
      z-index: 2;
   }
   
   .icone_header_bars {
      font-size: 40px;
      color: rgb(34, 34, 34);
      padding: 5px;
      transition: .3s;
      cursor: pointer;
      border-radius: 5px;
   }
   
   .icone_header_bars:hover {
      background: #f3f3f3;
   }
   
   .logout_icon_sidebar {
      font-size: 32px;
      color: rgb(34, 34, 34);
      padding: 5px;
      transition: .3s;
      cursor: pointer;
      border-radius: 5px;
   }
   
   .logout_icon_sidebar:hover {
      background: #f3f3f3;
   }
   
   @media screen and (max-width: 550px) {
      
      .l_header {
         padding: 10px;
      }
      
   }

</style>