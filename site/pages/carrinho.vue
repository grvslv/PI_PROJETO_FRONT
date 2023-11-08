<template>
   
   <div class="cart">
      <div class="cart_list_title">
         <h2>Carrinho de Compras</h2>
      </div>
      <div class="cart_container">
         
         <div class="cart_products_list">
            
            <cart-item-cart 
               v-for="(product, index) in cart"
               :key="index"
               :product="product"
            />
            
         </div>
         <div class="cart_place_order">
            
            <template v-if="!cart.length > 0">
               <h2>Nenhum Produto no Carrinho</h2>
            </template>
            <template v-if="cart.length > 0">
               <h2>Resumo do Pedido</h2>
               
               <div class="cart_order_products_total">
                  <span>Valor Total (produtos)</span>
                  <h2>R${{ formatValue(totalValue) }}</h2>
               </div>

               
               <div class="transition_cart_body">
                  <Transition name="fade">
                     <div class="cart_address" v-if="address">
                        <h2>Escolher Endereço</h2>
                        
                        <template v-if="!token">
                           <div class="cart_address_logout">

                              <span>CEP</span>
                              <input @keyup="typeDeliveryCep" v-model="fakeDeliveryToAdd.cep" placeholder="Cep" type="text" v-maska data-maska="#####-###">
                              
                              <template v-if="haveDeliveryCep">
                                 <div class="r_b_row">
                                    <div class="r_b_col">
                                       <span>Estado (UF)</span>
                                       <input disabled required type="text" v-model="fakeDeliveryToAdd.uf" placeholder="Estado (UF)">
                                    </div>
                                    <div class="r_b_col">
                                       <span>Cidade</span>
                                       <input disabled required type="text" v-model="fakeDeliveryToAdd.city" placeholder="Cidade">
                                    </div>
                                 </div>
                                 <div class="r_b_row">
                                    <div class="r_b_col">
                                       <span>Bairro</span>
                                       <input disabled required type="text" v-model="fakeDeliveryToAdd.neighborhood" placeholder="Bairro">
                                    </div>
                                    <div class="r_b_col">
                                       <span>Rua</span>
                                       <input disabled required type="text" v-model="fakeDeliveryToAdd.street" placeholder="Rua">
                                    </div>
                                 </div>
                                 <div class="r_b_row">
                                    <div class="r_b_col">
                                       <span>Número</span>
                                       <input required type="text" v-model="fakeDeliveryToAdd.number" placeholder="Número">
                                    </div>
                                    <div class="r_b_col">
                                       <span>Complemento</span>
                                       <input type="text" v-model="fakeDeliveryToAdd.complement" placeholder="Complemento">
                                    </div>
                                 </div>
                              </template>
                              
                           </div>
                           
                           <div v-if="haveDeliveryCep" class="shipping_fake_calc">
                              
                              <div class="f_shipping_item"
                                 v-for="(shipping, index) in shippings"
                                 :key="index"
                              >
                                 <div class="f_s_i_text">
                                    <input @click="addFakeShipping(shipping)" type="radio" v-model="fakeShippingInput" :id="index + '_test'" :value="shipping">
                                    <label @click="addFakeShipping(shipping)" :for="index + '_test'">
                                    {{ shipping.name }} - {{ shipping.time }}
                                    </label>
                                 </div>
                                 <div class="f_s_i_price">
                                    <span>R$ {{ formatValue(shipping.price) }}</span>
                                 </div>
                              </div>
                              
                           </div>
                              
                        </template>
                        
                        <template v-if="token">
                        
                           <div v-if="addresses && addresses.length > 0" class="address_list">
                              
                              <div class="d_address_item"
                                 v-for="(item, index) in addresses"
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
                                 
                                 <icon name="ph:check-square-offset-bold" v-if="item.isDefault" class="d_a_default" />
                                 <icon name="ph:square-bold" @click="changeDefaultDeliveryAddress(item.id)" v-if="!item.isDefault && item.isActive" class="d_a_set_default" />
                              </div>
                              
                           </div>
                           
                           <h2>Adicionar novo Endereço</h2>
                           <span>CEP</span>
                           <input @keyup="typeDeliveryCepCheckout" v-model="deliveryToAdd.cep" placeholder="Cep" type="text" v-maska data-maska="#####-###">
                           
                           <template v-if="haveDeliveryCepCheckout">
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
                              
                              <button class="push_address" @click="storeAddress()">Adicionar Endereço</button>
                           </template>
                        
                        </template>
                        
                        <br>
                        
                        <button class="cart_btn_go" @click="changeStep('address', 'fare')">Avançar</button>
                     </div>
                  </transition>
                  
                  <Transition name="fade">
                     <div class="cart_fare" v-if="fare">
                        <h2>Calcular o frete</h2>
                        
                           <div class="shipping_fake_calc">
                              
                              <div class="f_shipping_item"
                                 v-for="(shipping, index) in shippings"
                                 :key="index"
                              >
                                 <div class="f_s_i_text">
                                    <input @click="addShippingPrice(shipping)" type="radio" v-model="shippingInput" :id="index + '_test'" :value="shipping">
                                    <label @click="addShippingPrice(shipping)" :for="index + '_test'">
                                    {{ shipping.name }} - {{ shipping.time }}
                                    </label>
                                 </div>
                                 <div class="f_s_i_price">
                                    <span>R$ {{ formatValue(shipping.price) }}</span>
                                 </div>
                              </div>
                              
                           </div>
                        
                        <button class="cart_btn_back" @click="changeStep('fare', 'address')">Voltar</button>
                        <button class="cart_btn_go" @click="changeStep('fare', 'payment')">Avançar</button>
                     </div>
                  </transition>
                  
                  <Transition name="fade">
                     <div class="cart_payment" v-if="payment">

                        <h2 class="tttle">Selecionar forma de pagamento</h2>
                        
                        <span>Forma de Pagamento</span>
                        <select v-model="payment_method">
                           <option value="" selected disabled>Selecione uma Opção</option>
                           <option
                              v-for="(item, index) in payment_methods"
                              :key="index"
                              :value="item.id"
                           >{{ item.name }}</option>
                        </select>
                        
                        <!-- cartao de credito -->
                        <template v-if="payment_method == 1">
                           
                           <span>Número do cartão</span>
                           <input type="text" v-model="cc.card_number" v-maska data-maska="####-####-####-####" placeholder="Número do cartão">
                           
                           <span>Código Verificador</span>
                           <input type="text" v-model="cc.code" v-maska data-maska="###" placeholder="Código Verificador">
                           
                           <span>Nome Completo</span>
                           <input type="text" v-model="cc.name" placeholder="Nome Completo">
                           
                           <span>Data de Vencimento</span>
                           <input type="text" v-model="cc.expire_date" onfocus="(this.type='date')" placeholder="Data de Vencimento">
                           
                           <span>Quantidade de parcelas</span>
                           <input type="number" v-model="cc.portions" max="10" min="0" placeholder="Quantidade de parcelas">
                           
                        </template>
                        
                        <!-- boleto -->
                        <template v-if="payment_method == 2">
                           
                        </template>
                        
                        <button class="cart_btn_back" @click="changeStep('payment', 'fare')">Voltar</button>
                        <button class="cart_btn_go" @click="changeStep('payment', 'verifyCheckout')">Avançar</button>
                     </div>
                  </transition>
                  
                  
                  <Transition name="fade">
                     <div class="cart_checkout_out" v-if="verifyCheckout">
                        
                        <hr>
                        
                        <div class="cart_c_row">
                           <span>Frete - {{ selectedShipping.name }} - {{ selectedShipping.time }}</span>
                           <h2>R$ {{ formatValue(shippingValue) }}</h2>
                        </div>
                        
                        <div class="card_c_products">
                        
                           <div class="card_c_item"
                              v-for="(item, index) in cart"
                              :key="index"
                           >
                              <p>{{ item.name }} <span>({{ item.counter }}x)</span></p>
                              <h2>R$ {{ formatValue(item.price) }}</h2>
                           </div>
                        
                        </div>
                        
                        <h2>Endereço de Entrega</h2>
                        
                        <div class="d_address_item d_address_default" style="margin-bottom: 20px;">
                           <div class="d_a_header">
                              <h2>{{ defaultAddress.city }} - {{ defaultAddress.uf }}</h2>
                              <span>{{ defaultAddress.street }} - {{ defaultAddress.number }}</span>
                              <span>{{ defaultAddress.neighborhood }} - {{ defaultAddress.cep }}</span>
                              <span v-if="defaultAddress.complement">{{ defaultAddress.complement }}</span>
                           </div>
                        </div>
                        
                        <h2 v-if="payment_method == 1">Método de Pagamento - Cartão</h2>
                        <h2 v-if="payment_method == 2">Método de Pagamento - Boleto</h2>
                        
                        
                        
                        
                        
                        <button class="cart_btn_back" @click="changeStep('verifyCheckout', 'payment')">Voltar</button>
                        <button class="cart_btn_go" @click="makeRequest()">Fazer Pedido</button>
                        
                     </div>
                  </transition>
               </div>
            </template>
            
         </div>
         
      </div>
   </div>
   
</template>

<script setup>

   definePageMeta({
      layout: "store"
   });
   
   const store = useCart();
   const {cart} = storeToRefs(store);
   const {totalValue} = storeToRefs(store);
   const {haveDeliveryCep} = storeToRefs(store);
   const {fakeDeliveryToAdd} = storeToRefs(store);
   const {getDeliveryAddress} = store;
   const {typeDeliveryCep} = store;
   const {token} = storeToRefs(store);
   const {shippings} = storeToRefs(store);
   const {fakeShipping} = storeToRefs(store);
   const {fakeShippingInput} = storeToRefs(store);
   const {addFakeShipping} = store;
   
   
   const {addresses} = storeToRefs(store);
   const {changeDefaultDeliveryAddress} = store;
   
   const {deliveryToAdd} = storeToRefs(store);
   const {haveDeliveryCepCheckout} = storeToRefs(store);
   const {typeDeliveryCepCheckout} = store;
   const {storeAddress} = store;
   const {addShippingPrice} = store;
   
   const {shippingInput} = storeToRefs(store);
   const {shippingValue} = storeToRefs(store);
   const {selectedShipping} = storeToRefs(store);
   
   const {payment_methods} = storeToRefs(store);
   const {payment_method} = storeToRefs(store);
   const {cc} = storeToRefs(store);
   const {defaultAddress} = storeToRefs(store);
   const {makeRequest} = store;
   
   // checkout
   
   
   
   // update address
   
   
   
   
   
   // update address
   
   
   const address = ref(true);
   const fare = ref(false);
   const payment = ref(false);
   const verifyCheckout = ref(false);
   
   function changeStep(from, to) {
      
      if(from == 'address' && to == 'fare') {
         
         if(!token.value) {
            const router = useRouter();
            router.push('/login');
         }
         address.value = false;
         fare.value = true;
         payment.value = false;
         verifyCheckout.value = false;
      } else if (from == 'fare' && to == 'address') {
         address.value = true;
         fare.value = false;
         payment.value = false;
         verifyCheckout.value = false;
      } else if (from == 'fare' && to == 'payment') {

         if(shippingValue.value != 0) {
            address.value = false;
            fare.value = false;
            payment.value = true;
            verifyCheckout.value = false;
         } else {
            myAlert('Escolha uma opção de Frete..!', 'warning');
         }
         
      } else if (from == 'payment' && to == 'fare') {
         address.value = false;
         fare.value = true;
         payment.value = false;
         verifyCheckout.value = false;

      } else if (from == 'payment' && to == 'verifyCheckout') {
         if(payment_method.value == 1) {
            if(
               cc.value.card_number != '' &&
               cc.value.code != '' &&
               cc.value.name != '' &&
               cc.value.expire_date != '' &&
               cc.value.portions != ''
            ) {
               address.value = false;
               fare.value = false;
               payment.value = false;
               verifyCheckout.value = true;
            } else {
               myAlert('Preencha os dados do cartão..!', 'warning');
            }
         } else if(payment_method.value == 2) {
            address.value = false;
            fare.value = false;
            payment.value = false;
            verifyCheckout.value = true;
         } else {
            myAlert('Selecione um método de pagamento válido..!', 'warning');
         }
      } else if (from == 'verifyCheckout' && to == 'payment') {
         address.value = false;
         fare.value = false;
         payment.value = true;
         verifyCheckout.value = false;
      }

   }
   
   
   onMounted(async () => {
      await store.getCart()
      await store.getShippings()
      
      await store.getAddresses();
      await store.getPaymentMethods();
      await store.getDefaultAddress();
   });
   
   useHead({
      title: 'Carrinho'
   })

</script>

<style scoped>

   .cart {
      width: 100%;
      margin-top: 170px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 200px;
      row-gap: 30px;
   }
   
   .cart_list_title {
      width: 1300px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
   }
   
   .cart_list_title h2 {
      font-size: 20px;
      font-weight: bold;
      color: #343434;
   }
   
   .cart_container {
      width: 1300px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      column-gap: 30px;
   }
   
   .cart_products_list {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px !important;
   }
   
   .cart_place_order {
      width: 400px;
      height: 1000px;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.05);
   }
   
   .cart_place_order h2 {
      font-size: 16px;
      margin-bottom: 10px;
   }
   
   .cart_order_products_total {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
   }
   
   .cart_order_products_total span {
      font-size: 13px;
      font-weight: 500;
      color: #959595;
   }
   
   .cart_order_products_total h2 {
      font-size: 13px;
      font-weight: 600;
      color: #20ad81;
      margin: 0;
   }
   
   .transition_cart_body {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }

   
   .cart_fare {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
   }
   
   .cart_address {
      width: 100%;
      display: flex;
      position: absolute;
      flex-direction: column;
   }
      
   .cart_address span {
      font-size: 13px;
      font-weight: 300;
      color: #7f7f7f;
      margin-bottom: 3px;
   }
   
   .cart_address input {
      width: 100%;
      padding: 11px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
   }
   
   .cart_address input:focus {
      border: 1px solid #a2a2a2;
   }

   
   .shipping_fake_calc {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 5px;
      row-gap: 20px;
      margin-bottom: 30px;
   }
   
   .f_shipping_item {
      width: 100%;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
   }
   
   .f_s_i_text {
      display: flex;
      justify-content: flex-start !important;
      align-items: center;
   }
   
   .f_s_i_text label {
      margin: 0 !important;
      padding: 0 !important;
      margin-left: 5px !important;
      font-size: 14px;
      cursor: pointer;
   }
   
   .f_s_i_text input {
      width: unset !important;
      margin: 0 !important;
      padding: 0 !important;
      cursor: pointer;
   }
   
   .f_s_i_price {
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .f_s_i_price span {
      font-size: 13px;
      font-weight: 500;
      color: #20ad81;
   }
   
   
   
   
   
   
   
   
   
   .cart_checkout_out {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: absolute;
   }
   
   .cart_checkout_out hr {
      width: 100%;
      height: 1px;
      background: #f2f2f2;
   }
   
   .cart_checkout_out button {
      width: 100%;
   }
   
   .cart_c_row {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
   
   .cart_c_row span {
      font-size: 13px !important;
      font-weight: 500;
      color: #959595;
   }
   
   .cart_c_row h2 {
      font-size: 13px !important;
      font-weight: 600;
      color: #20ad81;
      margin: 0;
   }
   
   .card_c_products {
      margin: 20px 0px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
   }
   
   .card_c_item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06);
   }
   
   .card_c_item p {
      margin: 0 !important;
      font-size: 13px;
      color: #6f6f6f;
      font-weight: 500;
   }
   
   .card_c_item p span {
      margin: 0 !important;
      font-size: 13px;
      color: #3f3f3f;
      font-weight: bold;
   }
   
   .card_c_item h2 {
      margin: 0 !important;
      font-size: 12px;
      color: #20ad81;
      font-weight: 500;
   }
   
   .cart_payment {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
   }
   
   .tttle {
      font-size: 16px !important;
      font-weight: bold !important;
   }

   .cart_payment {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: absolute;
      padding-bottom: 100px !important;
   }
   
   .cart_payment button {
      width: 100%;
   }
   
   .cart_payment h2 {
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      margin-bottom: 5px;
   }
   
   .cart_payment span {
      font-size: 13px;
      font-weight: 300 !important;
      color: #b0b0b0;
      margin-bottom: 3px;
   }
   
   .cart_payment input {
      width: 100%;
      padding: 13px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 10px;
      transition: .3s;
   }
   
   .cart_payment input:focus {
      border: 1px solid #a2a2a2;
   }
   
   .cart_payment select {
      width: 100%;
      padding: 11px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
      cursor: pointer;
   }
   
   .cart_payment select:hover {
      border: 1px solid #a2a2a2;
   }
   

   .cart_address_logout {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .cart_address_logout span {
      font-size: 13px;
      font-weight: 300;
      color: #7f7f7f;
      margin-bottom: 3px;
   }
   
   .cart_address_logout input {
      width: 100%;
      padding: 11px;
      font-size: 13px;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      margin-bottom: 8px;
      transition: .3s;
   }
   
   .cart_address_logout input:focus {
      border: 1px solid #a2a2a2;
   }

   
   
   
   .cart_btn_back {
      padding: 10px;
      background: #ebebeb;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: .3s;
      color: rgb(37, 37, 37);
      border-radius: 8px;
      margin-bottom: 10px;
   }
   
   .cart_btn_back:hover {
      background: #e1e1e1;
   }
   
   .cart_btn_go {
      padding: 10px;
      background: #191919;
      font-size: 13px;
      cursor: pointer;
      transition: .3s;
      color: white;
      border-radius: 8px;
   }
   
   .cart_btn_go:hover {
      background: #363636;
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
      margin-bottom: 20px;
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



   .fade-enter-active,
   .fade-leave-active {
      transition: opacity 0.5s ease;
   }

   .fade-enter-from,
   .fade-leave-to {
      opacity: 0;
   }

</style>