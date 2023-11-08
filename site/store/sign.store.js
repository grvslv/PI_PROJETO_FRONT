export const useSign = defineStore('sign', {

   state() {
      return {
         client: {
            name: '',
            surname: '',
            fullname: '',
            email: '',
            cpf: '',
            password: '',
            birth_date: '',
            gender_id: '',
            billing_address: {
               cep: '',
               uf: '',
               city: '',
               neighborhood: '',
               street: '',
               number: '',
               complement: ''
            },
            delivery_address: []
         },
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
      }
   },

   actions: {
      async getGenders() {
         this.genders = [];
         
         const response = await onFetch('/genders', {
            method: 'GET'
         });
                           
         this.genders = response; 
      },
      async getAddress() {
         await $fetch(`https://viacep.com.br/ws/${this.client.billing_address.cep}/json/`, {
            method: 'GET'
         }).then((response) => {
            
            if(response.erro == true) {
               myAlert('Cep não encontrado..!', 'error')
            } else {
               this.haveBillingCep = true;
            
               this.client.billing_address.cep = response.cep;
               this.client.billing_address.uf = response.uf;
               this.client.billing_address.city = response.localidade;
               this.client.billing_address.street = response.logradouro;
               this.client.billing_address.neighborhood = response.bairro;
            }
            
         }, (error) => {
            myAlert('Ocorreu um erro..!', 'error')
         });
         
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
      typeCep() {
         if(this.client.billing_address.cep.length === 9) {
            this.haveBillingCep = true;
            this.getAddress();
         } else {
            this.haveBillingCep = false
            this.resetBillingCep();
         }
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
      resetBillingCep() {
         this.client.billing_address.uf = ''
         this.client.billing_address.city = ''
         this.client.billing_address.street = ''
         this.client.billing_address.neighborhood = ''
         this.client.billing_address.number = ''
         this.client.billing_address.complement = ''
      },
      resetDeliveryAddress() {
         this.deliveryToAdd.uf = ''
         this.deliveryToAdd.city = ''
         this.deliveryToAdd.street = ''
         this.deliveryToAdd.neighborhood = ''
         this.deliveryToAdd.number = ''
         this.deliveryToAdd.complement = ''
      },
      pushAddress() {
         if(
            this.deliveryToAdd.cep != '' &&
            this.deliveryToAdd.uf != '' &&
            this.deliveryToAdd.city != '' &&
            this.deliveryToAdd.street != '' &&
            this.deliveryToAdd.neighborhood != '' &&
            this.deliveryToAdd.number != ''
         ) {
            this.client.delivery_address.push({
               cep: this.deliveryToAdd.cep,
               uf: this.deliveryToAdd.uf,
               city: this.deliveryToAdd.city,
               street: this.deliveryToAdd.street,
               neighborhood: this.deliveryToAdd.neighborhood,
               number: this.deliveryToAdd.number,
               complement: this.deliveryToAdd.complement,
               isDefault: false
            });
            console.log(this.client)
            this.resetDeliveryAddress()
            this.haveDeliveryCep = false;
         } else {
            myAlert('Preencha todos os campos..!', 'warning')            
         }
      },
      deleteAddress(address) {
         this.client.delivery_address =  this.client.delivery_address.filter(item => item != address);
      },
      setDefaultAddress(address) {
         for (const item of this.client.delivery_address) {
            if (item === address) {
               item.isDefault = true; // Defina a imagem selecionada como padrão
            } else {
               item.isDefault = false; // Defina todas as outras imagens como não padrão
            }
         }
      },
      setSignIn() {
         
         this.client.fullname = this.client.name + ' ' + this.client.surname;
         
         if(
            this.client.name != '',
            this.client.surname != '',
            this.client.fullname != '',
            this.client.email != '',
            this.client.cpf != '',
            this.client.password != '',
            this.client.birth_date != '',
            this.client.gender_id != '',
            this.client.birth_date != '',
            this.client.billing_address.cep != '',
            this.client.billing_address.uf != '',
            this.client.billing_address.city != '',
            this.client.billing_address.neighborhood != '',
            this.client.billing_address.street != '',
            this.client.billing_address.number != ''
         ) {
            if(this.client.delivery_address.length > 0) {
               if(this.client.delivery_address.some(item => item.isDefault === true)) {
                     this.storeClient();      
               } else {
                  myAlert('Ao menos um endereço deve ser selecionado como padrão..!', 'warning')
                  return false;
               } 
            } else {
               myAlert('Ao menos um endereço de entrega deve ser adicionado..!', 'warning')
               return false;
            }
         } else {
            myAlert('Preencha todos os dados..!', 'warning')
            return false;  
         }
      },
      async storeClient() {
         
         const config = useRuntimeConfig();
         
         const headers = {
            'Content-Type': 'application/json',
         };
         
         const response = await useFetch(config.public.baseURL + '/client', {
            method: 'POST',
            headers,
            body: this.client
         });
         
         if(response.status.value == 'error') {
            myAlert(response.error.value.data.message, 'error');
            return;
         } else {
            myAlert('Cadastro efetuado com sucesso!!', 'success');
            setTimeout(() => {
               const router = useRouter();
               router.push('/login');
            }, 2000);
         }
         
      }
   },
   
})

