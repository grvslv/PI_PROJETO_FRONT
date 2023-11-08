<template>

   <div class="profile_container">
      
      
      <h2>Editar Perfil</h2>
      
      <div class="p_c_row">
         
         <div class="p_c_text">
            
            <h2>Informações Básicas</h2>
            <p>Informações Pessoais</p>
            
         </div>
         
         <div class="p_c_content">
            
            <div class="p_c_form">
               
               <span>Nome</span>
               <input type="text" @input="validateNameProfile()" placeholder="Nome" v-model="client.name">
               <span>Sobrenome</span>
               <input type="text" @input="validateSurnameProfile()" placeholder="Sobrenome" v-model="client.surname">
               <span>Data de Nascimento</span>
               <input type="date" v-if="client.client" v-model="client.client.birth_date">
               <span>Gênero</span>
               <select v-if="client.client" v-model="client.client.gender_id">
                  <option value="" disabled>Selecione uma Opção</option>
                  <option
                     v-for="(gender, index) in genders"
                     :key="index"
                     :value="gender.id"
                  >{{ gender.name }}</option>
               </select>
               <span>Nova Senha</span>
               <input type="password" v-model="client.password" placeholder="Nova Senha">
               <button class="update_default_data" @click="updateDefaultInfos">Atualizar Dados</button>
               
            </div>
            
         </div>
         
         
      </div>
      
      <hr>
      
      <div class="p_c_row">
         
         <div class="p_c_text">
            
            <h2>Informações de Endereço</h2>
            <p>Endereços de Entrega</p>
            
         </div>
         
         <div class="p_c_content">
            
            <div class="p_c_address_container">
               

               <div v-if="client.delivery_address && client.delivery_address.length > 0" class="address_list">
                  
                  <div class="d_address_item"
                     v-for="(item, index) in client.delivery_address"
                     :key="index"
                     :class="[
                        item.isDefault ? 'd_address_default' : '',
                        item.isActive ? '' : 'd_address_disabled',
                     ]"
                  >
                     <div class="d_a_header">
                        <h2>{{ item.city }} - {{ item.uf }}</h2>
                        <span>{{ item.street }} - {{ item.number }}</span>
                        <span>{{ item.neighborhood }} - {{ item.cep }}</span>
                        <span v-if="item.complement">{{ item.complement }}</span>
                     </div>
                     
                     <span v-if="!item.isDefault" @click="changeDeliveryAddressStatus(item.id)" class="addres_item_status" :class="item.isActive ? 'active_status' : 'disable_status'">{{ item.isActive ? 'Ativo' : 'Desabilitado' }}</span>
                     
                     
                     
                     <icon name="ph:check-square-offset-bold" v-if="item.isDefault" class="d_a_default" />
                     <icon name="ph:square-bold" @click="changeDefaultDeliveryAddress(item.id)" v-if="!item.isDefault && item.isActive" class="d_a_set_default" />
                  </div>
                  
               </div>
               
               <span>CEP</span>
               <input @keyup="typeDeliveryCep" v-model="deliveryToAdd.cep" placeholder="Cep" type="text" v-maska data-maska="#####-###">
               
               <template v-if="haveDeliveryCep">
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <span>Estado (UF)</span>
                        <input disabled required type="text" v-model="deliveryToAdd.uf" placeholder="Estado (UF)">
                     </div>
                     <div class="r_b_col">
                        <span>Cidade</span>
                        <input disabled required type="text" v-model="deliveryToAdd.city" placeholder="Cidade">
                     </div>
                  </div>
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <span>Bairro</span>
                        <input disabled required type="text" v-model="deliveryToAdd.neighborhood" placeholder="Bairro">
                     </div>
                     <div class="r_b_col">
                        <span>Rua</span>
                        <input disabled required type="text" v-model="deliveryToAdd.street" placeholder="Rua">
                     </div>
                  </div>
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <span>Número</span>
                        <input required type="text" v-model="deliveryToAdd.number" placeholder="Número">
                     </div>
                     <div class="r_b_col">
                        <span>Complemento</span>
                        <input type="text" v-model="deliveryToAdd.complement" placeholder="Complemento">
                     </div>
                  </div>
                  
                  <button class="push_address" @click="regAddress()">Adicionar Endereço</button>
               </template>
               
               
               
               
            </div>
            
         </div>
         
         
      </div>
      
      <hr>
      
      
   </div>

</template>

<script setup>

   definePageMeta({
      middleware: "profile",
      layout: 'dashboard'
   });
   
   const store = useProfile();
   
   const {client} = storeToRefs(store);
   const {genders} = storeToRefs(store);
   const {deliveryToAdd} = storeToRefs(store);
   const {haveDeliveryCep} = storeToRefs(store);
   const {typeDeliveryCep} = store;
   const {storeAddress} = store;
   const {updateDefaultInfos} = store;
   const {changeDeliveryAddressStatus} = store;
   const {changeDefaultDeliveryAddress} = store;
   
   async function regAddress() {
      await storeAddress();
   }
   
   onMounted(async () => {      
      await store.getClient()
      await store.getGenders()
   });

</script>

<style>

   .profile_container {
      width: 100%;
      display: flex;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 40px;
      padding-bottom: 600px;
   }
   
   .profile_container hr {
      width: 100%;
      height: 1px;
      background: #ececec;
   }
   
   .profile_container h2 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 40px;
   }
   
   .p_c_row {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      column-gap: 20px;
   }
   
   .p_c_text {
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
   }
   
   .p_c_text h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
   }
   
   .p_c_text p {
      font-size: 14px;
      font-weight: 400;
      margin-top: 10px;
      color: #888888;
   }
   
   .p_c_content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
   }
   
   .p_c_form {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .p_c_form span {
      font-size: 13px;
      font-weight: 300;
      color: #7f7f7f;
      margin-bottom: 3px;
   }
   
   .p_c_form input {
      width: 100%;
      padding: 11px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
   }
   
   .p_c_form input:focus {
      border: 1px solid #a2a2a2;
   }
   
   .p_c_form select {
      width: 100%;
      padding: 13px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
      cursor: pointer;
   }
   
   .p_c_form select:hover {
      border: 1px solid #a2a2a2;
   }
   
   .update_default_data {
      width: 100%;
      margin-top: 10px;
      padding: 10px;
      border-radius: 7px;
      background: #1744da;
      color: white;
      cursor: pointer;
      transition: .3s;
   }
   
   .update_default_data:hover {
      background: #2453ed;
   }
   
   
   /* container address */
   
   .p_c_address_container {
      width: 400px;
   }

   .p_c_address_container span {
      font-size: 13px;
      font-weight: 300;
      color: #7f7f7f;
      margin-bottom: 3px;
   }
   
   .p_c_address_container input {
      width: 100%;
      padding: 11px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
   }
   
   .p_c_address_container input:focus {
      border: 1px solid #a2a2a2;
   }
   
   
   .address_list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      margin: 10px 0px;
      row-gap: 10px;
   }
   
   .d_address_list_sponsor {
      width: 100%;
      padding: 13px;
      padding-left: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 8px;
      background: #f7f7f7;
      font-size: 13px;
      font-weight: 400;
      color: #3f3f3f;
   }
   
   .d_address_item {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      position: relative;
   }
   
   .addres_item_status {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 12px !important;
      color: white !important;
      cursor: pointer;
   }
   
   .active_status {
      background: #16c08d;   
   }
   
   .disable_status {
      background: #feba59;
   }
   
   .d_address_default {
      border: 1px solid #16c08d;
   }
   
   .d_address_disabled {
      border: 1px solid #feba59;
   }
   
   .d_a_header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .d_a_header h2 {
      font-size: 13px !important;
      font-weight: 700 !important;
      margin: 0 !important;
      margin-bottom: 10px !important;
   }
   
   .d_a_header span {
      font-size: 12px;
      font-weight: 300;
      color: #8b8b8b;
   }
   
   
   .d_a_set_default {
      font-size: 24px;
      position: absolute;
      bottom: 20px;
      right: 20px;
      cursor: pointer;
      color: #8b8b8b;
      padding: 3px;
      border-radius: 4px;
      transition: .3s;
   }
   
   .d_a_set_default:hover {
      background: #ececec;
   }
   
   
   
   .d_a_default {
      font-size: 24px;
      position: absolute;
      bottom: 20px;
      right: 20px;
      color: #16c08d;
      padding: 3px;
      border-radius: 4px;
   }
   
   .d_a_delete {
      font-size: 24px;
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      color: #8b8b8b;
      padding: 3px;
      border-radius: 4px;
      transition: .3s;
   }
   
   .d_a_delete:hover {
      background: #ececec;
   }
   
   .push_address {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      background: #1744da;
      color: white;
      transition: .3s;
   }
   
   .push_address:hover {
      background: #2654eb;
   }
   
   .r_b_row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;
   }
   
   .r_b_col {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }

</style>