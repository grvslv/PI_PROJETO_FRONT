export const useCart = defineStore('cart', {

   state() {
      return {
         token: useCookie("token").value,
         id: useCookie("id").value,
         cart: [],
         productsOnCart: 0,
         totalValue: 0.0,
         fakeDeliveryToAdd: {
            cep: '',
            uf: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
            complement: ''
         },
         haveDeliveryCep: false,
         shippings: [],
         fakeShipping: 0,
         fakeShippingInput: {},
         shippingInput: {},
         deliveryToAdd: {
            cep: '',
            uf: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
            complement: '',
            isDefault: false
         },
         haveDeliveryCepCheckout: false,
         shippingValue: 0,
         selectedShipping: {},
         addresses: [],
         defaultAddress: {},
         payment_methods: [],
         payment_method: '',
         // payment cc
         cc: {
            card_number: '',
            code: '',
            name: '',
            expire_date: '',
            portions: '',
         }
         
      }
   },

   actions: {
      async getAddresses() {
         this.addresses = [];
         
         const response = await onFetch(`/getAddresses/${this.id}`, {
            method: 'GET'
         });
                           
         this.addresses = response; 
      },
      async getDefaultAddress() {
         this.defaultAddress = [];
         
         const response = await onFetch(`/getDefaultAddress/${this.id}`, {
            method: 'GET'
         });
                           
         this.defaultAddress = response; 
      },
      async getPaymentMethods() {
         this.payment_methods = [];
         
         const response = await onFetch('/payment_methods', {
            method: 'GET'
         });
                           
         this.payment_methods = response; 
      },
      async changeDefaultDeliveryAddress(address_id) {
         
         const config = useRuntimeConfig();
         
         const headers = {
            'Content-Type': 'application/json',
         };
         
         await $fetch(config.public.baseURL + `/changeDefaultDeliveryAddress/${address_id}/${this.id}`, {
            method: 'PUT'
         }).then((response) => {
            
            myAlert('Endereço selecionado como padrão!!', 'success');
            this.addresses = [];
            this.getAddresses();
            this.defaultAddress = {}
            this.getDefaultAddress();
            
         }, (error) => {
            myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
         });
      },
      async getShippings() {
         this.shippings = [];
         
         const response = await onFetch('/shippings', {
            method: 'GET'
         });
                           
         this.shippings = response;  
      },
      addToCart(product) {
         const cart = JSON.parse(localStorage.getItem('cart')) || [];
         
         const existingProduct = cart.find(item => item.id == product.id);
         const stock = product.stock;
         
         if (existingProduct) {
            
            const existStock = existingProduct.counter;
            if((existStock + 1) > stock) {
               myAlert('Você já excedeu a quantidade limite para este produto..!', 'warning')
               return;
            } else {
               existingProduct.counter += 1;
            }
            
         } else {
            cart.push(product)
         }
         
         localStorage.setItem('cart', JSON.stringify(cart));
         
         myAlert('Produto adicionado ao carrinho!', 'success')
         setTimeout(() => {
            this.verifyCart();
            const router = useRouter();
            router.push('/produtos');
         }, 2000);
         
      },
      getCart() {
         this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      },
      clearCart() {
         this.cart = [];
         localStorage.clear('cart');
      },
      verifyCart() {
         const cart = JSON.parse(localStorage.getItem('cart')) || [];
         this.productsOnCart = cart.length;
         this.cart = cart;         
         
         let totalValue = 0.0;

         for (const item of cart) {
           totalValue += item.price * item.counter;
         }
         
         if(!this.token) {
            totalValue += this.fakeShipping;
         } else {
            totalValue += this.shippingValue;
         }
         
         this.totalValue = totalValue;
      },
      removeItem(item) {
         const cart = JSON.parse(localStorage.getItem('cart')) || [];
         
         const itemIdToRemove = item.id;
         const updatedCart = cart.filter(cartItem => cartItem.id !== itemIdToRemove);
         
         localStorage.setItem('cart', JSON.stringify(updatedCart));
         this.verifyCart();
      },
      updateItem(product, state) {
         const cart = JSON.parse(localStorage.getItem('cart')) || [];
         const productFromStorage = cart.find(item => item.id == product.id);
         
         const stock = product.stock;
         
         if(productFromStorage) {
            if(state) {
               const existStock = productFromStorage.counter;
               if((existStock + 1) > stock) {
                  myAlert('Você já excedeu a quantidade limite para este produto..!', 'warning')
                  return;
               } else {
                  productFromStorage.counter += 1;
               }
            } else {               
               if(product.counter <= 1) {
                  product.counter = 1
               } else {
                  productFromStorage.counter -= 1;
               }
            }
         }
         localStorage.setItem('cart', JSON.stringify(cart));
         this.verifyCart();
      },
      async getDeliveryAddress() {
         await $fetch(`https://viacep.com.br/ws/${this.fakeDeliveryToAdd.cep}/json/`, {
            method: 'GET'
         }).then((response) => {
            
            if(response.erro == true) {
               myAlert('Cep não encontrado..!', 'error')
            } else {
               this.haveDeliveryCep = true;
            
               this.fakeDeliveryToAdd.cep = response.cep;
               this.fakeDeliveryToAdd.uf = response.uf;
               this.fakeDeliveryToAdd.city = response.localidade;
               this.fakeDeliveryToAdd.street = response.logradouro;
               this.fakeDeliveryToAdd.neighborhood = response.bairro;
            }
            
         }, (error) => {
            myAlert('Ocorreu um erro..!', 'error')
         });
         
      },
      async getDeliveryAddressCheckout() {
         await $fetch(`https://viacep.com.br/ws/${this.deliveryToAdd.cep}/json/`, {
            method: 'GET'
         }).then((response) => {
            
            if(response.erro == true) {
               myAlert('Cep não encontrado..!', 'error')
            } else {
               this.haveDeliveryCepCheckout = true;
            
               this.deliveryToAdd.cep = response.cep;
               this.deliveryToAdd.uf = response.uf;
               this.deliveryToAdd.city = response.localidade;
               this.deliveryToAdd.street = response.logradouro;
               this.deliveryToAdd.neighborhood = response.bairro;
            }
            
         }, (error) => {
            myAlert('Ocorreu um erro..!', 'error')
         });
         
      },
      typeDeliveryCep() {
         if(this.fakeDeliveryToAdd.cep.length === 9) {
            this.haveDeliveryCep = true;
            this.getDeliveryAddress();
         } else {
            this.haveDeliveryCep = false
            this.resetDeliveryAddress();
         }
      },
      resetDeliveryAddress() {
         this.fakeDeliveryToAdd.uf = ''
         this.fakeDeliveryToAdd.city = ''
         this.fakeDeliveryToAdd.street = ''
         this.fakeDeliveryToAdd.neighborhood = ''
         this.fakeDeliveryToAdd.number = ''
         this.fakeDeliveryToAdd.complement = ''
      },
      resetDeliveryAddressCheckout() {
         this.deliveryToAdd.uf = ''
         this.deliveryToAdd.city = ''
         this.deliveryToAdd.street = ''
         this.deliveryToAdd.neighborhood = ''
         this.deliveryToAdd.number = ''
         this.deliveryToAdd.complement = ''
      },
      addFakeShipping(shipping) {
         this.fakeShipping = shipping.price;
         this.verifyCart();
      },
      addShippingPrice(shipping) {
         this.shippingValue = shipping.price;
         this.selectedShipping = shipping;
         this.verifyCart();
      },
      typeDeliveryCepCheckout() {
         if(this.deliveryToAdd.cep.length === 9) {
            this.haveDeliveryCepCheckout = true;
            this.getDeliveryAddressCheckout();
         } else {
            this.haveDeliveryCepCheckout = false
            this.resetDeliveryAddressCheckout();
         }
      },
      async storeAddress() {
         
         const config = useRuntimeConfig();
         
         const headers = {
            'Content-Type': 'application/json',
         };
         
         if(
            this.deliveryToAdd.cep != '' &&
            this.deliveryToAdd.uf != '' &&
            this.deliveryToAdd.city != '' &&
            this.deliveryToAdd.street != '' &&
            this.deliveryToAdd.neighborhood != '' &&
            this.deliveryToAdd.number != ''
         ) {
            
            await $fetch(config.public.baseURL + `/newDeliveryAddress/${this.id}`, {
               method: 'PUT',
               body: this.deliveryToAdd
            }).then((response) => {
               
               myAlert('Endereço adicionado com sucesso!!', 'success')
               this.addresses = [];
               this.getAddresses();
               this.resetDeliveryAddress();
               this.haveDeliveryCepCheckout = false;
               this.defaultAddress = {}
               this.getDefaultAddress();
               
            }, (error) => {
               myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
            });
            
         } else {
            myAlert('Preencha todos os campos..!', 'warning')            
         }
           
      },
      async makeRequest() {
         
         const requestOrder = {
            products: this.cart,
            total_value: this.totalValue,
            user_id: this.id,
            payment_method_id: this.payment_method,
            shipping_id: this.selectedShipping.id,
            card_payment: this.cc,
            delivery_address_id: this.defaultAddress.id
         }
         
         const config = useRuntimeConfig();
         
         const headers = {
            'Content-Type': 'application/json',
         };
         
         await $fetch(config.public.baseURL + '/storeOrder', {
            method: 'POST',
            body: requestOrder
         }).then((response) => {

            myAlert('Pedido efetuado com sucesso..!', 'success')
            
            setTimeout(() => {
               
               const router = useRouter();
               router.push('/admin/pedidos');
               
               this.clearCart();
               
               
            }, 1000);
            
         }, (error) => {
            

            
         });
            
           
         
      }
      
   },
   
})