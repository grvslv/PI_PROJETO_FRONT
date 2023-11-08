export const useProfile = defineStore('profile', {

   state() {
      return {
         token: useCookie("token").value,
         role: useCookie("role").value,
         id: useCookie("id").value,
         client: {},
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
         genders: [],
         haveBillingCep: false,
         haveDeliveryCep: false,
         orders: []
      }
   },

   actions: {
      async getClient() {
         
         const config = useRuntimeConfig();
         
         const headers = {
            'Content-Type': 'application/json',
         };

         this.client = {}
         
         await $fetch(config.public.baseURL + `/client/${this.id}`, {
            method: 'GET'
         }).then((response) => {
            
            this.client = response;
            
         }, (error) => {
            myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
         });
         
         
      },
      async getMyOrders() {
         this.orders = [];
         
         const response = await onFetch(`/getMyOrders/${this.id}`, {
            method: 'GET'
         });
                           
         this.orders = response; 
      },
      async getGenders() {
         this.genders = [];
         
         const response = await onFetch('/genders', {
            method: 'GET'
         });
                           
         this.genders = response; 
      },
      async getDeliveryAddress() {
         await $fetch(`https://viacep.com.br/ws/${this.deliveryToAdd.cep}/json/`, {
            method: 'GET'
         }).then((response) => {
            
            if(response.erro == true) {
               myAlert('Cep não encontrado..!', 'error')
            } else {
               this.haveDeliveryCep = true;
            
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
         if(this.deliveryToAdd.cep.length === 9) {
            this.haveDeliveryCep = true;
            this.getDeliveryAddress();
         } else {
            this.haveDeliveryCep = false
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
               this.client = []
               this.getClient()
               this.resetDeliveryAddress();
               this.haveDeliveryCep = false;
               
            }, (error) => {
               myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
            });
            
         } else {
            myAlert('Preencha todos os campos..!', 'warning')            
         }
           
      },
      async updateDefaultInfos() {
         
         const config = useRuntimeConfig();
         
         const headers = {
            'Content-Type': 'application/json',
         };
         
         this.client.fullname = this.client.name + ' ' + this.client.surname;
         
         if(
            this.client.name != '' &&
            this.client.surname != '' &&
            this.client.fullname != '' &&
            this.client.client.birth_date != '' &&
            this.client.client.gender_id != ''
         ) {
            
            const clientToSend = {
               name: this.client.name,
               surname: this.client.surname,
               birth_date: this.client.client.birth_date,
               gender_id: this.client.client.gender_id,
               password: this.client.password,
            }
            
            await $fetch(config.public.baseURL + `/updateDefaultInfos/${this.id}`, {
               method: 'PUT',
               body: clientToSend
            }).then((response) => {
               
               myAlert('Dados atualizados com sucesso!!', 'success')
               this.client = []
               this.getClient()
               this.resetDeliveryAddress();
               this.haveDeliveryCep = false;
               
            }, (error) => {
               myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
            });
            
         } else {
            myAlert('Preencha todos os campos..!', 'warning')            
         }
         
      },
      async changeDeliveryAddressStatus(address_id) {
         
         const config = useRuntimeConfig();
         
         const headers = {
            'Content-Type': 'application/json',
         };
         
         await $fetch(config.public.baseURL + `/changeDeliveryAddressStatus/${address_id}`, {
            method: 'PUT'
         }).then((response) => {
            
            myAlert('Status do endereço atualizado com sucesso!!', 'success')
            this.client = []
            this.getClient()
            this.resetDeliveryAddress();
            this.haveDeliveryCep = false;
            
         }, (error) => {
            myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
         });
            
         
      },
      async changeDefaultDeliveryAddress(address_id) {
         
         const config = useRuntimeConfig();
         
         const headers = {
            'Content-Type': 'application/json',
         };
         
         await $fetch(config.public.baseURL + `/changeDefaultDeliveryAddress/${address_id}/${this.id}`, {
            method: 'PUT'
         }).then((response) => {
            
            myAlert('Endereço selecionado como padrão!!', 'success')
            this.client = []
            this.getClient()
            this.resetDeliveryAddress();
            this.haveDeliveryCep = false;
            
         }, (error) => {
            myAlert('Ocorreu um erro ao efetuar a requisição..!', 'error');
         });
            
         
      }
   },
   
})

