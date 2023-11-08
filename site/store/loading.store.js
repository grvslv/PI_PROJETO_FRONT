export const useLoading = defineStore('loading', {

   state() {
      return {
         loadingState: true,
      }
   },

   actions: {
      async changeLoadingState() {
         this.loadingState = !this.loadingState;
      },
   },
   
})

