<template>
   
   <div class="user_body">
      
      <div class="user_body_filter">
         <icons-user-icon-filter />
         <input type="text" placeholder="Filtrar por Nome">
      </div>
      
      <div class="user_container">
         
         <user-card-user
            v-for="user in users"
            :key="user"
            :user="user"
         />
         
      </div>
      
   </div>
   
   <user-form-user />
   
   <alert-user-modal />
   
   <button class="btn_new_user" @click="changeFormState(true)">Novo Usuário</button>
   
</template>

<script setup>

   definePageMeta({
      layout: "dashboard",
      middleware: ['auth', 'usuarios']
   });
   
   const store = useUser();
   
   const {changeFormState} = store;
   
   const {users} = storeToRefs(store);
   
   onMounted(async () => {
      await store.getUsers()
   });
   

</script>

<style>

   .user_body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 40px;
      row-gap: 30px;
   }
   
   .user_body_filter {
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
   
   .user_body_filter input {
      flex: 1;
      height: 100%;
      background: none;
   }
   
   
   .user_container {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: wrap;
      row-gap: 20px;
      column-gap: 20px;
      padding-bottom: 200px;
   }
   
   .btn_new_user {
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
   }
   
   .btn_new_user:hover {
      filter: brightness(1.2);
   }
   
   @media screen and (max-width: 550px) {
      
      .user_body {
         padding: 10px;
      }
      
      .user_body_filter {
         width: 100%;
      }
      
   }

</style>