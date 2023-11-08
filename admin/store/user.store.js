export const useUser = defineStore('useUser', {

   state() {
      return {
         formState: false,
         user: {},     
         isUpdate: false,
         users: [],
         filterByName: '',
         roles: [],
         modalState: false,
         modalUserId: null
      }
   },

   actions: {
      changeFormState(state) {
         this.formState = state;
      },
      async getUsers() {
         this.users = [];
         
         const response = await onFetch(`/users?name=${this.filterByName}`, {
            method: 'GET'
         });
                           
         this.users = response;
      },
      async storeUser(user) {
         const response = await onFetch('/user', {
            method: 'POST',
            body: user
         });
         
         myAlert(response.message, 'success');
         setTimeout(() => {
            this.user = {};
            this.formState = false;
            this.getUsers();
         }, 1400);
      },
      async changeUserStatus(id) {
         const response = await onFetch(`/changeUserStatus/${id}`, {
            method: 'PUT',
         });
         
         myAlert(response.message, 'success');
         this.modalState = false;
         this.modalUserId = null
         this.getUsers();
      },
      async getUserToUpdate(id) {
         const response = await onFetch(`/user/${id}`, {
            method: 'GET',
         });
         
         this.user = response;
         this.isUpdate = true
         this.changeFormState(true);
      },
      async updateUser(id, user) {
         const response = await onFetch(`/user/${id}`, {
            method: 'PUT',
            body: user
         });
         
         myAlert(response.message, 'success');
         setTimeout(() => {
            this.getUsers();
            this.user = {};
            this.formState = false;
            this.isUpdate = false;
         }, 1400);
      },
      async getRoles() {
         const response = await onFetch('/roles/', {
            method: 'GET',
         });
         
         this.roles = response;
      },
      changeModalState(state, user_id) {
         this.modalUserId = null;
         this.modalUserId = user_id;
         this.modalState = state;
      }
   },

})

