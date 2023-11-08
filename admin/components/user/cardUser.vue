<template>
   
   <div class="user_card">
      
      <div class="user_card_header">
         
         <div class="user_card_image">
            {{ user.name.substring(0, 2) }}
         </div>
         
         <div class="user_card_infos">
            <h2>{{ user.name }}</h2>
            <span @click="changeModalState(true, user.id)" class="user_card_status" :class="user.status ? 'user_card_status_active' : 'user_card_status_disabled'">{{ user.status ? 'Ativo' : 'Inativo' }}</span>
         </div>
         
      </div>
         
      <div class="user_card_body">
         <span>Email</span>
         <p>{{ user.email }}</p>
         <span>Cargo</span>
         <p>{{ user.role.name }}</p>
      </div>
      
      <icons-user-edit-icon @click="getUserToUpdate(user.id)" />
      
   </div>   
   
</template>

<script setup>
   
   const props = defineProps({
      user: {}
   });
   
   const store = useUser();
   
   const {changeUserStatus} = store;
   
   const {getUserToUpdate} = store;
   
   const {changeModalState} = store;
   
</script>

<style scoped>

   .user_card {
      width: 300px;
      padding: 20px;
      border: 1px solid #1b1b1b;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative
   }
   
   .user_card svg {
      position: absolute;
      right: 15px;
      bottom: 15px;
   }
   
   .user_card_header {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 15px;
   }
   
   .user_card_image {
      width: 45px;
      height: 45px;
      background: #1b1b1b;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      text-transform: uppercase;
   }
   
   .user_card_infos {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 4px;
   }
   
   .user_card_infos h2 {
      font-size: 15px;
      font-weight: 500;
      color: #bbbbbb;
   }
   
   .user_card_infos .user_card_status {
      padding: 3px 10px;
      border-radius: 4px;
      background: #032219;
      font-size: 12px;
      cursor: pointer;
   }
   
   .user_card_infos .user_card_status_active {
      background: #058a60;
   }
   
   .user_card_infos .user_card_status_disabled {
      background: #8a0505;
   }
   
   .user_card_body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 20px;
   }
   
   .user_card_body span {
      font-size: 12px;
      margin-bottom: 5px;
      color: #696969;
      font-weight: 400;
      margin-bottom: 3px;
   }
   
   .user_card_body p {
      font-size: 14px;
      margin-bottom: 5px;
      color: #bcbcbc;
      font-weight: 400;
      margin-bottom: 10px;
   }
   
   .user_card_body p:last-child {
      margin-bottom: 0px;
   }
   
   @media screen and (max-width: 550px) {
      
      .user_card {
         width: 100%;
      }
      
   }
   
</style>