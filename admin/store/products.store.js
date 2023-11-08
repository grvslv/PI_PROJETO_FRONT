export const useProducts = defineStore('products', {

   state() {
      return {
         products: [],
         formState: false,
         productToEdit: [],
         formEditState: false,
         currentPage: 1,
         perPage: 10,
         lastPage: 0,
         filterByName: '',
         modalState: false,
         modalProductId: null
      }
   },

   actions: {
      changeFormState(state) {
         this.formState = state;
      },
      changeFormEditState(state) {
         this.formEditState = state;
      },
      async getProducts(offset) {
         this.products = [];
         
         const response = await onFetch(`/products?page=${offset}&name=${this.filterByName}`, {
            method: 'GET'
         });
                           
         this.lastPage = response.last_page;
         this.currentPage = response.current_page;
         this.products = response;
      },
      async storeProduct(product) {
         const response = await onFetch('/product', {
            method: 'POST',
            body: product
         });
         
         myAlert(response.message, 'success');
         setTimeout(() => {
            this.getProducts(this.currentPage);
         }, 1400);
      },
      async changeProductStatus(id) {
         const response = await onFetch(`/changeProductStatus/${id}`, {
            method: 'PUT',
         });
         
         myAlert(response.message, 'success');
         this.modalState = false;
         this.modalProductId = null
         this.getProducts(this.currentPage);
      },
      async getProductToUpdate(id) {
         const response = await onFetch(`/product/${id}`, {
            method: 'GET',
         });
         
         this.productToEdit = response;
         this.changeFormEditState(true);
      },
      async updateProduct(id, product) {
         const response = await onFetch(`/product/${id}`, {
            method: 'PUT',
            body: product
         });
         
         myAlert(response.message, 'success');
         setTimeout(() => {
            this.getProducts(this.currentPage);
         }, 1400);
      },
      changeModalState(state, product_id) {
         this.modalProductId = null;
         this.modalProductId = product_id;
         this.modalState = state;
      }
   },
   
})

