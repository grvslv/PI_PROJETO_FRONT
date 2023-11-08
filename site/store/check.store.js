export const useCheckout = defineStore('check', {

   state() {
      return {
         id: useCookie("id").value,
         addresses: [],
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
         shippings: [],
         shippingValue: 0
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
            
         }, (error) => {
            myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
         });
      },
      async getDeliveryAddress() {
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
      typeDeliveryCepCheckout() {
         if(this.deliveryToAdd.cep.length === 9) {
            this.haveDeliveryCepCheckout = true;
            this.getDeliveryAddress();
         } else {
            this.haveDeliveryCepCheckout = false
            this.resetDeliveryAddress();
         }
      },
      resetDeliveryAddress() {
         this.deliveryToAdd.uf = ''
         this.deliveryToAdd.city = ''
         this.deliveryToAdd.street = ''
         this.deliveryToAdd.neighborhood = ''
         this.deliveryToAdd.number = ''
         this.deliveryToAdd.complement = ''
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
               
            }, (error) => {
               myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
            });
            
         } else {
            myAlert('Preencha todos os campos..!', 'warning')            
         }
           
      },
   }
});