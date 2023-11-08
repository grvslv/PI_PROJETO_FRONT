<template>
   
   <div class="register">

      <div class="register_container">
         
         
         <Transition name="fade">
            <div class="r_default_data" v-if="default_data">
               <h2>Criar conta</h2>
               
               <label>Nome</label>
               <input type="text" @input="validateName()" v-model="client.name" placeholder="Nome">
               <label>Sobrenome</label>
               <input type="text" @input="validateSurname()" v-model="client.surname" placeholder="Sobrenome">
               <label>Email</label>
               <input type="email" v-model="client.email" placeholder="Email">
               <label>Senha</label>
               <input type="password" v-model="client.password" placeholder="Senha">
               <label>CPF</label>
               <input type="text" v-model="client.cpf" v-maska data-maska="###.###.###-##" placeholder="CPF">
               <label>Data de Nascimento</label>
               <input type="text" v-model="client.birth_date" onfocus="(this.type='date')" placeholder="Data de Nascimento">
               <label>Gênero</label>
               <select v-model="client.gender_id">
                  <option value="" selected disabled>Selecione uma Opção</option>
                  <option
                     v-for="(gender, index) in genders"
                     :key="index"
                     :value="gender.id"
                  >{{ gender.name }}</option>
               </select>
               
               <div class="r_default_actions">
                  <button @click="defaultBilling">
                     Avançar
                     <icon class="r_default_right" name="ph:arrow-right-bold" />
                  </button>
               </div>
               
            </div>
         </Transition>
         
         <Transition name="fade">
            <div class="r_billing_data" v-if="billing_data">
               
               <h2>Endereço de Faturamento</h2>
               <label>CEP</label>
               <input @keyup="typeCep" type="text" v-model="client.billing_address.cep" v-maska data-maska="#####-###">
               
               <template v-if="haveBillingCep">
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <label>Estado (UF)</label>
                        <input disabled required type="text" v-model="client.billing_address.uf" placeholder="Estado (UF)">
                     </div>
                     <div class="r_b_col">
                        <label>Cidade</label>
                        <input disabled required type="text" v-model="client.billing_address.city" placeholder="Cidade">
                     </div>
                  </div>
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <label>Bairro</label>
                        <input disabled required type="text" v-model="client.billing_address.neighborhood" placeholder="Bairro">
                     </div>
                     <div class="r_b_col">
                        <label>Rua</label>
                        <input disabled required type="text" v-model="client.billing_address.street" placeholder="Rua">
                     </div>
                  </div>
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <label>Número</label>
                        <input required type="text" v-model="client.billing_address.number" placeholder="Número">
                     </div>
                     <div class="r_b_col">
                        <label>Complemento</label>
                        <input type="text" v-model="client.billing_address.complement" placeholder="Complemento">
                     </div>
                  </div>
                  
               </template>
               
               <div class="r_billing_actions">
                  <button @click="billingDefault" class="btn_back">
                     <icon class="r_billing_left" name="ph:arrow-left-bold" />
                     Voltar
                  </button>
                  <button @click="billingDelivery">
                     Avançar
                     <icon class="r_billing_right" name="ph:arrow-right-bold" />
                  </button>
               </div>
               
            </div>
         </Transition>
         
         <Transition name="fade">
            <div class="r_delivery_data" v-if="delivery_data">
               
               <h2>Endereço de Entrega</h2>
                              
               <div v-if="client.delivery_address.length > 0" class="address_list">
                  
                  <div class="d_address_item"
                     v-for="(item, index) in client.delivery_address"
                     :key="index"
                     :class="item.isDefault ? 'd_address_default' : ''"
                  >
                     <div class="d_a_header">
                        <h2>{{ item.city }} - {{ item.uf }}</h2>
                        <span>{{ item.street }} - {{ item.number }}</span>
                        <span>{{ item.neighborhood }} - {{ item.cep }}</span>
                        <span v-if="item.complement">{{ item.complement }}</span>
                     </div>
                     
                     <icon name="ph:x-bold" @click="deleteAddress(item)" class="d_a_delete" />
                     <icon name="ph:check-square-offset-bold" v-if="item.isDefault" class="d_a_default" />
                     <icon name="ph:square-bold" @click="setDefaultAddress(item)" v-if="!item.isDefault" class="d_a_set_default" />
                  </div>
                  
               </div>
               
               
               <label>CEP</label>
               <input @keyup="typeDeliveryCep" v-model="deliveryToAdd.cep" type="text" v-maska data-maska="#####-###">
               
               <template v-if="haveDeliveryCep">
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <label>Estado (UF)</label>
                        <input disabled required type="text" v-model="deliveryToAdd.uf" placeholder="Estado (UF)">
                     </div>
                     <div class="r_b_col">
                        <label>Cidade</label>
                        <input disabled required type="text" v-model="deliveryToAdd.city" placeholder="Cidade">
                     </div>
                  </div>
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <label>Bairro</label>
                        <input disabled required type="text" v-model="deliveryToAdd.neighborhood" placeholder="Bairro">
                     </div>
                     <div class="r_b_col">
                        <label>Rua</label>
                        <input disabled required type="text" v-model="deliveryToAdd.street" placeholder="Rua">
                     </div>
                  </div>
                  <div class="r_b_row">
                     <div class="r_b_col">
                        <label>Número</label>
                        <input required type="text" v-model="deliveryToAdd.number" placeholder="Número">
                     </div>
                     <div class="r_b_col">
                        <label>Complemento</label>
                        <input type="text" v-model="deliveryToAdd.complement" placeholder="Complemento">
                     </div>
                  </div>
                  
                  <button class="push_address" @click="pushAddress()">Adicionar Endereço</button>
               </template>
                  
                  
               
               <div class="r_delivery_actions">
                  <button @click="deliveryBilling" class="btn_back">
                     <icon class="r_delivery_left" name="ph:arrow-left-bold" />
                     Voltar
                  </button>
                  <button @click="setSignIn">
                     Concluir Cadastro
                  </button>
               </div>
               
            </div>
         </Transition>
         
         
      </div>
      
   </div>
   
</template>

<script setup>

   definePageMeta({
      middleware: "signin",
   });


   const store = useSign();
   
   const {genders} = storeToRefs(store);
   
   
   const {client} = storeToRefs(store);
   const {getAddress} = store;
   const {haveBillingCep} = storeToRefs(store);
   const {haveDeliveryCep} = storeToRefs(store);
   const {deliveryToAdd} = storeToRefs(store);
   const {typeCep} = store;
   const {pushAddress} = store;
   const {typeDeliveryCep} = store;
   const {deleteAddress} = store;
   const {setDefaultAddress} = store;
   const {setSignIn} = store;


   const default_data = ref(true);
   const billing_data = ref(false);
   const delivery_data = ref(false);
   
   
   function defaultBilling() {
      default_data.value = false;
      billing_data.value = true;
   }
   
   function billingDefault() {
      default_data.value = true;
      billing_data.value = false;
   }
   
   function billingDelivery() {
      billing_data.value = false;
      delivery_data.value = true;
   }
   
   function deliveryBilling() {
      billing_data.value = true;
      delivery_data.value = false;
   }
   
   onMounted(async () => {
      await store.getGenders()
   });
   

</script>

<style scoped>

   .register {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin-top: 100px;
   }
   
   .register_container {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
   }
   
   .r_default_data {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: absolute;
      padding-bottom: 100px !important;
   }
   
   .r_default_data h2 {
      font-size: 30px;
      font-weight: 800;
      color: #1a1a1a;
      margin-bottom: 20px;
   }
   
   .r_default_data label {
      font-size: 14px;
      font-weight: 300;
      color: #b0b0b0;
      margin-bottom: 3px;
   }
   
   .r_default_data input {
      width: 100%;
      padding: 13px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
   }
   
   .r_default_data input:focus {
      border: 1px solid #a2a2a2;
   }
   
   .r_default_data select {
      width: 100%;
      padding: 13px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
      cursor: pointer;
   }
   
   .r_default_data select:hover {
      border: 1px solid #a2a2a2;
   }
   
   .r_default_actions {
      margin-top: 30px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .r_default_actions button {
      width: 100%;
      padding: 13px;
      border-radius: 8px;
      background: #1a1a1a;
      color: white;
      font-weight: 400;
      font-size: 14px;
      cursor: pointer;
      transition: .3s;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .r_default_actions button:hover {
      background: #313131;
   }
   
   .r_default_right {
      margin-left: 5px;
   }
   
   
   .r_billing_data {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: absolute;
      padding-bottom: 100px !important;
   }
   
   .r_billing_data h2 {
      font-size: 30px;
      font-weight: 800;
      color: #1a1a1a;
      margin-bottom: 20px;
   }
   
   .r_billing_data label {
      font-size: 14px;
      font-weight: 300;
      color: #b0b0b0;
      margin-bottom: 3px;
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
   
   
   
   
   
   .r_billing_data input {
      width: 100%;
      padding: 13px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
   }
   
   .r_billing_actions {
      margin-top: 30px;
      width: 100%;
      display: flex;
      column-gap: 10px;
      justify-content: center;
      align-items: center;
   }
   
   .r_billing_actions button {
      width: 100%;
      padding: 13px;
      border-radius: 8px;
      background: #1a1a1a;
      color: white;
      font-weight: 400;
      font-size: 14px;
      cursor: pointer;
      transition: .3s;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .r_billing_actions button:hover {
      background: #313131;
   }
   
   .r_billing_left {
      margin-right: 5px;
   }
   
   .r_billing_right {
      margin-left: 5px;
   }

   
   
   
   .r_delivery_data {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding-bottom: 100px !important;

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
   
   .d_address_default {
      border: 1px solid #16c08d;
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
   
   .r_delivery_data h2 {
      font-size: 30px;
      font-weight: 800;
      color: #1a1a1a;
      margin-bottom: 20px;
   }
   
   .r_delivery_data label {
      font-size: 14px;
      font-weight: 300;
      color: #b0b0b0;
      margin-bottom: 3px;
   }
   
   .r_delivery_data input {
      width: 100%;
      padding: 13px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
   }
   
   .r_delivery_data input:focus {
      border: 1px solid #a2a2a2;
   }
   
   .r_delivery_data select {
      width: 100%;
      padding: 13px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
      cursor: pointer;
   }
   
   .r_delivery_data select:hover {
      border: 1px solid #a2a2a2;
   }
   
   .r_delivery_actions {
      margin-top: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 10px;
   }
   
   .r_delivery_actions button {
      width: 100%;
      padding: 13px;
      border-radius: 8px;
      background: #1a1a1a;
      color: white;
      font-weight: 400;
      font-size: 14px;
      cursor: pointer;
      transition: .3s;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .r_delivery_actions button:hover {
      background: #313131;
   }
   
   .r_delivery_right {
      margin-left: 5px;
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   /* buttons background default */
   
   .btn_back {
      background: #ebebeb !important;
      color: #333333 !important;
      font-weight: 500 !important;
      transition: .3s;
   }
   
   .btn_back:hover {
      background: #dddddd !important;
   }
   
   .fade-enter-active,
   .fade-leave-active {
      transition: opacity 0.5s ease;
   }

   .fade-enter-from,
   .fade-leave-to {
      opacity: 0;
   }

</style>