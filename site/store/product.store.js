export const useProducts = defineStore('products', {

   state() {
      return {
         products: [],
         product: {}
      }
   },

   actions: {
      async getProducts() {
         this.products = [];
         
         const response = await onFetch('/productsToIndex', {
            method: 'GET'
         });
                           
         this.products = response;
      },
      async getProduct(title) {
         
         this.product = {};
         
         await $fetch(`http://127.0.0.1:8000/api/showProductByTitle/${title}`, {
            method: 'GET',
         }).then((response) => {
            
            this.product = response;
            
         }, (error) => {
            
            const router = useRouter();
            router.push('/produtos');
            
         });
         
      }
   },
   
})

